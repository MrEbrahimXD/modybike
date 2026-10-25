/* ============================================================================
 *  فهرس المدونة — البيانات الوصفية فقط (خفيفة، بتتحمّل مع الصفحة)
 * ============================================================================
 *  نص المقال نفسه موجود في ملف منفصل لكل مقال وبيتحمّل عند الحاجة بس،
 *  عشان حجم الجافاسكريبت يفضل صغير على الموبايلات القديمة.
 *
 *  ➕ عشان تضيف مقال جديد:
 *     ١) اعمل ملف جديد في نفس الفولدر باسم <slug>.js
 *     ٢) ضيف سطر هنا في POSTS
 * ========================================================================== */

export const POST_CATEGORIES = [
  { slug: 'sizing', name: { ar: 'المقاسات', en: 'Sizing' } },
  { slug: 'buying', name: { ar: 'دليل الشراء', en: 'Buying guides' } },
  { slug: 'maintenance', name: { ar: 'الصيانة', en: 'Maintenance' } },
  { slug: 'safety', name: { ar: 'الأمان', en: 'Safety' } },
  { slug: 'health', name: { ar: 'الصحة واللياقة', en: 'Health & fitness' } },
  { slug: 'local', name: { ar: 'الشرقية', en: 'Al Sharqia' } },
];

export const AUTHOR = {
  name: { ar: 'فريق مودي بايك', en: 'The ModyBike team' },
  bio: {
    ar: 'فريق مودي بايك للدراجات ولعب الأطفال. تواصل معنا للمساعدة في اختيار المقاس ومعرفة الموديلات المتاحة.',
    en: 'The ModyBike bicycle and children’s toy team. Contact us for help with sizing and currently available models.',
  },
};

export const POSTS = [
  {
    slug: 'bike-size-guide-by-height',
    category: 'sizing',
    pillar: true,
    date: '2026-02-04',
    updated: '2026-08-30',
    readingMin: 11,
    title: {
      ar: 'دليل مقاسات الدراجات حسب الطول والعمر (٢٠٢٦)',
      en: 'Bicycle size guide by height and age (2026)',
    },
    excerpt: {
      ar: 'جدول كامل يربط الطول بمقاس الجنط والشاسيه للأطفال والكبار، مع طريقة القياس الصحيحة وأشهر ٥ أخطاء في اختيار المقاس.',
      en: 'A complete chart linking height to wheel and frame size for children and adults, plus how to measure properly and the five most common sizing mistakes.',
    },
    keywords: {
      ar: ['مقاسات الدراجات', 'مقاس العجلة حسب الطول', 'مقاس الشاسيه', 'دراجة مناسبة لطولي'],
      en: ['bike size guide', 'bike size by height', 'frame size chart'],
    },
    related: ['wheel-sizes-explained', 'kids-bike-by-age', 'saddle-height-setup'],
  },
  {
    slug: 'wheel-sizes-explained',
    category: 'sizing',
    pillar: true,
    date: '2026-02-11',
    updated: '2026-08-12',
    readingMin: 9,
    title: {
      ar: 'مقاسات الجنوط من ١٢ لـ ٢٩ بوصة: الفرق وإمتى تختار كل مقاس',
      en: 'Wheel sizes from 12 to 29 inch: the difference and when to pick each',
    },
    excerpt: {
      ar: 'إيه معنى ٢٦ و٢٧.٥ و٢٩ بوصة؟ وليه الرقم المكتوب على الكاوتش مش دقيق؟ شرح معيار ETRTO وجدول المقاسات الكامل.',
      en: 'What do 26, 27.5 and 29 inch actually mean, and why is the number printed on a tyre unreliable? The ETRTO standard explained, with a full size chart.',
    },
    keywords: {
      ar: ['مقاسات الجنوط', 'جنط 26 بوصة', 'الفرق بين 27.5 و29', 'مقاس الكاوتش'],
      en: ['wheel sizes', 'ETRTO', '26 vs 27.5 vs 29'],
    },
    related: ['bike-size-guide-by-height', 'tyre-pressure-guide', 'mtb-vs-hybrid-vs-road'],
  },
  {
    slug: 'kids-bike-by-age',
    category: 'sizing',
    pillar: true,
    date: '2026-02-18',
    updated: '2026-09-01',
    readingMin: 10,
    title: {
      ar: 'إزاي تختار دراجة طفلك حسب السن والطول — دليل الأهل الكامل',
      en: 'How to choose your child’s bike by age and height — the parents’ guide',
    },
    excerpt: {
      ar: 'من دراجة التوازن لحد مقاس ٢٤ بوصة: جدول الأعمار والأطوال، اختبار الوقوف، وليه شراء مقاس أكبر «عشان يكبر فيه» غلطة خطيرة.',
      en: 'From balance bikes to 24-inch: the age and height chart, the standover test, and why buying a size up “to grow into” is a genuinely dangerous mistake.',
    },
    keywords: {
      ar: ['دراجة أطفال', 'مقاس دراجة الطفل', 'عجلة أطفال 6 سنين', 'دراجة توازن'],
      en: ['kids bike size', 'balance bike', 'child bike by age'],
    },
    related: ['bike-size-guide-by-height', 'kids-cycling-safety', 'essential-accessories'],
  },
  {
    slug: 'mtb-vs-hybrid-vs-road',
    category: 'buying',
    pillar: true,
    date: '2026-02-25',
    updated: '2026-07-19',
    readingMin: 10,
    title: {
      ar: 'جبلي ولا هجين ولا سباق؟ اختار نوع الدراجة الصح من أول مرة',
      en: 'Mountain, hybrid or road? Choosing the right bike type the first time',
    },
    excerpt: {
      ar: 'مقارنة عملية بين أنواع الدراجات من حيث السرعة والراحة والتحمّل والسعر، مع توصية واضحة لكل حالة استخدام.',
      en: 'A practical comparison of bike types across speed, comfort, durability and price — with a clear recommendation for each use case.',
    },
    keywords: {
      ar: ['الفرق بين الدراجات', 'دراجة جبلية ولا هجين', 'أنواع الدراجات'],
      en: ['mountain vs hybrid', 'bike types compared', 'which bike to buy'],
    },
    related: ['first-bike-mistakes', 'bike-prices-egypt', 'gears-explained'],
  },
  {
    slug: 'saddle-height-setup',
    category: 'maintenance',
    date: '2026-03-04',
    updated: '2026-08-02',
    readingMin: 8,
    title: {
      ar: 'ضبط ارتفاع الكرسي والمقود: أهم ١٥ دقيقة هتقضيها مع دراجتك',
      en: 'Saddle and handlebar setup: the most valuable 15 minutes you will spend',
    },
    excerpt: {
      ar: 'معادلة LeMond لحساب ارتفاع الكرسي، طريقة قياس طول الرجل الداخلي، وعلاج وجع الركبة والظهر والإيد من غير ما تغيّر الدراجة.',
      en: 'The LeMond formula for saddle height, how to measure your inseam, and how to cure knee, back and hand pain without changing the bike.',
    },
    keywords: {
      ar: ['ارتفاع كرسي الدراجة', 'وجع الركبة من العجلة', 'ضبط الدراجة'],
      en: ['saddle height', 'bike fit', 'knee pain cycling'],
    },
    related: ['bike-size-guide-by-height', 'bike-maintenance-schedule', 'cycling-for-weight-loss'],
  },
  {
    slug: 'essential-accessories',
    category: 'safety',
    date: '2026-03-11',
    updated: '2026-08-20',
    readingMin: 9,
    title: {
      ar: 'إكسسوارات الدراجة: إيه الضروري فعلًا وإيه اللي تقدر تأجّله',
      en: 'Bike accessories: what is genuinely essential and what can wait',
    },
    excerpt: {
      ar: 'ترتيب الإكسسوارات بالأولوية من الأهم للأقل: الخوذة، الأنوار، القفل، الجرس، المضخة… مع ميزانية تقريبية لكل مستوى.',
      en: 'Accessories ranked by priority — helmet, lights, lock, bell, pump — with an approximate budget for each tier.',
    },
    keywords: {
      ar: ['إكسسوارات دراجات', 'أنوار دراجة', 'قفل دراجة', 'خوذة'],
      en: ['bike accessories', 'bike lights', 'bike lock', 'helmet'],
    },
    related: ['bike-lock-security', 'night-riding-safety', 'kids-cycling-safety'],
  },
  {
    slug: 'bike-maintenance-schedule',
    category: 'maintenance',
    date: '2026-03-18',
    updated: '2026-09-05',
    readingMin: 9,
    title: {
      ar: 'جدول صيانة الدراجة: يومي وأسبوعي وشهري ونصف سنوي',
      en: 'Bike maintenance schedule: daily, weekly, monthly and half-yearly',
    },
    excerpt: {
      ar: 'فحص M-Check قبل كل مشوار، تزييت الجنزير صح، وإيه اللي تقدر تعمله بنفسك وإيه اللي لازم يروح للورشة.',
      en: 'The M-Check before every ride, how to lubricate a chain properly, and what you can do yourself versus what belongs in a workshop.',
    },
    keywords: {
      ar: ['صيانة الدراجة', 'تزييت الجنزير', 'ضبط الفرامل'],
      en: ['bike maintenance', 'chain lubrication', 'brake adjustment'],
    },
    related: ['tyre-pressure-guide', 'brakes-disc-vs-vbrake', 'saddle-height-setup'],
  },
  {
    slug: 'tyre-pressure-guide',
    category: 'maintenance',
    date: '2026-03-25',
    updated: '2026-07-28',
    readingMin: 7,
    title: {
      ar: 'ضغط هواء إطارات الدراجة: الأرقام الصح لكل نوع',
      en: 'Bicycle tyre pressure: the right numbers for every type',
    },
    excerpt: {
      ar: 'ليه الضغط الغلط بيسبب بنشر ويبطّئك؟ جدول PSI لكل نوع دراجة، وتأثير وزن الراكب والجو الحار على الضغط.',
      en: 'Why the wrong pressure causes punctures and slows you down: a PSI chart for every bike type, plus how rider weight and heat change the numbers.',
    },
    keywords: {
      ar: ['ضغط هواء الإطارات', 'نفخ كاوتش الدراجة', 'psi دراجة'],
      en: ['tyre pressure', 'bike psi', 'pinch flat'],
    },
    related: ['bike-maintenance-schedule', 'wheel-sizes-explained', 'essential-accessories'],
  },
  {
    slug: 'bike-lock-security',
    category: 'safety',
    date: '2026-04-01',
    updated: '2026-08-08',
    readingMin: 8,
    title: {
      ar: 'إزاي تحمي دراجتك من السرقة: أنواع الأقفال وطريقة الربط الصح',
      en: 'How to protect your bike from theft: lock types and the right way to lock up',
    },
    excerpt: {
      ar: 'مقارنة بين قفل U والجنزير والكابل، قاعدة «اربط الشاسيه مش الجنط»، وخطوات عملية لو الدراجة اتسرقت.',
      en: 'U-locks versus chains versus cables, the “lock the frame, not the wheel” rule, and what to do if your bike is stolen.',
    },
    keywords: {
      ar: ['قفل دراجة', 'سرقة الدراجات', 'جنزير دراجة'],
      en: ['bike lock', 'bike theft', 'u-lock vs chain'],
    },
    related: ['essential-accessories', 'night-riding-safety', 'bike-prices-egypt'],
  },
  {
    slug: 'gears-explained',
    category: 'buying',
    date: '2026-04-08',
    updated: '2026-07-15',
    readingMin: 8,
    title: {
      ar: 'سرعات الدراجة (الجيرات): ٧ ولا ٢١ ولا ٢٧؟ وإزاي تستخدمها صح',
      en: 'Bike gears: 7, 21 or 27 speeds — and how to actually use them',
    },
    excerpt: {
      ar: 'ليه الرقم الأكبر مش معناه الأحسن؟ شرح الترس الأمامي والخلفي، وأخطاء الاستخدام اللي بتقطع الجنزير.',
      en: 'Why a bigger number is not automatically better: front and rear sprockets explained, plus the shifting mistakes that wreck chains.',
    },
    keywords: {
      ar: ['سرعات الدراجة', 'جيرات الدراجة', '21 سرعة'],
      en: ['bike gears', '21 speed', 'cross chaining'],
    },
    related: ['mtb-vs-hybrid-vs-road', 'bike-maintenance-schedule', 'first-bike-mistakes'],
  },
  {
    slug: 'brakes-disc-vs-vbrake',
    category: 'buying',
    date: '2026-04-15',
    updated: '2026-08-16',
    readingMin: 7,
    title: {
      ar: 'فرامل قرصية ولا كفة؟ مقارنة عملية بالأرقام',
      en: 'Disc brakes or V-brakes? A practical comparison',
    },
    excerpt: {
      ar: 'قوة الإيقاف، الأداء في المطر والتراب، تكلفة الصيانة، وتوفّر قطع الغيار في مصر — إمتى تدفع فرق السعر وإمتى ما تدفعوش.',
      en: 'Stopping power, wet and dusty performance, servicing cost and spare-part availability in Egypt — when the upgrade is worth paying for.',
    },
    keywords: {
      ar: ['فرامل قرصية', 'v-brake', 'فرامل الدراجة'],
      en: ['disc vs v-brake', 'bike brakes', 'hydraulic brakes'],
    },
    related: ['mtb-vs-hybrid-vs-road', 'bike-maintenance-schedule', 'gears-explained'],
  },
  {
    slug: 'first-bike-mistakes',
    category: 'buying',
    date: '2026-04-22',
    updated: '2026-08-25',
    readingMin: 8,
    title: {
      ar: '٩ أخطاء شائعة عند شراء أول دراجة (وإزاي تتجنبها)',
      en: '9 common mistakes when buying your first bike (and how to avoid them)',
    },
    excerpt: {
      ar: 'من شراء مقاس أكبر «عشان يكبر فيه» لحد الانبهار بعدد السرعات — الأخطاء اللي بنشوفها كل أسبوع في المعرض.',
      en: 'From buying a size up “to grow into” to being dazzled by the gear count — the mistakes we see in the showroom every week.',
    },
    keywords: {
      ar: ['شراء دراجة', 'أخطاء شراء العجل', 'أول دراجة'],
      en: ['first bike', 'buying mistakes', 'bike buying guide'],
    },
    related: ['mtb-vs-hybrid-vs-road', 'bike-prices-egypt', 'bike-size-guide-by-height'],
  },
  {
    slug: 'bike-prices-egypt',
    category: 'buying',
    date: '2026-04-29',
    updated: '2026-09-02',
    readingMin: 9,
    title: {
      ar: 'أسعار الدراجات في مصر ٢٠٢٦: إيه اللي بيحدد السعر فعلًا؟',
      en: 'Bicycle prices in Egypt 2026: what actually sets the price?',
    },
    excerpt: {
      ar: 'خامة الشاسيه، مجموعة النقل، الفرامل، والجنوط — تفكيك السعر بند بند، وشرايح الأسعار المتوقعة لكل نوع.',
      en: 'Frame material, drivetrain, brakes and wheels — the price broken down item by item, with the expected bracket for each bike type.',
    },
    keywords: {
      ar: ['أسعار الدراجات في مصر', 'سعر عجلة', 'دراجة رخيصة'],
      en: ['bike prices egypt', 'how much does a bike cost'],
    },
    related: ['first-bike-mistakes', 'mtb-vs-hybrid-vs-road', 'brakes-disc-vs-vbrake'],
  },
  {
    slug: 'cycling-for-weight-loss',
    category: 'health',
    date: '2026-05-06',
    updated: '2026-08-11',
    readingMin: 8,
    title: {
      ar: 'الدراجة وإنقاص الوزن: كام سعرة بتحرق فعلًا وإزاي تبدأ صح',
      en: 'Cycling for weight loss: the real calorie numbers and how to start',
    },
    excerpt: {
      ar: 'أرقام حرق السعرات حسب الوزن والسرعة، خطة ٨ أسابيع للمبتدئين، وليه الدراجة أرحم على الركبة من الجري.',
      en: 'Calorie burn by weight and speed, an eight-week beginner plan, and why cycling is easier on the knees than running.',
    },
    keywords: {
      ar: ['الدراجة وإنقاص الوزن', 'حرق سعرات بالعجلة', 'رياضة الدراجة'],
      en: ['cycling weight loss', 'calories cycling', 'beginner cycling plan'],
    },
    related: ['saddle-height-setup', 'mtb-vs-hybrid-vs-road', 'essential-accessories'],
  },
  {
    slug: 'night-riding-safety',
    category: 'safety',
    date: '2026-05-13',
    updated: '2026-08-28',
    readingMin: 7,
    title: {
      ar: 'الركوب بالليل وفي الشتا: قواعد الأمان اللي بتفرق فعلًا',
      en: 'Riding at night and in winter: the safety rules that actually matter',
    },
    excerpt: {
      ar: 'ليه العاكسات الجانبية أهم من النور الأمامي؟ وقواعد الوضوح، والمسافة الآمنة من العربيات على طرق الشرقية.',
      en: 'Why side reflectors matter more than a headlight, the rules of being seen, and safe distances from traffic on Sharqia roads.',
    },
    keywords: {
      ar: ['أمان ركوب الدراجة', 'أنوار الدراجة', 'الركوب بالليل'],
      en: ['night cycling safety', 'bike visibility', 'winter cycling'],
    },
    related: ['essential-accessories', 'bike-lock-security', 'cycling-in-sharqia'],
  },
  {
    slug: 'kids-cycling-safety',
    category: 'safety',
    date: '2026-05-20',
    updated: '2026-09-06',
    readingMin: 8,
    title: {
      ar: 'أمان الأطفال على الدراجة: من العجل المساعد لحد الشارع',
      en: 'Keeping kids safe on bikes: from training wheels to the street',
    },
    excerpt: {
      ar: 'إزاي تعلّم طفلك التوازن في يومين، مقاس الخوذة الصح، وإمتى يبقى مستعد يركب في الشارع.',
      en: 'How to teach balance in two days, getting helmet fit right, and when a child is genuinely ready for the road.',
    },
    keywords: {
      ar: ['أمان الأطفال دراجة', 'خوذة أطفال', 'تعليم الطفل ركوب العجلة'],
      en: ['kids bike safety', 'child helmet fit', 'teaching kids to ride'],
    },
    related: ['kids-bike-by-age', 'essential-accessories', 'night-riding-safety'],
  },
  {
    slug: 'women-bikes-guide',
    category: 'buying',
    date: '2026-05-27',
    updated: '2026-08-18',
    readingMin: 7,
    title: {
      ar: 'دراجات السيدات: إيه الفرق الحقيقي وإيه اللي مجرد لون؟',
      en: 'Women’s bikes: what genuinely differs and what is just paint',
    },
    excerpt: {
      ar: 'الشاسيه المنخفض، عرض الكرسي، مدى مقبض الفرامل، وعرض المقود — الفروق الهندسية الحقيقية بعيدًا عن التسويق.',
      en: 'Step-through frames, saddle width, brake lever reach and bar width — the real geometry differences beyond the marketing.',
    },
    keywords: {
      ar: ['دراجات سيدات', 'عجلة حريمي', 'دراجة بنات'],
      en: ['womens bikes', 'step through frame', 'womens bike fit'],
    },
    related: ['bike-size-guide-by-height', 'mtb-vs-hybrid-vs-road', 'saddle-height-setup'],
  },
  {
    slug: 'electric-bikes-guide',
    category: 'buying',
    date: '2026-06-03',
    updated: '2026-09-04',
    readingMin: 9,
    title: {
      ar: 'الدراجات الكهربائية: هل تستاهل السعر؟ دليل كامل للمبتدئين',
      en: 'Electric bikes: are they worth the price? A complete beginner’s guide',
    },
    excerpt: {
      ar: 'إزاي تشتغل، معنى ٢٥٠ وات و٣٦ فولت، حساب المدى الحقيقي، وعمر البطارية — وإمتى تكون الدراجة العادية أفضل.',
      en: 'How they work, what 250 W and 36 V mean, calculating real range and battery life — and when a normal bike is the better buy.',
    },
    keywords: {
      ar: ['دراجة كهربائية', 'عجلة كهربا', 'بطارية دراجة'],
      en: ['electric bike guide', 'ebike battery', 'ebike range'],
    },
    related: ['bike-prices-egypt', 'mtb-vs-hybrid-vs-road', 'bike-maintenance-schedule'],
  },
  {
    slug: 'cycling-in-sharqia',
    category: 'local',
    date: '2026-06-10',
    updated: '2026-09-08',
    readingMin: 8,
    title: {
      ar: 'ركوب الدراجة في محافظة الشرقية: أفضل المسارات وقواعد الأمان المحلية',
      en: 'Cycling in Al Sharqia: the best routes and local safety rules',
    },
    excerpt: {
      ar: 'مسارات مقترحة حوالين الزقازيق وبلبيس وأبو حماد، التعامل مع الطرق الزراعية والتروسيكل، وأفضل أوقات الركوب في الصيف.',
      en: 'Suggested routes around Zagazig, Belbeis and Abu Hammad, dealing with farm roads and tuk-tuks, and the best riding hours in summer.',
    },
    keywords: {
      ar: ['ركوب الدراجة في الشرقية', 'مسارات دراجات الزقازيق', 'دراجات الشرقية'],
      en: ['cycling sharqia', 'zagazig cycling routes'],
    },
    related: ['night-riding-safety', 'tyre-pressure-guide', 'essential-accessories'],
  },
];

/** Newest first. */
export const POSTS_SORTED = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export function getPostMeta(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}

export function postsByCategory(category) {
  return POSTS_SORTED.filter((p) => p.category === category);
}

export function relatedPostMeta(slug, limit = 3) {
  const meta = getPostMeta(slug);
  if (!meta) return [];
  const picked = (meta.related || []).map(getPostMeta).filter(Boolean);
  if (picked.length >= limit) return picked.slice(0, limit);
  const fill = POSTS_SORTED.filter(
    (p) => p.slug !== slug && !picked.some((x) => x.slug === p.slug) && p.category === meta.category,
  );
  return [...picked, ...fill].slice(0, limit);
}

export default POSTS;
