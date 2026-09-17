import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { Button } from '../ui/primitives.jsx';
import { Field, Input, Select } from '../ui/form.jsx';
import { useLocale } from '../../i18n/index.jsx';
import { paths } from '../../lib/routes.js';
import { recommendSize } from '../../data/sizing.js';
import { getProductsForSize } from '../../data/products.js';

/** Bike-type labels for the calculator — the catalogue categories the
 * recommendation maps onto. */
const BIKE_TYPE_LABELS = {
  hybrid: { ar: 'هجين', en: 'Hybrid' },
  mtb: { ar: 'جبلي', en: 'Mountain' },
  road: { ar: 'طريق', en: 'Road' },
};

/* ==========================================================================
   Size calculator
   --------------------------------------------------------------------------
   The single most useful thing on a bike shop's site, so it is given the
   weight of a real instrument: mono readouts, big figures, hairline rules.
   ========================================================================== */

/** One big numeric readout. */
function Readout({ label, value, unit, primary = false }) {
  return (
    <div className="border-t pt-4 rule">
      <p className="label muted">{label}</p>
      <p
        className={`tnum mt-2 font-bold tracking-tight ${
          primary ? 'text-display-sm text-signal-600 dark:text-signal-400' : 'text-2xl'
        }`}
      >
        {value}
        {unit ? <span className="ms-1 text-base font-medium muted">{unit}</span> : null}
      </p>
    </div>
  );
}

export default function SizeCalculator({ compact = false, onDark = false, className = '' }) {
  const { t, tr, path, num } = useLocale();

  const [riderType, setRiderType] = useState('adult');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [inseam, setInseam] = useState('');
  const [bikeType, setBikeType] = useState('hybrid');
  const [submitted, setSubmitted] = useState(false);

  const isChild = riderType === 'child';

  const result = useMemo(() => {
    if (!submitted) return null;
    return recommendSize({
      heightCm: height,
      ageYears: isChild ? Number(age) || null : null,
      inseamCm: inseam || null,
      bikeType: isChild ? 'kids' : bikeType,
    });
  }, [submitted, height, age, inseam, bikeType, isChild]);

  const matches = useMemo(() => (result ? getProductsForSize(result) : []), [result]);

  const invalid = submitted && !result;

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* Over a photograph the panel has to be genuinely opaque — a 4%-white fill
     lets the picture through and the field labels stop being readable. */
  const wrapper = onDark
    ? 'border-white/15 bg-carbon-950/80 backdrop-blur-md text-white [&_label]:!text-white/70 [&_.muted]:!text-white/65'
    : 'rule bg-paper-raised dark:bg-carbon-900';

  return (
    <div className={`border ${wrapper} ${className}`}>
      <form onSubmit={onSubmit} className="p-6 sm:p-8" noValidate>
        <p className={`label ${onDark ? 'text-signal-400' : 'text-signal-600 dark:text-signal-400'}`}>
          {t('sizeGuide.calcTitle')}
        </p>

        {/* rider type — segmented, square */}
        <div
          role="radiogroup"
          aria-label={t('sizeGuide.riderType')}
          className={`mt-6 inline-flex border ${onDark ? 'border-white/25' : 'rule'}`}
        >
          {[
            ['adult', t('sizeGuide.adult')],
            ['child', t('sizeGuide.child')],
          ].map(([v, label]) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={riderType === v}
              onClick={() => {
                setRiderType(v);
                setSubmitted(false);
              }}
              className={`label px-5 py-2.5 transition-colors ${
                riderType === v
                  ? onDark
                    ? 'bg-white text-carbon-950'
                    : 'bg-carbon-950 text-paper dark:bg-paper dark:text-carbon-950'
                  : 'hover:opacity-60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <Field
            label={t('sizeGuide.heightLabel')}
            required
            error={invalid ? t('sizeGuide.invalidHeight') : null}
          >
            {(p) => (
              <Input
                {...p}
                type="number"
                inputMode="numeric"
                min={70}
                max={220}
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  setSubmitted(false);
                }}
                placeholder={t('sizeGuide.heightPlaceholder')}
                className={onDark ? 'border-white/30 text-white placeholder:text-white/40' : ''}
              />
            )}
          </Field>

          {isChild ? (
            <Field label={t('sizeGuide.ageLabel')}>
              {(p) => (
                <Input
                  {...p}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={17}
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setSubmitted(false);
                  }}
                  placeholder={t('sizeGuide.agePlaceholder')}
                  className={onDark ? 'border-white/30 text-white placeholder:text-white/40' : ''}
                />
              )}
            </Field>
          ) : (
            <Field label={t('sizeGuide.bikeType')}>
              {(p) => (
                <Select
                  {...p}
                  value={bikeType}
                  onChange={(e) => {
                    setBikeType(e.target.value);
                    setSubmitted(false);
                  }}
                  className={onDark ? 'border-white/30 text-white' : ''}
                >
                  <option value="hybrid">{tr(BIKE_TYPE_LABELS.hybrid)}</option>
                  <option value="mtb">{tr(BIKE_TYPE_LABELS.mtb)}</option>
                  <option value="road">{tr(BIKE_TYPE_LABELS.road)}</option>
                </Select>
              )}
            </Field>
          )}

          {!compact ? (
            <Field
              label={t('sizeGuide.inseamLabel')}
              hint={t('sizeGuide.inseamHint')}
              className="sm:col-span-2"
            >
              {(p) => (
                <Input
                  {...p}
                  type="number"
                  inputMode="numeric"
                  min={30}
                  max={120}
                  value={inseam}
                  onChange={(e) => {
                    setInseam(e.target.value);
                    setSubmitted(false);
                  }}
                  placeholder={t('sizeGuide.inseamPlaceholder')}
                  className={onDark ? 'border-white/30 text-white placeholder:text-white/40' : ''}
                />
              )}
            </Field>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          variant={onDark ? 'onDark' : 'signal'}
          icon="ruler"
          className="mt-8 w-full sm:w-auto"
        >
          {t('sizeGuide.calculate')}
        </Button>
      </form>

      {/* ------------------------------------------------------------ result */}
      {result ? (
        <div
          className={`border-t p-6 sm:p-8 ${
            onDark ? 'border-white/15 bg-white/[0.06]' : 'rule bg-paper-sunk dark:bg-carbon-800/60'
          }`}
          aria-live="polite"
        >
          <p className="label mb-6 flex items-center gap-2 text-signal-600 dark:text-signal-400">
            <Icon name="check_circle" className="h-4 w-4" />
            {t('sizeGuide.resultTitle')}
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            <Readout label={t('sizeGuide.resultWheel')} value={result.wheelLabel} primary />
            {result.frameLabel ? (
              <Readout label={t('sizeGuide.resultFrame')} value={result.frameLabel} />
            ) : result.ageRange ? (
              <Readout
                label={t('product.suitableAges')}
                value={`${num(result.ageRange[0])}–${num(result.ageRange[1])}`}
                unit={t('product.years')}
              />
            ) : null}
            <Readout
              label={t('sizeGuide.resultSaddle')}
              value={num(Math.round(result.saddle))}
              unit={t('product.cm')}
            />
          </div>

          <p className={`mt-6 max-w-measure text-xs leading-relaxed ${onDark ? 'text-white/60' : 'muted'}`}>
            {t('sizeGuide.resultNote')}
          </p>

          {matches.length ? (
            <Button
              as={Link}
              to={path(paths.products(`wheel=${result.matchWheelSizes.join(',')}`))}
              variant={onDark ? 'onDark' : 'solid'}
              size="md"
              iconEnd="arrowRight"
              className="mt-6"
            >
              {t('sizeGuide.viewMatching', { count: matches.length })}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
