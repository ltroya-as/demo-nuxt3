import { test } from '@playwright/test'
import { EventsPage } from '../object-models/events.page'

test.describe('Events page', () => {
  test('should show event cards', async ({ page }) => {
    const eventsPage = await EventsPage.prepare(page)

    await eventsPage.testEventCardsContent()
  })

  test('past events should show event cards', async ({ page }) => {
    const eventsPage = await EventsPage.prepare(page)

    await eventsPage.page
      .getByTestId('event-navigation-item')
      .getByText('Past events')
      .click()

    await eventsPage.testEventCardsContent()
  })
})
