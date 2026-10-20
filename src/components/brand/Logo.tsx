import React from 'react';

/** PDFCharger mark: a document with a lightning bolt, on the brand gradient. */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span
      className={`pc-brand-gradient relative inline-flex items-center justify-center rounded-[28%] shadow-[0_6px_16px_-6px_hsl(var(--color-primary)/0.7)] ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="none">
        <path
          d="M14 2.5H7.2A2.2 2.2 0 0 0 5 4.7v14.6a2.2 2.2 0 0 0 2.2 2.2h9.6a2.2 2.2 0 0 0 2.2-2.2V7.5z"
          stroke="white"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path d="M14 2.5v5h5" stroke="white" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M12.6 9.2 9.4 14h2.7l-.9 3.8 3.4-5h-2.7z" fill="white" />
      </svg>
    </span>
  );
}

/** Full wordmark: mark + "PDF" + gradient "Charger" */
export function Logo({ className = '', markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-[hsl(var(--color-foreground))]">
        PDF<span className="text-gradient">Charger</span>
      </span>
    </span>
  );
}

export default Logo;
