import { PageHeader } from '../components/layout/Layout.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Seo, breadcrumbSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { SITE } from '../config/site.js';

const LAST_UPDATED = '2026-10-25';

const TRACKERS = [
  SITE.analytics.gaMeasurementId && { ar: 'Google Analytics لمعرفة عدد الزيارات والصفحات اللي بتتشاف', en: 'Google Analytics to count visits and the pages viewed' },
  SITE.analytics.metaPixelId && { ar: 'Meta Pixel لقياس إعلانات فيسبوك وإنستجرام', en: 'the Meta Pixel to measure Facebook and Instagram ads' },
].filter(Boolean);

/* ============================================================================
 *  ⚠️ TODO للعميل: النصوص دي صيغة مبدئية عامة.
 *  راجعها مع مستشار قانوني قبل إطلاق الموقع رسميًا، خصوصًا بنود الاسترجاع
 *  والضمان لأنها بتخضع لقانون حماية المستهلك المصري.
 * ========================================================================== */

const CONTENT = {
  shipping: {
    ar: [
      { h: 'التوصيل', p: 'ابعت عنوانك على واتساب، وبنأكد معاك الطلب وتفاصيل ومعاد التوصيل قبل ما نبعته.' },
      { h: 'الاستلام من المعرض', p: 'تقدر تستلم طلبك من المعرض خلال مواعيد العمل. هنبلّغك لما الطلب يكون جاهز.' },
      { h: 'الاسترجاع والاستبدال', p: 'تواصل مع المعرض لمعرفة سياسة الاسترجاع والاستبدال الخاصة بالمنتج قبل تأكيد الطلب.' },
      { h: 'الضمان', p: SITE.warranty.note.ar },
    ],
    en: [
      { h: 'Delivery', p: 'Send your address on WhatsApp and we confirm the order, delivery details and time before dispatch.' },
      { h: 'Showroom collection', p: 'You can collect your order from the shop during opening hours. We will let you know when it is ready.' },
      { h: 'Returns and exchanges', p: 'Contact the showroom for the product’s return and exchange policy before confirming your order.' },
      { h: 'Warranty', p: SITE.warranty.note.en },
    ],
  },

  privacy: {
    ar: [
      { h: 'البيانات اللي بنجمعها', p: 'بنجمع الاسم ورقم الموبايل والعنوان اللي بتدخلهم وقت إتمام الطلب، وده الحد الأدنى اللازم لتنفيذ الطلب والتواصل معك بخصوصه.' },
      { h: 'إزاي البيانات بتتبعت', p: 'الموقع ده مش بيخزّن بياناتك على سيرفر. لما تضغط «إرسال الطلب»، البيانات بتتحوّل لرسالة نصية بتتبعت عن طريق تطبيق واتساب من جهازك مباشرةً — إنت اللي بتضغط إرسال.' },
      { h: 'التخزين المحلي', p: 'محتويات سلة الطلب واختيارك للمظهر (فاتح/داكن) بتتخزن في متصفحك أنت فقط (localStorage)، وما بتتبعتش لأي جهة. تقدر تمسحها في أي وقت من إعدادات المتصفح.' },
      { h: 'خدمات خارجية', p: `بنستخدم خطوط جوجل (Google Fonts) لعرض الخطوط، وواتساب لاستقبال الطلبات${TRACKERS.map((x) => `، و${x.ar}`).join('')}. لكل خدمة سياسة خصوصية خاصة بها.` },
      { h: 'مشاركة البيانات', p: 'ما بنبيعش ولا بنشارك بياناتك مع أي طرف تالت لأغراض تسويقية. بنشارك العنوان ورقم التليفون مع شركة الشحن لتنفيذ التوصيل فقط.' },
      { h: 'حقوقك', p: 'تقدر تطلب منا في أي وقت حذف بياناتك أو الاطلاع عليها عن طريق مراسلتنا على واتساب ' + SITE.contact.whatsappDisplay + '.' },
      { h: 'الأطفال', p: 'الموقع مش موجّه للأطفال تحت ١٦ سنة، وما بنجمعش بيانات منهم عن قصد.' },
    ],
    en: [
      { h: 'What we collect', p: 'We collect the name, mobile number and address you enter at checkout — the minimum needed to fulfil your order and contact you about it.' },
      { h: 'How data is sent', p: 'This site does not store your data on a server. When you press “Send order”, the details are turned into a text message sent through WhatsApp from your own device — you press send.' },
      { h: 'Local storage', p: 'Your cart contents and theme preference are stored in your own browser (localStorage) and are never transmitted. You can clear them at any time from your browser settings.' },
      { h: 'Third-party services', p: `We use Google Fonts to render typefaces and WhatsApp to receive orders${TRACKERS.map((x) => `, and ${x.en}`).join('')}. Each has its own privacy policy.` },
      { h: 'Sharing', p: 'We do not sell or share your data with third parties for marketing. We share your address and phone number with the courier solely to complete delivery.' },
      { h: 'Your rights', p: `You may ask us to delete or disclose your data at any time by writing to ${SITE.contact.whatsappDisplay}.` },
      { h: 'Children', p: 'This site is not directed at children under 16, and we do not knowingly collect data from them.' },
    ],
  },

  terms: {
    ar: [
      { h: 'قبول الشروط', p: 'باستخدامك للموقع وإرسال طلب، إنت بتوافق على الشروط دي. لو مش موافق، من فضلك ما تستخدمش الموقع لإرسال طلبات.' },
      { h: 'الأسعار', p: 'كل الأسعار بالجنيه المصري وشاملة ضريبة القيمة المضافة حيث تنطبق. الأسعار قابلة للتغيير، والسعر النهائي بيتأكد وقت الرد على طلبك عبر واتساب.' },
      { h: 'توفّر المنتجات', p: 'وجود المنتج على الموقع مش ضمان لتوفّره لحظيًا. بنأكد التوفّر عند الرد على طلبك، ولو المنتج نفد هنعرض عليك بدائل.' },
      { h: 'طبيعة الطلب', p: 'إرسال الطلب عبر واتساب هو طلب شراء مبدئي وليس عقد بيع نهائي. العقد بيتم لما نأكد الطلب والسعر ومعاد التسليم.' },
      { h: 'الصور والمواصفات', p: 'بنبذل مجهود لدقة الصور والمواصفات، لكن قد يوجد اختلاف بسيط في اللون أو التفاصيل بين الصورة والمنتج الفعلي.' },
      { h: 'الاستخدام الآمن', p: 'ركوب الدراجات فيه مخاطر بطبيعته. ننصح بشدة باستخدام الخوذة والأنوار واتباع قواعد المرور. المتجر غير مسؤول عن الإصابات الناتجة عن الاستخدام.' },
      { h: 'الملكية الفكرية', p: 'كل المحتوى على الموقع من نصوص وتصميم مملوك لـ مودي بايك، وممنوع إعادة نشره تجاريًا من غير إذن.' },
      { h: 'القانون الواجب التطبيق', p: 'تخضع هذه الشروط لقوانين جمهورية مصر العربية.' },
    ],
    en: [
      { h: 'Acceptance', p: 'By using this site and submitting an order you agree to these terms. If you do not agree, please do not use the site to place orders.' },
      { h: 'Prices', p: 'All prices are in Egyptian pounds and include VAT where applicable. Prices may change, and the final price is confirmed when we reply to your order on WhatsApp.' },
      { h: 'Availability', p: 'A product appearing on the site is not a guarantee of immediate stock. We confirm availability when we respond to your order, and offer alternatives if an item has sold out.' },
      { h: 'Nature of an order', p: 'Sending an order over WhatsApp is a purchase enquiry, not a final contract of sale. The contract forms when we confirm the order, price and delivery date.' },
      { h: 'Images and specifications', p: 'We take care with images and specifications, but slight differences in colour or detail between a photo and the actual product are possible.' },
      { h: 'Safe use', p: 'Cycling carries inherent risk. We strongly recommend a helmet, lights and following traffic rules. The shop is not liable for injuries arising from use.' },
      { h: 'Intellectual property', p: 'All content on this site, including text and design, belongs to ModyBike and may not be republished commercially without permission.' },
      { h: 'Governing law', p: 'These terms are governed by the laws of the Arab Republic of Egypt.' },
    ],
  },
};

const TITLES = { shipping: 'legal.shipping', privacy: 'legal.privacy', terms: 'legal.terms' };

export default function Legal({ doc = 'privacy' }) {
  const { t, lang, date } = useLocale();
  const sections = CONTENT[doc]?.[lang] || [];
  const title = t(TITLES[doc]);
  const canonical = paths[doc]();

  return (
    <>
      <Seo
        lang={lang}
        title={title}
        description={sections[0]?.p?.slice(0, 200)}
        canonicalPath={canonical}
        noindex={SITE.isPlaceholderContent && doc !== 'shipping'}
        jsonLd={[
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: title, path: canonical },
          ]),
        ]}
      />

      <PageHeader
        breadcrumbs={[{ label: title }]}
        eyebrow={`${t('legal.lastUpdated')} · ${date(LAST_UPDATED)}`}
        title={title}
      />

      <div className="container-page py-14 lg:py-20">
        <div className="mx-auto max-w-prose">
          {SITE.isPlaceholderContent && doc !== 'shipping' ? (
            <p className="mb-12 flex gap-4 border-s-2 border-state-low bg-state-low/[0.07] p-5 text-sm leading-relaxed">
              <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-state-low dark:text-state-low-dark" />
              {lang === 'ar'
                ? 'النص ده صيغة مبدئية للعرض. يُنصح بمراجعته قانونيًا قبل إطلاق الموقع رسميًا.'
                : 'This text is a starting draft for preview. Have it reviewed legally before going live.'}
            </p>
          ) : null}

          <ol className="space-y-10">
            {sections.map((s, i) => (
              <li key={i} className="border-t pt-6 rule">
                <span className="tnum text-sm font-bold text-signal-600 dark:text-signal-400">{i + 1}.</span>
                <h2 className="mt-3 text-xl font-bold sm:text-2xl">{s.h}</h2>
                <p className="mt-4 text-[17px] leading-[1.85] text-carbon-700 dark:text-carbon-300">{s.p}</p>
              </li>
            ))}
          </ol>

          <p className="mt-14 border-t pt-8 text-[15px] leading-relaxed rule muted">
            {t('faq.stillQuestions')}{' '}
            <a
              href={`https://wa.me/${SITE.contact.whatsapp}`}
              className="link-underline font-bold text-signal-600 dark:text-signal-400"
              dir="ltr"
            >
              {SITE.contact.whatsappDisplay}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
