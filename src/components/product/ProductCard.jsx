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

/**
 * Wheel size, brake type and gear count — what separates one listing from the next.
 */
function specLine(product, t) {
  if (isAccessory(product)) return null;
  const s = product.specs || {};
  const bits = [
    s.wheelSize ? `${s.wheelSize}"` : null,
    s.brakes ? t(`brakesShort.${s.brakes}`) : null,
    s.gears ? (s.gears > 1 ? t('product.gearCount', { count: s.gears }) : t('product.singleSpeed')) : null,
  ].filter(Boolean);
  return bits.join(' · ');
}

/** Listing tile: photo, name, specs, price, stock and a visible add button. */
export default function ProductCard({ product, priority = false, sizes, className = '' }) {
  const { t, tr, path, price } = useLocale();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const image = productImage(product.slug, 0);
  const out = product.stock === 'out_of_stock';
  const spec = specLine(product, t);
  const href = path(paths.product(product.slug));

  const quickAdd = () => {
    add(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className={`group relative flex flex-col ${className}`}>
      <div className="relative bg-white dark:bg-carbon-900">
        <Media
          image={image}
          alt={tr(product.name)}
          ratio="1/1"
          fit="contain"
          sizes={sizes || '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px'}
          priority={priority}
          fallbackLabel={product.sku}
          className={out ? 'opacity-55 grayscale' : ''}
        />
        {product.compareAtPrice > product.price ? (
          <div className="pointer-events-none absolute start-0 top-0">
            <Tag tone="signal">−{Math.round((1 - product.price / product.compareAtPrice) * 100)}%</Tag>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug sm:text-base">
          {/* stretched link: the whole tile opens the product */}
          <Link to={href} className="after:absolute after:inset-0 after:content-[''] group-hover:underline">
            {tr(product.name)}
          </Link>
        </h3>
        {spec ? <p className="spec mt-1 muted">{spec}</p> : null}

        <div className="mt-auto pt-2">
          <Price value={product.price} compareAt={product.compareAtPrice} price={price} size="sm" />
          <StockPill stock={product.stock} t={t} className="mt-1" />
        </div>

        {!out ? (
          <button
            type="button"
            onClick={quickAdd}
            className="relative z-10 mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 border border-carbon-950 text-sm font-semibold transition-colors hover:bg-carbon-950 hover:text-paper dark:border-carbon-300 dark:hover:bg-paper dark:hover:text-carbon-950"
          >
            <Icon name={added ? 'check' : 'plus'} className="h-4 w-4" />
            {added ? t('product.added') : t('product.addToCart')}
          </button>
        ) : null}
      </div>
    </article>
  );
}

/** Responsive grid of product cards. */
export function ProductGrid({ products = [], priorityCount = 0, className = '', cols }) {
  if (!products.length) return null;
  const grid = cols || 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  return (
    <ul className={`grid gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10 ${grid} ${className}`} role="list">
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
