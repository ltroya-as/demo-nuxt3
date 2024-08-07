<template>
  <div class="relative mx-auto h-full w-[90%]">
    <div v-if="loading" class="absolute left-0 top-44 w-full lg:top-72">
      <TheLoader />
    </div>

    <div v-else class="h-full">
      <div class="flex h-full flex-col items-center justify-center">
        <h3 class="text-s-900 mb-12 text-3xl font-bold">
          {{ title }}
        </h3>
        <SharedCommonButtonDownload
          ref="buttonDownloadReport"
          data-testid="download-report-by-id"
          class="text-xl md:w-auto"
          :download-file="reportData"
          variant="primary"
          text="Download report"
        />
        <CommonButton
          v-if="reportCategory"
          class="mt-5 inline-block w-full justify-center"
          variant="tertiary"
          :link="returnUrl"
        >
          All reports
        </CommonButton>
      </div>
    </div>
  </div>
</template>

<script>
import DownloadReportMixin from '~/mixins/DownloadReportMixin'
import TheLoader from '~/components/TheLoader.vue'
import CommonButton from '~/components/common/Button.vue'

export default {
  components: { CommonButton, TheLoader },
  mixins: [DownloadReportMixin],
  props: {
    reportCategory: {
      type: String,
      default: null,
    },
    reportId: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      reportData: {},
      title: '',
    }
  },
  computed: {
    returnUrl() {
      return `/market/${this.product}/data-reports/`
    },
  },
  async mounted() {
    await this.onInit()
    setTimeout(() => {
      this.$refs.buttonDownloadReport.$el.click()
    }, 500)
  },
  methods: {
    async onInit() {
      try {
        if (this.reportCategory && this.reportId) {
          const report = await this.$downloadManager.getDataFileByIdAndCategory(
            this.reportCategory,
            this.reportId,
          )
          this.reportData = report
          this.reportData.category = this.reportCategory
          this.title = report.post_title
        }
      } catch (_e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
