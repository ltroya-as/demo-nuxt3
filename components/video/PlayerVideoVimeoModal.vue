<template>
  <div>
    <div class="relative aspect-video w-full overflow-hidden text-white">
      <div
        class="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center"
        :style="backgroundOverlay"
      >
        <IconPlay
          class="h-10 w-10 cursor-pointer lg:h-16 lg:w-16"
          @click="handlerPlay()"
        />
      </div>
      <div class="relative z-0 h-full w-full">
        <img
          v-if="videoCover"
          :src="videoCover"
          class="flex h-full max-h-full w-full object-cover"
          alt="Video Cover Vimeo"
          data-testid="video-intro-card-image"
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
import VideoModal from '~/components/video/VideoModal.vue'
import IconPlay from '~/assets/icons/icon-play.svg'
import GetVimeoDataMixin from '~/mixins/GetVimeoDataMixin'

export default {
  components: {
    IconPlay,
    VideoModal,
  },
  mixins: [GetVimeoDataMixin],
  props: {
    vimeoId: {
      type: Number,
      required: true,
    },
  },
  async mounted() {
    await this.getVimeoData(this.vimeoId)
  },
}
</script>
