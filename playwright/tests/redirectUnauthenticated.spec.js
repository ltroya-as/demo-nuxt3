import { expect, test } from '@playwright/test'

test.describe('Unauthenticated pages', () => {
  test('Should show the unauthenticated pages', async ({ page }) => {
    await page.goto('/market-assessments/gigafactory-assessment/capacities/')
    await page.waitForSelector(`[data-testid="breadcrumb"]`)
    const urlMarketAssessments = new URL(page.url())
    await expect(urlMarketAssessments.pathname).toEqual(
      '/market-assessments/gigafactory-assessment/',
    )

    await page.goto('/price-assessments/anode/capacities/')
    await page.waitForSelector(`[data-testid="breadcrumb"]`)
    const urlPAAnode = new URL(page.url())
    await expect(urlPAAnode.pathname).toEqual('/price-assessments/anode/')

    await page.goto('/esg/lithium/reports/')
    await page.waitForSelector(`[data-testid="breadcrumb"]`)
    const urlEsgLithium = new URL(page.url())
    await expect(urlEsgLithium.pathname).toEqual('/esg/lithium/')
  })
})
