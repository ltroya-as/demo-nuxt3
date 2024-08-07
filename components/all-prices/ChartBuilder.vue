<template>
  <div>
    <Drawer :is-open="isOpen" @close="close">
      <div
        v-if="isOpen"
        class="flex h-full max-w-[636px] flex-col sm:min-w-[600px]"
        data-testid="chart-Builder-container"
      >
        <Header :data-series="series" :progress="progress" @close="close" />
        <div class="flex-1 overflow-y-auto overflow-x-hidden px-6 pb-8 pt-3">
          <UnitsMeasurement
            class="mb-6"
            :units="unitsMeasurement"
            :show-warning="selectedUnits.length > 1"
            :is-open="isOpen"
          />
          <template
            v-for="step in steps"
            :key="`chart-prices-builder-${id}-${step.id}`"
          >
            <component :is="getComponent(step.id)" />
          </template>
        </div>
        <Footer
          :data-series="series"
          :disabled-next="disabledNext"
          :next-title="nextTitle"
          @next="nextStep"
          @reset="$modal.open('chartBuilderReset')"
        />
      </div>
    </Drawer>
    <ResetModal
      v-if="$store.state.modal.chartBuilderResetOpen"
      @close="$modal.close('chartBuilderReset')"
      @reset="resetBuilder"
    />
    <CloseModal
      v-if="$store.state.modal.chartBuilderCloseOpen"
      @close="$modal.close('chartBuilderClose')"
      @confirm="confirmClose"
    />
    <DataSeriesWarningModal
      v-if="$store.state.modal.chartBuilderDataSeriesWarningOpen"
      @close="$modal.close('chartBuilderDataSeriesWarning')"
      @confirm="confirmWarning"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  formatBuilderProduct,
  getSelectedUnits,
  loadProductsByBuilder,
} from '@/utils/allPrices/chartBuilder/config'
import { STEPS } from '~/constants/all-prices/chart-builder'

import Drawer from '@/components/common/Drawer.vue'
import Footer from '@/components/chart-builder/Footer.vue'
import Header from '@/components/chart-builder/Header.vue'
import Step from '@/components/chart-builder/Step.vue'
import UnitsMeasurement from '@/components/chart-builder/UnitsMeasurement.vue'
import ResetModal from '@/components/chart-builder/ResetModal.vue'
import CloseModal from '@/components/chart-builder/CloseModal.vue'
import DataSeriesWarningModal from '@/components/chart-builder/DataSeriesWarningModal.vue'

import ProductsStep from '@/components/chart-builder/steps/ProductsStep.vue'
import CurrencyStep from '@/components/chart-builder/steps/CurrencyStep.vue'
import UnitStep from '@/components/chart-builder/steps/UnitStep.vue'

const stepComponents = {
  products: ProductsStep,
  currency: CurrencyStep,
  unit: UnitStep,
}

export default {
  components: {
    Drawer,
    Header,
    Footer,
    Step,
    UnitsMeasurement,
    ResetModal,
    CloseModal,
    DataSeriesWarningModal,
  },
  props: {
    builder: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      id: 'chart-builder',
      stepComponents,
    }
  },
  computed: {
    ...mapGetters({
      series: 'chartBuilder/config/series',
      isOpen: 'chartBuilder/isOpen',
      steps: 'chartBuilder/steps/steps',
      progress: 'chartBuilder/steps/progress',
      currentStep: 'chartBuilder/steps/currentStep',
      unitsMeasurement: 'chartBuilder/unitsMeasurement/unitsMeasurement',
      selectedUnits: 'chartBuilder/unitsMeasurement/selectedUnits',
      products: 'chartBuilder/config/products',
      currency: 'chartBuilder/config/currency',
      unit: 'chartBuilder/config/unit',
      isEditing: 'chartBuilder/config/isEditing',
      validateProducts: 'chartBuilder/config/validateProducts',
      validateCurrency: 'chartBuilder/config/validateCurrency',
      validateUnit: 'chartBuilder/config/validateUnit',
      nextTitle: 'chartBuilder/steps/nextTitle',
      havePayableAndKWH: 'chartBuilder/unitsMeasurement/havePayableAndKWH',
      catalogProducts: 'chartBuilder/catalog/products',
      hasCatalogProducts: 'chartBuilder/catalog/hasProducts',
      hasOnlyPayable: 'chartBuilder/unitsMeasurement/hasOnlyPayable',
    }),
    disabledNext() {
      let steps = {}

      if (this.hasOnlyPayable) {
        steps = {
          1: !this.validateProducts,
          2: !this.validateUnit,
        }
      } else {
        steps = {
          1: !this.validateProducts,
          2: !this.validateCurrency,
          3: !this.validateUnit,
        }
      }

      return steps[this.currentStep]
    },
  },
  watch: {
    products: {
      handler(newProducts) {
        const unitsOfMeasure = getSelectedUnits(newProducts)
        this.setSelectedUnits(unitsOfMeasure)
        const count = newProducts.filter(
          (product) => product.name !== '',
        ).length
        const productStepName = count > 0 ? `Products (${count})` : 'Products'
        this.changeTitleStep({ title: productStepName, stepId: 'products' })
      },
      deep: true,
    },
    hasOnlyPayable(newValue) {
      if (this.currentStep === 1) return
      if (newValue) {
        this.setCurrentStep(2)
        return
      }

      this.completeStep('currency')
      this.setOpenStep({ stepId: 'currency', open: true })
      this.setCurrentStep(3)
      this.autoPopulate()
    },
    isEditing(value) {
      if (!value) this.resetBuilder()
    },
  },
  mounted() {
    this.autoPopulate()
    this.initializeBuilder()
  },
  methods: {
    ...mapActions({
      changeTitleStep: 'chartBuilder/steps/changeTitleStep',
      addPayableUnit: 'chartBuilder/catalog/addPayableUnit',
      addKWHUnit: 'chartBuilder/catalog/addKWHUnit',
      setSteps: 'chartBuilder/steps/setSteps',
      autoPopulate: 'chartBuilder/autoPopulate',
      reset: 'chartBuilder/reset',
      setSelectedUnits: 'chartBuilder/unitsMeasurement/setSelectedUnits',
      completeStep: 'chartBuilder/steps/completeStep',
      completedCurrentProduct: 'chartBuilder/config/completedCurrentProduct',
      setCurrentStep: 'chartBuilder/steps/setCurrentStep',
      setOpenStep: 'chartBuilder/steps/setOpenStep',
      loadProducts: 'chartBuilder/config/loadProducts',
      selectCurrency: 'chartBuilder/catalog/selectCurrency',
      selectUnit: 'chartBuilder/catalog/selectUnit',
    }),
    initializeBuilder() {
      this.loadBuilder(this.builder)

      this.$watch(
        () => [this.isOpen, this.builder],
        ([isOpen, builder]) => {
          if (!isOpen) return

          this.loadBuilder(builder)
        },
        { deep: true, immediate: true },
      )
    },
    getComponent(stepId) {
      const component = stepComponents[stepId]
      return component || 'div'
    },
    close() {
      if (!this.isEditing) this.$emit('close')
      else this.$modal.open('chartBuilderClose')
    },
    nextStep() {
      const canBuild = this.currentStep === this.steps.length
      const canShowWarning =
        this.series > 10 && (this.steps.length === 1 || this.currentStep === 1)

      if (canShowWarning) {
        this.$modal.open('chartBuilderDataSeriesWarning')
        return
      }

      if (canBuild) return this.buildChart()
      if (this.hasOnlyPayable) return this.nextToUnitsFromProducts()

      const steps = {
        1: this.nextToCurrencyStep,
        2: this.nextToUnitStep,
      }

      steps[this.currentStep]()
    },
    nextToCurrencyStep() {
      this.completeStep('products')
      this.setOpenStep({ stepId: 'products', open: false })
      this.setOpenStep({ stepId: 'currency', open: true })
      this.setCurrentStep(2)
      this.completedCurrentProduct()
      this.$modal.close('chartBuilderDataSeriesWarning')
    },
    nextToUnitStep() {
      this.completeStep('currency')
      this.setOpenStep({ stepId: 'currency', open: false })
      this.setOpenStep({ stepId: 'unit', open: true })
      this.setCurrentStep(3)
    },
    nextToUnitsFromProducts() {
      this.completeStep('products')
      this.setOpenStep({ stepId: 'products', open: false })
      this.setOpenStep({ stepId: 'unit', open: true })
      this.setCurrentStep(2)
      this.completedCurrentProduct()
    },
    buildChart() {
      this.completedCurrentProduct()

      const products = this.products.map(formatBuilderProduct)
      const params = this.hasOnlyPayable
        ? { products }
        : { products, currency: this.currency, unit: this.unit }

      this.$emit('build-chart', { params, series: this.series })
    },
    resetBuilder() {
      this.id = crypto.randomUUID()
      this.reset()
      this.$modal.close('chartBuilderReset')
    },
    confirmClose() {
      this.$modal.close('chartBuilderClose')
      this.resetBuilder()
      this.$emit('close')
    },
    confirmWarning() {
      if (this.steps.length > 1) this.nextToCurrencyStep()
      else this.buildChart()
      this.$modal.close('chartBuilderDataSeriesWarning')
    },
    loadBuilder(builder) {
      if (!this.hasCatalogProducts) return
      if (!builder) return
      const { products, unit, currency } = builder

      const newProducts = loadProductsByBuilder(this.catalogProducts, products)
      const newSteps = STEPS.map((step) => ({
        ...step,
        hidden: true,
        completed: true,
      }))
      newSteps[0].hidden = false

      this.setSteps(newSteps)
      this.setCurrentStep(3)
      this.selectCurrency(currency)
      this.selectUnit(unit)
      this.loadProducts(newProducts)

      this.$emit('change-series', this.series)
    },
  },
}
</script>
