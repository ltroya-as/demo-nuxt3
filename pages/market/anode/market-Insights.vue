<template>
  <MarketInsightsPage :market="service" />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import MarketInsightsPage from '~/components/market/MarketInsightsPage.vue'

import { ANODE, MARKET } from '~/constants/services/constants'

definePageMeta({ layout: 'services' })

export default {
  components: { MarketInsightsPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      service: { ...ANODE, hideAnalysis: true },
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.service.name} Market Insights`,
    })
  },
}
</script>
