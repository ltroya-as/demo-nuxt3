import * as dateFnsTz from 'date-fns-tz'
import partition from 'lodash/partition'
import { sub, isAfter, isDate, format } from 'date-fns'
import { BENCHMARK_MINERALS_URLS } from '~/utils/constants'

const { zonedTimeToUtc } = dateFnsTz

export const isBenchmarkMineralsHost = (url) => {
  if (!url) return false

  return BENCHMARK_MINERALS_URLS.some((_route) => url.includes(_route))
}

const getReturnRoute = (url) => {
  try {
    /**
     * in this part, we validate if a link is an internal link of benchmarkminerals.com
     * to place the appropriate host depending on the environment in which the application is running.
     */

    if (!isBenchmarkMineralsHost(url)) return url

    let route = url
    BENCHMARK_MINERALS_URLS.forEach((_route) => {
      const splitRoute = url.split(_route)

      if (splitRoute.length > 1) {
        route = url.split(_route)[1]
      }
    })

    return route
  } catch (_e) {
    return url
  }
}
const processEvents = (rawEvents) => {
  const acfEvents = rawEvents.flatMap((e) => {
    return { ...e.events, slug: e.slug }
  })

  acfEvents.forEach((event) => formatEvent(event))

  return acfEvents
}

const formatEvent = (event) => {
  // Get pathname for url
  const url = event.url

  event.url = getReturnRoute(event.url) ?? ''
  event.slug = event.slug ?? null
  if (!isBenchmarkMineralsHost(url)) event.target = '_blank'
  // If only one of the dates are null, just take the same value of the one that has value
  event.startDateTime = event.startDateTime || event.endDateTime
  event.endDateTime = event.endDateTime || event.startDateTime
  event.backgroundImage = event.backgroundImage?.sourceUrl
    ? event.backgroundImage
    : null
  event.isWorldTour = !!event?.eventWorldTour
  // We need to check if the date is null, because new Date(null) returns a valid date => '1970-01-01T00:00:00.000Z'
  if (event.startDateTime) {
    event.startDateTimeUTC = zonedTimeToUtc(
      new Date(event.startDateTime),
      event.timeZone,
    )
    event.monthYear = format(event.startDateTimeUTC, 'MMMM yyyy')
    event.year = format(event.startDateTimeUTC, 'yyyy')
  }

  if (event.endDateTime) {
    event.endDateTimeUTC = zonedTimeToUtc(
      new Date(event.endDateTime),
      event.timeZone,
    )
  }

  event.webinars?.forEach((webinar) => {
    webinar.location = event.location ?? event.eventType
    webinar.startDateTimeUTC =
      webinar.startDateTime &&
      zonedTimeToUtc(
        new Date(webinar.startDateTime),
        webinar.timeZone ?? event.timeZone,
      )

    webinar.endDateTimeUTC =
      webinar.endDateTime &&
      zonedTimeToUtc(
        new Date(webinar.endDateTime),
        webinar.timeZone ?? event.timeZone,
      )
    webinar.sessions = webinar.sessions || []
  })
  return event
}

const getEventsSinceLastYear = (events) => {
  // Filter active events from the last 12 months with valid start and end dates
  const today = new Date()
  const oneYearAgoDate = sub(today, { years: 1 })
  return events.filter(
    (_event) =>
      isAfter(_event.startDateTimeUTC, oneYearAgoDate) &&
      isDate(_event.startDateTimeUTC) &&
      isDate(_event.endDateTimeUTC),
  )
}

const getFilteredEvents = (events, filters) => {
  const eventsFilter = {
    webinars: (event) => event.eventType.toLowerCase() === 'online',
    'world-tour': (event) => event.isWorldTour,
    'other-events': (event) => event,
  }

  if (filters.includes('all')) return events

  let filteredEvents = events

  filters.forEach((filter) => {
    filteredEvents = filteredEvents.filter(eventsFilter[filter])
  })

  return filteredEvents
}

const getUpcomingEvents = (events) => {
  const eventsPartitioned = partition(events, (event) => {
    const currentDateTime = new Date()
    return event.endDateTimeUTC > currentDateTime
  })
  return eventsPartitioned[0].sort(
    (a, b) => a.startDateTimeUTC - b.startDateTimeUTC,
  )
}

const getPastEvents = (events) => {
  const eventsPartitioned = partition(events, (event) => {
    const currentDateTime = new Date()
    return !event.endDateTime || event.endDateTimeUTC > currentDateTime
  })
  return eventsPartitioned[1].sort(
    (a, b) => b.startDateTimeUTC - a.startDateTimeUTC,
  )
}

const formatNavEvents = (events) => {
  return events?.map((_event) => {
    const hasURL = !!_event.url
    return {
      name: _event.title,
      href: hasURL ? _event.url : `/${_event.slug || ''}`,
      target: hasURL ? _event.target : undefined,
    }
  })
}

export {
  formatEvent,
  processEvents,
  getEventsSinceLastYear,
  getUpcomingEvents,
  getPastEvents,
  formatNavEvents,
  getFilteredEvents,
}
