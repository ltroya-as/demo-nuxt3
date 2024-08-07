<template>
  <Step
    v-if="currentStep >= step.requiredStep"
    :id="step.id"
    :title="step.title"
    :subtitle="step.subtitle"
    :is-completed="step.completed"
    :is-hidden="step.hidden"
    :data-testid="`${step.id}-step`"
    @toggle-hidden="toggleOpenStep(step.id)"
  >
    <template #actions>
      <Button
        data-testid="add-another-product-button"
        :disabled="!isValidProducts"
        :show-spinner="false"
        skip-width-classes
        variant="tertiary"
        class="group w-fit rounded-none !border-none !p-0 hover:!border-black/100 hover:!bg-transparent hover:!text-black/100"
        @click="addProduct"
      >
        <div class="flex items-center gap-x-2">
          <span class="leading-none">Add Product</span>
          <div
            :class="{
              'bg-disabled group-hover:bg-s-600': !isValidProducts,
              'bg-s-700': isValidProducts,
            }"
            class="rounded p-1 text-white"
          >
            <IconPlus class="h-4 w-4" />
          </div>
        </div>
      </Button>
    </template>

    <div class="flex flex-col gap-y-6">
      <Product
        v-for="(product, index) in products"
        :key="product.key"
        :counter="index + 1"
        :product="product"
      />
    </div>
  </Step>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import IconPlus from '~/assets/icons/plus.svg'

import Button from '@/components/common/Button.vue'
import Product from '@/components/chart-builder/Product.vue'
import Step from '@/components/chart-builder/Step.vue'

export default {
  components: {
    Step,
    IconPlus,
    Product,
    Button,
  },
  computed: {
    ...mapGetters({
      step: 'chartBuilder/steps/productsStep',
      currentStep: 'chartBuilder/steps/currentStep',
      products: 'chartBuilder/config/validProductsByUnits',
      isValidProducts: 'chartBuilder/config/isValidProducts',
    }),
  },
  methods: {
    ...mapActions({
      toggleOpenStep: 'chartBuilder/steps/toggleOpenStep',
      completedCurrentProduct: 'chartBuilder/config/completedCurrentProduct',
      addProductAction: 'chartBuilder/config/addProduct',
    }),
    addProduct() {
      this.completedCurrentProduct()
      const key = crypto.randomUUID()
      this.addProductAction({
        key,
        id: '',
        name: '',
        completed: false,
        config: null,
        valid: false,
      })
    },
  },
}
</script>
