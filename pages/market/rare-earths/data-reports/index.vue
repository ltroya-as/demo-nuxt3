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

import { RARE_EARTHS, MARKET } from '~/constants/services/constants'
import { FORECASTS_RARE_EARTHS } from '~/constants/services/forecasts'
import { ESG_RARE_EARTHS } from '~/constants/services/esg'
import rareEarthsData from '~/constants/data-reports/rare-earths'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: RARE_EARTHS,
      productData: rareEarthsData,
      forecastSubscription: FORECASTS_RARE_EARTHS.subscription,
      esgSubscription: ESG_RARE_EARTHS.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
