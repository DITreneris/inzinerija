import type { ReactNode } from 'react';

/**
 * Renders text with **bold** markers as <strong> elements.
 * Used in workflow/diagram step explanation blocks.
 */
export function renderBold(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? (
      <strong key={i} className="font-bold text-gray-900 dark:text-white">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}
