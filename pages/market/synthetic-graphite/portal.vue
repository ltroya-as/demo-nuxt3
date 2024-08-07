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

import { SYNTHETIC_GRAPHITE, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE } from '~/constants/services/price-assessments'
import { FORECASTS_SYNTHETIC_GRAPHITE } from '~/constants/services/forecasts'
import { ESG_SYNTHETIC_GRAPHITE } from '~/constants/services/esg'
import syntheticGraphiteData from '~/constants/esg/synthetic-graphite'
import syntheticGraphitePortalData from '~/constants/portal/synthetic-graphite'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...SYNTHETIC_GRAPHITE,
        ...syntheticGraphitePortalData,
        title: SYNTHETIC_GRAPHITE.name,
        icon: SYNTHETIC_GRAPHITE.iconColor,
        categoryAnalysis: SYNTHETIC_GRAPHITE.slug,
      },
      esgData: {
        ...ESG_SYNTHETIC_GRAPHITE,
        sustainabilityIndexes: syntheticGraphiteData.sustainabilityIndexes,
      },
      forecastData: FORECASTS_SYNTHETIC_GRAPHITE,
      priceData: PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
