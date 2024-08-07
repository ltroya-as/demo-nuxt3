import { formatDateRange } from '~/utils/date'

export default {
  data() {
    return {
      isEventDetail: false,
    }
  },
  computed: {
    eventType() {
      return this.event.eventType?.at(0) ?? ''
    },
    eventWebinars() {
      return this.event?.webinars ?? []
    },
    eventTitle() {
      return this.event.title ?? 'Event'
    },
    eventDescription() {
      return this.event.blurb ?? ''
    },
    eventImage() {
      let typeResize = this.isEventDetail ? 'event-detail' : 'event-card'
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        typeResize = this.isEventDetail
          ? 'event-detail-mobile'
          : 'event-card-mobile'
      }
      let image = this.event.backgroundImage?.sourceUrl
      if (!this.event.backgroundImage?.sourceUrl) {
        image =
          this.event.eventType === 'Online'
            ? 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_500,c_fill,g_auto/v1689289325/assets/events/benchmark-webinar_tickie.png?_i=AA'
            : 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_500,c_fill,g_auto/v1675204448/assets/events/event-fallback-in-person_kbldff.png?_i=AA'
      }
      return this.$cloudinary.optimize(image, typeResize)
    },
    eventDate() {
      if (this.event?.startDateTimeUTC && this.event?.endDateTimeUTC) {
        return formatDateRange(
          this.event.startDateTimeUTC,
          this.event.endDateTimeUTC,
          this.isEventDetail ? 'EEE,' : '',
        )
      }
      return ''
    },
    eventLocation() {
      if (this.event.eventType?.at(0) !== 'Online') {
        return this.event.location ?? ''
      }
      return this.eventType
    },
    eventUrl() {
      if (this.event?.url) {
        return this.event.url
      }
      return this.event.slug ? `/events/${this.event.slug}` : ''
    },
  },
}
