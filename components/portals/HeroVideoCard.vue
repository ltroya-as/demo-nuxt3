<template>
  <div
    :key="slug"
    data-testid="hero-video-card"
    class="flex h-full w-[512px] flex-shrink-0 flex-col rounded-lg"
  >
    <div
      class="bg-s-100 relative flex flex-grow flex-col justify-between rounded-t-lg p-3"
    >
      <div class="absolute left-0 top-0 h-full w-full">
        <img
          data-testid="hero-video-card-cover"
          class="fade-in h-full w-full rounded-t-lg object-cover object-center"
          :src="$cloudinary.resize(coverUrl, 'hero-video-card')"
          alt=""
        />
        <div
          class="absolute left-0 top-0 h-full w-full rounded-t-lg bg-black/60"
        />
      </div>
      <div class="z-10 text-white">
        <CardLabel class="mb-4" type="mp4" />
        <div
          data-testid="hero-video-card-date"
          class="fade-in mb-2 text-xs font-semibold"
        >
          {{ publishedDate }} | {{ duration }}
        </div>
        <div
          data-testid="hero-video-card-title"
          class="fade-in mb-2 line-clamp-3 text-lg font-semibold"
        >
          {{ title }}
        </div>
        <div
          data-testid="hero-video-card-excerpt"
          class="fade-in line-clamp-2 text-xs"
        >
          {{ excerpt }}
        </div>
      </div>
      <VideoCardFooter
        :is-authorized="isAuthorized"
        :text-button="textButton"
        @play="$emit('play')"
      />
    </div>
    <ProgressBar duration="10s" />
  </div>
</template>

<script>
import CardLabel from '~/components/portals/CardLabel.vue'
import ProgressBar from '~/components/portals/ProgressBar.vue'
import VideoCardFooter from '~/components/portals/VideoCardFooter.vue'

export default {
  components: {
    CardLabel,
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
    excerpt: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      default: () => '',
    },
    isAuthorized: {
      type: Boolean,
      required: true,
    },
    previewVimeoId: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
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

<style scoped>
.fade-in {
  animation: fade-in 0.5s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
}
</style>
