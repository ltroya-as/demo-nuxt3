import { test } from '@playwright/test'
import { PriceDashboardPage } from '~/playwright/object-models/price-dashboard.page'
import { LoginUtils } from '~/playwright/utils/login.utils'
import { USER_STATE } from '~/playwright/enums/user-state.enum'

test.describe('Price Dashboard:', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  test('Should exist the Summary Table by default on first load', async ({
    page,
  }) => {
    const priceDashboardPage = await PriceDashboardPage.prepare(page)
    await priceDashboardPage.testSummaryTable({ shouldShowPills: false })
  })

  test('Open Chart Builder and test close actions', async ({ page }) => {
    const priceDashboardPage = await PriceDashboardPage.prepare(page)
    await priceDashboardPage.testCloseActions()
  })

  test.describe('Basic flow:', () => {
    test('Price', async ({ page }) => {
      const priceDashboardPage = await PriceDashboardPage.prepare(page)
      await priceDashboardPage.testBasicFlow(
        priceDashboardPage.selectPriceDataSeries,
      )
    })

    test('Payable', async ({ page }) => {
      const priceDashboardPage = await PriceDashboardPage.prepare(page)
      await priceDashboardPage.testBasicFlow(
        priceDashboardPage.selectPayableDataSeries,
      )
    })

    test('kWh', async ({ page }) => {
      const priceDashboardPage = await PriceDashboardPage.prepare(page)
      await priceDashboardPage.testBasicFlow(
        priceDashboardPage.selectKwhDataSeries,
      )
    })
  })

  test.describe('Combined products flow:', () => {
    test('Price and Payable', async ({ page }) => {
      const priceDashboardPage = await PriceDashboardPage.prepare(page)
      await priceDashboardPage.testBasicFlow(
        priceDashboardPage.selectPricesAndPayablesDataSeries,
      )
    })

    test('Price and kWh', async ({ page }) => {
      const priceDashboardPage = await PriceDashboardPage.prepare(page)
      await priceDashboardPage.testBasicFlow(
        priceDashboardPage.selectPricesAndKwhDataSeries,
      )
    })

    test('kWh and Payable', async ({ page }) => {
      const priceDashboardPage = await PriceDashboardPage.prepare(page)
      await priceDashboardPage.testBasicFlow(
        priceDashboardPage.selectKwhAndPayablesDataSeries,
      )
    })

    test('chart price container', async ({ page }) => {
      const priceDashboardPage = await PriceDashboardPage.prepare(page)
      await priceDashboardPage.testChartContainer()
    })
  })
})
