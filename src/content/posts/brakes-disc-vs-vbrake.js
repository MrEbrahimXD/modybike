export default {
  slug: 'brakes-disc-vs-vbrake',
  blocks: [
    {
      type: 'lead',
      ar: 'الفرامل القرصية بقت علامة على «الدراجة الكويسة»، لكنها مش دايمًا الاختيار الأصح لكل حد. المقال ده بيقارن الأنواع بالأرقام والتكلفة الحقيقية في السوق المصري، وبيقول لك إمتى تدفع فرق السعر وإمتى تحتفظ بفلوسك.',
      en: 'Disc brakes have become shorthand for “a good bike”, but they are not always the right call. This article compares the types on performance and real running cost in Egypt, and says when the upgrade is worth paying for.',
    },
    {
      type: 'h2', id: 'types', ar: 'الأنواع الأربعة', en: 'The four types' },
    {
      type: 'ul',
      ar: [
        'فرامل كفة (V-Brake): تيل بيضغط على جنب الجنط. أرخص، أخف، أسهل صيانة، وقطع غيارها في أي محل.',
        'فرامل قرصية ميكانيكية: قرص معدني على محور الجنط، بيتضغط بسلك. أقوى من الكفة وبتشتغل في المطر والتراب.',
        'فرامل قرصية هيدروليك: نفس الفكرة لكن بزيت بدل السلك. أقوى إيقاف وأخف ضغط على الصوابع، لكن صيانتها محتاجة متخصص.',
        'فرامل رجل (كوستر): بتدوس البدال عكس فتقف. في دراجات الأطفال والمدينة بس.',
      ],
      en: [
        'V-brakes: pads squeeze the side of the rim. Cheapest, lightest, easiest to service, with spares in every shop.',
        'Mechanical disc: a metal rotor at the hub, squeezed via a cable. Stronger than a V-brake and works in rain and dust.',
        'Hydraulic disc: the same idea using fluid instead of a cable. The strongest stopping power with the lightest lever effort, but servicing needs a specialist.',
        'Coaster brake: back-pedal to stop. Found on kids and city bikes only.',
      ],
    },
    {
      type: 'h2', id: 'comparison', ar: 'المقارنة بالتفصيل', en: 'The detailed comparison' },
    {
      type: 'table',
      caption: { ar: 'مقارنة أنواع الفرامل', en: 'Brake type comparison' },
      head: {
        ar: ['المعيار', 'كفة (V-Brake)', 'قرصية ميكانيكية', 'قرصية هيدروليك'],
        en: ['Criterion', 'V-brake', 'Mechanical disc', 'Hydraulic disc'],
      },
      rows: {
        ar: [
          ['قوة الإيقاف', 'جيدة', 'قوية', 'الأقوى'],
          ['الأداء في المطر', 'ضعيف (بيتأخر ثانية)', 'جيد جدًا', 'ممتاز'],
          ['الأداء في التراب والطين', 'ضعيف', 'جيد جدًا', 'ممتاز'],
          ['الضغط المطلوب من الصوابع', 'عالي', 'متوسط', 'خفيف جدًا'],
          ['الوزن الإضافي', 'صفر', '+٤٠٠ جم تقريبًا', '+٥٠٠ جم تقريبًا'],
          ['سهولة الصيانة المنزلية', 'ممتازة', 'جيدة', 'صعبة'],
          ['توفّر قطع الغيار في المراكز', 'ممتاز', 'جيد', 'محدود'],
          ['تكلفة تغيير التيل', 'الأرخص', 'متوسطة', 'الأغلى'],
          ['بيأكل الجنط؟', 'أيوة مع الوقت', 'لأ', 'لأ'],
        ],
        en: [
          ['Stopping power', 'Good', 'Strong', 'Strongest'],
          ['Wet performance', 'Poor (a second of lag)', 'Very good', 'Excellent'],
          ['Dust and mud performance', 'Poor', 'Very good', 'Excellent'],
          ['Finger effort required', 'High', 'Medium', 'Very light'],
          ['Added weight', 'None', '≈ +400 g', '≈ +500 g'],
          ['Home serviceability', 'Excellent', 'Good', 'Difficult'],
          ['Spare availability in rural districts', 'Excellent', 'Good', 'Limited'],
          ['Pad replacement cost', 'Cheapest', 'Medium', 'Most expensive'],
          ['Wears the rim?', 'Yes, over time', 'No', 'No'],
        ],
      },
    },
    {
      type: 'h2', id: 'wet', ar: 'الفرق الحقيقي: المطر والتراب', en: 'The real difference: rain and dust' },
    {
      type: 'p',
      ar: 'فرامل الكفة بتضغط على الجنط نفسه. لما الجنط يبقى مبلول أو متربّش، التيل بيحتاج يمسح السطح الأول قبل ما يمسك — وده بيتترجم لتأخير ملحوظ في الإيقاف. الفرامل القرصية بتشتغل على قرص بعيد عن الأرض ومعدنه بيتخلص من المياه بسرعة، فالفرق بين الجاف والمبلول شبه معدوم.',
      en: 'V-brakes clamp the rim itself. When the rim is wet or coated in dust, the pad has to wipe the surface clean before it bites — which shows up as a noticeable delay in stopping. Disc brakes work on a rotor further from the ground, and the metal sheds water quickly, so the difference between dry and wet is close to nil.',
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'في مصر المطر قليل، لكن التراب والرمل كتير جدًا — وده اللي بيخلي الفرق مهم على الطرق الزراعية. لو ركوبك كله على أسفلت نضيف في المدينة، فرامل الكفة الكويسة هتديك ٩٠٪ من الأداء بربع السعر.',
      en: 'Rain is rare in Egypt but dust and sand are constant — which is what makes the difference matter on farm roads. If all your riding is on clean city tarmac, good V-brakes give you 90% of the performance at a quarter of the cost.',
    },
    {
      type: 'h2', id: 'recommendation', ar: 'توصيتنا', en: 'Our recommendation' },
    {
      type: 'ul',
      ar: [
        'دراجة أطفال أو مدينة أو استخدام خفيف: فرامل كفة كافية تمامًا، ووفّر الفرق.',
        'هجين للاستخدام اليومي في شوارع معبّدة: كفة كويسة كافية، والقرصية ترفاهية لطيفة.',
        'جبلي أو طرق زراعية وترابية: قرصية ميكانيكية — ده أفضل نسبة أداء لسعر.',
        'راكب وزنه فوق ٩٠ كجم أو بيحمل شنط تقيلة: قرصية على الأقل ميكانيكية.',
        'ركوب جاد ومسافات ونزول منحدرات: هيدروليك تستاهل الفرق.',
      ],
      en: [
        'Kids, city or light use: V-brakes are entirely sufficient — keep the money.',
        'Hybrid for daily riding on paved streets: good V-brakes are enough; discs are a pleasant luxury.',
        'Mountain or farm and dirt roads: mechanical disc — the best performance per pound spent.',
        'Rider over 90 kg, or carrying heavy loads: mechanical disc at minimum.',
        'Serious riding, long distances and descents: hydraulic is worth the difference.',
      ],
    },
    {
      type: 'h2', id: 'maintenance', ar: 'الصيانة المطلوبة لكل نوع', en: 'Maintenance each type needs' },
    {
      type: 'table',
      caption: { ar: 'صيانة الفرامل', en: 'Brake maintenance' },
      head: { ar: ['النوع', 'كل شهر', 'كل ٦ شهور'], en: ['Type', 'Monthly', 'Every 6 months'] },
      rows: {
        ar: [
          ['كفة', 'فحص التيل وشد السلك', 'تغيير التيل لو استهلك'],
          ['قرصية ميكانيكية', 'فحص المسافة بين التيل والقرص', 'ضبط التيل وتنظيف القرص بكحول'],
          ['قرصية هيدروليك', 'فحص مستوى مقبض الفرامل', 'تغيير الزيت (كل سنة عادة) في ورشة'],
        ],
        en: [
          ['V-brake', 'Check pads and cable tension', 'Replace worn pads'],
          ['Mechanical disc', 'Check pad-to-rotor clearance', 'Adjust pads, clean rotor with alcohol'],
          ['Hydraulic disc', 'Check lever feel', 'Bleed the system (usually yearly) at a workshop'],
        ],
      },
    },
    {
      type: 'callout',
      variant: 'warn',
      ar: 'ما تلمسش قرص الفرامل بإيدك ولا تحط عليه أي زيت. الدهون بتلوّث التيل والقرص وبتقلل قوة الإيقاف لدرجة خطيرة، وأحيانًا التيل بيبقى لازم يتغيّر. لو لوّثته، نظّفه بكحول إيزوبروبيل بس.',
      en: 'Never touch a brake rotor with bare hands or let oil near it. Contamination ruins both pad and rotor and cuts stopping power dangerously — sometimes the pads must be replaced. If it happens, clean with isopropyl alcohol only.',
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'أقدر أحوّل دراجتي من كفة لقرصية؟', en: 'Can I convert my bike from V-brakes to disc?' },
          a: {
            ar: 'بس لو الشاسيه والشوكة فيهم مكان تركيب الفرامل القرصية (Disc mounts) والجنوط فيها مكان للقرص. لو مش موجودين، التحويل غير ممكن عمليًا — والحل يبقى شراء دراجة مجهزة.',
            en: 'Only if the frame and fork have disc mounts and the hubs have rotor mounts. Without those, conversion is not practical — the answer is to buy a bike that came with them.',
          },
        },
        {
          q: { ar: 'الفرامل القرصية بتصفّر — طبيعي؟', en: 'My disc brakes squeal — is that normal?' },
          a: {
            ar: 'صفير خفيف أول ما تشتري الدراجة طبيعي لحد ما التيل «يقعد» على القرص (حوالي ٥٠ كم). صفير مستمر بعد كده معناه تلوث بالزيت أو قرص معوج — روح للورشة.',
            en: 'A light squeal on a new bike is normal until the pads bed in (about 50 km). Persistent squealing after that means oil contamination or a bent rotor — take it to a workshop.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'عندنا موديلات بكل أنواع الفرامل. قول لنا بتركب فين وإيه وزنك التقريبي، وهنرشّح لك النوع اللي فعلًا محتاجه.',
      en: 'We carry models with every brake type. Tell us where you ride and your rough weight, and we will recommend the type you genuinely need.',
    },
  ],
};
