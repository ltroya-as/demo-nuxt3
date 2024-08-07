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

import { COBALT, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_COBALT } from '~/constants/services/price-assessments'
import { FORECASTS_COBALT } from '~/constants/services/forecasts'
import { ESG_COBALT } from '~/constants/services/esg'
import cobaltData from '~/constants/esg/cobalt'
import cobaltPortalData from '~/constants/portal/cobalt'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...COBALT,
        ...cobaltPortalData,
        title: COBALT.name,
        icon: COBALT.iconColor,
        categoryAnalysis: COBALT.slug,
      },
      esgData: {
        ...ESG_COBALT,
        sustainabilityIndexes: cobaltData.sustainabilityIndexes,
      },
      forecastData: FORECASTS_COBALT,
      priceData: PRICE_ASSESSMENTS_COBALT,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
