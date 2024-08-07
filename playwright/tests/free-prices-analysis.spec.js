import { test, expect } from '@playwright/test'

test.describe('Free prices and Analysis section', () => {
  test('should show the Newsletter page', async ({ page }) => {
    await page.goto('/newsletter-signup/')

    await expect(
      page.getByRole('heading', {
        name: 'Sign up for Benchmark’s free newsletter now',
      }),
    ).toBeVisible()

    await expect(page.getByTestId('navigation-bar')).toBeVisible()

    await expect(
      page
        .getByTestId('navigation-bar')
        .getByText('Newsletter', { exact: true }),
    ).toHaveClass('border-p-500 flex gap-2.5 border-b-4 p-2.5 pb-1.5')

    await expect(page.getByTestId('newsletter-signup-image')).toBeVisible()

    await expect(page.getByTestId('form-submit-button')).toBeVisible()
  })

  test('should show the Price Spotlight page', async ({ page }) => {
    await page.goto('/price-spotlight-signup/')

    await expect(
      page.getByRole('heading', {
        name: 'Sign up for free Price Spotlight',
      }),
    ).toBeVisible()

    await expect(page.getByTestId('navigation-bar')).toBeVisible()

    await expect(
      page
        .getByTestId('navigation-bar')
        .getByText('Price Spotlight', { exact: true }),
    ).toHaveClass('border-p-500 flex gap-2.5 border-b-4 p-2.5 pb-1.5')

    await expect(page.getByTestId('price-spotlight-image')).toBeVisible()

    await expect(page.getByTestId('form-submit-button')).toBeVisible()
  })

  test('should show the Industry Reports page', async ({ page }) => {
    await page.goto('/industry-reports/')

    await expect(
      page.getByRole('heading', {
        name: 'Benchmark’s State of the Industry Reports',
      }),
    ).toBeVisible()

    await expect(page.getByTestId('navigation-bar')).toBeVisible()

    await expect(
      page
        .getByTestId('navigation-bar')
        .getByText('Industry Reports', { exact: true }),
    ).toHaveClass('border-p-500 flex gap-2.5 border-b-4 p-2.5 pb-1.5')

    await expect(page.getByTestId('industry-reports-image')).toBeVisible()

    await expect(page.getByTestId('form-submit-button')).toBeVisible()
  })

  test('should show the Policy Newsletter page', async ({ page }) => {
    await page.goto('/policy-newsletter/')

    await expect(
      page.getByRole('heading', {
        name: 'Sign up for Benchmark’s Policy Newsletter',
      }),
    ).toBeVisible()

    await expect(page.getByTestId('navigation-bar')).toBeVisible()

    await expect(
      page
        .getByTestId('navigation-bar')
        .getByText('Policy Newsletter', { exact: true }),
    ).toHaveClass('border-p-500 flex gap-2.5 border-b-4 p-2.5 pb-1.5')

    await expect(page.getByTestId('policy-newsletter-image')).toBeVisible()

    await expect(page.getByTestId('form-submit-button')).toBeVisible()
  })
})
