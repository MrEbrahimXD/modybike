import { forwardRef, useId } from 'react';
import Icon from './Icon.jsx';

/* ==========================================================================
   Form controls
   --------------------------------------------------------------------------
   Underlined rather than boxed. Square corners, a single accent on focus, and
   labels that sit above in mono so a long form still scans as a spec sheet.
   ========================================================================== */

const CONTROL =
  'w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-base ' +
  'text-carbon-950 placeholder:text-carbon-500 dark:text-carbon-50 dark:placeholder:text-carbon-400 ' +
  'border-carbon-300 dark:border-carbon-700 ' +
  'focus:border-signal-500 focus:outline-none focus:ring-0 transition-colors duration-200';

/** Label + control + hint/error, wired together for screen readers. */
export function Field({ label, hint, error, required, children, className = '', id: idProp }) {
  const auto = useId();
  const id = idProp || auto;
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="label block text-carbon-600 dark:text-carbon-400">
        {label}
        {required ? (
          <span className="ms-1 text-signal-500" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {typeof children === 'function'
        ? children({
            id,
            'aria-describedby': [hintId, errId].filter(Boolean).join(' ') || undefined,
            'aria-invalid': error ? true : undefined,
            required,
          })
        : children}

      {hint && !error ? (
        <p id={hintId} className="mt-2 text-xs leading-relaxed muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errId} className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-state-out dark:text-state-out-dark">
          <Icon name="alert" className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const Input = forwardRef(function Input({ className = '', ...rest }, ref) {
  return <input ref={ref} className={`${CONTROL} ${className}`} {...rest} />;
});

export const Textarea = forwardRef(function Textarea({ className = '', rows = 5, ...rest }, ref) {
  return <textarea ref={ref} rows={rows} className={`${CONTROL} resize-y ${className}`} {...rest} />;
});

export const Select = forwardRef(function Select({ className = '', children, ...rest }, ref) {
  return (
    <div className="relative">
      <select ref={ref} className={`${CONTROL} appearance-none pe-8 ${className}`} {...rest}>
        {children}
      </select>
      <Icon
        name="chevronDown"
        className="pointer-events-none absolute end-0 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon-400"
        aria-hidden="true"
      />
    </div>
  );
});

/** Square checkbox — matches the rest of the geometry. */
export function Checkbox({ label, hint, className = '', id: idProp, ...rest }) {
  const auto = useId();
  const id = idProp || auto;
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded-none border-carbon-400 bg-transparent text-signal-500 focus:ring-0 focus:ring-offset-0 dark:border-carbon-600"
        {...rest}
      />
      <label htmlFor={id} className="text-sm leading-snug">
        {label}
        {hint ? <span className="mt-1 block text-xs muted">{hint}</span> : null}
      </label>
    </div>
  );
}

/**
 * Segmented radio group — used for payment method, delivery choice, sort order.
 * Reads as a row of hard-edged tabs rather than a stack of pills.
 */
export function RadioCards({ name, value, onChange, options = [], className = '' }) {
  return (
    <div role="radiogroup" className={`grid gap-px border rule bg-carbon-200 dark:bg-carbon-800 ${className}`}>
      {options.map((o) => {
        const active = value === o.value;
        return (
          <label
            key={o.value}
            className={`flex cursor-pointer items-start gap-3 p-4 transition-colors duration-200 ${
              active
                ? 'bg-carbon-950 text-paper dark:bg-paper dark:text-carbon-950'
                : 'bg-paper-raised hover:bg-paper-sunk dark:bg-carbon-900 dark:hover:bg-carbon-800'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={active}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`mt-1 grid h-4 w-4 shrink-0 place-items-center border ${
                active ? 'border-current' : 'border-carbon-400'
              }`}
            >
              {active ? <span className="h-2 w-2 bg-current" /> : null}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-snug">{o.label}</span>
              {o.hint ? (
                <span className={`mt-1 block text-xs leading-relaxed ${active ? 'opacity-75' : 'muted'}`}>
                  {o.hint}
                </span>
              ) : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}

/** Quantity stepper. */
export function QtyStepper({ value, onChange, min = 1, max = 20, label, className = '' }) {
  return (
    <div className={`inline-flex items-stretch border rule ${className}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`${label} −`}
        className="grid w-10 place-items-center transition-colors hover:bg-carbon-950 hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit dark:hover:bg-paper dark:hover:text-carbon-950"
      >
        <Icon name="minus" className="h-3.5 w-3.5" />
      </button>
      <span className="tnum grid w-12 place-items-center border-x rule text-sm font-bold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`${label} +`}
        className="grid w-10 place-items-center transition-colors hover:bg-carbon-950 hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit dark:hover:bg-paper dark:hover:text-carbon-950"
      >
        <Icon name="plus" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
