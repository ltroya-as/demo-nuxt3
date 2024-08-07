import { test, expect } from '@playwright/test'
import { LoginUtils } from '~/playwright/utils/login.utils'
import { USER_STATE } from '~/playwright/enums/user-state.enum'

const PRICING_PAGE_ROUTE = [
  '/market/lithium/lithium-prices',
  '/market/cobalt/cobalt-prices',
  '/market/nickel/nickel-prices',
  '/market/natural-graphite/natural-graphite-prices',
  '/market/synthetic-graphite/synthetic-graphite-prices/',
  '/market/anode/anode-prices',
  '/market/cathode/cathode-prices',
  '/market/lithium-ion-batteries/lithium-ion-batteries-prices',
  '/market/rare-earths/rare-earths-prices',
]

test.describe('Un-Auth Price Pages', () => {
  PRICING_PAGE_ROUTE.forEach((route) => {
    test(`${route} route Should show content`, async ({ page }) => {
      await page.goto(route)
      await expect(page.getByTestId('icon-title')).toBeVisible()
      await expect(page.getByTestId('summary-table')).toBeVisible()
    })
  })
})

test.describe('Auth Price Pages', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  PRICING_PAGE_ROUTE.forEach((route) => {
    test(`${route} route Should show content`, async ({ page }) => {
      await page.goto(route)
      await expect(page.getByTestId('icon-title')).toBeVisible()
      await expect(page.getByTestId('summary-table')).toBeVisible()
    })
  })
})
