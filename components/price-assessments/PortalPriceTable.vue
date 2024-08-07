<template>
  <div class="rounded-xl">
    <div class="bg-s-300 relative flex justify-end rounded-t-xl p-3">
      <div class="pr-7 md:px-3">
        <div
          class="flex cursor-pointer items-center gap-1 text-left text-lg font-semibold transition-all"
          @click="isMenuOpen = !isMenuOpen"
        >
          {{ selectedLabel }}
          <span>
            <IconChevronDown
              class="transition-transform"
              :class="isMenuOpen && 'rotate-180'"
            />
          </span>
        </div>
        <div
          v-show="isMenuOpen"
          class="absolute right-0 z-10 flex w-full flex-col bg-white shadow-lg transition-all"
        >
          <span
            v-for="label in Object.keys(filters)"
            :key="label"
            class="hover:bg-s-200 cursor-pointer p-2"
            @click="
              () => {
                selectedLabel = label
                isMenuOpen = false
              }
            "
          >
            {{ label }}
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="pricing.length"
      class="rounded-b-xl bg-white px-3 pb-5 pt-1 xl:pb-0"
    >
      <div v-for="(prices, i) in pricing" :key="`${prices.label}-${i}`">
        <div v-if="!isFrequencySelected || isSelectedValue(prices.frequency)">
          <div
            class="border-p-400 flex border-b-2 p-3 pb-[6px] font-semibold"
            :style="`color: ${getClassesColor(prices.classTextColor)}`"
          >
            {{ prices.label }}
            <IconPriceHighlightedLogo
              v-if="prices.classTextColor === 'industry-leading'"
              class="ml-2"
            />
          </div>
          <div class="pl-3 md:px-3">
            <PriceAssessmentsPortalPriceTableRow
              v-for="price in prices.values"
              :key="price.name"
              :style="`color: ${getClassesColor(price.classTextColor)}`"
              :price="price"
              :parent-price-name="prices.label"
              :selected-label="selectedLabel"
              :selected-filter="filters[selectedLabel]"
              slug="lithium"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconChevronDown from '~/assets/icons/ChevronDown.svg'
import IconPriceHighlightedLogo from '~/assets/icons/price-highlighted-logo.svg'
import { getClassesColor } from '~/utils/get-classes-color'

export default {
  components: {
    IconChevronDown,
    IconPriceHighlightedLogo,
  },

  props: {
    pricing: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isMenuOpen: false,
      selectedLabel: 'Current',
      filters: {
        Current: 'today',
        '1WK': 'latestChange',
        '2WK': 'latestChange',
        YOY: 'yearOnYear',
        YTD: 'yearToDate',
      },
      getClassesColor,
    }
  },

  computed: {
    isFrequencySelected() {
      return this.selectedLabel === '2WK' || this.selectedLabel === '1WK'
    },
  },

  methods: {
    indexPercentageColor(value) {
      value = parseFloat(value) || 0
      if (value === 0) return 'text-s-500'
      if (value > 0) return 'text-green-light'
      return 'text-error-light'
    },
    isSelectedValue(value) {
      return value.toUpperCase() === this.selectedLabel
    },
  },
}
</script>
