/**
 * Hand-rolled icon set — no icon library, no extra network request, no tree-shaking
 * surprises. Every path is a 24×24 stroke icon so they share one render style.
 *
 * Usage: <Icon name="cart" className="h-5 w-5" />
 * Icons are decorative by default (aria-hidden); pass `title` when an icon is the
 * only content of a control and there is no visible label.
 */

const P = {
  /* -- navigation / chrome -------------------------------------------------- */
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 6l12 12M18 6L6 18',
  search: 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.3-4.3',
  cart: 'M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  chevronDown: 'M6 9l6 6 6-6',
  chevronUp: 'M18 15l-6-6-6 6',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
  arrowLeft: 'M19 12H5M12 19l-7-7 7-7',
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
  arrowUp: 'M12 19V5M5 12l7-7 7 7',
  check: 'M20 6L9 17l-5-5',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  trash: 'M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6',
  filter: 'M3 5h18M6 12h12M10 19h4',
  sort: 'M3 6h13M3 12h9M3 18h5M17 8l3-3 3 3M20 5v14',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  external: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3',
  share: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v14',
  copy: 'M9 9h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2zM5 15H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z',

  /* -- contact -------------------------------------------------------------- */
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 7l-10 6L2 7',
  mapPin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  /**
   * The real WhatsApp mark — the official solid glyph, not a traced outline.
   * A brand logo is a filled shape; drawing it with a 1.8px stroke turned it
   * into a wireframe that read as "some phone icon" rather than WhatsApp.
   * Listed in FILLED below so it renders with fill instead of stroke.
   */
  whatsapp:
    'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
  facebook: 'M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v8h4v-8h3l.5-4H12V7.5c0-.6.4-1 1-1h2V3z',
  instagram:
    'M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01',
  tiktok: 'M15 3v10.5a3.5 3.5 0 1 1-3.5-3.5M15 3a5 5 0 0 0 5 5',
  youtube:
    'M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12zM10 9.5l5 2.5-5 2.5v-5z',

  /* -- value props ---------------------------------------------------------- */
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  truck: 'M1 3h13v13H1zM14 8h4l3 3v5h-7M5.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  wrench: 'M14.7 6.3a4 4 0 0 0 5 5l-9 9a2.8 2.8 0 0 1-4-4l9-9z',
  tag: 'M20.6 13.4L12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01',
  ruler: 'M2 15L15 2l7 7L9 22zM6 11l2 2M9 8l2 2M12 5l2 2',
  star: 'M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8-6.1-3.2-6.1 3.2L7.1 14 2 9.3l6.9-1z',
  heart: 'M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16v-4M12 8h.01',
  alert: 'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01',
  check_circle: 'M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4L12 14l-3-3',
  sparkle: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',

  /* -- bike categories ------------------------------------------------------ */
  bike: 'M5.5 20a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM18.5 20a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5.5 16.5L9 7h4M12 16.5L15.5 7M9 7h7l2.5 9.5M14 7l-1.5-3h-2',
  mountain: 'M3 20l6-9 3 4.5L15 11l6 9zM3 20h18M16 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  road: 'M4 22L8 2M20 22L16 2M12 4v3M12 11v3M12 18v3',
  city: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 11h.01M15 11h.01',
  kids: 'M12 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM12 9v6M9 12h6M9 22l3-7 3 7',
  bmx: 'M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 16l4-8h6M10 8L8 5h4M16 8l2 8',
  folding: 'M4 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 15l5-6 5 6M9 9L8 6M14 9h4l2 6',
  electric: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  hybrid: 'M5.5 20a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM18.5 20a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5.5 16.5L10 8h5l3.5 8.5M10 8L9 5h4',

  /* -- accessory groups ----------------------------------------------------- */
  accessories: 'M12 2l2.6 6.4 6.9.5-5.3 4.4 1.7 6.7L12 16.4 6.1 20l1.7-6.7L2.5 8.9l6.9-.5z',
  light: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z',
  lock: 'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM8 11V7a4 4 0 1 1 8 0v4',
  basket: 'M3 9h18l-1.6 10a2 2 0 0 1-2 1.7H6.6a2 2 0 0 1-2-1.7zM8 9l3-6M16 9l-3-6M9 13v4M15 13v4',
  helmet: 'M3 15a9 9 0 0 1 18 0v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 15h18M8 6.5l1 4M16 6.5l-1 4',
  bell: 'M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7zM10.5 20a2 2 0 0 0 3 0',
  tool: 'M14.7 6.3a4 4 0 1 0 5 5l-2.8-2.8-2.2 2.2L12 8l2.2-2.2zM12 10l-7.5 7.5a2.1 2.1 0 0 0 3 3L15 13',
  comfort: 'M4 18v-5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5M2 18h20M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M5 18v2M19 18v2',
};

/**
 * Icons that are solid shapes rather than line drawings.
 *
 * Brand marks are the exception to the stroke house style: a logo has a fixed
 * form, and approximating it with an outline is both wrong and unrecognisable.
 */
const FILLED = new Set(['whatsapp']);

export default function Icon({ name, className = 'h-5 w-5', title, strokeWidth = 1.8, ...rest }) {
  const d = P[name];
  if (!d) return null;

  const filled = FILLED.has(name);

  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      {...(filled
        ? null
        : { strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' })}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title || undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={d} />
    </svg>
  );
}

export const ICON_NAMES = Object.keys(P);
