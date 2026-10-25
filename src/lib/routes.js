import { PRODUCTS } from '../data/products.js';
import { LOCATIONS } from '../data/locations.js';
import { POSTS, POST_CATEGORIES } from '../content/posts/index.js';
import { CATEGORIES } from '../data/categories.js';
import { AGE_GROUPS } from '../data/collections.js';
import { LIVE_PRODUCT_TYPES } from '../data/products.js';

/**
 * Single source of truth for every URL on the site.
 * The router, the prerenderer and the sitemap generator all read from here,
 * so a new page can never be live but missing from the sitemap.
 *
 * `path` is the locale-less path. Arabic lives at the root, English under /en.
 */
export const ROUTE_IDS = {
  home: 'home',
  products: 'products',
  ageCollection: 'ageCollection',
  typeCollection: 'typeCollection',
  product: 'product',
  accessories: 'accessories',
  sizeGuide: 'sizeGuide',
  maintenance: 'maintenance',
  blog: 'blog',
  blogPost: 'blogPost',
  blogCategory: 'blogCategory',
  locations: 'locations',
  location: 'location',
  cart: 'cart',
  checkout: 'checkout',
  about: 'about',
  contact: 'contact',
  faq: 'faq',
  privacy: 'privacy',
  terms: 'terms',
  shipping: 'shipping',
  notFound: 'notFound',
};

/** Route patterns used by react-router (relative to the locale root). */
export const ROUTE_PATTERNS = [
  { id: ROUTE_IDS.home, pattern: '' },
  { id: ROUTE_IDS.products, pattern: 'products' },
  { id: ROUTE_IDS.ageCollection, pattern: 'shop/age/:ageSlug' },
  { id: ROUTE_IDS.typeCollection, pattern: 'shop/type/:typeSlug' },
  { id: ROUTE_IDS.product, pattern: 'products/:slug' },
  { id: ROUTE_IDS.accessories, pattern: 'accessories' },
  { id: ROUTE_IDS.sizeGuide, pattern: 'size-guide' },
  { id: ROUTE_IDS.maintenance, pattern: 'maintenance' },
  { id: ROUTE_IDS.blog, pattern: 'blog' },
  { id: ROUTE_IDS.blogCategory, pattern: 'blog/topic/:category' },
  { id: ROUTE_IDS.blogPost, pattern: 'blog/:slug' },
  { id: ROUTE_IDS.locations, pattern: 'locations' },
  { id: ROUTE_IDS.location, pattern: 'locations/:slug' },
  { id: ROUTE_IDS.cart, pattern: 'cart' },
  { id: ROUTE_IDS.checkout, pattern: 'checkout' },
  { id: ROUTE_IDS.about, pattern: 'about' },
  { id: ROUTE_IDS.contact, pattern: 'contact' },
  { id: ROUTE_IDS.faq, pattern: 'faq' },
  { id: ROUTE_IDS.privacy, pattern: 'privacy' },
  { id: ROUTE_IDS.terms, pattern: 'terms' },
  { id: ROUTE_IDS.shipping, pattern: 'shipping' },
];

/** Named path builders — never hand-write a URL anywhere else in the app. */
export const paths = {
  home: () => '/',
  products: (query) => (query ? `/products?${query}` : '/products'),
  byAge: (slug) => `/shop/age/${slug}`,
  byType: (slug) => `/shop/type/${slug}`,
  productsByCategory: (cat) => `/products?category=${encodeURIComponent(cat)}`,
  product: (slug) => `/products/${slug}`,
  accessories: () => '/accessories',
  sizeGuide: () => '/size-guide',
  maintenance: () => '/maintenance',
  blog: () => '/blog',
  blogPost: (slug) => `/blog/${slug}`,
  blogCategory: (cat) => `/blog/topic/${cat}`,
  locations: () => '/locations',
  location: (slug) => `/locations/${slug}`,
  cart: () => '/cart',
  checkout: () => '/checkout',
  about: () => '/about',
  contact: () => '/contact',
  faq: () => '/faq',
  privacy: () => '/privacy',
  terms: () => '/terms',
  shipping: () => '/shipping',
};

/**
 * Every concrete, prerenderable path (locale-less), with sitemap hints.
 * @returns {{path:string, changefreq:string, priority:number, lastmod?:string}[]}
 */
export function getStaticPaths() {
  const today = new Date().toISOString().slice(0, 10);

  const core = [
    { path: '/', changefreq: 'weekly', priority: 1.0, lastmod: today },
    { path: '/products', changefreq: 'daily', priority: 0.9, lastmod: today },
    { path: '/accessories', changefreq: 'weekly', priority: 0.8, lastmod: today },
    { path: '/size-guide', changefreq: 'monthly', priority: 0.9, lastmod: today },
    { path: '/maintenance', changefreq: 'monthly', priority: 0.8, lastmod: today },
    { path: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: today },
    { path: '/locations', changefreq: 'monthly', priority: 0.8, lastmod: today },
    { path: '/about', changefreq: 'yearly', priority: 0.5, lastmod: today },
    { path: '/contact', changefreq: 'yearly', priority: 0.7, lastmod: today },
    { path: '/faq', changefreq: 'monthly', priority: 0.7, lastmod: today },
    { path: '/shipping', changefreq: 'yearly', priority: 0.4, lastmod: today },
    { path: '/privacy', changefreq: 'yearly', priority: 0.2, lastmod: today },
    { path: '/terms', changefreq: 'yearly', priority: 0.2, lastmod: today },
    // Cart and checkout are prerendered so a direct hit works, but kept out of the sitemap.
    { path: '/cart', changefreq: 'never', priority: 0.1, noindex: true },
    { path: '/checkout', changefreq: 'never', priority: 0.1, noindex: true },
  ];

  const productPaths = PRODUCTS.map((p) => ({
    path: paths.product(p.slug),
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: today,
  }));

  const locationPaths = LOCATIONS.map((l) => ({
    path: paths.location(l.slug),
    changefreq: 'monthly',
    priority: 0.75,
    lastmod: today,
  }));

  const postPaths = POSTS.map((p) => ({
    path: paths.blogPost(p.slug),
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: p.updated || p.date,
  }));

  const blogCategoryPaths = POST_CATEGORIES.map((c) => ({
    path: paths.blogCategory(c.slug),
    changefreq: 'monthly',
    priority: 0.5,
    lastmod: today,
  }));

  const collectionPaths = [
    ...AGE_GROUPS.map((group) => ({ path: paths.byAge(group.slug), changefreq: 'weekly', priority: 0.9 })),
    ...LIVE_PRODUCT_TYPES.filter((type) => type.slug !== 'bikes').map((type) => ({ path: paths.byType(type.slug), changefreq: 'weekly', priority: 0.8 })),
  ];
  return [...core, ...collectionPaths, ...productPaths, ...locationPaths, ...postPaths, ...blogCategoryPaths];
}

/** The product category links used in the header and footer. */
export const CATEGORY_LINKS = CATEGORIES.map((c) => ({
  slug: c.slug,
  name: c.name,
  href: paths.productsByCategory(c.slug),
}));

export default paths;
