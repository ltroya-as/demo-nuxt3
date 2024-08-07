<template>
  <SustainabilityPage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  >
    The Benchmark Sustainability Index is a composite index that benchmarks
    graphite companies based on their degree of ESG transparency and
    performance. All graphite companies have been included in this Index and
    scored on 79 indicators highlighting the most pressing topics of concern.
    Separate Environment, Social and Governance scores are calculated, along
    with an overarching composite ESG score, for each company in the upstream
    graphite supply chain. Companies are classified into four categories based
    on their performance: "Industry Leading", "Good Practice", "Moderate
    Visibility" and "Limited Visibility".
  </SustainabilityPage>
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { NATURAL_GRAPHITE, MARKET } from '~/constants/services/constants'
import { ESG_GRAPHITE } from '~/constants/services/esg'
import graphiteData from '~/constants/esg/natural-graphite'

import SustainabilityPage from '~/components/market/SustainabilityPage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    SustainabilityPage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: NATURAL_GRAPHITE,
      productData: graphiteData,
      subscription: ESG_GRAPHITE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Sustainability`,
    })
  },
}
</script>
