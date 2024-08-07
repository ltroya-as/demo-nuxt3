<template>
  <PortalPage :general="general" />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import { MANGANESE, MARKET } from '~/constants/services/constants'
import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'
import manganesePortalData from '~/constants/portal/manganese'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...MANGANESE,
        ...manganesePortalData,
        title: MANGANESE.name,
        icon: MANGANESE.iconColor,
        categoryAnalysis: MANGANESE.slug,
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
