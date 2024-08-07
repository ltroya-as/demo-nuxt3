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

import { NICKEL, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_NICKEL } from '~/constants/services/price-assessments'
import { FORECASTS_NICKEL } from '~/constants/services/forecasts'
import { ESG_NICKEL } from '~/constants/services/esg'
import nickelData from '~/constants/esg/nickel'
import nickelPortalData from '~/constants/portal/nickel'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...NICKEL,
        ...nickelPortalData,
        title: NICKEL.name,
        icon: NICKEL.iconColor,
        categoryAnalysis: NICKEL.slug,
      },
      esgData: {
        ...ESG_NICKEL,
        sustainabilityIndexes: nickelData.sustainabilityIndexes,
      },
      forecastData: FORECASTS_NICKEL,
      priceData: PRICE_ASSESSMENTS_NICKEL,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
