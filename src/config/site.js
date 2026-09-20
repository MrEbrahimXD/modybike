/* ============================================================================
 *  ModyBike — ملف الإعدادات الرئيسي  |  Main site configuration
 * ============================================================================
 *  كل القيم المعلّمة بـ  TODO  هي بيانات مؤقتة (Placeholder) لازم العميل يغيّرها.
 *  Every value marked with TODO is placeholder data the client must replace.
 *  غيّر القيم هنا فقط — باقي الموقع بيقرأ منها أوتوماتيك.
 * ========================================================================== */

const siteUrl = (import.meta.env?.VITE_SITE_URL || 'http://localhost:5173').replace(/\/+$/, '');

export const SITE = {
  /** اسم البراند كما يظهر في كل مكان */
  name: { ar: 'مودي بايك', en: 'ModyBike' },
  legalName: { ar: 'مودي بايك لتجارة الدراجات', en: 'ModyBike Cycles' },

  /** TODO: غيّرها للدومين النهائي — بدون / في الآخر */
  baseUrl: siteUrl,

  /** TODO: لو الموقع على GitHub Pages في مجلد فرعي، خليها '/modybike' وغيّر base في vite.config.js */
  basePath: new URL(siteUrl).pathname.replace(/\/+$/, ''),

  tagline: {
    ar: 'دراجات أطفال وشباب وكبار — من ١٢ لـ ٢٦ بوصة',
    en: 'Bikes for children, teens and adults — 12 to 26 inch',
  },

  description: {
    ar: 'مودي بايك للدراجات ولعب الأطفال. دراجات بمقاسات ١٢ و١٦ و٢٠ و٢٤ و٢٦ بوصة بأسعار معلنة — اختار حسب العمر: ٣–٥، ٥–٨، ٧–١٠، ٨–١٢، و١٢ سنة فأكثر، وتواصل معنا لمعرفة المتاح.',
    en: 'ModyBike for bicycles and children’s toys. Bikes in 12, 16, 20, 24 and 26 inch with prices listed — shop by age: 3–5, 5–8, 7–10, 8–12 and 12+. Contact us to check what is in stock.',
  },

  /* ---------------------------------------------------------------- CONTACT */
  contact: {
    email: '', // Handwritten email needs confirmation before publication.
    /** TODO: رقم الواتساب بالصيغة الدولية بدون + وبدون مسافات. مثال مصر: 201012345678 */
    whatsapp: '201102637511',
    whatsappDisplay: '01102637511',
    /** TODO: أرقام التليفون للعرض والاتصال */
    phones: ['01015120515'],
    /** TODO: الأرقام الأرضية إن وُجدت */
    landline: '',
  },

  /* --------------------------------------------------------------- LOCATION */
  address: {
    /** TODO: عنوان المعرض بالتفصيل */
    street: { ar: 'تواصل معنا لوصف موقع المعرض', en: 'Contact us for directions to the showroom' },
    district: { ar: 'أبو كبير', en: 'Abu Kabir' },
    city: { ar: 'أبو كبير', en: 'Abu Kabir' },
    streetVerified: false,
    region: { ar: 'محافظة الشرقية', en: 'Al Sharqia Governorate' },
    country: { ar: 'مصر', en: 'Egypt' },
    countryCode: 'EG',
    /** TODO: الرقم البريدي */
    postalCode: '',
    /** TODO: إحداثيات المعرض من خرائط جوجل (اضغط على المكان → انسخ الإحداثيات) */
    geo: null,
    /** TODO: لينك الموقع على خرائط جوجل */
    mapsUrl: 'https://wa.me/201102637511?text=' + encodeURIComponent('أريد لوكيشن معرض مودي بايك في أبو كبير'),
    /** TODO: لينك embed للخريطة (Google Maps → Share → Embed a map) */
    mapsEmbedUrl: '',
  },

  /** TODO: مواعيد العمل الحقيقية. الصيغة: [يوم البداية, يوم النهاية, من, إلى] */
  openingHours: [
    { days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '11:00', closes: '23:00' },
  ],

  /* ---------------------------------------------------------------- SOCIAL */
  social: {
    /** TODO: لينكات السوشيال — سيب الفاضي '' لو مفيش */
    facebook: 'https://www.facebook.com/share/14roaEaozXa/',
    instagram: '',
    tiktok: '',
    youtube: '',
    x: '',
  },

  /* ------------------------------------------------------------- COMMERCE */
  currency: {
    code: 'EGP',
    symbol: { ar: 'ج.م', en: 'EGP' },
  },

  /** TODO: سياسة الشحن — القيم دي بتظهر في صفحة الشحن وفي رسالة الواتساب */
  shipping: {
    freeOver: null,
    flatRateAbuKabir: 0,
    flatRateSharqia: 150,
    flatRateOutside: null,
    etaDays: { ar: 'يتم الاتفاق على موعد التوصيل عند تأكيد الطلب', en: 'Delivery timing is agreed when confirming the order' },
  },

  warranty: {
    months: null,
    note: {
      ar: 'اسأل عن شروط الضمان الخاصة بالموديل قبل تأكيد الطلب.',
      en: 'Ask about the model’s warranty terms before confirming your order.',
    },
  },

  /* --------------------------------------------------------------- ANALYTICS */
  /** TODO: كود Google Analytics / Search Console لو موجود */
  analytics: {
    gaMeasurementId: '',
    googleSiteVerification: '',
    facebookDomainVerification: '',
  },

  /** علامة للمحتوى المؤقت — اتقفلت بعد ما وصلت بيانات الدراجات الحقيقية (٢٠ سبتمبر ٢٠٢٦) */
  isPlaceholderContent: false,
};

/** رقم الواتساب جاهز للاستخدام في لينك wa.me */
export const WHATSAPP_LINK = `https://wa.me/${SITE.contact.whatsapp}`;

/** اللغات المدعومة */
export const LOCALES = /** @type {const} */ (['ar', 'en']);
export const DEFAULT_LOCALE = 'ar';

export default SITE;
