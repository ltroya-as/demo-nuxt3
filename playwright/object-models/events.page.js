import { expect } from '@playwright/test'
import { expectToHaveValidText } from '../utils/string.utils'

export class EventsPage {
  page

  constructor(page) {
    this.page = page
  }

  static async prepare(p) {
    const events = new this(p)
    await events.page.goto('/events/')
    await events.page.waitForSelector('[data-testid="event-card"]')

    return events
  }

  async testEventCardsContent() {
    const LOCATION_TYPES = ['In person', 'Online']

    const eventLocationType = await this.page
      .getByTestId('event-location-type')
      .evaluateAll((locationTypes) =>
        locationTypes.map((types) => {
          return types.textContent.trim()
        }),
      )

    const eventTitles = await this.page
      .getByTestId('event-title')
      .evaluateAll((titles) =>
        titles.map((title) => {
          return title.textContent.trim()
        }),
      )

    const eventDate = await this.page
      .getByTestId('event-date')
      .evaluateAll((dates) =>
        dates.map((date) => {
          return date.textContent.trim()
        }),
      )

    const eventLocation = await this.page
      .getByTestId('event-location')
      .evaluateAll((locations) =>
        locations.map((location) => {
          return location.textContent.trim()
        }),
      )

    eventLocationType.forEach((type) => {
      expectToHaveValidText(type)
      expect(LOCATION_TYPES).toContain(type)
    })
    eventTitles.forEach((title) => expectToHaveValidText(title))
    eventDate.forEach((date) => expectToHaveValidText(date))
    eventLocation.forEach((location) => expectToHaveValidText(location))
  }
}
