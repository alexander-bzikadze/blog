import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import svelte from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import astro from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'
import tailwindcss from 'eslint-plugin-tailwindcss'
import globals from 'globals'

const browserGlobals = Object.fromEntries(Object.keys(globals.browser).map(key => [key, 'readonly']))

export default [
  {
    files: ['src/**/*'],
    languageOptions: {
      globals: {
        ...browserGlobals,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: js.configs.recommended.rules,
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'es2023',
        project: true,
        extraFileExtensions: ['.svelte', '.astro'],
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: ts.configs.recommended.rules,
  },
  {
    files: ['src/**/*.{svelte,astro}'],
    languageOptions: {
      parserOptions: tailwindcss.configs.recommended.parserOptions,
    },
    plugins: {
      tailwindcss,
    },
    rules: tailwindcss.configs.recommended.rules,
  },
  {
    files: ['src/**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
      },
    },
    plugins: {
      svelte,
    },
    rules: svelte.configs.recommended.rules,
  },
  {
    files: ['src/**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
      },
    },
    plugins: {
      astro,
    },
    rules: astro.configs.recommended.rules,
  },
]
