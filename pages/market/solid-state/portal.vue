<template>
  <PortalPage :general="general" />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'

import { SOLID_STATE, MARKET } from '~/constants/services/constants'
import solidStatePortalData from '~/constants/portal/solid-state'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...SOLID_STATE,
        ...solidStatePortalData,
        title: SOLID_STATE.name,
        icon: SOLID_STATE.iconColor,
        categoryAnalysis: SOLID_STATE.slug,
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
