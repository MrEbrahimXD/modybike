import { SITE } from '../config/site.js';
import { getLocation } from '../data/locations.js';
import { colorInfo } from '../data/colors.js';
import { formatPrice } from '../i18n/index.jsx';

/** MB-20260914-4821 — short, readable, and easy to quote over the phone. */
export function generateOrderNumber(date = new Date()) {
  const ymd = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MB-${ymd}-${rand}`;
}

/** Egyptian mobile numbers: 11 digits starting 010 / 011 / 012 / 015. */
export function isValidEgyptianMobile(value = '') {
  const digits = String(value).replace(/[^\d]/g, '');
  const local = digits.startsWith('20') ? `0${digits.slice(2)}` : digits;
  return /^01[0125]\d{8}$/.test(local);
}

/**
 * Builds the WhatsApp order message.
 * Written in Arabic regardless of UI language, because that is what the shop reads.
 */
export function buildOrderMessage({ lines, subtotal, form, orderNumber, lang = 'ar' }) {
  const money = (v) => formatPrice(v, 'ar');
  const isPickup = form.deliveryMethod === 'pickup';
  const location = form.city && form.city !== 'outside' ? getLocation(form.city) : null;
  const cityLabel = location
    ? location.name.ar
    : form.city === 'outside'
      ? 'خارج محافظة الشرقية'
      : '—';

  /* The message quotes the goods only. Delivery is priced per area by the shop
     when it replies, so the site never puts a figure in the customer's hands. */

  const itemLines = lines.map((line, i) => {
    const p = line.product;
    const bits = [`${i + 1}) ${p.name.ar}`];
    const details = [];
    if (p.specs?.wheelSize) details.push(`جنط ${p.specs.wheelSize}"`);
    if (p.specs?.frameSize?.ar) details.push(`شاسيه ${p.specs.frameSize.ar}`);
    if (line.color) details.push(`لون ${colorInfo(line.color).ar}`);
    if (details.length) bits.push(`   ${details.join(' • ')}`);
    bits.push(`   الكود: ${p.sku}`);
    bits.push(`   ${line.qty} × ${money(p.price)} = ${money(line.lineTotal)}`);
    return bits.join('\n');
  });

  const parts = [
    '🚲 *طلب جديد من موقع ModyBike*',
    '',
    `*رقم الطلب:* ${orderNumber}`,
    '',
    '*بيانات العميل*',
    `👤 الاسم: ${form.name}`,
    `📞 الموبايل: ${form.phone}`,
    form.altPhone ? `📱 رقم احتياطي: ${form.altPhone}` : null,
    '',
    '*طريقة الاستلام*',
    isPickup ? '🏪 استلام من المعرض' : '🚚 توصيل للعنوان',
    isPickup ? null : `📍 المركز/المدينة: ${cityLabel}`,
    isPickup ? null : `🏠 العنوان: ${form.address}`,
    '',
    `*تفاصيل الطلب* (${lines.reduce((s, l) => s + l.qty, 0)} قطعة)`,
    ...itemLines,
    '',
    '─────────────',
    `*إجمالي المنتجات: ${money(subtotal)}*`,
    isPickup ? 'الاستلام: من المعرض' : 'الشحن: يُحدَّد حسب المنطقة عند التأكيد',
    '─────────────',
    form.notes ? `\n📝 *ملاحظات:*\n${form.notes}` : null,
    '',
    lang === 'en' ? '(Order placed from the English version of the site)' : null,
  ].filter((x) => x !== null && x !== undefined);

  return parts.join('\n');
}

export function whatsappUrl(message, phone = SITE.contact.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Pre-filled enquiry for a single product — used by the "ask about this" button. */
export function productEnquiryUrl(product, lang = 'ar') {
  const msg =
    lang === 'ar'
      ? `السلام عليكم 👋\nمهتم بالمنتج ده:\n\n*${product.name.ar}*\nالكود: ${product.sku}\nالسعر المعروض: ${formatPrice(product.price, 'ar')}\n\nممكن أعرف التفاصيل والتوفّر؟`
      : `Hello 👋\nI am interested in this product:\n\n*${product.name.en}*\nSKU: ${product.sku}\nListed price: ${formatPrice(product.price, 'en')}\n\nCould you tell me more about availability?`;
  return whatsappUrl(msg);
}

/** Generic enquiry from the contact page. */
export function contactEnquiryUrl({ name, message }, lang = 'ar') {
  const msg =
    lang === 'ar'
      ? `السلام عليكم 👋\nالاسم: ${name || '—'}\n\n${message || ''}`
      : `Hello 👋\nName: ${name || '—'}\n\n${message || ''}`;
  return whatsappUrl(msg);
}

/** Enquiry from a city landing page. */
export function locationEnquiryUrl(location, lang = 'ar') {
  const msg =
    lang === 'ar'
      ? `السلام عليكم
عايز أطلب دراجة توصيل لـ *${location.name.ar}*. إيه المتاح؟`
      : `Hello
I would like a bike delivered to *${location.name.en}*. What is available?`;
  return whatsappUrl(msg);
}

export function orderMailtoUrl(message, orderNumber) {
  const subject = `طلب جديد ${orderNumber} — ModyBike`;
  return `mailto:${SITE.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
