import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'coverage',
      '.cursor',
      '.vscode',
      'node_modules',
      'prompt_anatomy_training (1).tsx',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // react-hooks v7 folded the React Compiler rule set into `recommended`
      // (16 rules, up from 2 in v4), so extending it here would turn a config
      // migration into a 14-rule policy change. The two rules the project has
      // always enforced are listed explicitly; adopting the rest is a separate
      // decision (TODO §1.7 TOOL-5).
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          // typescript-eslint v8 changed `caughtErrors` to default to 'all', so
          // `catch (_)` started failing. `^_` is this project's existing marker
          // for a deliberately unused binding — the same pattern as args/vars.
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    // Diagram components export their geometry (`*_GEOMETRY`) next to the
    // component because it is the SOT the layout tests assert against
    // (SCHEME_AGENT / DiagramKit). react-refresh 0.5 only treats *primitive*
    // exports as constants, so these object literals began warning even though
    // `allowConstantExport` is on — the rule governs HMR ergonomics only, and
    // splitting 15 files would break the documented co-location convention.
    files: ['src/components/slides/shared/*Diagram.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  }
);
