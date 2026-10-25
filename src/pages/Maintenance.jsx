import { PageHeader } from '../components/layout/Layout.jsx';
import { Button } from '../components/ui/primitives.jsx';
import { Seo, breadcrumbSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { whatsappUrl } from '../lib/whatsapp.js';
import { SITE } from '../config/site.js';

export default function Maintenance() {
  const { t, lang } = useLocale();
  const title = lang === 'ar' ? 'صيانة الدراجات' : 'Bike repairs';
  const lede = lang === 'ar' ? 'عندنا صيانة لكل أنواع الدراجات.' : 'We repair all kinds of bikes.';
  const ask = whatsappUrl(lang === 'ar' ? 'السلام عليكم، عندي دراجة محتاجة صيانة.' : 'Hello, my bike needs a repair.');

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
            provider: { '@id': `${SITE.baseUrl}/#organization` },
            areaServed: { '@type': 'Country', name: lang === 'ar' ? 'مصر' : 'Egypt' },
          },
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: title, path: paths.maintenance() },
          ]),
        ]}
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
    </>
  );
}
