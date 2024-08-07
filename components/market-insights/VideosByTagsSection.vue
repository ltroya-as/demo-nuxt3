<template>
  <div>
    <SectionTitle
      class="border-s-200 mb-[18px] !border-l-0 border-b-2 lg:text-xl"
      :title="sectionData.title"
      :hide-button="hideButton"
      @view-more-click="$emit('viewMoreClick', sectionData)"
    />
    <div class="relative md:overflow-hidden">
      <div
        class="grid w-full grid-cols-1 justify-items-center gap-2 py-1 md:grid-cols-3 2xl:grid-cols-4"
      >
        <VideoCard
          v-for="(video, i) in videos"
          :key="video.id"
          class="shrink-0 md:!max-w-full"
          :index="i"
          :slug="video.slug"
          :title="video.title"
          :excerpt="video.excerpt"
          :duration="video.duration"
          :published-date="video.publishedDate"
          :cover-url="video.coverUrl"
          :vimeo-id="video.vimeoId"
          :preview-vimeo-id="video.previewVimeoId"
          @play="handlePlay(video)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'
import SectionTitle from '~/components/portals/SectionTitle.vue'
import VideoCard from '~/components/portals/VideoCard.vue'

export default {
  components: {
    SectionTitle,
    VideoCard,
  },

  mixins: [ScreenSizeMixin],

  props: {
    sectionData: {
      type: Object,
      required: true,
    },
    hideButton: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    videos() {
      if (this.isBigDesktop() || this.isMobile())
        return this.sectionData.videos || []
      return (this.sectionData.videos || []).slice(0, 3)
    },
  },

  methods: {
    handlePlay(vimeoData) {
      this.$emit('play', vimeoData)
    },
  },
}
</script>
