import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { getT } from '../../../i18n';

import { useLocale } from '../../../contexts/LocaleContext';

import type {

  NewsPortalInfographicContent,

  NewsPortalSecondaryCard,

} from '../../../types/modules';

import NewsPortalEditorialBeat from './NewsPortalEditorialBeat';

import NewsPortalPromoRibbon from './NewsPortalPromoRibbon';

import PortalBreakingTicker from './PortalBreakingTicker';

import PortalChapterBreak from './PortalChapterBreak';

import PortalChapterNav from './PortalChapterNav';

import PortalDataBriefRow from './PortalDataBriefRow';

import PortalHeroKpiBlock from './PortalHeroKpiBlock';

import PortalHeroMeta from './PortalHeroMeta';

import PortalHeroSidebar from './PortalHeroSidebar';

import PortalImageFrame, { PortalImageFrameOptional } from './PortalImageFrame';

import PortalInsightCard from './PortalInsightCard';

import PortalMastheadNav from './PortalMastheadNav';

import PortalRankingBlock from './PortalRankingBlock';

import PortalBlockShell from './PortalBlockShell';

import PortalCardHeader from './PortalCardHeader';

import PortalSlideCta from './PortalSlideCta';

import {

  getPortalEditorialSurfaceClasses,

  getPortalKickerClasses,

  getPortalMetricClasses,

  PORTAL_FOOTER,

  PORTAL_HEADING,

  PORTAL_SPACING,

  PORTAL_TEXT,

} from './portalSurfaces';

import {

  NUM_COLORS,

  editorialBeatsAt,

  promoRibbonsAt,

  hasEditorialScrollLayout,

} from './portalUtils';

import {
  PORTAL_BEAT_AWARENESS,
  PORTAL_BEAT_LITHUANIA,
  PORTAL_SECTION_CLOSE,
  PORTAL_SECTION_DATA,
  PORTAL_SECTION_DEPTH,
} from './portalSectionAnchors';



interface NewsPortalInfographicSlideProps {

  content?: NewsPortalInfographicContent;

  onNextSlide?: () => void;

}



export function NewsPortalInfographicSlide({

  content,

  onNextSlide,

}: NewsPortalInfographicSlideProps) {

  useTranslation();

  const t = getT('contentSlides');

  const { locale } = useLocale();

  const isEn = locale === 'en';

  const [showSources, setShowSources] = useState(false);



  if (!content) return null;



  const {

    portalBrand,

    portalMeta,

    portalNav,

    breakingTicker,

    heroSidebarTeasers,

    eyebrow,

    headline,

    subline,

    takeaway,

    takeawayCta,

    featured,

    heroImageVertical,

    kpiCards,

    mainInsightBlock,

    secondaryCards,

    toolsAndYouth,

    insightCard,

    ctaBlock,

    footerBrand,

    footerSub,

    sources,

    editorialBeats,

    promoRibbons,

  } = content;



  const editorialLayout = hasEditorialScrollLayout(content);

  const immersive = content.immersive !== false;

  const HeadlineTag = immersive ? 'h1' : 'h2';

  const headlineClass = immersive

    ? PORTAL_HEADING.hero

    : PORTAL_HEADING.heroCompact;



  const hasHeroImage = Boolean(heroImageVertical?.src);

  const hasSidebar =

    editorialLayout && (heroSidebarTeasers?.length ?? 0) > 0;

  const heroTextGrid = hasSidebar

    ? 'lg:grid lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 items-start'

    : '';



  const showDataBriefRow =

    editorialLayout && Boolean(mainInsightBlock && featured);

  const showSecondaryCards =

    editorialLayout &&

    Boolean(secondaryCards && secondaryCards.length === 2);



  const chapterDataLabel = isEn ? 'Data at a glance' : 'Duomenys trumpai';

  const chapterDepthLabel = isEn ? 'In depth' : 'Giliau';

  const chapterCloseLabel = isEn ? 'Summary' : 'Santrauka';



  const rootSpacing = editorialLayout

    ? PORTAL_SPACING.block

    : 'space-y-6 lg:space-y-8';



  const renderBeats = (placement: Parameters<typeof editorialBeatsAt>[1]) =>

    editorialBeatsAt(editorialBeats, placement).map((beat) => (

      <NewsPortalEditorialBeat

        key={beat.id}

        beat={beat}

        sectionId={
          beat.id === 'awareness-gap'
            ? PORTAL_BEAT_AWARENESS
            : beat.id === 'lithuania-context'
              ? PORTAL_BEAT_LITHUANIA
              : undefined
        }

      />

    ));



  const renderRibbons = (placement: Parameters<typeof promoRibbonsAt>[1]) =>

    promoRibbonsAt(promoRibbons, placement).map((ribbon, idx) => (

      <NewsPortalPromoRibbon
        key={`${placement}-${idx}`}
        ribbon={ribbon}
      />

    ));



  return (

    <div className={`w-full max-w-6xl mx-auto ${rootSpacing}`}>

      {portalBrand &&

        (portalNav && portalNav.length > 0 ? (

          <PortalMastheadNav

            portalBrand={portalBrand}

            portalNav={portalNav}

            isEn={isEn}

          />

        ) : (

          <div className="flex items-center gap-3 border-b border-accent-200 dark:border-accent-800 py-4 bg-accent-50 dark:bg-accent-900/10 px-1 -mx-1 rounded-lg">

            <span
              className={PORTAL_HEADING.mastheadFallbackBrand}
              aria-label={`${isEn ? 'Editorial' : 'Redakcija'}: ${portalBrand}`}
            >

              {portalBrand}

            </span>

            <span className={`${getPortalKickerClasses('neutral')} shrink-0`}>

              {isEn ? 'Media' : 'Žiniasklaida'}

            </span>

          </div>

        ))}



      {editorialLayout && breakingTicker && (

        <PortalBreakingTicker ticker={breakingTicker} isEn={isEn} />

      )}



      <div className={PORTAL_SPACING.heroStack}>

        {hasHeroImage && heroImageVertical && (

          <PortalImageFrame

            src={heroImageVertical.src}

            alt={heroImageVertical.alt}

            variant="hero"

            loading="eager"

          />

        )}



        <div className={heroTextGrid}>

          <div className={`min-w-0 ${PORTAL_SPACING.heroLead}`}>

            <p className={getPortalKickerClasses('hero')}>{eyebrow}</p>

            <HeadlineTag className={headlineClass}>{headline}</HeadlineTag>

            <PortalHeroMeta

              portalMeta={portalMeta}

              isEn={isEn}

              showEyebrow={false}

            />

            <p className={PORTAL_TEXT.bodySm}>{subline}</p>



            {(takeaway || takeawayCta) && (

              <aside

                className={getPortalEditorialSurfaceClasses('accent')}

                role="complementary"

                aria-label={t('mainTakeawaySummaryAria')}

              >

                {takeaway && (

                  <p className={PORTAL_TEXT.takeawayBold}>{takeaway}</p>

                )}

                {takeawayCta && (

                  <p className={PORTAL_TEXT.takeawayCta}>{takeawayCta}</p>

                )}

              </aside>

            )}

          </div>



          {hasSidebar && heroSidebarTeasers && (

            <PortalHeroSidebar teasers={heroSidebarTeasers} isEn={isEn} />

          )}

        </div>

      </div>



      {editorialLayout && <PortalChapterNav isEn={isEn} />}



      {editorialLayout && renderBeats('afterHero')}



      {editorialLayout && (

        <PortalChapterBreak

          id={PORTAL_SECTION_DATA}

          label={chapterDataLabel}

          subtitle={

            isEn

              ? 'Key numbers from EU surveys and studies'

              : 'Pagrindiniai skaičiai iš ES tyrimų'

          }

        />

      )}



      {showDataBriefRow && mainInsightBlock && (

        <PortalDataBriefRow

          mainInsightBlock={mainInsightBlock}

          featured={featured}

          kpiCards={kpiCards ?? []}

          isEn={isEn}

        />

      )}



      {editorialLayout && renderRibbons('afterKpi')}



      {showSecondaryCards && secondaryCards && (

        <SecondaryCardsGrid cards={secondaryCards} />

      )}



      {editorialLayout && renderBeats('afterSections')}



      {editorialLayout && (

        <PortalChapterBreak id={PORTAL_SECTION_DEPTH} label={chapterDepthLabel} />

      )}



      <div className={PORTAL_SPACING.act}>

        <ToolsAndYouthBlock toolsAndYouth={toolsAndYouth} />

        {editorialLayout && renderRibbons('beforeInsight')}

      </div>



      {editorialLayout && (

        <PortalChapterBreak id={PORTAL_SECTION_CLOSE} label={chapterCloseLabel} />

      )}



      {insightCard && <PortalInsightCard insightCard={insightCard} />}



      {editorialLayout && renderBeats('beforeCta')}



      {ctaBlock?.label && (

        <PortalSlideCta

          ctaBlock={ctaBlock}

          onNextSlide={onNextSlide}

          staticAriaLabel={t('whatToDoNextAria')}

        />

      )}



      <footer className={PORTAL_FOOTER.wrapper}>

        <div>

          <div className={PORTAL_FOOTER.brand}>{footerBrand}</div>

          {footerSub && (

            <div className={PORTAL_FOOTER.sub}>{footerSub}</div>

          )}

        </div>

        {sources && sources.length > 0 ? (

          <div>

            <button

              type="button"

              onClick={() => setShowSources(!showSources)}

              aria-label={t('showSourcesAria')}

              aria-expanded={showSources}

              className={PORTAL_FOOTER.sourcesBtn}

            >

              {t('showSourcesAria')} ({sources.length}){' '}

              {showSources ? '▲' : '▼'}

            </button>

            {showSources && (

              <ul className={PORTAL_FOOTER.sourcesList} role="list">

                {sources.map((s, i) => {

                  const name = s.title ?? s.label ?? s.institution ?? '';

                  const y = (s as { year?: string }).year;

                  return <li key={i}>{y ? `${name} (${y})` : name}</li>;

                })}

              </ul>

            )}

          </div>

        ) : (

          <div className={PORTAL_FOOTER.sourcesFallback}>

            {t('sourcesLabel')}: KPMG · McKinsey · Eurostat · Stat.gov.lt ·

            AIPRM

          </div>

        )}

      </footer>

    </div>

  );

}



function SecondaryCardsGrid({ cards }: { cards: NewsPortalSecondaryCard[] }) {

  const shellVariant: Record<string, 'brand' | 'emerald' | 'violet'> = {

    brand: 'brand',

    emerald: 'emerald',

    violet: 'violet',

    amber: 'brand',

  };

  const metricClasses = getPortalMetricClasses('inline');



  return (

    <div className={`grid grid-cols-1 lg:grid-cols-2 ${PORTAL_SPACING.gapCards} items-stretch`}>

      {cards.map((card, idx) => (

        <PortalBlockShell

          key={idx}

          variant={shellVariant[card.colorKey ?? 'brand'] ?? 'brand'}

          cornerRadius="lg"

          className="flex flex-col"

          style={{ animationDelay: `${idx * 80}ms` }}

        >

          <PortalImageFrameOptional

            image={card.imageVertical}

            variant="card-bleed"

          />

          <div className="min-w-0">

            <PortalCardHeader

              label={card.sectionLabel}

              title={card.title}

            />

            <div

              className={`${metricClasses} ${NUM_COLORS[card.colorKey ?? 'brand'] ?? NUM_COLORS.brand}`}

            >

              {card.value}

            </div>

            <p className={`mt-1 ${PORTAL_TEXT.bodySm} break-normal`}>

              {card.label}

            </p>

            {card.source && (

              <p className={`mt-1.5 ${PORTAL_TEXT.mutedXs}`}>

                {card.source}

              </p>

            )}

          </div>

        </PortalBlockShell>

      ))}

    </div>

  );

}



function ToolsAndYouthBlock({

  toolsAndYouth,

}: {

  toolsAndYouth: NewsPortalInfographicContent['toolsAndYouth'];

}) {

  if (!toolsAndYouth) return null;

  return (

    <>

      <PortalRankingBlock toolsAndYouth={toolsAndYouth} />

      <PortalHeroKpiBlock toolsAndYouth={toolsAndYouth} />

    </>

  );

}


