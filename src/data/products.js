import BIKES from './products.bikes.js';
import { matchesAgeGroup, productTypeOf, PRODUCT_TYPES } from './collections.js';

/** الكتالوج الكامل — دراجات بس (المحل مش بيبيع إكسسوارات حاليًا). */
export const PRODUCTS = [...BIKES];

export const BIKE_PRODUCTS = BIKES;

const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));
const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

export function getProduct(slug) {
  return BY_SLUG.get(slug) || null;
}

export function getProductById(id) {
  return BY_ID.get(id) || null;
}

export function getProductsByIds(ids = []) {
  return ids.map((id) => BY_ID.get(id)).filter(Boolean);
}

/** أقل وأعلى سعر في الكتالوج — يُستخدم في فلتر السعر. */
export const PRICE_RANGE = PRODUCTS.reduce(
  (acc, p) => ({ min: Math.min(acc.min, p.price), max: Math.max(acc.max, p.price) }),
  { min: Infinity, max: 0 },
);

/** كل مقاسات الجنوط الموجودة فعليًا في الكتالوج، مرتبة. */
export const WHEEL_SIZES = [
  ...new Set(BIKES.map((p) => p.specs?.wheelSize).filter(Boolean)),
].sort((a, b) => a - b);

export const BRAKE_TYPES = [...new Set(BIKES.map((p) => p.specs?.brakes).filter(Boolean))];

const STOCK_ORDER = { in_stock: 0, low_stock: 1, out_of_stock: 2 };

/**
 * الفلترة والترتيب الرئيسية لصفحة المنتجات.
 * @param {object} opts
 */
export function queryProducts({
  category = null,
  subcategory = null,
  wheelSizes = [],
  brakes = [],
  minPrice = null,
  maxPrice = null,
  age = null,
  ageGroup = null,
  productType = null,
  height = null,
  inStockOnly = false,
  search = '',
  sort = 'featured',
  lang = 'ar',
} = {}) {
  const term = search.trim().toLowerCase();

  let list = PRODUCTS.filter((p) => {
    if (ageGroup && !matchesAgeGroup(p, ageGroup)) return false;
    if (productType && productTypeOf(p) !== productType) return false;
    if (category && p.category !== category) return false;
    if (subcategory && p.subcategory !== subcategory) return false;
    if (wheelSizes.length && !wheelSizes.includes(p.specs?.wheelSize)) return false;
    if (brakes.length && !brakes.includes(p.specs?.brakes)) return false;
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    if (inStockOnly && p.stock === 'out_of_stock') return false;

    if (age != null && p.fit?.ageMin != null) {
      if (age < p.fit.ageMin || age > (p.fit.ageMax ?? 99)) return false;
    }
    if (height != null && p.fit?.heightMin != null) {
      // allow a 5 cm grace band either side so borderline riders still see the bike
      if (height < p.fit.heightMin - 5 || height > (p.fit.heightMax ?? 999) + 5) return false;
    }

    if (term) {
      const haystack = [
        p.name?.ar,
        p.name?.en,
        p.tagline?.ar,
        p.tagline?.en,
        p.sku,
        p.slug,
        p.category,
        p.subcategory,
        String(p.specs?.wheelSize ?? ''),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });

  const collator = new Intl.Collator(lang === 'ar' ? 'ar' : 'en');

  list = list.slice().sort((a, b) => {
    switch (sort) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'nameAsc':
        return collator.compare(a.name?.[lang] || '', b.name?.[lang] || '');
      case 'newest':
        return String(b.createdAt).localeCompare(String(a.createdAt));
      case 'featured':
      default: {
        // in-stock first, then featured, then newest
        const stock = (STOCK_ORDER[a.stock] ?? 3) - (STOCK_ORDER[b.stock] ?? 3);
        if (stock !== 0) return stock;
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return String(b.createdAt).localeCompare(String(a.createdAt));
      }
    }
  });

  return list;
}

/** منتجات مشابهة: نفس الفئة، أقرب سعر، مع استبعاد المنتج نفسه. */
export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
    .sort((a, b) => Math.abs(a.price - product.price) - Math.abs(b.price - product.price))
    .slice(0, limit);
}

/** الدراجات المناسبة لمقاس معيّن — تُستخدم بعد حاسبة المقاسات. */
export function getProductsForSize(recommendation) {
  if (!recommendation) return [];
  const wheels = recommendation.matchWheelSizes || [];
  return BIKES.filter((p) => {
    const w = p.specs?.wheelSize;
    if (wheels.length && !wheels.some((x) => String(x) === String(w))) return false;
    return true;
  }).sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function featuredProducts(limit = 8) {
  return queryProducts({ sort: 'featured' })
    .filter((p) => p.featured)
    .slice(0, limit);
}

export default PRODUCTS;

/** Product types that actually have stock listed. Empty sections stay out of
    menus and the sitemap rather than showing a blank page. */
export const LIVE_PRODUCT_TYPES = PRODUCT_TYPES.filter((type) => PRODUCTS.some((p) => productTypeOf(p) === type.slug));
