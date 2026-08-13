/**
 * ChoiceControl – exclusive choice (radiogroup).
 * GOLDEN §3.1b: default selected = brand; Content track path may use rose (§6b).
 * GOLDEN §3.1c: optional `optionTone` for interactive-control-lab (and §6b path).
 */
import {
  useCallback,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactElement,
} from 'react';
import { CheckCircle, type LucideIcon } from 'lucide-react';
import { slideCardIconClasses } from '../../icons/iconSizes';
import { focusRingClasses, touchTargetClasses } from '../../design-tokens';

export type ChoiceOptionTone = 'brand' | 'amber' | 'rose' | 'slate';

export type ChoiceOption<T extends string = string> = {
  id: T;
  label: string;
  description?: string;
  icon?: LucideIcon;
  /** Unselected-only extra classes (e.g. ordinal brand wash on 10.45). */
  unselectedClassName?: string;
};

export type ChoiceControlProps<T extends string = string> = {
  legend: string;
  options: ChoiceOption<T>[];
  /** null = niekas nepasirinkta (pvz. M7 prieš pirmą pasirinkimą) */
  value: T | null;
  onChange: (id: T) => void;
  columns?: 1 | 2 | 3;
  size?: 'compact' | 'comfortable';
  className?: string;
  /** Po pasirinkimo – viena eilutė (skaitiklis / trumpas statusas) */
  statusHint?: string;
  /**
   * Lab (GOLDEN §3.1c) or Content-track path (§6b rose). When omitted, selected = brand.
   * Partial map: missing ids fall back to brand.
   */
  optionTone?: Partial<Record<T, ChoiceOptionTone>>;
  /**
   * Opt-in: show optionTone wash on unselected cards (not white).
   * Default false — M7/M9/M13 keep current white unselected.
   */
  toneVisibleWhenUnselected?: boolean;
  /**
   * visible = current legend. sr-only = a11y label only.
   * hidden = aria-label on radiogroup, no legend node.
   */
  legendMode?: 'visible' | 'sr-only' | 'hidden';
  /**
   * When true, selected chrome is always brand (border+tint+✓).
   * optionTone then only paints stripe / unselected wash — 10.26 selected ≠ severity.
   */
  selectedUsesBrand?: boolean;
};

const columnClasses: Record<1 | 2 | 3, string> = {
  1: 'grid grid-cols-1 gap-3',
  2: 'grid grid-cols-1 sm:grid-cols-2 gap-3',
  3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4',
};

const sizeClasses: Record<'compact' | 'comfortable', string> = {
  compact: 'p-4 rounded-xl',
  comfortable: 'p-4 sm:p-5 rounded-2xl',
};

const TONE_SELECTED: Record<
  ChoiceOptionTone,
  { border: string; bg: string; ring: string; check: string; iconBg: string }
> = {
  brand: {
    border: 'border-brand-500',
    bg: 'bg-brand-50 dark:bg-brand-900/30',
    ring: 'ring-1 ring-brand-200 dark:ring-brand-800',
    check: 'bg-brand-500',
    iconBg: 'bg-brand-500 text-white',
  },
  amber: {
    border: 'border-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    ring: 'ring-1 ring-amber-200 dark:ring-amber-800',
    check: 'bg-amber-500',
    iconBg: 'bg-amber-500 text-white',
  },
  rose: {
    border: 'border-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-900/30',
    ring: 'ring-1 ring-rose-200 dark:ring-rose-800',
    check: 'bg-rose-500',
    iconBg: 'bg-rose-500 text-white',
  },
  slate: {
    border: 'border-slate-500',
    bg: 'bg-slate-50 dark:bg-slate-800/60',
    ring: 'ring-1 ring-slate-200 dark:ring-slate-700',
    check: 'bg-slate-500',
    iconBg: 'bg-slate-500 text-white',
  },
};

const TONE_STRIPE: Record<ChoiceOptionTone, string> = {
  brand: 'border-l-brand-500',
  amber: 'border-l-amber-500',
  rose: 'border-l-rose-500',
  slate: 'border-l-slate-500',
};

const TONE_UNSELECTED_WASH: Record<ChoiceOptionTone, string> = {
  brand:
    'border-brand-200 dark:border-brand-800 bg-brand-50/70 dark:bg-brand-900/20',
  amber:
    'border-amber-200 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-900/20',
  rose: 'border-rose-200 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-900/20',
  slate:
    'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/40',
};

export default function ChoiceControl<T extends string>({
  legend,
  options,
  value,
  onChange,
  columns = 2,
  size = 'compact',
  className = '',
  statusHint,
  optionTone,
  toneVisibleWhenUnselected = false,
  legendMode = 'visible',
  selectedUsesBrand = false,
}: ChoiceControlProps<T>): ReactElement {
  const baseId = useId();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const useTone = optionTone != null;

  const focusIndex = useCallback((index: number) => {
    const el = buttonRefs.current[index];
    el?.focus();
  }, []);

  const selectByOffset = useCallback(
    (fromIndex: number, delta: number) => {
      if (options.length === 0) return;
      const next = (fromIndex + delta + options.length * 10) % options.length;
      const opt = options[next];
      if (!opt) return;
      onChange(opt.id);
      focusIndex(next);
    },
    [options, onChange, focusIndex]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>, index: number) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          selectByOffset(index, 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          selectByOffset(index, -1);
          break;
        case 'Home':
          event.preventDefault();
          if (options[0]) {
            onChange(options[0].id);
            focusIndex(0);
          }
          break;
        case 'End':
          event.preventDefault();
          {
            const last = options.length - 1;
            if (options[last]) {
              onChange(options[last].id);
              focusIndex(last);
            }
          }
          break;
        default:
          break;
      }
    },
    [selectByOffset, options, onChange, focusIndex]
  );

  return (
    <div className={className.trim() || undefined}>
      <div
        role="radiogroup"
        aria-labelledby={
          legendMode === 'hidden' ? undefined : `${baseId}-legend`
        }
        aria-label={legendMode === 'hidden' ? legend : undefined}
        className="space-y-3"
      >
        {legendMode !== 'hidden' ? (
          <p
            id={`${baseId}-legend`}
            className={
              legendMode === 'sr-only'
                ? 'sr-only'
                : 'text-sm font-bold text-gray-900 dark:text-white'
            }
          >
            {legend}
          </p>
        ) : null}
        <div className={columnClasses[columns]}>
          {options.map((option, index) => {
            const isSelected = value === option.id;
            const Icon = option.icon;
            const tone: ChoiceOptionTone = optionTone?.[option.id] ?? 'brand';
            const selectedTone =
              TONE_SELECTED[selectedUsesBrand ? 'brand' : tone];
            const stripe = useTone ? `border-l-4 ${TONE_STRIPE[tone]}` : '';
            const unselectedWash =
              option.unselectedClassName ??
              (toneVisibleWhenUnselected && useTone
                ? TONE_UNSELECTED_WASH[tone]
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md');
            return (
              <button
                key={option.id}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={
                  value === null ? (index === 0 ? 0 : -1) : isSelected ? 0 : -1
                }
                onClick={() => onChange(option.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`relative flex flex-col items-start text-left ${touchTargetClasses.minimumHeight} border-2 transition-all duration-200 ${focusRingClasses.brandOnWhite} ${sizeClasses[size]} ${stripe} ${
                  isSelected
                    ? `${selectedTone.border} ${selectedTone.bg} shadow-sm ${selectedTone.ring}`
                    : `${unselectedWash} ${option.unselectedClassName ? 'hover:shadow-md' : ''}`
                }`}
              >
                <span className="flex items-center gap-3 w-full">
                  {Icon ? (
                    <span
                      className={`flex items-center justify-center rounded-xl shrink-0 ${slideCardIconClasses.box} ${
                        isSelected
                          ? selectedTone.iconBg
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Icon className={slideCardIconClasses.icon} aria-hidden />
                    </span>
                  ) : null}
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {option.label}
                  </span>
                </span>
                {option.description ? (
                  <span className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-snug">
                    {option.description}
                  </span>
                ) : null}
                {isSelected ? (
                  <span
                    className={`absolute top-3 right-3 w-6 h-6 rounded-full ${selectedTone.check} flex items-center justify-center`}
                    aria-hidden
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
      {statusHint ? (
        <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
          {statusHint}
        </p>
      ) : null}
    </div>
  );
}
