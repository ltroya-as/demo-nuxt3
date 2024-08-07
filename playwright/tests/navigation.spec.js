import { test, expect, chromium, devices } from '@playwright/test'

test.describe('Desktop navigation interaction', () => {
  test('Should have correct urls on Product & Services menu', async ({
    page,
  }) => {
    await page.goto('/')
    await page.locator('span').filter({ hasText: 'Services' }).hover()
    await page.waitForSelector('[data-testid="navigation-item-container"]')
    await page.getByRole('link', { name: 'Gigafactory Assessment' }).click()
    await expect(page).toHaveURL('/market-assessments/gigafactory-assessment/')
  })

  test('Should have overview in Price Assessments on Product & Services menu', async ({
    page,
  }) => {
    await page.goto('/')
    await page.locator('span').filter({ hasText: 'Services' }).hover()
    await page.waitForSelector('[data-testid="navigation-item-container"]')
    await page.getByRole('link', { name: 'Overview' }).first().click()
    await expect(page).toHaveURL('/price-assessments/')
  })
})

test.describe('Mobile navigation interaction', () => {
  test('Should be About the first menu item', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      ...devices['iPhone 13 Pro Max'],
    })
    const page = await context.newPage()
    await page.goto('/')
    await page.waitForSelector('[data-testid="menu-mobile-icon"]')
    await page.waitForTimeout(500)
    await page.getByTestId('menu-mobile-icon').click()
    await page.getByTestId('menu-mobile-item').first().click()
    await page.getByTestId('menu-mobile-item').first().click()
    await expect(page).toHaveURL('/about/')
    await browser.close()
  })
})
