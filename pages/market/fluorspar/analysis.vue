<template>
  <AnalysisPage :service="service" :slug="slug" />
</template>

<script>
import AnalysisPage from '~/components/shared/price-assessments/AnalysisPage.vue'
import { SYNTHETIC_GRAPHITE } from '~/constants/services/constants'

definePageMeta({
  layout: 'price-assessments',
})

export default {
  components: { AnalysisPage },
  data() {
    return {
      slug: SYNTHETIC_GRAPHITE.slug,
      service: SYNTHETIC_GRAPHITE,
    }
  },
}
</script>
