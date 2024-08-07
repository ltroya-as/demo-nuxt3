import { expect, test } from '@playwright/test'

const LCA = { title: 'LCA Consultancy', slug: 'lca' }
const BEA = {
  title: 'Battery Emissions Analyser (BEA)',
  slug: 'battery-emissions-analyser',
}

const SERVICES = [
  { title: 'Lithium ESG Report', slug: 'lithium' },
  { title: 'Cobalt ESG Report', slug: 'cobalt' },
  { title: 'Nickel ESG Report', slug: 'nickel' },
  { title: 'Graphite ESG Report', slug: 'graphite' },
  BEA,
]

test.describe('Unauthenticated pages', () => {
  for (const service of SERVICES) {
    test(`Should show the unauthenticated ${service.slug} esg page`, async ({
      page,
    }) => {
      await page.goto(`/esg/${service.slug}/`)
      await page.waitForSelector(`[data-testid="breadcrumb"]`)
      await expect(
        page.getByRole('heading', { name: service.title }).first(),
      ).toBeVisible()

      if (service.slug === 'lca') {
        await page.getByRole('button', { name: 'Find out more' }).click()
        await page
          .getByTestId('contact-modal')
          .getByLabel('Close modal')
          .click()
        await page
          .getByTestId('hero-sign-in')
          .getByRole('button', { name: 'Sign in' })
          .click()
        await page.getByRole('heading', { name: 'Sign in' }).click()
        await page.getByTestId('signin-modal').getByLabel('Close modal').click()
      }

      await expect(page.getByTestId('banner-descriptions')).toBeVisible()
      await expect(page.getByTestId('container-banner-images')).toBeVisible()
      if (service.slug !== 'battery-emissions-analyser') {
        await expect(page.getByTestId('package-section')).toBeVisible()
      }
    })
  }

  test('Should show the unauthenticated lca esg page', async ({ page }) => {
    await page.goto(`/esg/${LCA.slug}/`)
    await page.waitForSelector(`[data-testid="breadcrumb"]`)
    await expect(
      page.getByRole('heading', { name: 'LCA Consultancy' }),
    ).toBeVisible()
    await expect(page.getByTestId('lca-description-image')).toBeVisible()
    await expect(page.getByTestId('lca-description')).toBeVisible()
  })

  test('Should show the unauthenticated BEA esg page', async ({ page }) => {
    await page.goto(`/esg/${BEA.slug}/`)
    await expect(
      page
        .getByTestId('bea-first-section')
        .locator('div')
        .filter({ hasText: 'Benchmark BEA Offerings' })
        .nth(1),
    ).toBeVisible()
    await expect(page.getByTestId('bea-first-section')).toBeVisible()
    await page
      .getByTestId('bea-first-section')
      .getByTestId('button-contact-us')
      .click()
    await page.getByTestId('contact-modal').getByLabel('Close modal').click()
    await expect(page.getByTestId('banner-images')).toBeVisible()
    await expect(
      page
        .getByTestId('banner-descriptions')
        .locator('div')
        .filter({ hasText: 'Bespoke Battery Emissions Analyser services' }),
    ).toBeVisible()

    await page
      .getByTestId('banner-descriptions')
      .getByTestId('button-contact-us')
      .click()
    await page.getByTestId('contact-modal').getByLabel('Close modal').click()
    await expect(page.getByTestId('container-banner-images')).toBeVisible()
  })
})
