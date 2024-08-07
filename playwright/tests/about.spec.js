import { test, expect } from '@playwright/test'

test.describe('About page', () => {
  test('should show the about page', async ({ page }) => {
    await page.goto('/about/')

    await expect(
      page.getByText(
        'Benchmark enables the most critical decisions of the energy transition',
      ),
    ).toHaveCount(1)

    await expect(
      page.getByText(
        'Independent prices, data and supply chain intelligence for lithium ion batteries and rare earth elements',
      ),
    ).toHaveCount(1)
  })
})
