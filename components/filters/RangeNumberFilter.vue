<template>
  <div class="relative flex items-center gap-x-1">
    <RangeInput
      :min="min"
      :max="localMaxValue - 1"
      :value="localMinValue"
      @input="changeMinValue"
    />
    <RangeSlider
      :min-value="localMinValue"
      :max-value="localMaxValue"
      :gap="gap"
      :min="min"
      :max="max"
      class="flex-1"
      @change-min-value="changeRangeMinValue"
      @change-max-value="changeRangeMaxValue"
    />
    <RangeInput
      :min="localMinValue + 1"
      :max="max"
      :value="localMaxValue"
      @input="changeMaxValue"
    />
    <RangeErrorMessage
      v-if="error && errorValue"
      :value="errorValue"
      :title="error"
      :min="min"
      :max="max"
    />
  </div>
</template>

<script>
import RangeErrorMessage from '~/components/filters/RangeErrorMessage.vue'
import RangeInput from '~/components/filters/RangeInput.vue'
import RangeSlider from '~/components/filters/RangeSlider.vue'

export default {
  components: {
    RangeErrorMessage,
    RangeInput,
    RangeSlider,
  },
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    gap: {
      type: Number,
      default: 1,
    },
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
      error: 'Issue: Minimum range',
      errorValue: null,
    }
  },
  computed: {
    localMinValue: {
      get() {
        return this.minValue
      },
      set(value) {
        this.$emit('changeMinValue', value)
      },
    },
    localMaxValue: {
      get() {
        return Number(this.maxValue)
      },
      set(value) {
        this.$emit('changeMaxValue', value)
      },
    },
  },
  methods: {
    clearError() {
      this.error = null
      this.errorValue = null
    },
    changeRangeMinValue(value) {
      this.localMinValue = value
    },
    changeRangeMaxValue(value) {
      this.localMaxValue = value
    },
    changeMinValue({ target }) {
      if (this.timeout) clearTimeout(this.timeout)
      this.clearError()
      const value = parseInt(target.value)

      if (value < this.min) {
        target.value = this.localMinValue
        this.error = 'Issue: Minimum range'
        this.errorValue = this.localMinValue
        this.timeout = setTimeout(this.clearError, 3000)
        return
      }

      if (value > this.localMaxValue - this.gap) {
        target.value = this.localMinValue
        this.error = 'Issue: Minimum range'
        this.errorValue = this.localMinValue
        this.timeout = setTimeout(this.clearError, 3000)
        return
      }

      this.localMinValue = value
    },

    changeMaxValue({ target }) {
      if (this.timeout) clearTimeout(this.timeout)
      this.clearError()
      const value = parseInt(target.value)

      if (value > this.max) {
        target.value = this.localMaxValue
        this.error = 'Issue: Maximum range'
        this.errorValue = this.localMaxValue
        this.timeout = setTimeout(this.clearError, 3000)
        return
      }

      if (value < this.localMinValue + this.gap) {
        target.value = this.localMaxValue
        this.error = 'Issue: Maximum range'
        this.errorValue = this.localMaxValue
        this.timeout = setTimeout(this.clearError, 3000)
        return
      }

      this.localMaxValue = value
    },
  },
}
</script>
