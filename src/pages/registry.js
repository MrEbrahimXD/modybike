import { matchRoutes } from 'react-router-dom';
import { stripLocale } from '../i18n/index.jsx';

/**
 * Route-level code splitting.
 *
 * React.lazy is the obvious tool here, but it suspends on first render, which
 * would replace prerendered HTML with a fallback and cause a hydration mismatch.
 * Instead each page is a plain dynamic import that the entry points *await before
 * rendering*: the server awaits it before renderToString, and the client awaits it
 * before hydrateRoot. By the time either renders, `getPage()` returns the component
 * synchronously and the markup matches exactly.
 *
 * On client-side navigation the chunk is not yet cached, so PageSlot shows a brief
 * skeleton — which is correct, since nothing is being replaced.
 */
const loaders = {
  home: () => import('./Home.jsx'),
  products: () => import('./Products.jsx'),
  product: () => import('./ProductDetail.jsx'),
  sizeGuide: () => import('./SizeGuide.jsx'),
  blog: () => import('./Blog.jsx'),
  blogPost: () => import('./BlogPost.jsx'),
  locations: () => import('./Locations.jsx'),
  locationDetail: () => import('./Locations.jsx'),
  cart: () => import('./Cart.jsx'),
  checkout: () => import('./Checkout.jsx'),
  about: () => import('./About.jsx'),
  contact: () => import('./Contact.jsx'),
  faq: () => import('./Faq.jsx'),
  legal: () => import('./Legal.jsx'),
};

/** Pages that export the component under a name other than `default`. */
const NAMED_EXPORT = { locationDetail: 'LocationDetail' };

const cache = new Map();
const inFlight = new Map();

export function getPage(id) {
  return cache.get(id) || null;
}

export function loadPage(id) {
  if (cache.has(id)) return Promise.resolve(cache.get(id));
  if (inFlight.has(id)) return inFlight.get(id);

  const loader = loaders[id];
  if (!loader) return Promise.resolve(null);

  const promise = loader().then((mod) => {
    const component = mod[NAMED_EXPORT[id] || 'default'];
    cache.set(id, component);
    inFlight.delete(id);
    return component;
  });

  inFlight.set(id, promise);
  return promise;
}

/**
 * URL patterns, kept in the same shape react-router uses so matching here and
 * routing in App.jsx can never disagree.
 */
const MATCHABLE = [
  { path: '/', id: 'home' },
  { path: '/products', id: 'products' },
  { path: '/shop/age/:ageSlug', id: 'products' },
  { path: '/shop/type/:typeSlug', id: 'products' },
  { path: '/products/:slug', id: 'product' },
  { path: '/accessories', id: 'products' },
  { path: '/size-guide', id: 'sizeGuide' },
  { path: '/blog', id: 'blog' },
  { path: '/blog/topic/:category', id: 'blog' },
  { path: '/blog/:slug', id: 'blogPost' },
  { path: '/locations', id: 'locations' },
  { path: '/locations/:slug', id: 'locationDetail' },
  { path: '/cart', id: 'cart' },
  { path: '/checkout', id: 'checkout' },
  { path: '/about', id: 'about' },
  { path: '/contact', id: 'contact' },
  { path: '/faq', id: 'faq' },
  { path: '/privacy', id: 'legal' },
  { path: '/terms', id: 'legal' },
  { path: '/shipping', id: 'legal' },
];

/** Which page chunk a URL needs, or null for 404 (which ships in the main bundle). */
export function pageIdForPath(pathname) {
  const bare = stripLocale(pathname.split('?')[0].split('#')[0]) || '/';
  const matches = matchRoutes(MATCHABLE, bare);
  return matches?.[matches.length - 1]?.route?.id || null;
}

/** Awaited by both entry points before the first render. */
export async function preloadPageFor(pathname) {
  const id = pageIdForPath(pathname);
  if (!id) return null;
  return loadPage(id);
}
