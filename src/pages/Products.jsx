import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Layout.jsx';
import { ProductGrid } from '../components/product/ProductCard.jsx';
import {
  EMPTY_FILTERS,
  FilterSheet,
  FilterSidebar,
  FilterToolbar,
  countActive,
} from '../components/product/ProductFilters.jsx';
import { Button } from '../components/ui/primitives.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Seo, breadcrumbSchema, itemListSchema, shareImage } from '../lib/seo.jsx';
import { latinDigits, modelCount } from '../lib/productSeo.js';
import { useLocale } from '../i18n/index.jsx';
import { useMediaQuery } from '../lib/hooks.js';
import { paths } from '../lib/routes.js';
import { CATEGORIES } from '../data/categories.js';
import { queryProducts, BIKE_PRODUCTS, LIVE_PRODUCT_TYPES, WHEEL_SIZES } from '../data/products.js';
import { searchProducts } from '../lib/search.js';
import { AGE_GROUPS, getAgeGroup, getProductType } from '../data/collections.js';
import { SITE } from '../config/site.js';
import { whatsappUrl } from '../lib/whatsapp.js';
import NotFound from './NotFound.jsx';

/* ==========================================================================
   Catalogue
   --------------------------------------------------------------------------
   Products come first: breadcrumb, title, one row of shortcuts, then the
   grid. Descriptive copy for search engines sits under the grid.
   Filters live in the URL so a filtered view survives refresh and sharing.
   ========================================================================== */

function readParams(sp) {
  const nums = (k) =>
    (sp.get(k) || '')
      .split(',')
      .filter(Boolean)
      .map((v) => (Number.isNaN(Number(v)) ? v : Number(v)));

  return {
    ageGroup: sp.get('ageGroup') || null,
    productType: sp.get('type') || null,
    category: sp.get('category') || null,
    subcategory: sp.get('sub') || null,
    wheelSizes: nums('wheel'),
    brakes: (sp.get('brakes') || '').split(',').filter(Boolean),
    maxPrice: sp.get('maxPrice') ? Number(sp.get('maxPrice')) : null,
    height: sp.get('height') ? Number(sp.get('height')) : null,
    inStockOnly: sp.get('inStock') === '1',
    search: sp.get('q') || '',
    sort: sp.get('sort') || 'featured',
  };
}

function writeParams(filters, sort) {
  const sp = new URLSearchParams();
  if (filters.ageGroup) sp.set('ageGroup', filters.ageGroup);
  if (filters.productType) sp.set('type', filters.productType);
  if (filters.category) sp.set('category', filters.category);
  if (filters.subcategory) sp.set('sub', filters.subcategory);
  if (filters.wheelSizes?.length) sp.set('wheel', filters.wheelSizes.join(','));
  if (filters.brakes?.length) sp.set('brakes', filters.brakes.join(','));
  if (filters.maxPrice != null) sp.set('maxPrice', String(filters.maxPrice));
  if (filters.height != null) sp.set('height', String(filters.height));
  if (filters.inStockOnly) sp.set('inStock', '1');
  if (filters.search) sp.set('q', filters.search);
  if (sort && sort !== 'featured') sp.set('sort', sort);
  return sp;
}

/** One scrollable row of shortcuts: all bikes, each age band, each bike style. */
function ShortcutRail({ current }) {
  const { t, tr, path, lang } = useLocale();
  const items = [
    { key: 'all', label: lang === 'ar' ? 'كل الدراجات' : 'All bikes', to: paths.products() },
    ...AGE_GROUPS.map((g) => ({ key: `age:${g.slug}`, label: tr(g.label), to: paths.byAge(g.slug) })),
    ...CATEGORIES.filter((c) => c.kind === 'bike').map((c) => ({ key: `cat:${c.slug}`, label: tr(c.name), to: paths.byCategory(c.slug) })),
    ...LIVE_PRODUCT_TYPES.filter((type) => type.slug !== 'bikes').map((type) => ({ key: `type:${type.slug}`, label: tr(type.label), to: paths.byType(type.slug) })),
  ];
  const listRef = useRef(null);

  // Bring the current section's chip into view on phones, where the row scrolls.
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector('[aria-current="page"]');
    if (!list || !el) return;
    list.scrollLeft += el.getBoundingClientRect().left - list.getBoundingClientRect().left - 20;
  }, [current]);

  return (
    <nav aria-label={lang === 'ar' ? 'الأقسام' : 'Sections'} className="border-b rule">
      <ul ref={listRef} className="no-scrollbar container-page flex gap-2 overflow-x-auto py-3" role="list">
        {items.map((item) => {
          const active = item.key === current;
          return (
            <li key={item.key} className="shrink-0">
              <Link
                to={path(item.to)}
                aria-current={active ? 'page' : undefined}
                className={`block whitespace-nowrap border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-carbon-950 bg-carbon-950 text-paper dark:border-paper dark:bg-paper dark:text-carbon-950'
                    : 'rule hover:border-carbon-950 dark:hover:border-carbon-300'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** One plain sentence on who a wheel size is for, from the size table. */
function sizeAdvice(inches, lang) {
  const ar = { 12: 'مناسبة لسن 3–5 سنين تقريبًا (طول 85–105 سم).', 16: 'مناسبة لسن 4–8 سنين تقريبًا (طول 105–120 سم).', 20: 'مناسبة لسن 6–12 سنة تقريبًا (طول 120–135 سم).', 24: 'مناسبة لسن 10 سنين فأكثر (طول 135–150 سم).', 26: 'للشباب والكبار من سن 12 سنة (طول 150 سم فأكثر).' };
  const en = { 12: 'Usually ages 3–5 (85–105 cm tall).', 16: 'Usually ages 4–8 (105–120 cm tall).', 20: 'Usually ages 6–12 (120–135 cm tall).', 24: 'Usually ages 10 and up (135–150 cm tall).', 26: 'For teens and adults from about 12 (150 cm and taller).' };
  return (lang === 'ar' ? ar : en)[inches] || '';
}

export default function Products() {
  const { t, tr, lang, path, price } = useLocale();
  const [sp, setSp] = useSearchParams();
  const { ageSlug, typeSlug, categorySlug, sizeSlug } = useParams();
  const navigate = useNavigate();
  const ageCollection = getAgeGroup(ageSlug);
  const typeCollection = getProductType(typeSlug);
  const categoryCollection = categorySlug ? CATEGORIES.find((c) => c.slug === categorySlug && c.kind === 'bike') : null;
  const sizeCollection = sizeSlug ? WHEEL_SIZES.find((inches) => `${inches}-inch` === sizeSlug) : null;
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const filters = {
    ...EMPTY_FILTERS,
    ...readParams(sp),
    ...(ageCollection ? { ageGroup: ageSlug } : {}),
    ...(typeCollection ? { productType: typeSlug } : {}),
    ...(categoryCollection ? { category: categorySlug } : {}),
    ...(sizeCollection ? { wheelSizes: [sizeCollection] } : {}),
  };
  const sort = filters.sort;
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (isDesktop) setSheetOpen(false);
  }, [isDesktop]);

  const apply = (nextFilters, nextSort = sort) => {
    const query = writeParams(nextFilters, nextSort);
    // Changing a collection filter leaves the collection path so the old
    // choice cannot silently come back on refresh or back/forward.
    const leavesSize = sizeSlug && !(nextFilters.wheelSizes?.length === 1 && nextFilters.wheelSizes[0] === sizeCollection);
    if ((ageSlug && nextFilters.ageGroup !== ageSlug) || (typeSlug && nextFilters.productType !== typeSlug)
      || (categorySlug && nextFilters.category !== categorySlug) || leavesSize) {
      navigate(path(paths.products(query.toString())));
    } else {
      if (ageSlug) query.delete('ageGroup');
      if (typeSlug) query.delete('type');
      if (categorySlug) query.delete('category');
      if (sizeSlug) query.delete('wheel');
      setSp(query);
    }
  };

  const pool = BIKE_PRODUCTS;

  const results = useMemo(() => {
    // Search goes through the search index (it handles دراجه / دراجة);
    // queryProducts only does a plain substring match.
    const found = queryProducts({
      ...filters,
      search: '',
      category: filters.category,
      sort,
      lang,
    });
    const scoped = found;
    if (!filters.search) return scoped;
    const allowed = new Set(scoped.map((p) => p.id));
    return (searchProducts(filters.search) || []).filter((p) => allowed.has(p.id));
  }, [sp, ageSlug, typeSlug, categorySlug, sizeSlug, lang]);

  if ((ageSlug && !ageCollection) || (typeSlug && !typeCollection) || (categorySlug && !categoryCollection) || (sizeSlug && !sizeCollection)) return <NotFound />;

  const activeCategory = filters.category ? CATEGORIES.find((c) => c.slug === filters.category) : null;
  const collection = ageCollection || typeCollection;

  const title = ageCollection
    ? lang === 'ar'
      ? `${ageCollection.max ? 'دراجات أطفال' : 'دراجات شباب وكبار'} ${tr(ageCollection.label)}`
      : `Bikes for ${tr(ageCollection.label).toLowerCase()}`
    : typeCollection
      ? tr(typeCollection.label)
      : sizeCollection
        ? lang === 'ar' ? `عجل مقاس ${sizeCollection} بوصة` : `${sizeCollection}-inch bikes`
        : activeCategory
          ? tr(activeCategory.name)
          : t('product.allProducts');

  const prices = results.map((p) => p.price);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const priceSpan = !prices.length
    ? ''
    : low === high
      ? `${modelCount(results.length, lang)} ${lang === 'ar' ? 'بسعر' : 'at'} ${price(low)}`
      : `${modelCount(results.length, lang)} ${lang === 'ar' ? `من ${price(low)} لـ ${price(high)}` : `from ${price(low)} to ${price(high)}`}`;

  const about = collection ? tr(collection.description) : sizeCollection
      ? lang === 'ar'
        ? `كل العجل مقاس ${sizeCollection} بوصة في ${t('common.brand')} بالأسعار والصور. ${sizeAdvice(sizeCollection, lang)}`
        : `Every ${sizeCollection}-inch bike at ${t('common.brand')}, with prices and photos. ${sizeAdvice(sizeCollection, lang)}`
      : activeCategory
        ? tr(activeCategory.description)
        : lang === 'ar'
          ? 'كل العجل والدراجات في مودي بايك بالأسعار: أطفال وشباب وكبار، مقاس 12 لـ 26 بوصة.'
          : 'Every bike at ModyBike with prices: kids, teens and adults, 12 to 26 inch.';

  const current = ageCollection
    ? `age:${ageSlug}`
    : typeCollection
      ? `type:${typeSlug}`
      : sizeCollection
        ? `size:${sizeCollection}`
        : activeCategory
          ? `cat:${activeCategory.slug}`
          : 'all';

  const activeCount = countActive(filters);
  const canonicalPath = ageCollection
    ? paths.byAge(ageSlug)
    : typeCollection
      ? paths.byType(typeSlug)
      : sizeCollection
        ? paths.bySize(sizeCollection)
        : activeCategory && (categoryCollection || [...sp.keys()].every((k) => k === 'category'))
          ? paths.byCategory(activeCategory.slug)
          : paths.products();
  const emptyType = typeCollection && !LIVE_PRODUCT_TYPES.some((type) => type.slug === typeSlug);
  const countLabel = modelCount(results.length, lang);
  const seoTitle = canonicalPath === paths.products()
      ? (lang === 'ar' ? 'كل العجل والدراجات بالأسعار' : 'All bikes with prices')
      : lang === 'ar'
        ? `${latinDigits(activeCategory?.seo?.ar || title.replace(/^دراجات/, 'عجل ودراجات'))} بالأسعار`
        : `${title} with prices`;
  const allSeoDescription = !priceSpan
    ? about
    : lang === 'ar'
      ? `${latinDigits(title)}: ${priceSpan}. اطلب على واتساب ${SITE.contact.whatsappDisplay} والتوصيل لحد البيت.`
      : `${title}: ${priceSpan}. Order on WhatsApp ${SITE.contact.whatsappDisplay} for delivery to your door.`;

  return (
    <>
      <Seo
        lang={lang}
        title={seoTitle}
        description={allSeoDescription}
        canonicalPath={canonicalPath}
        image={canonicalPath === paths.products() || !results.length ? undefined : shareImage('products', results[0].slug)}
        noindex={sp.size > 0 || emptyType}
        jsonLd={[
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            ...(canonicalPath !== paths.products() ? [{ name: t('product.products'), path: paths.products() }] : []),
            { name: title, path: canonicalPath },
          ], lang),
          !SITE.isPlaceholderContent && results.length ? itemListSchema(results.slice(0, 24), { lang, name: title }) : null,
        ].filter(Boolean)}
      />

      <div className="container-page pt-4 sm:pt-6">
        <Breadcrumbs items={[{ label: title }]} />
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-3">
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="text-sm muted">{countLabel}</p>
        </div>
      </div>

      <ShortcutRail current={current} />

      <div className="container-page pb-12 pt-2 lg:pb-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10">
          <aside className="lg:sticky lg:top-[84px] lg:h-max lg:pt-4">
            <FilterSidebar value={filters} onChange={(f) => apply(f)} onClear={() => apply({ ...EMPTY_FILTERS })} showCategory />
          </aside>

          <div className="min-w-0">
            <FilterToolbar
              shown={results.length}
              total={pool.length}
              sort={sort}
              onSort={(s) => apply(filters, s)}
              onOpenFilters={() => setSheetOpen(true)}
              activeCount={activeCount}
            />

            {filters.search ? (
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <span className="text-sm muted">{t('common.search')}</span>
                <button
                  type="button"
                  onClick={() => apply({ ...filters, search: '' })}
                  className="inline-flex items-center gap-2 border px-3 py-2 text-sm font-semibold rule"
                >
                  “{filters.search}”
                  <Icon name="close" className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : null}

            <div className="pt-5">
              {results.length ? (
                <ProductGrid products={results} priorityCount={4} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-4" />
              ) : (
                <div className="border px-5 py-14 text-center rule">
                  <p className="text-lg font-bold">{t('common.noResults')}</p>
                  <p className="mx-auto mt-2 max-w-measure text-sm muted">
                    {lang === 'ar' ? 'ابعت لنا على واتساب اللي بتدوّر عليه ونرد عليك بالمتاح.' : 'Message us on WhatsApp with what you need and we will reply with what is available.'}
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {activeCount ? (
                      <Button variant="outline" size="md" onClick={() => apply({ ...EMPTY_FILTERS })}>
                        {t('product.clearFilters')}
                      </Button>
                    ) : null}
                    <Button href={whatsappUrl(lang === 'ar' ? `السلام عليكم، بدوّر على: ${title}` : `Hello, I am looking for: ${title}`)} variant="whatsapp" size="md" icon="whatsapp">
                      {t('home.ctaButton')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Descriptive copy after the products, for people who scroll and for search engines. */}
      <section className="border-t rule">
        <div className="container-page grid gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-prose">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed muted">{about}</p>
            <p className="mt-2 text-[15px] leading-relaxed muted">
              {lang === 'ar'
                ? 'العمر للتسهيل بس؛ المقاس الصح بيتحدد بالطول. شوف دليل المقاسات لو محتار.'
                : 'Age is a guide; the right size depends on height. See the size guide if unsure.'}
            </p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-[15px]">
              <span className="font-semibold">{lang === 'ar' ? 'تسوّق حسب المقاس:' : 'Shop by wheel size:'}</span>
              {WHEEL_SIZES.map((inches) => (
                <Link key={inches} to={path(paths.bySize(inches))} className="link-underline font-semibold text-signal-700 dark:text-signal-400">
                  {lang === 'ar' ? `عجل ${inches}` : `${inches}"`}
                </Link>
              ))}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button as={Link} to={path(paths.sizeGuide())} variant="outline" size="md" icon="ruler">
              {t('nav.sizeGuide')}
            </Button>
            <Button href={`${import.meta.env.BASE_URL}catalogue/modybike-catalogue-${lang}.pdf`} variant="outline" size="md" icon="download" target="_blank" rel="noopener">
              {t('nav.catalogue')}
            </Button>
          </div>
        </div>
      </section>

      <FilterSheet
        open={sheetOpen && !isDesktop}
        onClose={() => setSheetOpen(false)}
        value={filters}
        onChange={(f) => apply(f)}
        onClear={() => apply({ ...EMPTY_FILTERS })}
        showCategory
        shown={results.length}
        total={pool.length}
      />
    </>
  );
}
