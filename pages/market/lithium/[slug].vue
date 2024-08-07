<template>
  <AnalysisSlugPage :service="service" :service-page="servicePage" />
</template>
<script>
import AnalysisSlugPage from '~/components/shared/price-assessments/AnalysisSlugPage.vue'

import { MARKET_LITHIUM } from '~/constants/services/market'
import { LITHIUM } from '~/constants/services/constants'

export default {
  components: { AnalysisSlugPage },
  data() {
    return {
      service: LITHIUM,
      servicePage: MARKET_LITHIUM,
    }
  },
}
</script>
