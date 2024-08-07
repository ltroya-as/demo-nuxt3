<template>
  <div>
    <EventsPageTitle />
    <EventsPageNavigation />
    <div v-if="loading" class="flex min-h-[80vh] items-center justify-center">
      <TheLoader />
    </div>
    <EventsPageSection
      v-if="!loading"
      :events="eventsUpcoming"
      subtitle="Upcoming World Tours"
    />
  </div>
</template>

<script>
import {
  getEventsSinceLastYear,
  getUpcomingEvents,
  processEvents,
} from '~/utils/events'
import TheLoader from '~/components/TheLoader.vue'
import EventsPageTitle from '~/components/shared/events/PageTitle.vue'
import EventsPageNavigation from '~/components/shared/events/PageNavigation.vue'
import EventsPageSection from '~/components/shared/events/PageSection.vue'

definePageMeta({ layout: 'events' })

export default {
  components: {
    EventsPageNavigation,
    EventsPageSection,
    EventsPageTitle,
    TheLoader,
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: 'World Tour Events',
    })
    useHead(seo)
  },
  data() {
    return {
      loading: true,
      eventsUpcoming: [],
      title: 'World Tour Events',
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
        const eventsFiltered = events?.filter((_event) => _event.isWorldTour)
        const eventsSinceLastYear = getEventsSinceLastYear(eventsFiltered)
        this.eventsUpcoming = getUpcomingEvents(eventsSinceLastYear)
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
