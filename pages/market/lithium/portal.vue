<template>
  <PortalPage :esg-data="esgData" :general="general" />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'

import { LITHIUM, MARKET } from '~/constants/services/constants'
import { ESG_LITHIUM } from '~/constants/services/esg'
import lithiumData from '~/constants/esg/lithium'
import lithiumPortalData from '~/constants/portal/lithium'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...LITHIUM,
        ...lithiumPortalData,
        title: LITHIUM.name,
        icon: LITHIUM.iconColor,
        categoryAnalysis: LITHIUM.slug,
      },
      esgData: {
        ...ESG_LITHIUM,
        sustainabilityIndexes: lithiumData.sustainabilityIndexes,
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
