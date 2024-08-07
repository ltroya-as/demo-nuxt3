import { defineVitestConfig } from '@nuxt/test-utils/config'

/* 
  Documentation for unit tests with nuxt 3 
  https://nuxt.com/docs/getting-started/testing#unit-testing 
*/

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    root: '.',
    reporters: ['default', 'html'],
    outputFile: './vitest-results/index.html',
    exclude: [
      '**/playwright.config.ts',
      '**/playwright/**/*.{ts,js}',
      '**/node_modules/**',
    ],
    coverage: {
      all: true,
      provider: 'v8',
      exclude: [
        '**/vitest/**',
        '**/.nuxt/**',
        '**/playwright.config.ts',
        '**/playwright/**/*.ts',
        '**/node_modules/**',
      ],
      allowExternal: true,
      include: ['**/*.{vue,ts}'],
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './vitest-results/coverage',
    },
  },
})
