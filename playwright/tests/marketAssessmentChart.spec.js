import { test } from '@playwright/test'
import { LoginUtils } from '../utils/login.utils'
import { USER_STATE } from '../enums/user-state.enum'
import { SERVICES } from '../constants/market-assessments'
import { ChartPage } from '~/playwright/object-models/chart.page'

test.describe('Market Assessment Chart Page', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test.beforeEach(({ page }, testInfo) => {
    testInfo.snapshotSuffix = ''
  })

  SERVICES.forEach(({ slug, position, title, capacitiesURL }) => {
    test(`should show the chart page ${title}`, async ({ page }) => {
      await marketAssessmentsValidateChart(page, slug, capacitiesURL)
    })

    test(`should show the chart page ${title} with tooltip`, async ({
      page,
    }) => {
      await marketAssessmentsValidateChartTooltip(
        page,
        slug,
        {
          x: position.x,
          y: position.y,
        },
        capacitiesURL,
      )
    })
  })
})

const goToMarketAssessmentsChart = async (page, mineral, capacitiesURL) => {
  await page.goto(`market-assessments/${mineral}/${capacitiesURL}/`)
}

const marketAssessmentsValidateChart = async (p, mineral, capacitiesURL) => {
  await goToMarketAssessmentsChart(p, mineral, capacitiesURL)
  await ChartPage.validChart(
    p,
    'horizontal-bar-char-wrapper',
    `${mineral}-chart`,
  )
}

const marketAssessmentsValidateChartTooltip = async (
  p,
  mineral,
  position,
  capacitiesURL,
) => {
  await goToMarketAssessmentsChart(p, mineral, capacitiesURL)
  await ChartPage.validTooltip(
    p,
    'horizontal-bar-char-wrapper',
    `${mineral}-chart`,
    position,
  )
}
