import { expect } from '@playwright/test'
import { BasePage } from '~/playwright/object-models/base.page'

export class GeneralPortal {
  page
  locators = {}

  constructor(page) {
    this.page = page
    this.locators.carouselArticle = page.getByTestId('portal-carousel-article')
    this.locators.carouselTitle = page.getByTestId('carousel-title')
    this.locators.carouselPublishDate = page.getByTestId(
      'carousel-publish-date',
    )
    this.locators.carouselCover = page.getByTestId('carousel-cover')
    this.locators.carouselDots = page.getByTestId('carousel-dots')
    this.locators.reportsAndModels = page.getByTestId('reports-and-models')
    this.locators.eventsSection = page.getByTestId('events-section')
    this.locators.heroReportCard =
      this.locators.reportsAndModels.getByTestId('hero-report-card')
    this.locators.reportCard = this.locators.reportsAndModels
      .getByTestId('report-card')
      .first()
    this.locators.unAuthSustainabilityTable = page.getByTestId(
      'un-auth-sustainability-index-table',
    )
  }

  static async prepare(p, slug) {
    const instance = new this(p)
    await instance.page.goto(`/market/${slug}/portal/`)

    return instance
  }

  async testHeroSection() {
    await expect(this.page.getByTestId('hero-title')).toBeVisible()
    await expect(this.page.getByTestId('hero-subtitle')).toBeVisible()
    await expect(this.page.getByTestId('hero-image')).toBeVisible()
    await expect(this.page.getByTestId('hero-description')).toBeVisible()
  }

  async testChartAndTable() {
    await expect(this.page.getByTestId('chart-title')).toBeVisible()
    await expect(this.page.getByTestId('simple-line-chart')).toBeVisible()
    await expect(this.page.getByTestId('portal-summary-table')).toBeVisible()
    await expect(
      this.page.getByTestId('portal-summary-table-header'),
    ).toBeVisible()
    await expect(
      this.page.getByTestId('portal-summary-table-content'),
    ).toBeVisible()
  }

  async testCarouselArticleCardData() {
    await expect(this.locators.carouselArticle).toBeVisible()
    await expect(this.locators.carouselTitle).toBeVisible()
    await expect(this.locators.carouselPublishDate).toBeVisible()
    expect(
      (await this.locators.carouselPublishDate.textContent()).length,
    ).toBeGreaterThan(0)
    await expect(this.locators.carouselPublishDate).not.toHaveText('undefined')
    await expect(this.locators.carouselCover).toBeVisible()
  }

  async testCarouselArticle() {
    await this.testCarouselArticleCardData()
    const totalDots = await this.locators.carouselDots.evaluate(
      (element) => element.children.length,
    )
    expect(totalDots).toBeGreaterThan(0)
    let firstCardData = await this.locators.carouselTitle.textContent()
    firstCardData += await this.locators.carouselPublishDate.textContent()

    await this.page.getByTestId(`carousel-dot-${totalDots - 1}`).click()
    await this.page.waitForTimeout(500)

    await this.testCarouselArticleCardData()
    let secondCardData = await this.locators.carouselTitle.textContent()
    secondCardData += await this.locators.carouselPublishDate.textContent()

    expect(firstCardData).not.toBe(secondCardData)
  }

  async testCapexTracker() {
    await expect(this.page.getByTestId('capex-tracker')).toBeVisible()
    await expect(this.page.getByTestId('capex-image')).toBeVisible()
    await expect(this.page.getByTestId('capex-title')).toBeVisible()
    await expect(this.page.getByTestId('capex-button')).toBeVisible()

    await this.page.getByTestId('capex-tracker').click()
    await expect(this.page.getByTestId('capex-tracker-modal')).toBeVisible()
    await expect(this.page.getByTestId('capex-modal-total')).toBeVisible()
    await expect(
      this.page.getByTestId('capex-modal-selected-year'),
    ).toBeVisible()
    expect(
      (await this.page.getByTestId('capex-modal-checkboxes').all()).length,
    ).toBeGreaterThan(0)
  }

  async testTooltipShare(context) {
    const defaultClipBoardText = 'any text'
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await this.page.evaluate(
      (defaultClipBoardText) =>
        navigator.clipboard.writeText(defaultClipBoardText),
      defaultClipBoardText,
    )

    await this.page.waitForSelector('[data-testid="share-tooltip-button"]')
    await expect(
      this.page.getByTestId('share-tooltip-button').first(),
    ).toBeVisible()
    await this.page.getByTestId('share-tooltip-button').first().hover()
    await this.page.waitForSelector('[data-testid="share-tooltip-content"]')
    await expect(this.page.getByTestId('share-on-x')).toBeVisible()
    await expect(this.page.getByTestId('share-on-linkedin')).toBeVisible()
    await expect(this.page.getByTestId('copy-link')).toBeVisible()

    await this.page.waitForTimeout(500)
    await this.page.getByTestId('copy-link').click()
    await expect(this.page.getByTestId('copied-tooltip')).toBeVisible()

    const handle = await this.page.evaluateHandle(() =>
      navigator.clipboard.readText(),
    )
    const clipboardContent = await handle.jsonValue()
    expect(clipboardContent).not.toBe(defaultClipBoardText)
  }

  // ********************
  // REPORTS AND MODELS SECTION
  // ********************
  async testHeroReportCard() {
    await expect(this.locators.heroReportCard).toBeVisible()
    await expect(
      this.locators.heroReportCard.getByTestId('card-label'),
    ).toBeVisible()
    await expect(
      this.locators.heroReportCard.getByTestId('hero-report-card-image'),
    ).toBeVisible()
    await expect(
      this.locators.heroReportCard.getByTestId('hero-report-title'),
    ).toBeVisible()
    await expect(
      this.locators.heroReportCard.getByTestId('report-card-footer'),
    ).toBeVisible()
    await expect(
      this.locators.heroReportCard.getByTestId('button-contact-us'),
    ).toBeVisible()
  }

  async testReportCard() {
    await expect(this.locators.reportCard).toBeVisible()
    await expect(
      this.locators.reportCard.getByTestId('card-label'),
    ).toBeVisible()
    await expect(
      this.locators.reportCard.getByTestId('report-card-image'),
    ).toBeVisible()
    await expect(
      this.locators.reportCard.getByTestId('report-card-title'),
    ).toBeVisible()
    await expect(
      this.locators.reportCard.getByTestId('report-card-footer'),
    ).toBeVisible()
    await expect(
      this.locators.reportCard.getByTestId('button-contact-us'),
    ).toBeVisible()
  }

  async testReportsAndModelsSection() {
    await expect(this.locators.reportsAndModels).toBeVisible()
    await expect(
      this.locators.reportsAndModels.getByTestId('section-title'),
    ).toBeVisible()
    await expect(
      this.locators.reportsAndModels
        .getByTestId('section-title')
        .getByTestId('link-with-animation'),
    ).toBeVisible()
    await expect(
      this.locators.reportsAndModels.getByTestId('reports-swiper'),
    ).toBeVisible()
    this.testHeroReportCard()
    this.testReportCard()
  }

  async testDownloadReport() {
    await BasePage.validDownload(
      this.page,
      this.locators.heroReportCard.getByTestId('report-button-download'),
    )
  }

  async testReportSwiper(slidesPerPage = 1) {
    const { reportsAndModels } = this.locators
    const activeClass = /swiper-slide-active/
    const maxSlides = 6
    const lastActiveSlide = maxSlides - slidesPerPage
    const lastActiveSlideDataTestId = `report-swiper-slide-${lastActiveSlide}`
    await expect(
      reportsAndModels.getByTestId('swiper-prev-button'),
    ).toBeDisabled()
    await expect(
      reportsAndModels.getByTestId('swiper-next-button'),
    ).toBeEnabled()
    await expect(
      reportsAndModels.getByTestId('report-swiper-slide-0'),
    ).toHaveClass(activeClass)
    // GO TO LAST SLIDE
    for (
      let i = 0;
      (await reportsAndModels.getByTestId('swiper-next-button').isEnabled()) &&
      i < maxSlides;
      i++
    ) {
      await reportsAndModels.getByTestId('swiper-next-button').click()
    }
    await expect(
      reportsAndModels.getByTestId('report-swiper-slide-0'),
    ).not.toHaveClass(activeClass)
    await expect(
      reportsAndModels.getByTestId(lastActiveSlideDataTestId),
    ).toHaveClass(activeClass)
    await expect(
      reportsAndModels.getByTestId('swiper-prev-button'),
    ).toBeEnabled()
    await expect(
      reportsAndModels.getByTestId('swiper-next-button'),
    ).toBeDisabled()
  }

  // ********************
  // SUSTAINABILITY SECTION
  // ********************
  async testUnAuthSustainabilityTable() {
    await expect(
      this.page.getByRole('heading', { name: 'Sustainability Index' }),
    ).toBeVisible()
    await expect(this.locators.unAuthSustainabilityTable).toBeVisible()
    await expect(
      this.locators.unAuthSustainabilityTable.getByTestId(
        'un-auth-sustainability-index-table-head',
      ),
    ).toBeVisible()
    await expect(
      this.locators.unAuthSustainabilityTable.getByTestId(
        'un-auth-sustainability-index-table-body',
      ),
    ).toBeVisible()
  }

  async testSustainabilityTable() {
    const table = await this.page.getByTestId('sustainability-table')
    await this.page.waitForSelector('[data-testid="sustainability-table"]')

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

  // ********************
  // EVENTS SECTION
  // ********************
  async testScrollToTop(locator) {
    const initialScrollPosition = await locator.evaluate((el) => el.scrollTop)
    await locator.evaluate((el) => {
      el.scrollTop = el.scrollHeight
    })
    const scrollPosition = await locator.evaluate((el) => el.scrollTop)
    expect(scrollPosition).not.toBe(initialScrollPosition)
  }

  async testEventCard(card) {
    await expect(card).toBeVisible()
    await expect(card).not.toHaveText('undefined')
    await expect(card.getByTestId('event-tag')).toBeVisible()
    await expect(card.getByTestId('event-title')).toBeVisible()
    await expect(card.getByTestId('event-image')).toBeVisible()
    await expect(card.getByTestId('event-date')).toBeVisible()
  }

  async testEventCards() {
    const eventsSidePanel = await this.page.getByTestId('events-side-panel')
    const eventCards = await eventsSidePanel.getByTestId('event-card').all()

    await this.testScrollToTop(eventsSidePanel)
    for (const card of eventCards) {
      await this.testEventCard(card)
    }
  }

  async testHeroEventCard() {
    const { eventsSection } = this.locators
    const heroEventCard = eventsSection.getByTestId('hero-event-card')
    await expect(heroEventCard).not.toHaveText('undefined')
    await expect(heroEventCard.getByTestId('event-date')).toBeVisible()
    await expect(heroEventCard.getByTestId('event-tag')).toBeVisible()
    await expect(heroEventCard.getByTestId('event-title')).toBeVisible()
    await expect(heroEventCard.getByTestId('event-image')).toBeVisible()
  }

  async testEventsSection() {
    await this.page.waitForSelector('[data-testid="events-section"]')
    await this.testHeroEventCard()
    await this.testEventCards()
  }

  async testEventsSwiper() {
    const { eventsSection } = this.locators
    const activeClass = /swiper-slide-active/
    const maxSlides = 4
    await expect(eventsSection.getByTestId('swiper-next-button')).toBeEnabled()
    await expect(eventsSection.getByTestId('swiper-slide-0')).toHaveClass(
      activeClass,
    )
    // GO TO LAST SLIDE
    for (
      let i = 0;
      (await eventsSection.getByTestId('swiper-next-button').isEnabled()) &&
      i < maxSlides;
      i++
    ) {
      await expect(eventsSection.getByTestId(`swiper-slide-${i}`)).toHaveClass(
        activeClass,
      )
      await eventsSection.getByTestId('swiper-next-button').click()
      await this.page.waitForTimeout(500)
      await expect(
        eventsSection.getByTestId(`swiper-slide-${i}`),
      ).not.toHaveClass(activeClass)
    }
  }
}
