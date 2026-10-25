import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { HeadCollectorProvider } from './lib/seo.jsx';
import { loadPost, dumpContentCache } from './lib/content.js';
import { getStaticPaths } from './lib/routes.js';
import { localeFromPath, stripLocale, DICTS } from './i18n/index.jsx';
import { SITE, ROUTER_BASENAME } from './config/site.js';
import { PRODUCTS } from './data/products.js';
import { CATEGORIES } from './data/categories.js';
import { productImages, journalImage } from './data/media.js';
import { POSTS } from './content/posts/index.js';
import { productSearchName, productSeoDescription } from './lib/productSeo.js';

/** Which async data a given URL needs before it can be rendered synchronously. */
async function preloadFor(pathname) {
  const bare = stripLocale(pathname);
  const match = bare.match(/^\/blog\/(?!topic\/)([^/]+)\/?$/);
  if (match) {
    const slug = decodeURIComponent(match[1]);
    await loadPost(slug);
    return { content: dumpContentCache([slug]) };
  }
  return null;
}

/**
 * Renders one URL to static HTML plus everything the page shell needs.
 * Called by scripts/prerender.mjs once per route, for both locales.
 */
export async function render(url) {
  const data = await preloadFor(url);

  const head = {};
  const html = renderToString(
    <StrictMode>
      <HeadCollectorProvider collector={head}>
        <StaticRouter basename={ROUTER_BASENAME} location={`${SITE.basePath}${url}`}>
          <App />
        </StaticRouter>
      </HeadCollectorProvider>
    </StrictMode>,
  );

  const lang = localeFromPath(url);
  const dict = DICTS[lang];

  return {
    html,
    head,
    data,
    lang,
    htmlLang: dict.meta.htmlLang,
    dir: dict.meta.dir,
  };
}

/** The full list of URLs to prerender, in both languages, with sitemap metadata. */
export function getRoutes() {
  const bare = getStaticPaths();
  const out = [];
  bare.forEach((entry) => {
    out.push({ ...entry, url: entry.path, lang: 'ar' });
    out.push({
      ...entry,
      url: entry.path === '/' ? '/en' : `/en${entry.path}`,
      lang: 'en',
      // hreflang pairs point back at the Arabic path
      altOf: entry.path,
    });
  });
  return out;
}

/** Photos the share-image step turns into link-preview and catalogue JPEGs. */
export function getShareSources() {
  return {
    products: PRODUCTS.map((p) => ({ slug: p.slug, images: productImages(p.slug).map((img) => img.src) })),
    posts: POSTS.map((p) => ({ slug: p.slug, image: journalImage(p.slug)?.src })),
  };
}

/** Real stock only — anything marked placeholder never goes into a shopping feed. */
export function getFeedProducts() {
  return PRODUCTS.filter((p) => !p.placeholder && !SITE.isPlaceholderContent).map((p) => ({
    id: p.sku,
    slug: p.slug,
    title: productSearchName(p, 'ar'),
    description: productSeoDescription(p, 'ar'),
    price: p.price,
    stock: p.stock,
    brand: p.brand || SITE.name.en,
    category: CATEGORIES.find((c) => c.slug === p.category)?.name.ar || '',
    imageCount: productImages(p.slug).length,
    wheelSize: p.specs?.wheelSize || null,
    ageMin: p.fit?.ageMin ?? null,
    ageMax: p.fit?.ageMax ?? null,
  }));
}

export { SITE };
