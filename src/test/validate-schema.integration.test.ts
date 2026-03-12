/**
 * Schema validation integration: run scripts/validate-schema.mjs and expect exit 0.
 * CI saugiklis prieš sugedusius modules.json / promptLibrary / glossary / tools.
 */
import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';

describe('validate-schema.mjs', () => {
  it('exits with code 0 when all JSON files are valid', () => {
    const root = path.resolve(__dirname, '../..');
    const scriptPath = path.join(root, 'scripts', 'validate-schema.mjs');
    const result = execSync(`node "${scriptPath}"`, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    expect(result).toBeDefined();
  });
});
