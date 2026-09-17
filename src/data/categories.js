/**
 * Product categories. `slug` is used in URLs (/products?category=mountain) and in
 * the WhatsApp order message, so keep the slugs stable once the site is live.
 */
export const CATEGORIES = [
  {
    slug: 'kids',
    kind: 'bike',
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
    name: { ar: 'دراجات جبلية', en: 'Mountain bikes' },
    short: { ar: 'للطرق الوعرة', en: 'For rough roads' },
    description: {
      ar: 'دراجات جبلية بمساعدين أمامية وفرامل قرصية، تتحمّل الطرق الزراعية والمطبّات والرمال.',
      en: 'Mountain bikes with front suspension and disc brakes, built for farm roads, potholes and sand.',
    },
    icon: 'mountain',
  },
  {
    slug: 'hybrid',
    kind: 'bike',
    name: { ar: 'دراجات هجين', en: 'Hybrid bikes' },
    short: { ar: 'الأكثر استخدامًا يوميًا', en: 'Best all-rounder' },
    description: {
      ar: 'الاختيار الأنسب للاستخدام اليومي داخل المدن: جلسة مريحة، سرعة كويسة، وتحمّل للشوارع.',
      en: 'The best pick for daily city riding: comfortable posture, decent speed and street-ready durability.',
    },
    icon: 'hybrid',
  },
  {
    slug: 'road',
    kind: 'bike',
    name: { ar: 'دراجات طريق (سباق)', en: 'Road bikes' },
    short: { ar: 'للسرعة والمسافات', en: 'Speed and distance' },
    description: {
      ar: 'دراجات خفيفة بإطارات رفيعة ومقود منحني، للسرعة والمسافات الطويلة على الأسفلت.',
      en: 'Light bikes with narrow tyres and drop bars, for speed and long asphalt rides.',
    },
    icon: 'road',
  },
  {
    slug: 'city',
    kind: 'bike',
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
    name: { ar: 'دراجات BMX وحركات', en: 'BMX & freestyle' },
    short: { ar: 'للحركات والقفز', en: 'Tricks and jumps' },
    description: {
      ar: 'شاسيه قوي وجنط ٢٠ بوصة، مخصوص للحركات والقفز وركوب الشباب.',
      en: 'Strong frames and 20-inch wheels, made for tricks, jumps and street riding.',
    },
    icon: 'bmx',
  },
  {
    slug: 'folding',
    kind: 'bike',
    name: { ar: 'دراجات قابلة للطي', en: 'Folding bikes' },
    short: { ar: 'للمواصلات والشقق الصغيرة', en: 'Commute and small flats' },
    description: {
      ar: 'بتتطوي في ثوانٍ وتتحط في شنطة العربية أو خلف باب الشقة — مثالية للمواصلات.',
      en: 'Folds in seconds into a car boot or behind a door — ideal for commuting.',
    },
    icon: 'folding',
  },
  {
    slug: 'electric',
    kind: 'bike',
    name: { ar: 'دراجات كهربائية', en: 'Electric bikes' },
    short: { ar: 'مجهود أقل، مدى أطول', en: 'Less effort, more range' },
    description: {
      ar: 'موتور مساعد وبطارية ليثيوم، تقطع مسافات أطول بمجهود أقل — مناسبة للطرق الطويلة والعمل.',
      en: 'Assist motor and lithium battery for longer distances with less effort — great for commuting.',
    },
    icon: 'electric',
  },
];

/** Accessory sub-categories (all live under the `accessories` product category). */
export const ACCESSORY_GROUPS = [
  { slug: 'lighting', name: { ar: 'أنوار وعواكس', en: 'Lights & reflectors' }, icon: 'light' },
  { slug: 'security', name: { ar: 'أقفال وجنازير', en: 'Locks & chains' }, icon: 'lock' },
  { slug: 'carrying', name: { ar: 'سلال وحوامل وشنط', en: 'Baskets, racks & bags' }, icon: 'basket' },
  { slug: 'safety', name: { ar: 'خوذ وواقيات', en: 'Helmets & protection' }, icon: 'helmet' },
  { slug: 'bells', name: { ar: 'زمّارات وجرس', en: 'Bells & horns' }, icon: 'bell' },
  { slug: 'maintenance', name: { ar: 'صيانة وإصلاح', en: 'Maintenance & repair' }, icon: 'tool' },
  { slug: 'comfort', name: { ar: 'راحة وإضافات', en: 'Comfort & extras' }, icon: 'comfort' },
  { slug: 'kids-extras', name: { ar: 'مستلزمات الأطفال', en: 'Kids extras' }, icon: 'kids' },
];

export const ACCESSORIES_CATEGORY = {
  slug: 'accessories',
  kind: 'accessory',
  name: { ar: 'إكسسوارات الدراجات', en: 'Bike accessories' },
  short: { ar: 'كل مستلزمات العجلة', en: 'Everything for your bike' },
  description: {
    ar: 'أنوار، زمّارة، سلة، قفل جنزير، خوذة، مضخة هواء، حامل موبايل وكل اللي الدراجة محتاجاه.',
    en: 'Lights, horn, basket, chain lock, helmet, pump, phone mount and everything else your bike needs.',
  },
  icon: 'accessories',
};

export const ALL_CATEGORIES = [...CATEGORIES, ACCESSORIES_CATEGORY];

export function getCategory(slug) {
  return ALL_CATEGORIES.find((c) => c.slug === slug) || null;
}

export function getAccessoryGroup(slug) {
  return ACCESSORY_GROUPS.find((g) => g.slug === slug) || null;
}
