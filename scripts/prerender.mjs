/* ============================================================================
 *  Prerenderer — turns the React app into static HTML, one file per URL.
 * ============================================================================
 *  Why this exists: Google can render JavaScript, but the AI crawlers that feed
 *  ChatGPT, Perplexity and AI Overviews mostly cannot. Since this site is aimed
 *  squarely at SEO / GEO / AEO for Al Sharqia, every page ships as real HTML
 *  with its meta tags and JSON-LD already in the markup.
 *
 *  Also emits: sitemap.xml (with product photos), robots.txt, llms.txt,
 *  a 404.html fallback, link-preview JPEGs and feeds/products.xml.
 * ========================================================================== */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = join(root, 'dist');
const ssrEntry = pathToFileURL(join(root, '.ssr-build', 'entry-server.js')).href;

const { render, getRoutes, SITE, getShareSources, getFeedProducts } = await import(ssrEntry);
const { buildShareImages } = await import('./share-images.mjs');

const BASE_URL = SITE.baseUrl.replace(/\/+$/, '');

/* ------------------------------------------------------------------ helpers */

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * JSON that is safe to inline inside a <script> tag.
 * A literal "</script>" would close the tag early, and U+2028 / U+2029 are legal
 * in JSON but illegal raw in JavaScript source. The escape prefix is built from a
 * char code so the intent survives any future reformatting.
 */
const BACKSLASH = String.fromCharCode(92);
const ESCAPE_IN_SCRIPT = new RegExp("[<>" + String.fromCharCode(0x2028, 0x2029) + "]", "g");
const safeJson = (value) =>
  JSON.stringify(value).replace(
    ESCAPE_IN_SCRIPT,
    (char) => BACKSLASH + "u" + char.charCodeAt(0).toString(16).padStart(4, "0"),
  );

/** Absolute URL; pages get the trailing slash GitHub Pages serves without a redirect. */
const abs = (path) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p === '/' || /\.[a-z0-9]+$/i.test(p)) return `${BASE_URL}${p}`;
  return `${BASE_URL}${p.replace(/\/+$/, '')}/`;
};

/** Turns the collected head object into the real tags for <head>. */
function renderHead(head, { lang, url }) {
  const tags = [];
  const meta = (attr, key, content) => {
    if (content == null || content === '') return;
    tags.push(`<meta ${attr}="${key}" content="${escapeHtml(content)}">`);
  };

  const canonical = head.canonical || abs(url);
  const ogImage = head.image || abs('/og-default.png');
  const alternates = head.alternates || {
    ar: abs(url.replace(/^\/en/, '') || '/'),
    en: abs(url.startsWith('/en') ? url : `/en${url === '/' ? '' : url}`),
  };

  tags.push(`<title>${escapeHtml(head.title || SITE.name[lang])}</title>`);
  meta('name', 'description', head.description || SITE.description[lang]);
  meta(
    'name',
    'robots',
    head.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1',
  );
  meta('name', 'keywords', head.keywords);
  meta('name', 'author', SITE.name[lang]);

  tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}">`);
  tags.push(`<link rel="alternate" hreflang="ar" href="${escapeHtml(alternates.ar)}">`);
  tags.push(`<link rel="alternate" hreflang="ar-EG" href="${escapeHtml(alternates.ar)}">`);
  tags.push(`<link rel="alternate" hreflang="en" href="${escapeHtml(alternates.en)}">`);
  tags.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtml(alternates.ar)}">`);

  meta('property', 'og:type', head.type || 'website');
  meta('property', 'og:site_name', SITE.name[lang]);
  meta('property', 'og:title', head.title);
  meta('property', 'og:description', head.description || SITE.description[lang]);
  meta('property', 'og:url', canonical);
  meta('property', 'og:image', ogImage);
  if (/\/images\/share\/|\/og-default\.png$/.test(ogImage)) {
    meta('property', 'og:image:width', '1200');
    meta('property', 'og:image:height', '630');
  }
  meta('property', 'og:image:alt', head.title);
  meta('property', 'og:locale', lang === 'en' ? 'en_US' : 'ar_EG');
  meta('property', 'og:locale:alternate', lang === 'en' ? 'ar_EG' : 'en_US');

  meta('name', 'twitter:card', 'summary_large_image');
  meta('name', 'twitter:title', head.title);
  meta('name', 'twitter:description', head.description || SITE.description[lang]);
  meta('name', 'twitter:image', ogImage);

  meta('name', 'geo.region', 'EG-SHR');
  meta('name', 'geo.placename', lang === 'en' ? 'Al Sharqia, Egypt' : 'محافظة الشرقية، مصر');
  if (SITE.address.geo) {
    meta('name', 'geo.position', `${SITE.address.geo.lat};${SITE.address.geo.lng}`);
    meta('name', 'ICBM', `${SITE.address.geo.lat}, ${SITE.address.geo.lng}`);
  }

  if (SITE.analytics.googleSiteVerification) {
    meta('name', 'google-site-verification', SITE.analytics.googleSiteVerification);
  }
  if (SITE.analytics.facebookDomainVerification) {
    meta('name', 'facebook-domain-verification', SITE.analytics.facebookDomainVerification);
  }

  const blocks = (head.jsonLd || []).filter(Boolean);
  blocks.forEach((block) => {
    tags.push(`<script type="application/ld+json" data-seo-jsonld>${safeJson(block)}</script>`);
  });

  return tags.join('\n    ');
}

/** Where a URL's HTML file lives on disk. */
function outputPathFor(url) {
  if (url === '/') return join(distDir, 'index.html');
  const clean = url.replace(/^\/+|\/+$/g, '');
  return join(distDir, clean, 'index.html');
}

/* ------------------------------------------------------------------- build */

const template = await readFile(join(distDir, 'index.html'), 'utf8');

if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  throw new Error(
    'dist/index.html is missing the <!--app-html--> / <!--app-head--> placeholders. Did index.html change?',
  );
}

const routes = getRoutes();
const results = [];
let failures = 0;

for (const route of routes) {
  try {
    const { html, head, data, htmlLang, dir, lang } = await render(route.url);

    const dataScript = data
      ? `\n    <script type="application/json" id="__MB_DATA__">${safeJson(data)}</script>`
      : '';

    const page = template
      .replace('<html lang="ar" dir="rtl"', `<html lang="${htmlLang}" dir="${dir}"`)
      .replace('<!--app-head-->', renderHead(head, { lang, url: route.url }) + dataScript)
      .replace('<!--app-html-->', html);

    const file = outputPathFor(route.url);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, page, 'utf8');

    results.push({ ...route, noindex: route.noindex || head.noindex });
  } catch (error) {
    failures += 1;
    console.error(`  ✗ ${route.url}\n    ${error.message}`);
  }
}

/* ------------------------------------------------------------- 404 fallback */

{
  const { html, head, htmlLang, dir, lang } = await render('/__not-found__');
  const page = template
    .replace('<html lang="ar" dir="rtl"', `<html lang="${htmlLang}" dir="${dir}"`)
    .replace('<!--app-head-->', renderHead(head, { lang, url: '/404' }))
    .replace('<!--app-html-->', html);
  await writeFile(join(distDir, '404.html'), page, 'utf8');
}

/* ----------------------------------------------------------------- sitemap */

const indexable = results.filter((r) => !r.noindex);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${indexable
  .map((r) => {
    const arPath = r.lang === 'en' ? r.altOf : r.path;
    const enPath = arPath === '/' ? '/en' : `/en${arPath}`;
    const images = (r.images || []).map((src) => `
    <image:image><image:loc>${escapeHtml(abs(src))}</image:loc></image:image>`).join('');
    return `  <url>
    <loc>${escapeHtml(abs(r.url))}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${escapeHtml(abs(arPath))}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeHtml(abs(enPath))}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(abs(arPath))}"/>${
      r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ''
    }
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>${images}
  </url>`;
  })
  .join('\n')}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');

/* ------------------------------------------------------------------ robots */

const robots = `# ModyBike — ${BASE_URL}
User-agent: *
Allow: /
# Cart, checkout and filtered URLs carry noindex. Keep them crawlable so
# search engines can read that directive.

# AI crawlers are explicitly welcome — this site is optimised to be cited.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

await writeFile(join(distDir, 'robots.txt'), robots, 'utf8');

// The deploy workflow compares this with the address GitHub Pages reports, so
// a newly connected custom domain gets a fresh build without a push.
await writeFile(join(distDir, 'site-url.txt'), BASE_URL, 'utf8');

/* ------------------------------------------------------------------ llms.txt */

const llms = `# ${SITE.name.ar} (${SITE.name.en})

> ${SITE.description.ar}

> ${SITE.description.en}

## About
- Business type: bicycle shop with repairs (BikeStore)
- Location: ${SITE.address.city.en}, ${SITE.address.region.en}, Egypt
- Service area: delivery across Egypt; local pages cover Al Sharqia Governorate, including Zagazig, Belbeis, Minya Al Qamh, Abu Hammad, Hehia, Abu Kabir, Faqous, El Husseiniya, Kafr Saqr, Awlad Saqr, El Ibrahimiya, Deyerb Negm, Mashtoul El Souk, El Qanayat, El Qurein, New Salhia, Menshat Abu Omar, San El Hagar and 10th of Ramadan City
- Languages: Arabic (primary), English
- WhatsApp: ${SITE.contact.whatsappDisplay}; phone: ${SITE.contact.phones[0]}
- Ordering: customers build an order on the website and send it over WhatsApp

## Key pages
- [Shop](${BASE_URL}/products/): browse by age and product type
- [Ages 3–5](${BASE_URL}/shop/age/ages-3-5/)
- [Ages 5–8](${BASE_URL}/shop/age/ages-5-8/)
- [Ages 7–10](${BASE_URL}/shop/age/ages-7-10/)
- [Ages 8–12](${BASE_URL}/shop/age/ages-8-12/)
- [Ages 12+](${BASE_URL}/shop/age/ages-12-plus/)
- [Kids bikes](${BASE_URL}/shop/category/kids/)
- [Mountain bikes](${BASE_URL}/shop/category/mountain/)
- [Programme (BMX-style) bikes](${BASE_URL}/shop/category/bmx/)
- [City and women's bikes](${BASE_URL}/shop/category/city/)
- Bikes by wheel size: [12"](${BASE_URL}/shop/size/12-inch/), [16"](${BASE_URL}/shop/size/16-inch/), [20"](${BASE_URL}/shop/size/20-inch/), [24"](${BASE_URL}/shop/size/24-inch/), [26"](${BASE_URL}/shop/size/26-inch/)
- [Size guide](${BASE_URL}/size-guide/): wheel and frame sizing by rider height and age, with an interactive calculator
- [Blog](${BASE_URL}/blog/): buying, sizing, maintenance and safety guides
- [Repairs](${BASE_URL}/maintenance/): bike repairs
- [Delivery areas](${BASE_URL}/locations/): city pages across Al Sharqia
- [FAQ](${BASE_URL}/faq/)
- [Contact](${BASE_URL}/contact/)

## Frequently cited facts
- Kids bikes are sized by wheel diameter: 12" for 85–100 cm tall, 16" for 105–120 cm, 20" for 120–135 cm, 24" for 135–150 cm.
- Adult mountain and hybrid frames: 15–16" for riders 158–168 cm, 17–18" for 168–178 cm, 19–20" for 178–185 cm.
- Saddle height (bottom bracket to saddle top) = inseam × 0.883.
- Wheel sizes by ETRTO rim diameter: 26" = 559 mm, 27.5" = 584 mm, 29"/700C = 622 mm.
- Warranty terms are confirmed for the selected model before ordering.
- The shop also offers bike repairs and servicing: ${BASE_URL}/maintenance/
- A PDF catalogue is available in Arabic and English: ${BASE_URL}/catalogue/modybike-catalogue-ar.pdf and ${BASE_URL}/catalogue/modybike-catalogue-en.pdf
- Machine-readable product feed (prices and stock): ${BASE_URL}/feeds/products.xml
- ${SITE.isPlaceholderContent ? 'Product models, photos and prices are demonstration content, not verified stock or offers.' : 'Contact the shop to confirm availability and prices.'}

## Notes
- Content is available in Arabic at ${BASE_URL}/ and in English at ${BASE_URL}/en/.
- Every page ships as prerendered HTML with Schema.org JSON-LD (BikeStore, Product, FAQPage, BlogPosting, BreadcrumbList).
`;

await writeFile(join(distDir, 'llms.txt'), llms, 'utf8');

/* ------------------------------------------------------------ share images */

const { share: shareCount, feed: feedImageCount } = await buildShareImages({ distDir, ...getShareSources() });

/* ------------------------------------------------------------- product feed */

/* RSS 2.0 in Google's product-feed format. Facebook/Instagram/WhatsApp
   catalogues (Commerce Manager → Data feed → scheduled URL) read the same file. */
const xml = (value = '') => escapeHtml(value).replace(/'/g, '&apos;');
const feedItems = getFeedProducts();
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>${xml(SITE.name.ar)} — ${xml(SITE.name.en)}</title>
<link>${xml(abs('/'))}</link>
<description>${xml(SITE.description.ar)}</description>
${feedItems
  .map((p) => {
    const images = Array.from({ length: p.imageCount }, (_, i) => abs(`/images/feed/${p.slug}-${i + 1}.jpg`));
    return `<item>
  <g:id>${xml(p.id)}</g:id>
  <g:title>${xml(p.title)}</g:title>
  <g:description>${xml(p.description)}</g:description>
  <g:link>${xml(abs(`/products/${p.slug}`))}</g:link>
  ${images[0] ? `<g:image_link>${xml(images[0])}</g:image_link>` : ''}${images
    .slice(1, 10)
    .map((img) => `\n  <g:additional_image_link>${xml(img)}</g:additional_image_link>`)
    .join('')}
  <g:availability>${p.stock === 'out_of_stock' ? 'out of stock' : 'in stock'}</g:availability>
  <g:price>${p.price.toFixed(2)} ${SITE.currency.code}</g:price>
  <g:condition>new</g:condition>
  <g:brand>${xml(p.brand)}</g:brand>
  <g:identifier_exists>no</g:identifier_exists>
  <g:google_product_category>1026</g:google_product_category>
  <g:product_type>${xml(p.category)}</g:product_type>
  <g:age_group>${p.ageMax != null && p.ageMax <= 12 ? 'kids' : 'adult'}</g:age_group>
</item>`;
  })
  .join('\n')}
</channel>
</rss>
`;
await mkdir(join(distDir, 'feeds'), { recursive: true });
await writeFile(join(distDir, 'feeds', 'products.xml'), feed, 'utf8');

/* ------------------------------------------------------------------ report */

console.log(`\n  Prerendered ${results.length} pages (${indexable.length} in sitemap).`);
console.log('  Wrote sitemap.xml, robots.txt, llms.txt, 404.html');
console.log(`  Wrote ${shareCount} share images, ${feedImageCount} catalogue photos and feeds/products.xml (${feedItems.length} products).`);
if (failures) {
  console.error(`\n  ${failures} route(s) failed to render.`);
  process.exit(1);
}

