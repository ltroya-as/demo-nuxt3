<template>
  <div
    :data-url="url"
    class="mb-16 cursor-pointer md:mb-6"
    @click="toggleWebinars"
  >
    <div
      ref="event"
      class="bg-s-100 hover:bg-p-50 rounded-2xl p-4 hover:shadow-lg lg:p-6 xl:p-11"
    >
      <!-- Event Card -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-center">
        <!-- image -->
        <div
          class="mb-6 h-full max-h-[350px] min-h-[250px] w-full min-w-[100%] max-w-full rounded-2xl bg-cover bg-center md:mb-0 md:max-h-[170px] md:min-h-[120px] md:min-w-[28%] md:max-w-[31%] lg:min-w-[22%] lg:max-w-[24%] xl:max-h-[220px] xl:min-h-[160px]"
          :style="{ backgroundImage: `url(${eventThumbnail})` }"
        ></div>
        <!-- event title and date -->
        <div
          class="mb-8 ml-0 w-full md:mb-0 md:ml-4 md:w-5/12 lg:ml-8 xl:ml-12"
        >
          <div class="text-md font-bold md:text-lg lg:text-xl xl:text-2xl">{{
            title
          }}</div>
          <div class="text-surface-em-high text-sm lg:text-lg">
            {{ formattedDateRange }}
          </div>
        </div>
        <div class="flex w-full items-center justify-end md:w-5/12">
          <!-- View More / In Person -->
          <div class="flex w-1/2 items-center justify-start md:justify-end">
            <!-- event type -->
            <Badge :event-type="eventType" />
          </div>
          <!-- view more btn link-->
          <div class="flex w-1/2 justify-end">
            <div class="text-p-500 flex items-center font-bold">
              <span
                class="mr-1 text-sm md:text-xs lg:text-sm"
                data-testid="more-info-desktop"
              >
                {{ showMoreText }} </span
              ><img
                class="h-3 w-3 md:h-2 md:w-2 lg:h-3 lg:w-3"
                :class="{
                  'rotate-90': showWebinars,
                  transform: showWebinars,
                }"
                src="~assets/icons/icon-arrow_right.svg"
                alt="icon right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Agenda -->
    <div class="w-full bg-white">
      <transition
        name="staggered-fade"
        tag="div"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div v-show="showWebinars" class="border-p-500 relative border px-2">
          <Webinar
            v-for="(webinar, i) in webinars"
            :id="`event-${ident}-webinar-${i}`"
            :key="i"
            :title="webinar.webinarTitle"
            :blurb="webinar.webinarBlurb"
            :url="webinar.webinarUrl"
            :start-date-time="webinar.webinarStartDateTimeUTC"
            :end-date-time="webinar.webinarEndDateTimeUTC"
            :time-zone="webinar.webinarTimeZone"
            :chair="webinar.chair"
            :sessions="webinar.webinarSessions"
            :is-active="isActive"
            class="mb-5 mt-5"
            data-testid="webinars-desktop"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Webinar from '~/components/events/Webinar'
import Badge from '~/components/events/Badge'
import blackBgImage from '~/static/images/black-background.jpg'
import { formatDateRange } from '~/utils/date'

export default {
  name: 'Event',
  components: {
    Badge,
    Webinar,
  },
  props: {
    ident: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    blurb: {
      required: true,
      type: String,
    },
    timeZone: {
      default: 'Europe/London',
      type: String,
    },
    thumbnail: {
      default: () => blackBgImage,
      type: Object,
    },
    url: {
      default: '',
      type: String,
    },
    webinars: {
      default: () => [],
      type: Array,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    eventType: {
      type: String,
      default: '',
    },
    startDateTime: {
      default: undefined,
      validator: (prop) =>
        typeof prop === 'object' && typeof prop.toLocaleString === 'function',
    },
    endDateTime: {
      default: undefined,
      validator: (prop) =>
        typeof prop === 'object' && typeof prop.toLocaleString === 'function',
    },
    showJoinButton: {
      type: Boolean,
      default: true,
    },
    showAgenda: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showWebinars: !this.url && this.showAgenda,
      showWebinarsMobile: false,
    }
  },
  computed: {
    showMoreText() {
      return this.showWebinars ? 'View Less' : 'View More'
    },
    eventThumbnail() {
      return this.thumbnail?.sourceUrl || blackBgImage
    },
    formattedDateRange() {
      return formatDateRange(this.startDateTime, this.endDateTime)
    },
  },
  methods: {
    toggleWebinars() {
      if (this.url) {
        window.open(this.url, '_blank').focus()
      } else {
        this.showWebinars = !this.showWebinars
      }
    },
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el) {
      this.$velocity(
        el,
        { opacity: 1, height: '100%' },
        {
          complete: () => {
            return this.$velocity(this.$refs.event, 'scroll', {
              offset: 0,
            })
          },
        },
      )
    },
    leave(el, done) {
      this.$velocity(el, { opacity: 0, height: 0 }, { complete: done })
    },
  },
}
</script>
