/**
 * Testo nepavyko – greitos nuorodos į teorijos skaidres (M8→M7, M11→M10, M14→M13).
 */
import { getModulesSync } from '../../../data/modulesLoader';
import type { StepExplanationsLocale } from './stepExplanations';

type LinkSpec = {
  targetModuleId: number;
  slideId: number;
  labelLt: string;
  labelEn: string;
};

const LINKS_M8: LinkSpec[] = [
  {
    targetModuleId: 7,
    slideId: 73,
    labelLt: 'Pipeline (6 žingsniai)',
    labelEn: 'Pipeline (6 steps)',
  },
  {
    targetModuleId: 7,
    slideId: 92,
    labelLt: 'BI schema',
    labelEn: 'BI schema',
  },
  {
    targetModuleId: 7,
    slideId: 74,
    labelLt: 'MASTER promptas',
    labelEn: 'MASTER prompt',
  },
  {
    targetModuleId: 7,
    slideId: 731,
    labelLt: '4 analizės tipai',
    labelEn: 'Four analysis types',
  },
  {
    targetModuleId: 7,
    slideId: 891,
    labelLt: 'Valymas ir seka',
    labelEn: 'Cleaning & sequence',
  },
];

const LINKS_M11: LinkSpec[] = [
  {
    targetModuleId: 10,
    slideId: 10.2,
    labelLt: 'Agentų ciklas',
    labelEn: 'Agent cycle',
  },
  {
    targetModuleId: 10,
    slideId: 10.15,
    labelLt: 'Trigger / webhook',
    labelEn: 'Trigger / webhook',
  },
  {
    targetModuleId: 10,
    slideId: 10.25,
    labelLt: '3A strategija',
    labelEn: '3A strategy',
  },
  { targetModuleId: 10, slideId: 10.4, labelLt: 'Įrankiai', labelEn: 'Tools' },
  {
    targetModuleId: 10,
    slideId: 10.6,
    labelLt: 'Ribos ir klaidos',
    labelEn: 'Limits & errors',
  },
];

const LINKS_M14: LinkSpec[] = [
  {
    targetModuleId: 13,
    slideId: 13.2,
    labelLt: 'Vaizdo promptas',
    labelEn: 'Image prompt',
  },
  {
    targetModuleId: 13,
    slideId: 13.4,
    labelLt: 'Video scenarijus',
    labelEn: 'Video script',
  },
  { targetModuleId: 13, slideId: 13.6, labelLt: 'Muzika', labelEn: 'Music' },
  {
    targetModuleId: 13,
    slideId: 13.101,
    labelLt: 'KPI ir rizikos',
    labelEn: 'KPI & risks',
  },
  {
    targetModuleId: 13,
    slideId: 13.11,
    labelLt: 'Brief → publikacija',
    labelEn: 'Brief → publication',
  },
];

function linksFor(moduleId: 8 | 11 | 14): LinkSpec[] {
  if (moduleId === 8) return LINKS_M8;
  if (moduleId === 11) return LINKS_M11;
  return LINKS_M14;
}

export default function TestRemediationChips({
  testModuleId,
  locale,
  onGoToModule,
  sourceModuleId,
}: {
  testModuleId: 8 | 11 | 14;
  locale: StepExplanationsLocale;
  onGoToModule?: (
    moduleId: number,
    slideIndex?: number,
    fromRemediationSourceModuleId?: number
  ) => void;
  /** Modulis, kuriame dabar rodomas test-results (8, 11 arba 14) */
  sourceModuleId: number;
}) {
  const links = linksFor(testModuleId);
  const modules = getModulesSync(locale);

  const go = (spec: LinkSpec) => {
    if (!onGoToModule) return;
    const mod = modules?.find((m) => m.id === spec.targetModuleId);
    const idx = mod ? mod.slides.findIndex((s) => s.id === spec.slideId) : -1;
    onGoToModule(
      spec.targetModuleId,
      idx >= 0 ? idx : undefined,
      sourceModuleId
    );
  };

  const heading =
    locale === 'en'
      ? 'Quick links to theory slides'
      : 'Greitos nuorodos į teorijos skaidres';

  return (
    <div
      className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700"
      role="region"
      aria-label={heading}
    >
      <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">
        {heading}
      </h4>
      <div className="flex flex-wrap gap-2">
        {links.map((spec) => (
          <button
            key={`${spec.targetModuleId}-${spec.slideId}`}
            type="button"
            onClick={() => go(spec)}
            className="text-xs font-medium px-3 py-2 rounded-lg border border-brand-300 dark:border-brand-600 bg-white dark:bg-gray-900 text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {locale === 'en' ? spec.labelEn : spec.labelLt}
          </button>
        ))}
      </div>
    </div>
  );
}
