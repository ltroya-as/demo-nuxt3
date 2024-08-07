<template>
  <div
    class="mx-auto flex h-full w-full max-w-[408px] flex-col overflow-hidden rounded-xl md:max-h-[211px] md:min-h-[211px] md:max-w-full md:flex-row"
  >
    <div
      class="bg-s-900 flex w-full flex-col justify-center gap-2 p-4 font-semibold text-white lg:gap-4 lg:px-10 lg:py-0"
    >
      <div class="flex gap-1">
        <div class="bg-p-500 w-full min-w-[4px] max-w-[4px]"></div>
        <h3 class="text-lg font-semibold lg:text-4xl">
          {{ videoTitle }}
        </h3>
      </div>

      <span
        class="text-sm font-semibold md:line-clamp-3 lg:text-base xl:line-clamp-4"
      >
        {{ videoDescription }}
      </span>
    </div>
    <div class="relative w-full overflow-hidden text-white">
      <div
        class="absolute left-0 top-0 z-10 h-full w-full cursor-pointer"
        :style="backgroundOverlay"
        @click="handlerPlay()"
      >
        <IconPlay class="icon-play" />
      </div>
      <div class="relative z-0 h-full w-full">
        <img
          v-if="videoCover"
          :src="videoCover"
          class="flex h-full max-h-full w-full object-cover"
          alt="Report esg"
          data-testid="esg-video-intro-card-image"
        />
      </div>
    </div>
    <VideoModal
      v-if="vimeoVideo && $store.state.modal.videoIntroOpen"
      :vimeo-cover="videoCover"
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
    reportData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      videoDescription:
        'To learn more about the Sustainability files included in this service and using them to their full potential, please watch the following video',
    }
  },
  computed: {
    backgroundOverlay() {
      return { background: 'rgba(0, 0,0, 70%)' }
    },
    videoTitle() {
      return this.reportData.title
    },
  },
  methods: {
    handlerPlay() {
      this.$modal.open('videoIntro')
    },
  },
}
</script>
<style scoped>
.icon-play {
  position: absolute;
  z-index: 10;
  height: 64px;
  width: 64px;
  min-width: 64px;
  max-width: 64px;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  cursor: pointer;
}

@media (width <= 767px) {
  .icon-play {
    height: 40px;
    width: 40px;
    min-width: 40px;
    max-width: 40px;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
  }
}
</style>
