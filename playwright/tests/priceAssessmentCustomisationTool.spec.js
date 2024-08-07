import { expect, test } from '@playwright/test'
import { LoginUtils } from '../utils/login.utils'
import { USER_STATE } from '../enums/user-state.enum'
import { CUSTOM_TOOL } from '../constants/price-assessments'

test.describe('Price Assessment Customisation Tool Page', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  CUSTOM_TOOL.forEach(({ title, slug }) => {
    test.skip(`${slug} Customisation Tool page`, async ({ page }) => {
      await page.goto(`/price-assessments/${slug}/price-customisation-tool/`)

      await expect(
        page.getByRole('heading', {
          name: title,
        }),
      ).toBeVisible()

      await expect(
        page.getByText(
          'Benchmark’s flexible pricing tool provides estimated delivered costs of several ',
        ),
      ).toBeVisible()

      await expect(
        page.getByRole('heading', { name: 'Category' }),
      ).toBeVisible()

      await expect(page.getByRole('heading', { name: 'Terms' })).toBeVisible()

      await expect(page.getByTestId('total-assessment')).toBeVisible()

      await expect(
        page.getByRole('heading', { name: 'Container Transport' }),
      ).toBeVisible()

      await expect(
        page.getByRole('heading', { name: 'Shipping Details' }),
      ).toBeVisible()

      await expect(page.getByTestId('total-container')).toBeVisible()

      await expect(page.getByRole('heading', { name: 'Total' })).toBeVisible()

      await page.getByTestId('select-assessment').hover()

      expect(
        page.locator('.group > .absolute > div > .flex > div').first(),
      ).toBeVisible()

      await page.getByTestId('select-container').hover()

      expect(
        page.locator('.flex > .group > .absolute > div > .flex > div').first(),
      ).toBeVisible()
    })
  })
})
