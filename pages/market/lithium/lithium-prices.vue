<template>
  <ProductPricePage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { LITHIUM, MARKET } from '~/constants/services/constants'
import lithiumData from '~/constants/price-assessments/unauthorized/lithium'
import { PRICE_ASSESSMENTS_LITHIUM } from '~/constants/services/price-assessments'

import ProductPricePage from '~/components/market/ProductPricePage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ProductPricePage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: LITHIUM,
      productData: lithiumData,
      subscription: PRICE_ASSESSMENTS_LITHIUM.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Prices`,
    })
  },
}
</script>
