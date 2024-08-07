import { expect } from '@playwright/test'

export class LoginPage {
  page
  locators = {
    openModalBtn: undefined,
    containerForm: undefined,
    usernameInput: undefined,
    passwordInput: undefined,
  }

  #modalDataTestId = 'signin-modal'
  #formDataTestId = 'signin-page'

  constructor(page, type) {
    this.page = page

    if (type === 'modal')
      this.locators.containerForm = page.getByTestId(this.#modalDataTestId)
    else this.locators.containerForm = page.getByTestId(this.#formDataTestId)

    this.locators.openModalBtn = page.getByTestId('signInDesktopBtn')
    this.locators.usernameInput =
      this.locators.containerForm.getByLabel('Username or Email')
    this.locators.passwordInput =
      this.locators.containerForm.getByLabel('Password')
  }

  static async prepare(p, type = 'page') {
    const login = new this(p, type)
    await login.page.goto('/')
    await login.page.waitForSelector('[data-testid="hero"]')

    return login
  }

  async openModal() {
    await this.page.waitForSelector('[data-testid="signInDesktopBtn"]')
    await this.page.waitForTimeout(500)
    await this.locators.openModalBtn.click()
    await this.page.waitForSelector('[data-testid="login"]')
  }

  async gotoLoginPage() {
    await this.page.goto('/login')
    await this.page.waitForSelector('[data-testid="signin-page"]')
  }

  async testLoginForm() {
    await this.locators.usernameInput.click()
    await this.locators.usernameInput.blur()
    await expect(
      this.page.getByText('Username or Email cannot be empty'),
    ).toBeVisible()
    await this.locators.passwordInput.click()
    await this.locators.passwordInput.blur()
    await expect(this.page.getByText('Password cannot be empty')).toBeVisible()
    await this.page
      .getByRole('button', { name: 'Forgot your password?' })
      .click()
    await this.page.getByTestId('forgot-password-modal').click()
    await this.page.getByRole('button', { name: 'Close modal' }).click()
  }
}
