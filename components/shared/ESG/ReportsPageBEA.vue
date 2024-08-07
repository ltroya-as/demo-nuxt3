<template>
  <div class="max-w-content-container relative mx-auto min-h-[150px]">
    <div v-if="loading" class="absolute left-0 top-1/2 w-full">
      <TheLoader />
    </div>

    <div v-else>
      <div v-if="!reports.length" class="pt-16 text-center text-xl">
        There are currently no reports published, please check back later
      </div>

      <div
        v-if="reports.length"
        class="grid grid-cols-1 items-center justify-center gap-4 xl:grid-cols-2"
      >
        <div v-for="(report, index) in reports" :key="index">
          <SharedMarketReportCard
            :report="report"
            :category="category"
            :initial-fields="initialFields"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoader from '~/components/TheLoader.vue'
import SharedMarketReportCard from '~/components/shared/market/ReportCard.vue'

import { getEsgImagesByReportType } from '~/constants/esg'
import { logError } from '~/utils/log-error'

export default {
  components: {
    SharedMarketReportCard,
    TheLoader,
  },
  props: {
    category: {
      type: String,
      required: true,
    },
    initialFields: {
      type: Array,
      default: () => [],
      required: false,
    },
    product: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      files: [],
      videoIntro: null,
      vimeoData: null,
      reports: [],
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/authenticated']
    },
    isValidVideoIntro() {
      return !!this.videoIntro
    },
  },
  async mounted() {
    await this.getReportData()
  },
  methods: {
    getImagesByReportType(report) {
      try {
        report.images = getEsgImagesByReportType(this.category, 'DEFAULT')
      } catch (e) {
        return report
      }
    },
    async getReportData() {
      try {
        this.loading = true
        const data = await this.$downloadManager.getAllReports({
          market: this.product,
          marketTypes: ['esg'],
          tags: ['esg-battery-emissions-analyser'],
        })

        data.forEach((element) => {
          this.getImagesByReportType(element)
        })

        this.reports = data
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
