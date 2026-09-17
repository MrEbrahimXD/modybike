export default {
  slug: 'tyre-pressure-guide',
  blocks: [
    {
      type: 'lead',
      ar: 'ضغط الهواء هو أرخص وأسرع «ترقية» ممكن تعملها لدراجتك — وهو كمان أكتر حاجة مهملة. الضغط الغلط بيبطّئك، بيتعبك، وبيسبب بنشر متكرر. الأرقام الصح كلها في المقال ده.',
      en: 'Tyre pressure is the cheapest, fastest upgrade you can make to a bike — and the most neglected. The wrong pressure slows you down, tires you out and causes repeat punctures. All the correct numbers are below.',
    },
    {
      type: 'h2', id: 'why', ar: 'ليه الضغط مهم للدرجة دي؟', en: 'Why pressure matters this much' },
    {
      type: 'ul',
      ar: [
        'ضغط قليل جدًا: احتكاك عالي (بتدوس ضعف اللازم)، والكاوتش بيتفلطح على الجنط فبيحصل «بنشر القرصة» — تقطيعتين متوازيتين في السلنجة.',
        'ضغط عالي جدًا: تماسك أقل (الكاوتش بينطّ على المطبّات بدل ما يمتصها)، ركوب قاسي جدًا، واحتمال انفجار في الحر.',
        'الضغط الصح: أقل احتكاك ممكن مع تماسك وراحة كافيين.',
      ],
      en: [
        'Too low: high rolling resistance (you pedal twice as hard), and the tyre squashes against the rim causing a pinch flat — two parallel cuts in the tube.',
        'Too high: less grip (the tyre skips over bumps instead of absorbing them), a harsh ride, and a risk of blowout in heat.',
        'Correct: the lowest rolling resistance you can get while keeping grip and comfort.',
      ],
    },
    {
      type: 'h2', id: 'chart', ar: 'جدول الضغط المناسب', en: 'The pressure chart' },
    {
      type: 'table',
      caption: { ar: 'ضغط الإطارات حسب نوع الدراجة', en: 'Tyre pressure by bike type' },
      head: { ar: ['نوع الدراجة / الإطار', 'PSI', 'BAR'], en: ['Bike / tyre type', 'PSI', 'BAR'] },
      rows: {
        ar: [
          ['دراجات أطفال ١٢ – ١٦ بوصة', '٢٥ – ٤٠', '١.٧ – ٢.٨'],
          ['دراجات أطفال ٢٠ – ٢٤ بوصة', '٣٠ – ٥٠', '٢.١ – ٣.٤'],
          ['جبلي بإطار عريض ٢.٠ بوصة فأكتر', '٢٨ – ٤٠', '١.٩ – ٢.٨'],
          ['هجين ٣٥ – ٤٢ مم', '٥٠ – ٧٠', '٣.٤ – ٤.٨'],
          ['طريق ٢٣ – ٢٨ مم', '٨٠ – ١١٠', '٥.٥ – ٧.٦'],
          ['BMX ٢٠ بوصة', '٤٠ – ٧٠', '٢.٨ – ٤.٨'],
        ],
        en: [
          ['Kids 12 – 16 inch', '25 – 40', '1.7 – 2.8'],
          ['Kids 20 – 24 inch', '30 – 50', '2.1 – 3.4'],
          ['Mountain, 2.0 inch and wider', '28 – 40', '1.9 – 2.8'],
          ['Hybrid, 35 – 42 mm', '50 – 70', '3.4 – 4.8'],
          ['Road, 23 – 28 mm', '80 – 110', '5.5 – 7.6'],
          ['BMX 20 inch', '40 – 70', '2.8 – 4.8'],
        ],
      },
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'الأرقام المكتوبة على جنب الكاوتش نفسه (مثال: INFLATE TO 40–65 PSI) هي المرجع النهائي. الجدول ده إرشادي، لكن الكاوتش بيقول لك المدى الآمن بالظبط.',
      en: 'The numbers moulded into the sidewall (for example INFLATE TO 40–65 PSI) are the final word. This chart is a guide; the tyre itself tells you the exact safe range.',
    },
    {
      type: 'h2', id: 'rider-weight', ar: 'وزن الراكب بيغيّر الأرقام', en: 'Rider weight changes the numbers' },
    {
      type: 'p',
      ar: 'القاعدة: داخل المدى المسموح على الكاوتش، الراكب الأتقل بياخد الحد الأعلى والأخف بياخد الحد الأدنى. تقريبًا كل ١٠ كجم زيادة في الوزن الكلي (راكب + شنط) بتحتاج زيادة حوالي ٥ psi.',
      en: 'The rule: inside the range printed on the tyre, a heavier rider takes the upper end and a lighter rider the lower end. Roughly every 10 kg of extra total weight (rider plus luggage) needs about 5 psi more.',
    },
    {
      type: 'table',
      caption: { ar: 'مثال: كاوتش هجين ٣٥ مم (المدى ٥٠–٧٠ psi)', en: 'Example: a 35 mm hybrid tyre (range 50–70 psi)' },
      head: { ar: ['وزن الراكب', 'الضغط المقترح'], en: ['Rider weight', 'Suggested pressure'] },
      rows: {
        ar: [
          ['أقل من ٦٠ كجم', '٥٠ – ٥٥ psi'],
          ['٦٠ – ٧٥ كجم', '٥٥ – ٦٠ psi'],
          ['٧٥ – ٩٠ كجم', '٦٠ – ٦٥ psi'],
          ['أكتر من ٩٠ كجم', '٦٥ – ٧٠ psi'],
        ],
        en: [
          ['Under 60 kg', '50 – 55 psi'],
          ['60 – 75 kg', '55 – 60 psi'],
          ['75 – 90 kg', '60 – 65 psi'],
          ['Over 90 kg', '65 – 70 psi'],
        ],
      },
    },
    {
      type: 'h2', id: 'surface', ar: 'تعديل الضغط حسب الأرض', en: 'Adjusting for the surface' },
    {
      type: 'ul',
      ar: [
        'أسفلت ناعم: الحد الأعلى من المدى — أقل احتكاك وسرعة أعلى.',
        'طرق زراعية ومطبّات: نزّل ٥–١٠ psi — تماسك وراحة أحسن.',
        'رمل أو طين: نزّل لأقل حد مسموح — مساحة تلامس أكبر تمنع الغطس.',
        'حر شديد ووقفة طويلة في الشمس: نزّل ٥ psi — الحرارة بترفع الضغط لوحدها.',
      ],
      en: [
        'Smooth asphalt: the top of the range — least resistance, most speed.',
        'Farm roads and bumps: drop 5–10 psi for grip and comfort.',
        'Sand or mud: go to the minimum allowed — a bigger contact patch stops you sinking.',
        'Extreme heat or long spells parked in the sun: drop 5 psi — heat raises pressure on its own.',
      ],
    },
    {
      type: 'h2', id: 'how-often', ar: 'كل قد إيه أنفخ؟', en: 'How often should I inflate?' },
    {
      type: 'p',
      ar: 'الكاوتش بيفقد هوا حتى لو الدراجة واقفة، لأن الهوا بيتسرب من مسام السلنجة نفسها. كاوتش الطريق الرفيع بيفقد أسرع من العريض لأن الضغط أعلى والحجم أقل.',
      en: 'Tyres lose air even when the bike is parked, because air seeps through the tube itself. Narrow road tyres lose it faster than wide ones, because the pressure is higher and the volume smaller.',
    },
    {
      type: 'ul',
      ar: [
        'دراجة طريق: افحص كل ٣–٥ أيام.',
        'هجين: افحص كل أسبوع.',
        'جبلي بإطار عريض: افحص كل ١٠–١٤ يوم.',
        'دراجة أطفال: افحص كل أسبوع — الأطفال ما بيحسّوش بالفرق وبيدوسوا أصعب من غير ما يعرفوا ليه.',
      ],
      en: [
        'Road bike: check every 3–5 days.',
        'Hybrid: check weekly.',
        'Wide-tyre mountain bike: check every 10–14 days.',
        'Kids bike: check weekly — children do not notice the difference and just pedal harder without knowing why.',
      ],
    },
    {
      type: 'callout',
      variant: 'warn',
      ar: 'اختبار الصباع مش كافي. صباعك ما بيفرقش بين ٤٠ و٦٠ psi، والفرق ده كبير جدًا في الأداء. اشتري مضخة أرضية بعداد — هي أرخص من إصلاح بنشرين.',
      en: 'The thumb test is not enough. Your thumb cannot tell 40 psi from 60 psi, and that gap is enormous in performance terms. Buy a floor pump with a gauge — it costs less than fixing two punctures.',
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'إيه الفرق بين بلف شريدر وبريستا؟', en: 'What is the difference between Schrader and Presta valves?' },
          a: {
            ar: 'شريدر هو البلف العريض زي بتاع العربيات — موجود في أغلب الدراجات الجبلية والهجين والأطفال في مصر، وتقدر تنفخه من أي كاوتشي. بريستا رفيع وطويل وبيتقفل من فوق بصامولة صغيرة — بيستخدم في دراجات الطريق لأنه بيتحمّل ضغط أعلى.',
            en: 'Schrader is the wide, car-style valve found on most mountain, hybrid and kids bikes in Egypt, and any tyre shop can inflate it. Presta is narrow and long with a small lock nut on top, used on road bikes because it handles higher pressure.',
          },
        },
        {
          q: { ar: 'الكاوتش بينزل هوا بسرعة — هل فيه بنشر؟', en: 'My tyre loses air fast — is it punctured?' },
          a: {
            ar: 'لو بينزل خلال ساعات، أيوة فيه تسريب. لو بينزل على مدى أسبوع أو اتنين، ده طبيعي تمامًا. لو بينزل خلال ٢–٣ أيام، افحص البلف نفسه — غالبًا الصامولة سايبة أو البلف قديم.',
            en: 'Losing it within hours means a leak. Losing it over a week or two is completely normal. Losing it in two or three days usually points at the valve itself — a loose lock nut or an old valve core.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'مضخات أرضية بعداد ومضخات صغيرة للشاسيه متوفرة عندنا، وبنضبط لك الضغط الصح مجانًا وقت الاستلام.',
      en: 'We stock floor pumps with gauges and mini frame pumps, and we set your pressure correctly free of charge on handover.',
    },
  ],
};
