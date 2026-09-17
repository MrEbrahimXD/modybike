import { SITE } from '../config/site.js';

export const FAQ_GROUPS = [
  { id: 'shopping', title: { ar: 'الأقسام والاختيار', en: 'Collections and choosing' }, items: [
    { q: { ar: 'إيه الأقسام العمرية في مودي بايك؟', en: 'What age groups can I shop?' }, a: { ar: 'من ٣ إلى ٥ سنين، ومن ٥ إلى ٨، ومن ٧ إلى ١٠، ومن ٨ إلى ١٢، ومن ١٢ سنة فأكثر. الفئات متداخلة لتسهيل التصفح؛ الطول والمقاس وتعليمات الموديل بتحدد الاختيار النهائي.', en: 'Ages 3–5, 5–8, 7–10, 8–12 and 12+. These overlapping groups help with browsing; height, fit and model guidance determine the final choice.' } },
    { q: { ar: 'بتبيعوا إيه غير الدراجات؟', en: 'What can I find besides bicycles?' }, a: { ar: 'الأقسام تشمل السكوتر وعربيات الأطفال ومشايات الأطفال. تواصل معنا لمعرفة الموديلات المتاحة والصور والأسعار الحالية.', en: 'Our categories also include scooters, children’s ride-on cars and baby walkers. Contact us for currently available models, photos and prices.' } },
    { q: { ar: 'هل العمر لوحده كفاية لاختيار العجلة؟', en: 'Is age enough to choose a bike?' }, a: { ar: 'لا، الطول والقدرة على التحكم في الدراجة مهمين. ابعت لنا عمر الطفل وطوله، واستخدم دليل المقاسات كبداية، وجرب المقاس المناسب قبل الشراء.', en: 'Height and the ability to control the bike matter too. Share the rider’s age and height, use the size guide as a starting point and check the fit before purchasing.' } },
  ] },
  { id: 'contact', title: { ar: 'التواصل والزيارة', en: 'Contact and visits' }, items: [
    { q: { ar: 'إزاي أتواصل مع مودي بايك؟', en: 'How do I contact ModyBike?' }, a: { ar: `واتساب ${SITE.contact.whatsappDisplay}، وللاتصال ${SITE.contact.phones[0]}. المعرض في أبو كبير، محافظة الشرقية. اطلب اللوكيشن مننا قبل الزيارة.`, en: `WhatsApp ${SITE.contact.whatsappDisplay}, or call ${SITE.contact.phones[0]}. The showroom is in Abu Kabir, Al Sharqia. Ask us for directions before visiting.` } },
    { q: { ar: 'مواعيد العمل إيه؟', en: 'What are the opening hours?' }, a: { ar: 'من ١١ صباحًا إلى ١١ مساءً. تواصل معنا لتأكيد المواعيد في الإجازات.', en: '11 am to 11 pm. Contact us to confirm holiday hours.' } },
    { q: { ar: 'إزاي أأكد سعر وتوفر منتج؟', en: 'How do I confirm a product’s price and availability?' }, a: { ar: 'ابعت لنا اسم القسم وعمر وطول المستخدم على واتساب، وهنأكد معاك الصور والمواصفات والسعر والتوفر قبل إتمام الطلب. الموديلات والأسعار التوضيحية على النسخة الحالية ليست كتالوجًا مؤكدًا للمعرض.', en: 'Send the category and the rider’s age and height on WhatsApp. We will confirm photos, specifications, price and availability before ordering. Illustrative products and prices in this preview are not confirmed shop inventory.' } },
  ] },
  { id: 'shipping', title: { ar: 'التوصيل والضمان', en: 'Delivery and warranty' }, items: [
    { q: { ar: 'مصاريف التوصيل كام؟', en: 'How much is delivery?' }, a: { ar: 'التوصيل مجاني داخل مركز أبو كبير، و١٥٠ جنيه لأي مركز آخر في محافظة الشرقية. بنأكد العنوان وموعد التسليم معاك قبل الطلب.', en: 'Delivery is free within Abu Kabir district and EGP 150 to other Al Sharqia districts. We confirm your address and delivery timing before ordering.' } },
    { q: { ar: 'إيه شروط الضمان؟', en: 'What are the warranty terms?' }, a: SITE.warranty.note },
  ] },
];
export const ALL_FAQS = FAQ_GROUPS.flatMap((group) => group.items);
export const TOP_FAQS = ALL_FAQS.slice(0, 6);
export default FAQ_GROUPS;
