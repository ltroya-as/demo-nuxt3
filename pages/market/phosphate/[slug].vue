<template>
  <AnalysisSlugPage :service="service" :service-page="servicePage" />
</template>
<script>
import AnalysisSlugPage from '~/components/shared/price-assessments/AnalysisSlugPage.vue'
import { PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE } from '~/constants/services/price-assessments'
import { SYNTHETIC_GRAPHITE } from '~/constants/services/constants'

export default {
  components: { AnalysisSlugPage },
  data() {
    return {
      service: SYNTHETIC_GRAPHITE,
      servicePage: PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
    }
  },
}
</script>
