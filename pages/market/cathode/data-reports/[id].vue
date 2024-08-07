<template>
  <ReportsDownloadFilePage
    key="report-page-anode"
    :report-category="reportCategory"
    :report-id="reportId"
    :product="product"
  />
</template>

<script>
import {
  CATHODE,
  PRICE_ASSESSMENTS,
  MARKET,
} from '~/constants/services/constants'

import ReportsDownloadFilePage from '~/components/reports/DownloadFilePage.vue'

import AuthenticationMixin from '~/mixins/AuthenticationMixin'

definePageMeta({
  layout: 'services',
  middleware: ['authenticated', 'has-active-membership'],
})

export default {
  components: { ReportsDownloadFilePage },
  mixins: [AuthenticationMixin],
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: `${PRICE_ASSESSMENTS.name}: ${CATHODE.name} Report`,
      description: CATHODE.seo.priceAssessments.reportDescription,
    })
    useHead(seo)
  },
  data() {
    return {
      reportId: null,
      reportCategory: CATHODE.categoryReportPricing,
      product: CATHODE.slug,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${CATHODE.name} Report`,
      description: CATHODE.seo.priceAssessments.reportDescription,
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
