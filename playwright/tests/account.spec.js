import { test, expect } from '@playwright/test'
import { LoginUtils } from '../utils/login.utils'
import { USER_STATE } from '../enums/user-state.enum'

test.describe('Account page RCP user', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  test('Should show the account page', async ({ page }) => {
    await page.goto('/account/')
    await expect(page.locator('#account-details-tab')).toBeVisible()

    await expect(page.locator('#account-details-tab')).toHaveClass(
      /nuxt-link-exact-active/,
    )

    await expect(
      page.locator('section').filter({
        hasText: 'These details will only be visible to you and Benchmark',
      }),
    ).toBeVisible()

    await expect(page.getByTestId('account-email')).toBeVisible()

    const button = page.getByTestId('account-change-password-button')

    await button.click()

    await expect(page.getByText('Personal Information')).toBeVisible()

    await expect(page.getByTestId('account-name')).toBeVisible()

    await expect(
      page.getByText('To update your details, please contact us .'),
    ).toBeVisible()
  })

  test('Should show the account page subscriptions', async ({ page }) => {
    await page.goto('/account/subscriptions/')
    await expect(page.getByText('Subscriptions', { exact: true })).toBeVisible()

    await expect(page.getByText('Subscriptions', { exact: true })).toHaveClass(
      /nuxt-link-exact-active/,
    )
    await page.waitForSelector('[data-testid="subscription-card"]')

    await expect(page.getByTestId('subscription-card')).toHaveCount(5)

    await expect(
      page.getByRole('heading', { name: 'Price Assessments' }),
    ).toBeVisible()

    const subscriptionsCount = await page
      .getByTestId('subscription-list-Price Assessments')
      .getByRole('listitem')
      .count()
    await expect(subscriptionsCount).toBeGreaterThanOrEqual(5)

    await expect(page.getByRole('heading', { name: 'Forecasts' })).toBeVisible()

    const forecastsSubsCount = await page
      .getByTestId('subscription-list-Forecasts')
      .getByRole('listitem')
      .count()
    await expect(forecastsSubsCount).toBeGreaterThanOrEqual(5)

    await expect(page.getByRole('heading', { name: 'Source' })).toBeVisible()

    const sourceSubsCount = await page
      .getByTestId('subscription-list-Source')
      .getByRole('listitem')
      .count()
    await expect(sourceSubsCount).toBeGreaterThanOrEqual(1)

    await expect(
      page.getByRole('heading', { name: 'Market Assessments' }),
    ).toBeVisible()

    const marketAssessmentsSubsCount = await page
      .getByTestId('subscription-list-Market Assessments')
      .getByRole('listitem')
      .count()
    await expect(marketAssessmentsSubsCount).toBeGreaterThanOrEqual(2)

    await expect(
      page.getByRole('heading', { name: 'Sustainability' }),
    ).toBeVisible()

    const sustainabilitySubsCount = await page
      .getByTestId('subscription-list-Sustainability')
      .getByRole('listitem')
      .count()
    await expect(sustainabilitySubsCount).toBeGreaterThanOrEqual(2)
  })
})
