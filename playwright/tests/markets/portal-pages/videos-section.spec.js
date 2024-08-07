import { test, expect } from '@playwright/test'
import { LoginUtils } from '~/playwright/utils/login.utils'
import { USER_STATE } from '~/playwright/enums/user-state.enum'
import { ContactPage } from '~/playwright/object-models/contact.page'
import { ALL_MARKETS } from '~/constants/services/constants'

test.describe('Video Swiper', () => {
  test('swiper should work', async ({ page }) => {
    await page.goto('/market/lithium/portal')
    await page.waitForSelector('[data-testid="videos-section"]')
    const section = page.getByTestId('videos-section')
    await expect(section).toBeVisible()
    await page.waitForSelector('[data-testid="hero-video-card"]')
    const swiper = section.getByTestId('swiper-videos')
    await expect(swiper).toBeVisible()
    const nextButton = section.getByTestId('swiper-next-button')
    const prevButton = section.getByTestId('swiper-prev-button')

    const activeClass = /swiper-slide-active/
    const totalSlides = await swiper.evaluate(
      (element) => element.children.length,
    )
    for (let index = 0; index < totalSlides; index++) {
      console.log('index', index)
      const slide = swiper.getByTestId(`video-swiper-slide-${index}`)
      await expect(slide).toHaveClass(activeClass)
      await nextButton.click()
      await page.waitForTimeout(500)
      await expect(slide).not.toHaveClass(activeClass)
    }

    await expect(swiper.getByTestId(`video-swiper-slide-0`)).toHaveClass(
      activeClass,
    )
    prevButton.click()
    await expect(swiper.getByTestId(`video-swiper-slide-0`)).not.toHaveClass(
      activeClass,
    )
    await expect(
      swiper.getByTestId(`video-swiper-slide-${totalSlides - 1}`),
    ).toHaveClass(activeClass)
  })
})

ALL_MARKETS.forEach((market) => {
  const route = `/market/${market.slug}/portal`

  test.describe(`form preselected values`, () => {
    test(`${market.name} Find out more form should have the correct preselected values`, async ({
      page,
    }) => {
      await page.goto(route)
      await page.waitForSelector('[data-testid="videos-section"]')
      const section = page.getByTestId('videos-section')
      const findOutMoreButton = section
        .getByRole('button', {
          name: 'Find out more',
        })
        .first()
      await expect(findOutMoreButton).toBeVisible()
      await expect(findOutMoreButton).toHaveText('Find out more')
      const contactInstance = new ContactPage(
        page.getByTestId(ContactPage.modalDataTestId),
        page,
      )
      await contactInstance.testContactFormPreselectedValues(
        market.slug.replaceAll('-', '_'),
        'Benchmark Source',
        findOutMoreButton,
      )
    })
  })

  test.describe(`Auth ${market.name} Portal - Video Section`, () => {
    test.use({
      storageState: LoginUtils.getState(USER_STATE.RCP_ALL),
    })

    test.beforeEach(async ({ page }) => {
      await page.goto(route)
      await page.waitForSelector('[data-testid="videos-section"]')
      const section = page.getByTestId('videos-section')
      await expect(section).toBeVisible()
      await section.scrollIntoViewIfNeeded()
    })

    test('Should show video section', async ({ page }) => {
      const section = page.getByTestId('videos-section')
      await expect(section).toBeVisible()
      await page.waitForSelector('[data-testid="hero-video-card"]')
      const title = section.getByRole('heading')
      await expect(title).toHaveText('Videos')
      const viewMoreLink = section.getByRole('link')
      await expect(viewMoreLink).toHaveText('View More')
      const videoHero = section.getByTestId('hero-video-card')
      await expect(videoHero).toBeVisible()
      const swiper = section.getByTestId('swiper-videos')
      await expect(swiper).toBeVisible()
    })

    test('Should show hero card on video section', async ({ page }) => {
      await page.waitForSelector('[data-testid="hero-video-card"]')
      const heroCard = page.getByTestId('hero-video-card')
      await expect(heroCard).toBeVisible()
      const image = heroCard.getByTestId('hero-video-card-cover')
      await expect(image).toBeVisible()
      const date = heroCard.getByTestId('hero-video-card-date')
      await expect(date).toBeVisible()
      const title = heroCard.getByTestId('hero-video-card-title')
      await expect(title).toBeVisible()
      const description = heroCard.getByTestId('hero-video-card-excerpt')
      await expect(description).toBeVisible()
      const watchButton = heroCard.getByRole('button')
      await expect(watchButton).toBeVisible()
      await expect(watchButton).toHaveText('Watch Now')
    })

    test('Should show video modal after clicked on Watch Now button', async ({
      page,
    }) => {
      await page.waitForSelector('[data-testid="hero-video-card"]')
      const heroCard = page.getByTestId('hero-video-card')
      const watchButton = heroCard.getByRole('button')
      await expect(watchButton).toBeVisible()
      await watchButton.click()
      const modal = page.getByTestId('videoIntro-modal')
      await expect(modal).toBeVisible()
      await page.locator('iframe').waitFor({ state: 'visible' })
      const iFrame = modal.locator('iframe')
      await expect(iFrame).toBeVisible()
    })
  })
})
