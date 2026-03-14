/**
 * Figma embed – diagramų / architektūros board įterpimas skaidrėse.
 * Stilius pagal projektą: border-gray-200 dark:border-gray-700, rounded-lg, bg-gray-50/50.
 */
import { useTranslation } from 'react-i18next';

interface FigmaEmbedProps {
  /** Figma embed URL (src iš share → embed) */
  src: string;
  /** Alternatyvus tekstas screen reader'iams */
  title?: string;
  /** Papildoma klasė wrapper'iui */
  className?: string;
}

export default function FigmaEmbed({
  src,
  title,
  className = '',
}: FigmaEmbedProps) {
  const { t } = useTranslation('contentSlides');
  const resolvedTitle = title ?? t('figmaDiagramTitle');

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 ${className}`}
      role="figure"
      aria-label={resolvedTitle}
    >
      <iframe
        src={src}
        title={resolvedTitle}
        allowFullScreen
        className="block w-full aspect-video min-h-[280px] border-0"
        loading="lazy"
      />
    </div>
  );
}
