<template>
  <AnalysisSlugPage :service="service" :service-page="servicePage" />
</template>
<script>
/** @components */
import AnalysisSlugPage from '~/components/shared/price-assessments/AnalysisSlugPage.vue'
/** @constants */
import { MARKET_LITHIUM_ION_BATTERIES } from '~/constants/services/market'
import { LITHIUM_ION_BATTERIES } from '~/constants/services/constants'

export default {
  components: { AnalysisSlugPage },
  data() {
    return {
      service: LITHIUM_ION_BATTERIES,
      servicePage: MARKET_LITHIUM_ION_BATTERIES,
    }
  },
}
</script>
