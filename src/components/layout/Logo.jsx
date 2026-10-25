import { useLocale } from '../../i18n/index.jsx';
import { SITE } from '../../config/site.js';

const BASE = import.meta.env.BASE_URL;

/**
 * The shop's badge, traced from the owner's artwork (assets-src/brand/icon.jpeg).
 * Two files because the white strokes have to turn dark on a light page.
 */
export function LogoMark({ className = 'h-11 w-11', onDark = false }) {
  if (onDark) return <img src={`${BASE}logo-dark.svg`} alt="" width="44" height="44" className={className} />;
  return (
    <>
      <img src={`${BASE}logo-light.svg`} alt="" width="44" height="44" className={`${className} dark:hidden`} />
      <img src={`${BASE}logo-dark.svg`} alt="" width="44" height="44" className={`${className} hidden dark:block`} />
    </>
  );
}

export default function Logo({ className = '', compact = false, onDark = false }) {
  const { lang } = useLocale();
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark onDark={onDark} className="h-11 w-11 shrink-0" />
      {!compact ? <span className="text-lg font-bold leading-none">{SITE.name[lang] || SITE.name.ar}</span> : null}
    </span>
  );
}
