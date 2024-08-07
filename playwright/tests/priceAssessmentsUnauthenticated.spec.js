import { expect, test } from '@playwright/test'

const SERVICES = [
  { title: 'Lithium Price Assessment', slug: 'lithium' },
  { title: 'Cobalt Price Assessment', slug: 'cobalt' },
  { title: 'Nickel Price Assessment', slug: 'nickel' },
  { title: 'Natural Graphite Price Assessment', slug: 'natural-graphite' },
  { title: 'Synthetic Graphite Price Assessment', slug: 'synthetic-graphite' },
  { title: 'Anode Price Assessment', slug: 'anode' },
  { title: 'Cathode Price Assessment', slug: 'cathode' },
  {
    title: 'Lithium ion Batteries Price Assessment',
    slug: 'lithium-ion-batteries',
  },
  { title: 'Black Mass Price Assessment', slug: 'black-mass' },
  { title: 'Rare Earths Price Assessment', slug: 'rare-earths' },
]

test.describe('Unauthenticated pages', () => {
  for (const service of SERVICES) {
    test(`Should show the unauthenticated ${service.slug} price assessment page`, async ({
      page,
    }) => {
      await page.goto(`/price-assessments/${service.slug}/`)
      await page.waitForSelector(`[data-testid="breadcrumb"]`)
      await expect(
        await page.getByRole('heading', { name: service.title }).first(),
      ).toBeVisible()
    })
  }
})
