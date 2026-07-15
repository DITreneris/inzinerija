import type { ReactNode } from 'react';
import { portalImageSrc } from './portalUtils';

type PortalImageAspect = '16/9' | '21/9';
type PortalImageVariant = 'hero' | 'card-bleed' | 'inset';

interface PortalImageFrameProps {
  src: string;
  alt: string;
  aspect?: PortalImageAspect;
  variant?: PortalImageVariant;
  loading?: 'eager' | 'lazy';
  className?: string;
}

const WRAPPER: Record<PortalImageVariant, string> = {
  hero: 'rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700',
  'card-bleed': 'mb-3 overflow-hidden rounded-lg -mx-1 -mt-1',
  inset:
    'mb-4 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 aspect-[21/9] max-h-36',
};

const IMG: Record<PortalImageVariant, string> = {
  hero: 'block w-full aspect-[16/9] object-cover max-h-56 lg:max-h-64',
  'card-bleed': 'block w-full object-cover aspect-[16/9] max-h-44',
  inset: 'block w-full h-full object-cover',
};

export default function PortalImageFrame({
  src,
  alt,
  variant = 'hero',
  loading = 'lazy',
  className = '',
}: PortalImageFrameProps) {
  const resolvedSrc = portalImageSrc(src);

  return (
    <div className={`${WRAPPER[variant]} ${className}`.trim()}>
      <img
        src={resolvedSrc}
        alt={alt}
        className={IMG[variant]}
        loading={loading}
      />
    </div>
  );
}

export function PortalImageFrameOptional({
  image,
  variant,
  loading,
}: {
  image?: { src: string; alt: string } | null;
  variant: PortalImageVariant;
  loading?: 'eager' | 'lazy';
}): ReactNode {
  if (!image?.src) return null;
  return (
    <PortalImageFrame
      src={image.src}
      alt={image.alt}
      variant={variant}
      loading={loading}
    />
  );
}
