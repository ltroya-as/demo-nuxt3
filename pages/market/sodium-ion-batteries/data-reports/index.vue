<template>
  <ReportsPage
    :product="product"
    :product-data="productData"
    :market-assessment-subscription="marketAssessmentSubscription"
    :forecast-subscription="forecastSubscription"
    hide-price-assessments-tab
  >
    The Benchmark Sustainability Index is a composite index that benchmarks
    lithium companies based on their degree of ESG transparency and performance.
    All lithium companies have been included in this Index and scored on 79
    indicators highlighting the most pressing topics of concern. Separate
    Environment, Social and Governance scores are calculated, along with an
    overarching composite ESG score, for each company in the upstream lithium
    supply chain. Companies are classified into four categories based on their
    performance: "Industry Leading", "Good Practice", "Moderate Visibility" and
    "Limited Visibility".
  </ReportsPage>
</template>

<script>
import { SODIUM_ION_BATTERIES } from '~/constants/services/constants'
import { FORECASTS_SODIUM_ION_BATTERIES } from '~/constants/services/forecasts'
import { MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES } from '~/constants/services/market-assessments'
import lithiumData from '~/constants/data-reports/lithium'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  data() {
    return {
      product: SODIUM_ION_BATTERIES,
      productData: lithiumData,
      forecastSubscription: FORECASTS_SODIUM_ION_BATTERIES.subscription,
      marketAssessmentSubscription:
        MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES.subscription,
    }
  },
}
</script>
