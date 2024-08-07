import { test, expect } from '@playwright/test'
import { HomePage } from '../object-models/home.page'

test.describe('Home page', () => {
  test('Should show the home page', async ({ page }) => {
    const homePage = new HomePage(page)

    await HomePage.prepare(page)
    await expect(
      homePage.locators.hero.locator('#bgImage > picture'),
    ).toBeVisible()

    await expect(
      homePage.locators.hero.getByRole('heading', {
        name: 'Enabling the Energy Transition',
      }),
    ).toBeVisible()

    await page.waitForSelector('[data-testid="announcement-bar"]')
    homePage.locators.hero.getByRole('button', { name: 'Contact us' }).click()
    await page.waitForSelector('[data-testid="contact-modal"]')
    await expect(
      homePage.locators.containerFormContainer.getByTestId(
        'form-submit-button',
      ),
    ).toBeVisible()
  })

  test('Should show hero event in home page', async ({ page }) => {
    const homePage = new HomePage(page)

    await HomePage.prepare(page)

    await page.waitForSelector('[data-testid="hero-event"]')

    await expect(homePage.locators.heroEvent).toHaveCount(1)

    await expect(
      homePage.locators.heroEvent.locator('svg').first(),
    ).toBeVisible()

    await expect(homePage.locators.heroEvent.locator('div > img')).toHaveCount(
      1,
    )

    await expect(
      homePage.locators.heroEvent.getByTestId('read-more'),
    ).toHaveCount(1)
  })

  test('Should show hero article in home page', async ({ page }) => {
    const homePage = new HomePage(page)

    await HomePage.prepare(page)

    await page.waitForSelector('[data-testid="hero-article"]')

    await expect(homePage.locators.heroArticle).toHaveCount(2)

    await expect(
      (
        await homePage.locators.heroArticle.getByTestId('read-more').all()
      ).length,
    ).toBeGreaterThanOrEqual(6)

    await expect(
      (
        await homePage.locators.heroArticle.getByTestId('title-slice').all()
      ).length,
    ).toBeGreaterThanOrEqual(5)

    await expect(
      (
        await homePage.locators.heroArticle.getByTestId('image-slice').all()
      ).length,
    ).toBeGreaterThanOrEqual(5)
  })

  test('Should show features in home page', async ({ page }) => {
    const homePage = new HomePage(page)

    await HomePage.prepare(page)

    await expect(homePage.locators.featureTitle).toContainText(
      'Bringing clarity to opaque future facing commodities',
    )

    await expect(
      page.getByText(
        'Unrivalled prices, data & insight from critical mineral mine to platform technology',
      ),
    ).toBeVisible()

    await expect(homePage.locators.featureItem).toHaveCount(3)

    await expect(
      homePage.locators.featureItem.locator('.mb-3 > svg'),
    ).toHaveCount(3)

    await expect(
      homePage.locators.featureItem.getByRole('heading'),
    ).toHaveCount(3)
    await expect(
      homePage.locators.featureItem.locator('.absolute > svg'),
    ).toHaveCount(2)
  })

  test('Should show image in home page', async ({ page }) => {
    await HomePage.prepare(page)
    await expect(
      page.getByText(
        'Prices, Data & Intelligence for platform technologies driving the Energy Transition',
      ),
    ).toBeVisible()
  })

  test('Should show supply section home page', async ({ page }) => {
    const homePage = new HomePage(page)

    await HomePage.prepare(page)

    await expect(
      page.getByRole('heading', {
        name: 'Lithium ion batteries: Benchmark’s unique supply chain approach',
      }),
    ).toBeVisible()

    await expect(homePage.locators.supplyChainItem).toHaveCount(4)

    await expect(homePage.locators.supplyChainItemTitle).toHaveCount(4)

    await expect(homePage.locators.supplyChainItemList).toHaveCount(4)

    await expect(
      homePage.locators.supplyChainItemTitle.getByText('Critical Minerals'),
    ).toBeVisible()

    await expect(
      homePage.locators.supplyChainItemTitle.getByText('Cathode & Anode'),
    ).toBeVisible()

    await expect(
      homePage.locators.supplyChainItemTitle.getByText('Lithium ion Batteries'),
    ).toBeVisible()

    await expect(
      homePage.locators.supplyChainItemTitle.getByText(
        'EV, ESS, Portable Tech',
      ),
    ).toBeVisible()
  })

  test('Should show our divisions home page', async ({ page }) => {
    const homePage = new HomePage(page)

    await HomePage.prepare(page)

    await expect(
      page.getByRole('heading', { name: 'Our Divisions' }),
    ).toBeVisible()

    await expect(homePage.locators.ourDivisionSection).toBeVisible()

    await expect(homePage.locators.ourDivisionItem).toHaveCount(8)

    await expect(
      homePage.locators.ourDivisionItem.getByText('Prices'),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText(
        'The world’s most trusted PRA for future facing commodities',
      ),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText('Data', { exact: true }),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText(
        'Unrivalled, granular supply chain data, regularly reassessed and refreshed',
      ),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText('Forecasts', { exact: true }),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText(
        'The most extensive supply chain forecasts databases, from mine to EV',
      ),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText('Consultancy', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText(
        'Bespoke research from the world’s experts, backed by Benchmark’s proprietary data',
      ),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText('Sustainability', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText(
        'Industry-first life cycle assessments, risk metrics, and ESG advisory',
      ),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText('Benchmark Source', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText(
        'Your gateway to Benchmark Mineral Intelligence',
      ),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText('Events', { exact: true }),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText(
        'Dealmaking & networking with Benchmark’s community - worldwide',
      ),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText('Team Benchmark', {
        exact: true,
      }),
    ).toBeVisible()

    await expect(
      homePage.locators.ourDivisionItem.getByText(
        'We have a truly global and expanding operation. Join Team Benchmark',
      ),
    ).toBeVisible()
  })

  test('Should show announcement bar in home page', async ({ page }) => {
    const homePage = new HomePage(page)

    await HomePage.prepare(page)

    await page.waitForSelector('[data-testid="announcement-bar"]')

    await expect(homePage.locators.announcementBar).toHaveCount(1)
  })

  test('Should bar announcement redirect to announcement slug page', async ({
    page,
  }) => {
    const homePage = new HomePage(page)

    await HomePage.prepare(page)

    await page.waitForSelector('[data-testid="announcement-bar"]')

    await homePage.locators.announcementBar.click()

    await page.waitForSelector('img[alt="article-banner"]')

    expect(page.getByRole('img', { name: 'article-banner' })).toBeVisible()
  })
})
