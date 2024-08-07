<template>
  <ReportsPage
    :product="product"
    :product-data="productData"
    :forecast-subscription="forecastSubscription"
    :market-assessment-subscription="marketAssessmentSubscription"
  >
  </ReportsPage>
</template>

<script>
/** @components */
import ReportsPage from '~/components/market/ReportsPage.vue'
/** @constants */
import {
  LITHIUM_ION_BATTERIES,
  GIGAFACTORY_ASSESSMENT,
} from '~/constants/services/constants'
import { FORECASTS_LITHIUM_ION_BATTERIES } from '~/constants/services/forecasts'
import lithiumIonBatteriesData from '~/constants/data-reports/lithium-ion-batteries'
definePageMeta({ layout: 'services' })

export default {
  components: {
    ReportsPage,
  },
  data() {
    return {
      product: LITHIUM_ION_BATTERIES,
      productData: lithiumIonBatteriesData,
      forecastSubscription: FORECASTS_LITHIUM_ION_BATTERIES.subscription,
      marketAssessmentSubscription:
        GIGAFACTORY_ASSESSMENT.categoryReportPricing,
    }
  },
}
</script>
