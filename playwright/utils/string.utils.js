import { expect } from '@playwright/test'

export function expectToHaveValidText(text, minLength = 0) {
  expect(text.length).toBeGreaterThan(minLength)
  expect(text).not.toBe('undefined')
  expect(text).not.toBe('null')
  expect(text).not.toBe('...')
}
