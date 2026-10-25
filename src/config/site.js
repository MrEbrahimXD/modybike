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
  /** Other spellings people type into Google — used in structured data only. */
  alternateNames: ['Mody Bike', 'مودى بايك', 'مودي بيك'],
  legalName: { ar: 'مودي بايك لتجارة الدراجات', en: 'ModyBike Cycles' },

  /** TODO: غيّرها للدومين النهائي — بدون / في الآخر */
  baseUrl: siteUrl,

  /** TODO: لو الموقع على GitHub Pages في مجلد فرعي، خليها '/modybike' وغيّر base في vite.config.js */
  basePath: new URL(siteUrl).pathname.replace(/\/+$/, ''),

  tagline: {
    ar: 'عجل ودراجات أطفال وكبار بالأسعار',
    en: 'Kids and adult bikes with prices',
  },

  description: {
    ar: 'مودي بايك: عجل ودراجات أطفال وكبار مقاس 12 و16 و20 و24 و26 بوصة بالأسعار، وعندنا صيانة. اطلب على واتساب والتوصيل لحد البيت.',
    en: 'ModyBike: kids and adult bikes in 12, 16, 20, 24 and 26 inch with prices, plus bike repairs. Order on WhatsApp for delivery to your door.',
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

  /** الشحن — ممنوع كتابة أي سعر توصيل في الموقع. الموعد والتكلفة بيتأكدوا على واتساب. */
  shipping: {
    freeOver: null,
    etaDays: { ar: 'بنتفق على معاد التوصيل على واتساب', en: 'Delivery time is agreed on WhatsApp' },
  },

  warranty: {
    months: null,
    note: {
      ar: 'اسأل عن شروط الضمان الخاصة بالموديل قبل تأكيد الطلب.',
      en: 'Ask about the model’s warranty terms before confirming your order.',
    },
  },

  /* --------------------------------------------------------------- ANALYTICS */
  /**
   * قياس الزيارات — سيبهم فاضيين لحد ما تعمل الحسابات:
   *  gaMeasurementId: من Google Analytics → Admin → Data streams (شكله G-XXXXXXX)
   *  metaPixelId: من Meta Events Manager → Pixel (رقم طويل)
   *  googleSiteVerification: كود التحقق من Search Console (لو مش هتستخدم DNS)
   *  facebookDomainVerification: من Meta Business Settings → Domains
   * كل ضغطة على واتساب أو رقم التليفون بتتسجل كـ lead.
   */
  analytics: {
    gaMeasurementId: '',
    metaPixelId: '',
    googleSiteVerification: '',
    facebookDomainVerification: '',
  },

  /** علامة للمحتوى المؤقت — اتقفلت بعد ما وصلت بيانات الدراجات الحقيقية (٢٠ سبتمبر ٢٠٢٦) */
  isPlaceholderContent: false,
};

/** Router basename. The trailing slash makes the home link "/modybike/" rather
    than "/modybike", which GitHub Pages would answer with a redirect. */
export const ROUTER_BASENAME = SITE.basePath ? `${SITE.basePath}/` : '/';

/** رقم الواتساب جاهز للاستخدام في لينك wa.me */
export const WHATSAPP_LINK = `https://wa.me/${SITE.contact.whatsapp}`;

/** اللغات المدعومة */
export const LOCALES = /** @type {const} */ (['ar', 'en']);
export const DEFAULT_LOCALE = 'ar';

export default SITE;
