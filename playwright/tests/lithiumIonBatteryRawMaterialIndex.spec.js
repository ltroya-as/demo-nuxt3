import { expect, test } from '@playwright/test'
import { BasePage } from '~/playwright/object-models/base.page'
import { ContactPage } from '~/playwright/object-models/contact.page'

test.describe('Lithium ion Battery Raw Material Index page Unauthorized', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lithium-ion-battery-raw-material-index/')
  })

  test('should show the Lithium ion Battery Raw Material Index page', async ({
    page,
  }) => {
    await expect(
      page.getByText('Lithium ion Batteries - Raw Material index'),
    ).toHaveCount(1)

    await expect(
      page.getByText(
        'Download the Benchmark Lithium ion Battery Raw Material Price Index methodology for further details',
      ),
    ).toHaveCount(1)
  })

  test('should show the contact us form in page', async ({ page }) => {
    await page.waitForSelector(
      '[data-testid="lithium-ion-battery-raw-material-index-contact-form"]',
    )
    const contactFormLocator = page.getByTestId(
      'lithium-ion-battery-raw-material-index-contact-form',
    )

    const contactForm = ContactPage.createForm(contactFormLocator)

    await contactForm.testSubmitContactForm({
      withMessage: false,
      showCompanySelect: true,
      showEvents: false,
    })
  })

  test('should download methodology from button', async ({ page }) => {
    await page.waitForSelector(
      '[data-testid="lithium-ion-battery-raw-material-index-contact-form"]',
    )
    const button = await page.getByTestId('download-methodology-button')
    await BasePage.validDownload(page, button)
  })
})
