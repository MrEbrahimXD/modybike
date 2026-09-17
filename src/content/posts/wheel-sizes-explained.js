export default {
  slug: 'wheel-sizes-explained',
  blocks: [
    {
      type: 'lead',
      ar: 'الرقم المكتوب على كاوتش الدراجة (٢٦ × ١.٩٥ مثلًا) بيبان بسيط، لكنه في الحقيقة أكبر مصدر لبس في عالم الدراجات. في المقال ده هنفكّك المقاسات دي، ونشرح معيار ETRTO اللي بيحل المشكلة نهائيًا، ونقول لك إمتى تختار كل مقاس.',
      en: 'The number printed on a bicycle tyre (26 × 1.95, say) looks simple, but it is the single biggest source of confusion in cycling. This article unpacks those numbers, explains the ETRTO standard that settles the matter, and tells you when to choose each size.',
    },
    {
      type: 'h2',
      id: 'the-problem',
      ar: 'المشكلة: البوصة مش مقاس دقيق',
      en: 'The problem: inches are not a precise measurement',
    },
    {
      type: 'p',
      ar: 'مقاس «٢٦ بوصة» مش بيقيس الجنط نفسه — بيقيس القطر الخارجي التقريبي للكاوتش بعد ما يتنفخ. وده معناه إن كاوتش ٢٦ × ١.٧٥ وكاوتش ٢٦ × ٢.١ ممكن يكون قطر الجنط اللي بيركبوا عليه مختلف في بعض الحالات القديمة. المشكلة دي سببت مشاكل حقيقية لسنين، لحد ما ظهر معيار موحّد.',
      en: 'A “26 inch” size does not measure the rim — it measures the rough outer diameter of the tyre once inflated. That means a 26 × 1.75 and a 26 × 2.1 could, in some legacy cases, belong on rims of different diameters. This caused real problems for years, until a single standard arrived.',
    },
    {
      type: 'h2',
      id: 'etrto',
      ar: 'الحل: معيار ETRTO / ISO',
      en: 'The fix: the ETRTO / ISO standard',
    },
    {
      type: 'p',
      ar: 'ETRTO بيقيس القطر الداخلي للجنط بالمليمتر — وده رقم ثابت ما بيتغيرش. هتلاقيه مكتوب على جنب الكاوتش بصيغة زي «٥٠-٥٥٩» يعني عرض الكاوتش ٥٠ مم وقطر الجنط ٥٥٩ مم. القاعدة بسيطة: لو الرقم التاني (٥٥٩) مطابق للي على جنطك، الكاوتش هيركب. لو مش مطابق، مش هيركب مهما كان مكتوب عليه ٢٦ بوصة.',
      en: 'ETRTO measures the rim’s bead-seat diameter in millimetres — a fixed number that never shifts. You will find it on the tyre sidewall in a form like “50-559”, meaning a 50 mm wide tyre on a 559 mm rim. The rule is simple: if the second number matches your rim, the tyre fits. If it does not, it will not fit, no matter what “26 inch” is printed beside it.',
    },
    {
      type: 'table',
      caption: { ar: 'جدول مقاسات الجنوط الكامل (ETRTO)', en: 'Complete wheel size chart (ETRTO)' },
      head: {
        ar: ['المقاس الشائع', 'قطر الجنط (ETRTO)', 'الاستخدام'],
        en: ['Common name', 'Rim diameter (ETRTO)', 'Used for'],
      },
      rows: {
        ar: [
          ['١٢ بوصة', '٢٠٣ مم', 'دراجات أطفال ٢–٤ سنوات ودراجات التوازن'],
          ['١٤ بوصة', '٢٥٤ مم', 'دراجات أطفال ٣–٥ سنوات'],
          ['١٦ بوصة', '٣٠٥ مم', 'دراجات أطفال ٤–٦ سنوات'],
          ['١٨ بوصة', '٣٥٥ مم', 'دراجات أطفال ٥–٧ سنوات (مقاس نادر)'],
          ['٢٠ بوصة', '٤٠٦ مم', 'أطفال ٦–٩ سنوات، BMX، الدراجات القابلة للطي'],
          ['٢٤ بوصة', '٥٠٧ مم', 'أطفال ٨–١٢ سنة'],
          ['٢٦ بوصة', '٥٥٩ مم', 'الجبلي الكلاسيكي والهجين — الأكثر انتشارًا في مصر'],
          ['٢٧.٥ بوصة (650B)', '٥٨٤ مم', 'الجبلي الحديث'],
          ['٢٩ بوصة', '٦٢٢ مم', 'الجبلي للمسافات الطويلة'],
          ['700C', '٦٢٢ مم', 'دراجات الطريق والهجين السريع — نفس قطر ٢٩ بوصة'],
        ],
        en: [
          ['12 in', '203 mm', 'Kids 2–4 and balance bikes'],
          ['14 in', '254 mm', 'Kids 3–5'],
          ['16 in', '305 mm', 'Kids 4–6'],
          ['18 in', '355 mm', 'Kids 5–7 (an uncommon size)'],
          ['20 in', '406 mm', 'Kids 6–9, BMX, folding bikes'],
          ['24 in', '507 mm', 'Kids 8–12'],
          ['26 in', '559 mm', 'Classic mountain and hybrid — the most common in Egypt'],
          ['27.5 in (650B)', '584 mm', 'Modern mountain bikes'],
          ['29 in', '622 mm', 'Long-distance mountain bikes'],
          ['700C', '622 mm', 'Road and fast hybrid — identical diameter to 29 in'],
        ],
      },
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'معلومة مفيدة: ٢٩ بوصة و 700C نفس القطر بالظبط (٦٢٢ مم). الفرق بينهم في عرض الكاوتش بس — ٢٩ بوصة بتستخدم كاوتش عريض مسنن، و700C بتستخدم كاوتش رفيع ناعم. يعني تقدر تحط كاوتش طريق رفيع على جنط دراجة جبلية ٢٩ وتحوّلها لدراجة أسرع على الأسفلت.',
      en: 'Useful to know: 29 inch and 700C are exactly the same diameter (622 mm). The only difference is tyre width — 29 inch runs wide knobby rubber, 700C runs narrow slicks. Which means you can fit narrow road tyres to a 29-inch mountain wheel and turn it into a much faster road bike.',
    },
    {
      type: 'h2',
      id: 'adult-comparison',
      ar: '٢٦ ولا ٢٧.٥ ولا ٢٩؟ المقارنة الحقيقية',
      en: '26, 27.5 or 29? The real comparison',
    },
    {
      type: 'table',
      caption: { ar: 'مقارنة مقاسات جنوط الكبار', en: 'Adult wheel size comparison' },
      head: { ar: ['المعيار', '٢٦ بوصة', '٢٧.٥ بوصة', '٢٩ بوصة'], en: ['Criterion', '26 in', '27.5 in', '29 in'] },
      rows: {
        ar: [
          ['التسارع من الثبات', 'الأسرع', 'متوسط', 'الأبطأ'],
          ['الحفاظ على السرعة', 'الأقل', 'جيد', 'الأفضل'],
          ['المرور فوق المطبّات', 'الأضعف', 'جيد', 'الأفضل'],
          ['خفة الحركة في الزحام', 'الأفضل', 'جيد', 'الأقل'],
          ['توفّر قطع الغيار في مصر', 'ممتاز', 'جيد', 'متوسط'],
          ['السعر', 'الأرخص', 'متوسط', 'الأغلى'],
          ['الأطوال الأنسب', 'لحد ١٧٥ سم', '١٦٥ – ١٨٥ سم', '١٧٥ سم فأكثر'],
        ],
        en: [
          ['Acceleration from a stop', 'Fastest', 'Middle', 'Slowest'],
          ['Holding speed', 'Weakest', 'Good', 'Best'],
          ['Rolling over bumps', 'Weakest', 'Good', 'Best'],
          ['Agility in traffic', 'Best', 'Good', 'Weakest'],
          ['Spare part availability in Egypt', 'Excellent', 'Good', 'Moderate'],
          ['Price', 'Cheapest', 'Middle', 'Most expensive'],
          ['Best rider height', 'Up to 175 cm', '165 – 185 cm', '175 cm and up'],
        ],
      },
    },
    {
      type: 'h3',
      id: 'recommendation',
      ar: 'توصيتنا العملية للسوق المصري',
      en: 'Our practical recommendation for Egypt',
    },
    {
      type: 'ul',
      ar: [
        'لو دي أول دراجة ليك وميزانيتك محدودة: ٢٦ بوصة. قطع غيارها موجودة في أي محل في أي مركز، وأرخص في الصيانة بفارق واضح.',
        'لو طولك من ١٦٨ لـ ١٨٠ سم وعايز أحسن توازن: ٢٧.٥ بوصة.',
        'لو طولك فوق ١٧٨ سم وبتمشي مسافات طويلة على طرق ممهدة: ٢٩ بوصة.',
        'لو بتركب في شوارع مزدحمة وبتوقف وتقوم كتير: ٢٦ بوصة أرشق بكتير.',
      ],
      en: [
        'First bike on a limited budget: 26 inch. Spares are in every shop in every district, and servicing is noticeably cheaper.',
        'Between 168 and 180 cm and want the best balance: 27.5 inch.',
        'Over 178 cm and covering long distances on decent roads: 29 inch.',
        'Riding in busy streets with constant stopping and starting: 26 inch is far more nimble.',
      ],
    },
    {
      type: 'h2',
      id: 'tyre-width',
      ar: 'عرض الكاوتش: الرقم التاني اللي محدش بياخد باله منه',
      en: 'Tyre width: the second number nobody notices',
    },
    {
      type: 'p',
      ar: 'في «٢٦ × ١.٩٥»، الرقم ١.٩٥ هو عرض الكاوتش بالبوصة. العرض ده بيأثر على راحتك أكتر من مقاس الجنط نفسه: كاوتش عريض = هوا أكتر جوه = امتصاص أحسن للمطبّات وتماسك أعلى، لكن احتكاك أكبر وسرعة أقل. كاوتش رفيع = عكس كل ده.',
      en: 'In “26 × 1.95”, the 1.95 is the tyre width in inches. That number affects your comfort more than the rim diameter does: a wider tyre holds more air, so it absorbs bumps better and grips more, at the cost of extra rolling resistance. A narrower tyre is the reverse.',
    },
    {
      type: 'table',
      caption: { ar: 'اختيار عرض الكاوتش حسب الاستخدام', en: 'Choosing tyre width by use' },
      head: { ar: ['الاستخدام', 'العرض المناسب'], en: ['Use', 'Suggested width'] },
      rows: {
        ar: [
          ['سباق وسرعة على الأسفلت', '٢٣ – ٢٨ مم (رفيع ناعم)'],
          ['مشاوير يومية في المدينة', '٣٢ – ٤٠ مم (نص مسنن)'],
          ['طرق زراعية وترابية', '١.٩ – ٢.٢ بوصة (مسنن)'],
          ['رمل وطين', '٢.٣ بوصة فأكثر'],
        ],
        en: [
          ['Racing and speed on asphalt', '23 – 28 mm (narrow slick)'],
          ['Daily city riding', '32 – 40 mm (semi-slick)'],
          ['Farm and dirt roads', '1.9 – 2.2 in (knobby)'],
          ['Sand and mud', '2.3 in and wider'],
        ],
      },
    },
    {
      type: 'callout',
      variant: 'warn',
      ar: 'قبل ما تشتري كاوتش جديد، بُص على جنب الكاوتش القديم واكتب الرقمين (مثال: 50-559). ده أضمن من إنك تقول للبياع «عايز كاوتش ٢٦» — لأن ٢٦ بوصة ليها أكتر من قطر جنط في الموديلات القديمة.',
      en: 'Before buying a new tyre, read the two numbers off the old sidewall (for example 50-559). That is far safer than asking for “a 26 inch” — older designs used more than one rim diameter under that name.',
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'أقدر أركّب جنط ٢٩ بوصة على دراجة ٢٦؟', en: 'Can I fit 29-inch wheels to a 26-inch bike?' },
          a: {
            ar: 'لأ. الشاسيه والشوكة مصممين لقطر معيّن — جنط أكبر مش هيدخل، وحتى لو دخل بالعافية هيغيّر هندسة الدراجة ويخلي الفرامل مش في مكانها. غيّر الدراجة مش الجنط.',
            en: 'No. The frame and fork are built around a specific diameter — a bigger wheel will not clear, and even if forced it changes the geometry and puts the brakes in the wrong place. Change the bike, not the wheel.',
          },
        },
        {
          q: { ar: 'إيه الفرق بين 700C و ٢٨ بوصة؟', en: 'What is the difference between 700C and 28 inch?' },
          a: {
            ar: 'مفيش فرق — الاتنين نفس القطر ٦٢٢ مم. «٢٨ بوصة» هو الاسم الأوروبي القديم لنفس المقاس، و«700C» هو الاسم الفرنسي، و«٢٩ بوصة» هو الاسم الأمريكي الحديث لما بيتركب عليه كاوتش عريض.',
            en: 'There is none — both are 622 mm. “28 inch” is the older European name, “700C” is the French one, and “29 inch” is the modern American name for the same rim wearing a wide tyre.',
          },
        },
        {
          q: { ar: 'مقاس الجنط بيأثر على السرعة قد إيه؟', en: 'How much does wheel size affect speed?' },
          a: {
            ar: 'أقل مما الناس بتتخيل. الفرق بين ٢٦ و٢٩ بوصة في الحفاظ على السرعة حوالي ٢–٤٪ على الطرق الممهدة. عرض الكاوتش وضغط الهواء بيأثروا أكتر بكتير من قطر الجنط.',
            en: 'Less than people assume. The difference between 26 and 29 inch in speed retention is roughly 2–4% on smooth roads. Tyre width and inflation pressure matter far more than rim diameter.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'محتار بين المقاسات؟ ابعت لنا طولك ونوع الطرق اللي بتمشي عليها، وهنقول لك المقاس المناسب بالظبط.',
      en: 'Torn between sizes? Send us your height and the kind of roads you ride, and we will tell you exactly which size to take.',
    },
  ],
};
