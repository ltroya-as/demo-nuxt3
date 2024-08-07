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

import { MARKET, BLACK_MASS } from '~/constants/services/constants'
import { FORECASTS_RECYCLING } from '~/constants/services/forecasts'

import ReportsPage from '~/components/market/ReportsPage.vue'
import recyclingData from '~/constants/data-reports/recycling'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: BLACK_MASS,
      forecastSubscription: FORECASTS_RECYCLING.subscription,
      productData: recyclingData,
      esgSubscription: null,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
