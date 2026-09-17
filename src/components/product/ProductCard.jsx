import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import Media from '../ui/Media.jsx';
import { Price, StockPill, Tag } from '../ui/primitives.jsx';
import { useLocale } from '../../i18n/index.jsx';
import { useCart } from '../../lib/cart.jsx';
import { paths } from '../../lib/routes.js';
import { productImage } from '../../data/media.js';
import { isAccessory } from '../../data/products.js';

/* ==========================================================================
   Product card
   --------------------------------------------------------------------------
   No card. The photograph is the object; type sits underneath it on the page,
   not inside a rounded box with a shadow. The only chrome is a hairline above
   the name and the quick-add that slides in over the image on hover.
   ========================================================================== */

/** The one-line spec summary that makes a tile feel like a real bike listing. */
function specLine(product, t) {
  if (isAccessory(product)) return null;
  const s = product.specs || {};
  const bits = [
    s.wheelSize ? `${s.wheelSize}"` : null,
    s.gears ? `${s.gears}${s.gears > 1 ? 'v' : 'sp'}` : null,
    s.brakes ? t(`brakes.${s.brakes}`) : null,
    s.frameMaterial ? t(`material.${s.frameMaterial}`) : null,
  ].filter(Boolean);
  return bits.join(' · ');
}

export default function ProductCard({ product, priority = false, sizes, className = '' }) {
  const { t, tr, path, price } = useLocale();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const image = productImage(product.slug, 0);
  const out = product.stock === 'out_of_stock';
  const spec = specLine(product, t);
  const href = path(paths.product(product.slug));

  const quickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    add(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className={`group relative flex flex-col ${className}`}>
      <Link to={href} className="block focus:outline-none" tabIndex={-1} aria-hidden="true">
        <div className="zoom-frame bg-carbon-100 dark:bg-carbon-900">
          <Media
            image={image}
            alt=""
            ratio="4/3"
            sizes={sizes || '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px'}
            priority={priority}
            fallbackLabel={product.sku}
            className={out ? 'opacity-55 grayscale' : ''}
          />

          {/* badges */}
          <div className="pointer-events-none absolute start-0 top-0 flex flex-col items-start gap-px p-0">
            {product.badges?.includes('bestseller') ? (
              <Tag tone="paper">{t('common.new') === 'New' ? 'Bestseller' : 'الأكثر مبيعًا'}</Tag>
            ) : null}
            {product.compareAtPrice > product.price ? (
              <Tag tone="signal">
                −{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </Tag>
            ) : null}
          </div>

          {/* quick add — pointer devices only; the card link stays the a11y path */}
          {!out ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-300 ease-editorial group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 max-lg:hidden">
              <button
                type="button"
                onClick={quickAdd}
                tabIndex={-1}
                className="flex w-full items-center justify-center gap-2 bg-carbon-950/[0.92] py-3.5 text-sm font-semibold text-paper backdrop-blur-[2px] transition-colors hover:bg-signal-500 hover:text-white"
              >
                <Icon name={added ? 'check' : 'plus'} className="h-4 w-4" />
                {added ? t('product.added') : t('product.addToCart')}
              </button>
            </div>
          ) : null}
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col border-t pt-4 rule">
        {spec ? <p className="spec mb-2 truncate muted">{spec}</p> : null}

        <h3 className="text-base font-bold leading-snug">
          {/* stretched link: the whole card is clickable, one tab stop */}
          <Link to={href} className="after:absolute after:inset-0 after:content-['']">
            {tr(product.name)}
          </Link>
        </h3>

        {product.tagline ? (
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed muted">{tr(product.tagline)}</p>
        ) : null}

        <div className="mt-4 flex items-end justify-between gap-3 pt-1">
          <Price value={product.price} compareAt={product.compareAtPrice} price={price} size="sm" />
          <StockPill stock={product.stock} t={t} className="shrink-0 pb-1" />
        </div>
      </div>
    </article>
  );
}

/** Responsive grid of product cards. */
export function ProductGrid({ products = [], priorityCount = 0, className = '', cols }) {
  if (!products.length) return null;
  const grid = cols || 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  return (
    <ul className={`grid gap-x-5 gap-y-12 sm:gap-x-8 ${grid} ${className}`} role="list">
      {products.map((p, i) => (
        <li key={p.id} className="flex">
          <ProductCard product={p} priority={i < priorityCount} className="w-full" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Horizontally scrolling row. On a phone this is how people browse a shop
 * shelf; the row keeps snap points so it never stops between items.
 */
export function ProductRow({ products = [], label, className = '' }) {
  if (!products.length) return null;
  return (
    <ul
      className={`no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 ${className}`}
      role="list"
      aria-label={label}
      tabIndex={0}
    >
      {products.map((p) => (
        <li key={p.id} className="w-[62vw] shrink-0 snap-start xs:w-[46vw] sm:w-[32vw] lg:w-[23%]">
          <ProductCard product={p} sizes="(max-width: 640px) 62vw, (max-width: 1024px) 32vw, 300px" />
        </li>
      ))}
    </ul>
  );
}

/** Compact horizontal line item — used in the cart and the upsell sheet. */
export function ProductLine({ product, children, className = '' }) {
  const { tr, path, price } = useLocale();
  return (
    <div className={`flex gap-4 ${className}`}>
      <Link to={path(paths.product(product.slug))} className="w-24 shrink-0 sm:w-28">
        <Media
          image={productImage(product.slug, 0)}
          alt=""
          ratio="4/3"
          sizes="120px"
          fallbackLabel={product.sku}
        />
      </Link>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold leading-snug">
          <Link to={path(paths.product(product.slug))} className="link-underline">
            {tr(product.name)}
          </Link>
        </h3>
        <p className="spec mt-1.5 muted">{product.sku}</p>
        <p className="tnum mt-2 text-sm font-bold">{price(product.price)}</p>
        {children}
      </div>
    </div>
  );
}
