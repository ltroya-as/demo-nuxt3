<template>
  <div
    class="hero-carrousel-default absolute inset-0 z-10 aspect-video h-full w-full md:aspect-auto"
  >
    <div v-show="loadingImage" class="5xl:block hidden h-full w-full">
      <div class="animate-pulse">
        <div class="bg-grey-400 h-[290px]"></div>
      </div>
    </div>

    <div
      class="h-full w-full"
      :class="{
        'bg-p-900': type === 'source' && !loadingImage,
        'bg-black': type === 'capex' && !loadingImage,
      }"
    >
      <img
        v-show="!loadingImage"
        class="h-full w-full object-cover md:h-auto md:min-h-full lg:h-full lg:w-full"
        :class="{
          'mix-blend-multiply': type === 'source',
          'object-center': type === 'capex',
        }"
        :src="fallbackImage"
        alt="carousel-default"
        @load="isLoadImage"
      />
      <div v-if="!loadingImage">
        <component
          :is="logo"
          class="absolute left-1/2 top-1/2 min-w-[250px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BenchmarkSourceLogo from '~/assets/icons/benchmark-source-logo-white.svg'
import BenchmarkEventsLogo from '~/assets/icons/benchmark-events-logo.svg'
import BenchmarkDataLogo from '~/assets/icons/benchmark-data-logo.svg'

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loadingImage: true,
    }
  },

  computed: {
    isEvent() {
      return this.type === 'event'
    },
    logo() {
      if (this.isEvent) return BenchmarkEventsLogo
      else if (this.type === 'source') return BenchmarkSourceLogo
      return BenchmarkDataLogo
    },
    fallbackImage() {
      if (this.isEvent)
        return 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_800,h_300,c_fill/v1678804229/assets/home/VideoBannerHome_npgzv9.jpg'
      else if (this.type === 'source')
        return 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_800,h_300,c_fill/v1679070029/assets/home/BenchmarSourceCarousel_amduwd.jpg'
      return 'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,h_300,c_fill/v1693929506/assets/home/capex_tracker_fallback_ashdmda2.png'
    },
  },

  methods: {
    isLoadImage() {
      this.loadingImage = false
    },
  },
}
</script>
<style scoped>
@media (width <= 430px) {
  .hero-carrousel-default {
    height: 125px;
    min-height: 125px;
  }
}

@media (width <= 768px) {
  .hero-carrousel-default {
    height: 150px;
    min-height: 150px;
  }
}
</style>
