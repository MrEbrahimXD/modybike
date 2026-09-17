export default {
  slug: 'bike-lock-security',
  blocks: [
    {
      type: 'lead',
      ar: 'مفيش قفل ما بيتفتحش — كل اللي القفل بيعمله إنه بيخلي سرقة دراجتك تاخد وقت وصوت ومجهود أكتر من دراجة تانية جنبها. الهدف مش المستحيل، الهدف إنك تبقى الخيار الصعب. وده بيتحقق بقفل كويس وطريقة ربط صح.',
      en: 'No lock is unbreakable — all a lock does is make stealing your bike take more time, more noise and more effort than the bike next to it. The goal is not impossibility, it is being the harder target. A decent lock plus the right locking technique achieves that.',
    },
    {
      type: 'h2', id: 'types', ar: 'أنواع الأقفال ومقارنتها', en: 'Lock types compared' },
    {
      type: 'table',
      caption: { ar: 'مقارنة أنواع أقفال الدراجات', en: 'Bike lock comparison' },
      head: {
        ar: ['النوع', 'مقاومة القطع', 'الوزن', 'المرونة في الربط', 'الأنسب لـ'],
        en: ['Type', 'Cut resistance', 'Weight', 'Locking flexibility', 'Best for'],
      },
      rows: {
        ar: [
          ['قفل حرف U', 'الأعلى', 'متوسط (١ – ١.٥ كجم)', 'محدودة (قصير)', 'وقفات طويلة في الشارع'],
          ['جنزير ثقيل ٨ مم+', 'عالية', 'الأتقل (١.٥ – ٣ كجم)', 'ممتازة (طويل)', 'الوقوف عند أعمدة بعيدة'],
          ['جنزير خفيف ٤–٦ مم', 'متوسطة', 'خفيف', 'جيدة', 'وقفات قصيرة'],
          ['كابل معدني', 'منخفضة', 'الأخف', 'ممتازة', 'وقفة دقايق أو تأمين الجنط'],
          ['قفل مطوي (Folding)', 'عالية', 'متوسط', 'جيدة', 'توازن بين الأمان والحجم'],
        ],
        en: [
          ['U-lock', 'Highest', 'Medium (1 – 1.5 kg)', 'Limited (short reach)', 'Long street stops'],
          ['Heavy chain 8 mm+', 'High', 'Heaviest (1.5 – 3 kg)', 'Excellent (long reach)', 'Locking to distant posts'],
          ['Light chain 4–6 mm', 'Medium', 'Light', 'Good', 'Short stops'],
          ['Steel cable', 'Low', 'Lightest', 'Excellent', 'A few minutes, or securing a wheel'],
          ['Folding lock', 'High', 'Medium', 'Good', 'A balance of security and bulk'],
        ],
      },
    },
    {
      type: 'callout',
      variant: 'warn',
      ar: 'الكابل المعدني الرفيع بيتقطع بزرادية عادية في أقل من ١٠ ثواني. استخدمه كقفل ثانوي لتأمين الجنط بس — مش كقفل أساسي للدراجة.',
      en: 'A thin steel cable is cut with ordinary cable cutters in under ten seconds. Use it as a secondary lock for a wheel — never as the primary lock for the bike.',
    },
    {
      type: 'h2', id: 'how-to-lock', ar: 'إزاي تربط الدراجة صح', en: 'How to lock up properly' },
    {
      type: 'ol',
      ar: [
        'اربط الشاسيه — مش الجنط لوحده. الجنط بيتفك في ثانيتين ويسيبوا لك جنط وياخدوا الدراجة.',
        'اربط في حاجة ثابتة فعلًا: عمود إنارة، سور حديد مثبت في الأرض، أو حامل دراجات. مش في شجرة صغيرة ولا عمود تقدر ترفع القفل من فوقه.',
        'خلّي القفل ضيّق قدر الإمكان — المساحة الفاضية جوه القفل هي المكان اللي بيدخلوا فيه العتلة.',
        'حط القفل بعيد عن الأرض — الأرض بتديهم سطح صلب يستندوا عليه وهم بيكسروا.',
        'خلّي فتحة القفل ناحية تحت — بيصعّب الوصول ليها بالعدة.',
        'لو عندك قفلين، استخدمهم في أماكن مختلفة — نوعين مختلفين بيحتاجوا عدتين مختلفتين.',
      ],
      en: [
        'Lock the frame — not just a wheel. A wheel comes off in two seconds, leaving you the wheel and them the bike.',
        'Lock to something genuinely fixed: a lamp post, railings set in concrete, or a bike stand. Not a sapling, and not a post the lock can be lifted off the top of.',
        'Keep the lock as tight as possible — the empty space inside a lock is exactly where a crowbar goes.',
        'Keep the lock off the ground — the ground gives them a hard surface to lever against.',
        'Face the keyhole downwards — it makes tool access harder.',
        'If you carry two locks, use them in different places — two different types need two different tools.',
      ],
    },
    {
      type: 'h2', id: 'budget', ar: 'قد إيه تصرف على القفل؟', en: 'How much to spend on a lock' },
    {
      type: 'p',
      ar: 'القاعدة المتعارف عليها: من ٥ لـ ١٠٪ من سعر الدراجة. دراجة بـ ١٢ ألف جنيه تستاهل قفل من ٦٠٠ لـ ١٢٠٠ جنيه. صرف أقل من كده على دراجة غالية بيحوّل القفل لشكل مش أكتر.',
      en: 'The accepted rule is 5–10% of the bike’s price. A 12,000 EGP bike deserves a 600–1,200 EGP lock. Spending less than that on an expensive bike turns the lock into decoration.',
    },
    {
      type: 'h2', id: 'where', ar: 'أماكن الوقوف: الأفضل والأسوأ', en: 'Parking spots: best and worst' },
    {
      type: 'ul',
      ar: [
        'الأفضل: مكان فيه حركة ناس وإضاءة ومراقبة — الحرامي بيكره الجمهور.',
        'كويس: جنب دراجات تانية مربوطة أقل أمانًا منك.',
        'سيئ: شارع جانبي فاضي، أو جراج مظلم، أو خلف مبنى.',
        'الأسوأ: نفس المكان كل يوم في نفس الميعاد — ده بيخلي دراجتك هدف مخطط له.',
      ],
      en: [
        'Best: somewhere busy, lit and overlooked — thieves hate an audience.',
        'Good: next to other bikes locked less securely than yours.',
        'Bad: an empty side street, a dark garage, or behind a building.',
        'Worst: the same spot at the same time every day — that turns your bike into a planned target.',
      ],
    },
    {
      type: 'h2', id: 'extra', ar: 'إجراءات إضافية مجانية', en: 'Free extra measures' },
    {
      type: 'ul',
      ar: [
        'صوّر دراجتك من كل الزوايا واحتفظ بالصور.',
        'سجّل رقم الشاسيه (محفور تحت الدراجة عند الكرنك) في مكان آمن.',
        'حط علامة مميزة أو ستيكر — بيصعّب بيعها وبيسهّل تعرّفك عليها.',
        'لو الدراجة غالية، ما تسيبهاش في الشارع أصلًا — خدها جوه.',
      ],
      en: [
        'Photograph the bike from every angle and keep the images.',
        'Record the frame number (stamped under the bottom bracket) somewhere safe.',
        'Add a distinctive mark or sticker — it makes the bike harder to resell and easier for you to identify.',
        'If the bike is expensive, do not leave it on the street at all — take it inside.',
      ],
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'قفل U ولا جنزير؟', en: 'U-lock or chain?' },
          a: {
            ar: 'قفل U أقوى في مقاومة القطع لكن قصير، فمحتاج تقف قريب من العمود. الجنزير أطول ومرن وبيربط أي حاجة، لكن أتقل. لو بتقف في نفس المكان دايمًا وفيه حامل دراجات، خُد U. لو بتقف في أماكن مختلفة، خُد جنزير ٨ مم.',
            en: 'A U-lock resists cutting better but is short, so you must park close to the anchor. A chain is longer and more flexible and will loop around anything, but it is heavier. Park in the same spot with a proper stand? Take the U-lock. Park in varied places? Take an 8 mm chain.',
          },
        },
        {
          q: { ar: 'لازم أأمّن الجنط كمان؟', en: 'Do I need to secure the wheels too?' },
          a: {
            ar: 'لو الجنوط بتتفك بالإيد (Quick Release)، أيوة — الجنط الأمامي أسهل حاجة تتسرق. لفّ القفل حوالين الشاسيه والجنط الأمامي مع بعض، أو استخدم كابل إضافي للجنط الخلفي.',
            en: 'If your wheels have quick-release skewers, yes — the front wheel is the easiest thing to steal. Loop the lock through the frame and front wheel together, or add a cable for the rear.',
          },
        },
        {
          q: { ar: 'الدراجة اتسرقت — أعمل إيه؟', en: 'My bike was stolen — what now?' },
          a: {
            ar: 'حرّر محضر في القسم فورًا ومعاك رقم الشاسيه والصور والفاتورة. بعدها راقب مجموعات بيع الدراجات المستعملة على فيسبوك في منطقتك — أغلب الدراجات المسروقة بتظهر هناك خلال أسبوعين. لو لقيتها، ما تحاولش تستردها بنفسك — بلّغ الشرطة.',
            en: 'File a police report immediately with the frame number, photos and receipt. Then watch local second-hand bike groups on Facebook — most stolen bikes appear there within two weeks. If you find it, do not try to recover it yourself — tell the police.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'عندنا أقفال U وجنازير ثقيلة وكابلات برقم سري بمستويات أمان مختلفة. اسألنا نرشّح لك حسب سعر دراجتك ومكان وقوفها.',
      en: 'We stock U-locks, heavy chains and combination cables at different security levels. Ask us and we will recommend one based on your bike’s value and where you park.',
    },
  ],
};
