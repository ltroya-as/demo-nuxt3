import { expect } from '@playwright/test'
import { BasePage } from './base.page'
import { ForecastPage } from './forecast.page'

export class ESGPage {
  page

  constructor(page) {
    this.page = page
  }

  static async prepare(p) {
    const esg = new this(p)
    await esg.page.goto('/esg/')
    await esg.page.waitForSelector('[data-testid="breadcrumb"]')

    return esg
  }

  async gotoMineralPage(mineral) {
    await this.page.goto(`/esg/${mineral}/`)
    await this.page.waitForSelector('[data-testid="breadcrumb"]')
  }

  async validateTitlePage(title) {
    await expect(
      this.page
        .getByTestId('subscribe-call-to-action')
        .getByRole('heading', { name: title }),
    ).toBeVisible()
  }

  async validateBreadcrumb(length) {
    await expect(this.page.getByTestId('breadcrumb-item')).toHaveCount(length)
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

    const forecastPage = new ForecastPage(this.page)
    await forecastPage.contactPageFirstPage()

    if (mineral) {
      const checkboxMineral = await this.page
        .getByTestId(`which_markets_are_you_interested_in_${mineral}`)
        .getByRole('checkbox')
      await expect(checkboxMineral).toBeChecked()
    }

    const checkboxESG = await this.page
      .getByTestId('benchmark_services_sustainability')
      .getByRole('checkbox')
    await expect(checkboxESG).toBeChecked()

    await this.page.getByRole('button', { name: 'Close modal' }).click()
  }

  async validateBannerImages(title, description) {
    const banner = await this.page.getByTestId('banner-images')
    await expect(banner).toBeVisible()

    const bannerDescription = await banner.getByTestId('banner-descriptions')
    await expect(
      bannerDescription.getByRole('heading', { name: title }),
    ).toBeVisible()

    await expect(bannerDescription.getByText(description)).toBeVisible()

    await expect(this.page.getByTestId('container-banner-images')).toBeVisible()
  }

  async validatePackageSection(title, count) {
    const packageSection = await this.page.getByTestId('package-section')
    await expect(packageSection).toBeVisible()

    await expect(packageSection.getByText(title)).toBeVisible()

    await expect(this.page.getByTestId('package-cards')).toBeVisible()

    await expect(
      this.page.getByTestId('package-cards').getByTestId('package-cards-items'),
    ).toHaveCount(count)
  }

  async validateGeneralCard(count) {
    const cards = await this.page.getByTestId('general-card')
    await expect(cards).toHaveCount(count)

    const headerFirst = await cards.first().getByRole('heading')

    await expect(headerFirst).toBeVisible()

    await expect(cards.first().locator('div > img')).toBeVisible()
  }

  async validateTitleButtonDownloadAll(title) {
    await expect(
      this.page.getByRole('heading', { name: title }).first(),
    ).toBeVisible()

    const button = await this.page.getByRole('button', { name: 'Download all' })
    await expect(button).toBeVisible()

    await BasePage.validDownload(this.page, button)
  }

  async validateReportCards() {
    await this.page.waitForSelector('[data-testid="esg-report-card"]')
    const cards = await this.page.getByTestId('esg-report-card')
    const cardsCount = await cards.count()

    await expect(cardsCount).toBeGreaterThanOrEqual(1)

    const firstCard = cards.first()

    await expect(firstCard.getByTestId('esg-report-card-image')).toBeVisible()

    await expect(firstCard.getByTestId('esg-report-card-title')).toBeVisible()

    const button = await firstCard.getByTestId('esg-button-download')

    await expect(button).toBeVisible()

    await BasePage.validDownload(this.page, button)
  }

  async gotoSustainabilityPage(mineral) {
    await this.page.goto(`/esg/${mineral}/sustainability-index/`)
    await this.page.waitForTimeout(2000)
    await this.page.waitForSelector('[data-testid="esg-title"]')
  }

  async validateTitleSustainabilityPage(title) {
    await expect(
      this.page.getByRole('heading', { name: title }).first(),
    ).toBeVisible()
  }

  async validateDownloadReport() {
    const button = await this.page.getByTestId(
      'lithium-sustainability-download-button',
    )

    await expect(button).toBeVisible()

    await BasePage.validDownload(this.page, button)
  }

  async validateSustainabilityTable() {
    const table = await this.page.getByTestId('sustainability-table')

    await expect(table).toBeVisible()

    await expect(
      table.getByRole('columnheader', { name: 'Classification' }),
    ).toBeVisible()

    await expect(
      table.getByRole('columnheader', {
        name: 'Benchmark Sustainability Index Score',
      }),
    ).toBeVisible()

    await expect(
      table.getByRole('columnheader', { name: 'Environment' }),
    ).toBeVisible()

    await expect(
      table.getByRole('columnheader', { name: 'Social' }),
    ).toBeVisible()

    await expect(
      table.getByRole('columnheader', { name: 'Governance' }),
    ).toBeVisible()

    await expect(table.locator('.ag-cell-value').first()).toBeVisible()
  }
}
