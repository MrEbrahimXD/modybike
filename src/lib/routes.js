import { PRODUCTS } from '../data/products.js';
import { LOCATIONS } from '../data/locations.js';
import { POSTS, POST_CATEGORIES } from '../content/posts/index.js';
import { CATEGORIES } from '../data/categories.js';
import { AGE_GROUPS } from '../data/collections.js';
import { LIVE_PRODUCT_TYPES, WHEEL_SIZES } from '../data/products.js';
import { productImages } from '../data/media.js';

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
  categoryCollection: 'categoryCollection',
  sizeCollection: 'sizeCollection',
  product: 'product',
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
  { id: ROUTE_IDS.categoryCollection, pattern: 'shop/category/:categorySlug' },
  { id: ROUTE_IDS.sizeCollection, pattern: 'shop/size/:sizeSlug' },
  { id: ROUTE_IDS.product, pattern: 'products/:slug' },
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
  byCategory: (slug) => `/shop/category/${slug}`,
  bySize: (inches) => `/shop/size/${inches}-inch`,
  productsByCategory: (cat) => `/products?category=${encodeURIComponent(cat)}`,
  product: (slug) => `/products/${slug}`,
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
/** Latest date among a set of products, for sitemap lastmod. */
const newest = (list) => list.map((p) => p.updatedAt || p.createdAt).filter(Boolean).sort().pop();

/**
 * Every concrete, prerenderable path (locale-less), with sitemap hints.
 * `lastmod` is only given where a real date exists (product, article or the
 * newest product in a collection) — a date that changes on every build
 * teaches Google to ignore it.
 * @returns {{path:string, changefreq:string, priority:number, lastmod?:string, images?:string[], noindex?:boolean}[]}
 */
export function getStaticPaths() {
  const bikes = PRODUCTS;
  const catalogueDate = newest(bikes);

  const core = [
    { path: '/', changefreq: 'weekly', priority: 1.0, lastmod: catalogueDate },
    { path: '/products', changefreq: 'weekly', priority: 0.9, lastmod: catalogueDate },
    { path: '/size-guide', changefreq: 'monthly', priority: 0.7 },
    { path: '/maintenance', changefreq: 'monthly', priority: 0.7 },
    { path: '/blog', changefreq: 'weekly', priority: 0.6, lastmod: newest(POSTS.map((p) => ({ updatedAt: p.updated || p.date }))) },
    { path: '/locations', changefreq: 'monthly', priority: 0.6 },
    { path: '/about', changefreq: 'yearly', priority: 0.4 },
    { path: '/contact', changefreq: 'yearly', priority: 0.7 },
    { path: '/faq', changefreq: 'monthly', priority: 0.5 },
    { path: '/shipping', changefreq: 'yearly', priority: 0.3 },
    { path: '/privacy', changefreq: 'yearly', priority: 0.2 },
    { path: '/terms', changefreq: 'yearly', priority: 0.2 },
    // Cart and checkout are prerendered so a direct hit works, but kept out of the sitemap.
    { path: '/cart', changefreq: 'never', priority: 0.1, noindex: true },
    { path: '/checkout', changefreq: 'never', priority: 0.1, noindex: true },
  ];

  const productPaths = PRODUCTS.map((p) => ({
    path: paths.product(p.slug),
    changefreq: 'weekly',
    priority: p.placeholder ? 0.1 : 0.8,
    lastmod: p.updatedAt || p.createdAt,
    images: productImages(p.slug).map((img) => img.src),
    ...(p.placeholder ? { noindex: true } : {}),
  }));

  const locationPaths = LOCATIONS.map((l) => ({
    path: paths.location(l.slug),
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: catalogueDate,
  }));

  const postPaths = POSTS.map((p) => ({
    path: paths.blogPost(p.slug),
    changefreq: 'monthly',
    priority: 0.5,
    lastmod: p.updated || p.date,
  }));

  const blogCategoryPaths = POST_CATEGORIES.map((c) => ({
    path: paths.blogCategory(c.slug),
    changefreq: 'monthly',
    priority: 0.3,
  }));

  const collectionPaths = [
    ...AGE_GROUPS.map((group) => ({ path: paths.byAge(group.slug), changefreq: 'weekly', priority: 0.9, lastmod: catalogueDate })),
    ...CATEGORIES.filter((c) => c.kind === 'bike' && bikes.some((p) => p.category === c.slug)).map((c) => ({
      path: paths.byCategory(c.slug), changefreq: 'weekly', priority: 0.9, lastmod: newest(bikes.filter((p) => p.category === c.slug)),
    })),
    ...WHEEL_SIZES.map((inches) => ({
      path: paths.bySize(inches), changefreq: 'weekly', priority: 0.9, lastmod: newest(bikes.filter((p) => p.specs?.wheelSize === inches)),
    })),
    ...LIVE_PRODUCT_TYPES.filter((type) => type.slug !== 'bikes').map((type) => ({ path: paths.byType(type.slug), changefreq: 'weekly', priority: 0.8 })),
  ];
  return [...core, ...collectionPaths, ...productPaths, ...locationPaths, ...postPaths, ...blogCategoryPaths];
}

/** The product category links used in the header and footer. */
export const CATEGORY_LINKS = CATEGORIES.map((c) => ({
  slug: c.slug,
  name: c.name,
  href: paths.byCategory(c.slug),
}));

export default paths;
