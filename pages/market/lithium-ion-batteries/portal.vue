<template>
  <PortalPage
    :forecast-data="forecastData"
    :price-data="priceData"
    :general="general"
  />
</template>

<script>
/** @components */
import PortalPage from '~/components/shared/price-assessments/PortalPage.vue'
/** @mixins */
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
/** @constants */
import { LITHIUM_ION_BATTERIES, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES } from '~/constants/services/price-assessments'
import { FORECASTS_LITHIUM_ION_BATTERIES } from '~/constants/services/forecasts'
import lithiumIonBatteriesPortalData from '~/constants/portal/lithium-ion-batteries'

definePageMeta({ layout: 'services' })

export default {
  components: { PortalPage },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      general: {
        ...LITHIUM_ION_BATTERIES,
        ...lithiumIonBatteriesPortalData,
        title: LITHIUM_ION_BATTERIES.name,
        icon: LITHIUM_ION_BATTERIES.iconColor,
        categoryAnalysis: LITHIUM_ION_BATTERIES.slug,
        hideSustainabilityIndex: true,
      },
      forecastData: FORECASTS_LITHIUM_ION_BATTERIES,
      priceData: PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.general.title} Portal`,
    })
  },
}
</script>
