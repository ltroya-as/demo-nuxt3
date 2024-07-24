<template>
  <div
    ref="carousel"
    data-testid="hero-article"
    class="relative flex aspect-video w-full flex-1 items-center justify-between overflow-hidden md:w-[49vw] lg:h-full lg:w-72 lg:min-w-full"
    :style="$attrs.style"
    :class="$attrs.class"
    @mouseover="carouselRemove"
    @mouseleave="carouselReset"
  >
    <div
      class="z-20 hidden h-full w-[21px] items-center justify-center md:flex lg:w-[29px]"
    >
      <IconChevronLeft
        class="text-p-500 absolute left-1 w-2 cursor-pointer lg:left-2 lg:w-3"
        @click="backArticle"
      />
    </div>
    <div class="absolute flex h-full w-full flex-col">
      <div v-if="type === 'capex-tracker'">
        <CarouselCapexTracker
          v-for="(capex, index) of items"
          :key="capex.id"
          :material="capex.mineral"
          :value="capex.value"
          :image-url="capex.imageUrl"
          :index-maximum="carouselIndexMaximum()"
          :carousel-index="carouselIndex"
          :article-index="index"
        />
      </div>
      <div v-else>
        <CarouselSlice
          v-for="(article, index) of items"
          :key="article.id"
          :article="article"
          :index-maximum="carouselIndexMaximum()"
          :carousel-index="carouselIndex"
          :article-index="index"
        />
      </div>
      <CarouselPoints
        class="z-20"
        :items="itemStates"
        @go-to-index="goToArticle"
      />
    </div>
    <div
      class="z-20 hidden h-full w-[21px] items-center justify-center md:flex lg:w-[29px]"
    >
      <IconChevronRight
        class="absolute right-1 w-2 cursor-pointer lg:right-2 lg:w-3"
        @click="nextArticle"
      />
    </div>
  </div>
</template>
<script>
import CarouselSlice from '~/components/carousel/Slice.vue'
import CarouselCapexTracker from '~/components/carousel/CapexTracker.vue'
import CarouselPoints from '~/components/carousel/Points.vue'
import IconChevronLeft from '~/assets/icons/chevron-left.svg'
import IconChevronRight from '~/assets/icons/chevron-right.svg'

export default {
  components: {
    IconChevronLeft,
    IconChevronRight,
    CarouselPoints,
    CarouselSlice,
    CarouselCapexTracker,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      carouselIndex: 0,
      carouselTimer: 3000,
      carouselInterval: null,
      carouselTouchX: 0,
    }
  },
  computed: {
    itemStates() {
      return this.items?.map((_article) => {
        return {
          id: _article.id,
          active: _article.id === this.articleActive.id,
        }
      })
    },
    articleActive() {
      return this.items[this.carouselIndex] || { id: this.carouselIndex }
    },
  },
  mounted() {
    try {
      this.$refs.carousel?.addEventListener(
        'touchstart',
        this.touchInitialize,
        false,
      )
      this.$refs.carousel?.addEventListener('touchend', this.touchEnd, false)
    } catch (_e) {
    } finally {
      this.carouselInitialize()
    }
  },
  unmounted() {
    this.carouselRemove()
  },
  methods: {
    touchInitialize(_event) {
      this.carouselTouchX = _event.touches[0].clientX ?? 0
    },
    touchEnd(_event) {
      const clientX = _event.changedTouches[0].clientX
      if (clientX > this.carouselTouchX) {
        this.backArticle()
      }
      if (clientX < this.carouselTouchX) {
        this.nextArticle()
      }
    },
    carouselInitialize() {
      this.carouselInterval = null
      this.carouselInterval = setInterval(
        () => this.nextArticle(),
        this.carouselTimer,
      )
    },
    carouselIndexMaximum() {
      return this.items.length - 1 || 0
    },
    carouselRemove() {
      clearInterval(this.carouselInterval)
    },
    carouselReset() {
      this.carouselRemove()
      this.carouselInitialize()
    },
    backArticle() {
      const backIndex = this.carouselIndex - 1
      if (backIndex < 0) {
        this.carouselIndex = this.carouselIndexMaximum()
      } else {
        this.carouselIndex = backIndex
      }
    },
    goToArticle(index) {
      this.carouselIndex = index
    },
    nextArticle() {
      const nextIndex = this.carouselIndex + 1
      if (nextIndex > this.carouselIndexMaximum()) {
        this.carouselIndex = 0
      } else {
        this.carouselIndex = nextIndex
      }
    },
  },
}
</script>
