import { PageHeader } from '../components/layout/Layout.jsx';
import { Button } from '../components/ui/primitives.jsx';
import { Seo, breadcrumbSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { whatsappUrl } from '../lib/whatsapp.js';
import { SITE } from '../config/site.js';

/** Just the fact that the shop repairs bikes, and how to reach it. */
export default function Maintenance() {
  const { t, lang } = useLocale();
  const title = lang === 'ar' ? 'صيانة العجل والدراجات' : 'Bike repairs';
  const lede = t('why.support.d');
  const ask = whatsappUrl(lang === 'ar' ? 'السلام عليكم، عندي عجلة محتاجة صيانة.' : 'Hello, my bike needs a repair.');

  return (
    <>
      <Seo
        lang={lang}
        title={lang === 'ar' ? 'صيانة عجل ودراجات أطفال وكبار' : 'Bike repairs for kids and adult bikes'}
        description={
          lang === 'ar'
            ? `${lede} كلّمنا على واتساب ${SITE.contact.whatsappDisplay} أو اتصل ${SITE.contact.phones[0]}.`
            : `${lede} WhatsApp ${SITE.contact.whatsappDisplay} or call ${SITE.contact.phones[0]}.`
        }
        canonicalPath={paths.maintenance()}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: lang === 'ar' ? 'صيانة دراجات' : 'Bicycle repair',
            name: title,
            description: lede,
            provider: { '@id': `${SITE.baseUrl}/#organization` },
            areaServed: { '@type': 'AdministrativeArea', name: SITE.address.region[lang] },
          },
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: title, path: paths.maintenance() },
          ], lang),
        ]}
      />

      <PageHeader title={title} lede={lede} breadcrumbs={[{ label: title }]}>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button href={ask} variant="whatsapp" size="lg" icon="whatsapp">
            {lang === 'ar' ? 'ابعت على واتساب' : 'Message on WhatsApp'}
          </Button>
          <a href={`tel:${SITE.contact.phones[0]}`} className="text-[15px] font-semibold underline decoration-carbon-300 underline-offset-4 hover:decoration-current">
            {lang === 'ar' ? 'أو اتصل ' : 'or call '}
            <span dir="ltr" className="tnum">{SITE.contact.phones[0]}</span>
          </a>
        </div>
      </PageHeader>
    </>
  );
}
