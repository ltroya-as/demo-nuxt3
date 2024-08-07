<template>
  <div v-if="product" class="flex flex-col gap-y-6">
    <ProductActions
      :is-completed="product.completed"
      :product-name="product.name"
      :product-id="product.id"
      :counter="counter"
    />
    <div
      v-if="!product.completed && product.name"
      class="flex flex-col gap-y-6"
    >
      <CheckList
        :check-list="product.config"
        :selected-parents="[product.id]"
        @change-options="changeCheckList"
      />
    </div>
    <Button
      v-if="!product.completed"
      class="ml-auto !w-fit"
      variant="secondary"
      :disabled="!product.valid"
      :show-spinner="false"
      data-testId="done-button"
      @click="completedProduct"
    >
      Done
    </Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { changeHiddenOptions } from '~/utils/allPrices/price-chart-builder'
import { isValidConfig } from '~/utils/allPrices/chartBuilder/config'

import Button from '@/components/common/Button.vue'
import ProductActions from '@/components/chart-builder/ProductActions.vue'
import CheckList from '@/components/chart-builder/CheckList.vue'

export default {
  components: {
    Button,
    ProductActions,
    CheckList,
  },
  props: {
    product: {
      type: Object,
      default: () => ({
        name: '',
        config: null,
      }),
    },
    counter: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    ...mapActions({
      updateProduct: 'chartBuilder/config/updateProduct',
    }),
    completedProduct() {
      this.updateProduct({
        id: this.product.id,
        product: { completed: true },
      })
    },
    changeCheckList(options) {
      const newOptions = changeHiddenOptions(
        this.product.config?.options,
        options,
      )

      const config = { ...this.product.config, options: newOptions }
      const valid = isValidConfig(config)

      this.updateProduct({
        id: this.product.id,
        product: { valid, config },
      })
    },
  },
}
</script>
