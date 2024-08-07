<template>
  <div class="flex justify-between gap-2 pt-2 text-sm">
    <span>{{ price.name }}</span>
    <div class="flex items-center gap-1 text-left font-semibold tabular-nums">
      <div
        v-if="isTodaySelected"
        class="flex items-center"
        :class="isTodaySelected ? todayColorClass : colorClass"
      >
        {{ formattedValue }}
        <IconChevronDown
          v-if="isTodaySelected && !isTodayEqualToLast"
          class="ml-1 h-6 md:ml-2"
          :class="[{ 'rotate-180': isTodayGreaterThanLast }]"
        />
        <div
          v-else-if="isTodaySelected"
          class="ml-1 flex h-6 items-center justify-center px-[6px] md:ml-2"
        >
          <div class="h-[2px] w-3 bg-black"></div>
        </div>
      </div>
      <PriceAssessmentsSummaryIndexValueNewPortal
        v-else
        :value="price[selectedFilter]"
        :show-icon="false"
      />
      <span class="h-6 w-6 md:h-[28px] md:w-[28px]">
        <TooltipShare
          v-if="showTwitterLogo"
          :key="selectedValue"
          :twitter-link="twitterLink"
          :linkedin-link="getRouteToShare()"
          :linkedin-shareable-title="`${price.name} Index`"
          :link="getRouteToShare()"
          class="text-black"
          share-icon-class="h-4 w-4 md:h-5 md:w-5"
        />
      </span>
    </div>
  </div>
</template>

<script>
import { Decimal } from 'decimal.js'
import IconChevronDown from '~/assets/icons/ChevronDown.svg'
import { MARKET } from '~/constants/services/constants'
import { numberFormatter } from '~/utils/number'
import TooltipShare from '@/components/TooltipShare.vue'

export default {
  components: {
    IconChevronDown,
    TooltipShare,
  },

  props: {
    price: {
      type: Object,
      required: true,
    },
    parentPriceName: {
      type: String,
      required: true,
    },
    selectedLabel: {
      type: String,
      required: true,
    },
    selectedFilter: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },

  computed: {
    selectedValue() {
      if (this.price[this.selectedFilter] === null) return '--'
      return numberFormatter(this.price[this.selectedFilter], 2, true)
    },
    formattedValue() {
      if (this.selectedValue === '--') return this.selectedValue
      if (this.isTodaySelected && this.price.currency === '$') {
        return `${this.price.currency}${this.selectedValue}`
      }
      return `${this.selectedValue}%`
    },
    formattedValueForTwitter() {
      if (this.isTodaySelected)
        return `$${new Decimal(this.selectedValue.replace(',', '')).toFixed(0)}`
      return `${this.selectedValue}%`
    },
    showPercentage() {
      return this.selectedFilter !== 'today' && this.selectedFilter !== 'last'
    },
    colorClass() {
      const value = parseFloat(this.selectedValue) || 0
      if (this.isLastSelected) return ''
      if (value === 0) return ''
      if (value > 0) return 'text-green-light'
      return 'text-error-light'
    },
    isTodaySelected() {
      return this.selectedFilter === 'today'
    },
    isLastSelected() {
      return this.selectedFilter === 'last'
    },
    todayColorClass() {
      if (this.price.today === this.price.last) return ''
      if (this.isTodayGreaterThanLast) return 'text-green-light'
      return 'text-error-light'
    },
    isTodayGreaterThanLast() {
      return this.price.today > this.price.last
    },
    isTodayEqualToLast() {
      return this.price.today === this.price.last
    },
    showTwitterLogo() {
      return (
        this.price.name.includes('Global Weighted Average') ||
        this.price.isPublic
      )
    },
    post() {
      const isEqual =
        `${this.price.name} index`?.toLowerCase() ===
        this.parentPriceName?.toLowerCase()
      const title = isEqual
        ? `${this.parentPriceName}`
        : `${this.parentPriceName}\n${this.price.name}`
      return encodeURIComponent(`${title}
====================
${this.selectedLabel}: ${this.formattedValueForTwitter}

Source: @Benchmarkmin
See more at ${this.getRouteToShare()}
`)
    },
    twitterLink() {
      return `https://twitter.com/intent/tweet?text=${this.post}`
    },
  },

  methods: {
    getRouteToShare() {
      if (
        [
          'lithium-prices',
          'lithium-ion-battery-prices',
          'lithium-ion-battery-raw-material-index',
        ].includes(this.slug)
      ) {
        return `https://www.benchmarkminerals.com/${this.slug}/?tab=chart`
      }
      return `https://www.benchmarkminerals.com/${MARKET.slug}/${this.slug}/portal/`
    },
  },
}
</script>
