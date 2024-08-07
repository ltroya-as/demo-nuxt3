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
      subtitle="Upcoming events"
    />
    <EventsPageSection
      v-if="!loading"
      :events="eventsPast"
      subtitle="Past events"
    />

    <div
      v-if="!loading"
      class="mt-10 flex w-full flex-col items-center justify-center"
    >
      <CommonButton
        variant="tertiary"
        extra-classes="md:!w-fit md:text-sm text-sm text-base"
        link="/events/past"
      >
        View more Past events
      </CommonButton>
    </div>
  </div>
</template>

<script>
import {
  getEventsSinceLastYear,
  getPastEvents,
  getUpcomingEvents,
  processEvents,
} from '~/utils/events'
import TheLoader from '~/components/TheLoader.vue'
import EventsPageTitle from '~/components/shared/events/PageTitle.vue'
import EventsPageNavigation from '~/components/shared/events/PageNavigation.vue'
import EventsPageSection from '~/components/shared/events/PageSection.vue'
import CommonButton from '~/components/common/Button.vue'

definePageMeta({ layout: 'events' })

export default {
  components: {
    CommonButton,
    EventsPageNavigation,
    EventsPageSection,
    EventsPageTitle,
    TheLoader,
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Events' })
    useHead(seo)
  },
  data() {
    return {
      loading: true,
      events: [],
      eventsUpcoming: [],
      eventsPast: [],
      title: 'Events',
      options: [
        {
          name: 'All',
          checked: true,
          disabled: false,
          isDivider: false,
        },
        {
          isDivider: true,
        },
        {
          name: 'Webinars',
          checked: true,
          disabled: false,
          isDivider: false,
        },
        {
          name: 'World Tour',
          checked: true,
          disabled: false,
          isDivider: false,
        },
        {
          name: 'Other Events',
          checked: true,
          disabled: false,
          isDivider: false,
        },
        {
          isDivider: true,
        },
      ],
    }
  },
  computed: {
    filters() {
      return this.options
        .filter((item) => item.checked)
        .map((item) => item.name.replace(' ', '-').toLowerCase())
    },
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
        const eventsSinceLastYear = getEventsSinceLastYear(events)
        this.eventsUpcoming = getUpcomingEvents(eventsSinceLastYear)
        this.eventsPast = getPastEvents(eventsSinceLastYear)
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
