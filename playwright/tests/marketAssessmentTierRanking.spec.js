import { test, expect } from '@playwright/test'
import { LoginUtils } from '../utils/login.utils'
import { USER_STATE } from '../enums/user-state.enum'
import { BasePage } from '../object-models/base.page'

test.describe('Market Assessment tier-ranking Page RCP user', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  test.beforeEach(({ page }, testInfo) => {
    testInfo.snapshotSuffix = ''
  })

  test('Should show the tier-ranking page', async ({ page }) => {
    await page.goto('/market-assessments/gigafactory-assessment/tier-ranking/')

    await expect(page.getByTestId('breadcrumb-item')).toHaveCount(4)
    await expect(
      page.getByRole('heading', { name: 'Gigafactory Assessment' }),
    ).toContainText('Gigafactory Assessment')

    await expect(
      page.getByRole('heading', {
        name: 'Benchmark’s Tiers of automotive-grade battery producers',
      }),
    ).toBeVisible()

    const button = page.getByRole('button', { name: 'Download' })

    await expect(button).toBeVisible()

    await BasePage.validDownload(page, button)

    const container = page.getByRole('img', { name: 'subscriptions' })
    await container.scrollIntoViewIfNeeded()
    expect(
      await container.screenshot({ animations: 'disabled' }),
    ).toMatchSnapshot([`marketAssessmentTierRankingImage.png`])

    await expect(page.getByTestId('email-container')).toContainText(
      'info@benchmarkminerals.com',
    )
  })
})
