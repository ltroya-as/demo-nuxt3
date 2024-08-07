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

import { NATURAL_GRAPHITE, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_NATURAL_GRAPHITE } from '~/constants/services/price-assessments'
import { FORECASTS_NATURAL_GRAPHITE } from '~/constants/services/forecasts'
import { ESG_NATURAL_GRAPHITE } from '~/constants/services/esg'
import naturalGraphiteData from '~/constants/esg/natural-graphite'
import naturalGraphitePortalData from '~/constants/portal/natural-graphite'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...NATURAL_GRAPHITE,
        ...naturalGraphitePortalData,
        title: NATURAL_GRAPHITE.name,
        icon: NATURAL_GRAPHITE.iconColor,
        categoryAnalysis: NATURAL_GRAPHITE.slug,
      },
      esgData: {
        ...ESG_NATURAL_GRAPHITE,
        sustainabilityIndexes: naturalGraphiteData.sustainabilityIndexes,
      },
      forecastData: FORECASTS_NATURAL_GRAPHITE,
      priceData: PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
