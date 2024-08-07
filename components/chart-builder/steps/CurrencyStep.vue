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
      data-testid="currency-radio-buttons"
      :model-value="currencies"
      name="currencies"
      @update:model-value="updateOptions"
    />
    <div class="mt-6 flex items-center gap-x-3 sm:gap-x-1">
      <IconInfo class="min-h-4 min-w-4" />
      <span> {{ description }} </span>
    </div>
  </Step>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import IconInfo from '@/assets/icons/icon-info.svg'

import Step from '@/components/chart-builder/Step.vue'
import RadioList from '@/components/chart-builder/RadioList.vue'

export default {
  components: {
    IconInfo,
    Step,
    RadioList,
  },
  data() {
    return {
      description: 'All values are converted as per date of price publication',
    }
  },
  computed: {
    ...mapGetters({
      step: 'chartBuilder/steps/currencyStep',
      currentStep: 'chartBuilder/steps/currentStep',
      currencies: 'chartBuilder/catalog/currencies',
    }),
  },
  watch: {
    currencies: {
      handler(newCurrencies) {
        const selectedCurrency = newCurrencies.find(
          (currency) => currency.isSelected,
        )

        if (!selectedCurrency) return

        this.setCurrency(selectedCurrency.name)
        this.changeTitle(newCurrencies)
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      toggleOpenStep: 'chartBuilder/steps/toggleOpenStep',
      setCurrency: 'chartBuilder/config/setCurrency',
      changeTitleStep: 'chartBuilder/steps/changeTitleStep',
      setCurrencies: 'chartBuilder/catalog/setCurrencies',
    }),
    changeTitle(newCurrencies) {
      const currency = newCurrencies.find((currency) => currency.isSelected)
      const name = currency ? `(${currency.name})` : ''
      const title = `Currency ${name}`
      this.changeTitleStep({ title, stepId: 'currency' })
    },
    updateOptions(value) {
      this.setCurrencies(value)
    },
  },
}
</script>
