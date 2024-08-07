<template>
  <AnalysisSlugPage :service="service" :service-page="servicePage" />
</template>
<script>
import AnalysisSlugPage from '~/components/shared/price-assessments/AnalysisSlugPage.vue'

import { MARKET_ANODE } from '~/constants/services/market'
import { ANODE } from '~/constants/services/constants'

export default {
  components: { AnalysisSlugPage },
  data() {
    return {
      service: ANODE,
      servicePage: MARKET_ANODE,
    }
  },
}
</script>
