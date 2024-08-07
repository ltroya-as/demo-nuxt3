export class HomePage {
  page
  locators = {
    hero: undefined,
    containerFormContainer: undefined,
    heroEvent: undefined,
    heroArticle: undefined,
    featureTitle: undefined,
    featureItem: undefined,
    supplyChainItem: undefined,
    supplyChainItemTitle: undefined,
    supplyChainItemList: undefined,
    ourDivisionSection: undefined,
    ourDivisionItem: undefined,
    announcementBar: undefined,
  }

  constructor(page) {
    this.page = page
    this.locators.hero = page.getByTestId('hero')
    this.locators.containerFormContainer = page.getByTestId(
      'contact-form-container',
    )
    this.locators.heroEvent = page.getByTestId('hero-event')
    this.locators.heroArticle = page.getByTestId('hero-article')
    this.locators.featureTitle = page.getByTestId('features-title')
    this.locators.featureItem = page.getByTestId('features-item')
    this.locators.supplyChainItem = page.getByTestId('supplyChain-item')
    this.locators.supplyChainItemTitle = page.getByTestId(
      'supplyChain-item-title',
    )
    this.locators.supplyChainItemList = page.getByTestId(
      'supplyChain-item-list',
    )
    this.locators.ourDivisionSection = page.getByTestId('our-divisions-section')
    this.locators.ourDivisionItem = page.getByTestId('ourDivision-item')
    this.locators.announcementBar = page.getByTestId('announcement-bar')
  }

  static async prepare(p) {
    const login = new this(p)
    await login.page.goto('/')
    await login.page.waitForSelector('[data-testid="hero"]')

    return login
  }
}
