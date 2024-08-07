import { test, chromium, devices } from '@playwright/test'
import { IndependentPractitionersPage } from '../object-models/independent-practitioners.page'

test.describe('Independent Practitioners Assurance Report page', () => {
  test('should show the Independent Practitioners Assurance page', async ({
    page,
  }) => {
    const IndependentPage = await IndependentPractitionersPage.prepare(page)

    await IndependentPage.testSubmitContactForm()
  })

  test('should show the Errors in form page', async ({ page }) => {
    const IndependentPage = await IndependentPractitionersPage.prepare(page)

    await IndependentPage.testContactFormRequiredFields()
  })
})

test.describe('Mobile Independent page', () => {
  test('should show the Independent Practitioners Assurance page', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      ...devices['iPhone 13 Pro Max'],
    })
    const page = await context.newPage()
    const IndependentPage = await IndependentPractitionersPage.prepare(page)

    await IndependentPage.testSubmitContactForm()
  })

  test('should show the Errors in form page', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext({
      ...devices['iPhone 13 Pro Max'],
    })
    const page = await context.newPage()
    const IndependentPage = await IndependentPractitionersPage.prepare(page)

    await IndependentPage.testContactFormRequiredFields()
  })
})
