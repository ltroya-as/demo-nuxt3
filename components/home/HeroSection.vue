<template>
  <div>
    <div data-testid="hero" class="relative h-full overflow-hidden">
      <div
        class="relative mx-auto flex transition-all duration-700"
        :class="{
          'lg:h-[600px]': hasAnnouncement,
          'lg:h-[640px]': !hasAnnouncement,
        }"
      >
        <div id="bgImage" class="relative grow">
          <picture
            class="main-hero object-cover md:max-h-[450px] md:min-h-[450px] lg:max-h-full lg:min-h-full"
          >
            <source media="(max-width:1024px)" :srcset="image.mobile" />
            <source media="(min-width:1025px)" :srcset="image.desktop" />
            <img
              :src="image.default"
              class="main-hero h-full w-full object-cover md:max-h-[450px] md:min-h-[450px] lg:max-h-full lg:min-h-full lg:opacity-100"
              alt="subscriptions"
            />
          </picture>

          <div
            class="max-w-content-container absolute bottom-0 left-0 right-0 top-0 mx-auto"
          >
            <div class="h-full w-full">
              <div
                class="main-hero-container lg:px-big 5xl:max-w-[1000px] 5xl:pr-0 flex h-full w-full flex-col justify-end text-white md:max-w-[860px] md:px-8 md:pt-0 lg:pb-20 2xl:pl-0"
              >
                <h2 class="hero-title">Enabling the Energy Transition</h2>
                <small class="hero-description">
                  Benchmark’s prices and data empowers clients: from critical
                  mineral contracts to EV battery supply chain investments and
                  government policy
                </small>

                <div class="mt-6 hidden space-x-6 md:mb-12 md:flex lg:mb-0">
                  <CommonButton
                    variant="primary"
                    @click="$modal.open('contact')"
                  >
                    Contact Us
                  </CommonButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NuxtLink
        :to="`/announcements/${announcementSlug}`"
        data-testid="announcement-bar"
      >
        <div
          class="bg-s-900 w-full transition-all duration-700"
          :class="{
            'border-p-500 h-10 border-t-2 pb-[10px] pt-2': hasAnnouncement,
            'h-0 p-0': !hasAnnouncement,
          }"
        >
          <div
            class="md:max-w-content-container mx-auto flex w-full px-[18px] transition-all duration-1000 md:px-4 lg:px-14 2xl:px-0"
            :class="{
              'opacity-1': hasAnnouncement,
              'opacity-0': !hasAnnouncement,
            }"
          >
            <div
              v-if="!isAnnouncementLoading"
              id="announcements-border"
              class="bg-p-500 mr-[6px] w-[2px] transition-all duration-1000"
              :class="{
                block: hasAnnouncement,
                hidden: !hasAnnouncement,
              }"
            ></div>
            <div
              id="announcements-container"
              class="relative h-5 w-full overflow-hidden pl-[6px] text-white transition-all duration-1000"
              :class="{
                block: hasAnnouncement,
                hidden: !hasAnnouncement,
              }"
            >
              <span class="absolute whitespace-nowrap font-semibold">
                {{ announcementText }}
              </span>
              <div
                v-if="!isAnnouncementLoading && isAnimationRunning"
                class="absolute -right-px hidden h-full w-16 md:block"
                style="background: linear-gradient(to left, #25262b, #0000)"
              ></div>
            </div>
          </div>
        </div>
      </NuxtLink>

      <div
        class="md:max-w-content-container mx-auto grid h-full w-full md:mt-6 md:grid-cols-2 md:gap-4 md:px-4 lg:px-14 xl:grid-cols-3 2xl:px-0"
      >
        <div :class="cardDefaultClasses">
          <transition name="swipe">
            <CarouselDefault v-if="loading" type="event" />
          </transition>

          <HomeHeroEvent v-if="!loading" :event="event" :loading="true" />
        </div>

        <div :class="cardDefaultClasses">
          <transition name="swipe">
            <CarouselDefault v-if="loading" type="source" />
          </transition>

          <CarouselHero v-if="!loading" :items="articles" />
        </div>

        <div :class="cardDefaultClasses" class="md:col-span-2 xl:col-span-1">
          <transition name="swipe">
            <CarouselDefault v-if="loading" type="capex" />
          </transition>

          <CarouselHero
            v-if="!loading"
            :items="capexTrackerData"
            type="capex-tracker"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { logError } from '~/utils/log-error'
import latestAnnouncement from '~/queries/latest-announcement.gql'
import CommonButton from '~/components/common/Button.vue'
import HomeHeroEvent from '~/components/home/HeroEvent.vue'
import CarouselHero from '~/components/carousel/Hero.vue'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'
import CarouselDefault from '~/components/home/CarouselDefault.vue'
import ViewHeightMobile from '~/mixins/ViewHeightMobile.js'
import { capexTrackerData } from '~/constants/capex-tracker-data'

export default {
  components: { CarouselDefault, CommonButton, HomeHeroEvent, CarouselHero },
  mixins: [ScreenSizeMixin, ViewHeightMobile],
  props: {
    event: {
      type: Object,
      default: () => null,
    },
    articles: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showTitle: false,
      isImageLoaded: false,
      isAnnouncementLoading: true,
      announcementText: '',
      hasAnnouncement: false,
      announcementSlug: '',
      isAnimationRunning: false,
      image: {
        desktop:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_3000,f_auto/v1685978797/assets/home/HomeHeroSuperWide_lxyvhm.png?_i=AA',
        mobile:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1200,f_auto/v1680716978/assets/home/battery-home-hero_trcfsl.jpg?_i=AA',
        default:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1200,f_auto/v1680716978/assets/home/battery-home-hero_trcfsl.jpg?_i=AA',
      },
      cardDefaultClasses:
        'hero-event bg-s-300 min-h-36 h-36 relative flex md:h-[290px] w-full overflow-hidden md:rounded-xl lg:w-full',
      capexTrackerData,
    }
  },

  async mounted() {
    try {
      const { data } = await this.$bmAuth.getPublicGraphqlClient().query({
        query: latestAnnouncement,
      })

      this.handleAnnouncementData(data)
    } catch (error) {
      logError(error)
    } finally {
      this.isAnnouncementLoading = false

      this.$nextTick(() => {
        this.startAnnouncementAnimation()
      })
    }
  },

  methods: {
    startAnnouncementAnimation() {
      const speed = 0.0175
      const border = document.querySelector('#announcements-border')
      const container = document.querySelector('#announcements-container')
      const span = container.querySelector('span')
      const { clientWidth } = span
      if (clientWidth < container.clientWidth) {
        return
      }
      const distanceToScroll = clientWidth - container.clientWidth * 0.9
      const duration = Math.abs(distanceToScroll * speed)
      const tl = gsap.timeline({ repeat: -1 })
      let delayWhenStop = 5
      if (window.innerWidth < 720) {
        delayWhenStop = 2
      }
      tl.to(span, {
        duration,
        x: -distanceToScroll,
        ease: 'none',
        delay: 2,
      })
        .to(span, {
          duration: 0.5,
          y: -40,
          delay: delayWhenStop,
        })
        .to(span, {
          duration: 0,
          x: 0,
          y: -40,
          opacity: 0,
        })
        .to(border, {
          duration: 0.3,
          rotate: 180,
        })
        .to(span, {
          duration: 0.5,
          y: 0,
        })
        .to(
          span,
          {
            duration: 0.3,
            opacity: 1,
          },
          '-=0.2',
        )
      this.isAnimationRunning = true
    },

    handleAnnouncementData(data) {
      const isValidData = this.isValidAnnouncementData(data)

      if (isValidData) {
        const announcement = data.announcements.nodes[0]
        const hasValidTitle = announcement.title.trim() !== ''

        if (hasValidTitle) {
          this.hasAnnouncement = true
          this.announcementText = `${announcement.title}`
          // this.announcementSlug = announcement.slug
        } else {
          this.adjustMainHeroHeight()
        }
      } else {
        this.adjustMainHeroHeight()
      }
    },

    isValidAnnouncementData(data) {
      const { announcements } = data || {}
      const { nodes } = announcements || {}
      return Array.isArray(nodes) && nodes.length > 0
    },

    adjustMainHeroHeight() {
      const windowWidth = window.innerWidth
      const mainHero = document.querySelectorAll('.main-hero')

      const getHeight = (offset) =>
        `calc(calc(var(--vh, 1vh) * 100) - ${offset}px)`

      mainHero.forEach((element) => {
        if (windowWidth < 430) {
          element.style.height = getHeight(295)
          element.style.transition = 'height 700ms cubic-bezier(0.4, 0, 0.2, 1)'
        } else if (windowWidth >= 430 && windowWidth < 768) {
          element.style.height = getHeight(345)
          element.style.transition = 'height 700ms cubic-bezier(0.4, 0, 0.2, 1)'
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.hero-title {
  @apply w-[90%] font-bold sm:text-4xl sm:leading-[3.75rem] md:w-full lg:text-5xl lg:leading-tight;
}

.hero-description {
  @apply 5xl:text-2xl block lg:mt-4 lg:text-base lg:leading-5;
}

@media (max-width: 400px) {
  .hero-description {
    @apply text-base leading-5;
  }
}

@media (min-width: 300px) and (max-width: 429px) {
  .main-hero {
    display: block;
    height: calc(calc(var(--vh, 1vh) * 100) - 335px);
  }

  .hero-event {
    height: 125px;
    min-height: 125px;
  }

  .main-hero-container {
    padding: 0 18px 24px 18px;
  }

  .hero-title {
    @apply text-4xl font-bold;
  }

  .hero-description {
    @apply mt-3 text-base font-semibold;
  }
}

@media (min-width: 430px) and (max-width: 767px) {
  .main-hero {
    display: block;
    height: calc(calc(var(--vh, 1vh) * 100) - 385px);
  }

  .hero-event {
    height: 150px;
    min-height: 150px;
  }

  .main-hero-container {
    @apply px-7 pb-10 pt-0;
  }

  .hero-title {
    @apply text-5xl font-bold;
  }

  .hero-description {
    @apply mt-5 text-lg font-semibold;
  }
}
</style>
