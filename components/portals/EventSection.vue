<template>
  <div data-testid="events-section" class="w-full">
    <div
      v-if="loading"
      class="flex h-[444px] w-full items-center justify-center"
    >
      <TheLoader />
    </div>
    <div v-show="!loading" class="w-full">
      <SectionTitle title="Events" url="/events" />

      <div v-if="!loading" class="mb-2.5 overflow-x-hidden">
        <div class="relative hidden h-[600px] gap-x-3 xl:flex">
          <NavigationLink
            v-if="isEventValid"
            :url="eventUrl"
            :type="navigationTypeElement"
            data-testid="hero-event-card"
          >
            <div class="relative h-full rounded-lg bg-black">
              <EventsTag :type="eventType" class="left-6 top-6" />
              <div
                class="background-card absolute top-[120px] flex w-fit flex-col pl-7"
              >
                <span
                  data-testid="event-date"
                  class="mb-1.5 text-xs font-semibold text-white"
                >
                  {{ eventDate }}
                </span>
                <h4 class="relative mb-3.5 line-clamp-3 flex flex-col">
                  <span
                    class="pb-2 text-3xl font-bold capitalize text-white"
                    data-testid="event-title"
                  >
                    {{ eventTitle }}
                  </span>
                  <div class="bg-p-500 h-1 w-[60px]"></div>
                </h4>
                <CommonLocation :location="eventLocation" class="text-white" />
              </div>
              <img
                data-testid="event-image"
                :src="eventImage"
                class="h-full w-full rounded-lg object-cover"
                :alt="eventTitle"
              />
            </div>
          </NavigationLink>
          <div
            v-if="showSidePanel"
            data-testid="events-side-panel"
            class="flex min-w-[350px] flex-col gap-2.5 overflow-y-auto pr-3"
          >
            <EventsCard
              v-for="eventMore in events"
              :key="eventMore.id"
              :event="eventMore"
            />
          </div>
        </div>
        <div class="flex flex-col gap-6 xl:hidden">
          <div class="relative flex h-[268px] gap-x-2">
            <Swiper
              ref="swiperEl"
              data-testid="swiper-events"
              class="h-[268px] w-full"
              :slides-per-view="slidesPerView"
              :slides-per-group="slidesPerView"
              :space-between="12"
              :speed="500"
              loop
              @swiper="onSwiper"
            >
              <SwiperSlide
                v-for="(eventSlider, i) in incomingEvents"
                :key="eventSlider.id"
                :data-testid="`swiper-slide-${i}`"
              >
                <EventsCard :event="eventSlider" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div class="text-p-500 flex gap-8">
            <button data-testid="swiper-prev-button" @click="previous">
              <IconChevronLeft class="h-4 w-4" />
            </button>
            <button data-testid="swiper-next-button" @click="next">
              <IconChevronLeft class="h-4 w-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SwiperSlide, Swiper } from 'swiper/vue'
import SectionTitle from '~/components/portals/SectionTitle.vue'

import { processEvents, getUpcomingEvents } from '@/utils/events'
import ValidatedEvent from '~/mixins/ValidatedEvent'
import NavigationLink from '~/components/shared/navigation/Link.vue'
import CommonLocation from '~/components/shared/common/Location.vue'
import EventsTag from '~/components/shared/events/Tag.vue'
import EventsCard from '~/components/shared/events/Card.vue'
import IconChevronLeft from '~/assets/icons/chevron-left.svg'

export default {
  components: {
    SectionTitle,
    CommonLocation,
    EventsTag,
    NavigationLink,
    EventsCard,
    SwiperSlide,
    Swiper,
    IconChevronLeft,
  },
  mixins: [ValidatedEvent],
  data() {
    return {
      swiper: null,
      incomingEvents: [],
      events: [],
      event: {},
      loading: true,
      slidesPerView: 2,
      isEventDetail: true,
    }
  },
  computed: {
    isEventValid() {
      return this.eventDate && this.eventTitle && this.eventImage
    },
    navigationTypeElement() {
      if (this.eventType !== 'Online') {
        return 'a'
      }
      return 'nuxt-link'
    },
    showSidePanel() {
      return this.incomingEvents.length > 2
    },
  },

  async mounted() {
    this.loading = true
    const eventsResponse = await this.$graphqlClient.getEvents()

    const eventsRaw = eventsResponse.data.events.nodes.map((event) => event)
    const events = processEvents(eventsRaw)
    this.incomingEvents = getUpcomingEvents(events).slice(0, 10)
    this.event = this.incomingEvents[0]
    this.events = this.incomingEvents.slice(1, 10)
    this.initializeBreakpoints()
    this.loading = false
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
    },
    previous() {
      this.swiper.slidePrev()
    },
    next() {
      this.swiper.slideNext()
    },
    initializeBreakpoints() {
      const mqlMobile = window.matchMedia('(max-width: 620px)')

      this.slidesPerView = 2
      if (mqlMobile.matches) {
        this.slidesPerView = 1
      }
      mqlMobile.onchange = (e) => {
        if (e.matches) {
          this.slidesPerView = 1
        } else {
          this.slidesPerView = 2
        }
      }
    },
  },
}
</script>
