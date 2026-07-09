import i18n from '../i18n';
import type { ModulesLocale } from '../data/modulesLoader';
import {
  getHandoutForEarnedModule,
  getHandoutForSurface,
  type HandoutArtifact,
  type HandoutArtifactKey,
  type HandoutSurfaceType,
} from '../data/completionArtifactsLoader';
import { track } from './analytics';
import { logError } from './logger';
import { HANDOUT_ARTIFACT_ACTIONS } from './handoutArtifactActions';

export interface DownloadHandoutOptions {
  surface?: HandoutSurfaceType;
  slideId?: number;
  ctaLabel?: string;
  artifactKey?: HandoutArtifactKey;
}

function resolveArtifact(
  moduleId: number,
  options?: DownloadHandoutOptions
): HandoutArtifact | null {
  if (options?.artifactKey) {
    const artifact = getHandoutForEarnedModule(moduleId);
    if (artifact?.key === options.artifactKey) return artifact;
  }
  if (options?.surface) {
    return getHandoutForSurface(moduleId, options.surface);
  }
  return getHandoutForEarnedModule(moduleId);
}

export function getHandoutCtaLabel(artifact: HandoutArtifact): string {
  return i18n.t(artifact.ctaI18nKey);
}

export async function downloadHandout(
  moduleId: number,
  locale: ModulesLocale,
  options?: DownloadHandoutOptions
): Promise<void> {
  const artifact = resolveArtifact(moduleId, options);
  if (!artifact) return;

  const action = HANDOUT_ARTIFACT_ACTIONS[artifact.key];
  try {
    const content = action.getContent(locale);
    await action.download(content, locale);
    track('cta_click', {
      module_id: moduleId,
      slide_id: options?.slideId,
      cta_id: artifact.analyticsCtaId,
      cta_label: options?.ctaLabel ?? getHandoutCtaLabel(artifact),
      destination: 'download',
    });
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), {
      feature: 'handout_pdf',
      moduleId,
      locale,
      surface: options?.surface ?? 'earned_materials',
    });
    throw error;
  }
}
