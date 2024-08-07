<template>
  <ReportsDownloadFilePage
    key="report-price-assessment-synthetic-graphite"
    :report-category="reportCategory"
    :report-id="reportId"
  />
</template>

<script>
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import ReportsDownloadFilePage from '~/components/reports/DownloadFilePage.vue'
import {
  PRICE_ASSESSMENTS,
  SYNTHETIC_GRAPHITE,
} from '~/constants/services/constants'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

definePageMeta({
  layout: 'price-assessments',
  middleware: ['authenticated', 'has-active-membership'],
})

export default {
  components: { ReportsDownloadFilePage },
  mixins: [AuthenticationMixin, SeoUtilsMixin],
  data() {
    return {
      reportId: null,
      reportCategory: SYNTHETIC_GRAPHITE.categoryReportPricing,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${PRICE_ASSESSMENTS.name}: ${SYNTHETIC_GRAPHITE.name} Report`,
      description: SYNTHETIC_GRAPHITE.seo.priceAssessments.reportDescription,
    })
  },
  created() {
    this.onInit()
  },
  methods: {
    onInit() {
      const { id } = this.$route.params
      this.reportId = id
    },
  },
}
</script>
