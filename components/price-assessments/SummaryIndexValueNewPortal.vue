<template>
  <div :class="textColor" class="flex items-center justify-end gap-1">
    <span>{{ formattedValue }}</span>
    <div v-if="showIcon">
      <IconArrowDropUp
        v-if="isNumber"
        class="flex-shrink-0"
        :class="[textColor, isPositive ? 'rotate-180' : '']"
      />
      <div v-else :class="minusIconClasses"></div>
    </div>
  </div>
</template>

<script>
import { Decimal } from 'decimal.js'
import IconArrowDropUp from '~/assets/icons/arrow-drop-up.svg'

export default {
  components: {
    IconArrowDropUp,
  },

  props: {
    value: {
      type: Number,
      default: null,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      minusIconClasses: 'mx-[7px] h-[2px] w-[10px] rounded-full bg-black',
    }
  },

  computed: {
    formattedValue() {
      if (this.value === null) return '--'
      return `${new Decimal(this.value).toFixed(2)}%`
    },
    isNumber() {
      return !!Number(this.value)
    },
    isPositive() {
      return this.isNumber && Number(this.value) >= 0
    },
    textColor() {
      if (!Number(this.value)) return 'text-black'
      if (this.isPositive) return 'text-upTableIndicator'
      return 'text-downTableIndicator'
    },
  },
}
</script>
