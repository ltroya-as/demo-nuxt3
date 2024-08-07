<template>
  <div class="w-full">
    <div v-if="loading" class="absolute left-0 top-44 w-full lg:top-72">
      <TheLoader />
    </div>

    <div v-else class="mb-10 h-full w-full">
      <div
        class="max-w-content-container mx-auto w-full px-4 lg:px-14 2xl:px-0"
      >
        <BackButton
          show-icon-back
          title="Back to Data & Reports"
          class="my-5"
          :route="route"
        />
      </div>
      <div
        class="border-p-500 bg-s-900 relative flex h-full w-full flex-col border-t-4"
      >
        <VimeoPlayer
          v-if="vimeoVideo"
          :source="vimeoSource"
          :autoplay="startPlay"
          video-ratio="4:2"
          class="h-full w-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reformat } from '~/utils/date'

import TheLoader from '~/components/TheLoader.vue'
import BackButton from '~/components/shared/common/BackButton.vue'
import VimeoPlayer from '~/components/video/VimeoPlayer.vue'

import DownloadReportMixin from '~/mixins/DownloadReportMixin'
import GetVimeoDataMixin from '~/mixins/GetVimeoDataMixin'

export default {
  components: { VimeoPlayer, BackButton, TheLoader },
  mixins: [DownloadReportMixin, GetVimeoDataMixin],
  props: {
    product: {
      type: Object,
      required: true,
    },
    reportId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      startPlay: false,
      videoTitle: '',
      videoDate: null,
    }
  },
  computed: {
    backgroundOverlay() {
      return { background: 'rgba(0, 0,0, 50%)' }
    },
    route() {
      const queryParams = window.location.search || ''
      return `/market/${this.product.slug}/data-reports/${queryParams}`
    },
  },
  async created() {
    await this.onInit()
  },
  methods: {
    async onInit() {
      try {
        if (this.product.categoryReportEsg && this.reportId) {
          const report = await this.$downloadManager.getDataFileByIdAndCategory(
            this.product.categoryReportEsg,
            this.reportId,
          )
          this.reportData = report
          this.videoTitle = report.post_title
          this.videoDate = reformat(report.post_date, 'MMM dd, yyyy')
          const vimeoId = report.file_name
          await this.getVimeoData(vimeoId)
        }
      } catch (_error) {
        // eslint-disable-next-line no-console
        console.log({ _error })
      } finally {
        this.loading = false
      }
    },
    handlerPlay() {
      this.startPlay = true
    },
  },
}
</script>
