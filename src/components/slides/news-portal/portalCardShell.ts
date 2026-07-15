import { PORTAL_CARD } from './portalSurfaces';



export type PortalShellVariant =

  | 'brand'

  | 'accent'

  | 'violet'

  | 'emerald'

  | 'terms';



const CARD_BASE = 'p-4 lg:p-5 animate-fade-in border-l-4';



const CARD_VARIANT: Record<PortalShellVariant, string> = {

  accent:

    'bg-accent-50 dark:bg-accent-900/20 border-accent-500 border border-accent-200 dark:border-accent-800',

  brand:

    'bg-brand-50 dark:bg-brand-900/20 border-l-brand-500 border border-brand-200 dark:border-brand-800',

  terms:

    'bg-slate-50 dark:bg-slate-800/60 border-slate-500 dark:border-slate-600 border border-slate-300 dark:border-slate-700',

  emerald:

    'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 border border-emerald-200 dark:border-emerald-800',

  violet:

    'bg-violet-50 dark:bg-violet-900/20 border-violet-500 border border-violet-200 dark:border-violet-800',

};



export function getPortalCardShellClasses(

  variant: PortalShellVariant,

  cornerRadius: 'lg' | 'xl' = PORTAL_CARD.radius

): string {

  const radiusClass = cornerRadius === 'lg' ? 'rounded-lg' : 'rounded-xl';

  return `${radiusClass} ${CARD_BASE} ${CARD_VARIANT[variant]}`.trim();

}


