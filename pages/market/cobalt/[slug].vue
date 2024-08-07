<template>
  <AnalysisSlugPage :service="service" :service-page="servicePage" />
</template>
<script>
import AnalysisSlugPage from '~/components/shared/price-assessments/AnalysisSlugPage.vue'
import { MARKET_COBALT } from '~/constants/services/market'
import { COBALT } from '~/constants/services/constants'

export default {
  components: { AnalysisSlugPage },
  data() {
    return {
      service: COBALT,
      servicePage: MARKET_COBALT,
    }
  },
}
</script>
