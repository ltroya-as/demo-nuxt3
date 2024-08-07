<template>
  <ReportsVideoDetailPage
    key="report-esg-lithium-ion-batteries"
    :report-category="reportCategory"
    :slug="slug"
    :report-id="reportId"
    back-text="Back to Data & Reports"
  />
</template>

<script>
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import ReportsVideoDetailPage from '~/components/reports/VideoDetailPage.vue'
import { LITHIUM_ION_BATTERIES, ESG } from '~/constants/services/constants'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

definePageMeta({ layout: 'article', middleware: ['has-active-membership'] })

export default {
  components: { ReportsVideoDetailPage },
  mixins: [AuthenticationMixin, SeoUtilsMixin],
  data() {
    return {
      reportId: null,
      reportCategory: LITHIUM_ION_BATTERIES.categoryReportEsg,
      slug: `/market/${LITHIUM_ION_BATTERIES.slug}/data-reports/?tab=sustainability`,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${ESG.name}: ${LITHIUM_ION_BATTERIES.name} Report Video`,
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
