import { expect, test } from '@playwright/test'
import { BasePage } from '~/playwright/object-models/base.page'

test.describe('Market assessment unauthorized pages', () => {
  test('sodium ion batteries unauthorized page', async ({ page }) => {
    const expectedTitle = 'Sodium ion Batteries'
    await page.goto('/market-assessments/sodium-ion-batteries/')
    await page.waitForSelector('data-testid=services-hero')

    const heroTitle = page
      .getByTestId('subscribe-call-to-action')
      .getByRole('heading')
    const titleWithIcon = page
      .getByTestId('services-title-with-icon')
      .getByRole('heading')

    await expect(heroTitle).toContainText(expectedTitle)
    await expect(titleWithIcon).toContainText(expectedTitle)
    await expect(page.getByTestId('description-image')).toBeVisible()
    await expect(page.getByTestId('service-card').first()).toBeVisible()

    await page.waitForSelector('[data-testid="signInDesktopBtn"]')
    await page.waitForTimeout(500)
    await page
      .getByTestId('services-group-buttons')
      .getByTestId('button-contact-us')
      .click()
    await page.getByTestId('contact-modal').getByLabel('Close modal').click()
    await page.getByTestId('button-contact-us').nth(1).click()
    await page.getByTestId('contact-modal').getByLabel('Close modal').click()
  })

  test('Precursor Assessment unauthorized page', async ({ page }) => {
    const expectedHeroTitle = 'Precursor Cathode Active Material Assessment'
    const expectedTitle = 'Precursor Assessment'
    await page.goto('/market-assessments/precursor-assessment/')
    await page.waitForSelector('data-testid=services-hero')

    const heroTitle = page
      .getByTestId('subscribe-call-to-action')
      .getByRole('heading')
    const titleWithIcon = page
      .getByTestId('services-title-with-icon')
      .getByRole('heading')

    await expect(heroTitle).toContainText(expectedHeroTitle)
    await expect(titleWithIcon).toContainText(expectedTitle)

    await page
      .getByTestId('services-group-buttons')
      .getByTestId('button-contact-us')
      .first()
      .click()
    await page.getByTestId('contact-modal').getByLabel('Close modal').click()
    await page.getByTestId('button-contact-us').nth(1).click()
    await page.getByTestId('contact-modal').getByLabel('Close modal').click()

    const methodologyButton = page
      .getByTestId('subscribe-call-to-action')
      .getByRole('button', { name: 'Methodology' })

    await BasePage.validDownload(page, methodologyButton)
  })
})
