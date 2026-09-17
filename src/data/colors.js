/** ألوان المنتجات — المفتاح بيتكرر في `specs.colors` لكل منتج. */
export const COLORS = {
  black: { ar: 'أسود', en: 'Black', hex: '#111827' },
  white: { ar: 'أبيض', en: 'White', hex: '#f8fafc' },
  red: { ar: 'أحمر', en: 'Red', hex: '#dc2626' },
  blue: { ar: 'أزرق', en: 'Blue', hex: '#2563eb' },
  navy: { ar: 'كحلي', en: 'Navy', hex: '#1e293b' },
  green: { ar: 'أخضر', en: 'Green', hex: '#16a34a' },
  orange: { ar: 'برتقالي', en: 'Orange', hex: '#f85016' },
  yellow: { ar: 'أصفر', en: 'Yellow', hex: '#eab308' },
  pink: { ar: 'وردي', en: 'Pink', hex: '#ec4899' },
  purple: { ar: 'بنفسجي', en: 'Purple', hex: '#9333ea' },
  silver: { ar: 'فضي', en: 'Silver', hex: '#cbd5e1' },
  grey: { ar: 'رمادي', en: 'Grey', hex: '#64748b' },
  turquoise: { ar: 'تركواز', en: 'Turquoise', hex: '#06b6d4' },
  mint: { ar: 'أخضر فاتح', en: 'Mint', hex: '#6ee7b7' },
  beige: { ar: 'بيج', en: 'Beige', hex: '#d6c3a5' },
};

export function colorInfo(key) {
  return COLORS[key] || { ar: key, en: key, hex: '#94a3b8' };
}

export default COLORS;
