import { test, expect } from '@playwright/test'

test.describe('announcement page', () => {
  test('should show the announcement archive page', async ({ page }) => {
    await page.goto('/announcements/')

    await expect(page.getByTestId('announcement-title-slug')).toBeVisible()

    const count = await page.getByTestId('announcement-cards').count()

    expect(count).toBeGreaterThan(1)

    const announcementCard = await page
      .getByTestId('announcement-cards')
      .first()

    expect(announcementCard.getByTestId('announcement-card-date')).toBeVisible()

    expect(
      announcementCard.getByTestId('announcement-card-title'),
    ).toBeVisible()

    expect(
      announcementCard.getByTestId('announcement-card-description'),
    ).toBeVisible()

    expect(announcementCard.getByTestId('announcement-card-link')).toBeVisible()

    await announcementCard.getByTestId('announcement-card-link').click()

    expect(page.url()).toContain('/announcements/')
  })

  test('should show the announcement slug page', async ({ page }) => {
    await page.goto('/announcements/')

    const announcementCard = await page
      .getByTestId('announcement-cards')
      .first()

    await announcementCard.getByTestId('announcement-card-link').click()

    expect(page.url()).toContain('/announcements/')

    await expect(page.getByTestId('announcement-title-slug')).toBeVisible()

    await expect(page.getByTestId('announcement-date-slug')).toBeVisible()

    await expect(page.getByTestId('announcement-content-slug')).toBeVisible()
  })
})
