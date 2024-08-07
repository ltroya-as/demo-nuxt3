import { expect, test } from '@playwright/test'

const SERVICES = [
  { title: 'Lithium Forecasts', slug: 'lithium' },
  { title: 'Cobalt Forecasts', slug: 'cobalt' },
  { title: 'Nickel Forecasts', slug: 'nickel' },
  { title: 'Natural Graphite Forecasts', slug: 'natural-graphite' },
  { title: 'Synthetic Graphite Forecasts', slug: 'synthetic-graphite' },
  { title: 'Anode Forecasts', slug: 'anode' },
  { title: 'Cathode Forecasts', slug: 'cathode' },
  { title: 'Lithium ion Batteries Forecasts', slug: 'lithium-ion-batteries' },
  {
    title: 'Solid State and Lithium Metal Batteries Forecasts',
    slug: 'solid-state',
  },
  { title: 'Recycling Forecasts', slug: 'recycling' },
  { title: 'Rare Earths Forecasts', slug: 'rare-earths' },
  { title: 'Manganese Sulphate Market Outlook', slug: 'manganese' },
  { title: 'Phosphoric Acid Market Outlook', slug: 'phosphate' },
  { title: 'Fluorspar Market Outlook', slug: 'fluorspar' },
]

test.describe('Unauthenticated pages', () => {
  for (const service of SERVICES) {
    test(`Should show the unauthenticated ${service.slug} forecast page`, async ({
      page,
    }) => {
      await page.goto(`/forecasts/${service.slug}/`)
      await page.waitForSelector(`[data-testid="breadcrumb"]`)
      await expect(
        await page.getByRole('heading', { name: service.title }).first(),
      ).toBeVisible()
    })
  }
})
