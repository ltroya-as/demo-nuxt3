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

import { CATHODE, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_CATHODE } from '~/constants/services/price-assessments'
import { FORECASTS_CATHODE } from '~/constants/services/forecasts'
import cathodePortalData from '~/constants/portal/cathode'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...CATHODE,
        ...cathodePortalData,
        title: CATHODE.name,
        icon: CATHODE.iconColor,
        categoryAnalysis: CATHODE.slug,
        hideSustainabilityIndex: true,
      },
      forecastData: FORECASTS_CATHODE,
      priceData: PRICE_ASSESSMENTS_CATHODE,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
