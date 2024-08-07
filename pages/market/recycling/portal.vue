<template>
  <PortalPage
    :esg-data="esgData"
    :forecast-data="forecastData"
    :price-data="priceData"
    :general="general"
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'

import { BLACK_MASS, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_BLACK_MASS } from '~/constants/services/price-assessments'
import { FORECASTS_RECYCLING } from '~/constants/services/forecasts'
import recyclingPortalData from '~/constants/portal/recycling'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...BLACK_MASS,
        ...recyclingPortalData,
        title: BLACK_MASS.name,
        icon: BLACK_MASS.iconColor,
        categoryAnalysis: BLACK_MASS.slug,
        hideSustainabilityIndex: true,
      },
      esgData: {
        sustainabilityIndexes: [],
      },
      forecastData: FORECASTS_RECYCLING,
      priceData: PRICE_ASSESSMENTS_BLACK_MASS,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
