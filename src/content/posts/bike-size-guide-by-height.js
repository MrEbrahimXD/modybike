export default {
  slug: 'bike-size-guide-by-height',
  blocks: [
    {
      type: 'lead',
      ar: 'أكتر سؤال بيوصلنا في المعرض هو: «أنا طولي كذا — أجيب مقاس كام؟». الإجابة القصيرة إن الأطفال بيتقاسوا بمقاس الجنط، والكبار بيتقاسوا بمقاس الشاسيه. الإجابة الطويلة — وهي اللي هتخليك تشتري صح من أول مرة — في المقال ده.',
      en: 'The question we hear most in the showroom is: “I am this tall — which size do I need?” The short answer is that children are sized by wheel diameter and adults by frame size. The long answer — the one that gets you the right bike first time — is below.',
    },
    {
      type: 'h2',
      id: 'quick-answer',
      ar: 'الإجابة السريعة',
      en: 'The quick answer',
    },
    {
      type: 'p',
      ar: 'لو مستعجل، الجدولين دول هيوصلوك لـ ٩٠٪ من الإجابة الصحيحة. باقي المقال بيشرح الـ ١٠٪ الباقية — وهي اللي بتفرق بين دراجة «ماشية» ودراجة مريحة فعلًا.',
      en: 'If you are in a hurry, the two tables below get you 90% of the way there. The rest of this article covers the remaining 10% — which is the difference between a bike that works and a bike that is genuinely comfortable.',
    },
    {
      type: 'table',
      caption: { ar: 'مقاسات دراجات الأطفال حسب الطول والعمر', en: 'Kids bike sizes by height and age' },
      head: {
        ar: ['مقاس الجنط', 'العمر التقريبي', 'طول الطفل', 'طول الرجل الداخلي'],
        en: ['Wheel size', 'Approx. age', 'Child height', 'Inseam'],
      },
      rows: {
        ar: [
          ['١٢ بوصة', '٢ – ٤ سنوات', '٨٥ – ١٠٠ سم', '٣٥ – ٤٢ سم'],
          ['١٤ بوصة', '٣ – ٥ سنوات', '٩٥ – ١١٠ سم', '٤٠ – ٤٨ سم'],
          ['١٦ بوصة', '٤ – ٦ سنوات', '١٠٥ – ١٢٠ سم', '٤٥ – ٥٥ سم'],
          ['١٨ بوصة', '٥ – ٧ سنوات', '١١٢ – ١٢٧ سم', '٥٠ – ٦٠ سم'],
          ['٢٠ بوصة', '٦ – ٩ سنوات', '١٢٠ – ١٣٥ سم', '٥٥ – ٦٣ سم'],
          ['٢٤ بوصة', '٨ – ١٢ سنة', '١٣٥ – ١٥٠ سم', '٦٢ – ٧٢ سم'],
          ['٢٦ بوصة', '١١ سنة فأكثر', '١٤٥ – ١٦٥ سم', '٧٠ – ٧٨ سم'],
        ],
        en: [
          ['12 in', '2 – 4 years', '85 – 100 cm', '35 – 42 cm'],
          ['14 in', '3 – 5 years', '95 – 110 cm', '40 – 48 cm'],
          ['16 in', '4 – 6 years', '105 – 120 cm', '45 – 55 cm'],
          ['18 in', '5 – 7 years', '112 – 127 cm', '50 – 60 cm'],
          ['20 in', '6 – 9 years', '120 – 135 cm', '55 – 63 cm'],
          ['24 in', '8 – 12 years', '135 – 150 cm', '62 – 72 cm'],
          ['26 in', '11 years +', '145 – 165 cm', '70 – 78 cm'],
        ],
      },
    },
    {
      type: 'table',
      caption: { ar: 'مقاسات شاسيه الكبار — دراجات جبلية وهجين', en: 'Adult frame sizes — mountain and hybrid' },
      head: {
        ar: ['طول الراكب', 'مقاس الشاسيه', 'الرمز', 'مقاس الجنط المناسب'],
        en: ['Rider height', 'Frame size', 'Label', 'Suggested wheel'],
      },
      rows: {
        ar: [
          ['١٤٨ – ١٥٨ سم', '١٣ – ١٤ بوصة', 'XS', '٢٦ بوصة'],
          ['١٥٨ – ١٦٨ سم', '١٥ – ١٦ بوصة', 'S', '٢٦ بوصة'],
          ['١٦٨ – ١٧٨ سم', '١٧ – ١٨ بوصة', 'M', '٢٦ أو ٢٧.٥ بوصة'],
          ['١٧٨ – ١٨٥ سم', '١٩ – ٢٠ بوصة', 'L', '٢٧.٥ أو ٢٩ بوصة'],
          ['١٨٥ – ١٩٥ سم', '٢١ – ٢٢ بوصة', 'XL', '٢٩ بوصة'],
          ['١٩٥ سم فأكثر', '٢٣ بوصة فأكثر', 'XXL', '٢٩ بوصة'],
        ],
        en: [
          ['148 – 158 cm', '13 – 14 in', 'XS', '26 in'],
          ['158 – 168 cm', '15 – 16 in', 'S', '26 in'],
          ['168 – 178 cm', '17 – 18 in', 'M', '26 or 27.5 in'],
          ['178 – 185 cm', '19 – 20 in', 'L', '27.5 or 29 in'],
          ['185 – 195 cm', '21 – 22 in', 'XL', '29 in'],
          ['195 cm +', '23 in +', 'XXL', '29 in'],
        ],
      },
    },
    {
      type: 'h2',
      id: 'why-inseam',
      ar: 'ليه طول الرجل الداخلي أدق من الطول الكلي؟',
      en: 'Why inseam beats total height',
    },
    {
      type: 'p',
      ar: 'اتنين طولهم ١٧٥ سم ممكن يكون فرق طول رجلهم الداخلي ٨ سم كاملة — واحد بجذع طويل ورجلين قصيرة والتاني العكس. والدراجة بتتعامل مع رجلك مش مع جذعك، فطول الرجل الداخلي هو الرقم اللي بيحدد ارتفاع الكرسي وأقصى مقاس شاسيه تقدر تركبه بأمان.',
      en: 'Two riders who are both 175 cm can differ by a full 8 cm in inseam — one has a long torso and short legs, the other the reverse. The bike interacts with your legs, not your torso, so inseam is the number that determines saddle height and the largest frame you can safely straddle.',
    },
    {
      type: 'h3',
      id: 'how-to-measure',
      ar: 'طريقة القياس الصحيحة (دقيقتين)',
      en: 'How to measure properly (two minutes)',
    },
    {
      type: 'ol',
      ar: [
        'اقف حافي وضهرك على الحيطة، ورجليك متباعدة حوالي ١٥ سم.',
        'حط كتاب بين رجليك واضغطه لفوق برفق — زي ما يكون كرسي الدراجة.',
        'علّم على الحيطة عند حرف الكتاب العلوي.',
        'قِس من الأرض للعلامة بالمتر. ده هو طول الرجل الداخلي (Inseam).',
        'كرر القياس مرتين وخُد المتوسط — الفرق بيوصل لـ ٢ سم لو استعجلت.',
      ],
      en: [
        'Stand barefoot with your back to a wall and your feet about 15 cm apart.',
        'Place a book between your legs and press it gently upward, the way a saddle would sit.',
        'Mark the wall at the top edge of the book.',
        'Measure from the floor to the mark. That is your inseam.',
        'Repeat twice and take the average — rushing it can be 2 cm out.',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'قاعدة سريعة: طول الرجل الداخلي ≈ ٤٥٪ من الطول الكلي للبالغين. لو طولك ١٧٥ سم، توقّع رجل داخلي حوالي ٧٩ سم. استخدم الرقم ده كتقدير لو مش هتقيس.',
      en: 'Rule of thumb: inseam ≈ 45% of total height for adults. At 175 cm, expect an inseam around 79 cm. Use that as an estimate if you will not measure.',
    },
    {
      type: 'h2',
      id: 'formulas',
      ar: 'المعادلات اللي بيستخدمها الفنيين',
      en: 'The formulas mechanics use',
    },
    {
      type: 'ul',
      ar: [
        'ارتفاع الكرسي (من مركز البدال لأعلى السرج) = طول الرجل الداخلي × ٠.٨٨٣ — دي معادلة LeMond وهي المعيار المتعارف عليه.',
        'مقاس شاسيه الجبلي بالبوصة ≈ طول الرجل الداخلي (سم) × ٠.٢٢٦.',
        'مقاس شاسيه دراجة الطريق بالسنتيمتر ≈ طول الرجل الداخلي (سم) × ٠.٦٦٥.',
      ],
      en: [
        'Saddle height (bottom bracket centre to saddle top) = inseam × 0.883 — the LeMond formula, and the accepted standard.',
        'Mountain frame size in inches ≈ inseam (cm) × 0.226.',
        'Road frame size in centimetres ≈ inseam (cm) × 0.665.',
      ],
    },
    {
      type: 'p',
      ar: 'مثال: راكب طوله ١٧٨ سم وطول رجله الداخلي ٨١ سم. ارتفاع الكرسي = ٨١ × ٠.٨٨٣ = ٧١.٥ سم. مقاس الشاسيه الجبلي = ٨١ × ٠.٢٢٦ = ١٨.٣ بوصة، يعني شاسيه ١٨ أو ١٩ بوصة (مقاس L).',
      en: 'Example: a rider 178 cm tall with an 81 cm inseam. Saddle height = 81 × 0.883 = 71.5 cm. Mountain frame = 81 × 0.226 = 18.3 in, so an 18 or 19 inch frame (size L).',
    },
    {
      type: 'h2',
      id: 'standover',
      ar: 'اختبار الوقوف فوق الشاسيه (Standover)',
      en: 'The standover test',
    },
    {
      type: 'p',
      ar: 'ده أهم اختبار عملي وبيتعمل في ثانية واحدة: اقف فوق الدراجة ورجليك على الأرض على جنبي الشاسيه. لازم يكون فيه مسافة بين جسمك وماسورة الشاسيه العليا. لو الماسورة ملزوقة فيك، المقاس كبير عليك — ودي مش مسألة راحة، دي مسألة أمان لو اضطريت تنزل فجأة.',
      en: 'This is the most important practical check and it takes one second: stand over the bike with both feet flat on the ground either side of the frame. There must be clearance between you and the top tube. If the tube touches you, the frame is too big — and this is a safety issue, not a comfort one, the moment you have to stop suddenly.',
    },
    {
      type: 'table',
      caption: { ar: 'الخلوص المطلوب فوق الشاسيه', en: 'Required standover clearance' },
      head: { ar: ['نوع الدراجة', 'المسافة المطلوبة'], en: ['Bike type', 'Clearance needed'] },
      rows: {
        ar: [
          ['دراجة طريق (سباق)', '٢ – ٣ سم'],
          ['دراجة هجين', '٢ – ٥ سم'],
          ['دراجة جبلية', '٥ – ١٠ سم'],
          ['دراجة أطفال', '٣ – ٥ سم'],
        ],
        en: [
          ['Road bike', '2 – 3 cm'],
          ['Hybrid', '2 – 5 cm'],
          ['Mountain bike', '5 – 10 cm'],
          ['Kids bike', '3 – 5 cm'],
        ],
      },
    },
    {
      type: 'h2',
      id: 'between-sizes',
      ar: 'لو طولك على الحد بين مقاسين',
      en: 'If you fall between two sizes',
    },
    {
      type: 'ul',
      ar: [
        'اختار الأصغر لو: بتحب التحكم والرشاقة، أو بتنزل طرق وعرة، أو جذعك قصير ورجلك طويلة.',
        'اختار الأكبر لو: بتمشي مسافات طويلة على الأسفلت، أو جذعك طويل، أو بتفضّل جلسة ممدودة مريحة.',
        'في الشك، اختار الأصغر. دراجة صغيرة شوية ممكن تتظبط بعمود كرسي أطول ومقود أبعد؛ دراجة كبيرة شوية ما فيش حل ليها.',
      ],
      en: [
        'Go smaller if: you want control and agility, you ride rough ground, or you have a short torso and long legs.',
        'Go larger if: you cover long distances on tarmac, you have a long torso, or you prefer a stretched, relaxed position.',
        'When in doubt, go smaller. A slightly small bike can be corrected with a longer seat post and a longer stem; a slightly large bike cannot be fixed at all.',
      ],
    },
    {
      type: 'h2',
      id: 'mistakes',
      ar: 'أشهر ٥ أخطاء في اختيار المقاس',
      en: 'The five most common sizing mistakes',
    },
    {
      type: 'ol',
      ar: [
        'شراء مقاس أكبر للطفل «عشان يكبر فيه». الطفل مش هيقدر يتحكم في الفرامل ولا يوصل الأرض، وأول وقعة هتخوّفه من الدراجة لسنة كاملة.',
        'الاعتماد على العمر بدل الطول. طفلين عندهم ٧ سنين ممكن يكون بينهم فرق ١٥ سم في الطول — الطول هو المعيار.',
        'الاعتماد على مقاس الجنط في دراجات الكبار. جنط ٢٩ بوصة ممكن يتباع على شاسيه ١٥ بوصة أو ٢١ بوصة — الجنط مش مقاس الدراجة.',
        'إهمال ارتفاع الكرسي بعد الشراء. أغلب الناس بتركب بكرسي واطي جدًا، وده بيسبب وجع ركبة ويقلل قوة الدفع ٢٠٪ تقريبًا.',
        'مقارنة المقاسات بين الماركات كأنها ثابتة. شاسيه ١٧ بوصة عند ماركة ممكن يساوي ١٨ عند ماركة تانية — جرّب الدراجة نفسها لو تقدر.',
      ],
      en: [
        'Buying a child a size up “to grow into”. They cannot reach the brakes or the ground, and the first fall puts them off riding for a year.',
        'Sizing by age instead of height. Two seven-year-olds can differ by 15 cm — height is the measure.',
        'Using wheel size to size an adult bike. A 29-inch wheel is sold on 15-inch and 21-inch frames alike — the wheel is not the bike size.',
        'Ignoring saddle height after purchase. Most people ride far too low, which causes knee pain and costs roughly 20% of your pedalling power.',
        'Treating frame sizes as comparable across brands. A 17-inch frame from one maker can equal an 18-inch from another — try the actual bike where you can.',
      ],
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'طولي ١٧٠ سم — أجيب مقاس كام؟', en: 'I am 170 cm — what size do I need?' },
          a: {
            ar: 'شاسيه ١٧ بوصة (مقاس M) لدراجة جبلية أو هجين، أو شاسيه ٥٤–٥٥ سم لدراجة طريق. مقاس الجنط المناسب ٢٦ أو ٢٧.٥ بوصة.',
            en: 'A 17-inch frame (size M) for a mountain or hybrid bike, or a 54–55 cm frame for a road bike. Either 26 or 27.5 inch wheels will suit you.',
          },
        },
        {
          q: { ar: 'هل مقاس الجنط هو مقاس الدراجة؟', en: 'Is wheel size the same as bike size?' },
          a: {
            ar: 'لأ — ودي أشهر نقطة لبس. في دراجات الأطفال المقاسين مرتبطين عمليًا، لكن في دراجات الكبار مقاس الجنط (٢٦ / ٢٧.٥ / ٢٩) بيحدد سلوك الدراجة، ومقاس الشاسيه (بالبوصة أو السنتيمتر) هو اللي بيحدد إذا كانت بتناسب طولك.',
            en: 'No — and this is the most common confusion. On kids bikes the two are effectively linked, but on adult bikes the wheel size (26 / 27.5 / 29) determines how the bike behaves, while the frame size in inches or centimetres determines whether it fits you.',
          },
        },
        {
          q: { ar: 'إزاي أعرف إن الكرسي على الارتفاع الصح؟', en: 'How do I know the saddle is at the right height?' },
          a: {
            ar: 'وأنت قاعد على الكرسي وكعبك على البدال في أوطى وضع، لازم رجلك تبقى مفرودة تمامًا. ولما تحط مشط رجلك (الوضع الطبيعي للركوب) هيفضل انحناء بسيط في الركبة بحوالي ٢٥–٣٥ درجة — وده الصح.',
            en: 'Sitting on the saddle with your heel on the pedal at its lowest point, your leg should be completely straight. Moving to the ball of your foot — the normal riding position — leaves a slight 25–35° bend in the knee, which is correct.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'مش متأكد من المقاس؟ استخدم حاسبة المقاسات في الموقع، أو ابعت لنا طولك على واتساب وهنرشّح لك الموديلات المناسبة بالظبط.',
      en: 'Still unsure? Use the size calculator on this site, or send us your height on WhatsApp and we will shortlist the models that actually fit.',
    },
  ],
};
