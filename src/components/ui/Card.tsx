/**
 * Card – Design System v0.1 (A-S3).
 * Kortelė su variantais pagal DESIGN_GUIDE §4.
 * Naudojimas: skaidrės blokai, Summary kortelės, palyginimai.
 */
import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'brand' | 'accent';

const variantClasses: Record<CardVariant, string> = {
  default:
    'bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700',
  brand:
    'bg-brand-50 dark:bg-brand-900/20 rounded-2xl shadow-md border border-brand-200 dark:border-brand-800',
  accent:
    'bg-accent-50 dark:bg-accent-900/20 rounded-2xl shadow-md border border-accent-200 dark:border-accent-800',
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
}

export default function Card({
  variant = 'default',
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
