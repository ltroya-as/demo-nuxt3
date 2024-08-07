<template>
  <div>
    <div>
      <EventsWorldTour2022Header />

      <div class="relative overflow-hidden">
        <div class="absolute h-full w-full">
          <div class="background-stripe mt-96 w-full" />
          <div class="background-stripe mt-96 w-full" />
        </div>

        <div
          class="max-w-content-container relative mx-auto my-10 px-3 md:px-16 2xl:my-20 2xl:px-52"
        >
          <div>
            <p class="text-2xl font-bold">
              THE BENCHMARK WORLD TOUR IS THE ORIGINAL AND WORLD’S LEADING
              SERIES OF INVESTMENT SEMINARS FOR THE LITHIUM ION BATTERY TO
              ELECTRIC VEHICLE (EV) SUPPLY CHAIN.
            </p>

            <p class="mt-6 text-xl">
              Starting in 2015 and anchored by Benchmark Minerals’ expert
              analysts and original data, The Benchmark World Tour pioneered the
              global discussion of what has become one of the most significant
              mega trends of the 21st Century, the Energy Storage Revolution.
            </p>
            <p class="mt-6 text-xl">
              After five world tours and 19 host cities across five continents,
              The Benchmark World Tour returns for 2022 to focus on the
              unprecedented growth the lithium ion industry is experiencing.
              Benchmark will lead the discussion on how downstream demand
              coupled with the current raw material disconnect is having huge
              impact on the lithium ion battery to electric vehicle supply
              chain.
            </p>
            <p class="mt-6 text-xl">
              The Benchmark World Tour 2022 is coming to a city near you. Join
              us below, for free.
            </p>
          </div>

          <EventsWorldTour2022Section title="Host Cities">
            <div
              class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 lg:grid-cols-3"
            >
              <EventsWorldTour2022HostCityCard
                v-for="event in orderedEvents"
                :key="event.city"
                :event="event"
              />
            </div>
          </EventsWorldTour2022Section>

          <EventsWorldTour2022OrganizationListSection
            v-if="hostPartners.length"
            title="Host Partners"
            :organizations="hostPartners"
          />

          <EventsWorldTour2022OrganizationListSection
            v-if="sponsors.length"
            title="Sponsors"
            :organizations="sponsors"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sponsors from '@/constants/events/world-tour-2022/sponsors'
import hostPartners from '@/constants/events/world-tour-2022/host-partners'
import dataEvents from '@/constants/events/world-tour-2022/events'

export default {
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo(
      { title: 'World Tour 2022' },
      {
        twitterImage:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/g_center,w_1600,h_900,c_fill/v1680714497/assets/events/events_default_image_vmdug0.png',
        opengraphImage:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/g_center,w_1600,h_900,c_fill/v1680714497/assets/events/events_default_image_vmdug0.png',
      },
    )
    useHead(seo)
  },
  data() {
    return {
      events: [],
      sponsors,
      hostPartners,
    }
  },

  computed: {
    orderedEvents() {
      const _events = JSON.parse(JSON.stringify(this.events))
      const withDate = _events.filter((e) => !!e.date)
      const withoutDate = _events.filter((e) => !e.date)

      withDate.sort((a, b) => {
        const diff = new Date(a.date) - new Date(b.date)

        if (diff === 0) {
          return a.city < b.city ? -1 : 1
        }
        return diff
      })

      withoutDate.sort((a, b) => (a.city < b.city ? -1 : 1))
      return [...withDate, ...withoutDate]
    },
  },

  created() {
    this.events = dataEvents
  },
}
</script>

<style scoped>
.background-stripe {
  clip-path: polygon(0 30%, 100% 0, 100% 70%, 0% 100%);
  height: 800px;

  @apply bg-p-50;
}
</style>
