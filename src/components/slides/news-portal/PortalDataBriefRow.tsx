import type {

  NewsPortalInfographicContent,

  NewsPortalKpiCard,

  NewsPortalMainInsightBlock,

} from '../../../types/modules';

import {

  getPortalEditorialSurfaceClasses,

  getPortalMetricClasses,

  PORTAL_SPACING,

  PORTAL_TEXT,

} from './portalSurfaces';

import { NUM_COLORS } from './portalUtils';



interface PortalDataBriefRowProps {

  mainInsightBlock: NewsPortalMainInsightBlock;

  featured: NewsPortalInfographicContent['featured'];

  kpiCards: NewsPortalKpiCard[];

  isEn?: boolean;

}



interface StatItem {

  value: string;

  label: string;

  source?: string;

  colorKey: keyof typeof NUM_COLORS;

}



function findCompanyKpi(cards: NewsPortalKpiCard[]): NewsPortalKpiCard | undefined {

  return (

    cards.find((c) => c.iconKey === 'building-2') ??

    cards.find((c) => c.value.includes('20'))

  );

}



export default function PortalDataBriefRow({

  mainInsightBlock,

  featured,

  kpiCards,

  isEn = false,

}: PortalDataBriefRowProps) {

  const companyKpi = findCompanyKpi(kpiCards);

  const surfaceClasses = getPortalEditorialSurfaceClasses('brand');

  const inlineMetricClasses = getPortalMetricClasses('inline');

  const chapterMetricClasses = getPortalMetricClasses('chapter');



  const stats: StatItem[] = [

    {

      value: mainInsightBlock.bigNumber,

      label: mainInsightBlock.label,

      source: mainInsightBlock.source,

      colorKey: 'brand',

    },

    ...(companyKpi

      ? [

          {

            value: companyKpi.value,

            label: companyKpi.desc,

            source: companyKpi.source,

            colorKey: 'brand' as const,

          },

        ]

      : []),

    {

      value: featured.bigNumber,

      label: featured.label,

      source: featured.source,

      colorKey: 'violet',

    },

  ];



  return (

    <div

      className={`grid grid-cols-1 sm:grid-cols-3 ${PORTAL_SPACING.gapGrid}`}

      role="region"

      aria-label={isEn ? 'Data at a glance' : 'Duomenys trumpai'}

    >

      {stats.map((stat, idx) => (

        <div

          key={idx}

          className={surfaceClasses}

          style={{ animationDelay: `${idx * 60}ms` }}

        >

          <div

            className={`${idx === 0 ? chapterMetricClasses : inlineMetricClasses} ${NUM_COLORS[stat.colorKey]}`}

          >

            {stat.value}

          </div>

          <p className={`mt-2 ${PORTAL_TEXT.bodySm}`}>{stat.label}</p>

          {stat.source && (

            <p className={`mt-1.5 ${PORTAL_TEXT.mutedXs}`}>
              {stat.source}
            </p>

          )}

        </div>

      ))}

    </div>

  );

}


