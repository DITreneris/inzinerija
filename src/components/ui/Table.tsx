/**
 * Table – Design System v0.1 (A-S3).
 * Lentelė su vienodu stiliu pagal DESIGN_GUIDE.
 * Naudojimas: palyginimo lentelės, parametrų sąrašai.
 */
import type { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
  /** A11y: lentelės aprašymas screen readeriams */
  ariaLabel?: string;
}

export default function Table({
  children,
  className = '',
  ariaLabel,
}: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table
        className={`min-w-full divide-y divide-gray-200 text-base leading-relaxed dark:divide-gray-700 ${className}`.trim()}
        aria-label={ariaLabel}
      >
        {children}
      </table>
    </div>
  );
}

/** TableHead – thead su stiliais */
export function TableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-50 dark:bg-gray-800/80">{children}</thead>;
}

/** TableBody – tbody */
export function TableBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  );
}

/** TableRow – tr */
export function TableRow({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>;
}

/** TableHeaderCell – th */
export function TableHeaderCell({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3.5 text-left align-top text-base font-semibold text-gray-900 dark:text-white ${className}`}
    >
      {children}
    </th>
  );
}

/** TableCell – td */
export function TableCell({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td
      className={`px-4 py-3.5 align-top text-base text-gray-700 dark:text-gray-300 ${className}`}
    >
      {children}
    </td>
  );
}
