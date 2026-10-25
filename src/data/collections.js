// Client-approved age bands intentionally overlap. Height and manufacturer fit
// still determine suitability; an age collection is a browsing aid only.
export const AGE_GROUPS = [
  { slug: 'ages-3-5', min: 3, max: 5, label: { ar: 'من ٣ إلى ٥ سنين', en: 'Ages 3–5' }, description: { ar: 'أول عجلة وأول مغامرة. استكشف اختيارات سن ٣ إلى ٥ سنين، واسألنا عن الدراجة أو السكوتر أو عربية الأطفال المناسبة لطول طفلك وخبرته.', en: 'A first bike and a first adventure. Explore choices for ages 3–5 and ask about bikes, scooters and ride-on cars suited to your child’s height and experience.' } },
  { slug: 'ages-5-8', min: 5, max: 8, label: { ar: 'من ٥ إلى ٨ سنين', en: 'Ages 5–8' }, description: { ar: 'لعب وحركة وثقة أكتر. اختيارات عمر ٥ إلى ٨ سنين، مع مساعدة في اختيار مقاس الدراجة أو السكوتر حسب طول الطفل وقدرته على التحكم.', en: 'More movement and growing confidence. Browse ages 5–8 and get help choosing a bike or scooter based on height and control.' } },
  { slug: 'ages-7-10', min: 7, max: 10, label: { ar: 'من ٧ إلى ١٠ سنين', en: 'Ages 7–10' }, description: { ar: 'للمشاوير الصغيرة واللعب مع الأصحاب. تصفح اختيارات عمر ٧ إلى ١٠ سنين، وقارن المقاس وطريقة الاستخدام قبل ما تختار.', en: 'For little outings and play with friends. Explore ages 7–10 and compare fit and intended use before choosing.' } },
  { slug: 'ages-8-12', min: 8, max: 12, label: { ar: 'من ٨ إلى ١٢ سنة', en: 'Ages 8–12' }, description: { ar: 'اختيارات بتواكب نموهم. دراجات وسكوتر لعمر ٨ إلى ١٢ سنة؛ ابعت لنا الطول والاستخدام المطلوب عشان نساعدك تختار من المتاح.', en: 'Choices for growing riders aged 8–12. Share the rider’s height and intended use so we can help you choose from available bikes and scooters.' } },
  { slug: 'ages-12-plus', min: 12, max: null, label: { ar: 'من ١٢ سنة فأكثر', en: 'Ages 12 and up' }, description: { ar: 'للشباب والكبار، للمشاوير والتمرين والفسح. اختيارات من عمر ١٢ سنة فأكثر، مع تحديد المقاس حسب الطول والاستخدام والحمولة المسموح بها.', en: 'For teens and adults, everyday trips and leisure rides. Browse ages 12 and up, with sizing based on height, use and the manufacturer’s load limits.' } },
];

export const PRODUCT_TYPES = [
  { slug: 'bikes', label: { ar: 'دراجات', en: 'Bicycles' }, icon: 'bike', description: { ar: 'عجل أطفال وشباب وكبار في مودي بايك. اختار الفئة العمرية، وحدد الطول عشان نساعدك في اختيار مقاس الجنط والشاسيه. تواصل معنا لمعرفة الموديلات والأسعار المتاحة.', en: 'Children’s, teen and adult bicycles at ModyBike. Choose an age group and share the rider’s height for wheel and frame sizing. Contact us for available models and prices.' } },
  { slug: 'scooters', label: { ar: 'سكوتر', en: 'Scooters' }, icon: 'arrowRight', description: { ar: 'سكوتر أطفال بمقاسات مختلفة في مودي بايك. اسأل عن الصغير والمتوسط والكبير، وعدد العجلات وارتفاع المقود والحمولة المناسبة قبل الاختيار. الصور والأسعار والتوفر بتتأكد مباشرة مع المعرض.', en: 'Children’s scooters in different sizes at ModyBike. Ask about small, medium and large options, wheel count, handlebar height and load limits. Confirm current photos, prices and availability with the shop.' } },
  { slug: 'ride-on-cars', label: { ar: 'عربيات أطفال', en: 'Ride-on cars' }, icon: 'kids', description: { ar: 'عربيات ركوب للأطفال للعب والحركة. ابعت عمر الطفل وطوله واسألنا عن النوع المناسب، والأبعاد والحمولة وطريقة التشغيل، والتوفر والسعر قبل الطلب من مودي بايك.', en: 'Children’s ride-on cars for play and movement. Share your child’s age and height and ask about dimensions, load limits, operation, availability and price before ordering from ModyBike.' } },
  { slug: 'walkers', label: { ar: 'مشايات أطفال', en: 'Baby walkers' }, icon: 'kids', description: { ar: 'استفسر عن مشايات الأطفال المتاحة في مودي بايك. نوضح لك مواصفات كل موديل وتعليمات الشركة المصنعة وحدود الاستخدام قبل الشراء. هذا القسم منفصل عن تقسيم دراجات الأطفال حسب العمر.', en: 'Ask about baby walkers available at ModyBike, including model specifications, manufacturer instructions and usage limits. This section is separate from the children’s bicycle age groups.' } },
];

export const getAgeGroup = (slug) => AGE_GROUPS.find((group) => group.slug === slug);
export const getProductType = (slug) => PRODUCT_TYPES.find((type) => type.slug === slug);
export const productTypeOf = (product) => product.productType || 'bikes';
export function matchesAgeGroup(product, slug) {
  const group = getAgeGroup(slug);
  if (!group) return !slug;
  if (product.fit?.ageMin == null) return false;
  return product.fit.ageMin <= (group.max ?? Infinity) && (product.fit.ageMax ?? Infinity) >= group.min;
}
