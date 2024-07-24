<template>
  <div data-testid="hero-event" @click="handlerClickMobile">
    <div class="absolute top-0 aspect-video h-full w-full md:aspect-auto">
      <img
        :src="eventImage"
        class="w-full min-w-full object-cover md:h-auto md:min-h-full lg:h-full lg:w-full"
        :alt="eventTitle"
      />
    </div>

    <!-- Content -->
    <div
      class="relative flex h-full flex-col items-center justify-between px-5 py-7 text-white md:aspect-auto md:items-start md:px-8 md:py-5 lg:px-10 lg:pt-8"
    >
      <div class="flex flex-col justify-start md:gap-3">
        <p class="mb-3 md:mb-0">
          <BenchmarkEventsLogo class="5xl:h-6 h-3.5 md:h-4" />
        </p>

        <a
          v-if="isAbsoluteLink"
          :href="eventPath"
          target="_blank"
          class="text-sm font-bold leading-none md:text-xl"
        >
          {{ eventTitle }}
        </a>
        <nuxt-link
          v-else
          :to="eventPath"
          class="text-xs font-bold leading-none md:text-xl"
        >
          {{ eventTitle }}
        </nuxt-link>

        <p
          v-if="eventValid"
          class="hidden md:line-clamp-1 md:text-lg lg:line-clamp-none"
        >
          {{ formattedDateRange }}, {{ formattedLocation }}
        </p>
        <p v-else class="hidden md:block md:text-lg">
          Sign up to our newsletter to be notified as soon as the next event is
          announced
        </p>
      </div>

      <div class="hidden space-x-6 md:flex">
        <CommonButton
          v-if="eventValid"
          variant="tertiary-dark"
          :link="eventPath"
          data-testid="read-more"
        >
          Learn more
        </CommonButton>
        <CommonButton
          v-else
          variant="tertiary-dark"
          data-testid="read-more"
          @click="$modal.open('newsletter')"
        >
          Newsletter sign up
        </CommonButton>
      </div>
    </div>
  </div>
</template>

<script>
import BenchmarkEventsLogo from '~/assets/icons/benchmark-events-logo.svg'
import CommonButton from '~/components/common/Button.vue'
import { formatDateRange } from '@/utils/date'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'

export default {
  components: { CommonButton, BenchmarkEventsLogo },
  mixins: [ScreenSizeMixin],
  props: {
    event: {
      type: Object,
      default: () => null,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    formattedDateRange() {
      if (this.eventValid) {
        return formatDateRange(
          this.event.startDateTimeUTC,
          this.event.endDateTimeUTC,
        )
      }
      return ''
    },
    formattedLocation() {
      return this.eventValid && this.event?.location
        ? `${this.event?.location}`
        : ''
    },
    eventPath() {
      return this.eventValid ? this.event.url : '/events'
    },
    eventImage() {
      if (!this.eventValid)
        return 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_800,h_300,c_fill/v1678804229/assets/home/VideoBannerHome_npgzv9.jpg'

      return this.$cloudinary.resize(
        this.event.backgroundImage.sourceUrl,
        'hero-image',
      )
    },
    eventTitle() {
      return this.eventValid
        ? this.event.title
        : 'There are no upcoming events at the moment'
    },
    containerTitle() {
      return this.eventValid ? 'Upcoming Event' : 'Upcoming Events'
    },
    eventValid() {
      return this.event?.title && this.event?.url
    },
    backgroundImageGradient() {
      return {
        background: '#284AA8',
      }
    },
    isAbsoluteLink() {
      if (!this.eventPath) return undefined
      return (
        this.eventPath.startsWith('https') || this.eventPath.startsWith('http')
      )
    },
  },
  methods: {
    handlerClickMobile() {
      if (this.isMobile()) {
        if (this.isAbsoluteLink) {
          window.open(this.eventPath, '_blank')
        } else {
          this.$router.push(this.eventPath)
        }
      }
    },
  },
}
</script>
