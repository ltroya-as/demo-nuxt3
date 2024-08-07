import { test } from '@playwright/test'
import { ContactPage } from '../object-models/contact.page'

test.describe('Contact Form', () => {
  test('modal submit test', async ({ page }) => {
    const contactPage = await ContactPage.prepare(page, 'modal')

    await contactPage.openModal()
    page.getByRole('button', { name: 'OK' }).click()
    await contactPage.testSubmitContactForm()
    await contactPage.testReturnToPageBtn()
  })

  test('page submit test', async ({ page }) => {
    const contactPage = await ContactPage.prepare(page)
    await contactPage.gotoContactPage()
    await contactPage.testSubmitContactForm({
      withMessage: true,
      showCompanySelect: true,
      showEvents: false,
    })
    await contactPage.testReturnToHomepageBtn()
    await contactPage.testReturnToFormBtn()
  })

  test('modal fields test', async ({ page }) => {
    const contactPage = await ContactPage.prepare(page, 'modal')

    await contactPage.openModal()
    page.getByRole('button', { name: 'OK' }).click()
    await contactPage.testContactFormRequiredFields()
  })

  test('page fields test', async ({ page }) => {
    const contactPage = await ContactPage.prepare(page)

    await contactPage.gotoContactPage()
    await contactPage.testContactFormRequiredFields()
  })
})
