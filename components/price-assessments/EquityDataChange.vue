<template>
  <div class="flex h-full items-center justify-end gap-1">
    <span>{{ formattedDifference }} ({{ change }}%)</span>
    <div
      v-if="isPercentageChangeZero"
      class="mx-1 h-[2px] w-2 flex-shrink-0"
      :style="`background: ${indexPercentageColor};`"
    ></div>
    <div v-else :style="`color: ${indexPercentageColor};`">
      <IconLeftAngle
        class="h-4 w-4 flex-shrink-0 -rotate-90"
        :class="
          (isPercentageChangeGreaterThanZero && 'rotate-90 ') + iconAngleHidden
        "
      />
    </div>
  </div>
</template>

<script>
import { numberFormatter } from '@/utils/number'
import IconLeftAngle from '@/assets/icons/angle-left.svg'
export default {
  components: {
    IconLeftAngle,
  },
  computed: {
    change() {
      if (this.params.data.change === 0) return 0
      return numberFormatter(this.params.data.change, 2, false)
    },
    difference() {
      const previousClose = this.params.data.previousClose
      const currentPrice = this.params.data.currentPrice
      const difference = currentPrice - previousClose
      return difference
    },
    formattedDifference() {
      const formattedNumber = numberFormatter(this.difference, 2, true)
      if (formattedNumber) return formattedNumber
      return '0.00'
    },
    isPercentageChangeZero() {
      return this.difference === 0
    },
    isPercentageChangeGreaterThanZero() {
      return parseFloat(this.difference) > 0
    },
    iconAngleHidden() {
      return this.isPercentageChangeZero && ' hidden'
    },
    indexPercentageColor() {
      const greenLight = '#4bbf7c'
      const errorLight = '#d94761'
      const black = '#000'
      if (this.difference > 0) return greenLight
      else if (this.difference < 0) return errorLight
      else return black
    },
  },
}
</script>
