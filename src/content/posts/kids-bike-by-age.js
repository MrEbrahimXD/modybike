export default {
  slug: 'kids-bike-by-age',
  blocks: [
    {
      type: 'lead',
      ar: 'شراء دراجة لطفل مختلف تمامًا عن شراء دراجة لنفسك. الطفل بيكبر بسرعة، والإغراء إنك تشتري مقاس أكبر «عشان يكبر فيه» كبير جدًا — وده بالظبط أخطر قرار ممكن تاخده. المقال ده بيشرح إزاي تختار صح، خطوة بخطوة.',
      en: 'Buying a bike for a child is nothing like buying one for yourself. Children grow fast, and the temptation to buy a size up “to grow into” is strong — which is precisely the most dangerous decision you can make. This guide walks through choosing properly, step by step.',
    },
    {
      type: 'h2',
      id: 'height-not-age',
      ar: 'القاعدة الأولى: الطول مش العمر',
      en: 'Rule one: height, not age',
    },
    {
      type: 'p',
      ar: 'طفلين عندهم ٦ سنين ممكن يكون بينهم فرق ١٥ سم في الطول. لو اخترت بالعمر، واحد فيهم هيركب دراجة كبيرة عليه بشكل خطر. كل جداول المصنّعين بتحط العمر كإرشاد تقريبي بس — الطول وطول الرجل الداخلي هما الرقمين اللي بتتبني عليهم القرار.',
      en: 'Two six-year-olds can differ by 15 cm in height. Choose by age and one of them ends up on a bike that is dangerously large. Every manufacturer’s chart lists age only as a rough guide — height and inseam are the numbers the decision actually rests on.',
    },
    {
      type: 'table',
      caption: { ar: 'جدول اختيار دراجة الطفل', en: 'Kids bike selection chart' },
      head: {
        ar: ['مقاس الجنط', 'العمر التقريبي', 'طول الطفل', 'طول الرجل الداخلي', 'نوع الفرامل المناسب'],
        en: ['Wheel size', 'Approx. age', 'Child height', 'Inseam', 'Suitable brakes'],
      },
      rows: {
        ar: [
          ['دراجة توازن ١٢"', 'سنة ونص – ٣ سنوات', '٨٠ – ٩٥ سم', '٣٠ – ٤٠ سم', 'بدون / فرامل يد خفيفة'],
          ['١٢ بوصة', '٢ – ٤ سنوات', '٨٥ – ١٠٠ سم', '٣٥ – ٤٢ سم', 'فرامل رجل (كوستر)'],
          ['١٤ بوصة', '٣ – ٥ سنوات', '٩٥ – ١١٠ سم', '٤٠ – ٤٨ سم', 'كوستر + فرامل يد'],
          ['١٦ بوصة', '٤ – ٦ سنوات', '١٠٥ – ١٢٠ سم', '٤٥ – ٥٥ سم', 'فرامل كفة أمامي وخلفي'],
          ['١٨ بوصة', '٥ – ٧ سنوات', '١١٢ – ١٢٧ سم', '٥٠ – ٦٠ سم', 'فرامل كفة'],
          ['٢٠ بوصة', '٦ – ٩ سنوات', '١٢٠ – ١٣٥ سم', '٥٥ – ٦٣ سم', 'فرامل كفة (وبداية السرعات)'],
          ['٢٤ بوصة', '٨ – ١٢ سنة', '١٣٥ – ١٥٠ سم', '٦٢ – ٧٢ سم', 'كفة أو قرصية'],
          ['٢٦ بوصة', '١١ سنة فأكثر', '١٤٥ سم فأكثر', '٧٠ سم فأكثر', 'قرصية'],
        ],
        en: [
          ['Balance bike 12"', '18 months – 3 yrs', '80 – 95 cm', '30 – 40 cm', 'None / light hand brake'],
          ['12 in', '2 – 4 years', '85 – 100 cm', '35 – 42 cm', 'Coaster (back-pedal)'],
          ['14 in', '3 – 5 years', '95 – 110 cm', '40 – 48 cm', 'Coaster + hand brake'],
          ['16 in', '4 – 6 years', '105 – 120 cm', '45 – 55 cm', 'V-brakes front and rear'],
          ['18 in', '5 – 7 years', '112 – 127 cm', '50 – 60 cm', 'V-brakes'],
          ['20 in', '6 – 9 years', '120 – 135 cm', '55 – 63 cm', 'V-brakes (gears appear here)'],
          ['24 in', '8 – 12 years', '135 – 150 cm', '62 – 72 cm', 'V-brake or disc'],
          ['26 in', '11 years +', '145 cm +', '70 cm +', 'Disc'],
        ],
      },
    },
    {
      type: 'h2',
      id: 'the-two-tests',
      ar: 'الاختبارين اللي لازم تعملهم في المحل',
      en: 'The two tests to run in the shop',
    },
    {
      type: 'h3',
      id: 'test-ground',
      ar: '١. اختبار الوصول للأرض',
      en: '1. The ground-reach test',
    },
    {
      type: 'p',
      ar: 'خلّي الطفل يقعد على الكرسي في أوطى وضع. المفروض يوصل للأرض بمشط رجليه الاتنين على الأقل. لو بيوصل بأطراف صوابعه بالعافية، المقاس كبير. لو رجله مفرودة تمامًا وركبته مقفولة، المقاس صغير.',
      en: 'Sit the child on the saddle at its lowest setting. They should reach the ground with the balls of both feet at minimum. If they are barely touching with their toes, the bike is too big. If their legs are locked straight, it is too small.',
    },
    {
      type: 'h3',
      id: 'test-standover',
      ar: '٢. اختبار الوقوف فوق الشاسيه',
      en: '2. The standover test',
    },
    {
      type: 'p',
      ar: 'خلّي الطفل يقف فوق الدراجة (مش على الكرسي) ورجليه على الأرض على الجانبين. لازم يكون فيه من ٣ لـ ٥ سم بين جسمه وماسورة الشاسيه العليا. المسافة دي هي اللي بتحميه لما ينزل من الدراجة فجأة.',
      en: 'Have the child stand over the frame — not on the saddle — with both feet flat. There should be 3–5 cm between them and the top tube. That gap is what protects them when they step off the bike in a hurry.',
    },
    {
      type: 'callout',
      variant: 'warn',
      ar: 'ليه شراء مقاس أكبر خطر؟ الطفل اللي مش بيوصل الأرض ما بيقدرش يوقف نفسه لما يفقد التوازن، وذراعه القصيرة بتخليه يشد الفرامل بزاوية غلط فما يقدرش يضغط بقوة كافية. النتيجة: وقعات أكتر، وخوف من الدراجة بيستمر شهور. مقاس صح دلوقتي أرخص من دراجة الطفل خايف يركبها.',
      en: 'Why is buying big dangerous? A child who cannot reach the ground cannot catch themselves when balance goes, and short arms mean they pull the brake lever at a bad angle and cannot squeeze hard enough. The result is more falls and a fear of the bike that lasts months. The right size now costs less than a bike your child refuses to ride.',
    },
    {
      type: 'h2',
      id: 'balance-first',
      ar: 'دراجة التوازن: لماذا بقت الخطوة الأولى المفضّلة',
      en: 'Balance bikes: why they became the preferred first step',
    },
    {
      type: 'p',
      ar: 'دراجة التوازن دراجة بدون بدالات ولا جنزير — الطفل بيدفع برجليه على الأرض وبيرفعهم لما يمشي. المهارة الصعبة في ركوب الدراجة هي التوازن مش الدوس، والعجل المساعد بيأجل تعلّم التوازن بدل ما يعلّمه. أغلب الأطفال اللي بيبدأوا بدراجة توازن بيركبوا دراجة عادية من غير عجل مساعد في أول يوم تقريبًا.',
      en: 'A balance bike has no pedals and no chain — the child pushes along with their feet and lifts them once rolling. The hard skill in cycling is balance, not pedalling, and training wheels postpone learning balance rather than teaching it. Most children who start on a balance bike move to a pedal bike without training wheels almost on day one.',
    },
    {
      type: 'ul',
      ar: [
        'العمر المناسب للبدء: من سنة ونص لسنتين، لما الطفل يقدر يمشي بثبات.',
        'المقاس: الكرسي لازم يكون أقل من طول رجل الطفل بـ ٢–٣ سم عشان يقدر يدفع.',
        'المدة: من ٦ شهور لسنة قبل الانتقال للبدالات.',
        'ما تشتريش دراجة توازن ثقيلة — لو وزنها أكتر من ٣٠٪ من وزن الطفل هتبقى صعبة عليه.',
      ],
      en: [
        'Best starting age: 18 months to 2 years, once the child walks confidently.',
        'Sizing: the saddle should sit 2–3 cm below their inseam so they can push off.',
        'Duration: six months to a year before moving to pedals.',
        'Avoid heavy balance bikes — above about 30% of the child’s body weight they become a struggle.',
      ],
    },
    {
      type: 'h2',
      id: 'weight-matters',
      ar: 'الوزن: المعيار المنسي',
      en: 'Weight: the forgotten criterion',
    },
    {
      type: 'p',
      ar: 'دراجة أطفال ١٦ بوصة رخيصة ممكن توزن ١٢ كجم، وطفل عنده ٥ سنين وزنه ١٨ كجم. يعني الدراجة تلتين وزنه تقريبًا — تخيّل إنك تركب دراجة وزنها ٥٠ كجم. الوزن الزيادة بيخلي الطفل يتعب بسرعة، ويصعّب عليه يرفع الدراجة لو وقعت، ويقلل حماسه.',
      en: 'A cheap 16-inch kids bike can weigh 12 kg, while a five-year-old weighs around 18 kg. That is roughly two-thirds of their body weight — imagine riding a 50 kg bike yourself. The extra mass tires them quickly, makes the bike hard to pick up after a fall, and drains their enthusiasm.',
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'القاعدة: حاول وزن الدراجة ما يزيدش عن ٤٠٪ من وزن الطفل. شاسيه الألومنيوم بيوفّر من ١.٥ لـ ٢.٥ كجم مقارنة بالصلب، والفرق ده بيتحس فورًا.',
      en: 'The rule: keep the bike under about 40% of the child’s body weight. An alloy frame saves 1.5–2.5 kg over steel, and that difference is felt immediately.',
    },
    {
      type: 'h2',
      id: 'brakes-for-kids',
      ar: 'الفرامل المناسبة لكل سن',
      en: 'The right brakes for each age',
    },
    {
      type: 'ul',
      ar: [
        'من ٢ لـ ٤ سنين: فرامل رجل (كوستر) — الطفل بيدوس البدال عكس فبتقف الدراجة. أسهل حاجة لإيد صغيرة لسه ضعيفة.',
        'من ٤ لـ ٦ سنين: كوستر + فرامل يد، عشان يتعلّم يستخدم اليد تدريجيًا.',
        'من ٦ سنين فأكثر: فرامل يد بس، لكن تأكد إن مقبض الفرامل بيتظبط قريب من المقود عشان إيد الطفل توصله وتضغطه بقوة.',
      ],
      en: [
        'Ages 2–4: coaster brakes — pedal backwards and the bike stops. The easiest option for small, weak hands.',
        'Ages 4–6: coaster plus a hand brake, so they learn the hand brake gradually.',
        'Ages 6 and up: hand brakes only, but check the lever reach adjusts close enough to the bar for their hands to grip and squeeze properly.',
      ],
    },
    {
      type: 'h2',
      id: 'training-wheels',
      ar: 'العجل المساعد: إمتى تشيله؟',
      en: 'Training wheels: when to take them off',
    },
    {
      type: 'p',
      ar: 'مش بشرط تستنى سن معيّن. الطريقة الأسرع: نزّل العجل المساعد تدريجيًا كل أسبوعين حوالي ٥ مم لحد ما يبقى شبه ما بيلمسش الأرض — الطفل ساعتها بيكون بيوازن لوحده من غير ما يحس. بعدها شيلهم خالص في يوم مفيهوش ضغط، وشيل البدالات كمان لمدة ساعتين وخلّيه يدفع برجليه.',
      en: 'There is no magic age. The fastest method: lower the training wheels about 5 mm every couple of weeks until they barely touch the ground — by then the child is balancing unaided without realising it. Then remove them entirely on a low-pressure day, and take the pedals off for a couple of hours so they can push along first.',
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'ابني عنده ٦ سنين — أجيب له ١٦ ولا ٢٠ بوصة؟', en: 'My child is 6 — 16 or 20 inch?' },
          a: {
            ar: 'قِس طوله. لو من ١٠٥ لـ ١٢٠ سم يبقى ١٦ بوصة. لو من ١٢٠ لـ ١٣٥ سم يبقى ٢٠ بوصة. لو على الحد بالظبط (حوالي ١٢٠ سم)، اختار ١٦ بوصة لو لسه بيتعلّم، و٢٠ بوصة لو بيركب بثقة من سنة.',
            en: 'Measure their height. 105–120 cm means 16 inch; 120–135 cm means 20 inch. If they are right on the boundary at about 120 cm, take the 16 if they are still learning and the 20 if they have been riding confidently for a year.',
          },
        },
        {
          q: { ar: 'الدراجة هتقعد معاه قد إيه قبل ما تصغر عليه؟', en: 'How long will the bike last before they outgrow it?' },
          a: {
            ar: 'من سنة ونص لسنتين في المتوسط لو اخترت المقاس صح واستغليت مدى تعديل الكرسي بالكامل. الأطفال بيكبروا من ٥ لـ ٧ سم في السنة في المرحلة دي.',
            en: 'On average 18 months to two years if you size correctly and use the full saddle adjustment range. Children grow roughly 5–7 cm a year at this stage.',
          },
        },
        {
          q: { ar: 'هل الخوذة ضرورية للأطفال؟', en: 'Is a helmet essential for children?' },
          a: {
            ar: 'أيوة، وهي أهم حاجة تشتريها بعد الدراجة نفسها. خوذة الأطفال بتغطي مؤخرة الرأس أكتر من خوذة الكبار لأن الأطفال بيقعوا للخلف أكتر. تأكد إنها مظبوطة: صباعين فوق الحاجب، والحزام بيعمل حرف V تحت الودن، وتدخل صباع واحد بين الحزام والذقن.',
            en: 'Yes — it is the most important thing you buy after the bike itself. Kids helmets have deeper rear coverage than adult ones because children fall backwards more. Check the fit: two fingers above the eyebrow, the straps forming a V under each ear, and one finger between strap and chin.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'ابعت لنا طول طفلك وعمره على واتساب، وهنرشّح لك المقاس المناسب والموديلات المتاحة بالسعر.',
      en: 'Send us your child’s height and age on WhatsApp and we will recommend the right size and the models available, with prices.',
    },
  ],
};
