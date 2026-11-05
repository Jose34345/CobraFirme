import Link from 'next/link';

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label="CobráFirme — inicio">
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" width="35" height="35" fill="none">
        <rect width="36" height="36" rx="12" fill="currentColor" />
        <path d="m10 19 5 5 11-12" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span>Cobrá<span className="brand-accent">Firme</span><span className="brand-period">.</span></span>
  </Link>;
}
