import { createContext, useContext, useEffect, useMemo } from 'react';
import { SITE } from '../config/site.js';
import { stripLocale } from '../i18n/index.jsx';

/**
 * A tiny head manager — ~100 lines instead of a dependency.
 *
 * On the server the <Seo> component writes into a collector object that the
 * prerenderer serialises into real <meta> tags, so crawlers (and AI crawlers,
 * which mostly do not run JS) see everything in the raw HTML.
 * On the client it patches the DOM after navigation.
 */
const HeadCollectorContext = createContext(null);

export function HeadCollectorProvider({ collector, children }) {
  return (
    <HeadCollectorContext.Provider value={collector}>{children}</HeadCollectorContext.Provider>
  );
}

export function absoluteUrl(path = '/') {
  const base = SITE.baseUrl.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p === '/' ? '/' : p.replace(/\/+$/, '')}`;
}

/** Both language versions of a page, for hreflang. */
export function alternatesFor(pathname) {
  const bare = stripLocale(pathname);
  return {
    ar: absoluteUrl(bare),
    en: absoluteUrl(bare === '/' ? '/en' : `/en${bare}`),
  };
}

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href, extra = {}) {
  if (!href) return;
  const selector = extra.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function applyToDocument(head) {
  if (typeof document === 'undefined') return;
  if (head.title) document.title = head.title;
  upsertMeta('name', 'description', head.description);
  upsertMeta('name', 'robots', head.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  upsertMeta('name', 'keywords', head.keywords);

  upsertMeta('property', 'og:title', head.title);
  upsertMeta('property', 'og:description', head.description);
  upsertMeta('property', 'og:type', head.type || 'website');
  upsertMeta('property', 'og:url', head.canonical);
  upsertMeta('property', 'og:image', head.image || absoluteUrl('/og-default.png'));
  upsertMeta('property', 'og:site_name', SITE.name.ar);
  upsertMeta('property', 'og:locale', head.lang === 'en' ? 'en_US' : 'ar_EG');
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', head.title);
  upsertMeta('name', 'twitter:description', head.description);
  upsertMeta('name', 'twitter:image', head.image || absoluteUrl('/og-default.png'));

  upsertLink('canonical', head.canonical);
  if (head.alternates) {
    upsertLink('alternate', head.alternates.ar, { hreflang: 'ar' });
    upsertLink('alternate', head.alternates.ar, { hreflang: 'ar-EG' });
    upsertLink('alternate', head.alternates.en, { hreflang: 'en' });
    upsertLink('alternate', head.alternates.ar, { hreflang: 'x-default' });
  }

  // Page-level structured data lives in one managed <script>, replaced on navigation.
  document.querySelectorAll('script[data-seo-jsonld], script#ld-page').forEach((el) => el.remove());
  if (head.jsonLd && head.jsonLd.length) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'ld-page';
    script.textContent = JSON.stringify(head.jsonLd.length === 1 ? head.jsonLd[0] : head.jsonLd);
    document.head.appendChild(script);
  }
}

/**
 * Declare a page's head. Render it once per page component.
 * @param {{title:string, description?:string, canonicalPath?:string, image?:string,
 *          type?:string, noindex?:boolean, keywords?:string, lang?:string,
 *          jsonLd?:object[]}} props
 */
export function Seo({
  title,
  description,
  canonicalPath = '/',
  image,
  type = 'website',
  noindex = false,
  keywords,
  lang = 'ar',
  jsonLd = [],
}) {
  const collector = useContext(HeadCollectorContext);

  const head = useMemo(() => {
    const suffix = lang === 'en' ? SITE.name.en : SITE.name.ar;
    const fullTitle = title?.includes(suffix) ? title : `${title} | ${suffix}`;
    return {
      title: fullTitle,
      description,
      canonical: absoluteUrl(lang === 'en' ? (stripLocale(canonicalPath) === '/' ? '/en' : `/en${stripLocale(canonicalPath)}`) : stripLocale(canonicalPath)),
      alternates: alternatesFor(canonicalPath),
      image,
      type,
      noindex,
      keywords,
      lang,
      jsonLd,
    };
    // jsonLd is recreated each render by callers; stringify keeps the dep stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonicalPath, image, type, noindex, keywords, lang, JSON.stringify(jsonLd)]);

  // SSR: write into the collector during render so the prerenderer can read it.
  if (collector) Object.assign(collector, head);

  useEffect(() => {
    applyToDocument(head);
  }, [head]);

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Structured data builders (JSON-LD)                                        */
/* -------------------------------------------------------------------------- */

export function organizationSchema(lang = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BikeStore',
    '@id': `${SITE.baseUrl}/#organization`,
    name: SITE.name[lang],
    alternateName: lang === 'ar' ? SITE.name.en : SITE.name.ar,
    description: SITE.description[lang],
    url: SITE.baseUrl,
    ...(SITE.contact.email ? { email: SITE.contact.email } : {}),
    telephone: SITE.contact.phones[0],
    image: absoluteUrl('/og-default.png'),
    logo: absoluteUrl('/favicon.svg'),
    priceRange: 'EGP',
    currenciesAccepted: 'EGP',
    address: {
      '@type': 'PostalAddress',
      ...(SITE.address.streetVerified ? { streetAddress: SITE.address.street[lang] } : {}),
      addressLocality: SITE.address.city[lang],
      addressRegion: SITE.address.region[lang],
      ...(SITE.address.postalCode ? { postalCode: SITE.address.postalCode } : {}),
      addressCountry: SITE.address.countryCode,
    },
    ...(SITE.address.geo ? { geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.address.geo.lat,
      longitude: SITE.address.geo.lng,
    } } : {}),
    openingHoursSpecification: SITE.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(SITE.social).filter(Boolean),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: lang === 'ar' ? 'محافظة الشرقية' : 'Al Sharqia Governorate',
      containedInPlace: { '@type': 'Country', name: lang === 'ar' ? 'مصر' : 'Egypt' },
    },
  };
}

export function websiteSchema(lang = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.baseUrl}/#website`,
    url: SITE.baseUrl,
    name: SITE.name[lang],
    description: SITE.description[lang],
    inLanguage: lang === 'ar' ? 'ar-EG' : 'en',
    publisher: { '@id': `${SITE.baseUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.baseUrl}${lang === 'en' ? '/en' : ''}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

const AVAILABILITY = {
  in_stock: 'https://schema.org/InStock',
  low_stock: 'https://schema.org/LimitedAvailability',
  out_of_stock: 'https://schema.org/OutOfStock',
};

export function productSchema(product, { lang = 'ar', path } = {}) {
  if (!product || SITE.isPlaceholderContent) return null;
  const specs = product.specs || {};
  const props = [];
  const push = (name, value) => value != null && value !== '' && props.push({ '@type': 'PropertyValue', name, value: String(value) });

  push(lang === 'ar' ? 'مقاس الجنط' : 'Wheel size', specs.wheelSize ? `${specs.wheelSize}"` : null);
  push(lang === 'ar' ? 'مقاس الشاسيه' : 'Frame size', specs.frameSize?.[lang]);
  push(lang === 'ar' ? 'عدد السرعات' : 'Speeds', specs.gears);
  push(lang === 'ar' ? 'الوزن' : 'Weight', specs.weightKg ? `${specs.weightKg} kg` : null);
  if (product.fit?.heightMin) {
    push(
      lang === 'ar' ? 'الأطوال المناسبة' : 'Suitable rider height',
      `${product.fit.heightMin}–${product.fit.heightMax} cm`,
    );
  }
  if (product.fit?.ageMin) {
    push(
      lang === 'ar' ? 'الفئة العمرية' : 'Age range',
      `${product.fit.ageMin}–${product.fit.ageMax}`,
    );
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[lang],
    description: product.description[lang],
    sku: product.sku,
    mpn: product.sku,
    category: product.category,
    brand: { '@type': 'Brand', name: SITE.name[lang] },
    image: product.images?.length
      ? product.images.map((src) => absoluteUrl(src))
      : [absoluteUrl('/og-default.png')],
    ...(specs.weightKg
      ? { weight: { '@type': 'QuantitativeValue', value: specs.weightKg, unitCode: 'KGM' } }
      : {}),
    ...(specs.dimensionsCm
      ? {
          height: { '@type': 'QuantitativeValue', value: specs.dimensionsCm.height, unitCode: 'CMT' },
          width: { '@type': 'QuantitativeValue', value: specs.dimensionsCm.width, unitCode: 'CMT' },
          depth: { '@type': 'QuantitativeValue', value: specs.dimensionsCm.length, unitCode: 'CMT' },
        }
      : {}),
    additionalProperty: props,
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(path),
      priceCurrency: SITE.currency.code,
      price: product.price,
      availability: AVAILABILITY[product.stock] || AVAILABILITY.in_stock,
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE.baseUrl}/#organization` },
      areaServed: { '@type': 'AdministrativeArea', name: lang === 'ar' ? 'محافظة الشرقية' : 'Al Sharqia' },
      ...(SITE.warranty.months ? { warranty: {
        '@type': 'WarrantyPromise',
        durationOfWarranty: { '@type': 'QuantitativeValue', value: SITE.warranty.months, unitCode: 'MON' },
      } } : {}),
    },
  };
}

export function faqSchema(items = [], lang = 'ar') {
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: typeof f.q === 'string' ? f.q : f.q[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof f.a === 'string' ? f.a : f.a[lang],
      },
    })),
  };
}

export function articleSchema(meta, { lang = 'ar', path } = {}) {
  if (!meta) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title[lang],
    description: meta.excerpt[lang],
    datePublished: meta.date,
    dateModified: meta.updated || meta.date,
    inLanguage: lang === 'ar' ? 'ar-EG' : 'en',
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    author: { '@type': 'Organization', name: SITE.name[lang], url: SITE.baseUrl },
    publisher: { '@id': `${SITE.baseUrl}/#organization` },
    image: absoluteUrl('/og-default.png'),
    keywords: (meta.keywords?.[lang] || []).join(', '),
  };
}

export function itemListSchema(products, { lang = 'ar', name } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 30).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`${lang === 'en' ? '/en' : ''}/products/${p.slug}`),
      name: p.name[lang],
    })),
  };
}

/** Delivery areas are services, not additional showroom branches. */
export function localAreaSchema(location, lang = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${SITE.name[lang]} — ${location.name[lang]}`,
    description:
      lang === 'ar'
        ? `توصيل دراجات وإكسسوارات إلى ${location.name.ar} وكل القرى التابعة لها في محافظة الشرقية.`
        : `Bicycle and accessory delivery to ${location.name.en} and its villages in Al Sharqia governorate.`,
    url: absoluteUrl(`${lang === 'en' ? '/en' : ''}/locations/${location.slug}`),
    provider: organizationSchema(lang),
    areaServed: [
      { '@type': 'City', name: location.name[lang] },
      ...(location.areas?.[lang] || []).map((a) => ({ '@type': 'Place', name: a })),
    ],
  };
}

