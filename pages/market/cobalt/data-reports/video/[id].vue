<template>
  <ReportsVideoDetailPage
    key="report-video-lithium"
    :product="product"
    :report-id="reportId"
  />
</template>

<script>
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import ReportsVideoDetailPage from '~/components/reports/VideoDetailPage.vue'

import { COBALT, MARKET } from '~/constants/services/constants'

definePageMeta({ layout: 'article', middleware: ['has-active-membership'] })

export default {
  components: { ReportsVideoDetailPage },
  mixins: [AuthenticationMixin, SeoUtilsMixin],
  data() {
    return {
      reportId: null,
      reportCategory: COBALT.categoryReportEsg,
      product: COBALT,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${COBALT.name} Report Video`,
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
