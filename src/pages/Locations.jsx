import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound.jsx';
import { PageHeader } from '../components/layout/Layout.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Eyebrow, Section, SectionHead, SpecRow } from '../components/ui/primitives.jsx';
import { ProductGrid } from '../components/product/ProductCard.jsx';
import { Seo, breadcrumbSchema, localAreaSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { locationEnquiryUrl } from '../lib/whatsapp.js';
import { LOCATIONS, GOVERNORATE, getLocation } from '../data/locations.js';
import { featuredProducts } from '../data/products.js';
import { SITE } from '../config/site.js';

/* ==========================================================================
   Delivery areas
   --------------------------------------------------------------------------
   One page per Sharqia city with the villages it covers. No delivery prices.
   ========================================================================== */

export default function Locations() {
  const { t, tr, lang, path, num } = useLocale();

  return (
    <>
      <Seo
        lang={lang}
        title={`${t('locations.title')} — ${t('common.brand')}`}
        description={t('locations.subtitle')}
        canonicalPath={paths.locations()}
        jsonLd={[
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('locations.title'), path: paths.locations() },
          ]),
        ]}
      />

      <PageHeader
        eyebrow={tr(GOVERNORATE.name)}
        title={t('locations.title')}
        lede={t('locations.subtitle')}
        breadcrumbs={[{ label: t('locations.title') }]}
      />

      <Section>
        <div className="container-page">
          <ul role="list">
            {LOCATIONS.map((loc) => (
              <li key={loc.slug} className="group border-t rule last:border-b">
                <Link
                  to={path(paths.location(loc.slug))}
                  className="grid items-baseline gap-y-3 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8"
                >                  <div className="min-w-0">
                    <h2 className="text-xl font-bold tracking-tight transition-colors group-hover:text-signal-600 dark:group-hover:text-signal-400 sm:text-2xl">
                      {tr(loc.name)}
                      {loc.slug === 'abu-kabir' ? (
                        <span className="label ms-3 align-middle text-signal-600 dark:text-signal-400">
                          {lang === 'ar' ? 'المعرض' : 'Showroom'}
                        </span>
                      ) : null}
                    </h2>
                    <p className="mt-1.5 line-clamp-1 text-sm muted">
                      {tr(loc.areas).slice(0, 4).join(' · ')}
                    </p>
                  </div>

                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

/* -------------------------------------------------------------------------- */

export function LocationDetail() {
  const { slug } = useParams();
  const { t, tr, lang, path, num } = useLocale();

  const loc = getLocation(slug);
  if (!loc) return <NotFound />;

  const others = LOCATIONS.filter((l) => l.slug !== slug).slice(0, 12);
  const city = tr(loc.name);
  const featured = featuredProducts(4);

  return (
    <>
      <Seo
        lang={lang}
        title={`${t('locations.pageTitle', { city })} — ${t('common.brand')}`}
        description={tr(loc.blurb)}
        canonicalPath={paths.location(slug)}
        jsonLd={[
          localAreaSchema(loc, lang),
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('locations.title'), path: paths.locations() },
            { name: city, path: paths.location(slug) },
          ]),
        ].filter(Boolean)}
      />

      <PageHeader
        eyebrow={tr(GOVERNORATE.name)}
        title={t('locations.pageTitle', { city })}
        lede={tr(loc.blurb)}
        breadcrumbs={[{ label: t('locations.title'), to: path(paths.locations()) }, { label: city }]}
      />

      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>{t('locations.deliveryTo', { city })}</Eyebrow>
            <dl className="mt-6 border-t rule">
              <SpecRow
                label={t('locations.deliveryTime')}
                value={tr(loc.etaDays) || tr(SITE.shipping.etaDays)}
              />
            </dl>

            <Button
              href={locationEnquiryUrl(loc, lang)}
              variant="whatsapp"
              size="lg"
              icon="whatsapp"
              className="mt-8 w-full sm:w-auto"
            >
              {t('locations.orderNow', { city })}
            </Button>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow>{t('locations.nearbyAreas')}</Eyebrow>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2.5" role="list">
              {tr(loc.areas).map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 border px-3 py-2 text-sm rule"
                >
                  <Icon name="mapPin" className="h-3.5 w-3.5 shrink-0 text-signal-500" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="border-t bg-paper-sunk rule dark:bg-carbon-900/50">
        <div className="container-page">
          <SectionHead
            eyebrow={t('home.featuredTitle')}
            title={t('locations.pageTitle', { city })}
            action={
              <Button as={Link} to={path(paths.products())} variant="ghost" iconEnd="arrowRight">
                {t('common.viewAll')}
              </Button>
            }
          />
          <ProductGrid products={featured} className="mt-12" cols="grid-cols-2 lg:grid-cols-4" />
        </div>
      </Section>

      <Section className="border-t rule">
        <div className="container-page">
          <h2 className="label muted">{t('locations.otherAreas')}</h2>
          <ul className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-3" role="list">
            {others.map((l, i) => (
              <li key={l.slug} className="flex items-baseline gap-3">
                {i > 0 ? (
                  <span className="text-carbon-300 dark:text-carbon-700" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <Link
                  to={path(paths.location(l.slug))}
                  className="link-underline text-lg font-bold tracking-tight transition-colors hover:text-signal-600 dark:hover:text-signal-400"
                >
                  {tr(l.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
