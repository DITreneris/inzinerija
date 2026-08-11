/**
 * Walk the string literals of a .ts / .tsx / .mjs file.
 *
 * A plain quote regex is not safe for this: the apostrophe in a comment such as
 * `// don't rename` opens a phantom string and swallows real code, which would
 * let a rewrite corrupt identifiers. So this scans character by character and
 * tracks comment / string / template state, and skips `${…}` interpolations.
 */
export function rewriteStringLiterals(raw, onSegment) {
  let out = '';
  let i = 0;
  const n = raw.length;

  const readLiteral = (quote) => {
    let body = '';
    let start = i + 1;
    i += 1;
    while (i < n) {
      const ch = raw[i];
      if (ch === '\\') {
        body += raw.slice(i, i + 2);
        i += 2;
        continue;
      }
      if (ch === quote) {
        i += 1;
        return { body, start, closed: true };
      }
      if (quote === '`' && ch === '$' && raw[i + 1] === '{') {
        out += onSegment(body, start);
        body = '';
        // The `$` must be consumed first: starting the depth walk on it leaves
        // depth at 0, the loop exits immediately, and `${count}` then leaks into
        // the literal body where a rewrite could rename the identifier.
        out += '$';
        i += 1;
        let depth = 0;
        do {
          if (raw[i] === '{') depth += 1;
          else if (raw[i] === '}') depth -= 1;
          out += raw[i];
          i += 1;
        } while (i < n && depth > 0);
        start = i;
        continue;
      }
      body += ch;
      i += 1;
    }
    return { body, start, closed: false };
  };

  while (i < n) {
    const ch = raw[i];
    const next2 = raw.slice(i, i + 2);

    if (next2 === '//') {
      const end = raw.indexOf('\n', i);
      const stop = end === -1 ? n : end;
      out += raw.slice(i, stop);
      i = stop;
      continue;
    }
    if (next2 === '/*') {
      const end = raw.indexOf('*/', i + 2);
      const stop = end === -1 ? n : end + 2;
      out += raw.slice(i, stop);
      i = stop;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      out += ch;
      const { body, start, closed } = readLiteral(ch);
      out += onSegment(body, start);
      if (closed) out += ch;
      continue;
    }
    out += ch;
    i += 1;
  }
  return out;
}

/** Read-only walk: calls `visit(body, offset)` for each string literal. */
export function forEachStringLiteral(raw, visit) {
  rewriteStringLiterals(raw, (body, offset) => {
    visit(body, offset);
    return body;
  });
}

/** True when a no-op pass reproduces the input byte for byte. */
export function isLossless(raw) {
  return rewriteStringLiterals(raw, (body) => body) === raw;
}
