<template>
  <div>
    <EventsPageTitle />
    <EventsPageNavigation />
    <div v-if="loading" class="flex min-h-[80vh] items-center justify-center">
      <TheLoader />
    </div>
    <EventsPageSection
      v-if="!loading"
      :events="upcomingWebinars"
      subtitle="Upcoming Webinars"
    />
    <EventsPageSection
      v-if="!loading"
      :events="pastWebinars"
      subtitle="Past Webinars"
    />
  </div>
</template>

<script>
import TheLoader from '~/components/TheLoader.vue'
import EventsPageTitle from '~/components/shared/events/PageTitle.vue'
import EventsPageNavigation from '~/components/shared/events/PageNavigation.vue'
import EventsPageSection from '~/components/shared/events/PageSection.vue'
import {
  getEventsSinceLastYear,
  getPastEvents,
  getUpcomingEvents,
  processEvents,
} from '~/utils/events'

definePageMeta({ layout: 'events' })

export default {
  components: {
    TheLoader,
    EventsPageTitle,
    EventsPageNavigation,
    EventsPageSection,
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Webinar Events' })
    useHead(seo)
  },
  data() {
    return {
      loading: true,
      upcomingWebinars: [],
      pastWebinars: [],
      title: 'Webinar Events',
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      try {
        const response = await this.$graphqlClient.getEvents()

        const eventsRaw = response.data.events.nodes
        const events = processEvents(eventsRaw)
        const eventsFiltered = events?.filter(
          (_event) => _event.eventType.toLowerCase() === 'online',
        )
        const eventsSinceLastYear = getEventsSinceLastYear(eventsFiltered)
        this.upcomingWebinars = getUpcomingEvents(eventsSinceLastYear)
        this.pastWebinars = getPastEvents(eventsSinceLastYear)
      } catch (_error) {
        // eslint-disable-next-line no-console
        console.error(_error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
