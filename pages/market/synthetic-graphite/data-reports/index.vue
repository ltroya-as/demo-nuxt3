<template>
  <ReportsPage
    :product="product"
    :product-data="productData"
    :forecast-subscription="forecastSubscription"
    :esg-subscription="esgSubscription"
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { SYNTHETIC_GRAPHITE, MARKET } from '~/constants/services/constants'
import { FORECASTS_SYNTHETIC_GRAPHITE } from '~/constants/services/forecasts'
import { ESG_SYNTHETIC_GRAPHITE } from '~/constants/services/esg'
import syntheticGraphiteData from '~/constants/data-reports/synthetic-graphite'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: SYNTHETIC_GRAPHITE,
      productData: syntheticGraphiteData,
      forecastSubscription: FORECASTS_SYNTHETIC_GRAPHITE.subscription,
      esgSubscription: ESG_SYNTHETIC_GRAPHITE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
