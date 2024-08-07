<template>
  <PortalPage
    :forecast-data="forecastData"
    :price-data="priceData"
    :general="general"
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'

import { ANODE, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_ANODE } from '~/constants/services/price-assessments'
import { FORECASTS_ANODE } from '~/constants/services/forecasts'
import anodePortalData from '~/constants/portal/anode'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...ANODE,
        ...anodePortalData,
        title: ANODE.name,
        icon: ANODE.iconColor,
        categoryAnalysis: ANODE.slug,
        hideSustainabilityIndex: true,
      },
      forecastData: FORECASTS_ANODE,
      priceData: PRICE_ASSESSMENTS_ANODE,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
