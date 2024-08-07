<template>
  <SustainabilityPage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  >
    The Benchmark Sustainability Index is a composite index that benchmarks
    lithium companies based on their degree of ESG transparency and performance.
    All lithium companies have been included in this Index and scored on 79
    indicators highlighting the most pressing topics of concern. Separate
    Environment, Social and Governance scores are calculated, along with an
    overarching composite ESG score, for each company in the upstream lithium
    supply chain. Companies are classified into four categories based on their
    performance: "Industry Leading", "Good Practice", "Moderate Visibility" and
    "Limited Visibility".
  </SustainabilityPage>
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { RARE_EARTHS, MARKET } from '~/constants/services/constants'
import { ESG_RARE_EARTHS } from '~/constants/services/esg'
import rareEarthsData from '~/constants/esg/rare-earths'

import SustainabilityPage from '~/components/market/SustainabilityPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    SustainabilityPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: RARE_EARTHS,
      productData: rareEarthsData,
      subscription: ESG_RARE_EARTHS.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Sustainability`,
    })
  },
}
</script>
