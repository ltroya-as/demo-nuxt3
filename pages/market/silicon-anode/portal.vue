<template>
  <PortalPage :general="general" />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'

import { SILICON_ANODE, MARKET } from '~/constants/services/constants'
import siliconAnodePortalData from '~/constants/portal/silicon-anode'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...SILICON_ANODE,
        ...siliconAnodePortalData,
        title: SILICON_ANODE.name,
        icon: SILICON_ANODE.iconColor,
        categoryAnalysis: SILICON_ANODE.slug,
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
