import { test } from '@playwright/test'
import { LoginUtils } from '@/playwright/utils/login.utils'
import { USER_STATE } from '@/playwright/enums/user-state.enum'
import { GeneralPortal } from '@/playwright/object-models/markets/general-portal'
import { ContactPage } from '~/playwright/object-models/contact.page'
import {
  ALL_MARKETS,
  MARKETS_WITH_INDEX_OR_PRICES,
  MARKETS_WITH_SUSTAINABILITY_INDEX,
  LITHIUM,
} from '~/constants/services/constants'

ALL_MARKETS.forEach((market) => {
  test.describe(`${market.name} Portal Sections`, () => {
    test('should show the hero section', async ({ page }) => {
      const generalPortal = await GeneralPortal.prepare(page, market.slug)
      await generalPortal.testHeroSection()
    })

    test('should show the capex tracker', async ({ page }) => {
      const generalPortal = await GeneralPortal.prepare(page, market.slug)
      await generalPortal.testCapexTracker()
    })

    test('should show the carousel article', async ({ page }) => {
      const generalPortal = await GeneralPortal.prepare(page, market.slug)
      await generalPortal.testCarouselArticle()
    })

    test('should show the reports and models', async ({ page }) => {
      const generalPortal = await GeneralPortal.prepare(page, market.slug)
      const contactInstance = new ContactPage(
        generalPortal.page.getByTestId(ContactPage.modalDataTestId),
        generalPortal.page,
      )
      await generalPortal.testReportsAndModelsSection()
      await contactInstance.testContactFormPreselectedValues(
        market.slug.replaceAll('-', '_'),
        'Forecasts and Costs',
        generalPortal.locators.heroReportCard.getByTestId('button-contact-us'),
      )
    })
  })
})

MARKETS_WITH_INDEX_OR_PRICES.forEach((market) => {
  test.describe(`${market.name} Portal Index Section`, () => {
    test('should show the index section', async ({ page, context }) => {
      const generalPortal = await GeneralPortal.prepare(page, market.slug)
      await generalPortal.testChartAndTable()
      await generalPortal.testTooltipShare(context)
    })
  })
})

MARKETS_WITH_SUSTAINABILITY_INDEX.forEach((market) => {
  test.describe(`${market.name} Un-Auth Sustainability Section`, () => {
    test('should show the sustainability table', async ({ page }) => {
      const generalPortal = await GeneralPortal.prepare(page, market.slug)
      await generalPortal.testUnAuthSustainabilityTable()
    })
  })

  test.describe(`${market.name} Auth Sustainability Section`, () => {
    test.use({
      storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
    })
    test('should show the sustainability table', async ({ page }) => {
      const generalPortal = await GeneralPortal.prepare(page, market.slug)
      await generalPortal.testSustainabilityTable()
    })
  })
})

test.describe(`Downloads On Portal`, () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  test('should download the report', async ({ page }) => {
    const generalPortal = await GeneralPortal.prepare(page, LITHIUM.slug)
    await generalPortal.testDownloadReport()
  })
})

const resolutions = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1536, height: 900 },
}

test.describe('Reports Swiper On different devices', () => {
  test('swiper on desktop should work', async ({ page }) => {
    const generalPortal = await GeneralPortal.prepare(page, LITHIUM.slug)
    await page.setViewportSize(resolutions.desktop)
    await generalPortal.testReportSwiper(3)
  })
  test('swiper on tablet should work', async ({ page }) => {
    const generalPortal = await GeneralPortal.prepare(page, LITHIUM.slug)
    await page.setViewportSize(resolutions.tablet)
    await generalPortal.testReportSwiper(2)
  })
  test('swiper on mobile should work', async ({ page }) => {
    const generalPortal = await GeneralPortal.prepare(page, LITHIUM.slug)
    await page.setViewportSize(resolutions.mobile)
    await generalPortal.testReportSwiper(1)
  })
})

test.describe('Events Section', () => {
  test('should show the events section', async ({ page }) => {
    const generalPortal = await GeneralPortal.prepare(page, LITHIUM.slug)
    await generalPortal.testEventsSection()
  })

  test('swiper on mobile should work', async ({ page }) => {
    const generalPortal = await GeneralPortal.prepare(page, LITHIUM.slug)
    await page.setViewportSize(resolutions.mobile)
    await generalPortal.testEventsSwiper()
  })
})
