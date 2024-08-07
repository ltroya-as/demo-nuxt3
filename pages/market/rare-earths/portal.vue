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

import { MARKET, RARE_EARTHS } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_RARE_EARTHS } from '~/constants/services/price-assessments'
import { FORECASTS_RARE_EARTHS } from '~/constants/services/forecasts'
import { ESG_RARE_EARTHS } from '~/constants/services/esg'
import rareEarthsData from '~/constants/esg/rare-earths'
import rareEarthsPortalData from '~/constants/portal/rare-earths'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...RARE_EARTHS,
        ...rareEarthsPortalData,
        title: RARE_EARTHS.name,
        icon: RARE_EARTHS.iconColor,
        categoryAnalysis: RARE_EARTHS.slug,
      },
      esgData: {
        ...ESG_RARE_EARTHS,
        sustainabilityIndexes: rareEarthsData.sustainabilityIndexes,
      },
      forecastData: FORECASTS_RARE_EARTHS,
      priceData: PRICE_ASSESSMENTS_RARE_EARTHS,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
