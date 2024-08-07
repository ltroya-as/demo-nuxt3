import { test, expect } from '@playwright/test'
import { SERVICES } from '../constants/esg'
import { ESGPage } from '../object-models/esg.page'
import { ForecastPage } from '../object-models/forecast.page'
import { LoginUtils } from '~/playwright/utils/login.utils'
import { USER_STATE } from '~/playwright/enums/user-state.enum'

test.describe('ESG Unauthorized page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/esg/')
  })

  test('Should show hero', async ({ page }) => {
    await expect(page.getByTestId('breadcrumb')).toHaveCount(1)

    await expect(
      page.getByTestId('breadcrumb').getByTestId('breadcrumb-item'),
    ).toHaveCount(3)

    await expect(page.getByTestId('unauthorized-overview-title')).toContainText(
      'Sustainability',
    )
    await expect(page.getByTestId('unauthorized-overview-subtitle'))
      .toContainText(`The lithium ion battery supply chain is set to play a fundamental role on the road to electrification and the clean energy revolution, and all stages of the supply chain are coming under increased scrutiny for their sustainability credentials.
  `)

    await page
      .getByRole('button', { name: 'Contact us' })
      .first()
      .first()
      .click()

    await expect(page.getByTestId('contact-modal')).toHaveCount(1)
  })

  test('Should show LCA description section', async ({ page }) => {
    await expect(
      page.getByText('Life Cycle Assessment (LCA) Consultancy'),
    ).toHaveCount(1)

    await expect(
      page.getByText(
        'Benchmark conducts bespoke LCAs tailored to companies and operations across the ',
      ),
    ).toBeVisible()
  })

  test('Should show Benchmark ESG Reports section', async ({ page }) => {
    await expect(page.getByTestId('service-container-card')).toHaveCount(1)

    await expect(
      page.getByTestId('unauthorized-overview-more-info'),
    ).toContainText(`Available Subscriptions`)

    await page
      .getByTestId('service-container-card')
      .getByRole('button', { name: 'Contact Us' })
      .first()
      .click()

    await expect(page.getByTestId('contact-modal')).toHaveCount(1)
    await page
      .getByTestId('contact-modal')
      .locator('button[aria-label="Close modal"]')
      .click()
  })

  test('Should go to view product page', async ({ page }) => {
    await page
      .getByTestId('service-container-card')
      .getByRole('link', { name: 'View Product' })
      .first()
      .click()

    await expect(
      page.getByTestId('subscribe-call-to-action').getByRole('heading'),
    ).toContainText('Cobalt ESG Report')
  })

  SERVICES.forEach((service) => {
    test(`Should view ${service.mineral} unauthorized page ESG`, async ({
      page,
    }) => {
      const ESG = await ESGPage.prepare(page)
      await ESG.gotoMineralPage(service.link)
      await page.waitForSelector('[data-testid="hero-image"]')
      await ESG.validateBreadcrumb(3)
      await ESG.validateTitlePage(service.title)
      const cookiesButton = page.getByRole('button', { name: 'OK' }).isVisible()

      if (cookiesButton) await page.getByRole('button', { name: 'OK' }).click()

      await ESG.validateGroupButtons(service.checkbox)
      await ESG.validateBannerImages(
        service.bannerTitle,
        service.bannerDescription,
      )
      if (service.reportCards > 0) {
        await ESG.validatePackageSection(
          service.packageTitle,
          service.reportCards,
        )
      }
    })
  })
})

test.describe('ESG Authorized page', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/esg/')
  })

  test('Should show Purchased Subscriptions', async ({ page }) => {
    await page.waitForSelector('[data-testid="service-authorized-title"]')
    await expect(page.getByTestId('service-authorized-title')).toContainText(
      'Sustainability',
    )

    await expect(
      page.getByRole('heading', { name: 'Purchased Subscriptions' }),
    ).toHaveCount(1)

    await page
      .getByTestId('service-container-card')
      .first()
      .getByTestId('service-card-item')
      .first()
      .getByRole('link', { name: 'Reports' })
      .click()

    await page.waitForSelector('[data-testid="esg-title"]')
    await expect(
      page.getByRole('heading', { name: 'Cobalt ESG Reports' }),
    ).toHaveCount(1)
  })

  test('Should show Available Subscriptions', async ({ page }) => {
    await page.waitForSelector('[data-testid="service-authorized-title"]')
    await expect(page.getByTestId('service-authorized-title')).toContainText(
      'Sustainability',
    )

    await expect(
      page.getByTestId('service-container-card').first(),
    ).toBeVisible()
    await expect(
      page
        .getByTestId('service-container-card')
        .getByTestId('service-card-item')
        .first(),
    ).toBeVisible()
  })

  SERVICES.forEach((service) => {
    test(`Should view ${service.mineral} authorized page ESG`, async ({
      page,
    }) => {
      const ESG = await ESGPage.prepare(page)
      await ESG.gotoMineralPage(service.link)
      await page.waitForSelector('[data-testid="esg-title"]')
      await ESG.validateBreadcrumb(service.breadcrumbItems)
      if (service.reportCards > 1) {
        await ESG.validateTitleButtonDownloadAll(service.title)
      }
      await ESG.validateReportCards(service.reportDownloadCards)
    })
  })
})

test.describe('LCA page', () => {
  test('Should show a breadcrumb', async ({ page }) => {
    const ESG = await ESGPage.prepare(page)
    await page.goto('/esg/lca/')
    await page.waitForSelector('[data-testid="lca-description"]')
    await ESG.validateBreadcrumb(3)
  })

  test('should show a header section', async ({ page }) => {
    await ESGPage.prepare(page)
    await page.goto('/esg/lca/')
    await page.waitForSelector('[data-testid="lca-description"]')
    await expect(
      page.getByRole('heading', { name: 'LCA Consultancy' }),
    ).toBeVisible()
    await expect(
      page.getByText(
        'In light of increasing pressure for transparency and carbon accounting, LCAs are',
      ),
    ).toBeVisible()
  })

  test('Should show a description section', async ({ page }) => {
    await ESGPage.prepare(page)
    await page.goto('/esg/lca/')
    await page.waitForTimeout(1000)
    await expect(
      page.getByRole('heading', { name: 'Bespoke life cycle assessments' }),
    ).toBeVisible()

    await expect(
      page
        .getByTestId('lca-description')
        .getByText(
          'Benchmark conducts bespoke LCAs tailored to companies and operations across the ',
        ),
    ).toBeVisible()

    await expect(
      page.getByTestId('lca-description-list').locator('li'),
    ).toHaveCount(5)

    const images = page
      .getByTestId('lca-description-image')
      .locator('div > img')

    await expect(images).toHaveCount(4)

    for (const image of await images.all()) await expect(image).toBeVisible()

    await page.getByRole('button', { name: 'Contact Us' }).click()

    const forecastPage = new ForecastPage(page)

    const cookiesButton = page.getByRole('button', { name: 'OK' }).isVisible()
    if (cookiesButton) await page.getByRole('button', { name: 'OK' }).click()

    await forecastPage.contactPageFirstPage()

    await page.waitForSelector('[data-testid="contact-modal"]')

    const checkboxESG = await page
      .getByTestId('benchmark_services_sustainability')
      .getByRole('checkbox')
    await expect(checkboxESG).toBeChecked()

    await page.getByRole('button', { name: 'Close modal' }).click()
  })

  test('Should show a subscriptions image ', async ({ page }) => {
    await ESGPage.prepare(page)
    await page.goto('/esg/lca/')
    await page.waitForSelector('[data-testid="lca-description"]')
    await expect(page.getByRole('img', { name: 'subscriptions' })).toBeVisible()
  })

  test('Should show a LCA Across section', async ({ page }) => {
    await ESGPage.prepare(page)
    await page.goto('/esg/lca/')
    await page.waitForSelector('[data-testid="lca-description"]')
    await expect(
      page.getByRole('heading', { name: 'Benchmark Global LCAs' }),
    ).toBeVisible()

    await expect(
      page.getByText(
        'Each Global LCA provides a detailed analysis on the environmental impacts of the',
      ),
    ).toBeVisible()

    await expect(
      page.getByRole('img', { name: 'lca', exact: true }),
    ).toBeVisible()

    await page.getByRole('link', { name: 'More About ESG' }).click()

    await expect(page.getByTestId('unauthorized-overview-title')).toBeVisible()

    await expect(page.getByTestId('unauthorized-overview-title')).toContainText(
      'Sustainability',
    )
  })
})

test.describe('Sustainability Index page', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  SERVICES.forEach((service) => {
    if (!service.hasSustainabilityIndex) return
    test(`Should view Sustainability Index authorized page ESG ${service.mineral}`, async ({
      page,
    }) => {
      const ESG = new ESGPage(page)
      await ESG.gotoSustainabilityPage(service.mineral)
      await ESG.validateBreadcrumb(4)
      await ESG.validateTitleSustainabilityPage(service.sustainabilityTitle)
      await ESG.validateDownloadReport()
      await ESG.validateSustainabilityTable()
    })
  })
})
