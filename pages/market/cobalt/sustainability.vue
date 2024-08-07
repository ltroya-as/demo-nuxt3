<template>
  <SustainabilityPage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  >
    The Benchmark Sustainability Index is a composite index that benchmarks
    cobalt companies based on their degree of ESG transparency and performance.
    All cobalt companies have been included in this Index and scored on 79
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

import { COBALT, MARKET } from '~/constants/services/constants'
import { ESG_COBALT } from '~/constants/services/esg'
import cobaltData from '~/constants/esg/cobalt'

import SustainabilityPage from '~/components/market/SustainabilityPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    SustainabilityPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: COBALT,
      productData: cobaltData,
      subscription: ESG_COBALT.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Sustainability`,
    })
  },
}
</script>
