/**
 * Product categories. `slug` is used in URLs (/products?category=mountain) and in
 * the WhatsApp order message, so keep the slugs stable once the site is live.
 */
export const CATEGORIES = [
  {
    slug: 'kids',
    kind: 'bike',
    seo: { ar: 'عجل أطفال' },
    name: { ar: 'دراجات أطفال', en: 'Kids bikes' },
    short: { ar: 'من ٢ لـ ١٢ سنة', en: 'Ages 2–12' },
    description: {
      ar: 'دراجات أطفال بجنوط من ١٢ لـ ٢٤ بوصة، بعجل مساعد وفرامل سهلة، مختارة حسب طول وعمر الطفل.',
      en: 'Kids bikes with 12–24 inch wheels, training wheels and easy brakes, matched to the child’s height and age.',
    },
    icon: 'kids',
  },
  {
    slug: 'mountain',
    kind: 'bike',
    seo: { ar: 'عجل جبلي بسرعات' },
    name: { ar: 'دراجات جبلية', en: 'Mountain bikes' },
    short: { ar: 'للطرق الوعرة', en: 'For rough roads' },
    description: {
      ar: 'دراجات جبلية بمساعدين أمامية وفرامل قرصية، تتحمّل الطرق الزراعية والمطبّات والرمال.',
      en: 'Mountain bikes with front suspension and disc brakes, built for farm roads, potholes and sand.',
    },
    icon: 'mountain',
  },
  {
    slug: 'city',
    kind: 'bike',
    seo: { ar: 'عجل مدينة وسيدات' },
    name: { ar: 'دراجات مدينة وسيدات', en: 'City & women’s bikes' },
    short: { ar: 'راحة وأناقة', en: 'Comfort and style' },
    description: {
      ar: 'شاسيه منخفض سهل الركوب، سلة وحامل، وجلسة مستقيمة مريحة للمشاوير القصيرة.',
      en: 'Step-through frames, basket and rack, and an upright, comfortable posture for short trips.',
    },
    icon: 'city',
  },
  {
    slug: 'bmx',
    kind: 'bike',
    seo: { ar: 'عجل برامج و BMX' },
    name: { ar: 'دراجات برامج و BMX', en: 'Programme & BMX bikes' },
    short: { ar: 'الشكل اللي الولاد بيطلبوه', en: 'The look kids ask for' },
    description: {
      ar: 'شاسيه واطي وجدون مرتفع وكرسي خلفي عريض، بجنط ٢٠ و٢٤ بوصة — اللي السوق بيسميه «برامج».',
      en: 'Low frames, raised bars and a long rear seat, on 20 and 24-inch wheels — what the market calls “programme” bikes.',
    },
    icon: 'bmx',
  },
];

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}
