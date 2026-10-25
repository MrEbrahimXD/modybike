import { createContext, useContext, useEffect, useMemo } from 'react';
import { SITE } from '../config/site.js';
import { localizedPath, stripLocale, withTrailingSlash } from '../i18n/index.jsx';
import { BIKE_PRODUCTS } from '../data/products.js';
import { CATEGORIES } from '../data/categories.js';

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
  return `${base}${withTrailingSlash(path.startsWith('/') ? path : `/${path}`)}`;
}

/** Absolute URL of a page in the given language (`/products` → `…/en/products`). */
export function pageUrl(path = '/', lang = 'ar') {
  return absoluteUrl(localizedPath(lang, stripLocale(path)));
}

/** Absolute URL for a file in /public or a generated asset (og:image, Product.image). */
export function assetUrl(src) {
  if (!src) return src;
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE.baseUrl.replace(/\/+$/, '')}${src.startsWith('/') ? src : `/${src}`}`;
}

/** Share card generated at build time by scripts/share-images.mjs (1200×630 JPEG). */
export const shareImage = (kind, slug) => `/images/share/${kind}/${slug}.jpg`;

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
      canonical: pageUrl(canonicalPath, lang),
      alternates: alternatesFor(canonicalPath),
      image: assetUrl(image),
      type,
      noindex,
      keywords,
      lang,
      jsonLd: jsonLd.filter(Boolean).map((block) => localiseBreadcrumbs(block, lang)),
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

const bikePrices = BIKE_PRODUCTS.map((p) => p.price);

/** "+20 10 1512 0515" — the international form Google expects in telephone. */
export function intlPhone(local = '') {
  const digits = String(local).replace(/[^\d]/g, '');
  return digits.startsWith('0') ? `+20${digits.slice(1)}` : `+${digits}`;
}

export function organizationSchema(lang = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BikeStore',
    '@id': `${SITE.baseUrl}/#organization`,
    name: SITE.name[lang],
    alternateName: [...new Set([SITE.name.ar, SITE.name.en, ...(SITE.alternateNames || [])])].filter((n) => n !== SITE.name[lang]),
    description: SITE.description[lang],
    url: pageUrl('/', lang),
    ...(SITE.contact.email ? { email: SITE.contact.email } : {}),
    telephone: intlPhone(SITE.contact.phones[0]),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: intlPhone(SITE.contact.whatsapp),
        availableLanguage: ['ar', 'en'],
        areaServed: SITE.address.countryCode,
      },
    ],
    image: absoluteUrl('/og-default.png'),
    logo: { '@type': 'ImageObject', url: absoluteUrl('/icon-512.png'), width: 512, height: 512 },
    priceRange: `${Math.min(...bikePrices)}–${Math.max(...bikePrices)} EGP`,
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
    ...(SITE.address.mapsUrl?.startsWith('https://maps.') || SITE.address.mapsUrl?.includes('google.com/maps') || SITE.address.mapsUrl?.includes('goo.gl')
      ? { hasMap: SITE.address.mapsUrl }
      : {}),
    openingHoursSpecification: SITE.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(SITE.social).filter(Boolean),
    areaServed: [
      { '@type': 'Country', name: lang === 'ar' ? 'مصر' : 'Egypt' },
      { '@type': 'AdministrativeArea', name: lang === 'ar' ? 'محافظة الشرقية' : 'Al Sharqia Governorate' },
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: lang === 'ar' ? 'صيانة وتركيب الدراجات' : 'Bicycle repair and assembly' },
    },
  };
}

export function websiteSchema(lang = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.baseUrl}/#website`,
    url: pageUrl('/', lang),
    name: SITE.name[lang],
    alternateName: [...new Set([SITE.name.ar, SITE.name.en, ...(SITE.alternateNames || [])])].filter((n) => n !== SITE.name[lang]),
    description: SITE.description[lang],
    inLanguage: lang === 'ar' ? 'ar-EG' : 'en',
    publisher: { '@id': `${SITE.baseUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.baseUrl}${lang === 'en' ? '/en' : ''}/products/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items = [], lang = 'ar') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: pageUrl(item.path, lang),
    })),
  };
}

/** English pages get English breadcrumb URLs even when a caller passed bare paths. */
function localiseBreadcrumbs(block, lang) {
  if (lang !== 'en' || block?.['@type'] !== 'BreadcrumbList') return block;
  const base = SITE.baseUrl.replace(/\/+$/, '');
  return {
    ...block,
    itemListElement: block.itemListElement.map((entry) =>
      typeof entry.item === 'string' && entry.item.startsWith(base)
        ? { ...entry, item: pageUrl(entry.item.slice(base.length) || '/', 'en') }
        : entry,
    ),
  };
}

const AVAILABILITY = {
  in_stock: 'https://schema.org/InStock',
  low_stock: 'https://schema.org/LimitedAvailability',
  out_of_stock: 'https://schema.org/OutOfStock',
};

/**
 * Product + Offer. `images` are the product's photos (absolute or site paths).
 * Placeholder items (stock photos, prices not from the shop) get no markup.
 */
export function productSchema(product, { lang = 'ar', path, images = [] } = {}) {
  if (!product || SITE.isPlaceholderContent || product.placeholder) return null;
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
      product.fit.ageMax && product.fit.ageMax < 99 ? `${product.fit.ageMin}–${product.fit.ageMax}` : `${product.fit.ageMin}+`,
    );
  }
  const category = CATEGORIES.find((c) => c.slug === product.category);
  const photos = images.map(assetUrl).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[lang],
    description: product.description[lang],
    sku: product.sku,
    ...(category ? { category: category.name[lang] } : {}),
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
    image: photos.length ? photos : [absoluteUrl('/og-default.png')],
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
      url: pageUrl(path, lang),
      priceCurrency: SITE.currency.code,
      price: product.price,
      availability: AVAILABILITY[product.stock] || AVAILABILITY.in_stock,
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE.baseUrl}/#organization` },
      areaServed: { '@type': 'Country', name: lang === 'ar' ? 'مصر' : 'Egypt' },
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

export function articleSchema(meta, { lang = 'ar', path, image } = {}) {
  if (!meta) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title[lang],
    description: meta.excerpt[lang],
    datePublished: meta.date,
    dateModified: meta.updated || meta.date,
    inLanguage: lang === 'ar' ? 'ar-EG' : 'en',
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl(path, lang) },
    author: { '@type': 'Organization', name: SITE.name[lang], url: pageUrl('/', lang) },
    publisher: { '@type': 'Organization', '@id': `${SITE.baseUrl}/#organization`, name: SITE.name[lang], logo: { '@type': 'ImageObject', url: absoluteUrl('/icon-512.png') } },
    image: assetUrl(image) || absoluteUrl('/og-default.png'),
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
      url: pageUrl(`/products/${p.slug}`, lang),
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
    url: pageUrl(`/locations/${location.slug}`, lang),
    provider: organizationSchema(lang),
    areaServed: [
      { '@type': 'City', name: location.name[lang] },
      ...(location.areas?.[lang] || []).map((a) => ({ '@type': 'Place', name: a })),
    ],
  };
}

