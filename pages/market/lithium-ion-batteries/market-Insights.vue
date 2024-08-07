<template>
  <MarketInsightsPage :market="service" />
</template>

<script>
/** @components */
import MarketInsightsPage from '~/components/market/MarketInsightsPage.vue'
/** @mixins */
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
/** @constants */
import { LITHIUM_ION_BATTERIES, MARKET } from '~/constants/services/constants'

definePageMeta({ layout: 'services' })

export default {
  components: { MarketInsightsPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      service: { ...LITHIUM_ION_BATTERIES, hideAnalysis: true },
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.service.name} Market Insights`,
    })
  },
}
</script>
