import { expect } from '@playwright/test'
import { BasePage } from './base.page'

export class ForecastPage {
  page

  constructor(page) {
    this.page = page
  }

  static async prepare(p) {
    const forecasts = new this(p)
    await forecasts.page.goto('/forecasts/')
    await forecasts.page.waitForSelector(
      '[data-testid="service-container-card"]',
    )

    return forecasts
  }

  async gotoMineralPage(mineral) {
    await this.page.goto(`/forecasts/${mineral}/`)
    await this.page.waitForSelector('[data-testid="breadcrumb"]')
  }

  async validateTitlePage(title) {
    await expect(
      this.page.getByRole('heading', { name: title }).first(),
    ).toBeVisible()
  }

  async validateBreadcrumb(length) {
    await expect(this.page.getByTestId('breadcrumb-item')).toHaveCount(length)
  }

  async validateServiceContainer() {
    const containersCount = await this.page
      .getByTestId('service-container-card')
      .count()
    await expect(containersCount).toBeGreaterThanOrEqual(1)

    const cardsForecast = this.page.getByTestId('service-card-item')

    await expect(cardsForecast).toHaveCount(15)
  }

  async validateCard(card, isAuthenticated) {
    if (isAuthenticated) {
      await expect(card.getByTestId('service-card-item-lock')).not.toBeVisible()
    } else {
      await expect(card.getByTestId('service-card-item-lock')).toBeVisible()
    }

    await expect(card.getByTestId('service-card-item-icon')).toBeVisible()

    await expect(card.getByRole('heading')).toBeVisible()

    await expect(card.getByTestId('service-card-item-menu')).toHaveCount(1)

    const button = await card.getByTestId('service-card-item-download')
    await BasePage.validDownload(this.page, button)
  }

  async validateModalCheckboxCard(card, mineral) {
    await expect(card.getByTestId('service-card-contact-button')).toBeVisible()
    await card.getByTestId('service-card-contact-button').click()
    await this.page.waitForSelector('[data-testid="contact-modal"]')

    await this.contactPageFirstPage()

    const checkboxMineral = await this.page
      .getByTestId(`which_markets_are_you_interested_in_${mineral}`)
      .getByRole('checkbox')
    await expect(checkboxMineral).toBeChecked()

    const checkboxForecast = await this.page
      .getByTestId('benchmark_services_forecasts_and_costs')
      .getByRole('checkbox')
    await expect(checkboxForecast).toBeChecked()
  }

  async validateRedirectMineral(card, mineral, text) {
    await expect(card.getByTestId('service-card-item-menu')).toBeVisible()
    await card.locator('div').getByRole('link', { name: text }).click()
    const regex = new RegExp('\\/' + mineral)
    await expect(this.page).toHaveURL(regex)
    await this.page.waitForSelector('[data-testid="breadcrumb"]')
    await expect(this.page.getByTestId('breadcrumb')).toBeVisible()
  }

  async validateGroupButtons(mineral) {
    const buttons = await this.page.getByTestId('services-group-buttons')
    await expect(buttons).toBeVisible()

    const downloadBrochure = await buttons.getByRole('button', {
      name: 'Brochure',
    })

    await BasePage.validDownload(this.page, downloadBrochure)

    const subscribeButton = await buttons.getByRole('button', {
      name: 'Find out more',
    })

    await subscribeButton.click()
    await this.page.waitForSelector('[data-testid="contact-modal"]')

    await this.contactPageFirstPage()

    if (mineral) {
      const checkboxMineral = await this.page
        .getByTestId(`which_markets_are_you_interested_in_${mineral}`)
        .getByRole('checkbox')
      await expect(checkboxMineral).toBeChecked()
    }

    const checkboxForecast = await this.page
      .getByTestId('benchmark_services_forecasts_and_costs')
      .getByRole('checkbox')
    await expect(checkboxForecast).toBeChecked()
  }

  async validateBannerImages(count, title) {
    const banner = await this.page.getByTestId('banner-images')
    await expect(banner).toBeVisible()

    const bannerDescription = await banner.getByTestId('banner-descriptions')
    await expect(
      bannerDescription.getByRole('heading', { name: title }),
    ).toBeVisible()

    await expect(bannerDescription.locator('div > ul > li')).toHaveCount(count)

    const bannerDescriptionImages = await banner.getByTestId(
      'container-banner-images',
    )

    await expect(bannerDescriptionImages).toBeVisible()
  }

  async validateGeneralCard(count) {
    const cards = await this.page.getByTestId('general-card')
    await expect(cards).toHaveCount(count)

    const headerFirst = await cards.first().getByRole('heading')

    await expect(headerFirst).toBeVisible()

    await expect(cards.first().locator('div > img')).toBeVisible()
  }

  async validateTitleButtonDownloadAll() {
    await expect(this.page.getByRole('heading').first()).toBeVisible()

    const button = await this.page.getByRole('button', { name: 'Download all' })
    await expect(button).toBeVisible()

    await BasePage.validDownload(this.page, button)
  }

  async validateReportCards() {
    await this.page.waitForSelector('[data-testid="forecasts-report-card"]')
    const cards = await this.page.getByTestId('forecasts-report-card')
    const cardsCount = await cards.count()

    await expect(cardsCount).toBeGreaterThanOrEqual(1)

    const firstCard = cards.first()

    await expect(
      firstCard.getByTestId('forecasts-report-card-image'),
    ).toBeVisible()

    await expect(
      firstCard.getByTestId('forecasts-report-card-title'),
    ).toBeVisible()

    const button = await firstCard.getByTestId('forecasts-button-download')

    await expect(button).toBeVisible()

    await BasePage.validDownload(this.page, button)
  }

  async contactPageFirstPage() {
    await this.page.getByLabel('First name *').fill('playwright test')
    await this.page.getByLabel('Surname *').fill('playwright test')
    await this.page
      .getByLabel('Email\n        *')
      .first()
      .fill(`${new Date().valueOf()}@test.com`)
    await this.page
      .getByTestId('phone-number-input')
      .getByRole('textbox')
      .fill('3123123123')
    await this.page.getByLabel('Company name *').fill('playwright test')
    await this.page.getByLabel('Job title').fill('playwright test')
    await this.page
      .getByTestId('form-select-country')
      .getByRole('combobox')
      .selectOption('United Kingdom')
    await this.page
      .getByTestId('form-select-company-category')
      .getByRole('combobox')
      .selectOption('Raw material supplier')

    await this.page.getByRole('button', { name: 'Next' }).click()
  }
}
