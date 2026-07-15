import type { NewsPortalInfographicContent } from '../../../types/modules';

import PortalBlockShell from './PortalBlockShell';

import PortalCardHeader from './PortalCardHeader';

import { PortalImageFrameOptional } from './PortalImageFrame';

import { PORTAL_BULLET, PORTAL_TEXT } from './portalSurfaces';



interface PortalInsightCardProps {

  insightCard: NonNullable<NewsPortalInfographicContent['insightCard']>;

}



export default function PortalInsightCard({ insightCard }: PortalInsightCardProps) {

  return (

    <PortalBlockShell variant="terms" cornerRadius="lg">

      <PortalImageFrameOptional

        image={insightCard.illustrationHorizontal}

        variant="inset"

      />

      <PortalCardHeader label={insightCard.tag} title={insightCard.headline} />

      <ul className="space-y-2 mt-1">

        {(insightCard.points ?? []).map((p, i) => (

          <li key={i} className={`flex gap-2 ${PORTAL_TEXT.bodySm}`}>

            <span className={PORTAL_BULLET.num}>{p.num}</span>

            <span

              dangerouslySetInnerHTML={{

                __html: p.text.replace(

                  /\*\*(.*?)\*\*/g,

                  '<strong class="text-gray-900 dark:text-white">$1</strong>'

                ),

              }}

            />

          </li>

        ))}

      </ul>

    </PortalBlockShell>

  );

}


