import type { NewsPortalToolsAndYouth } from '../../../types/modules';

import PortalBlockShell from './PortalBlockShell';

import PortalCardHeader from './PortalCardHeader';

import PortalHorizontalBarRow from './PortalHorizontalBarRow';

import {

  getPortalMetricClasses,

  getPortalVioletKickerClasses,

  PORTAL_DEPTH_CARD_VARIANT,

  PORTAL_TEXT,

} from './portalSurfaces';

import { NUM_COLORS } from './portalUtils';



interface PortalHeroKpiBlockProps {

  toolsAndYouth: NewsPortalToolsAndYouth;

}



export default function PortalHeroKpiBlock({ toolsAndYouth }: PortalHeroKpiBlockProps) {

  const bars = toolsAndYouth.youthBars ?? [];

  const closingInsight =

    toolsAndYouth.youthClosingInsight ?? toolsAndYouth.youthFootnote;



  return (

    <PortalBlockShell variant={PORTAL_DEPTH_CARD_VARIANT} footerInsight={closingInsight}>

      <PortalCardHeader

        label={toolsAndYouth.youthLabel}

        title={toolsAndYouth.youthTitle}

      />



      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">

        <div className="lg:pr-4 lg:border-r lg:border-gray-100 dark:lg:border-gray-700/60">

          <div className={`${getPortalMetricClasses('inline')} leading-none ${NUM_COLORS.violet}`}>

            {toolsAndYouth.youthBigNum}

          </div>

          <p

            className={`mt-2 ${PORTAL_TEXT.muted} leading-snug max-w-xs`}

            dangerouslySetInnerHTML={{

              __html: toolsAndYouth.youthLabelText.replace(/<br\s*\/?>/g, '<br />'),

            }}

          />

        </div>



        <div>

          {toolsAndYouth.youthSegmentsLabel && (

            <p className={`${getPortalVioletKickerClasses()} mb-2`}>

              {toolsAndYouth.youthSegmentsLabel}

            </p>

          )}

          <div className="space-y-3">

            {bars.map((bar, i) => (

              <PortalHorizontalBarRow

                key={i}

                label={bar.name}

                pct={bar.pct}

                variant="segment"

              />

            ))}

          </div>

        </div>

      </div>

    </PortalBlockShell>

  );

}


