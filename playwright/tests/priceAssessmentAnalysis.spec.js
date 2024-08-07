import { test, expect } from '@playwright/test'
import { LoginUtils } from '~/playwright/utils/login.utils'
import { USER_STATE } from '~/playwright/enums/user-state.enum'
import { AnalysisPage } from '~/playwright/object-models/analysis.page'

const SERVICES = [
  {
    slug: 'lithium',
    cards: 2,
    search:
      'Chinese lithium carbonate converters bring new domestic capacity online – Benchmark Lithium',
  },
  {
    slug: 'cobalt',
    cards: 2,
    search:
      'On 30 June, Stellantis announced it had signed a binding offtake agreement with the Norwegian based Kuniko for 35%',
  },
  {
    slug: 'nickel',
    cards: 2,
    search:
      'In June, CNGR Advanced Material Co. (CNGR) and POSCO Holdings (POSCO) announced a US$1.16 billion JV to produce 50,000 tpa of battery grade nickel',
  },
  {
    slug: 'natural-graphite',
    cards: 2,
    search:
      'In mid-June 2023, Australian-listed anode aspirant, Talga, announced that it had received approval for €150m ($163m) in debt financing from the European Investment Bank (EIB) to develop its Vittangi anode project located ',
  },
  {
    slug: 'synthetic-graphite',
    cards: 2,
    search:
      'Indian carbon materials company, Epsilon Advanced Materials (Epsilon), announced it planned to invest $650m to construct a facility with a nameplate',
  },
  {
    slug: 'black-mass',
    cards: 2,
    search:
      'UK junior mining group, Technology Minerals Plc, inaugurated a joint venture recycling plant, LiBatt',
  },
  { slug: 'rare-earths', cards: 1, search: 'This is for testing purposes' },
]

test.describe('Unauthorized Price Analysis Detail', () => {
  SERVICES.forEach((service) => {
    test(`Should show ${service.slug} analysis page`, async ({ page }) => {
      const analysisPage = await AnalysisPage.prepare(page, service.slug)

      await analysisPage.testCountCards(service.slug, service.cards)
      await analysisPage.testTitleClickable(service.slug)
    })

    test(`${service.slug} Price Analysis should show`, async ({ page }) => {
      const analysisPage = await AnalysisPage.prepare(page, service.slug)
      await analysisPage.gotoArticle(service.slug)
      await analysisPage.testTextLength(service.slug)
      await analysisPage.testLoginButton()
      await analysisPage.testContactForm()
    })

    test(`${service.slug} Should show 404 page for article does not exists`, async ({
      page,
    }) => {
      await page.goto(
        `/price-assessments/${service.slug}/north-american-lithium-project-produces-first-spodumene-concentrate-benchmark/`,
      )
      await page.waitForTimeout(1000)
      await expect(page.getByRole('heading', { name: '404' })).toBeVisible()

      await expect(
        page.getByRole('link', { name: 'Return to Homepage' }),
      ).toBeVisible()
    })
  })
})

test.describe('Authorized Lithium Analysis Detail', () => {
  test.use({
    storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
  })

  SERVICES.forEach((service) => {
    test(`Should show authenticated article for ${service.slug}`, async ({
      page,
    }) => {
      const lithiumAnalysisPage = await AnalysisPage.prepare(
        page,
        service.slug,
        true,
      )
      await lithiumAnalysisPage.gotoArticle(service.slug)
      await lithiumAnalysisPage.testAuthenticatedArticleDetail(service.slug)
    })

    test(`Should show article found by search input for ${service.slug}`, async ({
      page,
    }) => {
      const lithiumAnalysisPage = await AnalysisPage.prepare(
        page,
        service.slug,
        true,
      )
      await lithiumAnalysisPage.testSearchArticle(service.slug, service.search)
    })

    test(`Should show articles filtered by checkboxes for ${service.slug}`, async ({
      page,
    }) => {
      const lithiumAnalysisPage = await AnalysisPage.prepare(
        page,
        service.slug,
        true,
      )
      await lithiumAnalysisPage.testFilterByCheckboxesArticle(service.slug)
    })
  })
})
