export default {
  slug: 'saddle-height-setup',
  blocks: [
    {
      type: 'lead',
      ar: 'أغلب الناس بتركب بكرسي واطي جدًا. السبب إنه بيدي إحساس أمان (رجلك توصل الأرض)، لكن التمن غالي: وجع ركبة، تعب أسرع، وفقدان حوالي ٢٠٪ من قوة الدفع. ربع ساعة من الضبط الصح بتغيّر إحساسك بالدراجة تمامًا.',
      en: 'Most people ride with the saddle far too low. It feels safer because your feet reach the ground, but the price is high: knee pain, faster fatigue and roughly 20% of your pedalling power lost. Fifteen minutes of proper setup changes how the bike feels entirely.',
    },
    {
      type: 'h2',
      id: 'saddle-height',
      ar: '١. ارتفاع الكرسي — أهم ضبط على الإطلاق',
      en: '1. Saddle height — the single most important adjustment',
    },
    {
      type: 'h3', id: 'method-formula', ar: 'الطريقة الأولى: المعادلة', en: 'Method one: the formula' },
    {
      type: 'p',
      ar: 'قِس طول رجلك الداخلي (من الأرض لأعلى الفخذ وأنت واقف حافي)، واضربه في ٠.٨٨٣. النتيجة هي المسافة من مركز البدال (محور الكرنك) لأعلى سطح الكرسي، بالقياس على امتداد ماسورة الكرسي. المعادلة دي معروفة باسم معادلة LeMond وهي المرجع المتعارف عليه.',
      en: 'Measure your inseam (floor to crotch, standing barefoot) and multiply by 0.883. The result is the distance from the centre of the bottom bracket to the top of the saddle, measured along the seat tube. This is the LeMond formula, and it is the accepted reference.',
    },
    {
      type: 'table',
      caption: { ar: 'أمثلة لارتفاع الكرسي', en: 'Saddle height examples' },
      head: { ar: ['طول الرجل الداخلي', 'ارتفاع الكرسي'], en: ['Inseam', 'Saddle height'] },
      rows: {
        ar: [
          ['٧٠ سم', '٦١.٨ سم'],
          ['٧٥ سم', '٦٦.٢ سم'],
          ['٨٠ سم', '٧٠.٦ سم'],
          ['٨٥ سم', '٧٥.١ سم'],
          ['٩٠ سم', '٧٩.٥ سم'],
        ],
        en: [
          ['70 cm', '61.8 cm'],
          ['75 cm', '66.2 cm'],
          ['80 cm', '70.6 cm'],
          ['85 cm', '75.1 cm'],
          ['90 cm', '79.5 cm'],
        ],
      },
    },
    {
      type: 'h3', id: 'method-heel', ar: 'الطريقة التانية: اختبار الكعب', en: 'Method two: the heel test' },
    {
      type: 'p',
      ar: 'اقعد على الكرسي (استند على حيطة)، ولف البدال لحد ما يوصل لأوطى نقطة، وحط كعبك عليه. لازم رجلك تبقى مفرودة تمامًا والركبة مقفولة. لو لسه فيها انحناء، ارفع الكرسي. لو حوضك بيميل عشان توصل، نزّله. لما تحط مشط رجلك (وضع الركوب الطبيعي) هيبقى فيه انحناء بسيط ٢٥–٣٥ درجة — وده المطلوب بالظبط.',
      en: 'Sit on the saddle (lean on a wall), rotate the pedal to its lowest point and put your heel on it. Your leg should be completely straight with the knee locked. Still bent? Raise the saddle. Hips rocking to reach? Lower it. When you move to the ball of your foot — the normal riding position — you get a slight 25–35° knee bend, which is exactly right.',
    },
    {
      type: 'callout',
      variant: 'warn',
      ar: 'ما ترفعش الكرسي فوق علامة الحد الأدنى المحفورة على عمود الكرسي (MIN INSERT). لو اضطريت تعدّيها، يبقى مقاس الشاسيه صغير عليك أو محتاج عمود كرسي أطول — العمود ممكن يتكسر.',
      en: 'Never raise the post above the MIN INSERT line engraved on it. If you need to go past it, the frame is too small or you need a longer seat post — the post can snap.',
    },
    {
      type: 'h2',
      id: 'saddle-position',
      ar: '٢. موضع الكرسي للأمام والخلف',
      en: '2. Saddle fore–aft position',
    },
    {
      type: 'p',
      ar: 'الكرسي بينزلق قدام وورا على القضبان اللي تحته. القاعدة (KOPS): اقعد على الدراجة وخلّي البدالات أفقية، ونزّل خيط فيه تقل من مقدمة ركبتك الأمامية — المفروض يقع على محور البدال أو قدامه بـ ١ سم. لو الخيط وقع ورا المحور بكتير، حرّك الكرسي لقدام.',
      en: 'The saddle slides forward and back on its rails. The KOPS rule: sit on the bike with the cranks horizontal and drop a weighted string from the front of your forward knee — it should land on the pedal axle or up to 1 cm ahead of it. If it falls well behind the axle, slide the saddle forward.',
    },
    {
      type: 'h2',
      id: 'saddle-tilt',
      ar: '٣. ميل الكرسي',
      en: '3. Saddle tilt',
    },
    {
      type: 'p',
      ar: 'الوضع الافتراضي هو الأفقي تمامًا — حط مسطرة أو موبايل على الكرسي وشوف. لو مقدمة الكرسي مرفوعة، هيضغط على منطقة حساسة ويسبب تنميل. لو مقدمته واطية جدًا، هتلاقي نفسك بتزحلق لقدام وبتحمّل على إيديك. عدّل بدرجة أو اتنين في المرة، مش أكتر.',
      en: 'The default is dead level — lay a ruler or a phone on it and check. Nose up puts pressure on soft tissue and causes numbness. Nose too far down and you slide forward, loading your hands. Adjust one or two degrees at a time, never more.',
    },
    {
      type: 'h2',
      id: 'handlebar',
      ar: '٤. ارتفاع المقود',
      en: '4. Handlebar height',
    },
    {
      type: 'ul',
      ar: [
        'مقود أعلى من الكرسي أو في نفس مستواه = جلسة مستقيمة، أريح للظهر والرقبة، أبطأ شوية. مناسب للاستخدام اليومي.',
        'مقود أوطى من الكرسي بـ ٢–٥ سم = جلسة رياضية، قوة دفع أعلى، ضغط أكبر على الإيدين والرقبة. مناسب للمسافات والسرعة.',
        'لو ضهرك بيوجعك بعد نص ساعة، ارفع المقود قبل ما تفكر تغيّر الدراجة.',
      ],
      en: [
        'Bar level with or above the saddle: upright posture, kinder to back and neck, slightly slower. Right for daily use.',
        'Bar 2–5 cm below the saddle: a sporty position with more power but more load on hands and neck. Right for distance and speed.',
        'If your back aches after half an hour, raise the bar before you consider changing bikes.',
      ],
    },
    {
      type: 'h2',
      id: 'pain-guide',
      ar: 'دليل حل الأوجاع',
      en: 'Troubleshooting pain',
    },
    {
      type: 'table',
      caption: { ar: 'الوجع وسببه المحتمل والحل', en: 'Pain, likely cause and fix' },
      head: { ar: ['الوجع', 'السبب المحتمل', 'الحل'], en: ['Pain', 'Likely cause', 'Fix'] },
      rows: {
        ar: [
          ['مقدمة الركبة', 'الكرسي واطي جدًا أو لقدام جدًا', 'ارفع الكرسي ٥ مم وحرّكه لورا'],
          ['مؤخرة الركبة', 'الكرسي عالي جدًا', 'نزّل الكرسي ٥ مم'],
          ['أسفل الظهر', 'المقود واطي جدًا أو الشاسيه طويل', 'ارفع المقود أو استخدم مقود أقصر'],
          ['تنميل الإيدين', 'وزن زيادة على الإيدين أو مقابض رفيعة', 'ارفع المقود، واستخدم مقابض إرجونوميك'],
          ['وجع المقعدة', 'كرسي غير مناسب أو ميل غلط', 'اظبط الميل أفقي، وجرّب كرسي أعرض أو غطاء جل'],
          ['تنميل في منطقة حساسة', 'مقدمة الكرسي مرفوعة', 'نزّل مقدمة الكرسي درجة أو اتنين'],
        ],
        en: [
          ['Front of the knee', 'Saddle too low or too far forward', 'Raise the saddle 5 mm and slide it back'],
          ['Back of the knee', 'Saddle too high', 'Lower the saddle 5 mm'],
          ['Lower back', 'Bar too low or frame too long', 'Raise the bar or fit a shorter stem'],
          ['Numb hands', 'Too much weight on the hands, or thin grips', 'Raise the bar and fit ergonomic grips'],
          ['Sit-bone soreness', 'Wrong saddle or bad tilt', 'Level the tilt, try a wider saddle or a gel cover'],
          ['Soft-tissue numbness', 'Saddle nose tilted up', 'Drop the nose one or two degrees'],
        ],
      },
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'غيّر حاجة واحدة بس في المرة، وبمقدار ٥ مم كحد أقصى، وجرّب مشوار كامل قبل التغيير اللي بعده. لو غيّرت كل حاجة مرة واحدة مش هتعرف إيه اللي نفع وإيه اللي ضر.',
      en: 'Change one thing at a time, by 5 mm at most, and ride a full route before the next change. Adjust everything at once and you will never know what helped and what hurt.',
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'رجلي لازم توصل الأرض وأنا قاعد؟', en: 'Should my feet reach the ground while seated?' },
          a: {
            ar: 'لأ للكبار. الوضع الصح إنك تنزل من على الكرسي وتقف على الماسورة لما توقف. لو الكرسي واطي كفاية إن رجلك توصل الأرض وأنت قاعد، فهو واطي جدًا للدوس الكفء. للأطفال الوضع مختلف — لازم يوصلوا الأرض بمشط رجلهم.',
            en: 'Not for adults. The correct move is to come off the saddle and stand over the frame when you stop. A saddle low enough to put your feet down while seated is too low for efficient pedalling. Children are the exception — they must reach the ground with the balls of their feet.',
          },
        },
        {
          q: { ar: 'قد إيه أحتاج وقت عشان أتعوّد على الارتفاع الجديد؟', en: 'How long until I adapt to a new height?' },
          a: {
            ar: 'من ٣ لـ ٥ مشاوير. أول مرة هتحس إن الكرسي عالي وغريب — ده طبيعي. لو بعد ٥ مشاوير لسه مضايق، نزّله ٣ مم بس وجرّب تاني.',
            en: 'Three to five rides. It will feel high and strange at first — that is normal. If it still bothers you after five rides, drop it by just 3 mm and try again.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'بنظبط ارتفاع الكرسي والمقود لأي دراجة مشتراة من عندنا مجانًا، ولأي دراجة تانية بسعر رمزي في ورشتنا بالزقازيق.',
      en: 'We set saddle and bar height free on any bike bought from us, and for a nominal fee on any other bike at our Zagazig workshop.',
    },
  ],
};
