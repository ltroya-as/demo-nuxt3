<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="grow">
      <HomeHeroSection :event="event" :articles="articles" :loading="loading" />
      <div
          class="max-w-content-container px-small mx-auto mb-6 md:mb-0 lg:px-14 2xl:px-0"
      >
        <HomeFeatures />
      </div>
      <div
          class="h-hero-container bg-s-900 relative mx-auto mt-7 hidden overflow-hidden md:mb-6 md:block"
      >
        <img
            alt="image-home-page"
            class="h-hero-container 5xl:w-full"
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,h_560,f_auto/v1678804229/assets/home/VideoBannerHome_npgzv9.jpg"
        />
        <div
            class="absolute bottom-0 left-0 right-0 top-0 grid place-content-center"
        >
          <span class="max-w-4xl text-center text-4xl font-bold text-white">
            Prices, Data & Intelligence for platform technologies driving the
            Energy Transition
          </span>
        </div>
      </div>
      <h2
          class="max-w-content-container px-small text-surface-em-high mx-auto mb-3 text-2xl font-bold leading-8 lg:px-14 lg:text-3xl lg:leading-9 2xl:px-0"
      >
        Lithium ion batteries: Benchmark’s unique supply chain approach
      </h2>
      <div class="px-small md:px-0">
        <HomeSupplyChain />
      </div>

      <OurDivisionsSection />
    </div>
  </div>
</template>

<script>
import {
  getEventsSinceLastYear,
  getUpcomingEvents,
  processEvents,
} from '@/utils/events'
import HomeHeroSection from '~/components/home/HeroSection.vue'
import HomeFeatures from '~/components/home/Features.vue'
import HomeSupplyChain from '~/components/home/SupplyChain.vue'
import OurDivisionsSection from '~/components/OurDivisionsSection.vue'
import { TITLE } from '~/utils/constants'

export default {
  components: {
    HomeHeroSection,
    HomeFeatures,
    HomeSupplyChain,
    OurDivisionsSection,
  },
  data() {
    return {
      articles: [],
      event: {},
      loading: true,
    }
  },
  computed: {
    userCanPreviewContent() {
      return this.$store.state.auth.user.canPreviewContent
    },
  },

  async mounted() {
    // this.$store.commit('modal/setInitialFields', {})
    try {
      this.loading = true
      this.articles = await this.fetchArticles()

      const eventsResponse = await this.$graphqlClient.getEvents()

      const eventsRaw = eventsResponse.data.events.nodes.filter(
          (event) => event.isFeatured,
      )
      const events = processEvents(eventsRaw)
      const eventsSinceLastYear = getEventsSinceLastYear(events)
      const upcomingEvents = getUpcomingEvents(eventsSinceLastYear)

      if (upcomingEvents?.length) {
        this.event = upcomingEvents[0]
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    } finally {
      setTimeout(() => {
        this.loading = false
      }, 750)
    }
  },

  methods: {
    async fetchArticles() {
      const ITEMS_ARTICLES = 3
      const response = await this.$graphqlClient.getMembershipArticles({
        first: ITEMS_ARTICLES,
        showOnlyFeaturedPosts: true,
      })

      return response.data.memberships?.nodes || []
    },
  },
}
</script>
