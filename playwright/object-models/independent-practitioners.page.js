import { expect } from '@playwright/test'

export class IndependentPractitionersPage {
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

  constructor(page) {
    this.page = page
    this.getLocators()
  }

  getLocators() {
    this.locators.firstNameInput = this.page
      .getByTestId('form-input-first-name')
      .getByRole('textbox')
    this.locators.lastNameInput = this.page
      .getByTestId('form-input-surname')
      .getByRole('textbox')
    this.locators.emailInput = this.page
      .getByTestId('form-input-business-email')
      .getByRole('textbox')
    this.locators.phoneNumberInput = this.page
      .getByTestId('phone-number-input')
      .getByRole('textbox')
    this.locators.companyInput = this.page
      .getByTestId('form-input-company-name')
      .getByRole('textbox')
    this.locators.jobInput = this.page
      .getByTestId('form-input-job-title')
      .getByRole('textbox')
    this.locators.countryCombo = this.page
      .getByTestId('form-select-country')
      .getByRole('combobox')
    this.locators.companyCategoryCombo = this.page
      .getByTestId('form-select-company-category')
      .getByRole('combobox')
  }

  static async prepare(page) {
    const pageIndependent = new this(page)
    await pageIndependent.page.goto(
      '/independent-practitioners-assurance-report/',
    )
    return pageIndependent
  }

  async testSubmitContactForm() {
    expect(this.page.getByText('IOSCO Report')).toBeVisible()

    expect(
      this.page.getByText(
        'Please complete your details to receive a copy of Benchmark’s IOSCO independent ',
      ),
    ).toBeVisible()

    expect(this.page.getByTestId('iosco-report-contact-form')).toBeVisible()

    await this.page.waitForSelector('[data-testid="form-input-first-name"]')
    await this.locators.firstNameInput.fill(this.#defaultInput)
    await this.locators.lastNameInput.fill(this.#defaultInput)
    await this.locators.emailInput.fill(`${new Date().valueOf()}@test.com`)
    await this.locators.phoneNumberInput.fill(this.#defaultPhone)
    await this.locators.countryCombo.selectOption('United Kingdom')
    await this.locators.companyInput.fill(this.#defaultInput)
    await this.locators.jobInput.fill(this.#defaultInput)
    await this.locators.companyCategoryCombo.selectOption('End User')
    await this.page.getByTestId('form-submit-button').click()

    await expect(
      this.page.getByText(
        'Thank you for contacting us, one of our team will be in touch shortly.',
      ),
    ).toBeVisible()

    await expect(
      this.page.getByRole('link', { name: 'Return to Homepage' }),
    ).toBeVisible()

    expect(
      this.page.getByRole('button', { name: 'Return to form' }),
    ).toBeVisible()

    await this.page.getByRole('button', { name: 'Return to form' }).click()

    await this.page.waitForSelector('[data-testid="form-input-first-name"]')

    expect(this.page.getByTestId('form-input-first-name')).toBeVisible()
  }

  async testContactFormRequiredFields() {
    expect(this.page.getByTestId('iosco-report-contact-form')).toBeVisible()

    await this.page.waitForSelector('[data-testid="form-input-first-name"]')

    await this.locators.firstNameInput.click()
    await this.locators.firstNameInput.blur()
    await expect(
      this.page.getByText('First name cannot be empty'),
    ).toBeVisible()

    await this.locators.lastNameInput.click()
    await this.locators.lastNameInput.blur()
    await expect(this.page.getByText('Surname cannot be empty')).toBeVisible()

    await this.locators.emailInput.click()
    await this.locators.emailInput.blur()
    await expect(
      this.page.getByText('Business email cannot be empty'),
    ).toBeVisible()

    await this.locators.phoneNumberInput.click()
    await this.locators.phoneNumberInput.blur()
    await expect(this.page.getByText('Phone cannot be empty')).toBeVisible()

    await this.locators.countryCombo.click()
    await this.locators.countryCombo.blur()
    await expect(this.page.getByText('Country cannot be empty')).toBeVisible()

    await this.locators.companyInput.click()
    await this.locators.companyInput.blur()
    await expect(
      this.page.getByText('Company name cannot be empty'),
    ).toBeVisible()

    await this.locators.jobInput.click()
    await this.locators.jobInput.blur()
    await expect(this.page.getByText('Job title cannot be empty')).toBeVisible()

    await this.locators.companyCategoryCombo.click()
    await this.locators.companyCategoryCombo.blur()
    await expect(
      this.page.getByText('Company category cannot be empty'),
    ).toBeVisible()
  }
}
