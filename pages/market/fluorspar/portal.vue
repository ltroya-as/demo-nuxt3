<template>
  <PortalPage :general="general" />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'

import { FLUORSPAR, MARKET } from '~/constants/services/constants'
import fluorsparPortalData from '~/constants/portal/fluorspar'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...FLUORSPAR,
        ...fluorsparPortalData,
        title: FLUORSPAR.name,
        icon: FLUORSPAR.iconColor,
        categoryAnalysis: FLUORSPAR.slug,
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
