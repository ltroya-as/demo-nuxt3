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

import { SILICON_ANODE, MARKET } from '~/constants/services/constants'
import { FORECASTS_SILICON_ANODE } from '~/constants/services/forecasts'
import siliconAnodeData from '~/constants/data-reports/silicon-anode'

import ReportsPage from '~/components/market/ReportsPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: SILICON_ANODE,
      productData: siliconAnodeData,
      forecastSubscription: FORECASTS_SILICON_ANODE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Data and Reports`,
    })
  },
}
</script>
