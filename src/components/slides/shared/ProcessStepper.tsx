import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useLocale } from '../../../contexts/LocaleContext';
import CustomGptProcessDiagram from './CustomGptProcessDiagram';
import { useIsMobile } from '../../../utils/useIsMobile';

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  /** Ką konkrečiai padaryti – veiksmo orientuoti žingsniai (max nauda). */
  actionChecklist?: string[];
  /** Nuoroda į išorinį resursą (pvz. ChatGPT Create GPT). */
  externalLink?: { label: string; href: string };
  /** Trumpas patarimas arba dažna klaida (⚠️). */
  tip?: string;
}

const CUSTOM_GPT_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Tikslas',
    description: 'Nuspręsk, kam skirtas GPT: pardavimams, mokymams, kūrybai ar kitiems scenarijams. Aiškūs tikslai padeda formuoti instrukcijas.',
    actionChecklist: ['Užrašyk vienu sakiniumi: kam bus naudojamas asistentas.', 'Pasirink 1–2 konkrečius naudojimo atvejus (pvz. „santraukos“, „atsakymai klientams“).'],
  },
  {
    id: 2,
    title: 'Rolė',
    description: 'Apibrėžk toną, stilių ir kompetenciją: kaip asistentas turi atsakyti ir kokią ekspertizę demonstruoti.',
    actionChecklist: ['Parašyk: „Tu esi [rolė]“.', 'Nustatyk toną: profesionalus / draugiškas / glaustas.', 'Apribok temas: ką asistentas moka ir ko ne.'],
  },
  {
    id: 3,
    title: 'Prisijungimas',
    description: 'ChatGPT → Explore GPTs → Create a GPT. Atidaryk Custom GPT kūrimo langą.',
    actionChecklist: ['Prisijunk prie ChatGPT (Plus būtina).', 'Meniu: Explore GPTs → Create a GPT.', 'Pasirink „Configure“ ir pradėk nuo pavadinimo.'],
    externalLink: { label: 'Atidaryti ChatGPT → Create a GPT', href: 'https://chat.openai.com/gpts/editor' },
  },
  {
    id: 4,
    title: 'Konfigūracija',
    description: 'Įvesk pavadinimą, aprašymą, pagrindines instrukcijas ir personą – kaip GPT elgsis ir ką moka.',
    actionChecklist: ['Pavadinimas: aiškus ir trumpas.', 'Instructions: įklijuok arba parašyk instrukcijas (šabloną rasite šios skaidrės apačioje).', 'Conversation starters: 2–4 pavyzdinės užklausos.'],
    tip: 'Instrukcijas rašyk taip, lyg aiškintum naujam darbuotojui – konkrečiai ir veiksmažodžiais.',
  },
  {
    id: 5,
    title: 'Papildomos funkcijos',
    description: 'Pridėk dokumentus, API ar įrankius (Tools), jei reikia – tai praplėčia GPT galimybes.',
    actionChecklist: ['Jei reikia: įkelk PDF/tekstus (Knowledge).', 'Jei reikia: prijunk „Actions“ (API).', 'Jei ne – palik tuščią ir pereik prie testavimo.'],
  },
  {
    id: 6,
    title: 'Testavimas',
    description: 'Išbandyk GPT su įvairiomis užklausomis ir pataisyk instrukcijas pagal rezultatus.',
    actionChecklist: ['Užduok 3 skirtingas užklausas (paprastą, sudėtingą, kraštutinę).', 'Patikrink: ar tonas ir ilgis atitinka tikslus.', 'Jei ne – grįžk į Instructions ir pataisyk.'],
    tip: 'Dažna klaida: per bendros instrukcijos. Pridėk konkrečių pavyzdžių ar apribojimų.',
  },
  {
    id: 7,
    title: 'Publikavimas',
    description: 'Kai rezultatai patenkina – publikuok tik savo naudojimui arba bendrai bendruomenei.',
    actionChecklist: ['Pasirink: Only me / Anyone with link / Public.', 'Nustatyk (jei reikia) kategoriją ir žymes.', 'Paspausk Publish.'],
  },
  {
    id: 8,
    title: 'Tobulinimas',
    description: 'Naudok grįžtamąjį ryšį: stebėk naudotojų elgesį ir nuolatos tobulink instrukcijas.',
    actionChecklist: ['Stebėk, kokios užklausos dažnos ir ar atsakymai tinka.', 'Periodiškai atidaryk Configure ir pataisyk Instructions.', 'Pridėk naujų Conversation starters pagal naudojimą.'],
  },
];

/** Full EN step content when locale is 'en' (same order and structure as CUSTOM_GPT_STEPS). */
const CUSTOM_GPT_STEPS_EN: ProcessStep[] = [
  {
    id: 1,
    title: 'Goal',
    description: 'Decide what the GPT is for: sales, training, creativity, or other uses. Clear goals help shape the instructions.',
    actionChecklist: ['Write in one sentence: what the assistant will be used for.', 'Choose 1–2 concrete use cases (e.g. "summaries", "customer replies").'],
  },
  {
    id: 2,
    title: 'Role',
    description: 'Define tone, style and expertise: how the assistant should answer and what knowledge to show.',
    actionChecklist: ['Write: "You are [role]".', 'Set the tone: professional / friendly / concise.', 'Limit the scope: what the assistant can and cannot do.'],
  },
  {
    id: 3,
    title: 'Connection',
    description: 'ChatGPT → Explore GPTs → Create a GPT. Open the Custom GPT creation screen.',
    actionChecklist: ['Sign in to ChatGPT (Plus required).', 'Menu: Explore GPTs → Create a GPT.', 'Choose "Configure" and start with the name.'],
    externalLink: { label: 'Open ChatGPT → Create a GPT', href: 'https://chat.openai.com/gpts/editor' },
  },
  {
    id: 4,
    title: 'Configuration',
    description: 'Enter name, description, main instructions and persona – how the GPT will behave and what it knows.',
    actionChecklist: ['Name: clear and short.', 'Instructions: paste or write your instructions (template at the bottom of this slide).', 'Conversation starters: 2–4 example prompts.'],
    tip: 'Write instructions as if explaining to a new team member – concrete and action-oriented.',
  },
  {
    id: 5,
    title: 'Extra features',
    description: 'Add documents, API or tools if needed – this extends what the GPT can do.',
    actionChecklist: ['If needed: upload PDFs or text (Knowledge).', 'If needed: connect Actions (API).', 'If not – leave empty and go to testing.'],
  },
  {
    id: 6,
    title: 'Testing',
    description: 'Try the GPT with different prompts and adjust instructions based on the results.',
    actionChecklist: ['Ask 3 different prompts (simple, complex, edge case).', 'Check: does the tone and length match your goals.', 'If not – go back to Instructions and adjust.'],
    tip: 'Common mistake: instructions too vague. Add concrete examples or limits.',
  },
  {
    id: 7,
    title: 'Publishing',
    description: 'When you are happy with the results – publish for yourself only or share with others.',
    actionChecklist: ['Choose: Only me / Anyone with link / Public.', 'Set category and tags if needed.', 'Click Publish.'],
  },
  {
    id: 8,
    title: 'Improvement',
    description: 'Use feedback: watch how people use it and keep improving the instructions.',
    actionChecklist: ['See which prompts are used most and whether answers fit.', 'Open Configure from time to time and adjust Instructions.', 'Add new Conversation starters based on use.'],
  },
];

export default function ProcessStepper() {
  const { t } = useTranslation('stepper');
  const { locale } = useLocale();
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = locale === 'en' ? CUSTOM_GPT_STEPS_EN : CUSTOM_GPT_STEPS;
  const stepTitles = steps.map((s) => s.title);
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;
  const nextStep = steps[currentStep + 1];

  const progressPct = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6" role="region" aria-label={t('regionAria')}>
      {/* Pilna proceso diagrama: aktyvus žingsnis paryškintas, kiti priteminti */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-4 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 px-3 py-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
            <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" aria-hidden />
            {t('youAreHere', { n: currentStep + 1, title: stepTitles[currentStep] })}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
        {isMobile ? (
          <div className="overflow-x-auto -mx-2 px-2 pb-2">
            <div style={{ minWidth: 600 }}>
              <CustomGptProcessDiagram currentStep={currentStep} onStepClick={setCurrentStep} stepTitles={stepTitles} className="min-h-[320px]" />
            </div>
          </div>
        ) : (
          <CustomGptProcessDiagram currentStep={currentStep} onStepClick={setCurrentStep} stepTitles={stepTitles} className="min-h-[320px]" />
        )}
      </div>

      {/* Žingsnių juosta: pasirinkimas */}
      <div>
        <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          {t('selectStep')}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2" aria-label={t('navAria')}>
          {steps.map((step, idx) => {
            const isPast = idx < currentStep;
            const isActive = idx === currentStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(idx)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={isPast ? t('stepButtonDoneAria', { id: step.id, title: stepTitles[idx] }) : t('stepButtonAria', { id: step.id, title: stepTitles[idx] })}
                className={`
                  flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all min-w-[2.5rem] cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
                  ${isPast ? 'border-emerald-400 bg-emerald-100 text-emerald-800 dark:border-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200 hover:bg-emerald-200/80 dark:hover:bg-emerald-900/60' : ''}
                  ${isActive ? 'border-brand-500 bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-110 ring-2 ring-brand-400/30' : ''}
                  ${!isPast && !isActive ? 'border-gray-300 bg-gray-100 text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 dark:hover:border-brand-600' : ''}
                `}
              >
                {isPast ? <CheckCircle className="h-5 w-5" /> : step.id}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Progreso juosta */}
      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label={t('progressAria', { current: currentStep + 1, total: steps.length })}
        />
      </div>

      {/* Dabartinio žingsnio kortelė + „Ką padaryti dabar“ + nuorodos / patarimai */}
      <div className="rounded-xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50/60 dark:bg-brand-900/20 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            {steps[currentStep].id}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
            {t('stepOfTotal', { total: steps.length })}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {steps[currentStep].title}
        </h3>
        <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
          {steps[currentStep].description}
        </p>

        {/* Ką padaryti dabar – veiksmo checklist (max nauda) */}
        {steps[currentStep].actionChecklist && steps[currentStep].actionChecklist.length > 0 && (
          <div className="mt-4 pt-4 border-t border-brand-200 dark:border-brand-700">
            <p className="text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2">
              {t('doNow')}
            </p>
            <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              {steps[currentStep].actionChecklist!.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-brand-500 mt-0.5 shrink-0" aria-hidden>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Išorinė nuoroda (pvz. ChatGPT Create GPT) */}
        {steps[currentStep].externalLink && (
          <a
            href={steps[currentStep].externalLink!.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-brand-200 dark:border-brand-700 px-4 py-2.5 text-sm font-medium text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
          >
            {steps[currentStep].externalLink!.label}
            <span className="text-xs" aria-hidden>↗</span>
          </a>
        )}

        {/* Patarimas / dažna klaida */}
        {steps[currentStep].tip && (
          <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-200 mb-0.5">
              {t('tip')}
            </p>
            <p className="text-sm text-amber-800/90 dark:text-amber-200/90">
              {steps[currentStep].tip}
            </p>
          </div>
        )}

        {/* Nuoroda į šabloną kitoje skaidrėje (žingsnis 4 – Konfigūracija) */}
        {currentStep === 3 && (
          <p className="mt-4 text-xs text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t('templateHint').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        )}

        {/* Refleksija pabaigoje (žingsnis 8) – max nauda: ką jau turi / ką toliau */}
        {currentStep === 7 && (
          <div className="mt-4 pt-4 border-t border-brand-200 dark:border-brand-700">
            <p className="text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2">
              {t('summaryHeading')}
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• {t('summaryBullet1')}</li>
              <li>• {t('summaryBullet2')}</li>
              <li>• {t('summaryBullet3')}</li>
              <li>• {t('summaryBullet4')}</li>
            </ul>
          </div>
        )}
      </div>

      {/* Navigacija: Ankstesnis / Toliau */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={isFirst}
          className="btn-secondary inline-flex items-center justify-center gap-2 py-3 sm:py-2 disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
          aria-label={t('prevStepAria')}
        >
          <ChevronLeft className="h-5 w-5 shrink-0" />
          {t('prevStep')}
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={isLast}
          className="btn-primary inline-flex items-center justify-center gap-2 py-3 sm:py-2 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
          aria-label={isLast ? t('lastStepAria') : t('nextStepAria', { title: nextStep ? stepTitles[currentStep + 1] : '' })}
        >
          {isLast ? t('lastStep') : t('nextStepAria', { title: nextStep ? stepTitles[currentStep + 1] : '' })}
          <ChevronRight className="h-5 w-5 shrink-0" />
        </button>
      </div>

    </div>
  );
}
