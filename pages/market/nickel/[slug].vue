<template>
  <AnalysisSlugPage :service="service" :service-page="servicePage" />
</template>
<script>
import AnalysisSlugPage from '~/components/shared/price-assessments/AnalysisSlugPage.vue'
import { PRICE_ASSESSMENTS_NICKEL } from '~/constants/services/price-assessments'
import { NICKEL } from '~/constants/services/constants'

export default {
  components: { AnalysisSlugPage },
  data() {
    return {
      service: NICKEL,
      servicePage: PRICE_ASSESSMENTS_NICKEL,
    }
  },
}
</script>
