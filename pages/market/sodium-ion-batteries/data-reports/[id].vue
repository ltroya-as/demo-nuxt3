<template>
  <ReportsDownloadFilePage
    key="report-price-assessment-sodium-ion-batteries"
    :report-category="reportCategory"
    :report-id="reportId"
    :product="product"
  />
</template>

<script>
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import ReportsDownloadFilePage from '~/components/reports/DownloadFilePage.vue'
import {
  SODIUM_ION_BATTERIES,
  PRICE_ASSESSMENTS,
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
      reportCategory: SODIUM_ION_BATTERIES.categoryReportPricing,
      product: SODIUM_ION_BATTERIES.slug,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${PRICE_ASSESSMENTS.name}: ${SODIUM_ION_BATTERIES.name} Report`,
      description: SODIUM_ION_BATTERIES.seo.priceAssessments.reportDescription,
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
