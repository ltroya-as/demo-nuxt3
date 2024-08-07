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
    <RadioList
      data-testid="unit-radio-buttons"
      :model-value="filteredUnits"
      name="units"
      @update:model-value="updateOptions"
    />
  </Step>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  getUnitsWithKWH,
  getUnitsWithPayable,
} from '~/utils/allPrices/chartBuilder/config'

import Step from '@/components/chart-builder/Step.vue'
import RadioList from '@/components/chart-builder/RadioList.vue'

export default {
  components: { RadioList, Step },
  computed: {
    ...mapGetters({
      step: 'chartBuilder/steps/unitStep',
      currentStep: 'chartBuilder/steps/currentStep',
      havePayableAndKWH: 'chartBuilder/unitsMeasurement/havePayableAndKWH',
      selectedUnits: 'chartBuilder/unitsMeasurement/selectedUnits',
      units: 'chartBuilder/catalog/units',
    }),
    filteredUnits() {
      let units = this.units

      if (this.havePayableAndKWH) units = []

      const newUnits = getUnitsWithKWH({
        units,
        selectedUnits: this.selectedUnits,
      })
      return getUnitsWithPayable({
        units: newUnits,
        selectedUnits: this.selectedUnits,
      })
    },
  },
  watch: {
    filteredUnits: {
      handler(newUnits) {
        const selectedUnit = newUnits
          .filter((unit) => !unit.readOnly)
          .find((unit) => unit.isSelected)

        const symbol = selectedUnit ? selectedUnit.symbol : null
        const name = selectedUnit ? selectedUnit.name : null

        this.setUnit(symbol)
        this.changeTitle(name)
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      toggleOpenStep: 'chartBuilder/steps/toggleOpenStep',
      setUnit: 'chartBuilder/config/setUnit',
      changeTitleStep: 'chartBuilder/steps/changeTitleStep',
      setUnits: 'chartBuilder/catalog/setUnits',
    }),
    changeTitle(unitName) {
      const name = unitName ? `(${unitName})` : ''
      const title = `Units ${name}`
      this.changeTitleStep({ title, stepId: 'unit' })
    },
    updateOptions(value) {
      this.setUnits(value)
    },
  },
}
</script>
