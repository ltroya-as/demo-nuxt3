<template>
  <AnalysisSlugPage :service="service" :service-page="servicePage" />
</template>
<script>
import AnalysisSlugPage from '~/components/shared/price-assessments/AnalysisSlugPage.vue'

import { MARKET_NATURAL_GRAPHITE } from '~/constants/services/market'
import { NATURAL_GRAPHITE } from '~/constants/services/constants'

export default {
  components: { AnalysisSlugPage },
  data() {
    return {
      service: NATURAL_GRAPHITE,
      servicePage: MARKET_NATURAL_GRAPHITE,
    }
  },
}
</script>
