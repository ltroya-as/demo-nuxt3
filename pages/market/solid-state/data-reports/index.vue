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

import { SOLID_STATE, MARKET } from '~/constants/services/constants'
import { FORECASTS_SOLID_STATE } from '~/constants/services/forecasts'
import solidStateData from '~/constants/data-reports/solid-state'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: SOLID_STATE,
      productData: solidStateData,
      forecastSubscription: FORECASTS_SOLID_STATE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
