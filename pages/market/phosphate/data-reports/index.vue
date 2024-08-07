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

import { PHOSPHATE, MARKET } from '~/constants/services/constants'
import { FORECASTS_PHOSPHATE } from '~/constants/services/forecasts'
import phosphateData from '~/constants/data-reports/phosphate'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: PHOSPHATE,
      productData: phosphateData,
      forecastSubscription: FORECASTS_PHOSPHATE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
