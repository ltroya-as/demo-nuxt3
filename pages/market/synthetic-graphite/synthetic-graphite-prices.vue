<template>
  <ProductPricePage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { SYNTHETIC_GRAPHITE, MARKET } from '~/constants/services/constants'
import syntheticGraphiteData from '~/constants/price-assessments/unauthorized/synthetic-graphite'
import { PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE } from '~/constants/services/price-assessments'

import ProductPricePage from '~/components/market/ProductPricePage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ProductPricePage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: SYNTHETIC_GRAPHITE,
      productData: syntheticGraphiteData,
      subscription: PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Prices`,
    })
  },
}
</script>
