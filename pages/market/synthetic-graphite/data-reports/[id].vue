<template>
  <ReportsDownloadFilePage
    key="report-page-lithium"
    :report-category="reportCategory"
    :report-id="reportId"
    :product="product"
  />
</template>

<script>
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import ReportsDownloadFilePage from '~/components/reports/DownloadFilePage.vue'

import { SYNTHETIC_GRAPHITE, MARKET } from '~/constants/services/constants'

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
      product: SYNTHETIC_GRAPHITE.slug,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${SYNTHETIC_GRAPHITE.name} Report`,
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
