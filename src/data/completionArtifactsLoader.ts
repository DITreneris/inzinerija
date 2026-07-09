import completionArtifactsData from './completionArtifacts.json';
import type { Progress } from '../utils/progress';
import {
  canRequestCertificateTier1,
  canRequestCertificateTier2,
  canRequestCertificateTier3,
  canRequestCertificateTier4,
  canRequestCertificateTier5,
} from '../utils/certificateEligibility';

export type HandoutArtifactKey =
  | 'm1'
  | 'm4'
  | 'm5'
  | 'm6'
  | 'm79'
  | 'm1012'
  | 'm1315';
export type HandoutSurfaceType = 'module_complete' | 'test_results';
export type CertificateEligibilityKey =
  | 'tier1'
  | 'tier2'
  | 'tier3'
  | 'tier4'
  | 'tier5';
export type CertificateTier = 1 | 2 | 3 | 4 | 5;

export interface HandoutSurface {
  type: HandoutSurfaceType;
  moduleId: number;
  slideId?: number;
}

export interface HandoutArtifact {
  key: HandoutArtifactKey;
  earnOnModuleIds: number[];
  surfaces: HandoutSurface[];
  contentLt: string;
  contentEn: string;
  schemaKey: HandoutArtifactKey;
  ctaI18nKey: string;
  analyticsCtaId: string;
}

export interface CertificateArtifact {
  tier: CertificateTier;
  unlockOnModuleId: number;
  eligibilityKey: CertificateEligibilityKey;
}

interface CompletionArtifactsData {
  handouts: HandoutArtifact[];
  certificates: CertificateArtifact[];
}

const completionArtifacts = completionArtifactsData as CompletionArtifactsData;

const certificateEligibilityChecks: Record<
  CertificateEligibilityKey,
  (progress: Progress) => boolean
> = {
  tier1: canRequestCertificateTier1,
  tier2: canRequestCertificateTier2,
  tier3: canRequestCertificateTier3,
  tier4: canRequestCertificateTier4,
  tier5: canRequestCertificateTier5,
};

export function getHandoutArtifacts(): HandoutArtifact[] {
  return completionArtifacts.handouts;
}

export function getCertificateArtifacts(): CertificateArtifact[] {
  return completionArtifacts.certificates;
}

export function getHandoutArtifactByKey(
  key: HandoutArtifactKey
): HandoutArtifact | null {
  return (
    completionArtifacts.handouts.find((artifact) => artifact.key === key) ??
    null
  );
}

export function getHandoutForSurface(
  moduleId: number,
  surfaceType: HandoutSurfaceType
): HandoutArtifact | null {
  return (
    completionArtifacts.handouts.find((artifact) =>
      artifact.surfaces.some(
        (surface) =>
          surface.moduleId === moduleId && surface.type === surfaceType
      )
    ) ?? null
  );
}

export function getHandoutForModuleComplete(
  moduleId: number
): HandoutArtifact | null {
  return getHandoutForSurface(moduleId, 'module_complete');
}

export function getHandoutForEarnedModule(
  moduleId: number
): HandoutArtifact | null {
  return (
    completionArtifacts.handouts.find((artifact) =>
      artifact.earnOnModuleIds.includes(moduleId)
    ) ?? null
  );
}

export function getEarnedHandoutArtifacts(
  completedModules: number[]
): HandoutArtifact[] {
  return completionArtifacts.handouts.filter((artifact) =>
    artifact.earnOnModuleIds.every((moduleId) =>
      completedModules.includes(moduleId)
    )
  );
}

export function getEarnedHandoutModuleIds(
  completedModules: number[]
): number[] {
  return getEarnedHandoutArtifacts(completedModules).map(
    (artifact) => artifact.earnOnModuleIds[artifact.earnOnModuleIds.length - 1]
  );
}

export function getCertificateUnlockForModule(
  moduleId: number
): CertificateArtifact | null {
  return (
    completionArtifacts.certificates.find(
      (certificate) => certificate.unlockOnModuleId === moduleId
    ) ?? null
  );
}

export function canRequestCertificateByEligibilityKey(
  eligibilityKey: CertificateEligibilityKey,
  progress: Progress
): boolean {
  return certificateEligibilityChecks[eligibilityKey](progress);
}

export function getUnlockedCertificateTierForModule(
  moduleId: number,
  progress: Progress
): CertificateTier | null {
  const certificate = getCertificateUnlockForModule(moduleId);
  if (!certificate) return null;
  return canRequestCertificateByEligibilityKey(
    certificate.eligibilityKey,
    progress
  )
    ? certificate.tier
    : null;
}

export function getEarnedCertificateTiers(
  progress: Progress
): CertificateTier[] {
  return completionArtifacts.certificates
    .filter((certificate) =>
      canRequestCertificateByEligibilityKey(
        certificate.eligibilityKey,
        progress
      )
    )
    .map((certificate) => certificate.tier);
}
