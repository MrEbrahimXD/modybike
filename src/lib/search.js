import { PRODUCTS } from '../data/products.js';
import { ALL_CATEGORIES, ACCESSORY_GROUPS } from '../data/categories.js';
import { AGE_GROUPS, PRODUCT_TYPES } from '../data/collections.js';
import { POSTS_SORTED } from '../content/posts/index.js';

/* ============================================================================
 *  البحث | Search
 * ============================================================================
 *  بحث محلي بالكامل — مفيش سيرفر ولا API. الكتالوج كله موجود في الصفحة أصلًا.
 *
 *  أهم حاجة هنا: تطبيع النص العربي. من غيره، اللي يكتب "دراجه" مش هيلاقي
 *  "دراجة"، واللي يكتب "اطفال" مش هيلاقي "أطفال" — وده أغلب الناس.
 *
 *  Entirely client-side: the catalogue already ships with the page.
 *  The part that matters is Arabic normalisation — without it someone typing
 *  "دراجه" never finds "دراجة", which is most of the traffic.
 * ========================================================================== */

const DIACRITICS = /[ؐ-ًؚ-ٰٟۖ-ۭ]/g;
const TATWEEL = /ـ/g;

/**
 * Folds a string into something comparable:
 *   · lowercased, trimmed, whitespace collapsed
 *   · Arabic diacritics and tatweel removed
 *   · alef forms (أ إ آ ٱ) → ا, ta marbuta (ة) → ه, alef maqsura (ى) → ي
 *   · Arabic-Indic digits (٠-٩ and ۰-۹) → 0-9
 *   · hamza carriers fold away too (ئ→ي, ؤ→و-ish) — deliberate, because
 *     Egyptian typing is inconsistent about them
 *   · Latin accents and punctuation stripped
 */
export function fold(input = '') {
  return String(input)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // latin accents
    .replace(DIACRITICS, '')
    .replace(TATWEEL, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[ىي]/g, 'ي')
    .replace(/[ؤئ]/g, 'ء')
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .toLowerCase()
    /* Punctuation goes, including the inch mark, so 26" and 26 fold alike. */
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Common ways people ask for the same thing, in both languages. */
const SYNONYMS = {
  عجل: 'دراجه',
  عجلة: 'دراجه',
  بسكلته: 'دراجه',
  بسكليت: 'دراجه',
  سيكل: 'دراجه',
  كاوتش: 'اطار عجله',
  جنط: 'عجله مقاس',
  فرامل: 'فرمله',
  bike: 'bicycle',
  cycle: 'bicycle',
  mtb: 'mountain',
  kid: 'kids child children',
  child: 'kids children',
  ebike: 'electric',
  'e-bike': 'electric',
};

function expand(folded) {
  const words = folded.split(' ').filter(Boolean);
  const extra = words.map((w) => SYNONYMS[w]).filter(Boolean);
  return [...words, ...extra.join(' ').split(' ').filter(Boolean)];
}

/** Pre-folded haystacks, built once at module load. */
function productHaystack(p) {
  const s = p.specs || {};
  return {
    name: fold([p.name?.ar, p.name?.en].filter(Boolean).join(' ')),
    rest: fold(
      [
        p.tagline?.ar,
        p.tagline?.en,
        p.sku,
        p.slug,
        p.category,
        p.subcategory,
        s.wheelSize ? `${s.wheelSize}" ${s.wheelSize} بوصة` : '',
        s.brakes,
        s.frameMaterial,
        s.suspension,
        (s.colors || []).join(' '),
        p.description?.ar,
        p.description?.en,
      ]
        .filter(Boolean)
        .join(' '),
    ),
  };
}

const PRODUCT_INDEX = PRODUCTS.map((p) => ({ item: p, ...productHaystack(p) }));

/* Bike categories, the accessories category, and each accessory group — so
   "أقفال" or "helmets" lands on a browsable page and not just a single item. */
const CATEGORY_INDEX = [
  ...AGE_GROUPS.map((group) => ({ item: { ...group, name: group.label }, kind: 'age' })),
  ...PRODUCT_TYPES.map((type) => ({ item: { ...type, name: type.label }, kind: 'type' })),
  ...ALL_CATEGORIES.map((c) => ({ item: c, kind: c.kind === 'accessory' ? 'accessory' : 'bike' })),
  ...ACCESSORY_GROUPS.map((g) => ({ item: g, kind: 'group' })),
].map(({ item, kind }) => ({
  item,
  kind,
  name: fold(`${item.name?.ar} ${item.name?.en}`),
  rest: fold(
    [item.short?.ar, item.short?.en, item.description?.ar, item.description?.en, item.slug]
      .filter(Boolean)
      .join(' '),
  ),
}));

const POST_INDEX = POSTS_SORTED.map((p) => ({
  item: p,
  name: fold(`${p.title?.ar} ${p.title?.en}`),
  rest: fold(
    [p.excerpt?.ar, p.excerpt?.en, ...(p.keywords?.ar || []), ...(p.keywords?.en || []), p.slug]
      .filter(Boolean)
      .join(' '),
  ),
}));

/**
 * Scores one entry. Higher is better; 0 means "no match at all".
 * Every word in the query has to appear somewhere, so "kids 20" narrows
 * rather than widening the way an OR search would.
 */
function score(entry, words) {
  let total = 0;

  for (const w of words) {
    let best = 0;
    if (entry.name === w) best = 100;
    else if (entry.name.startsWith(`${w} `) || entry.name.startsWith(w)) best = 60;
    else if (entry.name.includes(` ${w}`)) best = 45;
    else if (entry.name.includes(w)) best = 30;
    else if (entry.rest.includes(` ${w}`) || entry.rest.startsWith(w)) best = 14;
    else if (entry.rest.includes(w)) best = 8;

    if (!best) return 0; // every word must land
    total += best;
  }

  return total;
}

function run(index, words, limit, project = (e) => e.item) {
  return index
    .map((e) => ({ e, s: score(e, words) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || String(a.e.item.slug).localeCompare(String(b.e.item.slug)))
    .slice(0, limit)
    .map((r) => project(r.e));
}

/**
 * @param {string} query
 * @returns {{query:string, empty:boolean, products:object[], categories:object[], posts:object[], total:number}}
 */
export function searchAll(query, { productLimit = 8, categoryLimit = 3, postLimit = 4 } = {}) {
  const folded = fold(query);
  if (folded.length < 2) {
    return { query, empty: true, products: [], categories: [], posts: [], total: 0 };
  }

  const words = expand(folded);
  const products = run(PRODUCT_INDEX, words, productLimit);
  const categories = run(CATEGORY_INDEX, words, categoryLimit, (e) => ({ ...e.item, kind: e.kind }));
  const posts = run(POST_INDEX, words, postLimit);

  return {
    query,
    empty: false,
    products,
    categories,
    posts,
    total: products.length + categories.length + posts.length,
  };
}

/** Full result list for the catalogue page (no per-section cap). */
export function searchProducts(query) {
  const folded = fold(query);
  if (folded.length < 2) return null;
  return run(PRODUCT_INDEX, expand(folded), PRODUCTS.length);
}

/** Shown before anyone types — the things people actually come looking for. */
export const SUGGESTED_QUERIES = {
  ar: ['سكوتر', 'عربيات أطفال', 'من ٣ إلى ٥ سنين', 'دراجات', 'مشايات أطفال'],
  en: ['scooters', 'ride-on cars', 'ages 3–5', 'bicycles', 'baby walkers'],
};
