<template>
  <div>
    <SharedEventsPageTitle />
    <SharedEventsPageNavigation />
    <div v-if="loading" class="flex min-h-[80vh] items-center justify-center">
      <TheLoader />
    </div>
    <SharedEventsPageSection
      v-if="!loading"
      :events="eventsPast"
      subtitle="Past events"
    />
  </div>
</template>

<script>
import { processEvents, getPastEvents } from '@/utils/events'
import TheLoader from '~/components/TheLoader.vue'

definePageMeta({ layout: 'events' })

export default {
  components: { TheLoader },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Events' })
    useHead(seo)
  },
  data() {
    return {
      loading: true,
      eventsPast: {},
      title: 'Events',
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
        this.eventsPast = getPastEvents(events)
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
