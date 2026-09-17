import { createContext, useContext, useMemo } from 'react';
import ar from './ar.js';
import en from './en.js';
import { DEFAULT_LOCALE, SITE } from '../config/site.js';

export const DICTS = { ar, en };

const LocaleContext = createContext(null);

/** Deep key lookup: `t('nav.home')`. Returns the key itself if missing (loud in dev, harmless in prod). */
function lookup(dict, key) {
  let node = dict;
  for (const part of key.split('.')) {
    if (node == null || typeof node !== 'object') return undefined;
    node = node[part];
  }
  return node;
}

function interpolate(str, vars) {
  if (!vars || typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

/**
 * Builds a localised href.
 * Arabic lives at the root (`/products`), English under `/en` (`/en/products`).
 */
export function localizedPath(lang, to = '/') {
  const clean = to === '/' ? '' : to.replace(/\/+$/, '');
  const withLang = lang === DEFAULT_LOCALE ? clean : `/en${clean}`;
  return withLang === '' ? '/' : withLang;
}

/** Strips the locale prefix so we can swap languages while staying on the same page. */
export function stripLocale(pathname) {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

export function localeFromPath(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ar';
}

/**
 * Prices always use Western digits — that is how they are quoted in Egyptian shops,
 * and it keeps them readable in both directions.
 */
export function formatPrice(value, lang = 'ar', { withCurrency = true } = {}) {
  const n = Number(value) || 0;
  const num = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-EG', {
    maximumFractionDigits: 0,
  }).format(n);
  if (!withCurrency) return num;
  return lang === 'ar' ? `${num} ${SITE.currency.symbol.ar}` : `${SITE.currency.symbol.en} ${num}`;
}

export function formatNumber(value, lang = 'ar') {
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US').format(
    Number(value) || 0,
  );
}

export function formatDate(iso, lang = 'ar') {
  try {
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function LocaleProvider({ lang, children }) {
  const value = useMemo(() => {
    const dict = DICTS[lang] || DICTS.ar;
    const dir = dict.meta.dir;
    return {
      lang,
      dir,
      isRtl: dir === 'rtl',
      htmlLang: dict.meta.htmlLang,
      dict,
      /** UI string by dotted key, with optional `{placeholders}` */
      t: (key, vars) => {
        const found = lookup(dict, key);
        if (found === undefined) return key;
        return typeof found === 'string' ? interpolate(found, vars) : found;
      },
      /** Bilingual data field: `tr(product.name)` */
      tr: (field) => {
        if (field == null) return '';
        if (typeof field === 'string') return field;
        return field[lang] ?? field.ar ?? field.en ?? '';
      },
      path: (to) => localizedPath(lang, to),
      price: (v, opts) => formatPrice(v, lang, opts),
      num: (v) => formatNumber(v, lang),
      date: (v) => formatDate(v, lang),
    };
  }, [lang]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}

export default LocaleProvider;
