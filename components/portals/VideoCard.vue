<template>
  <div
    class="shadow-pm relative flex h-full w-full max-w-[350px] flex-col rounded-lg bg-white md:max-w-[295px]"
  >
    <div class="relative pb-[38.31%]">
      <img
        class="absolute left-0 top-0 h-full w-full rounded-t-lg object-cover object-top"
        :src="$cloudinary.resize(coverUrl, 'video-card')"
        alt="card banner"
      />
      <div
        class="bg-s-900 absolute bottom-3 right-3 rounded p-1.5 text-xs font-semibold text-white"
      >
        {{ duration }}
      </div>
    </div>
    <div
      class="flex grow flex-col justify-between p-3"
      :class="isActiveIndex ? 'pb-0 xl:pb-3' : 'pb-3'"
    >
      <div>
        <div class="text-s-700 mb-2 text-xs font-semibold">
          {{ publishedDate }}
        </div>
        <div
          class="mb-2 line-clamp-2 min-h-12 text-lg font-semibold leading-6"
          :title="title"
        >
          {{ title }}
        </div>
      </div>
      <VideoCardFooter
        class="mt-14"
        :is-authorized="isAuthorized"
        :has-preview="hasPreview"
        :text-button="textButton"
        @play="$emit('play', vimeoId || previewVimeoId)"
      />
    </div>
    <ProgressBar
      v-if="isActiveIndex"
      class="mt-1.5 block xl:hidden"
      duration="10s"
    />
  </div>
</template>

<script>
import ProgressBar from '~/components/portals/ProgressBar.vue'
import VideoCardFooter from '~/components/portals/VideoCardFooter.vue'

export default {
  components: {
    ProgressBar,
    VideoCardFooter,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    slug: {
      type: [String, Number],
      required: true,
    },
    publishedDate: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      default: () => '',
    },
    isActiveIndex: {
      type: Boolean,
      default: false,
    },
    vimeoId: {
      type: [String, Number],
      required: true,
    },
    previewVimeoId: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    isAuthorized() {
      return !!this.vimeoId
    },
    hasPreview() {
      return !!this.previewVimeoId
    },
    textButton() {
      if (this.isAuthorized) return 'Watch Now'
      if (this.hasPreview) return 'Watch Preview'
      return 'Find out more'
    },
  },
}
</script>
