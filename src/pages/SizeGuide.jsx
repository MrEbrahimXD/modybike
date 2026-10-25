import { PageHeader } from '../components/layout/Layout.jsx';
import SizeCalculator from '../components/product/SizeCalculator.jsx';
import { Eyebrow, Section } from '../components/ui/primitives.jsx';
import { Seo, breadcrumbSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import {
  KIDS_SIZES,
  ADULT_MTB_SIZES,
  ROAD_SIZES,
  ETRTO_TABLE,
  TYRE_PRESSURE,
} from '../data/sizing.js';

/* ==========================================================================
   Size guide
   --------------------------------------------------------------------------
   Reference tables treated as reference tables: mono heads, tabular figures,
   hairline rules, and a heavy top border so each one reads as an instrument.
   ========================================================================== */

function DataTable({ caption, head, rows, index }) {
  return (
    <figure className="mt-14 first:mt-0">
      <Eyebrow as="figcaption">
        {caption}
      </Eyebrow>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-start text-sm">
          <thead>
            <tr>
              {head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="spec border-b-2 border-carbon-950 py-3 pe-4 text-start align-bottom text-carbon-500 dark:border-carbon-100 dark:text-carbon-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b transition-colors rule hover:bg-paper-sunk dark:hover:bg-carbon-900">
                {r.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`py-3.5 pe-4 align-top ${
                      ci === 0 ? 'font-bold' : 'tnum muted'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default function SizeGuide() {
  const { t, tr, lang, num } = useLocale();

  return (
    <>
      <Seo
        lang={lang}
        title={`${t('sizeGuide.title')} — ${t('common.brand')}`}
        description={t('sizeGuide.subtitle')}
        canonicalPath={paths.sizeGuide()}
        jsonLd={[
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('sizeGuide.title'), path: paths.sizeGuide() },
          ]),
        ]}
      />

      <PageHeader
        title={t('sizeGuide.title')}
        lede={t('sizeGuide.subtitle')}
        breadcrumbs={[{ label: t('sizeGuide.title') }]}
      />

      <Section>
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <SizeCalculator />
          </div>
        </div>
      </Section>

      <Section className="border-t bg-paper-sunk rule dark:bg-carbon-900/50">
        <div className="container-page">
          <h2 className="text-display-md">{t('sizeGuide.tablesTitle')}</h2>

          <div className="mt-12">
            <DataTable
              caption={t('sizeGuide.kidsTable')}
              head={[
                t('sizeGuide.resultWheel'),
                t('product.suitableHeights'),
                t('product.suitableAges'),
              ]}
              rows={KIDS_SIZES.map((r) => [
                `${r.wheel}"`,
                `${num(r.heightMin)} – ${num(r.heightMax)} ${t('product.cm')}`,
                `${num(r.ageMin)} – ${num(r.ageMax)} ${t('product.years')}`,
              ])}
            />

            <DataTable
              caption={t('sizeGuide.adultTable')}
              head={[
                t('product.frameSize'),
                t('product.suitableHeights'),
                t('sizeGuide.resultWheel'),
              ]}
              rows={ADULT_MTB_SIZES.map((r) => [
                `${r.frameIn}" (${r.label})`,
                `${num(r.heightMin)} – ${num(r.heightMax)} ${t('product.cm')}`,
                `${r.wheel}"`,
              ])}
            />

            <DataTable
              caption={t('sizeGuide.roadTable')}
              head={[t('product.frameSize'), t('product.suitableHeights'), t('common.all')]}
              rows={ROAD_SIZES.map((r) => [
                `${num(r.frameCm)} ${t('product.cm')}`,
                `${num(r.heightMin)} – ${num(r.heightMax)} ${t('product.cm')}`,
                r.label || '—',
              ])}
            />

            <DataTable
              caption={t('sizeGuide.etrtoTable')}
              head={[t('sizeGuide.resultWheel'), 'ISO / ETRTO', t('product.details')]}
              rows={ETRTO_TABLE.map((r) => [
                typeof r.inch === 'number' ? `${r.inch}"` : r.inch,
                `${r.iso} — ${r.common}`,
                tr(r.use),
              ])}
            />

            <DataTable
              caption={t('sizeGuide.pressureTable')}
              head={[t('nav.products'), 'PSI', 'BAR']}
              rows={TYRE_PRESSURE.map((r) => [tr(r.type), r.psi, r.bar])}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
