<template>
  <ReportsVideoDetailPage
    key="report-esg-sodium-ion-batteries"
    :product="product"
    :report-id="reportId"
  />
</template>

<script>
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import ReportsVideoDetailPage from '~/components/reports/VideoDetailPage.vue'
import { SODIUM_ION_BATTERIES, ESG } from '~/constants/services/constants'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

definePageMeta({ layout: 'article', middleware: ['has-active-membership'] })

export default {
  components: { ReportsVideoDetailPage },
  mixins: [AuthenticationMixin, SeoUtilsMixin],
  data() {
    return {
      product: SODIUM_ION_BATTERIES,
      reportId: null,
      reportCategory: SODIUM_ION_BATTERIES.categoryReportEsg,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${ESG.name}: ${SODIUM_ION_BATTERIES.name} Report Video`,
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
