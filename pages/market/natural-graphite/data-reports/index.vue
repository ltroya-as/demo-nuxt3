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

import { NATURAL_GRAPHITE, MARKET } from '~/constants/services/constants'
import { FORECASTS_NATURAL_GRAPHITE } from '~/constants/services/forecasts'
import { ESG_NATURAL_GRAPHITE } from '~/constants/services/esg'
import naturalGraphiteData from '~/constants/data-reports/natural-graphite'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: NATURAL_GRAPHITE,
      productData: naturalGraphiteData,
      forecastSubscription: FORECASTS_NATURAL_GRAPHITE.subscription,
      esgSubscription: ESG_NATURAL_GRAPHITE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
