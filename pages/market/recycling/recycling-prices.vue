<template>
  <ProductPricePage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { BLACK_MASS, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_BLACK_MASS } from '~/constants/services/price-assessments'

import ProductPricePage from '~/components/market/ProductPricePage.vue'
import blackMassData from '~/constants/price-assessments/unauthorized/black-mass'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ProductPricePage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: BLACK_MASS,
      productData: blackMassData,
      subscription: PRICE_ASSESSMENTS_BLACK_MASS.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Prices`,
    })
  },
}
</script>
