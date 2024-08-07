<template>
  <AssessmentsReportPage
    :category="category"
    assessment-type="price"
    :icon="icon"
    :service="service"
    :subtitle="subtitle"
    :title="title"
  />
</template>

<script>
import AssessmentsReportPage from '~/components/assessments/ReportPage.vue'
import {
  PRICE_ASSESSMENTS,
  SYNTHETIC_GRAPHITE,
} from '~/constants/services/constants'

definePageMeta({
  layout: 'price-assessments',
  middleware: ['has-active-membership'],
})

export default {
  components: { AssessmentsReportPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      title: `${SYNTHETIC_GRAPHITE.name} Reports`,
      subtitle: `${SYNTHETIC_GRAPHITE.simplifiedName} ${PRICE_ASSESSMENTS.name}`,
      icon: SYNTHETIC_GRAPHITE.iconColor,
      category: SYNTHETIC_GRAPHITE.categoryReportPricing,
      service: SYNTHETIC_GRAPHITE.name,
    }
  },
  head() {
    return this.generateSeoInfo(
      {
        title: `${PRICE_ASSESSMENTS.name}: ${this.title}`,
        description: SYNTHETIC_GRAPHITE.seo.priceAssessments.reportDescription,
      },
      {
        keywords: 'synthethic-graphite, benchmark',
      },
    )
  },
}
</script>
