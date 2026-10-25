export default {
  slug: 'electric-bikes-guide',
  blocks: [
    {
      type: 'lead',
      ar: 'الدراجة الكهربائية مش موتوسيكل صغير — هي دراجة عادية بموتور بيساعدك وأنت بتدوس. الفرق ده مهم لأنه بيحدد مين المستفيد منها فعلًا ومين هيندم على الفلوس. المقال ده بيشرح الأساسيات بالأرقام.',
      en: 'An e-bike is not a small motorbike — it is an ordinary bicycle with a motor that assists while you pedal. That distinction matters, because it decides who genuinely benefits and who will regret the money. Here are the fundamentals, with numbers.',
    },
    {
      type: 'h2', id: 'how-it-works', ar: 'إزاي بتشتغل؟', en: 'How they work' },
    {
      type: 'p',
      ar: 'حساس في الدراجة بيحس إنك بتدوس، فبيدّي إشارة للموتور إنه يساعدك بنسبة إنت بتحددها من الشاشة (عادةً ٥ مستويات). ساعة ما تبطّل دوس، المساعدة بتقف. فيه أنواع فيها زراع دفع (Throttle) بيشغّل الموتور من غير دوس — وده بيقرّبها من الموتوسيكل وبيقلل عمر البطارية.',
      en: 'A sensor detects that you are pedalling and tells the motor to assist by an amount you choose on the display (usually five levels). Stop pedalling and the assist stops. Some models add a throttle that runs the motor without pedalling — which moves them closer to a moped and shortens battery life.',
    },
    {
      type: 'h2', id: 'motor-positions', ar: 'مكان الموتور: خلفي ولا وسط؟', en: 'Motor position: hub or mid-drive?' },
    {
      type: 'table',
      caption: { ar: 'مقارنة مواضع الموتور', en: 'Motor position comparison' },
      head: { ar: ['المعيار', 'موتور في الطرمبة (Hub)', 'موتور وسط (Mid-drive)'], en: ['Criterion', 'Hub motor', 'Mid-drive'] },
      rows: {
        ar: [
          ['السعر', 'أرخص', 'أغلى'],
          ['الأداء على المطالع', 'جيد', 'ممتاز'],
          ['توزيع الوزن', 'خلفي (أقل توازنًا)', 'في المنتصف ومنخفض (متوازن)'],
          ['استهلاك البطارية', 'أعلى على المطالع', 'أكفأ'],
          ['الصيانة', 'أبسط', 'بيستهلك الجنزير أسرع'],
        ],
        en: [
          ['Price', 'Cheaper', 'More expensive'],
          ['Climbing performance', 'Good', 'Excellent'],
          ['Weight distribution', 'Rear-biased (less balanced)', 'Central and low (balanced)'],
          ['Battery consumption', 'Higher on climbs', 'More efficient'],
          ['Maintenance', 'Simpler', 'Wears the chain faster'],
        ],
      },
    },
    {
      type: 'h2', id: 'numbers', ar: 'الأرقام: إيه معنى ٢٥٠ وات و٣٦ فولت؟', en: 'The numbers: what do 250 W and 36 V mean?' },
    {
      type: 'ul',
      ar: [
        'الوات (W) = قوة الموتور. ٢٥٠ وات كافية للأرض المستوية والمطالع البسيطة، و٣٥٠–٥٠٠ وات لمطالع أصعب أو راكب أتقل.',
        'الفولت (V) = جهد البطارية. ٣٦ فولت هو الشائع، و٤٨ فولت بيدي عزم أعلى.',
        'الأمبير/ساعة (Ah) = سعة البطارية، وده اللي بيحدد المدى.',
        'واط/ساعة (Wh) = فولت × أمبير/ساعة. ده أهم رقم للمقارنة. بطارية ٣٦ فولت × ١٠ أمبير = ٣٦٠ واط/ساعة.',
      ],
      en: [
        'Watts (W) = motor power. 250 W handles flat ground and mild inclines; 350–500 W suits steeper climbs or a heavier rider.',
        'Volts (V) = battery voltage. 36 V is common; 48 V delivers more torque.',
        'Amp-hours (Ah) = battery capacity, which sets the range.',
        'Watt-hours (Wh) = volts × amp-hours. This is the number to compare on. A 36 V × 10 Ah battery is 360 Wh.',
      ],
    },
    {
      type: 'h2', id: 'range', ar: 'حساب المدى الحقيقي', en: 'Calculating real range' },
    {
      type: 'p',
      ar: 'المصنّع بيكتب مدى مثالي بيتقاس مع راكب خفيف على أرض مستوية بأقل مستوى مساعدة. القاعدة العملية: استهلاك من ٧ لـ ١٥ واط/ساعة لكل كيلومتر حسب المستوى والوزن والرياح.',
      en: 'Manufacturers quote an ideal range measured with a light rider on flat ground at the lowest assist level. The practical rule is a consumption of 7–15 Wh per kilometre depending on assist level, weight and wind.',
    },
    {
      type: 'table',
      caption: { ar: 'المدى المتوقع لبطارية ٣٦٠ واط/ساعة', en: 'Expected range from a 360 Wh battery' },
      head: { ar: ['مستوى المساعدة', 'الاستهلاك/كم', 'المدى المتوقع'], en: ['Assist level', 'Wh per km', 'Expected range'] },
      rows: {
        ar: [
          ['منخفض (١–٢)', '≈ ٧ واط/ساعة', '≈ ٥٠ كم'],
          ['متوسط (٣)', '≈ ١٠ واط/ساعة', '≈ ٣٦ كم'],
          ['عالي (٤–٥)', '≈ ١٥ واط/ساعة', '≈ ٢٤ كم'],
        ],
        en: [
          ['Low (1–2)', '≈ 7 Wh/km', '≈ 50 km'],
          ['Medium (3)', '≈ 10 Wh/km', '≈ 36 km'],
          ['High (4–5)', '≈ 15 Wh/km', '≈ 24 km'],
        ],
      },
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'قاعدة عملية: اقسم المدى المعلن على اتنين عشان توصل لرقم واقعي في الاستخدام اليومي. ولو بتخطط لمشوار طويل، خطّط على أساس إنك ترجع بمساعدة أقل أو من غير مساعدة خالص.',
      en: 'Practical rule: halve the advertised range for a realistic daily figure. And if you plan a long ride, plan on returning at a lower assist level — or with none at all.',
    },
    {
      type: 'h2', id: 'battery-life', ar: 'عمر البطارية والمحافظة عليها', en: 'Battery life and how to preserve it' },
    {
      type: 'ul',
      ar: [
        'بطارية الليثيوم بتعيش من ٥٠٠ لـ ٨٠٠ دورة شحن كاملة — يعني من ٣ لـ ٥ سنين استخدام عادي.',
        'ما تسيبهاش فاضية لفترة طويلة، وما تخزّنهاش مشحونة ١٠٠٪ لشهور. أفضل نسبة للتخزين الطويل من ٤٠ لـ ٦٠٪.',
        'تجنّب الشحن في الحر الشديد أو بعد ركوب مباشر — سيبها تبرد نص ساعة الأول.',
        'استخدم الشاحن الأصلي بس. الشواحن غير المطابقة سبب شائع لتلف البطارية وللحرائق.',
        'البطارية هي أغلى قطعة في الدراجة — اسأل عن سعر البطارية البديلة قبل الشراء.',
      ],
      en: [
        'A lithium battery lasts roughly 500–800 full charge cycles — three to five years of normal use.',
        'Do not leave it flat for long periods, and do not store it at 100% for months. For long storage, 40–60% is best.',
        'Avoid charging in extreme heat or straight after a ride — let it cool for half an hour first.',
        'Use only the supplied charger. Non-matching chargers are a common cause of battery damage and fires.',
        'The battery is the most expensive part of the bike — ask the price of a replacement before you buy.',
      ],
    },
    {
      type: 'h2', id: 'who-for', ar: 'مين يستفيد فعلًا؟', en: 'Who genuinely benefits' },
    {
      type: 'ul',
      ar: [
        'حد بيروح شغله بالدراجة مسافة من ١٠ لـ ٢٥ كم وما يحبش يوصل متعرّق.',
        'حد بيحمل أوزان أو مشتريات بانتظام.',
        'حد عنده مشكلة صحية بتمنعه من المجهود العالي لكن عايز يتحرك.',
        'كبار السن اللي عايزين يفضلوا راكبين مع أصحابهم من غير ما يتخلّفوا.',
        'مش مناسبة لـ: حد هدفه الأساسي حرق سعرات — الدراجة العادية أفضل وأرخص بكتير.',
      ],
      en: [
        'Someone commuting 10–25 km who does not want to arrive drenched in sweat.',
        'Someone regularly carrying loads or shopping.',
        'Someone with a health condition that rules out heavy exertion but who wants to stay active.',
        'Older riders who want to keep up with friends rather than be left behind.',
        'Not for: someone whose main goal is burning calories — a normal bike is better and far cheaper.',
      ],
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'الدراجة الكهربائية بتحتاج رخصة في مصر؟', en: 'Does an e-bike need a licence in Egypt?' },
          a: {
            ar: 'الدراجات الكهربائية المساعِدة (اللي الموتور فيها بيشتغل مع الدوس وبقوة ٢٥٠ وات) بتتعامل عمومًا معاملة الدراجات العادية. لكن القواعد بتتغيّر، والأنواع اللي فيها زراع دفع وسرعات عالية ممكن تتصنّف بشكل مختلف. اتأكد من اللوائح السارية وقت الشراء.',
            en: 'Pedal-assist e-bikes (motor engages only while pedalling, around 250 W) are generally treated like ordinary bicycles. Rules do change, though, and throttle-equipped, higher-speed models may be classified differently. Check the regulations in force when you buy.',
          },
        },
        {
          q: { ar: 'أقدر أركبها في المطر؟', en: 'Can I ride it in the rain?' },
          a: {
            ar: 'أغلب الدراجات الكهربائية مقاومة لرذاذ المطر (IPX4 فأكتر)، لكن مش مقاومة للغمر. ما تغسلهاش بخرطوم ضغط، وما تسيبهاش في مطر غزير لساعات، وجفّف منطقة البطارية والموصلات بعد أي ركوب في مطر.',
            en: 'Most e-bikes are splash resistant (IPX4 or better) but not submersible. Never pressure-wash one, do not leave it in heavy rain for hours, and dry the battery contacts after any wet ride.',
          },
        },
        {
          q: { ar: 'تستاهل الفرق في السعر؟', en: 'Is it worth the price difference?' },
          a: {
            ar: 'لو هتستخدمها كوسيلة مواصلات يومية بدل عربية أو مواصلات، فبتدفع تكلفتها في سنة أو سنتين. لو هتستخدمها للرياضة أو للفسحة أحيانًا، دراجة عادية كويسة هتديك متعة أكتر بربع السعر.',
            en: 'If it replaces a car or public transport for a daily commute, it pays for itself in one or two years. If it is for fitness or occasional leisure, a good normal bike gives more enjoyment for a quarter of the price.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'محتار بين دراجة عادية وكهربائية؟ قول لنا مسافة مشوارك اليومي على واتساب ونساعدك تختار.',
      en: 'Torn between a regular bike and an e-bike? Tell us your daily distance on WhatsApp and we will help you decide.',
    },
  ],
};
