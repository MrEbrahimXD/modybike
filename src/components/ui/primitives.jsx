import { forwardRef } from 'react';
import Icon from './Icon.jsx';

/* ==========================================================================
   Primitives
   --------------------------------------------------------------------------
   Square geometry, hairline rules, one accent. Hover states invert or reveal;
   nothing lifts, glows, or floats.
   ========================================================================== */

const BUTTON_BASE =
  'relative inline-flex items-center justify-center gap-2.5 rounded-none font-semibold ' +
  'transition-colors duration-200 ease-editorial disabled:pointer-events-none disabled:opacity-40 ' +
  'whitespace-nowrap select-none';

const BUTTON_VARIANTS = {
  /* The default action: solid ink, inverts to the accent on hover. */
  solid:
    'bg-carbon-950 text-paper hover:bg-signal-500 hover:text-white ' +
    'dark:bg-paper dark:text-carbon-950 dark:hover:bg-signal-500 dark:hover:text-white',
  /* Reserved for the single most important action on a screen. */
  signal: 'bg-signal-500 text-white hover:bg-carbon-950 dark:hover:bg-paper dark:hover:text-carbon-950',
  outline:
    'border border-carbon-950 text-carbon-950 hover:bg-carbon-950 hover:text-paper ' +
    'dark:border-carbon-100 dark:text-carbon-100 dark:hover:bg-paper dark:hover:text-carbon-950',
  /* Over photography. */
  onDark: 'border border-white/45 text-white hover:bg-white hover:text-carbon-950 backdrop-blur-[2px]',
  ghost:
    'text-carbon-700 hover:text-signal-600 dark:text-carbon-300 dark:hover:text-signal-400 px-0',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-ink',
};

const BUTTON_SIZES = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-[15px]',
};

/**
 * @param {object} p
 * @param {'solid'|'signal'|'outline'|'onDark'|'ghost'|'whatsapp'} [p.variant]
 * @param {'sm'|'md'|'lg'} [p.size]
 */
export const Button = forwardRef(function Button(
  {
    as: Tag,
    variant = 'solid',
    size = 'md',
    icon,
    iconEnd,
    className = '',
    children,
    href,
    ...rest
  },
  ref,
) {
  const Component = Tag || (href ? 'a' : 'button');
  const external = href && /^https?:|^mailto:|^tel:/.test(href);

  const cls = [
    BUTTON_BASE,
    BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.solid,
    variant === 'ghost' ? BUTTON_SIZES[size].replace(/px-\d+/, '') : BUTTON_SIZES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={ref}
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
      {...(Component === 'button' && !rest.type ? { type: 'button' } : null)}
      {...rest}
    >
      {icon ? <Icon name={icon} className="h-[1.1em] w-[1.1em] shrink-0" /> : null}
      {children}
      {iconEnd ? <Icon name={iconEnd} className="h-[1.1em] w-[1.1em] shrink-0 flip-rtl" /> : null}
    </Component>
  );
});

/**
 * Kicker — the short line that names a section above its heading.
 *
 * No sequence number and no dash rule: the numbers were decorative (nothing on
 * the page is actually step 3 of 7) and the dash-plus-tracked-caps combination
 * is the signature of a generated layout. A magazine sets a kicker as a plain
 * short phrase and lets the rule above the section do the dividing.
 */
export function Eyebrow({ children, className = '', as: Tag = 'p' }) {
  return (
    <Tag className={`label text-signal-600 dark:text-signal-400 ${className}`}>{children}</Tag>
  );
}

/**
 * Editorial section head: a hairline opens the section, the kicker names it,
 * the heading carries it, and any action sits on the heading's baseline.
 */
export function SectionHead({ eyebrow, title, lede, action, className = '' }) {
  return (
    <div className={`border-t pt-7 rule ${className}`}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="mt-3.5 max-w-[20ch] text-display-md">{title}</h2>
        </div>
        {action ? <div className="shrink-0 sm:pb-1.5">{action}</div> : null}
      </div>
      {lede ? (
        <p className="mt-5 max-w-measure text-base leading-relaxed muted sm:text-lg">{lede}</p>
      ) : null}
    </div>
  );
}

/** Full-width hairline. */
export function Rule({ className = '' }) {
  return <hr className={`border-0 border-t rule ${className}`} />;
}

/** Vertical rhythm. Sections are generous — the layout should breathe. */
export function Section({ children, className = '', as: Tag = 'section', ...rest }) {
  return (
    <Tag className={`py-16 sm:py-20 lg:py-28 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/** Square micro-tag. */
export function Tag({ children, tone = 'default', icon, className = '' }) {
  const tones = {
    default: 'bg-carbon-950/85 text-paper backdrop-blur-[2px]',
    paper: 'bg-paper text-carbon-900',
    signal: 'bg-signal-500 text-white',
    outline: 'border border-current text-carbon-600 dark:text-carbon-300',
  };
  return (
    <span
      className={`label inline-flex items-center gap-1.5 px-2.5 py-1.5 ${tones[tone] || tones.default} ${className}`}
    >
      {icon ? <Icon name={icon} className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}

/** Stock dot + word. Muted colours — a shop is not a traffic light. */
export function StockPill({ stock, t, className = '' }) {
  const map = {
    in_stock: { c: 'text-state-ok dark:text-state-ok-dark', k: 'product.inStock' },
    low_stock: { c: 'text-state-low dark:text-state-low-dark', k: 'product.lowStock' },
    out_of_stock: { c: 'text-state-out dark:text-state-out-dark', k: 'product.outOfStock' },
  };
  const s = map[stock] || map.in_stock;
  return (
    <span className={`label inline-flex items-center gap-2 ${s.c} ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {t(s.k)}
    </span>
  );
}

/**
 * Price. Numbers are a design element here: tabular, tight, with the old price
 * struck through beside rather than above.
 */
export function Price({ value, compareAt, price, size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-display-sm',
  };
  const off = compareAt && compareAt > value ? Math.round((1 - value / compareAt) * 100) : 0;
  return (
    <span className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${className}`}>
      <span className={`tnum font-bold tracking-tight ${sizes[size]}`}>{price(value)}</span>
      {off > 0 ? (
        <>
          <span className="tnum text-sm text-carbon-500 line-through dark:text-carbon-400">
            {price(compareAt)}
          </span>
          <span className="label text-signal-600 dark:text-signal-400">−{off}%</span>
        </>
      ) : null}
    </span>
  );
}

/**
 * Key/value row for spec tables.
 *
 * `help` is a plain-language sentence shown under the value — the difference
 * between a table a mechanic can read and one a first-time buyer can.
 */
export function SpecRow({ label, value, help, className = '' }) {
  if (value == null || value === '') return null;
  return (
    <div className={`border-b py-3 rule ${className}`}>
      <div className="flex items-baseline justify-between gap-6">
        <dt className="spec shrink-0 text-carbon-500 dark:text-carbon-400">{label}</dt>
        <dd className="text-end text-sm font-medium">{value}</dd>
      </div>
      {help ? <p className="mt-1.5 text-[13px] leading-relaxed muted">{help}</p> : null}
    </div>
  );
}

/** A bordered surface. Used rarely and on purpose. */
export function Panel({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`border rule bg-paper-raised dark:bg-carbon-900 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * A single selling point.
 *
 * `emphasis` exists so a list of these never comes out as N identical blocks:
 * real reasons to buy are not equally important, and the layout should say so.
 */
export function PointItem({ title, children, emphasis = false, className = '' }) {
  return (
    <div className={`border-t pt-6 rule ${className}`}>
      <h3
        className={`font-bold leading-snug ${
          emphasis ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-3 leading-relaxed muted ${emphasis ? 'text-[15px] sm:text-base' : 'text-sm'}`}
      >
        {children}
      </p>
    </div>
  );
}
