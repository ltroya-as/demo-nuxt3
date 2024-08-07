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

import { MANGANESE, MARKET } from '~/constants/services/constants'
import { FORECASTS_MANGANESE } from '~/constants/services/forecasts'
import manganeseData from '~/constants/data-reports/manganese'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: MANGANESE,
      productData: manganeseData,
      forecastSubscription: FORECASTS_MANGANESE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
