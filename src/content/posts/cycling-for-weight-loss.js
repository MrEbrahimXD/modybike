export default {
  slug: 'cycling-for-weight-loss',
  blocks: [
    {
      type: 'lead',
      ar: 'الدراجة من أفضل الرياضات لإنقاص الوزن لأنها بتحرق سعرات كويسة من غير ما تضغط على الركبة زي الجري. لكن النتيجة بتعتمد على إزاي بتركب مش على إنك بتركب. المقال ده فيه الأرقام الحقيقية وخطة ٨ أسابيع للمبتدئين.',
      en: 'Cycling is one of the best exercises for losing weight because it burns well without loading the knees the way running does. But results depend on how you ride, not just that you ride. Here are the real numbers and an eight-week beginner plan.',
    },
    {
      type: 'callout',
      variant: 'warn',
      ar: 'المقال ده معلومات عامة عن الرياضة مش نصيحة طبية. لو عندك مشاكل في القلب أو الضغط أو المفاصل، أو مش بتمارس رياضة من فترة طويلة، استشر دكتور قبل ما تبدأ.',
      en: 'This is general fitness information, not medical advice. If you have heart, blood pressure or joint conditions, or have been inactive for a long time, speak to a doctor before starting.',
    },
    {
      type: 'h2', id: 'calories', ar: 'كام سعرة بتحرق فعلًا؟', en: 'How many calories do you actually burn?' },
    {
      type: 'table',
      caption: { ar: 'السعرات المحروقة في الساعة (تقديرية)', en: 'Calories burned per hour (estimated)' },
      head: {
        ar: ['السرعة', 'وزن ٦٠ كجم', 'وزن ٧٥ كجم', 'وزن ٩٠ كجم'],
        en: ['Speed', '60 kg rider', '75 kg rider', '90 kg rider'],
      },
      rows: {
        ar: [
          ['هادئة ١٥ كم/س', '≈ ٣٠٠ سعرة', '≈ ٣٨٠ سعرة', '≈ ٤٥٠ سعرة'],
          ['متوسطة ٢٠ كم/س', '≈ ٤٥٠ سعرة', '≈ ٥٦٠ سعرة', '≈ ٦٧٠ سعرة'],
          ['سريعة ٢٥ كم/س', '≈ ٦٠٠ سعرة', '≈ ٧٥٠ سعرة', '≈ ٩٠٠ سعرة'],
          ['طرق ترابية / مطالع', '≈ ٥٥٠ سعرة', '≈ ٧٠٠ سعرة', '≈ ٨٤٠ سعرة'],
        ],
        en: [
          ['Easy, 15 km/h', '≈ 300 kcal', '≈ 380 kcal', '≈ 450 kcal'],
          ['Moderate, 20 km/h', '≈ 450 kcal', '≈ 560 kcal', '≈ 670 kcal'],
          ['Fast, 25 km/h', '≈ 600 kcal', '≈ 750 kcal', '≈ 900 kcal'],
          ['Off-road / climbing', '≈ 550 kcal', '≈ 700 kcal', '≈ 840 kcal'],
        ],
      },
    },
    {
      type: 'p',
      ar: 'لاحظ إن الراكب الأتقل بيحرق أكتر في نفس المشوار — لأن الجسم بيشتغل أكتر عشان يحرّك كتلة أكبر. دي ميزة في بداية رحلة إنقاص الوزن.',
      en: 'Notice that a heavier rider burns more over the same ride, because the body works harder to move more mass. That works in your favour at the start of a weight-loss journey.',
    },
    {
      type: 'h2', id: 'why-cycling', ar: 'ليه الدراجة تحديدًا؟', en: 'Why cycling specifically?' },
    {
      type: 'ul',
      ar: [
        'بدون صدمات: وزنك محمول على الكرسي، فالركبة والكاحل مش بيستقبلوا صدمة زي الجري. مناسبة للأوزان العالية والمبتدئين.',
        'قابلة للاستمرار: تقدر تركب ساعة من غير ما تتعب زي ما هتتعب من نص ساعة جري.',
        'وسيلة مواصلات: تقدر تحوّل مشوار الشغل لتمرين، فما تحتاجش وقت إضافي.',
        'ممتعة: الاستمرارية أهم من الشدة، والاستمتاع بيخلي الالتزام أسهل بكتير.',
      ],
      en: [
        'Low impact: your weight sits on the saddle, so knees and ankles take none of the pounding running delivers. Good for heavier riders and beginners.',
        'Sustainable: you can ride for an hour without the fatigue half an hour of running brings.',
        'It is transport: you can turn a commute into training and need no extra time.',
        'It is enjoyable: consistency beats intensity, and enjoying it makes consistency far easier.',
      ],
    },
    {
      type: 'h2', id: 'plan', ar: 'خطة ٨ أسابيع للمبتدئين', en: 'An eight-week beginner plan' },
    {
      type: 'table',
      caption: { ar: 'خطة تدريجية — ٣ مرات في الأسبوع', en: 'A progressive plan — three rides a week' },
      head: { ar: ['الأسبوع', 'المدة لكل مشوار', 'الشدة'], en: ['Week', 'Duration per ride', 'Intensity'] },
      rows: {
        ar: [
          ['١ – ٢', '٢٠ دقيقة', 'هادئة — تقدر تتكلم بسهولة'],
          ['٣ – ٤', '٣٠ دقيقة', 'هادئة إلى متوسطة'],
          ['٥ – ٦', '٤٠ دقيقة', 'متوسطة — الكلام بقى بجملة قصيرة'],
          ['٧ – ٨', '٥٠ – ٦٠ دقيقة', 'متوسطة + ٣ فترات سريعة دقيقتين'],
        ],
        en: [
          ['1 – 2', '20 minutes', 'Easy — you can talk comfortably'],
          ['3 – 4', '30 minutes', 'Easy to moderate'],
          ['5 – 6', '40 minutes', 'Moderate — talking in short sentences'],
          ['7 – 8', '50 – 60 minutes', 'Moderate plus three 2-minute hard efforts'],
        ],
      },
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'اختبار الكلام هو أبسط مقياس للشدة: لو تقدر تغني، الشدة قليلة. لو تقدر تتكلم بجمل كاملة، الشدة مثالية للحرق. لو مش قادر تكمل جملة، الشدة عالية — خفّف.',
      en: 'The talk test is the simplest intensity gauge: if you can sing, you are going too easy. If you can speak in full sentences, that is the fat-burning sweet spot. If you cannot finish a sentence, ease off.',
    },
    {
      type: 'h2', id: 'mistakes', ar: 'أخطاء بتلغي النتيجة', en: 'Mistakes that cancel the result' },
    {
      type: 'ol',
      ar: [
        'الأكل التعويضي: مشوار ٤٥ دقيقة بيحرق حوالي ٤٠٠ سعرة — وده أقل من سندوتش واحد كبير. الرياضة بتساعد لكن الأكل هو العامل الأكبر.',
        'الكرسي الواطي: بيقلل كفاءتك ويتعبك بدري، فبتقصّر المشوار من غير ما تاخد بالك.',
        'ضغط هواء ناقص: بيخلي نفس المشوار يحسّ أصعب بكتير، ومع الوقت بيقلل حماسك.',
        'الشدة العالية من أول يوم: أسرع طريق للإصابة وللتوقف بعد أسبوعين.',
        'إهمال الترطيب: في حر مصر، ممكن تفقد لتر عرق في الساعة. اشرب قبل ما تعطش.',
      ],
      en: [
        'Compensatory eating: a 45-minute ride burns about 400 kcal — less than one large sandwich. Exercise helps, but diet is the bigger lever.',
        'A saddle set too low: it cuts your efficiency and tires you early, so you shorten rides without noticing.',
        'Under-inflated tyres: the same route feels far harder, and over time that drains your motivation.',
        'Going hard from day one: the fastest route to injury and to quitting after two weeks.',
        'Neglecting hydration: in Egyptian heat you can lose a litre of sweat an hour. Drink before you feel thirsty.',
      ],
    },
    {
      type: 'h2', id: 'egypt-timing', ar: 'أفضل أوقات الركوب في مصر', en: 'The best riding hours in Egypt' },
    {
      type: 'ul',
      ar: [
        'الصيف: من بعد الفجر لحد ٩ صباحًا، أو بعد ٦ مساءً. تجنّب من ١١ لـ ٤ تمامًا.',
        'الشتا: من ٩ صباحًا لـ ٤ مساءً — الجو مثالي وده أحسن موسم للركوب في مصر.',
        'الربيع والخريف: أي وقت تقريبًا، بس خد بالك من الرياح المحمّلة بالتراب في الخماسين.',
        'لو هتركب بعد المغرب في أي فصل، الأنوار والعاكسات مش اختيارية.',
      ],
      en: [
        'Summer: from just after dawn until 9 am, or after 6 pm. Avoid 11 am to 4 pm entirely.',
        'Winter: 9 am to 4 pm — ideal conditions, and the best cycling season in Egypt.',
        'Spring and autumn: almost any time, but watch for dust-laden khamaseen winds.',
        'Riding after sunset in any season? Lights and reflectors are not optional.',
      ],
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'كام مرة في الأسبوع عشان أشوف نتيجة؟', en: 'How many rides a week to see results?' },
          a: {
            ar: '٣ مرات في الأسبوع بمدة ٤٠ دقيقة على الأقل هي الحد اللي بتبدأ تشوف عنده فرق في اللياقة خلال ٤ أسابيع، وفي الوزن خلال ٨ أسابيع مع ضبط الأكل. الانتظام أهم من الطول.',
            en: 'Three rides a week of at least 40 minutes is the threshold where fitness changes show within four weeks, and weight within eight when diet is under control. Regularity matters more than duration.',
          },
        },
        {
          q: { ar: 'الدراجة بتنحّف الكرش؟', en: 'Does cycling reduce belly fat?' },
          a: {
            ar: 'مفيش حرق موضعي — الجسم بيحرق دهون من كل مكان مش من منطقة معيّنة. لكن الدراجة بتحرق دهون عمومًا، والدهون حوالين البطن غالبًا من أول اللي بتستجيب للنشاط المنتظم مع عجز في السعرات.',
            en: 'There is no spot reduction — the body draws fat from everywhere, not one area. But cycling burns fat generally, and abdominal fat is often among the first to respond to regular activity combined with a calorie deficit.',
          },
        },
        {
          q: { ar: 'أي نوع دراجة أفضل للرياضة؟', en: 'Which bike type is best for fitness?' },
          a: {
            ar: 'الهجين الرياضي أو دراجة الطريق — لأنهم أخف وبيخلوك تقطع مسافات أطول في نفس الوقت. لكن أي دراجة بتركبها بانتظام أفضل من أحسن دراجة واقفة في البلكونة.',
            en: 'A fitness hybrid or a road bike, because they are lighter and let you cover more ground in the same time. But any bike you ride regularly beats the best bike parked on the balcony.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'عايز دراجة مناسبة للرياضة في حدود ميزانيتك؟ ابعت لنا طولك وميزانيتك وهنرشّح لك موديل خفيف بيشجّعك تركب أكتر.',
      en: 'Want a bike suited to fitness within your budget? Send us your height and budget and we will suggest a light model that makes you want to ride more.',
    },
  ],
};
