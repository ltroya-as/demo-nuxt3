import { test } from '@playwright/test'
import { LoginUtils } from '../utils/login.utils'
import { USER_STATE } from '../enums/user-state.enum'
import { SERVICES } from '../constants/price-assessments'
import { ChartPage } from '~/playwright/object-models/chart.page'

test.describe('Price Assessment Chart Page', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test.beforeEach(({ page }, testInfo) => {
    testInfo.snapshotSuffix = ''
  })

  SERVICES.forEach(({ title, slug, position }) => {
    test(`should show the ${title} chart page`, async ({ page }) => {
      await priceAssessmentsValidateChart(page, slug)
    })

    test(`should show the ${title} chart page with tooltip`, async ({
      page,
    }) => {
      await priceAssessmentsValidateChartTooltip(page, slug, position)
    })

    test(`should allow to pick a date range the ${title} chart page`, async ({
      page,
    }) => {
      const pageInstance = await ChartPage.createPriceAssessmentVisit(
        page,
        slug,
      )
      await pageInstance.validateDatePickerAreClickable()
    })

    test(`should allow to click the download button options the ${title} chart page`, async ({
      page,
    }) => {
      const pageInstance = await ChartPage.createPriceAssessmentVisit(
        page,
        slug,
      )
      await pageInstance.validateDownloadDropdownOptionsAreClickable()
    })
  })
})

const goToPriceAssessmentsChart = async (page, mineral) => {
  await page.goto(`/price-assessments/${mineral}/chart/`)
}

const priceAssessmentsValidateChart = async (p, mineral) => {
  await goToPriceAssessmentsChart(p, mineral)
  await ChartPage.validChart(p, 'line-chart-wrapper', `${mineral}-chart`)
}

const priceAssessmentsValidateChartTooltip = async (p, mineral, position) => {
  await goToPriceAssessmentsChart(p, mineral)
  await ChartPage.validTooltip(
    p,
    'line-chart-wrapper',
    `${mineral}-chart`,
    position,
  )
}
