/**
 * Extract Format / Formatas line from a copyable prompt for prompt-tool preview.
 */
export function extractFormatPreview(
  copyable: string | undefined
): string | null {
  if (!copyable?.trim()) return null;
  const match = copyable.match(/^(?:Formatas|Format):\s*(.+)$/im);
  const value = match?.[1]?.trim();
  return value || null;
}
