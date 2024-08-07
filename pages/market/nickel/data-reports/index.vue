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

import { NICKEL, MARKET } from '~/constants/services/constants'
import { FORECASTS_NICKEL } from '~/constants/services/forecasts'
import { ESG_NICKEL } from '~/constants/services/esg'
import nickelData from '~/constants/data-reports/nickel'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: NICKEL,
      productData: nickelData,
      forecastSubscription: FORECASTS_NICKEL.subscription,
      esgSubscription: ESG_NICKEL.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
