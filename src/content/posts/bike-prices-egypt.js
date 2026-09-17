export default {
  slug: 'bike-prices-egypt',
  blocks: [
    {
      type: 'lead',
      ar: 'ليه دراجتين شكلهم واحد وسعرهم مختلف بالضعف؟ السعر مش عشوائي — بيتحدد بأربع بنود أساسية: خامة الشاسيه، مجموعة النقل، الفرامل، والجنوط. المقال ده بيفكّك السعر بند بند عشان تعرف إنت بتدفع في إيه.',
      en: 'Why do two bikes that look identical differ in price by a factor of two? Price is not arbitrary — it comes down to four items: frame material, drivetrain, brakes and wheels. This article breaks the price down so you know what you are paying for.',
    },
    {
      type: 'callout',
      variant: 'warn',
      ar: 'الأسعار في المقال ده شرايح تقريبية للسوق المصري ٢٠٢٦ وبتتغيّر مع سعر الصرف والجمارك. للأسعار الحالية بالظبط، شوف صفحات المنتجات أو كلّمنا على واتساب.',
      en: 'The figures here are approximate brackets for the Egyptian market in 2026 and move with exchange rates and customs. For exact current prices, see the product pages or message us on WhatsApp.',
    },
    {
      type: 'h2', id: 'frame', ar: '١. خامة الشاسيه — أكبر بند', en: '1. Frame material — the biggest single item' },
    {
      type: 'table',
      caption: { ar: 'خامات الشاسيه', en: 'Frame materials' },
      head: { ar: ['الخامة', 'الوزن', 'المتانة', 'أثرها على السعر'], en: ['Material', 'Weight', 'Durability', 'Price impact'] },
      rows: {
        ar: [
          ['صلب Hi-Ten', 'الأتقل', 'عالية جدًا', 'الأرخص — الأساس'],
          ['ألومنيوم 6061', 'أخف بـ ١.٥–٢.٥ كجم', 'عالية', '+٣٠٪ إلى +٥٠٪'],
          ['كروم موليبدينوم', 'متوسط', 'الأعلى', '+٥٠٪ إلى +٨٠٪'],
          ['كربون فايبر', 'الأخف', 'عالية لكن حساسة للصدمات', '+٢٠٠٪ فأكتر'],
        ],
        en: [
          ['Hi-Ten steel', 'Heaviest', 'Very high', 'Cheapest — the baseline'],
          ['6061 aluminium', '1.5–2.5 kg lighter', 'High', '+30% to +50%'],
          ['Chromoly steel', 'Middle', 'Highest', '+50% to +80%'],
          ['Carbon fibre', 'Lightest', 'High but impact-sensitive', '+200% and up'],
        ],
      },
    },
    {
      type: 'h2', id: 'drivetrain', ar: '٢. مجموعة النقل (التروس والنقلات)', en: '2. The drivetrain' },
    {
      type: 'p',
      ar: 'ده تاني أكبر بند. مجموعة نقل غير معروفة الماركة ممكن تكون بنص سعر مجموعة شيمانو، لكنها بتحتاج معايرة متكررة وبتتآكل أسرع. مستويات شيمانو من الأرخص للأغلى: Tourney → Altus → Acera → Alivio → Deore. أول مستويين بيغطوا الاستخدام العادي تمامًا.',
      en: 'The second biggest item. An unbranded drivetrain can cost half a Shimano one, but it needs constant re-indexing and wears faster. Shimano’s ladder from cheapest up: Tourney → Altus → Acera → Alivio → Deore. The first two cover normal use perfectly well.',
    },
    {
      type: 'h2', id: 'brakes-price', ar: '٣. الفرامل', en: '3. Brakes' },
    {
      type: 'ul',
      ar: [
        'فرامل كفة (V-Brake): الأرخص — بتضيف أقل حاجة على السعر.',
        'قرصية ميكانيكية: بتضيف حوالي ١٥–٢٥٪ على سعر الدراجة.',
        'قرصية هيدروليك: بتضيف حوالي ٣٠–٥٠٪.',
      ],
      en: [
        'V-brakes: cheapest — they add the least to the price.',
        'Mechanical disc: adds roughly 15–25% to the bike price.',
        'Hydraulic disc: adds roughly 30–50%.',
      ],
    },
    {
      type: 'h2', id: 'wheels', ar: '٤. الجنوط — البند المخفي', en: '4. Wheels — the hidden item' },
    {
      type: 'p',
      ar: 'ده البند اللي المصنّعين بيوفّروا منه في الدراجات الرخيصة لأن المشتري نادرًا بيبص عليه. جنط سلك واحد (Single wall) بيتعوج بسهولة وبيحتاج تظبيط كل شهرين. جنط مزدوج الحائط (Double wall) أقوى بكتير ومناسب لأي راكب وزنه فوق ٧٠ كجم أو بيمشي على طرق سيئة.',
      en: 'This is where manufacturers cut costs on cheap bikes, because buyers rarely look. A single-wall rim buckles easily and needs truing every couple of months. A double-wall rim is far stronger and is the minimum for any rider over 70 kg or riding poor surfaces.',
    },
    {
      type: 'callout',
      variant: 'tip',
      ar: 'لو هتقارن بين موديلين وسعرهم قريب، اسأل عن نوع الجنط. «مزدوج الحائط» تستاهل تدفع فيها فرق — لأن تظبيط الجنوط المتكرر بيكلّف أكتر على المدى الطويل.',
      en: 'Comparing two similarly priced models? Ask about the rims. “Double wall” is worth paying for — repeated wheel truing costs more over time than the price difference.',
    },
    {
      type: 'h2', id: 'brackets', ar: 'شرايح الأسعار المتوقعة', en: 'Expected price brackets' },
    {
      type: 'table',
      caption: { ar: 'شرايح أسعار الدراجات في مصر ٢٠٢٦ (تقريبية)', en: 'Bike price brackets in Egypt, 2026 (approximate)' },
      head: { ar: ['النوع', 'الشريحة الاقتصادية', 'الشريحة المتوسطة', 'الشريحة العالية'], en: ['Type', 'Budget', 'Mid-range', 'High end'] },
      rows: {
        ar: [
          ['دراجة أطفال ١٢–١٦"', '٢٬٥٠٠ – ٤٬٥٠٠ ج.م', '٤٬٥٠٠ – ٧٬٠٠٠', '٧٬٠٠٠+'],
          ['دراجة أطفال ٢٠–٢٤"', '٤٬٥٠٠ – ٧٬٠٠٠', '٧٬٠٠٠ – ١٢٬٠٠٠', '١٢٬٠٠٠+'],
          ['جبلي ٢٦"', '٨٬٠٠٠ – ١٢٬٠٠٠', '١٢٬٠٠٠ – ٢٠٬٠٠٠', '٢٠٬٠٠٠+'],
          ['جبلي ٢٧.٥ / ٢٩"', '١٤٬٠٠٠ – ٢٠٬٠٠٠', '٢٠٬٠٠٠ – ٣٥٬٠٠٠', '٣٥٬٠٠٠+'],
          ['هجين', '٩٬٠٠٠ – ١٤٬٠٠٠', '١٤٬٠٠٠ – ٢٢٬٠٠٠', '٢٢٬٠٠٠+'],
          ['طريق (سباق)', '١٨٬٠٠٠ – ٢٨٬٠٠٠', '٢٨٬٠٠٠ – ٥٥٬٠٠٠', '٥٥٬٠٠٠+'],
          ['سيتي / سيدات', '٧٬٥٠٠ – ١٢٬٠٠٠', '١٢٬٠٠٠ – ١٨٬٠٠٠', '١٨٬٠٠٠+'],
          ['كهربائية', '٣٥٬٠٠٠ – ٥٠٬٠٠٠', '٥٠٬٠٠٠ – ٨٠٬٠٠٠', '٨٠٬٠٠٠+'],
        ],
        en: [
          ['Kids 12–16"', '2,500 – 4,500 EGP', '4,500 – 7,000', '7,000+'],
          ['Kids 20–24"', '4,500 – 7,000', '7,000 – 12,000', '12,000+'],
          ['Mountain 26"', '8,000 – 12,000', '12,000 – 20,000', '20,000+'],
          ['Mountain 27.5 / 29"', '14,000 – 20,000', '20,000 – 35,000', '35,000+'],
          ['Hybrid', '9,000 – 14,000', '14,000 – 22,000', '22,000+'],
          ['Road', '18,000 – 28,000', '28,000 – 55,000', '55,000+'],
          ['City / step-through', '7,500 – 12,000', '12,000 – 18,000', '18,000+'],
          ['Electric', '35,000 – 50,000', '50,000 – 80,000', '80,000+'],
        ],
      },
    },
    {
      type: 'h2', id: 'sweet-spot', ar: 'أين النقطة المثالية للقيمة؟', en: 'Where the value sits' },
    {
      type: 'p',
      ar: 'الشريحة المتوسطة هي أفضل قيمة بفارق واضح. الفرق بين الشريحة الاقتصادية والمتوسطة كبير جدًا في التجربة اليومية (شاسيه ألومنيوم، جنوط مزدوجة، مجموعة نقل معروفة). أما الفرق بين المتوسطة والعالية فبيبقى في تحسينات دقيقة بيحسّها الراكب المتقدم بس.',
      en: 'The mid-range is clearly the best value. The step from budget to mid-range transforms daily use (alloy frame, double-wall rims, a branded drivetrain). The step from mid-range to high end buys refinements only an advanced rider notices.',
    },
    {
      type: 'h2', id: 'total-cost', ar: 'التكلفة الحقيقية للسنة الأولى', en: 'The real first-year cost' },
    {
      type: 'ul',
      ar: [
        'سعر الدراجة.',
        'الأساسيات: خوذة + أنوار + قفل + مضخة ≈ من ١٬٥٠٠ لـ ٢٬٥٠٠ ج.م.',
        'صيانة أول سنة: ≈ من ٣٠٠ لـ ٨٠٠ ج.م (أقل لو الضمان بيغطي أول ٣ شهور).',
        'مستهلكات: كاوتش وسلنجات وتيل فرامل ≈ من ٤٠٠ لـ ١٬٠٠٠ ج.م حسب المسافة.',
      ],
      en: [
        'The bike itself.',
        'Essentials: helmet + lights + lock + pump ≈ 1,500–2,500 EGP.',
        'First-year servicing ≈ 300–800 EGP (less if the warranty covers the first three months).',
        'Consumables: tyres, tubes and brake pads ≈ 400–1,000 EGP depending on mileage.',
      ],
    },
    {
      type: 'faq',
      items: [
        {
          q: { ar: 'ليه الدراجات غليت في مصر؟', en: 'Why have bike prices risen in Egypt?' },
          a: {
            ar: 'أغلب الدراجات وقطع الغيار مستوردة، فسعرها مربوط بسعر صرف الدولار وبالرسوم الجمركية وتكلفة الشحن. أي تغيّر في العوامل دي بينعكس على السعر خلال شهور.',
            en: 'Most bikes and parts are imported, so prices track the dollar exchange rate, customs duty and freight costs. Any change in those shows up in prices within months.',
          },
        },
        {
          q: { ar: 'أقل سعر معقول لدراجة كبار؟', en: 'What is the lowest sensible price for an adult bike?' },
          a: {
            ar: 'حوالي ٨٬٠٠٠ ج.م لدراجة جبلية ٢٦ بوصة تستحمّل الاستخدام اليومي. أقل من كده غالبًا بتكون جنوط سلك واحد وفرامل ضعيفة ومجموعة نقل بتحتاج معايرة كل أسبوعين — التوفير بيروح في الصيانة.',
            en: 'Around 8,000 EGP for a 26-inch mountain bike that will take daily use. Below that you usually get single-wall rims, weak brakes and a drivetrain needing re-indexing every fortnight — the saving disappears into servicing.',
          },
        },
        {
          q: { ar: 'الدراجة الغالية أسرع فعلًا؟', en: 'Is an expensive bike actually faster?' },
          a: {
            ar: 'أسرع شوية، لكن أقل مما تتخيل. الفرق في السرعة بين دراجة بـ ١٢ ألف ودراجة بـ ٤٠ ألف على نفس الطريق حوالي ٥–١٠٪ لراكب عادي. الفلوس الزيادة بتشتري خفة ودقة وراحة أكتر من سرعة.',
            en: 'Slightly, but less than you would think. On the same road, the speed gap between a 12,000 EGP bike and a 40,000 EGP one is roughly 5–10% for an average rider. The extra money buys lightness, precision and comfort more than outright speed.',
          },
        },
      ],
    },
    {
      type: 'cta',
      ar: 'قول لنا ميزانيتك واستخدامك، وهنقول لك بصراحة إيه اللي هتحصل عليه في الشريحة دي وإيه اللي يستاهل تزوّد فيه.',
      en: 'Tell us your budget and how you ride, and we will be straight with you about what that bracket gets you and what is worth stretching for.',
    },
  ],
};
