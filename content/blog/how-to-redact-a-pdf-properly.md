---
title: How to Redact a PDF Properly (and Why Black Boxes Often Fail)
description: Drawing a black box over text doesn't remove it. Learn why redactions fail, how to redact a PDF so the text is really gone, and how to check your work.
date: 2026-11-17
tools: [redact-pdf, find-and-redact, remove-metadata]
---

You draw a black rectangle over an account number, save the PDF, and send it. On screen the number is gone. But open that file, select the area, press copy, paste it into a text editor, and there it is.

This is one of the most common ways confidential information leaks, and it has caught out lawyers, government agencies and large companies. This guide explains why it happens, how to redact a PDF so the information is actually removed, and how to check a redacted file before you send it.

## Why a black box isn't a redaction

A PDF page is built in layers. The text you read is stored as real characters, with their position on the page. When you add a black rectangle in most editors, the editor adds a *new* shape on top. The characters underneath are untouched. They're just hidden from view.

Anyone who receives the file can still:

- **Select and copy** the "hidden" text and paste it elsewhere.
- **Search** for it with Ctrl + F (Cmd + F on a Mac).
- **Delete or move the rectangle** in any PDF editor.
- **Extract the text** with free tools, which ignore shapes completely.

It happens more often than you'd think. Government agencies have published reports whose blacked-out passages could be read by simply copying the text, and court filings have been released where journalists uncovered the "redacted" details within hours, using nothing more than copy and paste.

Highlighting text in black, setting the text colour to black on a black background, or covering it with a black image all fail in the same way.

## What proper redaction does

A real redaction removes the information from the file, not just from view. There are two reliable ways to do it:

1. **Delete the underlying text and graphics** in the marked area, then draw the box.
2. **Turn the page into an image** with the box already burned in. Once the page is a flat picture, there's no text left behind the box to recover.

[PDFCharger's Redact PDF tool](/en/tools/redact-pdf/) uses the second approach. Every page you redact is rendered as an image with your marks burned in, and the page is rebuilt from that image in a brand-new PDF. Pages you didn't touch are copied across unchanged, so their text stays selectable.

## How to redact a PDF, step by step

1. **Open [Redact PDF](/en/tools/redact-pdf/)** and add your file. It's processed in your browser and never uploaded, which matters when the whole point is to protect what's in it.
2. **Drag over each area you want to hide**: names, addresses, account numbers, signatures, photos, stamps.
3. **Choose a style.** Use **blackout** for text (see the warning below about blur and mosaic).
4. **Generate the secured PDF and download it.** Keep your original somewhere safe: redaction can't be undone, and that's the point.

### Redacting the same word everywhere

If a name or number appears on many pages, marking each one by hand is slow and easy to get wrong. [Find and Redact](/en/tools/find-and-redact/) searches the whole document for a word, a number, or a pattern (it supports regular expressions, so you can match things like account-number formats). It shows you every match so you can choose which ones to redact, then redacts them all at once.

Find and Redact needs real text to search, so it doesn't work on scanned pages that are just pictures. For those, mark the areas by hand in Redact PDF.

## Don't use blur or mosaic on text

Blur and mosaic (pixelation) look like they hide text, but they don't remove the information. They scramble it. With short, predictable content such as account numbers, dates or names in a known font, pixelated text can sometimes be reconstructed by testing which characters would produce the same blocky pattern. Researchers have published tools that do exactly this.

**For text, always use solid blackout or whiteout.** Blur and mosaic are fine for softening a face in a photo where nothing needs to be read.

## Don't forget the hidden information

The visible text isn't the only thing a PDF gives away. Files often carry:

- **Metadata:** the author's name, the software used, and when the file was created and edited.
- **Comments and annotations**, including notes that were "resolved" but never deleted.
- **Form fields** that still hold typed-in values.
- **Earlier versions:** some editors save changes by adding to the end of the file, so older content can still be inside it.

Redact PDF strips the document's metadata and removes annotations and form fields by default, and because the output is a freshly built PDF, earlier versions don't come along. If you only need to clean a file without redacting anything, [Remove Metadata](/en/tools/remove-metadata/) clears the author, dates and software details, and [Deep Metadata Sanitizer](/en/tools/deep-sanitize/) goes further.

## How to check a redacted PDF before you send it

Take two minutes to test the file you're about to send, not the one you edited:

1. **Search for what you removed.** Press Ctrl + F (Cmd + F) and type a word or number you redacted. There should be no results.
2. **Try to copy it.** Drag across a redacted area, copy, and paste into a plain text editor. Nothing from the hidden content should appear.
3. **Check the properties.** In your PDF viewer, open the document properties and confirm the author and other details are empty or harmless.
4. **Look at every page.** Make sure the same information doesn't also appear in a header, footer, caption or table you missed.

## One trade-off to know about

Because a redacted page becomes an image, *all* of the text on that page becomes part of the picture, not just the parts you blacked out. People can still read it, but they can't select or search it any more. Pages with no redactions aren't affected.

That's usually fine for documents you're sharing to be read. If the recipient needs searchable text on those pages, run the redacted file through [OCR PDF](/en/tools/ocr-pdf/) afterwards. OCR reads the visible text back in, and the blacked-out content isn't visible, so it can't come back.

## The short version

- A black box drawn over text hides it but doesn't remove it.
- Use a tool that deletes the content or flattens the page, like [Redact PDF](/en/tools/redact-pdf/).
- Use solid blackout for text, never blur or mosaic.
- Strip metadata, comments and form data too.
- Before sending, search and copy-test the final file.

And if the document is sensitive enough to redact, it's sensitive enough not to upload. PDFCharger does all of this in your browser, so the unredacted original never leaves your device.
