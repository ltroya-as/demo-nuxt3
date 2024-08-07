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

import { COBALT, MARKET } from '~/constants/services/constants'
import { FORECASTS_COBALT } from '~/constants/services/forecasts'
import { ESG_COBALT } from '~/constants/services/esg'
import cobaltData from '~/constants/data-reports/cobalt'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: COBALT,
      productData: cobaltData,
      forecastSubscription: FORECASTS_COBALT.subscription,
      esgSubscription: ESG_COBALT.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
