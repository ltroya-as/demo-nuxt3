import { expect, test } from '@playwright/test'
import { LoginUtils } from '~/playwright/utils/login.utils'
import { USER_STATE } from '~/playwright/enums/user-state.enum'

test.describe('Blog Archive page GUEST user', () => {
  test('Should show more than 20 items with GUEST user', async ({ page }) => {
    await page.goto('/blog-archive/')
    await page.waitForTimeout(1500)
    await expect(
      (
        await page.locator('.articles').all()
      ).length,
    ).toBeGreaterThanOrEqual(21)
    await expect(
      await page.locator('.articles').first().getByRole('heading', {
        name: 'ALL NEW BLOG POSTS NOW UNDER MEMBERSHIP SECTION',
      }),
    ).toBeVisible()
  })
})

test.describe('Blog Archive page RCP user', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  test('Should show more than 20 items with RCP user', async ({ page }) => {
    await page.goto('/blog-archive/')
    await page.waitForTimeout(1500)
    await expect(
      (
        await page.locator('.articles').all()
      ).length,
    ).toBeGreaterThanOrEqual(21)
    await expect(
      await page.locator('.articles').first().getByRole('heading', {
        name: 'ALL NEW BLOG POSTS NOW UNDER MEMBERSHIP SECTION',
      }),
    ).toBeVisible()
  })
})
