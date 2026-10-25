/* ============================================================================
 *  مراكز ومدن محافظة الشرقية — بيانات صفحات الـ Local SEO
 *  Al Sharqia governorate districts & cities — local SEO landing page data
 * ============================================================================
 *  ⚠️ TODO للعميل:
 *  - `distanceKm` مسافات تقريبية من الزقازيق — راجعها لو حابب.
 *  - `areas` قوائم القرى والمناطق التابعة — دي أهم حاجة للـ SEO المحلي.
 *    ضيف عليها كل القرى اللي بتوصّل لها فعليًا (كل قرية = كلمة بحث إضافية).
 * ========================================================================== */

import { SITE } from '../config/site.js';

export const GOVERNORATE = {
  slug: 'sharqia',
  name: { ar: 'محافظة الشرقية', en: 'Al Sharqia Governorate' },
  nameShort: { ar: 'الشرقية', en: 'Sharqia' },
  capital: { ar: 'الزقازيق', en: 'Zagazig' },
  country: { ar: 'مصر', en: 'Egypt' },
};

/** @typedef {{slug:string,name:{ar:string,en:string},type:'city'|'markaz',distanceKm:number,etaDays:string,geo:{lat:number,lng:number},areas:{ar:string[],en:string[]},blurb:{ar:string,en:string}}} Location */

/** @type {Location[]} */
const LOCATION_DRAFTS = [
  {
    slug: 'zagazig',
    name: { ar: 'الزقازيق', en: 'Zagazig' },
    type: 'city',
    isCapital: true,
    distanceKm: 0,
    etaDays: { ar: 'نفس اليوم أو اليوم التالي', en: 'Same day or next day' },
    geo: { lat: 30.5877, lng: 31.502 },
    areas: {
      ar: ['حي الزهور', 'حي القومية', 'شارع النقراشي', 'السكة الجديدة', 'كفر الحصافة', 'نوسا الغيط', 'بني عامر', 'الزنكلون', 'تل بسطة', 'الخطارة', 'بردين', 'الشوبك'],
      en: ['El Zohour', 'El Qawmeya', 'El Nokrashy St.', 'El Sekka El Gedida', 'Kafr El Hosafa', 'Nosa El Gheit', 'Bani Amer', 'Zankalon', 'Tell Basta', 'El Khattara', 'Bardin', 'El Shobak'],
    },
    blurb: {
      ar: 'عاصمة محافظة الشرقية ومقر معرض مودي بايك. التوصيل داخل الزقازيق أسرع ما يكون، والاستلام من المعرض متاح في أي وقت خلال مواعيد العمل.',
      en: 'The capital of Al Sharqia and home to the ModyBike showroom. Delivery inside Zagazig is the fastest we offer, and showroom pickup is available any time during opening hours.',
    },
  },
  {
    slug: 'belbeis',
    name: { ar: 'بلبيس', en: 'Belbeis' },
    type: 'markaz',
    distanceKm: 35,
    etaDays: { ar: 'من ١ إلى ٢ يوم', en: '1–2 days' },
    geo: { lat: 30.4199, lng: 31.5644 },
    areas: {
      ar: ['مدينة بلبيس', 'العدوة', 'الرحمانية', 'تل روك', 'صفط الحنا', 'الشوبك الشرقي', 'قرية الغنايم'],
      en: ['Belbeis city', 'El Adwa', 'El Rahmaneya', 'Tell Rak', 'Saft El Henna', 'El Shobak El Sharqi', 'El Ghanayem'],
    },
    blurb: {
      ar: 'بلبيس من أكبر مراكز الشرقية وأكترها حركة، وبنوصّل لها دراجات الأطفال والكبار بشكل شبه يومي.',
      en: 'Belbeis is one of Sharqia’s largest and busiest districts — we deliver kids and adult bikes there almost daily.',
    },
  },
  {
    slug: 'minya-al-qamh',
    name: { ar: 'منيا القمح', en: 'Minya Al Qamh' },
    type: 'markaz',
    distanceKm: 20,
    etaDays: { ar: 'من ١ إلى ٢ يوم', en: '1–2 days' },
    geo: { lat: 30.4636, lng: 31.3333 },
    areas: {
      ar: ['مدينة منيا القمح', 'شيبة النكارية', 'صفط زريق', 'ميت يزيد', 'سنهوت', 'شنبارة الميمونة', 'كفر أيوب'],
      en: ['Minya Al Qamh city', 'Sheiba El Nekarya', 'Saft Zoreiq', 'Mit Yazid', 'Sanhout', 'Shanbara El Maymouna', 'Kafr Ayoub'],
    },
    blurb: {
      ar: 'منيا القمح قريبة من الزقازيق وبنغطيها بالكامل هي وقراها، والتوصيل غالبًا بيوصل في يوم واحد.',
      en: 'Minya Al Qamh is close to Zagazig and we cover it and its villages fully — delivery usually arrives within a single day.',
    },
  },
  {
    slug: 'abu-hammad',
    name: { ar: 'أبو حماد', en: 'Abu Hammad' },
    type: 'markaz',
    distanceKm: 18,
    etaDays: { ar: 'من ١ إلى ٢ يوم', en: '1–2 days' },
    geo: { lat: 30.5333, lng: 31.6667 },
    areas: {
      ar: ['مدينة أبو حماد', 'كفر أبو الحسن', 'الصوة', 'العزيزية', 'الحصص', 'كفر البهنسي'],
      en: ['Abu Hammad city', 'Kafr Abu El Hassan', 'El Sawa', 'El Azizeya', 'El Hesas', 'Kafr El Bahnasy'],
    },
    blurb: {
      ar: 'أبو حماد من أقرب المراكز لمعرضنا في الزقازيق، وده بيخلي التوصيل سريع والمصاريف أقل.',
      en: 'Abu Hammad is one of the closest districts to our Zagazig showroom, which keeps delivery fast and the fee low.',
    },
  },
  {
    slug: 'hehia',
    name: { ar: 'ههيا', en: 'Hehia' },
    type: 'markaz',
    distanceKm: 15,
    etaDays: { ar: 'من ١ إلى ٢ يوم', en: '1–2 days' },
    geo: { lat: 30.6667, lng: 31.6 },
    areas: {
      ar: ['مدينة ههيا', 'غزالة', 'كفر الحمام', 'الصوفية', 'منشأة أبو عمرو', 'العصلوجي'],
      en: ['Hehia city', 'Ghazala', 'Kafr El Hammam', 'El Sofeya', 'Menshat Abu Amr', 'El Aslougy'],
    },
    blurb: {
      ar: 'ههيا قريبة جدًا من الزقازيق، وعملاؤنا هناك بيفضّلوا الدراجات الهجين ودراجات الأطفال.',
      en: 'Hehia sits very close to Zagazig; customers there mostly go for hybrid bikes and kids bikes.',
    },
  },
  {
    slug: 'abu-kabir',
    name: { ar: 'أبو كبير', en: 'Abu Kabir' },
    type: 'markaz',
    distanceKm: 25,
    etaDays: { ar: 'من ١ إلى ٢ يوم', en: '1–2 days' },
    geo: { lat: 30.7286, lng: 31.6706 },
    areas: {
      ar: ['مدينة أبو كبير', 'هربيط', 'سماكين الشرق', 'كفر الأشراف', 'الديدامون', 'منشأة الغنيمي'],
      en: ['Abu Kabir city', 'Horbeit', 'Samakin El Sharq', 'Kafr El Ashraf', 'El Didamoun', 'Menshat El Ghoneimy'],
    },
    blurb: {
      ar: 'أبو كبير مركز كبير وحيوي، وبنوصّل لكل قراه — الطلب على الدراجات الجبلية هناك عالي.',
      en: 'Abu Kabir is a large, busy district and we deliver to all of its villages — mountain bikes are especially popular there.',
    },
  },
  {
    slug: 'faqous',
    name: { ar: 'فاقوس', en: 'Faqous' },
    type: 'markaz',
    distanceKm: 35,
    etaDays: { ar: 'من ١ إلى ٣ أيام', en: '1–3 days' },
    geo: { lat: 30.7286, lng: 31.7969 },
    areas: {
      ar: ['مدينة فاقوس', 'كفور نجم', 'الزوامل', 'الحمادين', 'أبو الأخضر', 'الصالحية القديمة'],
      en: ['Faqous city', 'Kofour Negm', 'El Zawamel', 'El Hamadin', 'Abu El Akhdar', 'El Salheya El Qadima'],
    },
    blurb: {
      ar: 'فاقوس من المراكز الكبيرة في شرق المحافظة، والتوصيل لها منتظم مرتين أسبوعيًا على الأقل.',
      en: 'Faqous is a major district in the east of the governorate, with deliveries running at least twice a week.',
    },
  },
  {
    slug: 'el-husseiniya',
    name: { ar: 'الحسينية', en: 'El Husseiniya' },
    type: 'markaz',
    distanceKm: 45,
    etaDays: { ar: 'من ٢ إلى ٣ أيام', en: '2–3 days' },
    geo: { lat: 30.8608, lng: 31.9167 },
    areas: {
      ar: ['مدينة الحسينية', 'الشعراء', 'الجعفرية', 'قرين البحرية', 'أبو شلبي'],
      en: ['El Husseiniya city', 'El Shoaraa', 'El Gaafareya', 'Qorein El Bahareya', 'Abu Shalaby'],
    },
    blurb: {
      ar: 'بنغطي الحسينية وقراها بالكامل، والشحن بيتجمّع فيها مع مشاوير فاقوس وصان الحجر.',
      en: 'We cover El Husseiniya and its villages in full; shipments are grouped with the Faqous and San El Hagar runs.',
    },
  },
  {
    slug: 'kafr-saqr',
    name: { ar: 'كفر صقر', en: 'Kafr Saqr' },
    type: 'markaz',
    distanceKm: 35,
    etaDays: { ar: 'من ١ إلى ٣ أيام', en: '1–3 days' },
    geo: { lat: 30.7936, lng: 31.6231 },
    areas: {
      ar: ['مدينة كفر صقر', 'بني هلال', 'كفر الشيخ سليم', 'العصايد', 'شبرا النخلة'],
      en: ['Kafr Saqr city', 'Bani Helal', 'Kafr El Sheikh Selim', 'El Asayed', 'Shobra El Nakhla'],
    },
    blurb: {
      ar: 'كفر صقر من المراكز اللي بيزيد فيها الطلب على دراجات الأطفال قبل المواسم والأعياد.',
      en: 'Kafr Saqr sees a clear spike in kids-bike demand before holidays and school seasons.',
    },
  },
  {
    slug: 'awlad-saqr',
    name: { ar: 'أولاد صقر', en: 'Awlad Saqr' },
    type: 'markaz',
    distanceKm: 45,
    etaDays: { ar: 'من ٢ إلى ٣ أيام', en: '2–3 days' },
    geo: { lat: 30.8667, lng: 31.7333 },
    areas: {
      ar: ['مدينة أولاد صقر', 'ميت أبو علي', 'كفر الحاج داود', 'الصفا'],
      en: ['Awlad Saqr city', 'Mit Abu Ali', 'Kafr El Hag Dawoud', 'El Safa'],
    },
    blurb: {
      ar: 'أولاد صقر في شمال المحافظة، وبنوصّلها ضمن خط الحسينية وكفر صقر.',
      en: 'Awlad Saqr lies in the north of the governorate and is served on the Husseiniya–Kafr Saqr route.',
    },
  },
  {
    slug: 'el-ibrahimiya',
    name: { ar: 'الإبراهيمية', en: 'El Ibrahimiya' },
    type: 'markaz',
    distanceKm: 25,
    etaDays: { ar: 'من ١ إلى ٢ يوم', en: '1–2 days' },
    geo: { lat: 30.6, lng: 31.75 },
    areas: {
      ar: ['مدينة الإبراهيمية', 'العزيزية', 'كفر نجم', 'ميت حمل'],
      en: ['El Ibrahimiya city', 'El Azizeya', 'Kafr Negm', 'Mit Haml'],
    },
    blurb: {
      ar: 'الإبراهيمية مركز هادي وقريب، والتوصيل لها غالبًا بيتم في نفس يوم التأكيد أو اللي بعده.',
      en: 'El Ibrahimiya is a quiet, nearby district — delivery usually happens the same day or the next.',
    },
  },
  {
    slug: 'deyerb-negm',
    name: { ar: 'ديرب نجم', en: 'Deyerb Negm' },
    type: 'markaz',
    distanceKm: 25,
    etaDays: { ar: 'من ١ إلى ٢ يوم', en: '1–2 days' },
    geo: { lat: 30.8, lng: 31.5333 },
    areas: {
      ar: ['مدينة ديرب نجم', 'كفر أبو زيد', 'الروضة', 'ميت سهيل'],
      en: ['Deyerb Negm city', 'Kafr Abu Zeid', 'El Rawda', 'Mit Soheil'],
    },
    blurb: {
      ar: 'ديرب نجم من المراكز اللي بنخدمها بانتظام، والتوصيل لها ولقراها متاح بنفس المصاريف.',
      en: 'Deyerb Negm is served regularly, and its villages are delivered to at the same fee.',
    },
  },
  {
    slug: 'mashtoul-el-souk',
    name: { ar: 'مشتول السوق', en: 'Mashtoul El Souk' },
    type: 'markaz',
    distanceKm: 30,
    etaDays: { ar: 'من ١ إلى ٣ أيام', en: '1–3 days' },
    geo: { lat: 30.4333, lng: 31.4 },
    areas: {
      ar: ['مدينة مشتول السوق', 'العزازي', 'كفر شلشلمون', 'ميت الحارون'],
      en: ['Mashtoul El Souk city', 'El Azazy', 'Kafr Shalshalmoun', 'Mit El Haroun'],
    },
    blurb: {
      ar: 'مشتول السوق في جنوب غرب المحافظة، وبتوصلها الشحنات مع خط بلبيس ومنيا القمح.',
      en: 'Mashtoul El Souk is in the south-west and is served alongside the Belbeis and Minya Al Qamh route.',
    },
  },
  {
    slug: 'el-qanayat',
    name: { ar: 'القنايات', en: 'El Qanayat' },
    type: 'markaz',
    distanceKm: 10,
    etaDays: { ar: 'نفس اليوم أو اليوم التالي', en: 'Same day or next day' },
    geo: { lat: 30.5333, lng: 31.4333 },
    areas: {
      ar: ['مدينة القنايات', 'كفر أبو نجم', 'الأحراز', 'السعديين'],
      en: ['El Qanayat city', 'Kafr Abu Negm', 'El Ahraz', 'El Saadyin'],
    },
    blurb: {
      ar: 'القنايات ملاصقة للزقازيق تقريبًا، فبنعاملها معاملة الزقازيق في السرعة والمصاريف.',
      en: 'El Qanayat sits almost next to Zagazig, so we treat it like Zagazig for speed and fees.',
    },
  },
  {
    slug: 'el-qurein',
    name: { ar: 'القرين', en: 'El Qurein' },
    type: 'markaz',
    distanceKm: 25,
    etaDays: { ar: 'من ١ إلى ٢ يوم', en: '1–2 days' },
    geo: { lat: 30.6167, lng: 31.7333 },
    areas: {
      ar: ['مدينة القرين', 'المحمدية', 'كفر الشناوي', 'أبو حريز'],
      en: ['El Qurein city', 'El Mohammadeya', 'Kafr El Shennawy', 'Abu Hariz'],
    },
    blurb: {
      ar: 'القرين مركز نشط وبنوصّله دراجات الكبار والهجين أكتر من غيرها.',
      en: 'El Qurein is an active district where adult and hybrid bikes are the most requested.',
    },
  },
  {
    slug: 'new-salhia',
    name: { ar: 'الصالحية الجديدة', en: 'New Salhia' },
    type: 'markaz',
    distanceKm: 60,
    etaDays: { ar: 'من ٢ إلى ٣ أيام', en: '2–3 days' },
    geo: { lat: 30.6167, lng: 31.9833 },
    areas: {
      ar: ['مدينة الصالحية الجديدة', 'المنايف', 'الصالحية القديمة', 'قرى الإصلاح الزراعي'],
      en: ['New Salhia city', 'El Manayef', 'Old Salhia', 'Agrarian reform villages'],
    },
    blurb: {
      ar: 'الصالحية الجديدة في أقصى شرق المحافظة، وبنجدول التوصيل لها مرة أو مرتين أسبوعيًا.',
      en: 'New Salhia is at the far east of the governorate; we schedule deliveries there once or twice a week.',
    },
  },
  {
    slug: 'menshat-abu-omar',
    name: { ar: 'منشأة أبو عمر', en: 'Menshat Abu Omar' },
    type: 'markaz',
    distanceKm: 65,
    etaDays: { ar: 'من ٢ إلى ٣ أيام', en: '2–3 days' },
    geo: { lat: 30.7833, lng: 31.95 },
    areas: {
      ar: ['مدينة منشأة أبو عمر', 'قرى الاستصلاح', 'الحسينية الشرقية'],
      en: ['Menshat Abu Omar city', 'Reclamation villages', 'East Husseiniya'],
    },
    blurb: {
      ar: 'بنغطي منشأة أبو عمر ضمن خط الصالحية والحسينية، مع إمكانية تجميع أكتر من طلب.',
      en: 'Menshat Abu Omar is covered on the Salhia–Husseiniya route, and orders can be grouped together.',
    },
  },
  {
    slug: 'san-el-hagar',
    name: { ar: 'صان الحجر', en: 'San El Hagar' },
    type: 'markaz',
    distanceKm: 55,
    etaDays: { ar: 'من ٢ إلى ٣ أيام', en: '2–3 days' },
    geo: { lat: 30.9667, lng: 31.8833 },
    areas: {
      ar: ['صان الحجر القبلية', 'الحسينية الشمالية', 'قرى الشمال'],
      en: ['San El Hagar El Qibleya', 'North Husseiniya', 'Northern villages'],
    },
    blurb: {
      ar: 'صان الحجر في أقصى شمال المحافظة، والتوصيل لها بيتم ضمن خط الحسينية.',
      en: 'San El Hagar is at the far north of the governorate and is served on the Husseiniya route.',
    },
  },
  {
    slug: '10th-of-ramadan',
    name: { ar: 'العاشر من رمضان', en: '10th of Ramadan City' },
    type: 'city',
    distanceKm: 60,
    etaDays: { ar: 'من ١ إلى ٣ أيام', en: '1–3 days' },
    geo: { lat: 30.2887, lng: 31.7422 },
    areas: {
      ar: ['الحي الأول', 'الحي الثاني', 'الحي الثالث', 'الحي الرابع', 'المنطقة الصناعية', 'الإسكان الاجتماعي'],
      en: ['1st District', '2nd District', '3rd District', '4th District', 'Industrial zone', 'Social housing'],
    },
    blurb: {
      ar: 'مدينة العاشر من رمضان تابعة لمحافظة الشرقية، وبنوصّل لكل أحيائها ومناطقها الصناعية.',
      en: '10th of Ramadan City belongs to Al Sharqia; we deliver to all of its districts and industrial zones.',
    },
  },
];

// Distances in the drafts were measured from Zagazig, so they are not shown.
export const LOCATIONS = LOCATION_DRAFTS.map((location) => ({
  ...location,
  distanceKm: null,
  etaDays: SITE.shipping.etaDays,
  blurb: {
    ar: `عجل ودراجات أطفال وكبار في ${location.name.ar}. اطلب على واتساب ونوصّل لحد البيت في ${location.name.ar} و${location.areas.ar.filter((a) => !a.includes(location.name.ar)).slice(0, 3).join(' و')}.`,
    en: `Kids and adult bikes in ${location.name.en}. Order on WhatsApp for delivery to your door in ${location.name.en}, ${location.areas.en.filter((a) => !a.includes(location.name.en)).slice(0, 3).join(', ')} and nearby.`,
  },
}));

export function getLocation(slug) {
  return LOCATIONS.find((l) => l.slug === slug) || null;
}

/** Flat list of every area name — used for the "we cover" long-tail block and for search. */
export function allAreaNames(lang = 'ar') {
  return LOCATIONS.flatMap((l) => [l.name[lang], ...(l.areas[lang] || [])]);
}

/** Options for the checkout city <select>. */
export function cityOptions(lang = 'ar') {
  return LOCATIONS.map((l) => ({ value: l.slug, label: l.name[lang] }));
}

export default LOCATIONS;
