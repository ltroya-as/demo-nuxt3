<template>
  <td class="text-sm font-semibold">
    <span v-if="isHighValue()" class="text-upTableIndicator">
      {{ valueAbsFixed() }}% ▲
    </span>
    <span v-else-if="isLowValue()" class="text-downTableIndicator">
      {{ valueAbsFixed() }}% ▼
    </span>
    <span v-else> {{ valueAbsFixed() }}% </span>
  </td>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isNeutralValue() {
      return this.valueAbsFixed() === '0.0'
    },
    isHighValue() {
      return this.value.gt(1) && !this.isNeutralValue()
    },
    isLowValue() {
      return this.value.lt(1) && !this.isNeutralValue()
    },
    valueAbsFixed() {
      return this.value.abs().toFixed(1)
    },
  },
}
</script>
