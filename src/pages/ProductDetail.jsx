import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound.jsx';
import { Breadcrumbs } from '../components/layout/Layout.jsx';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Eyebrow, Price, Section, SectionHead, SpecRow, StockPill, Tag } from '../components/ui/primitives.jsx';
import { QtyStepper } from '../components/ui/form.jsx';
import { ProductGrid } from '../components/product/ProductCard.jsx';
import { Seo, breadcrumbSchema, productSchema, shareImage } from '../lib/seo.jsx';
import { productSeoDescription, productSeoTitle } from '../lib/productSeo.js';
import { useLocale } from '../i18n/index.jsx';
import { useCart } from '../lib/cart.jsx';
import { useAnyOnScreen } from '../lib/hooks.js';
import { paths } from '../lib/routes.js';
import { productEnquiryUrl } from '../lib/whatsapp.js';
import { getProduct, getRelatedProducts } from '../data/products.js';
import { productImages } from '../data/media.js';
import { CATEGORIES } from '../data/categories.js';
import { COLORS } from '../data/colors.js';
import { SITE } from '../config/site.js';

/* ==========================================================================
   Product detail
   --------------------------------------------------------------------------
   Gallery on the left, a sticky buy column on the right, and a spec table that
   is allowed to look like a spec table — mono labels, hairline rules, tabular
   figures. That is what a bike buyer actually reads.
   ========================================================================== */

function Gallery({ product, images }) {
  const { t, tr } = useLocale();
  const [active, setActive] = useState(0);
  const name = tr(product.name);

  return (
    <div>
      <Media
        image={images[active]}
        alt={t('a11y.productImage', { name })}
        ratio="4/3"
        fit="contain"
        sizes="(max-width: 1024px) 100vw, 58vw"
        priority
        fallbackLabel={product.sku}
      />

      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-5 gap-3" role="list" aria-label={t('product.gallery')}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active}
                aria-label={`${name} — ${i + 1}`}
                className={`block w-full transition-opacity ${
                  i === active ? 'opacity-100 ring-1 ring-carbon-950 dark:ring-paper' : 'opacity-55 hover:opacity-100'
                }`}
              >
                <Media image={img} alt="" ratio="4/3" fit="contain" sizes="120px" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { t, tr, lang, path, price, num } = useLocale();
  const { add } = useCart();

  const product = getProduct(slug);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(null);
  const [added, setAdded] = useState(false);
  const buyRef = useRef(null);
  // The phone buy bar repeats the two buttons, so it waits until they scroll away.
  const buyButtonsVisible = useAnyOnScreen(() => [buyRef.current], slug);

  if (!product) return <NotFound />;

  const images = productImages(product.slug);
  const out = product.stock === 'out_of_stock';
  const specs = product.specs || {};
  const category = CATEGORIES.find((c) => c.slug === product.category);
  const related = getRelatedProducts(product, 4);
  const name = tr(product.name);

  const onAdd = () => {
    add(product, qty, { color });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const colorName = (key) => {
    const c = COLORS?.[key];
    return c ? tr(c.name ?? c) : key;
  };

  return (
    <>
      <Seo
        noindex={SITE.isPlaceholderContent || Boolean(product.placeholder)}
        lang={lang}
        title={productSeoTitle(product, lang)}
        description={productSeoDescription(product, lang)}
        canonicalPath={paths.product(product.slug)}
        image={images.length ? shareImage('products', product.slug) : undefined}
        jsonLd={[
          productSchema(product, { lang, path: paths.product(product.slug), images: images.map((img) => img.src) }),
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('product.products'), path: paths.products() },
            ...(category ? [{ name: tr(category.name), path: paths.byCategory(category.slug) }] : []),
            { name, path: paths.product(product.slug) },
          ], lang),
        ].filter(Boolean)}
      />

      <div className="container-page pt-4 sm:pt-6">
        <Breadcrumbs
          items={[
            {
              label: t('product.products'),
              to: path(paths.products()),
            },
            ...(category ? [{ label: tr(category.name), to: path(paths.byCategory(category.slug)) }] : []),
            { label: name },
          ]}
        />
      </div>

      {/* ------------------------------------------------------ buy section */}
      <div className="container-page py-5 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <Gallery product={product} images={images} />

          <div className="lg:sticky lg:top-[100px] lg:h-max">
            <div className="flex flex-wrap items-center gap-2">
              {product.badges?.includes('bestseller') ? (
                <Tag tone="outline">{lang === 'ar' ? 'الأكثر مبيعًا' : 'Bestseller'}</Tag>
              ) : null}
              {category ? (
                <Link to={path(paths.byCategory(category.slug))} className="label link-underline muted">
                  {tr(category.name)}
                </Link>
              ) : null}
            </div>

            <h1 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">{name}</h1>
            {product.tagline ? (
              <p className="mt-3 text-base leading-relaxed muted sm:text-lg">{tr(product.tagline)}</p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-y py-5 rule">
              <Price value={product.price} compareAt={product.compareAtPrice} price={price} size="lg" />
              <StockPill stock={product.stock} t={t} className="pb-1.5" />
            </div>

            {/* headline specs — the four numbers a buyer scans for */}
            <dl className="mt-6 grid grid-cols-2 gap-x-6 sm:grid-cols-4">
              {[
                [t('product.wheelSize'), specs.wheelSize ? <Link to={path(paths.bySize(specs.wheelSize))} className="underline decoration-carbon-300 underline-offset-4 hover:decoration-current">{`${specs.wheelSize}"`}</Link> : null],
                [t('product.gears'), specs.gears || null],
                [t('product.brakes'), specs.brakes ? t(`brakes.${specs.brakes}`) : null],
                [t('product.weight'), specs.weightKg ? `${num(specs.weightKg)} ${t('product.kg')}` : null],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="border-t py-3 rule">
                    <dt className="label muted">{k}</dt>
                    <dd className="tnum mt-1.5 text-sm font-bold">{v}</dd>
                  </div>
                ))}
            </dl>

            {/* The plain-words gloss on brakes and frame lives in the spec
                table below, where the term it explains is actually sitting —
                repeating it up here only pushed the buy button off the fold. */}

            {/* colours */}
            {specs.colors?.length ? (
              <div className="mt-7">
                <p className="label muted">{t('product.colors')}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {specs.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(color === c ? null : c)}
                      aria-pressed={color === c}
                      className={`label border px-3 py-2 transition-colors ${
                        color === c
                          ? 'border-carbon-950 bg-carbon-950 text-paper dark:border-paper dark:bg-paper dark:text-carbon-950'
                          : 'rule hover:border-carbon-950 dark:hover:border-carbon-300'
                      }`}
                    >
                      {colorName(c)}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* buy */}
            <div ref={buyRef}>
            <div className="mt-8 flex flex-wrap items-stretch gap-3">
              <QtyStepper value={qty} onChange={setQty} label={t('product.quantity')} />
              <Button
                variant="signal"
                size="lg"
                icon={added ? 'check' : 'cart'}
                onClick={onAdd}
                disabled={out}
                className="flex-1"
              >
                {out ? t('product.outOfStock') : added ? t('product.added') : t('product.addToCart')}
              </Button>
            </div>

            <Button
              href={productEnquiryUrl(product, lang)}
              variant="whatsapp"
              size="lg"
              icon="whatsapp"
              className="mt-3 w-full"
            >
              {t('product.buyNow')}
            </Button>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <Link to={path(paths.shipping())} className="flex items-center gap-3 hover:underline">
                  <Icon name="truck" className="h-4 w-4 shrink-0 text-signal-600" />
                  {t('why.delivery.d')}
                </Link>
              </li>
              <li>
                <Link to={path(paths.maintenance())} className="flex items-center gap-3 hover:underline">
                  <Icon name="wrench" className="h-4 w-4 shrink-0 text-signal-600" />
                  {t('why.support.d')}
                </Link>
              </li>
            </ul>

            <p className="label mt-7 muted">
              {t('product.sku')} <span className="tnum text-carbon-900 dark:text-carbon-100">{product.sku}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ description + spec */}
      <Section className="border-t rule">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{t('product.details')}</Eyebrow>
            <p className="mt-6 max-w-prose text-[17px] leading-[1.85] text-carbon-700 dark:text-carbon-300">
              {tr(product.description)}
            </p>

            {product.features ? (
              <>
                <h2 className="mt-12 text-xl font-bold">{t('product.features')}</h2>
                <ul className="mt-5 space-y-3">
                  {tr(product.features).map((f) => (
                    <li key={f} className="flex gap-3.5 text-[16px] leading-relaxed">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-signal-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {product.fit ? (
              <>
                <h2 className="mt-12 text-xl font-bold">{t('product.fit')}</h2>
                <dl className="mt-5 max-w-md">
                  {product.fit.ageMin != null ? (
                    <SpecRow
                      label={t('product.suitableAges')}
                      value={`${num(product.fit.ageMin)} – ${num(product.fit.ageMax ?? 99)} ${t('product.years')}`}
                    />
                  ) : null}
                  {product.fit.heightMin != null ? (
                    <SpecRow
                      label={t('product.suitableHeights')}
                      value={`${num(product.fit.heightMin)} – ${num(product.fit.heightMax ?? 999)} ${t('product.cm')}`}
                    />
                  ) : null}
                </dl>
                <Button
                  as={Link}
                  to={path(paths.sizeGuide())}
                  variant="outline"
                  size="md"
                  icon="ruler"
                  className="mt-7"
                >
                  {t('home.sizeTeaserCta')}
                </Button>
              </>
            ) : null}
          </div>

          <div className="lg:col-span-5">
            <Eyebrow>{t('product.specifications')}</Eyebrow>
            <dl className="mt-6 border-t rule">
              <SpecRow label={t('product.sku')} value={product.sku} />
              {category ? <SpecRow label={t('product.category')} value={tr(category.name)} /> : null}
              {specs.wheelSize ? <SpecRow label={t('product.wheelSize')} value={`${specs.wheelSize}"`} /> : null}
              {specs.frameSize ? <SpecRow label={t('product.frameSize')} value={tr(specs.frameSize)} /> : null}
              {specs.frameMaterial ? (
                <SpecRow
                  label={t('product.frameMaterial')}
                  value={t(`material.${specs.frameMaterial}`)}
                  help={t(`specHelp.material.${specs.frameMaterial}`)}
                />
              ) : null}
              {specs.gears ? <SpecRow label={t('product.gears')} value={num(specs.gears)} /> : null}
              {specs.brakes ? (
                <SpecRow
                  label={t('product.brakes')}
                  value={t(`brakes.${specs.brakes}`)}
                  help={t(`specHelp.brakes.${specs.brakes}`)}
                />
              ) : null}
              {specs.suspension ? (
                <SpecRow
                  label={t('product.suspension')}
                  value={t(`suspension.${specs.suspension}`)}
                  help={t(`specHelp.suspension.${specs.suspension}`)}
                />
              ) : null}
              {specs.weightKg ? (
                <SpecRow label={t('product.weight')} value={`${num(specs.weightKg)} ${t('product.kg')}`} />
              ) : null}
              {specs.dimensionsCm ? (
                <SpecRow
                  label={t('product.dimensions')}
                  value={`${num(specs.dimensionsCm.length)} × ${num(specs.dimensionsCm.width)} × ${num(specs.dimensionsCm.height)} ${t('product.cm')}`}
                />
              ) : null}
              {specs.maxLoadKg ? (
                <SpecRow label={t('product.maxLoad')} value={`${num(specs.maxLoadKg)} ${t('product.kg')}`} />
              ) : null}
              <SpecRow
                label={t('product.warranty')}
                value={tr(SITE.warranty.note)}
              />
            </dl>
          </div>
        </div>
      </Section>


      {/* Phone buy bar: price and the two actions stay in reach while reading. */}
      <div
        aria-hidden={buyButtonsVisible || undefined}
        className={`fixed inset-x-0 bottom-0 z-40 border-t bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-200 rule dark:bg-carbon-950/95 lg:hidden print:hidden ${
          buyButtonsVisible ? 'pointer-events-none translate-y-full' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs muted">{name}</p>
            <p className="tnum text-lg font-bold leading-tight">{price(product.price)}</p>
          </div>
          <Button variant="signal" size="md" icon={added ? 'check' : 'cart'} onClick={onAdd} disabled={out} aria-label={t('product.addToCart')} className="!px-4">
            <span className="hidden xs:inline">{added ? t('product.added') : t('product.addToCart')}</span>
          </Button>
          <Button href={productEnquiryUrl(product, lang)} variant="whatsapp" size="md" icon="whatsapp" className="!px-4">
            {lang === 'ar' ? 'اطلب' : 'Order'}
          </Button>
        </div>
      </div>
      {related.length ? (
        <Section className="border-t rule">
          <div className="container-page">
            <SectionHead title={t('product.related')} />
            <ProductGrid products={related} className="mt-6" cols="grid-cols-2 lg:grid-cols-4" />
          </div>
        </Section>
      ) : null}
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </>
  );
}
