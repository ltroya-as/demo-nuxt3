import { expect } from '@playwright/test'
import { ContactPage } from '~/playwright/object-models/contact.page'

export class AnalysisPage {
  page = undefined

  constructor(page) {
    this.page = page
  }

  async gotoPage(service) {
    await this.page.goto(`/price-assessments/${service}/`)
    await this.page.waitForSelector(`[data-testid="${service}-analysis"]`)
  }

  async gotoLithiumAnalysisPage(service) {
    await this.page.goto(`/price-assessments/${service}/analysis/`)
    await this.page.waitForSelector(`[data-testid="${service}-analysis"]`)
  }

  static async prepare(page, service, authorized = false) {
    const articlePage = new AnalysisPage(page, service)
    if (!authorized) await articlePage.gotoPage(service)
    else await articlePage.gotoLithiumAnalysisPage(service)
    return articlePage
  }

  async gotoArticle(service) {
    const card = this.page
      .getByTestId(`${service}-analysis`)
      .getByRole('article')
      .first()
    const link = await card.getByRole('link').first().getAttribute('href')

    await this.page.goto(link)
  }

  async testCountCards(service, numberCards) {
    const cards = this.page
      .getByTestId(`${service}-analysis`)
      .getByTestId(`${service}-analysis-news`)
      .getByRole('article')

    await expect(cards).toHaveCount(numberCards)
  }

  async testTitleClickable(service) {
    const card = this.page
      .getByTestId(`${service}-analysis`)
      .getByTestId(`${service}-analysis-news`)
      .getByRole('article')
      .first()
    const title = await card.getByRole('link').first()
    const link = await title.getAttribute('href')
    await title.click()
    const route = link.endsWith('/') ? link : `${link}/`
    await expect(this.page).toHaveURL(route)
  }

  async testTextLength() {
    await this.page.waitForSelector(`[data-testid="lithium-article"]`)

    const content = await this.page
      .getByTestId('lithium-article')
      .getByTestId('article-content')
      .textContent()

    expect(content.length).toBeLessThanOrEqual(1700)
  }

  async testLoginButton() {
    await this.page.waitForSelector(`[data-testid="lithium-article"]`)

    const signInform = await this.page
      .getByTestId('lithium-article')
      .getByTestId('article-signin-form')

    await expect(signInform).toBeVisible()

    const signInButton = await signInform.getByRole('button').first()

    await expect(signInButton).toBeVisible()
  }

  async testContactForm() {
    await this.page.waitForSelector(`[data-testid="lithium-article"]`)

    const contactFormLocator = await this.page
      .getByTestId('lithium-article')
      .getByTestId('article-contact-form')

    const contactForm = ContactPage.createForm(contactFormLocator)

    await contactForm.testSubmitContactForm({
      withMessage: false,
      showCompanySelect: false,
      showEvents: false,
    })
  }

  async testAuthenticatedArticleDetail() {
    await this.page.waitForSelector(`[data-testid="lithium-article"]`)

    const contactFormLocator = await this.page
      .getByTestId('lithium-article')
      .getByTestId('article-contact-form')

    await expect(contactFormLocator).not.toBeVisible()
  }

  async testSearchArticle(service, searchText) {
    const search = this.page
      .getByTestId(`${service}-analysis-filters`)
      .getByRole('textbox')
      .first()
    await search.fill(searchText)
    const cards = this.page
      .getByTestId(`${service}-analysis`)
      .getByRole('article')
    await expect(cards).toHaveCount(1)
  }

  async testFilterByCheckboxesArticle(service) {
    await this.page
      .getByTestId(`${service}-analysis-filters`)
      .getByTestId('checkboxes')
      .getByLabel('All')
      .uncheck()

    const loading = this.page.getByTestId('analisys-page-loading')

    await expect(loading).toBeVisible()
    await this.page.waitForSelector(`[data-testid="${service}-analysis"]`)
    await expect(loading).not.toBeVisible()

    await this.page
      .getByTestId(`${service}-analysis-filters`)
      .getByTestId('checkboxes')
      .getByLabel('Demand')
      .check()

    await expect(loading).toBeVisible()
    await this.page.waitForSelector(`[data-testid="${service}-analysis"]`)
    await expect(loading).not.toBeVisible()

    const card = await this.page
      .getByTestId(`${service}-analysis`)
      .getByTestId('article-card')
      .first()

    const pill = await card.getByTestId('category-pill').first().textContent()
    expect(pill).toContain('Demand')
  }
}
