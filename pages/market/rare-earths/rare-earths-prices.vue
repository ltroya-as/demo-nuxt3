<template>
  <ProductPricePage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  />
</template>

<script>
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

import { MARKET, RARE_EARTHS } from '~/constants/services/constants'
import rareEarthsData from '~/constants/price-assessments/unauthorized/rare-earths'
import { PRICE_ASSESSMENTS_RARE_EARTHS } from '~/constants/services/price-assessments'

import ProductPricePage from '~/components/market/ProductPricePage.vue'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ProductPricePage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: RARE_EARTHS,
      productData: rareEarthsData,
      subscription: PRICE_ASSESSMENTS_RARE_EARTHS.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Prices`,
    })
  },
}
</script>
