<template>
  <div class="relative min-h-[500px]">
    <div v-if="loading" class="absolute left-0 w-full lg:top-1/2">
      <TheLoader />
    </div>

    <div v-if="!loading">
      <AssessmentsReportList
        :reports="reports"
        :category="category"
        :initial-fields="initialFields"
      />
    </div>
  </div>
</template>

<script>
import TheLoader from '~/components/TheLoader.vue'
import AssessmentsReportList from '~/components/assessments/ReportList.vue'

import { logError } from '~/utils/log-error'

export default {
  components: { AssessmentsReportList, TheLoader },
  props: {
    category: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    initialFields: {
      type: Array,
      required: true,
    },
    market: {
      type: String,
      default: 'prices',
    },
  },

  data() {
    return {
      reports: [],
      loading: true,
    }
  },
  async mounted() {
    this.loading = true
    try {
      this.reports = await this.$downloadManager.getAllReports({
        market: this.product,
        marketTypes: [this.market],
        show_total: true,
      })
    } catch (error) {
      logError(error)
    } finally {
      this.loading = false
    }
  },
}
</script>
