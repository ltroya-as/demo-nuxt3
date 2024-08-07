import { test } from '@playwright/test'
import { LoginUtils } from '../utils/login.utils'
import { USER_STATE } from '../enums/user-state.enum'
import { ChartPage } from '~/playwright/object-models/chart.page'

test.describe('Price Assessments Capacities Pages', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test.beforeEach(({ page }, testInfo) => {
    testInfo.snapshotSuffix = ''
  })
  const minerals = ['Anode', 'Cathode']

  for (const mineral of minerals) {
    const mineralSlug = mineral.toLowerCase()
    test(`Should show the chart page ${mineral}`, async ({ page }) => {
      await priceAssessmentsValidateChart(page, mineralSlug, mineral)
    })

    test(`Should show the chart page ${mineral} with tooltip`, async ({
      page,
    }) => {
      await priceAssessmentsValidateChartTooltip(page, mineralSlug, {
        x: 400,
        y: 100,
      })
    })
  }
})

const goToPriceAssessmentsChart = async (page, mineral) => {
  await page.goto(`price-assessments/${mineral}/capacities/`)
}

const priceAssessmentsValidateChart = async (p, name, slug) => {
  await goToPriceAssessmentsChart(p, slug)
  await ChartPage.validChart(p, 'horizontal-bar-char-wrapper', `${name}-chart`)
}

const priceAssessmentsValidateChartTooltip = async (p, mineral, position) => {
  await goToPriceAssessmentsChart(p, mineral)
  await ChartPage.validTooltip(
    p,
    'horizontal-bar-char-wrapper',
    `${mineral}-chart`,
    position,
  )
}
