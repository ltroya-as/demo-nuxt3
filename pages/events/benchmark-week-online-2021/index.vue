<template>
  <div class="bg-bwo21-purple-800">
    <EventHeader />
    <div style="max-width: 1175px; margin: auto">
      <TheLoader v-if="loading" />
      <Schedule v-else :schedule="webinars" />
      <div
        v-if="sponsors.length > 0"
        class="mb-10 mt-20 flex flex-col items-center"
      >
        <div
          class="mb-6 text-center text-3xl font-bold uppercase text-white underline"
        >
          Our Sponsors
        </div>
        <div class="sponsors w-full">
          <div
            style="border-radius: 40px; opacity: 0.85"
            class="w-container mx-8 grid grid-cols-2 gap-4 bg-white py-16 md:grid-cols-3 lg:grid-cols-4 xl:mx-0"
          >
            <Sponsor
              v-for="(sponsor, j) in sponsors"
              :key="j"
              :image-url="sponsor.imageUrl?.sourceUrl"
              :website-url="sponsor?.websiteUrl"
              class="sponsor px-6 py-2 lg:px-12"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dateFnsTz from 'date-fns-tz'
import eventDetail from '@/queries/event-details.gql'
import EventHeader from '~/components/events/benchmark-week-online-2021/EventHeader'
import Schedule from '~/components/events/benchmark-week-online-2021/Schedule'
import Sponsor from '~/components/events/Sponsor.vue'

const { zonedTimeToUtc } = dateFnsTz

export default {
  components: {
    EventHeader,
    Schedule,
    Sponsor,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      event: {},
      loading: true,
      webinars: [],
      sponsors: [],
    }
  },

  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo(
      {
        title: 'Benchmark Week Online 2021 | Benchmark Minerals',
      },
      {
        twitterImage:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/g_center,w_1600,h_900,c_fill/v1680714497/assets/events/events_default_image_vmdug0.png',
        opengraphImage:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/g_center,w_1600,h_900,c_fill/v1680714497/assets/events/events_default_image_vmdug0.png',
      },
    )
    useHead(seo)
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      const slug = 'benchmark-week-online-2021'

      const { data } = await this.$bmAuth.getPublicGraphqlClient().query({
        query: eventDetail,
        variables: { slug },
      })

      const webinars = data.event.events.webinars
      this.webinars = webinars.map((webinar) => {
        webinar.startDateTimeUTC = zonedTimeToUtc(
          new Date(webinar.startDateTime),
          webinar.timeZone?.at(0) ?? 'UK/London',
        )
        webinar.endDateTimeUTC = zonedTimeToUtc(
          new Date(webinar.endDateTime),
          webinar.timeZone?.at(0) ?? 'UK/London',
        )
        return webinar
      })

      this.sponsors = webinars
        .map((webinar) => webinar?.sponsors)
        .filter((sponsor) => sponsor)
        .flat()

      this.loading = false
    },
  },
}
</script>
