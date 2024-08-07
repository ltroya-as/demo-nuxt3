<template>
  <ProductPricePage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { ANODE, MARKET } from '~/constants/services/constants'
import anodeData from '~/constants/price-assessments/unauthorized/anode'
import { PRICE_ASSESSMENTS_ANODE } from '~/constants/services/price-assessments'

import ProductPricePage from '~/components/market/ProductPricePage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ProductPricePage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: ANODE,
      productData: anodeData,
      subscription: PRICE_ASSESSMENTS_ANODE.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Prices`,
    })
  },
}
</script>
