'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import {
  getSavedSignatures,
  saveSignature,
  deleteSignature,
  PDFChargerSignature,
  dataUrlToBlob,
} from '@/lib/pdf/signature-storage';
import { loadSignatureImageFile } from '@/lib/pdf/signature-image';
import { saveBlobFile } from '@/lib/tauri-bridge';

export interface SignatureLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewerWindow?: Window | null;
  onOpenExtractor: () => void;
}

export function SignatureLibraryModal({
  isOpen,
  onClose,
  viewerWindow,
  onOpenExtractor,
}: SignatureLibraryModalProps) {
  const [signatures, setSignatures] = useState<PDFChargerSignature[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const loadList = () => {
    setSignatures(getSavedSignatures());
  };

  const handleImageFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    let loaded;
    try {
      // Rasterizes SVG/WebP to PNG so the PDF.js signature editor can embed it.
      loaded = await loadSignatureImageFile(file);
    } catch (err) {
      console.error('Failed to load signature image:', err);
      return;
    }

    const name = file.name.replace(/\.[^/.]+$/, '');
    const saved = saveSignature({
      name: name || 'Signature image',
      dataUrl: loaded.dataUrl,
      width: loaded.width || 300,
      height: loaded.height || 150,
      sourceDoc: 'Imported image',
    });
    loadList();

    // If viewer is ready, immediately apply to document
    if (viewerWindow && (viewerWindow as any).pdfchargerImportSignature) {
      const blob = dataUrlToBlob(loaded.dataUrl);
      await (viewerWindow as any).pdfchargerImportSignature(blob, saved.name);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadList();
    }
  }, [isOpen]);

  const handleDelete = (id: string) => {
    deleteSignature(id);
    loadList();
  };

  const handleApply = async (sig: PDFChargerSignature) => {
    try {
      if (viewerWindow && (viewerWindow as any).pdfchargerImportSignature) {
        const blob = dataUrlToBlob(sig.dataUrl);
        await (viewerWindow as any).pdfchargerImportSignature(blob, sig.name);
        onClose();
      }
    } catch (e) {
      console.error('Failed to apply signature:', e);
    }
  };

  const handleDownload = async (sig: PDFChargerSignature) => {
    try {
      const blob = dataUrlToBlob(sig.dataUrl);
      await saveBlobFile(blob, `${sig.name}.png`);
    } catch (e) {
      console.error('Failed to download signature:', e);
    }
  };

  const handleCopy = async (sig: PDFChargerSignature) => {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const blob = dataUrlToBlob(sig.dataUrl);
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopiedId(sig.id);
        setTimeout(() => setCopiedId(null), 1500);
      }
    } catch (e) {
      console.error('Failed to copy to clipboard:', e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Signature library"
      size="lg"
      className="!max-w-2xl"
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="hidden"
          onChange={handleImageFileSelected}
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
            {signatures.length} saved signature(s) and stamp(s), ready to reuse on any document.
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs"
            >
              🖼️ Upload signature image
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                onOpenExtractor();
              }}
              className="text-xs"
            >
              ➕ Extract from a signed PDF
            </Button>
          </div>
        </div>

        {signatures.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-[hsl(var(--color-border))] rounded-[var(--radius-md)] bg-gray-50/50">
            <svg
              className="w-12 h-12 mx-auto text-gray-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-700 mb-1">No saved signatures yet</p>
            <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
              Upload a PNG or JPG image of your signature, or extract one from a PDF you have already signed.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                🖼️ Upload signature image (PNG/JPG)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenExtractor();
                }}
              >
                Extract from a signed PDF
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {signatures.map((sig) => (
              <div
                key={sig.id}
                className="border border-[hsl(var(--color-border))] rounded-[var(--radius-md)] p-3 bg-[hsl(var(--color-card))] flex flex-col justify-between hover:shadow-sm transition"
              >
                <div>
                  <div
                    className="w-full h-24 rounded border border-gray-200 flex items-center justify-center p-2 mb-2 bg-white overflow-hidden"
                    style={{
                      backgroundImage: `linear-gradient(45deg, #f3f4f6 25%, transparent 25%), 
                                        linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), 
                                        linear-gradient(45deg, transparent 75%, #f3f4f6 75%), 
                                        linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)`,
                      backgroundSize: '12px 12px',
                      backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
                    }}
                  >
                    <img
                      src={sig.dataUrl}
                      alt={sig.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-xs font-semibold text-[hsl(var(--color-foreground))] truncate" title={sig.name}>
                      {sig.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(sig.id)}
                      className="text-gray-400 hover:text-red-500 text-xs px-1"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-[10px] text-[hsl(var(--color-muted-foreground))] flex items-center justify-between">
                    <span>{new Date(sig.createdAt).toLocaleDateString()}</span>
                    <span>{sig.width} × {sig.height}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[hsl(var(--color-border))]">
                  {viewerWindow && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 text-xs py-1 h-auto"
                      onClick={() => handleApply(sig)}
                    >
                      Place on document
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs py-1 h-auto px-2"
                    onClick={() => handleCopy(sig)}
                  >
                    {copiedId === sig.id ? 'Copied' : 'Copy'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs py-1 h-auto px-2"
                    onClick={() => handleDownload(sig)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
export default SignatureLibraryModal;
