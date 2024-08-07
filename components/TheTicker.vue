<template>
  <div class="bg-s-900 relative text-xs text-white">
    <div
      class="max-w-content-container relative mx-auto flex h-9 items-center justify-between gap-2 px-5 py-2"
    >
      <!-- Left -->
      <div
        class="relative flex h-5 min-w-0 grow transition-opacity"
        :class="loading ? 'opacity-0' : 'opacity-100'"
      >
        <button
          class="flex w-5 items-center justify-center"
          @click="moveToRight"
        >
          <IconLeftAngle />
        </button>
        <div
          id="ticker-container"
          class="relative flex grow overflow-hidden scroll-smooth pr-16 font-semibold"
          @mouseover="pauseWithHover"
          @mouseleave="debounceResumeAnimation.debounce(resumeAnimation, 1000)"
        >
          <div
            class="indexes-container absolute flex h-5 items-center gap-8 pr-8"
          >
            <TickerIndex
              v-for="index in indexes"
              :key="index.name"
              identifier="0"
              :name="index.name"
              :percentage-change="index.values.percentageChange"
              :today="index.values.today"
              :has-access="index.values.hasAccess"
              :url="index.values.url"
              :membership="index.values.subscription || ''"
              :pause-animation="pauseAnimation"
              :resume-animation="resumeAnimation"
              :debounce-resume-animation="debounceResumeAnimation"
              @mounted="isFirstIndexesContainerMounted = true"
            />
          </div>
          <div
            class="indexes-container absolute flex h-5 items-center gap-8 pr-8"
          >
            <TickerIndex
              v-for="index in indexes"
              :key="index.name"
              identifier="1"
              :name="index.name"
              :percentage-change="index.values.percentageChange"
              :today="index.values.today"
              :has-access="index.values.hasAccess"
              :url="index.values.url"
              :membership="index.values.subscription || ''"
              :pause-animation="pauseAnimation"
              :resume-animation="resumeAnimation"
              :debounce-resume-animation="debounceResumeAnimation"
              @mounted="isSecondIndexesContainerMounted = true"
            />
          </div>
        </div>

        <button
          class="flex w-5 items-center justify-center"
          @click="moveToLeft"
        >
          <IconRightAngle />
        </button>
      </div>

      <!-- Right -->
      <div class="my-px ml-8 flex min-w-[300px] items-center lg:ml-14">
        <NuxtLink
          to="/lithium-ion-battery-raw-material-index"
          class="flex items-center gap-2"
        >
          <IconCurves class="h-3 w-3 xl:h-4 xl:w-4" />
          <span class="text-sm"> Lithium ion Battery Raw Material Index </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import debounce from 'lodash/debounce'
import ClientDebounce from '@/utils/client-debounce'
import IconLeftAngle from '@/assets/icons/angle-left.svg'
import IconRightAngle from '@/assets/icons/RightAngle.svg'
import IconCurves from '@/assets/icons/Curves.svg'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import TickerIndex from '~/components/TickerIndex.vue'

export default {
  components: {
    IconLeftAngle,
    IconRightAngle,
    IconCurves,
    TickerIndex,
  },

  mixins: [AuthenticationMixin],

  data() {
    return {
      loading: true,
      isFirstIndexesContainerMounted: false,
      isSecondIndexesContainerMounted: false,
      animation: null,
      INTERVAL: 0.1,
      INTERVAL_DURATION: 0.3,
      debounceResumeAnimation: new ClientDebounce(),
      resumeAnimationDelay: debounce(this.resumeAnimation, 1000),
    }
  },

  computed: {
    indexes() {
      return this.$store.state.indexes.indexesStates
    },

    isTickerContainerMounted() {
      return (
        this.isFirstIndexesContainerMounted &&
        this.isSecondIndexesContainerMounted
      )
    },
  },

  watch: {
    isTickerContainerMounted(newVal, oldVal) {
      if (newVal && !oldVal) {
        debounce(this.startAnimation, 1000)()
      }
    },

    authenticationChanged() {
      this.getTickerIndexes()
    },
  },

  methods: {
    startAnimation() {
      const SPEED = 0.03
      const INDEXES_CONTAINER_CLASS = '.indexes-container'
      const indexesContainer = document.querySelectorAll(
        INDEXES_CONTAINER_CLASS,
      )
      const { scrollWidth } = indexesContainer[0]
      const totalWidth = scrollWidth
      const duration = Math.abs(scrollWidth * SPEED)
      gsap.set(INDEXES_CONTAINER_CLASS, {
        x: (i) => i * scrollWidth,
      })
      this.animation = gsap.to(INDEXES_CONTAINER_CLASS, {
        delay: 2,
        duration,
        ease: 'none',
        x: `-=${totalWidth}`,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
        repeat: -1,
      })
      this.loading = false
    },

    moveToLeft() {
      this.pauseAnimation()
      gsap.to(this.animation, {
        duration: this.INTERVAL_DURATION,
        progress: `+=${this.INTERVAL}`,
      })
      this.resumeAnimationDelay()
    },

    moveToRight() {
      this.pauseAnimation()
      const currentProgress = this.animation?.progress()

      if (currentProgress - this.INTERVAL < 0) {
        /* this code is to avoid a weird animation
         * basically when the user click on the left arrow faster
         * This animation works by dividing the duration
         * according to the progress or position until it reaches 0.
         *
         * E.g. it takes 3s to animate 300px.
         * So, to animate 200px we need to calculate that duration
         * by dividing that width by the total duration of the animation
         * in this example, 3 seconds.
         */
        const durationToZero = currentProgress / this.INTERVAL_DURATION
        const remainingDuration = this.INTERVAL_DURATION - durationToZero
        const remainingProgress = this.INTERVAL - currentProgress

        gsap
          .timeline()
          .to(this.animation, {
            duration: durationToZero,
            progress: '0',
          })
          .to(this.animation, {
            duration: 0,
            progress: '1',
          })
          .to(this.animation, {
            duration: remainingDuration,
            progress: `${1 - remainingProgress}`,
          })
      } else {
        gsap.to(this.animation, {
          duration: this.INTERVAL_DURATION,
          progress: `-=${this.INTERVAL}`,
        })
      }
      this.resumeAnimationDelay()
    },

    pauseAnimation() {
      this.animation?.pause()
    },

    pauseWithHover() {
      this.pauseAnimation()
      this.debounceResumeAnimation.clear()
    },

    resumeAnimation() {
      this.animation?.resume()
    },

    async getTickerIndexes() {
      try {
        this.$store.commit(
          'indexes/setIndexesStates',
          await this.$restClient.getTickerIndexes(),
        )
      } catch (e) {}

      this.$nextTick(this.setCanScroll)
    },
  },
}
</script>
