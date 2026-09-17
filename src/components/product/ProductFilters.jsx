import Icon from '../ui/Icon.jsx';
import Modal from '../ui/Modal.jsx';
import { Button } from '../ui/primitives.jsx';
import { Checkbox, Select } from '../ui/form.jsx';
import { useLocale } from '../../i18n/index.jsx';
import { CATEGORIES } from '../../data/categories.js';
import { AGE_GROUPS, PRODUCT_TYPES } from '../../data/collections.js';
import { PRICE_RANGE, WHEEL_SIZES, BRAKE_TYPES } from '../../data/products.js';

/* ==========================================================================
   Filters
   --------------------------------------------------------------------------
   Three pieces, deliberately separate so the page can place each one where it
   belongs: a toolbar spanning the results column, a sidebar beside them, and a
   sheet for phones. Bundling them together is what squeezes a sort control
   into a 240px rail.
   ========================================================================== */

export const EMPTY_FILTERS = {
  ageGroup: null,
  productType: null,
  category: null,
  subcategory: null,
  wheelSizes: [],
  brakes: [],
  maxPrice: null,
  height: null,
  inStockOnly: false,
  search: '',
};

export function countActive(v) {
  return (
    (v.ageGroup ? 1 : 0) +
    (v.productType ? 1 : 0) +
    (v.category ? 1 : 0) +
    (v.wheelSizes?.length || 0) +
    (v.brakes?.length || 0) +
    (v.inStockOnly ? 1 : 0) +
    (v.height ? 1 : 0) +
    (v.maxPrice != null && v.maxPrice < PRICE_RANGE.max ? 1 : 0) +
    (v.search ? 1 : 0)
  );
}

function Group({ title, children }) {
  return (
    <fieldset className="border-t py-6 rule">
      <legend className="label mb-4 muted">{title}</legend>
      {children}
    </fieldset>
  );
}

/** Square toggle chip. */
function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`label border px-3 py-2 transition-colors ${
        active
          ? 'border-carbon-950 bg-carbon-950 text-paper dark:border-paper dark:bg-paper dark:text-carbon-950'
          : 'rule hover:border-carbon-950 dark:hover:border-carbon-300'
      }`}
    >
      {children}
    </button>
  );
}

function FilterBody({ value, onChange, showCategory = true }) {
  const { t, tr, price, lang } = useLocale();

  const toggleIn = (key, item) => {
    const list = value[key] || [];
    onChange({
      ...value,
      [key]: list.includes(item) ? list.filter((x) => x !== item) : [...list, item],
    });
  };

  return (
    <div>
      {showCategory && <>
        <Group title={lang === 'ar' ? 'الفئة العمرية' : 'Age group'}>
          <div className="flex flex-wrap gap-2">
            {AGE_GROUPS.map((group) => <Chip key={group.slug} active={value.ageGroup === group.slug} onClick={() => onChange({ ...value, ageGroup: value.ageGroup === group.slug ? null : group.slug })}>{tr(group.label)}</Chip>)}
          </div>
        </Group>
        <Group title={lang === 'ar' ? 'نوع المنتج' : 'Product type'}>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_TYPES.map((type) => <Chip key={type.slug} active={value.productType === type.slug} onClick={() => onChange({ ...value, productType: value.productType === type.slug ? null : type.slug, category: null })}>{tr(type.label)}</Chip>)}
          </div>
        </Group>
      </>}
      {showCategory && (!value.productType || value.productType === 'bikes') ? (
        <Group title={t('product.filterCategory')}>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.kind === 'bike').map((c) => (
              <Chip
                key={c.slug}
                active={value.category === c.slug}
                onClick={() =>
                  onChange({ ...value, category: value.category === c.slug ? null : c.slug })
                }
              >
                {tr(c.name)}
              </Chip>
            ))}
          </div>
        </Group>
      ) : null}

      {(!value.productType || value.productType === 'bikes') && <>
      <Group title={t('product.filterWheel')}>
        <div className="flex flex-wrap gap-2">
          {WHEEL_SIZES.map((w) => (
            <Chip
              key={w}
              active={(value.wheelSizes || []).includes(w)}
              onClick={() => toggleIn('wheelSizes', w)}
            >
              {w}"
            </Chip>
          ))}
        </div>
      </Group>

      <Group title={t('product.filterBrakes')}>
        <div className="flex flex-wrap gap-2">
          {BRAKE_TYPES.map((b) => (
            <Chip key={b} active={(value.brakes || []).includes(b)} onClick={() => toggleIn('brakes', b)}>
              {t(`brakes.${b}`)}
            </Chip>
          ))}
        </div>
      </Group>

      </>}
      <Group title={t('product.filterPrice')}>
        <div className="label flex items-baseline justify-between muted">
          <span>{price(PRICE_RANGE.min)}</span>
          <span className="tnum text-carbon-900 dark:text-carbon-100">
            {price(value.maxPrice ?? PRICE_RANGE.max)}
          </span>
        </div>
        <input
          type="range"
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={100}
          value={value.maxPrice ?? PRICE_RANGE.max}
          onChange={(e) => onChange({ ...value, maxPrice: Number(e.target.value) })}
          aria-label={t('product.filterPrice')}
          className="mt-3 h-1 w-full cursor-pointer appearance-none bg-carbon-200 accent-signal-500 dark:bg-carbon-700"
        />
      </Group>

      <Group title={t('product.filterHeight')}>
        <div className="flex items-center gap-3">
          <input
            type="number"
            inputMode="numeric"
            min={70}
            max={220}
            value={value.height ?? ''}
            onChange={(e) => onChange({ ...value, height: e.target.value ? Number(e.target.value) : null })}
            placeholder="165"
            aria-label={t('product.filterHeight')}
            className="w-24 rounded-none border-0 border-b bg-transparent px-0 py-2 text-base rule focus:border-signal-500 focus:outline-none focus:ring-0"
          />
          <span className="label muted">{t('product.cm')}</span>
        </div>
      </Group>

      <div className="border-t py-6 rule">
        <Checkbox
          label={t('product.inStockOnly')}
          checked={!!value.inStockOnly}
          onChange={(e) => onChange({ ...value, inStockOnly: e.target.checked })}
        />
      </div>
    </div>
  );
}

/**
 * Results count + sort + (on phones) the button that opens the sheet.
 * Belongs above the grid, spanning the results column.
 */
export function FilterToolbar({ shown, total, sort, onSort, onOpenFilters, activeCount = 0 }) {
  const { t } = useLocale();
  const sortOptions = t('product.sortOptions');

  return (
    <div className="sticky top-[68px] z-40 -mx-5 border-b bg-paper/95 px-5 backdrop-blur-md rule dark:bg-carbon-950/95 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenFilters}
            className="label flex items-center gap-2 border px-4 py-2.5 transition-colors rule hover:border-carbon-950 dark:hover:border-carbon-300 lg:hidden"
          >
            <Icon name="filter" className="h-3.5 w-3.5" />
            {t('common.filters')}
            {activeCount ? (
              <span className="tnum -me-1 ms-1 bg-signal-500 px-1.5 text-white">{activeCount}</span>
            ) : null}
          </button>

          <p className="label tnum whitespace-nowrap muted">
            {t('product.showingResults', { count: shown, total })}
          </p>
        </div>

        <label className="flex items-center gap-3">
          <span className="label shrink-0 muted">{t('common.sort')}</span>
          <Select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="w-auto min-w-[10.5rem] py-2 text-sm"
          >
            {Object.entries(sortOptions).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </Select>
        </label>
      </div>
    </div>
  );
}

/** Desktop sidebar. */
export function FilterSidebar({ value, onChange, onClear, showCategory = true }) {
  const { t } = useLocale();
  const active = countActive(value);

  return (
    <div className="hidden lg:block">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="label">{t('common.filters')}</h2>
        {active ? (
          <button
            type="button"
            onClick={onClear}
            className="label link-underline text-signal-600 dark:text-signal-400"
          >
            {t('common.clear')}
          </button>
        ) : null}
      </div>
      <FilterBody value={value} onChange={onChange} showCategory={showCategory} />
    </div>
  );
}

/** Phone sheet. */
export function FilterSheet({ open, onClose, value, onChange, onClear, showCategory, shown, total }) {
  const { t } = useLocale();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('common.filters')}
      footer={
        <div className="flex gap-3">
          <Button variant="outline" size="md" onClick={onClear} className="flex-1">
            {t('common.clear')}
          </Button>
          <Button variant="solid" size="md" onClick={onClose} className="flex-[2]">
            {t('product.showingResults', { count: shown, total })}
          </Button>
        </div>
      }
    >
      <FilterBody value={value} onChange={onChange} showCategory={showCategory} />
    </Modal>
  );
}
