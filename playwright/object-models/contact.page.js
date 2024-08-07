import { expect } from '@playwright/test'

export class ContactPage {
  page
  locators = {
    openModalBtn: undefined,
    containerForm: undefined,
    firstNameInput: undefined,
    lastNameInput: undefined,
    emailInput: undefined,
    phoneCountryInput: undefined,
    phoneNumberInput: undefined,
    companyInput: undefined,
    countryCombo: undefined,
    jobInput: undefined,
    companyCategoryCombo: undefined,
  }

  #defaultInput = 'playwright test'
  #defaultPhone = '3123123123'
  static modalDataTestId = 'contact-modal'
  static formDataTestId = 'contact-page-contact-form'

  #marketsCheckboxSlugs = {
    lithium_ion_batteries: 'battery_cells',
    sodium_ion_batteries: 'sodium_ion',
  }

  constructor(locator, page) {
    this.page = page
    this.locators.containerForm = locator
    this.getLocators(locator)
  }

  static createForm(locator, page) {
    return new this(locator, page)
  }

  getLocators(containerForm) {
    this.locators.firstNameInput = containerForm.getByLabel('First name *')
    this.locators.lastNameInput = containerForm.getByLabel('Surname *')
    this.locators.emailInput = containerForm
      .getByLabel('Email\n        *')
      .first()
    this.locators.phoneNumberInput = containerForm
      .getByTestId('phone-number-input')
      .getByRole('textbox')
    this.locators.companyInput = containerForm.getByLabel('Company name *')
    this.locators.jobInput = containerForm.getByLabel('Job title')
    this.locators.countryCombo = containerForm
      .getByTestId('form-select-country')
      .getByRole('combobox')
    this.locators.companyCategoryCombo = containerForm
      .getByTestId('form-select-company-category')
      .getByRole('combobox')
  }

  static async prepare(page, type = 'page') {
    let locator

    if (type === 'modal') {
      locator = page.getByTestId(ContactPage.modalDataTestId)
    } else {
      locator = page.getByTestId(ContactPage.formDataTestId)
    }

    const login = new this(locator, page)
    login.locators.openModalBtn = page
      .getByTestId('top-navigation-item')
      .getByText('Contact')
    await login.page.goto('/')
    await login.page.waitForSelector('[data-testid="hero"]')
    await page.waitForSelector('[data-testid="signInDesktopBtn"]')
    await page.waitForTimeout(500)
    return login
  }

  async openModal() {
    await this.locators.openModalBtn.click()
    await this.page.waitForSelector('[data-testid="contact-modal"]')
  }

  async gotoContactPage() {
    await this.page.goto('/contact/')
    await this.page.waitForSelector('[data-testid="contact-page-contact-form"]')
  }

  async testContactFormPreselectedValues(
    slug,
    serviceCheckboxName,
    contactButtonLocator,
  ) {
    await contactButtonLocator.click()
    await expect(this.locators.containerForm).toBeVisible()
    await this.fillFirstStepAndGoToNextStep()
    await this.testSecondStepPreselectedValues(slug, serviceCheckboxName)
  }

  async fillFirstStepAndGoToNextStep(showCompanySelect = true) {
    const { containerForm } = this.locators
    await this.locators.firstNameInput.fill(this.#defaultInput)
    await this.locators.lastNameInput.fill(this.#defaultInput)
    await this.locators.emailInput.fill(this.#getTestEmail())
    await this.locators.phoneNumberInput.fill(this.#defaultPhone)
    await this.locators.companyInput.fill(this.#defaultInput)
    await this.locators.jobInput.fill(this.#defaultInput)
    await this.locators.countryCombo.selectOption('United Kingdom')
    if (showCompanySelect) {
      await this.locators.companyCategoryCombo.selectOption('Downstream')
    }

    await containerForm.getByRole('button', { name: 'Next' }).click()
  }

  async testSecondStepPreselectedValues(slug, serviceCheckboxName) {
    const slugKey = this.#marketsCheckboxSlugs[slug] || slug
    await expect(this.page.getByLabel(serviceCheckboxName)).toBeChecked()
    await expect(
      this.page.getByTestId(`which_markets_are_you_interested_in_${slugKey}`),
    ).toBeChecked()
  }

  async testSubmitContactForm(
    { withMessage, showCompanySelect, showEvents } = {
      withMessage: true,
      showCompanySelect: true,
      showEvents: true,
    },
  ) {
    const { containerForm } = this.locators
    await this.fillFirstStepAndGoToNextStep(showCompanySelect)

    await containerForm
      .getByTestId('which_markets_are_you_interested_in_lithium')
      .check()
    await containerForm
      .getByTestId('which_markets_are_you_interested_in_nickel')
      .check()
    await containerForm
      .getByTestId('which_markets_are_you_interested_in_synthetic_graphite')
      .check()
    await containerForm
      .getByTestId('which_markets_are_you_interested_in_cathode')
      .check()
    await containerForm
      .getByTestId('which_markets_are_you_interested_in_anode')
      .check()
    await containerForm
      .getByTestId('which_markets_are_you_interested_in_cobalt')
      .check()
    await containerForm
      .getByTestId('which_markets_are_you_interested_in_natural_graphite')
      .check()
    await containerForm
      .getByTestId('which_markets_are_you_interested_in_manganese')
      .check()
    await containerForm
      .getByTestId('which_markets_are_you_interested_in_battery_cells')
      .check()
    await containerForm
      .getByTestId('form-checkbox-fieldset-benchmark-services')
      .getByLabel('Sustainability')
      .check()
    await containerForm
      .getByTestId('form-checkbox-fieldset-benchmark-services')
      .getByLabel('Price Assessments')
      .check()
    await containerForm
      .getByTestId('form-checkbox-fieldset-benchmark-services')
      .getByLabel('Forecasts')
      .check()
    await containerForm
      .getByTestId('form-checkbox-fieldset-benchmark-services')
      .getByLabel('Benchmark Source')
      .check()
    await containerForm
      .getByTestId('form-checkbox-fieldset-benchmark-services')
      .getByLabel('Market Assessments')
      .check()
    await containerForm
      .getByTestId('form-checkbox-fieldset-benchmark-services')
      .getByLabel('Consultancy')
      .check()
    if (showEvents) {
      await containerForm.getByLabel('Benchmark Week').check()
      await containerForm.getByLabel('Gigafactories APAC').check()
      await containerForm.getByLabel('Gigafactories UK').check()
      await containerForm.getByLabel('Gigafactories Europe').check()
      await containerForm.getByLabel('Gigafactories USA').check()
    }
    await containerForm.getByLabel('Subscribe to Benchmark Newsletter').check()
    await containerForm.getByTestId('form-submit-button').first().click()

    if (withMessage) {
      await this.page.waitForTimeout(6000)
      await expect(
        this.locators.containerForm.getByText(
          'Thank you for contacting us, one of our team will be in touch shortly.',
        ),
      ).toBeVisible()
    }
  }

  async testReturnToHomepageBtn() {
    await expect(
      this.page.getByRole('link', { name: 'Return to Homepage' }),
    ).toBeVisible()
  }

  async testReturnToPageBtn() {
    await expect(
      this.page.getByRole('button', { name: 'Return to Page' }),
    ).toBeVisible()
  }

  async testReturnToFormBtn() {
    await expect(
      this.page.getByRole('button', { name: 'Return to form' }),
    ).toBeVisible()
  }

  async testContactFormRequiredFields() {
    await this.locators.firstNameInput.click()
    await this.locators.firstNameInput.blur()
    await expect(
      this.locators.containerForm.getByText('First name cannot be empty'),
    ).toBeVisible()
    await this.locators.lastNameInput.click()
    await this.locators.lastNameInput.blur()
    await expect(this.page.getByText('Surname cannot be empty')).toBeVisible()
    await this.locators.emailInput.click()
    await this.locators.emailInput.blur()
    await expect(
      this.locators.containerForm.getByText('Email cannot be empty'),
    ).toBeVisible()
    await this.locators.phoneNumberInput.click()
    await this.page.waitForTimeout(500)
    await this.locators.phoneNumberInput.blur()
    await this.page.waitForTimeout(500)
    await expect(this.page.getByText('Phone cannot be empty')).toBeVisible()
    await this.locators.companyInput.click()
    await this.locators.companyInput.blur()
    await expect(
      this.locators.containerForm.getByText('Company name cannot be empty'),
    ).toBeVisible()
  }

  #getTestEmail() {
    return `${new Date().valueOf()}@test.com`
  }
}
