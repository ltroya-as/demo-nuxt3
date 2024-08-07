<template>
  <PortalPage :general="general" />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'

import { SODIUM_ION_BATTERIES, MARKET } from '~/constants/services/constants'
import sodiumIonBatteriesPortalData from '~/constants/portal/sodium-ion-batteries'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...SODIUM_ION_BATTERIES,
        ...sodiumIonBatteriesPortalData,
        title: SODIUM_ION_BATTERIES.name,
        icon: SODIUM_ION_BATTERIES.iconColor,
        categoryAnalysis: SODIUM_ION_BATTERIES.slug,
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
