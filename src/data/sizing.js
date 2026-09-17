/* ============================================================================
 *  جداول مقاسات الدراجات  |  Bicycle sizing reference data
 * ============================================================================
 *  المصادر: معايير ETRTO/ISO لمقاسات الجنوط، وجداول المقاسات المتعارف عليها
 *  لدى مصنّعي الدراجات. القيم إرشادية وبتختلف قليلًا من ماركة للتانية.
 * ========================================================================== */

/** دراجات الأطفال — الاختيار الأساسي فيها بمقاس الجنط مش الشاسيه. */
export const KIDS_SIZES = [
  {
    wheel: 12,
    ageMin: 2,
    ageMax: 4,
    heightMin: 85,
    heightMax: 100,
    inseamMin: 35,
    inseamMax: 42,
    note: {
      ar: 'أول دراجة للطفل. غالبًا بعجل مساعد أو دراجة توازن بدون بدالات.',
      en: 'A child’s first bike — usually with training wheels, or a balance bike with no pedals.',
    },
  },
  {
    wheel: 14,
    ageMin: 3,
    ageMax: 5,
    heightMin: 95,
    heightMax: 110,
    inseamMin: 40,
    inseamMax: 48,
    note: {
      ar: 'مناسبة للطفل اللي اتعوّد على التوازن وبدأ يستخدم البدالات.',
      en: 'Suits a child who has found their balance and started pedalling.',
    },
  },
  {
    wheel: 16,
    ageMin: 4,
    ageMax: 6,
    heightMin: 105,
    heightMax: 120,
    inseamMin: 45,
    inseamMax: 55,
    note: {
      ar: 'أشهر مقاس لمرحلة ما قبل المدرسة وأول سنة ابتدائي.',
      en: 'The most common size for pre-school and first grade.',
    },
  },
  {
    wheel: 18,
    ageMin: 5,
    ageMax: 7,
    heightMin: 112,
    heightMax: 127,
    inseamMin: 50,
    inseamMax: 60,
    note: {
      ar: 'مقاس انتقالي بين ١٦ و ٢٠ — مش متوفر عند كل الماركات.',
      en: 'A transitional size between 16 and 18 inch — not stocked by every brand.',
    },
  },
  {
    wheel: 20,
    ageMin: 6,
    ageMax: 9,
    heightMin: 120,
    heightMax: 135,
    inseamMin: 55,
    inseamMax: 63,
    note: {
      ar: 'بداية ظهور السرعات (الجيرات) وفرامل الكفة. ونفس مقاس دراجات BMX.',
      en: 'Where gears and hand brakes usually appear — and the same wheel size as BMX.',
    },
  },
  {
    wheel: 24,
    ageMin: 8,
    ageMax: 12,
    heightMin: 135,
    heightMax: 150,
    inseamMin: 62,
    inseamMax: 72,
    note: {
      ar: 'نسخة مصغّرة من دراجة الكبار: سرعات كاملة وأحيانًا مساعدين أمامية.',
      en: 'A scaled-down adult bike: full gearing and sometimes front suspension.',
    },
  },
  {
    wheel: 26,
    ageMin: 11,
    ageMax: 99,
    heightMin: 145,
    heightMax: 165,
    inseamMin: 70,
    inseamMax: 78,
    note: {
      ar: 'أول مقاس «كبار». مناسب للمراهقين والسيدات قصيري القامة.',
      en: 'The first adult size — suits teenagers and shorter adult riders.',
    },
  },
];

/** شاسيه الكبار — دراجات جبلية وهجين (المقاس بالبوصة). */
export const ADULT_MTB_SIZES = [
  { heightMin: 148, heightMax: 158, frameIn: '13–14', label: 'XS', wheel: 26 },
  { heightMin: 158, heightMax: 168, frameIn: '15–16', label: 'S', wheel: 26 },
  { heightMin: 168, heightMax: 178, frameIn: '17–18', label: 'M', wheel: 27.5 },
  { heightMin: 178, heightMax: 185, frameIn: '19–20', label: 'L', wheel: 29 },
  { heightMin: 185, heightMax: 195, frameIn: '21–22', label: 'XL', wheel: 29 },
  { heightMin: 195, heightMax: 210, frameIn: '23+', label: 'XXL', wheel: 29 },
];

/** شاسيه دراجات الطريق/السباق (المقاس بالسنتيمتر). */
export const ROAD_SIZES = [
  { heightMin: 150, heightMax: 160, frameCm: '47–50', label: 'XS' },
  { heightMin: 160, heightMax: 168, frameCm: '51–53', label: 'S' },
  { heightMin: 168, heightMax: 175, frameCm: '54–55', label: 'M' },
  { heightMin: 175, heightMax: 183, frameCm: '56–58', label: 'L' },
  { heightMin: 183, heightMax: 190, frameCm: '58–60', label: 'XL' },
  { heightMin: 190, heightMax: 210, frameCm: '61–63', label: 'XXL' },
];

/** مقاسات الجنوط والإطارات بمعيار ETRTO/ISO (القطر الداخلي بالمليمتر). */
export const ETRTO_TABLE = [
  { inch: 12, iso: 203, common: '12½ × 2¼', use: { ar: 'دراجات أطفال ٢–٤ سنوات', en: 'Kids 2–4 years' } },
  { inch: 14, iso: 254, common: '14 × 1.75', use: { ar: 'دراجات أطفال ٣–٥ سنوات', en: 'Kids 3–5 years' } },
  { inch: 16, iso: 305, common: '16 × 1.75', use: { ar: 'دراجات أطفال ٤–٦ سنوات', en: 'Kids 4–6 years' } },
  { inch: 18, iso: 355, common: '18 × 1.75', use: { ar: 'دراجات أطفال ٥–٧ سنوات', en: 'Kids 5–7 years' } },
  { inch: 20, iso: 406, common: '20 × 1.95', use: { ar: 'أطفال ٦–٩ سنوات و BMX والدراجات القابلة للطي', en: 'Kids 6–9, BMX and folding bikes' } },
  { inch: 24, iso: 507, common: '24 × 1.95', use: { ar: 'أطفال ٨–١٢ سنة', en: 'Kids 8–12 years' } },
  { inch: 26, iso: 559, common: '26 × 1.95', use: { ar: 'الجبلي الكلاسيكي والهجين — الأكثر انتشارًا في مصر', en: 'Classic mountain and hybrid — the most common size in Egypt' } },
  { inch: 27.5, iso: 584, common: '27.5 × 2.10', use: { ar: 'الجبلي الحديث (يُعرف أيضًا بـ 650B)', en: 'Modern mountain bikes (also called 650B)' } },
  { inch: 29, iso: 622, common: '29 × 2.20', use: { ar: 'الجبلي للمسافات الطويلة — نفس قطر 700C', en: 'Long-distance mountain bikes — same diameter as 700C' } },
  { inch: '700C', iso: 622, common: '700 × 25 / 700 × 35', use: { ar: 'دراجات الطريق والهجين السريع', en: 'Road and fast hybrid bikes' } },
];

/** ضغط الهواء المناسب (PSI) — أقل ضغط = تماسك أكتر، أعلى ضغط = سرعة أكتر. */
export const TYRE_PRESSURE = [
  { type: { ar: 'دراجات أطفال ١٢–١٦ بوصة', en: 'Kids 12–16 inch' }, psi: '25–40', bar: '1.7–2.8' },
  { type: { ar: 'دراجات أطفال ٢٠–٢٤ بوصة', en: 'Kids 20–24 inch' }, psi: '30–50', bar: '2.1–3.4' },
  { type: { ar: 'جبلي بإطار عريض (2.0"+)', en: 'Mountain, wide tyre (2.0"+)' }, psi: '28–40', bar: '1.9–2.8' },
  { type: { ar: 'هجين (35–42 مم)', en: 'Hybrid (35–42 mm)' }, psi: '50–70', bar: '3.4–4.8' },
  { type: { ar: 'طريق (23–28 مم)', en: 'Road (23–28 mm)' }, psi: '80–110', bar: '5.5–7.6' },
  { type: { ar: 'BMX (20 بوصة)', en: 'BMX (20 inch)' }, psi: '40–70', bar: '2.8–4.8' },
];

/** الخلوص فوق الشاسيه (Standover) — المسافة اللي المفروض تكون بين جسمك والماسورة وأنت واقف. */
export const STANDOVER_CLEARANCE = [
  { type: { ar: 'دراجة طريق', en: 'Road bike' }, cm: '2–3' },
  { type: { ar: 'دراجة هجين', en: 'Hybrid bike' }, cm: '2–5' },
  { type: { ar: 'دراجة جبلية', en: 'Mountain bike' }, cm: '5–10' },
  { type: { ar: 'دراجة أطفال', en: 'Kids bike' }, cm: '3–5' },
];

/* -------------------------------------------------------------------------- */
/*  منطق الحاسبة                                                              */
/* -------------------------------------------------------------------------- */

/**
 * تقدير طول الرجل الداخلي من الطول الكلي لو المستخدم ما قاسوش.
 * النسبة المتعارف عليها ≈ ٤٥٪ من الطول الكلي للبالغين، و ٤٤٪ للأطفال.
 */
export function estimateInseam(heightCm, isChild = false) {
  return Math.round(heightCm * (isChild ? 0.44 : 0.45));
}

/**
 * ارتفاع الكرسي من مركز البدال لأعلى السرج — معادلة LeMond الشهيرة.
 * saddle height = inseam × 0.883
 */
export function saddleHeight(inseamCm) {
  return Math.round(inseamCm * 0.883 * 10) / 10;
}

/** مقاس شاسيه الجبلي تقريبيًا بالبوصة: inseam(cm) × 0.226 */
export function mtbFrameFromInseam(inseamCm) {
  return Math.round(inseamCm * 0.226 * 10) / 10;
}

/** مقاس شاسيه دراجة الطريق تقريبيًا بالسنتيمتر: inseam(cm) × 0.665 */
export function roadFrameFromInseam(inseamCm) {
  return Math.round(inseamCm * 0.665);
}

/**
 * الحاسبة الرئيسية.
 * @param {{heightCm:number, ageYears?:number, inseamCm?:number, bikeType?:'mtb'|'hybrid'|'road'|'kids'}} input
 */
export function recommendSize({ heightCm, ageYears, inseamCm, bikeType = 'hybrid' }) {
  const height = Number(heightCm);
  if (!height || height < 70 || height > 220) return null;

  const treatAsChild = bikeType === 'kids' || height < 145 || (ageYears != null && ageYears < 12);
  const inseam = Number(inseamCm) || estimateInseam(height, treatAsChild);

  if (treatAsChild) {
    // pick by height first; fall back to the closest band if the height sits outside all ranges
    const row =
      KIDS_SIZES.find((r) => height >= r.heightMin && height <= r.heightMax) ||
      (height < KIDS_SIZES[0].heightMin ? KIDS_SIZES[0] : KIDS_SIZES[KIDS_SIZES.length - 1]);
    return {
      kind: 'kids',
      wheel: row.wheel,
      wheelLabel: `${row.wheel}"`,
      frameLabel: null,
      ageRange: [row.ageMin, row.ageMax],
      heightRange: [row.heightMin, row.heightMax],
      inseam,
      saddle: saddleHeight(inseam),
      note: row.note,
      matchWheelSizes: [row.wheel],
    };
  }

  if (bikeType === 'road') {
    const row =
      ROAD_SIZES.find((r) => height >= r.heightMin && height <= r.heightMax) ||
      ROAD_SIZES[ROAD_SIZES.length - 1];
    return {
      kind: 'road',
      wheel: '700C',
      wheelLabel: '700C (29")',
      frameLabel: `${row.frameCm} ${row.label ? `(${row.label})` : ''}`.trim(),
      frameCm: row.frameCm,
      sizeLabel: row.label,
      heightRange: [row.heightMin, row.heightMax],
      inseam,
      saddle: saddleHeight(inseam),
      computedFrame: roadFrameFromInseam(inseam),
      matchWheelSizes: [29, '700C'],
    };
  }

  const row =
    ADULT_MTB_SIZES.find((r) => height >= r.heightMin && height <= r.heightMax) ||
    ADULT_MTB_SIZES[ADULT_MTB_SIZES.length - 1];
  return {
    kind: bikeType === 'mtb' ? 'mtb' : 'hybrid',
    wheel: row.wheel,
    wheelLabel: `${row.wheel}"`,
    frameLabel: `${row.frameIn}" (${row.label})`,
    frameIn: row.frameIn,
    sizeLabel: row.label,
    heightRange: [row.heightMin, row.heightMax],
    inseam,
    saddle: saddleHeight(inseam),
    computedFrame: mtbFrameFromInseam(inseam),
    // riders can comfortably use one wheel size either side of the ideal
    matchWheelSizes: [26, 27.5, 29].filter((w) => Math.abs(w - row.wheel) <= 1.5),
  };
}

export default {
  KIDS_SIZES,
  ADULT_MTB_SIZES,
  ROAD_SIZES,
  ETRTO_TABLE,
  TYRE_PRESSURE,
  STANDOVER_CLEARANCE,
  recommendSize,
};
