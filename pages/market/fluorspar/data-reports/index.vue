<template>
  <ReportsPage
    :product="product"
    :product-data="productData"
    :forecast-subscription="forecastSubscription"
    hide-price-assessments-tab
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { FLUORSPAR, MARKET } from '~/constants/services/constants'
import { FORECASTS_FLUORSPAR } from '~/constants/services/forecasts'
import fluorsparData from '~/constants/data-reports/fluorspar'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: FLUORSPAR,
      productData: fluorsparData,
      forecastSubscription: FORECASTS_FLUORSPAR.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
