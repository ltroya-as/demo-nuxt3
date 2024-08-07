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

import { NICKEL, MARKET } from '~/constants/services/constants'

definePageMeta({ layout: 'article', middleware: ['has-active-membership'] })

export default {
  components: { ReportsVideoDetailPage },
  mixins: [AuthenticationMixin, SeoUtilsMixin],
  data() {
    return {
      reportId: null,
      reportCategory: NICKEL.categoryReportEsg,
      product: NICKEL,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${NICKEL.name} Report Video`,
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
