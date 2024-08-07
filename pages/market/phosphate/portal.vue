<template>
  <PortalPage :general="general" />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'

import { PHOSPHATE, MARKET } from '~/constants/services/constants'
import phosphatePortalData from '~/constants/portal/phosphate'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...PHOSPHATE,
        ...phosphatePortalData,
        title: PHOSPHATE.name,
        icon: PHOSPHATE.iconColor,
        categoryAnalysis: PHOSPHATE.slug,
        hideTableAndChart: true,
        hideSustainabilityIndex: true,
      },
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
