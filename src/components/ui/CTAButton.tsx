/**
 * CTAButton – Design System Waves C (self-contained Tailwind variants).
 * Links: import `ctaButtonClassName` from `./ctaButtonClasses` for `<a>` upsells.
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ctaButtonClassName, type CTAButtonVariant } from './ctaButtonClasses';

export type { CTAButtonVariant };

interface CTAButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> {
  variant?: CTAButtonVariant;
  children: ReactNode;
  className?: string;
}

export default function CTAButton({
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  ...props
}: CTAButtonProps) {
  return (
    <button
      type={type}
      className={ctaButtonClassName(variant, className)}
      {...props}
    >
      {children}
    </button>
  );
}
