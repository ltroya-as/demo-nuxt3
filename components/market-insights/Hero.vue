<template>
  <div
    class="relative grid h-full grid-cols-1 grid-rows-2 gap-4 md:h-96 md:grid-cols-2"
  >
    <div v-if="loading" class="absolute inset-0">
      <TheLoader />
    </div>
    <template v-else>
      <CarouselArticle
        v-if="articles.length"
        :market="market"
        :articles="articles"
        class="row-span-2 h-[380px] md:h-full"
      />
      <div class="h-[180px] md:h-full">
        <CarouselVideo
          v-if="videos.length"
          :videos="videos"
          class="h-full"
          @play="handleVideoClick"
        />
      </div>
      <div class="h-[180px] md:h-full">
        <CarouselEvent v-if="events.length" :events="events" class="h-full" />
      </div>
      <VideoModal
        v-if="vimeoVideo && $store.state.modal.videoIntroOpen"
        :vimeo-source="vimeoSource"
        :video-ratio="videoRatio"
        :is-preview="isPreview"
      />
    </template>
  </div>
</template>

<script>
import TheLoader from '~/components/TheLoader.vue'
import CarouselEvent from '~/components/market-insights/CarouselEvent.vue'
import CarouselVideo from '~/components/market-insights/CarouselVideo.vue'
import CarouselArticle from '~/components/market-insights/CarouselArticle.vue'

import { getServices } from '~/constants/services'

export default {
  components: {
    TheLoader,
    CarouselArticle,
    CarouselVideo,
    CarouselEvent,
  },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    market: {
      type: String,
      default: '',
    },
    articles: {
      type: Array,
      default: () => [],
    },
    videos: {
      type: Array,
      default: () => [],
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isPreview: false,
      initialValues: getServices([this.market, 'source']),
    }
  },
  methods: {
    handleVideoClick(vimeoData) {
      this.$store.commit('modal/setInitialFields', this.initialValues)
      this.$emit('play', vimeoData)
    },
  },
}
</script>
