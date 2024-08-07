import { test, expect } from '@playwright/test'
import { ForecastPage } from '../object-models/forecast.page'
import { LoginUtils } from '../utils/login.utils'
import { USER_STATE } from '../enums/user-state.enum'
import { SERVICES } from '../constants/forecast'

test.describe('Forecast page Unauthorize view', () => {
  test('show the breadcrumb section for overview', async ({ page }) => {
    const forecastPage = await ForecastPage.prepare(page)

    await forecastPage.validateBreadcrumb(3)
  })

  test('show info overview page', async ({ page }) => {
    await ForecastPage.prepare(page)
    await expect(page.getByTestId('unauthorized-overview-title')).toContainText(
      `Forecasts`,
    )

    await expect(
      page.getByTestId('unauthorized-overview-subtitle'),
    ).toContainText(
      `The world’s most extensive battery supply chain forecast databases, updated every quarter.`,
    )

    await expect(
      page.getByTestId('unauthorized-overview-description'),
    ).toHaveCount(3)

    await expect(
      page.getByTestId('unauthorized-overview-description').first(),
    ).toContainText(
      'Benchmark’s Forecast services provide a long-term outlook on the entire lithium-ion battery ecosystem, from the upstream raw materials, to the midstream products, to the final batteries, alongside our unique recycling insights.',
    )
  })

  test('should show forecasts services cards in overview page', async ({
    page,
  }) => {
    const forecastPage = await ForecastPage.prepare(page)

    await forecastPage.validateServiceContainer()
  })

  test('validate working on service card overview page', async ({ page }) => {
    const forecastPage = await ForecastPage.prepare(page)
    for (const card of await page.getByTestId('service-card-item').all())
      await forecastPage.validateCard(card, false)
  })

  SERVICES.forEach((service) => {
    test(`validate modal ${service.mineral} checkbox for card`, async ({
      page,
    }) => {
      const forecastPage = await ForecastPage.prepare(page)
      const card = page.getByTestId(`service-card-${service.link}`)
      const cookiesButton = await page
        .getByRole('button', { name: 'OK' })
        .isVisible()
      if (cookiesButton) await page.getByRole('button', { name: 'OK' }).click()
      if (service.checkbox)
        await forecastPage.validateModalCheckboxCard(card, service.checkbox)
    })
  })

  SERVICES.forEach((service) => {
    test(`validate redirect ${service.mineral} in card`, async ({ page }) => {
      const forecastPage = await ForecastPage.prepare(page)
      const card = page.getByTestId(`service-card-${service.link}`)
      await forecastPage.validateRedirectMineral(
        card,
        service.link,
        'View Product',
      )
    })
  })

  SERVICES.forEach((service) => {
    test(`validate ${service.mineral} page Unauthorize`, async ({ page }) => {
      const forecastPage = await ForecastPage.prepare(page)
      await forecastPage.gotoMineralPage(service.link)
      await forecastPage.validateBreadcrumb(3)
      await forecastPage.validateTitlePage(`${service.title}`)
      await forecastPage.validateBannerImages(
        service.bannerDescriptionQuantity,
        service.bannerTitle,
      )
      const cookiesButton = await page
        .getByRole('button', { name: 'OK' })
        .isVisible()
      if (cookiesButton) await page.getByRole('button', { name: 'OK' }).click()
      await forecastPage.validateGeneralCard(service.cardsQuantity)
      await forecastPage.validateGroupButtons(service.checkbox)
    })
  })
})

test.describe('Forecast page Authorize overview', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  test('show the breadcrumb section for overview', async ({ page }) => {
    const forecastPage = await ForecastPage.prepare(page)

    await forecastPage.validateBreadcrumb(3)
  })

  test('show info overview page', async ({ page }) => {
    await ForecastPage.prepare(page)
    await expect(page.getByTestId('service-authorized-title')).toContainText(
      `Forecasts`,
    )
  })

  test('should show forecasts services cards in overview page', async ({
    page,
  }) => {
    const forecastPage = await ForecastPage.prepare(page)

    await forecastPage.validateServiceContainer()
  })

  test('validate working on service card', async ({ page }) => {
    const forecastPage = await ForecastPage.prepare(page)
    await page.goto('/forecasts/lithium/')
    await page.waitForTimeout(3000)
    await page.goto('/forecasts/')
    for (const card of await page
      .getByText(
        'Lithium Reports Brochure Cobalt Reports Brochure Nickel Reports Brochure Natural',
      )
      .getByTestId('service-card-item')
      .all())
      await forecastPage.validateCard(card, true)
  })

  SERVICES.forEach((service) => {
    test(`validate redirect for ${service.mineral} card authorized`, async ({
      page,
    }) => {
      const forecastPage = await ForecastPage.prepare(page)
      await page.goto('/forecasts/lithium/')
      await page.waitForTimeout(3000)
      await page.goto('/forecasts/')
      const card = page.getByTestId(`service-card-${service.link}`, {
        exact: true,
      })
      await forecastPage.validateRedirectMineral(card, service.link, 'reports')
    })
  })

  SERVICES.forEach((service) => {
    test(`${service.mineral} page authorize`, async ({ page }) => {
      const forecastPage = await ForecastPage.prepare(page)
      await forecastPage.gotoMineralPage(service.link)
      await forecastPage.validateBreadcrumb(4)
      await forecastPage.validateReportCards()
      await forecastPage.validateTitleButtonDownloadAll(`${service.title}`)
    })
  })
})
