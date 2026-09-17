import { useLocale } from '../../i18n/index.jsx';
import { SITE } from '../../config/site.js';

/**
 * The mark is the front triangle of a bike frame with the seat tube picked out
 * in the accent — a shape a rider recognises, drawn in the same square, hairline
 * language as the rest of the site rather than a generic circled glyph.
 */
export function LogoMark({ className = '', accent = true }) {
  return (
    <svg viewBox="0 0 32 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 19 L14 6 L26 6 L19 19 Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M14 6 L19 19"
        stroke={accent ? '#D8400F' : 'currentColor'}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="6" cy="19" r="4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="26" cy="19" r="4" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

export default function Logo({ className = '', compact = false, onDark = false }) {
  const { lang } = useLocale();
  const name = SITE.name[lang] || SITE.name.ar;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={`h-6 w-8 shrink-0 ${onDark ? 'text-white' : ''}`} />
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="text-[17px] font-bold tracking-tight">{name}</span>
          {lang === 'ar' ? null : (
            <span className="label mt-1 text-[9px] tracking-wide2 opacity-55">AL SHARQIA</span>
          )}
        </span>
      ) : null}
    </span>
  );
}
