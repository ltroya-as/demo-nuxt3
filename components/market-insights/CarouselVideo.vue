<template>
  <Carousel :items="videos" item-class="!p-4 md:!p-6">
    <template #content="{ item }">
      <div
        class="absolute right-3 top-3 flex items-center gap-x-2.5 text-xs font-semibold"
      >
        <span>{{ item.publishedDate }}</span>
        <span class="bg-s-900 rounded p-1.5">{{ item.duration }}</span>
      </div>
      <div class="mb-1.5 flex flex-col gap-1">
        <span
          class="text-p-500 flex size-8 items-center justify-center rounded-lg bg-black p-1"
        >
          <VideoRecorderIcon class="h-3.5 w-5" />
        </span>
        <h3
          class="line-clamp-2 text-sm font-bold leading-normal md:text-xl md:leading-6"
        >
          {{ item?.title }}
        </h3>
      </div>
    </template>
    <template #action="{ item }">
      <Button
        variant="primary"
        class="!px-4 !py-3 text-sm"
        @click="$emit('play', item)"
      >
        <div class="flex items-center gap-1.5">
          <PlayIcon v-if="isPublic(item)" />
          <span>{{ textButton(item) }}</span>
        </div>
      </Button>
    </template>
  </Carousel>
</template>

<script>
import VideoRecorderIcon from '~/assets/icons/video-recorder.svg'
import PlayIcon from '~/assets/icons/play-circle.svg'
import Button from '~/components/common/Button.vue'
import Carousel from '~/components/market-insights/Carousel.vue'

export default {
  components: { Carousel, Button, PlayIcon, VideoRecorderIcon },
  props: {
    videos: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    isPublic(video) {
      return (
        video.vimeoId ||
        video.isPublic ||
        (!video.vimeoId && video.previewVimeoId)
      )
    },
    textButton(video) {
      if (video.vimeoId) return 'Watch Now'
      if (video.isPublic || (!video.vimeoId && video.previewVimeoId))
        return 'Watch Preview'
      return 'Find Out More'
    },
  },
}
</script>
