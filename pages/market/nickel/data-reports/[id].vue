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

import { NICKEL, MARKET } from '~/constants/services/constants'

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
      reportCategory: NICKEL.categoryReportPricing,
      product: NICKEL.slug,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${NICKEL.name} Report`,
      description: NICKEL.seo.priceAssessments.reportDescription,
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
