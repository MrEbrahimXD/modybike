import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/Layout.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Section } from '../components/ui/primitives.jsx';
import { Seo, breadcrumbSchema, faqSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { whatsappUrl } from '../lib/whatsapp.js';
import { SITE } from '../config/site.js';

const SERVICES = [
  { icon: 'wrench', t: { ar: 'صيانة شاملة', en: 'Full service' }, d: { ar: 'تنظيف وتشحيم وظبط كل المسامير والبلي.', en: 'Clean, grease and tighten bearings and bolts.' } },
  { icon: 'shield', t: { ar: 'الفرامل', en: 'Brakes' }, d: { ar: 'ظبط أو تغيير تيل وسلك الفرامل، كفة أو ديسك.', en: 'Adjust or replace pads and cables, V-brake or disc.' } },
  { icon: 'tool', t: { ar: 'السرعات', en: 'Gears' }, d: { ar: 'ظبط الديريلير والفتيس لو السرعات بتنط أو تقيلة.', en: 'Adjust derailleurs and shifters that slip or feel stiff.' } },
  { icon: 'bike', t: { ar: 'الكاوتش والشمبر', en: 'Tyres and tubes' }, d: { ar: 'رقع أو تغيير شمبر، وتغيير كاوتش بكل المقاسات.', en: 'Patch or replace tubes and fit new tyres in every size.' } },
  { icon: 'lock', t: { ar: 'الجنزير', en: 'Chain' }, d: { ar: 'تنظيف وتزييت، أو تغيير الجنزير لو مشدود أو بيطقطق.', en: 'Clean and oil, or replace a stretched or noisy chain.' } },
  { icon: 'ruler', t: { ar: 'ظبط الجنط', en: 'Wheel truing' }, d: { ar: 'تعديل الجنط المعووج وشد الأسلاك.', en: 'Straighten bent wheels and tension spokes.' } },
  { icon: 'plus', t: { ar: 'تركيب دراجة جديدة', en: 'New bike assembly' }, d: { ar: 'تركيب وظبط الدراجة قبل أول ركوب.', en: 'Assemble and set up a bike before its first ride.' } },
  { icon: 'light', t: { ar: 'تركيب إكسسوارات', en: 'Accessory fitting' }, d: { ar: 'أنوار، سلة، كرسي خلفي، عجل مساعد، ورفارف.', en: 'Lights, baskets, rear seats, training wheels and mudguards.' } },
];

const FAQ = [
  { q: { ar: 'لازم الدراجة تكون من عندكم؟', en: 'Does the bike have to be from your shop?' }, a: { ar: 'لا، بنصلّح أي دراجة.', en: 'No, we repair any bike.' } },
  { q: { ar: 'الصيانة بتاخد قد إيه؟', en: 'How long does a repair take?' }, a: { ar: 'أغلب الشغل البسيط بيخلص في نفس اليوم. ابعت لنا على واتساب وهنقولك.', en: 'Most small jobs are done the same day. Message us on WhatsApp and we will tell you.' } },
  { q: { ar: 'أعرف التكلفة إزاي؟', en: 'How do I find out the cost?' }, a: { ar: 'ابعت صورة للدراجة ووصف للمشكلة على واتساب ونرد عليك.', en: 'Send a photo of the bike and describe the problem on WhatsApp and we will reply.' } },
];

export default function Maintenance() {
  const { t, tr, lang, path } = useLocale();
  const title = lang === 'ar' ? 'صيانة الدراجات' : 'Bike repairs';
  const lede = lang === 'ar'
    ? 'بنصلّح ونظبط أي دراجة، أطفال أو كبار. هات الدراجة المعرض أو ابعت لنا صورة على واتساب.'
    : 'We repair and tune any bike, kids or adult. Bring it to the shop or send us a photo on WhatsApp.';
  const ask = whatsappUrl(lang === 'ar' ? 'السلام عليكم، عندي دراجة محتاجة صيانة:' : 'Hello, my bike needs a repair:');

  return (
    <>
      <Seo
        lang={lang}
        title={`${title} — ${t('common.brand')}`}
        description={lede}
        canonicalPath={paths.maintenance()}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: lang === 'ar' ? 'صيانة دراجات' : 'Bicycle repair',
            name: title,
            description: lede,
            provider: { '@id': `${SITE.baseUrl}/#organization` },
            areaServed: { '@type': 'Country', name: lang === 'ar' ? 'مصر' : 'Egypt' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: title,
              itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: tr(s.t), description: tr(s.d) } })),
            },
          },
          faqSchema(FAQ, lang),
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: title, path: paths.maintenance() },
          ]),
        ].filter(Boolean)}
      />

      <PageHeader title={title} lede={lede} breadcrumbs={[{ label: title }]}>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={ask} variant="whatsapp" size="lg" icon="whatsapp">
            {lang === 'ar' ? 'ابعت على واتساب' : 'Message on WhatsApp'}
          </Button>
          <Button href={`tel:${SITE.contact.phones[0]}`} variant="outline" size="lg" icon="phone">
            <span dir="ltr">{SITE.contact.phones[0]}</span>
          </Button>
        </div>
      </PageHeader>

      <Section className="!py-10 sm:!py-14">
        <div className="container-page">
          <h2 className="text-xl font-bold sm:text-2xl">{lang === 'ar' ? 'بنعمل إيه' : 'What we do'}</h2>
          <ul className="mt-6 grid gap-px border bg-[var(--rule)] rule sm:grid-cols-2 lg:grid-cols-4" role="list">
            {SERVICES.map((s) => (
              <li key={s.icon + s.t.en} className="bg-paper p-5 dark:bg-carbon-950">
                <Icon name={s.icon} className="h-5 w-5 text-signal-600 dark:text-signal-400" />
                <h3 className="mt-3 text-base font-bold">{tr(s.t)}</h3>
                <p className="mt-1 text-sm leading-relaxed muted">{tr(s.d)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">{lang === 'ar' ? 'أسئلة' : 'Questions'}</h2>
              <dl className="mt-4">
                {FAQ.map((f) => (
                  <div key={f.q.en} className="border-b py-4 rule">
                    <dt className="font-semibold">{tr(f.q)}</dt>
                    <dd className="mt-1 text-[15px] muted">{tr(f.a)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">{lang === 'ar' ? 'اقرأ كمان' : 'Further reading'}</h2>
              <ul className="mt-4 space-y-3">
                {[
                  ['bike-maintenance-schedule', lang === 'ar' ? 'جدول صيانة الدراجة' : 'Bike maintenance schedule'],
                  ['tyre-pressure-guide', lang === 'ar' ? 'ضغط هوا الكاوتش المناسب' : 'Tyre pressure guide'],
                  ['brakes-disc-vs-vbrake', lang === 'ar' ? 'فرامل ديسك ولا كفة؟' : 'Disc or V-brakes?'],
                  ['saddle-height-setup', lang === 'ar' ? 'ظبط ارتفاع الكرسي' : 'Setting saddle height'],
                ].map(([slug, label]) => (
                  <li key={slug}>
                    <Link to={path(paths.blogPost(slug))} className="inline-flex items-center gap-2 font-semibold hover:underline">
                      <Icon name="chevronRight" className="h-4 w-4 flip-rtl" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
