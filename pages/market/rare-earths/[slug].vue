<template>
  <AnalysisSlugPage :service="service" :service-page="servicePage" />
</template>
<script>
import AnalysisSlugPage from '~/components/shared/price-assessments/AnalysisSlugPage.vue'
import { PRICE_ASSESSMENTS_RARE_EARTHS } from '~/constants/services/price-assessments'
import { RARE_EARTHS } from '~/constants/services/constants'
export default {
  components: { AnalysisSlugPage },
  data() {
    return {
      service: RARE_EARTHS,
      servicePage: PRICE_ASSESSMENTS_RARE_EARTHS,
    }
  },
}
</script>
