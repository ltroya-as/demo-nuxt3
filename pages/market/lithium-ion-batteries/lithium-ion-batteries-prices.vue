<template>
  <ProductPricePage
    :product="product"
    :product-data="productData"
    :subscription="subscription"
  />
</template>

<script>
/** @components */
import ProductPricePage from '~/components/market/ProductPricePage.vue'
/** @mixins */
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
/** @constants */
import { LITHIUM_ION_BATTERIES, MARKET } from '~/constants/services/constants'
import { PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES } from '~/constants/services/price-assessments'
import lithiumIonBatteriesData from '~/constants/price-assessments/unauthorized/lithium-ion-batteries'

definePageMeta({ layout: 'services' })

export default {
  components: {
    ProductPricePage,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      product: LITHIUM_ION_BATTERIES,
      productData: lithiumIonBatteriesData,
      subscription: PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: `${MARKET.name}: ${this.product.name} Prices`,
    })
  },
}
</script>
