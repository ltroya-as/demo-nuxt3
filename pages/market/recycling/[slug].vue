<template>
  <AnalysisSlugPage :service="service" :service-page="servicePage" />
</template>
<script>
import AnalysisSlugPage from '~/components/shared/price-assessments/AnalysisSlugPage.vue'
import { PRICE_ASSESSMENTS_BLACK_MASS } from '~/constants/services/price-assessments'
import { BLACK_MASS } from '~/constants/services/constants'
export default {
  components: { AnalysisSlugPage },
  data() {
    return {
      service: BLACK_MASS,
      servicePage: PRICE_ASSESSMENTS_BLACK_MASS,
    }
  },
}
</script>
