<template>
  <div
    class="mx-auto flex h-full w-full max-w-[408px] flex-col overflow-hidden rounded-xl md:max-w-full md:flex-row"
  >
    <div
      class="bg-s-900 flex w-full flex-col gap-3 p-3 font-semibold text-white md:p-8 lg:max-w-[60%] xl:px-12 xl:py-8"
    >
      <div
        class="border-p-500 w-fit border-b-4 pb-2 text-xs font-semibold capitalize md:text-4xl"
      >
        {{ title }}
      </div>
      <span class="text-xs font-medium md:text-base">
        <slot name="description"></slot>
      </span>
      <div class="mt-3 flex gap-6">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="relative w-full overflow-hidden text-white">
      <div
        class="absolute left-0 top-0 z-10 h-full w-full cursor-pointer"
        :style="backgroundOverlay"
        @click="handlerPlay"
      >
        <IconPlay class="icon-play" />
      </div>
      <div class="relative z-0 h-full w-full">
        <img
          v-if="videoCover"
          :src="videoCover"
          class="flex h-full max-h-full w-full object-cover"
          alt="Report forecasts"
          data-testid="forecasts-video-intro-card-image"
        />
      </div>
    </div>
    <VideoModal
      v-if="vimeoVideo && $store.state.modal.videoIntroOpen"
      :vimeo-source="vimeoSource"
      :video-ratio="videoRatio"
    />
  </div>
</template>
<script>
import IconPlay from '~/assets/icons/icon-play.svg'
import VideoModal from '~/components/video/VideoModal.vue'

export default {
  components: { IconPlay, VideoModal },
  props: {
    vimeoVideo: {
      type: Object,
      default: null,
    },
    vimeoSource: {
      type: String,
      default: null,
    },
    videoCover: {
      type: String,
      default: null,
    },
    videoRatio: {
      type: String,
      default: '1920:1080',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      videoDescription:
        'Benchmarks Price Dashboard is a comprehensive data analytics platform, providing proprietary price data from every stage of the battery supply chain. Access Benchmarks entire suite of market leading price indexes through one simple subscription. The tool provides unparalleled insights and data used by global stakeholders to negotiate and settle industry contracts, allowing market participants to make informed decisions in the fast-paced battery industry.',
    }
  },
  computed: {
    backgroundOverlay() {
      return { background: 'rgba(0, 0,0, 70%)' }
    },
  },
  methods: {
    handlerPlay() {
      this.$modal.open('videoIntro')
    },
    getVideoRatio(character = ':') {
      if (this.vimeoVideo) {
        return `${this.vimeoVideo.width}${character}${this.vimeoVideo.height}`
      }
      return `1920${character}1080`
    },
  },
}
</script>
<style scoped>
.icon-play {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: auto;
  min-width: 64px;
  max-width: 64px;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  cursor: pointer;
}

@media (width <= 767px) {
  .icon-play {
    min-width: 40px;
    max-width: 40px;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
  }
}
</style>
