import { formatDateRange } from '~/utils/date'

const useValidatedEvent = (event: Ref<any>) => {
  const { $cloudinary } = useNuxtApp()

  const isEventDetail = ref(false)

  const eventType = computed(() => event.value.eventType ?? '')
  const eventWebinars = computed(() => event.value?.webinars ?? [])
  const eventTitle = computed(() => event.value.title ?? 'Event')
  const eventDescription = computed(() => event.value.blurb ?? '')
  const eventImage = computed(() => {
    let typeResize = isEventDetail.value ? 'event-detail' : 'event-card'
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      typeResize = isEventDetail.value
        ? 'event-detail-mobile'
        : 'event-card-mobile'
    }
    let image = event.value.backgroundImage?.sourceUrl
    if (!event.value.backgroundImage?.sourceUrl) {
      image =
        event.value.eventType === 'Online'
          ? 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_500,c_fill,g_auto/v1689289325/assets/events/benchmark-webinar_tickie.png?_i=AA'
          : 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_500,c_fill,g_auto/v1675204448/assets/events/event-fallback-in-person_kbldff.png?_i=AA'
    }
    return $cloudinary.optimize(image, typeResize)
  })
  const eventDate = computed(() => {
    if (event.value?.startDateTimeUTC && event.value?.endDateTimeUTC) {
      return formatDateRange(
        event.value.startDateTimeUTC,
        event.value.endDateTimeUTC,
        isEventDetail.value ? 'EEE,' : '',
      )
    }
    return ''
  })
  const eventLocation = computed(() => {
    if (event.value.eventType !== 'Online') {
      return event.value.location ?? ''
    }
    return eventType.value
  })
  const eventUrl = computed(() => {
    if (event.value?.url) {
      return event.value.url
    }
    return event.value.slug ? `/events/${event.value.slug}` : ''
  })

  return {
    isEventDetail,
    eventType,
    eventWebinars,
    eventTitle,
    eventDescription,
    eventImage,
    eventDate,
    eventLocation,
    eventUrl,
  }
}

export default useValidatedEvent
