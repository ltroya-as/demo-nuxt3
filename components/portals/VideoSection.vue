<template>
  <div class="w-full" data-testid="videos-section">
    <div
      v-if="loading"
      class="flex h-[444px] w-full items-center justify-center"
    >
      <TheLoader />
    </div>
    <div v-if="!loading && featuredVideo" class="w-full">
      <SectionTitle title="Videos" :url="viewMoreUrl" />

      <div v-if="!loading" class="mb-2.5 overflow-x-hidden">
        <div v-if="featuredVideo" class="relative flex gap-x-2">
          <HeroVideoCard
            v-if="featuredVideo"
            class="hidden min-h-[319px] xl:flex"
            :index="0"
            :slug="featuredVideo.slug"
            :title="featuredVideo.title"
            :excerpt="featuredVideo.excerpt"
            :duration="featuredVideo.duration"
            :published-date="featuredVideo.publishedDate"
            :cover-url="featuredVideo.coverUrl"
            :is-authorized="!!featuredVideo.vimeoId"
            :preview-vimeo-id="featuredVideo.previewVimeoId"
            @play="handleVideoClick(featuredVideo)"
          />
          <Swiper
            class="video-card-swiper"
            data-testid="swiper-videos"
            :modules="modules"
            width="901"
            :slides-per-view="3"
            :space-between="8"
            :speed="500"
            :autoplay="{
              delay: 9500,
              disableOnInteraction: false,
            }"
            loop
            @slide-change="slideChange"
            @swiper="onSwiper"
          >
            <SwiperSlide
              v-for="(video, i) in videos"
              :data-testid="`video-swiper-slide-${i}`"
              :key="video?.id"
            >
              <VideoCard
                v-if="video"
                :index="i"
                :slug="video.slug"
                :title="video.title"
                :excerpt="video.excerpt"
                :duration="video.duration"
                :published-date="video.publishedDate"
                :cover-url="video.coverUrl"
                :is-active-index="activeIndex === i"
                :vimeo-id="video.vimeoId"
                :preview-vimeo-id="video.previewVimeoId"
                @play="handleVideoClick(video)"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div class="text-p-500 md:pl-6">
        <button
          class="hover:border-s-400 rounded-full border-2 border-white bg-white p-1.5 shadow-md transition-all"
          data-testid="swiper-prev-button"
          @click="next"
        >
          <IconChevronLeft class="h-4 w-4" />
        </button>
        <button
          class="hover:border-s-400 rounded-full border-2 border-white bg-white p-1.5 shadow-md transition-all"
          data-testid="swiper-next-button"
          @click="previous"
        >
          <IconChevronLeft class="h-4 w-4 rotate-180" />
        </button>
      </div>
    </div>
    <VideoModal
      v-if="vimeoVideo && $store.state.modal.videoIntroOpen"
      :vimeo-source="vimeoSource"
      :video-ratio="videoRatio"
      :is-preview="isPreview"
    />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import HeroVideoCard from '~/components/portals/HeroVideoCard.vue'
import VideoCard from '~/components/portals/VideoCard.vue'
import VideoModal from '~/components/video/VideoModal.vue'
import SectionTitle from '~/components/portals/SectionTitle.vue'
import IconChevronLeft from '~/assets/icons/chevron-left.svg'
import GetVimeoDataMixin from '~/mixins/GetVimeoDataMixin'

import { MARKET } from '~/constants/services/constants'
import { getServices } from '~/constants/services'

import 'swiper/css'
import 'swiper/css/autoplay'

export default {
  components: {
    IconChevronLeft,
    HeroVideoCard,
    VideoCard,
    VideoModal,
    SectionTitle,
    Swiper,
    SwiperSlide,
  },
  mixins: [GetVimeoDataMixin],
  props: {
    productSlug: {
      type: String,
      required: true,
    },
    categoriesVideos: {
      type: [Array, null],
      default: null,
    },
  },
  data() {
    return {
      swiper: null,
      modules: [Autoplay],
      videos: [],
      activeIndex: 0,
      loading: true,
    }
  },
  computed: {
    featuredVideo() {
      if (this.videos.length === 0) return null
      if (this.activeIndex === 0) return this.videos[this.videos.length - 1]
      return this.videos[this.activeIndex - 1]
    },
    viewMoreUrl() {
      return `/${MARKET.slug}/${this.productSlug}/market-Insights`
    },
    categories() {
      return this.categoriesVideos ?? [this.productSlug]
    },
  },
  async mounted() {
    const allVideos = await this.$graphqlClient.getVideos(this.categories)

    if (allVideos.length === 0) {
      this.loading = false
      return
    }

    const featuredVideo = allVideos.shift()
    allVideos.push(featuredVideo)
    this.videos = allVideos
    this.loading = false
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
    },
    slideChange(swiper) {
      this.activeIndex = swiper.realIndex
    },
    async handleVideoClick(vimeoData) {
      const vimeoId = vimeoData.vimeoId || vimeoData.previewVimeoId
      const isPreview = !vimeoData.vimeoId && !!vimeoData.previewVimeoId
      const service = [this.productSlug, 'source']

      const initialValues = getServices([...service])
      this.$store.commit('modal/setInitialFields', initialValues)

      if (!vimeoId) {
        return this.$modal.open('contact')
      }
      await this.getVimeoData(vimeoId)
      this.isPreview = isPreview
      this.handlerPlay()
    },
    next() {
      this.swiper.slidePrev()
    },
    previous() {
      this.swiper.slideNext()
    },
  },
}
</script>
