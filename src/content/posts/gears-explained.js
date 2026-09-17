export default {
  slug: 'gears-explained',
  blocks: [
    {
      type: 'lead',
      ar: 'كل واحد بيسأل «الدراجة دي كام سرعة؟» وكأن الرقم الأكبر أحسن. الحقيقة إن ٢١ سرعة مش معناها ٢١ سرعة مفيدة، وإن دراجة ٧ سرعات ممكن تكون أنسب لك من ٢٧. المقال ده بيشرح الموضوع بالمنطق مش بالأرقام.',
      en: 'Everyone asks “how many speeds does it have?” as if a bigger number is better. In reality 21 speeds does not mean 21 useful gears, and a 7-speed bike may suit you better than a 27-speed. This article explains the logic rather than the marketing.',
    },
    {
      type: 'h2', id: 'how-counted', ar: 'إزاي بيتحسب عدد السرعات؟', en: 'How the speed count is worked out' },
    {
      type: 'p',
      ar: 'عدد السرعات = عدد التروس الأمامية × عدد التروس الخلفية. دراجة بـ ٣ تروس قدام و٧ ورا = ٢١ سرعة. دراجة بترس واحد قدام و١٢ ورا = ١٢ سرعة. بس المشكلة إن التركيبات دي فيها تكرار كبير — في الواقع عندك حوالي ١٤ نسبة مفيدة من الـ ٢١، والباقي متداخل.',
      en: 'Speeds = front chainrings × rear sprockets. Three at the front and seven at the back gives 21. One at the front and twelve at the back gives 12. The catch is that those combinations overlap heavily — of a nominal 21 you get roughly 14 genuinely distinct ratios, and the rest are duplicates.',
    },
    {
      type: 'h2', id: 'what-they-do', ar: 'إيه اللي كل ترس بيعمله؟', en: 'What each sprocket does' },
    {
      type: 'ul',
      ar: [
        'الترس الأمامي الصغير = المطالع. دوس سهل جدًا لكن بطيء.',
        'الترس الأمامي المتوسط = الاستخدام العادي، ٨٠٪ من وقتك هتبقى عليه.',
        'الترس الأمامي الكبير = النزول والسرعة على المستوي. دوس تقيل وسرعة عالية.',
        'التروس الخلفية = الضبط الدقيق داخل كل نطاق. الترس الخلفي الكبير = أسهل، الصغير = أتقل.',
      ],
      en: [
        'Small front ring = climbing. Very easy to turn but slow.',
        'Middle front ring = normal riding; you will be here 80% of the time.',
        'Large front ring = descending and speed on the flat. Hard to turn, fast.',
        'Rear sprockets = fine tuning inside each range. Bigger rear = easier, smaller rear = harder.',
      ],
    },
    {
      type: 'h2', id: 'how-many', ar: 'كام سرعة تحتاج فعلًا؟', en: 'How many speeds do you actually need?' },
    {
      type: 'table',
      caption: { ar: 'عدد السرعات المناسب حسب الاستخدام', en: 'Speed count by use case' },
      head: { ar: ['الاستخدام', 'العدد المناسب', 'السبب'], en: ['Use', 'Suitable count', 'Why'] },
      rows: {
        ar: [
          ['مشاوير قصيرة على أرض مستوية', 'سرعة واحدة أو ٣', 'صيانة شبه معدومة وبساطة تامة'],
          ['استخدام يومي في المدينة', '٧ – ٨ سرعات', 'مدى كافي وصيانة سهلة'],
          ['هجين للمسافات', '١٨ – ٢١ سرعة', 'مرونة على المطالع والمستوي'],
          ['جبلي وطرق وعرة', '٢١ – ٢٧ سرعة', 'محتاج نسب صغيرة جدًا للمطالع'],
          ['جبلي حديث احترافي', '١ × ١١ أو ١ × ١٢', 'مدى واسع بترس أمامي واحد — أبسط وأخف'],
        ],
        en: [
          ['Short trips on flat ground', 'Single speed or 3', 'Almost no maintenance, total simplicity'],
          ['Daily city riding', '7 – 8 speeds', 'Enough range, easy to service'],
          ['Hybrid for distance', '18 – 21 speeds', 'Flexibility on climbs and flats'],
          ['Mountain and rough ground', '21 – 27 speeds', 'Needs very low ratios for climbing'],
          ['Modern performance mountain', '1 × 11 or 1 × 12', 'Wide range from a single ring — simpler and lighter'],
        ],
      },
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'الاتجاه الحديث في الدراجات الجبلية هو الرجوع لترس أمامي واحد (1x) مع تروس خلفية كتير. السبب إن ده بيشيل نقلة قدام كاملة، فبيقل الوزن والتعقيد والأعطال — ولسه بيديك مدى كافي. يعني «١٢ سرعة» أحدث وأفضل من «٢١ سرعة».',
      en: 'The modern trend in mountain bikes is back to a single front ring (1x) with a wide rear cassette. It removes a whole front shifter, cutting weight, complexity and failure points, while still giving enough range. So “12 speed” is newer and better than “21 speed”.',
    },
    {
      type: 'h2', id: 'how-to-use', ar: 'إزاي تستخدم السرعات صح', en: 'Using the gears properly' },
    {
      type: 'ol',
      ar: [
        'غيّر قبل ما تحتاج، مش بعدها. شوف المطلع من بعيد ونزّل السرعة وأنت لسه بتمشي بسهولة.',
        'خفّف الضغط على البدال لحظة التغيير — الجنزير محتاج يبقى مرتخي عشان ينط للترس التاني.',
        'ما تغيّرش وأنت واقف — النقلة مش هتشتغل والجنزير ممكن يقع.',
        'هدفك سرعة دوران ثابتة حوالي ٧٠–٩٠ لفة في الدقيقة. لو بتدوس ببطء وبقوة، نزّل سرعة.',
      ],
      en: [
        'Shift before you need to, not after. Spot the climb early and drop down while you are still turning easily.',
        'Ease off the pedals as you shift — the chain needs slack to jump across.',
        'Never shift while stationary — it will not engage, and the chain can drop.',
        'Aim for a steady cadence of about 70–90 rpm. If you are grinding slowly with force, shift down.',
      ],
    },
    {
      type: 'h2', id: 'cross-chaining', ar: 'الخطأ اللي بيقطع الجنازير: التقاطع', en: 'The mistake that kills chains: cross-chaining' },
    {
      type: 'p',
      ar: 'التقاطع (Cross-chaining) يعني إنك تستخدم الترس الأمامي الكبير مع الترس الخلفي الكبير، أو الأمامي الصغير مع الخلفي الصغير. في الحالتين الجنزير بيتمط بزاوية حادة، فبيصدر صوت، وبيتآكل بسرعة، وممكن يقع.',
      en: 'Cross-chaining means running the big front ring with the big rear sprocket, or the small front with the small rear. Either way the chain is pulled at a sharp angle: it rattles, wears fast and can drop off.',
    },
    {
      type: 'ul',
      ar: [
        'الترس الأمامي الصغير → استخدم التروس الخلفية الكبيرة والمتوسطة.',
        'الترس الأمامي المتوسط → استخدم كل التروس الخلفية تقريبًا.',
        'الترس الأمامي الكبير → استخدم التروس الخلفية الصغيرة والمتوسطة.',
        'القاعدة البسيطة: لو سمعت صوت طقطقة مستمر، إنت متقاطع — غيّر النقلة الأمامية.',
      ],
      en: [
        'Small front ring → use the large and middle rear sprockets.',
        'Middle front ring → almost the whole rear range is fine.',
        'Large front ring → use the small and middle rear sprockets.',
        'The simple rule: constant rattling means you are cross-chained — change the front ring.',
      ],
    },
    {
      type: 'h2', id: 'internal-hub', ar: 'السرعات الداخلية: البديل بدون صيانة', en: 'Internal hub gears: the maintenance-free alternative' },
    {
      type: 'p',
      ar: 'في دراجات المدينة بتلاقي ٣ أو ٧ سرعات مخبّاة جوه الطرمبة الخلفية بدل التروس المكشوفة. مميزاتها: بتقدر تغيّر وأنت واقف، مفيش تروس مكشوفة تتربّش أو تصدي، وصيانتها شبه معدومة. عيوبها: مدى أضيق، وزن أعلى، وتصليحها محتاج ورشة متخصصة.',
      en: 'City bikes often hide 3 or 7 speeds inside the rear hub instead of exposed sprockets. The upsides: you can shift while stationary, there is nothing exposed to dirt or rust, and maintenance is almost nil. The downsides: a narrower range, more weight, and repairs need a specialist workshop.',
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'الدراجة بتطقطق وأنا بغيّر السرعات — ليه؟', en: 'My gears rattle when I shift — why?' },
          a: {
            ar: 'أشهر سببين: النقلة محتاجة معايرة (بيتظبط بمفتاح صغير على السلك عند النقلة الخلفية)، أو إنك متقاطع (Cross-chaining). جرّب تغيّر النقلة الأمامية الأول؛ لو الصوت فضل، الدراجة محتاجة معايرة.',
            en: 'Two common causes: the derailleur needs indexing (adjusted with the barrel adjuster on the cable), or you are cross-chained. Change the front ring first; if the noise persists, the bike needs indexing.',
          },
        },
        {
          q: { ar: 'الجنزير بيقع كل شوية', en: 'My chain keeps dropping off' },
          a: {
            ar: 'غالبًا مسامير الحد (Limit screws) في النقلة الأمامية مش مظبوطة، أو الجنزير مستهلك ومتمدد. الاتنين بيتظبطوا في الورشة في أقل من نص ساعة.',
            en: 'Usually the limit screws on the front derailleur are out of adjustment, or the chain is worn and stretched. Both are fixed in a workshop in under half an hour.',
          },
        },
        {
          q: { ar: 'أقدر أزوّد عدد السرعات في دراجتي؟', en: 'Can I add more speeds to my bike?' },
          a: {
            ar: 'نظريًا نعم، لكن عمليًا التكلفة غالبًا بتقرب من ثمن دراجة أحسن. تغيير من ٧ لـ ٩ سرعات محتاج طقم تروس ونقلة ونقالة وجنزير جديد، وأحيانًا جنط خلفي. لو الدراجة أساسها كويس، ممكن يستاهل؛ غير كده اشتري دراجة.',
            en: 'In theory yes, but in practice the cost usually approaches that of a better bike. Going from 7 to 9 speeds needs a new cassette, derailleur, shifter and chain, and sometimes a new rear wheel. Worth it if the base bike is good; otherwise buy the better bike.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'مش عارف تختار عدد السرعات؟ قول لنا بتركب فين وفيه مطالع ولا لأ، وهنقول لك المناسب من غير ما تدفع في حاجة مش محتاجها.',
      en: 'Unsure how many speeds you need? Tell us where you ride and whether there are climbs, and we will point you at the right option without paying for what you will not use.',
    },
  ],
};
