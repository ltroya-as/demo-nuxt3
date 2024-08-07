<template>
  <ProductPricePage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { NATURAL_GRAPHITE, MARKET } from '~/constants/services/constants'
import naturalGraphiteData from '~/constants/price-assessments/unauthorized/natural-graphite'
import { PRICE_ASSESSMENTS_NATURAL_GRAPHITE } from '~/constants/services/price-assessments'

import ProductPricePage from '~/components/market/ProductPricePage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ProductPricePage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: NATURAL_GRAPHITE,
      productData: naturalGraphiteData,
      subscription: PRICE_ASSESSMENTS_NATURAL_GRAPHITE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Prices`,
    })
  },
}
</script>
