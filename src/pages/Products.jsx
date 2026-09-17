import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/layout/Layout.jsx';
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
import { Seo, breadcrumbSchema, itemListSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { useMediaQuery } from '../lib/hooks.js';
import { paths } from '../lib/routes.js';
import { CATEGORIES } from '../data/categories.js';
import { queryProducts, ACCESSORY_PRODUCTS, BIKE_PRODUCTS } from '../data/products.js';
import { editorialImage } from '../data/media.js';
import { searchProducts } from '../lib/search.js';
import { AGE_GROUPS, PRODUCT_TYPES, getAgeGroup, getProductType } from '../data/collections.js';
import { SITE } from '../config/site.js';
import { whatsappUrl } from '../lib/whatsapp.js';
import NotFound from './NotFound.jsx';

/* ==========================================================================
   Catalogue
   --------------------------------------------------------------------------
   Filters live in the URL, so a filtered view is shareable, bookmarkable and
   survives a refresh — and the back button behaves the way people expect.
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

export default function Products({ variant }) {
  const { t, tr, lang, path } = useLocale();
  const [sp, setSp] = useSearchParams();
  const { ageSlug, typeSlug } = useParams();
  const navigate = useNavigate();
  const ageCollection = getAgeGroup(ageSlug);
  const typeCollection = getProductType(typeSlug);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isAccessories = variant === 'accessories';

  const parsed = { ...EMPTY_FILTERS, ...readParams(sp), ...(ageCollection ? { ageGroup: ageSlug } : {}), ...(typeCollection ? { productType: typeSlug } : {}) };
  const filters = parsed;
  const sort = parsed.sort;
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (isDesktop) setSheetOpen(false);
  }, [isDesktop]);

  const apply = (nextFilters, nextSort = sort) => {
    const query = writeParams(nextFilters, nextSort);
    // Changing a collection filter leaves the old path so it cannot silently
    // override the new choice on refresh or browser back/forward navigation.
    if ((ageSlug && nextFilters.ageGroup !== ageSlug) || (typeSlug && nextFilters.productType !== typeSlug)) {
      navigate(path(paths.products(query.toString())));
    } else {
      if (ageSlug) query.delete('ageGroup');
      if (typeSlug) query.delete('type');
      setSp(query);
    }
  };

  const pool = isAccessories ? ACCESSORY_PRODUCTS : BIKE_PRODUCTS;

  const results = useMemo(() => {
    /* `search` is handled separately below: queryProducts does a plain
       substring match, which in Arabic misses "دراجه" vs "دراجة". */
    const found = queryProducts({
      ...filters,
      search: '',
      category: isAccessories ? 'accessories' : filters.category,
      sort,
      lang,
    });

    /* With no category chosen, queryProducts returns the whole catalogue —
       accessories included. The bikes page must never list them. */
    const scoped = isAccessories ? found : found.filter((p) => p.category !== 'accessories');

    if (!filters.search) return scoped;

    /* When searching, relevance beats the sort dropdown: the ranked order from
       the search index wins, narrowed to whatever the filters still allow. */
    const allowed = new Set(scoped.map((p) => p.id));
    return (searchProducts(filters.search) || []).filter((p) => allowed.has(p.id));
  }, [filters, sort, lang, isAccessories]);

  const activeCategory =
    !isAccessories && filters.category ? CATEGORIES.find((c) => c.slug === filters.category) : null;

  const collection = ageCollection || typeCollection;
  const title = collection
    ? `${ageCollection ? (lang === 'ar' ? 'دراجات ولعب أطفال ' : 'Shop ') : ''}${tr(collection.label)}`
    : isAccessories
    ? t('product.accessories')
    : activeCategory
      ? tr(activeCategory.name)
      : t('product.products');

  const lede = collection ? tr(collection.description) : isAccessories
    ? t('home.accessoriesSubtitle')
    : activeCategory
      ? tr(activeCategory.description)
      : t('home.categoriesSubtitle');

  const activeCount = countActive(filters);
  const canonicalPath = ageCollection ? paths.byAge(ageSlug) : typeCollection ? paths.byType(typeSlug) : isAccessories ? paths.accessories() : paths.products();
  if ((ageSlug && !ageCollection) || (typeSlug && !typeCollection)) return <NotFound />;

  return (
    <>
      <Seo
        lang={lang}
        title={`${title} — ${lang === 'ar' ? 'مودي بايك أبو كبير' : 'ModyBike Abu Kabir'}`}
        description={lede}
        canonicalPath={canonicalPath}
        noindex={sp.size > 0}
        jsonLd={[
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: title, path: path(canonicalPath) },
          ]),
          !SITE.isPlaceholderContent && itemListSchema(results.slice(0, 24), { lang, name: title }),
        ].filter(Boolean)}
      />

      <PageHeader
        eyebrow={lang === 'ar' ? 'مودي بايك · أبو كبير، الشرقية' : 'ModyBike · Abu Kabir, Al Sharqia'}
        title={title}
        lede={lede}
        image={isAccessories || (typeCollection && typeSlug !== 'bikes') ? editorialImage('hero-shop-in') : editorialImage('hero-range')}
        breadcrumbs={[{ label: title }]}
      />

      {!isAccessories && <section className="container-page py-8 space-y-5">
        <nav aria-label={lang === 'ar' ? 'تصفح حسب العمر' : 'Browse by age'} className="flex flex-wrap gap-3">
          {AGE_GROUPS.map((group) => <Link key={group.slug} to={path(paths.byAge(group.slug))} aria-current={ageSlug === group.slug ? 'page' : undefined} className={`border px-4 py-3 text-sm font-semibold rule ${filters.ageGroup === group.slug ? 'bg-carbon-950 text-white dark:bg-paper dark:text-carbon-950' : ''}`}>{tr(group.label)}</Link>)}
        </nav>
        <nav aria-label={lang === 'ar' ? 'تصفح حسب النوع' : 'Browse by product type'} className="flex flex-wrap gap-5 text-sm font-semibold">
          {PRODUCT_TYPES.map((type) => <Link key={type.slug} to={path(paths.byType(type.slug))} className="link-underline">{tr(type.label)}</Link>)}
        </nav>
        <p className="text-sm leading-relaxed muted">{lang === 'ar' ? 'الفئات العمرية بتتداخل لأن كل طفل بينمو بشكل مختلف. العمر بداية للاختيار؛ الطول والمقاس وتعليمات الشركة المصنعة هم الأساس.' : 'Age groups overlap because children grow differently. Age is a starting point; height, fit and manufacturer guidance determine suitability.'}</p>
        <Button href={whatsappUrl(lang === 'ar' ? `أهلاً مودي بايك، أريد معرفة المتاح والأسعار في قسم ${title}.` : `Hello ModyBike, please share available options and prices for ${title}.`)} variant="whatsapp" icon="whatsapp">{lang === 'ar' ? 'اسأل عن المتاح والأسعار' : 'Ask about availability and prices'}</Button>
      </section>}

      {/* category rail — lateral movement without opening the filter sheet */}
      {!isAccessories ? (
        <nav aria-label={t('product.filterCategory')} className="border-b rule">
          <ul className="no-scrollbar container-page flex gap-6 overflow-x-auto py-4" role="list">
            <li>
              <Link
                to={path(paths.products())}
                className={`label whitespace-nowrap transition-colors ${
                  !filters.category ? 'text-signal-600 dark:text-signal-400' : 'muted hover:opacity-60'
                }`}
              >
                {t('common.all')}
              </Link>
            </li>
            {CATEGORIES.filter((c) => c.kind === 'bike').map((c) => (
              <li key={c.slug}>
                <Link
                  to={path(paths.productsByCategory(c.slug))}
                  className={`label whitespace-nowrap transition-colors ${
                    filters.category === c.slug
                      ? 'text-signal-600 dark:text-signal-400'
                      : 'muted hover:opacity-60'
                  }`}
                >
                  {tr(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <div className="container-page py-10 lg:py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-[100px] lg:h-max lg:pt-16">
            <FilterSidebar
              value={filters}
              onChange={(f) => apply(f)}
              onClear={() => apply({ ...EMPTY_FILTERS })}
              showCategory={!isAccessories}
            />
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

            {/* An active search is shown as a removable chip, so nobody is left
                wondering why the grid is short after arriving from search. */}
            {filters.search ? (
              <div className="flex flex-wrap items-center gap-3 pt-8">
                <span className="label muted">{t('common.search')}</span>
                <button
                  type="button"
                  onClick={() => apply({ ...filters, search: '' })}
                  className="group inline-flex items-center gap-2 border px-3 py-2 text-sm font-semibold transition-colors rule hover:border-carbon-950 dark:hover:border-carbon-300"
                >
                  “{filters.search}”
                  <Icon
                    name="close"
                    className="h-3.5 w-3.5 text-carbon-400 transition-colors group-hover:text-state-out dark:group-hover:text-state-out-dark dark:hover:text-state-out-dark"
                  />
                </button>
              </div>
            ) : null}

            <div className="pt-10">
              {results.length ? (
                <ProductGrid products={results} priorityCount={4} cols="grid-cols-2 xl:grid-cols-3" />
              ) : (
                <div className="border py-20 text-center rule">
                  <Icon name="search" className="mx-auto h-8 w-8 text-carbon-300 dark:text-carbon-600" />
                  <p className="mt-5 text-lg font-bold">{t('common.noResults')}</p>
                  <p className="mx-auto mt-2 max-w-measure text-sm muted">{lang === 'ar' ? 'لسه مفيش موديلات منشورة مطابقة لاختيارك. تواصل معنا لمعرفة المتاح وصوره وسعره.' : 'No published models match this selection yet. Contact us for current options, photos and prices.'}</p>
                  {activeCount ? (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => apply({ ...EMPTY_FILTERS })}
                      className="mt-7"
                    >
                      {t('product.clearFilters')}
                    </Button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FilterSheet
        open={sheetOpen && !isDesktop}
        onClose={() => setSheetOpen(false)}
        value={filters}
        onChange={(f) => apply(f)}
        onClear={() => apply({ ...EMPTY_FILTERS })}
        showCategory={!isAccessories}
        shown={results.length}
        total={pool.length}
      />
    </>
  );
}
