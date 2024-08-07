<template>
  <MarketInsightsPage :market="service" />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import MarketInsightsPage from '~/components/market/MarketInsightsPage.vue'

import { SODIUM_ION_BATTERIES, MARKET } from '~/constants/services/constants'

definePageMeta({ layout: 'services' })

export default {
  components: { MarketInsightsPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      service: { ...SODIUM_ION_BATTERIES, hideAnalysis: true },
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.service.name} Market Insights`,
    })
  },
}
</script>
