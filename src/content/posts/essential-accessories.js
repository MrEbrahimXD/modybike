export default {
  slug: 'essential-accessories',
  blocks: [
    {
      type: 'lead',
      ar: 'محلات الدراجات بتبيع ٥٠ إكسسوار مختلف، لكن أربعة بس منهم مش رفاهية. المقال ده بيرتّب الإكسسوارات بالأولوية الحقيقية — من اللي بينقذ حياتك للي بيحسّن راحتك — مع ميزانية تقريبية لكل مستوى.',
      en: 'Bike shops sell fifty different accessories, but only four of them are not optional. This article ranks them by genuine priority — from the ones that save your life to the ones that just make riding nicer — with an approximate budget for each tier.',
    },
    {
      type: 'h2',
      id: 'tier-1',
      ar: 'المستوى الأول: الأساسيات اللي مش بنتنازل عنها',
      en: 'Tier one: the non-negotiables',
    },
    {
      type: 'h3', id: 'helmet', ar: '١. الخوذة', en: '1. Helmet' },
    {
      type: 'p',
      ar: 'الخوذة هي الحاجة الوحيدة اللي بتفرق بين وقعة عادية وإصابة في المخ. خوذة بتتكلف جزء بسيط من سعر الدراجة وبتشتغل مرة واحدة بس في حياتها — وهي المرة اللي محتاجها فيها. لو هتشتري إكسسوار واحد بس، خليه الخوذة.',
      en: 'A helmet is the one item that separates an ordinary fall from a head injury. It costs a fraction of the bike and works exactly once in its life — the time you need it. If you buy only one accessory, make it this.',
    },
    {
      type: 'ul',
      ar: [
        'المقاس: قِس محيط رأسك فوق الودن بشريط قياس. S = ٥٤–٥٦ سم، M = ٥٦–٥٩، L = ٥٩–٦٢.',
        'الضبط: صباعين فوق الحاجب، الحزام يعمل حرف V تحت الودن، وصباع واحد بين الحزام والذقن.',
        'الاختبار: هزّ رأسك بسرعة — الخوذة ما تتحركش على رأسك.',
        'بدّلها بعد أي وقعة حتى لو باينة سليمة، والفوم بيضعف بعد ٥ سنين استخدام.',
      ],
      en: [
        'Sizing: measure your head circumference above the ears. S = 54–56 cm, M = 56–59, L = 59–62.',
        'Fit: two fingers above the eyebrow, straps forming a V under each ear, one finger between strap and chin.',
        'Test: shake your head sharply — the helmet should not move on your skull.',
        'Replace it after any crash even if it looks fine, and the foam degrades after about five years.',
      ],
    },
    {
      type: 'h3', id: 'lights', ar: '٢. الأنوار', en: '2. Lights' },
    {
      type: 'p',
      ar: 'لو هتركب بعد المغرب ولو مرة واحدة، الأنوار ضرورية. النور الأمامي الأبيض مش عشان تشوف بس — عشان يشوفوك. والنور الخلفي الأحمر أهم منه فعلًا، لأن أغلب حوادث الدراجات بتيجي من الخلف. طقم بسيط ببطاريات بيكفي للشوارع المضاءة؛ ولو بتمشي على طرق زراعية مظلمة، محتاج نور بالشحن من ٤٠٠ لومن فما فوق.',
      en: 'If you will ride after dark even once, lights are essential. A white front light is not only so you can see — it is so you are seen. The red rear light matters even more, because most bike collisions come from behind. A basic battery set is enough for lit streets; for dark farm roads you want a rechargeable light of 400 lumens or more.',
    },
    {
      type: 'h3', id: 'bell', ar: '٣. الجرس أو الزمّارة', en: '3. Bell or horn' },
    {
      type: 'p',
      ar: 'أرخص إكسسوار وأكترهم استخدامًا يوميًا. المشاة في مصر مش متعودين يسمعوا دراجة جاية من وراهم، والجرس بيحل المشكلة دي قبل ما تحصل. في الشوارع المزدحمة جدًا، الزمّارة الكهربائية بتوصل صوت أعلى بكتير.',
      en: 'The cheapest accessory and the one you use most. Pedestrians in Egypt are not used to hearing a bike coming up behind them, and a bell solves that before it becomes a problem. On very busy streets an electric horn carries far better.',
    },
    {
      type: 'h3', id: 'lock', ar: '٤. القفل', en: '4. Lock' },
    {
      type: 'p',
      ar: 'حتى لو مش هتسيب الدراجة في الشارع، هتحتاجه في السوبر ماركت أو عند بيت صاحبك. القاعدة العامة: خصّص حوالي ٥–١٠٪ من سعر الدراجة للقفل. قفل رخيص جدًا على دراجة غالية استثمار سيئ.',
      en: 'Even if you never leave the bike on the street, you will need it at the supermarket or outside a friend’s house. The general rule is to spend roughly 5–10% of the bike’s price on the lock. A very cheap lock on an expensive bike is a poor investment.',
    },
    {
      type: 'h2',
      id: 'tier-2',
      ar: 'المستوى التاني: مهم حسب استخدامك',
      en: 'Tier two: important depending on how you ride',
    },
    {
      type: 'table',
      caption: { ar: 'إكسسوارات المستوى التاني', en: 'Tier two accessories' },
      head: { ar: ['الإكسسوار', 'محتاجه لو…'], en: ['Accessory', 'You need it if…'] },
      rows: {
        ar: [
          ['مضخة هواء أرضية', 'عندك دراجة — حرفيًا. الكاوتش بيفقد هوا لوحده كل أسبوع'],
          ['طقم إصلاح بنشر', 'بتمشي مشاوير أطول من ٥ كم من البيت'],
          ['حامل زجاجة مياه', 'بتركب في الصيف أو لأكتر من نص ساعة'],
          ['رفارف', 'بتركب في الشتا أو على طرق زراعية بعد الري'],
          ['حامل خلفي', 'بتحمل شنطة أو مشتريات'],
          ['حامل موبايل', 'بتستخدم خرايط أو بتتبع مسافاتك'],
          ['مراية مقود', 'بتركب في شوارع فيها عربيات كتير'],
        ],
        en: [
          ['Floor pump', 'You own a bike — literally. Tyres lose air on their own every week'],
          ['Puncture repair kit', 'You ride more than 5 km from home'],
          ['Bottle cage', 'You ride in summer, or for over half an hour'],
          ['Mudguards', 'You ride in winter or on freshly irrigated farm roads'],
          ['Rear rack', 'You carry a bag or shopping'],
          ['Phone mount', 'You navigate or track your rides'],
          ['Handlebar mirror', 'You ride in traffic'],
        ],
      },
    },
    {
      type: 'h2',
      id: 'tier-3',
      ar: 'المستوى التالت: رفاهية حقيقية',
      en: 'Tier three: genuine luxuries',
    },
    {
      type: 'ul',
      ar: [
        'غطاء كرسي جل — مفيد في أول شهر قبل ما الجسم يتعوّد، لكنه مش حل دائم لكرسي غلط.',
        'مقابض إرجونوميك — تستاهل لو إيدك بتنمّل، مش قبل كده.',
        'شنطة جانبية — ممتازة لو بتروح الشغل بالدراجة، رفاهية لو لأ.',
        'عداد سرعة — ممتع ومحفّز، لكن تطبيق على الموبايل بيعمل نفس الشغل مجانًا.',
      ],
      en: [
        'Gel saddle cover — useful in the first month before your body adapts, but not a permanent fix for the wrong saddle.',
        'Ergonomic grips — worth it if your hands go numb, not before.',
        'Pannier bag — excellent if you commute, a luxury otherwise.',
        'Cycle computer — fun and motivating, but a phone app does the same job free.',
      ],
    },
    {
      type: 'h2',
      id: 'kids-accessories',
      ar: 'إكسسوارات خاصة بالأطفال',
      en: 'Accessories specific to children',
    },
    {
      type: 'ul',
      ar: [
        'خوذة أطفال (مش خوذة كبار صغيرة) — بتغطي مؤخرة الرأس أكتر لأن الأطفال بيقعوا للخلف.',
        'واقيات ركب وأكواع — ضرورية في أول ٣ شهور تعلّم.',
        'عجل مساعد قابل للتعديل — عشان تقدر تنزّله تدريجيًا.',
        'عاكسات على الجنوط — الأطفال بيركبوا في أوقات ومسارات غير متوقعة.',
        'جرس — الأطفال بيحبوه وبيستخدموه، وده بيخليهم أكتر أمانًا.',
      ],
      en: [
        'A kids helmet (not a small adult one) — deeper rear coverage, because children fall backwards.',
        'Knee and elbow pads — essential for the first three months of learning.',
        'Adjustable training wheels — so you can lower them gradually.',
        'Spoke reflectors — children ride at unpredictable times and on unpredictable lines.',
        'A bell — kids love using it, and that makes them safer.',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'نصيحة عملية: ما تشتريش كل حاجة مع الدراجة في نفس اليوم. اشتري المستوى الأول فورًا، وركب شهر، وبعدين هتعرف بالظبط إيه اللي ناقصك فعلًا من المستوى التاني.',
      en: 'Practical advice: do not buy everything on the same day as the bike. Get tier one immediately, ride for a month, and you will know exactly which tier-two items you actually need.',
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'الخوذة إجبارية قانونًا في مصر؟', en: 'Are helmets a legal requirement in Egypt?' },
          a: {
            ar: 'مفيش قانون بيلزم راكبي الدراجات الهوائية بالخوذة في مصر حاليًا. لكن ده ما بيغيّرش إن الخوذة أهم قطعة أمان ممكن تشتريها — القانون مش هو اللي بيحميك، الخوذة هي.',
            en: 'There is currently no law requiring helmets for cyclists in Egypt. That does not change the fact that it is the most important piece of safety equipment you can buy — the law does not protect you, the helmet does.',
          },
        },
        {
          q: { ar: 'مضخة أرضية ولا صغيرة؟', en: 'Floor pump or mini pump?' },
          a: {
            ar: 'الاتنين، ولكل واحدة دور. الأرضية في البيت لأنها بتنفخ للضغط الصح بسرعة وبعداد. والصغيرة على الشاسيه للطوارئ في نص الطريق. لو هتشتري واحدة بس، خليها الأرضية.',
            en: 'Both, and each has a job. The floor pump lives at home because it reaches correct pressure quickly and has a gauge. The mini pump lives on the frame for roadside emergencies. If you buy only one, buy the floor pump.',
          },
        },
        {
          q: { ar: 'أنوار ببطارية ولا بالشحن؟', en: 'Battery lights or rechargeable?' },
          a: {
            ar: 'ببطارية: أرخص، وبتنفع لو بتركب بالليل نادرًا. بالشحن: أقوى، وأوفر على المدى الطويل، وما تسيبكش فجأة في نص الطريق لو بتتابع مستوى الشحن. لو بتركب بالليل أكتر من مرتين في الأسبوع، خُد بالشحن.',
            en: 'Battery: cheaper, and fine if you rarely ride at night. Rechargeable: brighter, cheaper over time, and will not strand you mid-ride if you watch the charge level. Riding at night more than twice a week? Take the rechargeable.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'كل الإكسسوارات دي متوفرة عندنا وبنركّبها لك مجانًا مع أي دراجة. شوف قسم الإكسسوارات أو اسألنا على واتساب.',
      en: 'We stock all of these and fit them free with any bike. Browse the accessories section or ask us on WhatsApp.',
    },
  ],
};
