/** Ar bold tekstas atrodo kaip skaičius/procentas (pvz. 97 %, 60–70 %, ~90 %). */
function isNumberLike(s: string): boolean {
  return /^[\d\s~–-]+%?$/.test(s.trim());
}

/** Renderuoja tekstą su **bold** ir [tekstas](url) sintakse. Nuorodos – brand spalva, hover paryškinimas. */
export function renderBodyWithBoldAndLinks(text: string, opts?: { numberAccent?: boolean }) {
  const numberAccent = opts?.numberAccent ?? false;
  const combinedRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?[^)]+\))/g;
  const parts = text.split(combinedRegex).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      const isPraktiskai = inner === 'Praktiškai:';
      const isNum = numberAccent && isNumberLike(inner);
      return (
        <strong
          key={i}
          className={
            isPraktiskai
              ? 'font-semibold text-accent-700 dark:text-accent-300'
              : isNum
                ? 'font-bold text-accent-600 dark:text-accent-400'
                : 'font-bold text-gray-900 dark:text-white'
          }
        >
          {inner}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\((https?[^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
        >
          {label}
        </a>
      );
    }
    return part;
  });
}

/** Alias atgaliniam suderinamumui – naudoja renderBodyWithBoldAndLinks. Apsauga nuo undefined (content-block sekcijos). */
export function renderBodyWithBold(text: string | undefined, opts?: { numberAccent?: boolean }) {
  if (text == null || text === '') return null;
  return renderBodyWithBoldAndLinks(text, opts);
}
