<template>
  <ReportsPage
    :product="product"
    :product-data="productData"
    :forecast-subscription="forecastSubscription"
    :esg-subscription="esgSubscription"
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
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { LITHIUM, MARKET } from '~/constants/services/constants'
import { FORECASTS_LITHIUM } from '~/constants/services/forecasts'
import { ESG_LITHIUM } from '~/constants/services/esg'
import lithiumData from '~/constants/data-reports/lithium'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: LITHIUM,
      productData: lithiumData,
      forecastSubscription: FORECASTS_LITHIUM.subscription,
      esgSubscription: ESG_LITHIUM.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
