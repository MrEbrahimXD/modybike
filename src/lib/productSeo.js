import { formatPrice } from '../i18n/index.jsx';

/** "دراجة ٢٠ بوصة" → "دراجة 20 بوصة": people search with Western digits. */
export const latinDigits = (text = '') => String(text).replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));

/** "موديل واحد"، "موديلين"، "3 موديلات"، "15 موديل" — Arabic counts properly. */
export function modelCount(n, lang = 'ar') {
  if (lang !== 'ar') return `${n} ${n === 1 ? 'model' : 'models'}`;
  if (n === 1) return 'موديل واحد';
  if (n === 2) return 'موديلين';
  return n <= 10 ? `${n} موديلات` : `${n} موديل`;
}

/** Cuts at a word boundary so a description never ends mid-word. */
export function clip(text = '', max = 158) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if ([...clean].length <= max) return clean;
  const cut = [...clean].slice(0, max).join('');
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[،,.;:—-]+$/, '')}…`;
}

/** Product name the way Egyptians search for it: "عجلة" and Western digits. */
export function productSearchName(product, lang = 'ar') {
  if (lang !== 'ar') return product.name.en;
  return latinDigits(product.name.ar).replace(/^دراجة/, 'عجلة');
}

function ageText(product, lang) {
  const { ageMin, ageMax } = product.fit || {};
  if (ageMin == null) return '';
  if (lang === 'ar') return ageMax && ageMax < 99 ? `لسن ${ageMin}–${ageMax} ${ageMax > 10 ? 'سنة' : 'سنين'}` : `من سن ${ageMin} سنة`;
  return ageMax && ageMax < 99 ? `for ages ${ageMin}–${ageMax}` : `for ages ${ageMin}+`;
}

/** "عجلة أطفال 12 بوصة — سبورت بوي بسعر 1,900 ج.م" */
export function productSeoTitle(product, lang = 'ar') {
  const price = formatPrice(product.price, lang);
  return lang === 'ar' ? `${productSearchName(product, 'ar')} بسعر ${price}` : `${product.name.en} — ${price}`;
}

export function productSeoDescription(product, lang = 'ar') {
  const price = formatPrice(product.price, lang);
  const firstSentence = latinDigits(product.description[lang]).split(/(?<=[.!؟?])\s/)[0];
  const lead = lang === 'ar'
    ? `${productSearchName(product, 'ar')} ${ageText(product, 'ar')} بسعر ${price}.`
    : `${product.name.en} ${ageText(product, 'en')}, ${price}.`;
  const close = lang === 'ar' ? 'اطلب على واتساب والتوصيل لحد البيت.' : 'Order on WhatsApp for delivery to your door.';
  const full = `${lead.replace(/\s+/g, ' ')} ${firstSentence} ${close}`;
  return [...full].length <= 160 ? full : clip(`${lead} ${close} ${firstSentence}`, 158);
}
