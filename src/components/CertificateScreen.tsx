import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';
import { getCertificateContent } from '../data/certificateContentLoader';
import { ensurePdfFont } from '../utils/introPiePdf';
import { downloadCertificatePdf } from '../utils/certificatePdf';
import { getCertificateName, setCertificateName } from '../utils/certificateStorage';
import { track } from '../utils/analytics';

const WEBSITE_URL = 'https://www.promptanatomy.app/';

export interface CertificateScreenProps {
  tier: 1 | 2 | 3;
  onBack: () => void;
}

export function CertificateScreen({ tier, onBack }: CertificateScreenProps) {
  const { t } = useTranslation('certificate');
  const { locale } = useLocale();
  const certificateContent = useMemo(() => getCertificateContent(locale), [locale]);
  const content = useMemo(() => certificateContent.tiers.find((c) => c.tier === tier), [certificateContent, tier]);
  const [name, setName] = useState(() => getCertificateName());
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSaveAndDownload = useCallback(async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCertificateName(trimmed);
    setIsDownloading(true);
    try {
      await ensurePdfFont();
      if (!content) return;
      await downloadCertificatePdf(tier, content, trimmed, {
        locale,
        programTitle: certificateContent.programTitle,
        certificateLabel: certificateContent.certificateLabel,
        authorBy: certificateContent.authorBy,
        authorProduct: certificateContent.authorProduct,
        authorByLabel: certificateContent.authorByLabel,
        authorProductLabel: certificateContent.authorProductLabel,
        serialLabel: certificateContent.serialLabel,
        websiteUrl: certificateContent.websiteUrl ?? WEBSITE_URL,
        websiteCta: certificateContent.websiteCta,
      });
      setDownloadSuccess(true);
      track('cta_click', {
        cta_id: 'certificate_pdf_download',
        cta_label: t('certificateDownloadCta'),
        destination: 'download',
        module_id: tier,
      });
    } finally {
      setIsDownloading(false);
    }
  }, [tier, content, name, locale, certificateContent, t]);

  if (!content) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <p className="text-gray-600 dark:text-gray-400">{t('contentNotFound')}</p>
        <button onClick={onBack} className="btn-secondary mt-4">
          {t('back')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {t('title')}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">
          {t('introText')}
        </p>

        {/* Maketo peržiūra (HTML preview) – atitinka premium PDF maketą; accent border (GOLDEN §2) */}
        <div
          className="mx-auto mb-8 rounded-xl border border-gray-200 dark:border-gray-700 border-l-4 border-l-accent-500 bg-white dark:bg-gray-800 p-8 shadow-sm"
          style={{ maxWidth: '400px' }}
          aria-hidden="true"
        >
          <p className="text-center text-sm font-medium mb-1" style={{ color: '#222' }}>
            {certificateContent.programTitle ?? (locale === 'en' ? 'Prompt Anatomy' : 'Promptų anatomija')}
          </p>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-4">
            {certificateContent.certificateLabel ?? (locale === 'en' ? 'CERTIFICATE' : 'SERTIFIKATAS')}
          </p>
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-2">
            {content.introLine}
          </p>
          <p className="text-center text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">
            {name.trim() || t('yourNamePlaceholder')}
          </p>
          <div className="w-16 h-0.5 mx-auto mb-3 rounded-full" style={{ backgroundColor: '#d4a520' }} aria-hidden="true" />
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-1">
            {content.completionLine}
          </p>
          <p className="text-center text-xs text-gray-600 dark:text-gray-500">
            {content.programName}
          </p>
          <div className="w-16 h-0.5 mx-auto mt-4 rounded-full" style={{ backgroundColor: '#d4a520' }} aria-hidden="true" />
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            {certificateContent.websiteCta || t('websiteCta')}
          </p>
        </div>

        <label htmlFor="cert-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('nameLabel')}
        </label>
        <input
          id="cert-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('namePlaceholder')}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 mb-6"
          aria-describedby="cert-name-hint"
        />
        <p id="cert-name-hint" className="sr-only">
          {t('nameHint')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </button>
          <button
            type="button"
            onClick={handleSaveAndDownload}
            disabled={!name.trim() || isDownloading}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('saveAndDownloadAria')}
          >
            <Download className="w-5 h-5" aria-hidden />
            {isDownloading ? t('preparing') : t('saveAndDownloadButton')}
          </button>
        </div>

        {downloadSuccess && (
          <p className="mt-4 text-center text-sm text-emerald-600 dark:text-emerald-400 font-medium" role="status">
            {t('downloadSuccess')}{' '}
            <a
              href={certificateContent.websiteUrl ?? WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline focus:outline-none focus:ring-2 focus:ring-brand-500 rounded px-0.5"
            >
              {t('downloadSuccessCta')}
            </a>
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <a
            href={certificateContent.websiteUrl ?? WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded px-1"
            aria-label={t('websiteCtaAria')}
          >
            <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
            {certificateContent.websiteCta || t('websiteCta')}
          </a>
        </p>
      </div>
    </div>
  );
}
