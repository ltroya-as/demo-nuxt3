<template>
  <div data-testid="summary-table">
    <div
      v-if="disableFrequencyBySeries"
      class="bg-s-300 mb-2 grid grid-cols-10 rounded-t-lg pl-12 pr-6"
      data-testid="summary-table-price-dashboard-header"
    >
      <div class="col-span-4"></div>

      <div
        class="text-surface-em-high col-span-6 rounded-t-xl py-3 text-sm font-semibold capitalize md:px-7 lg:text-lg"
      >
        <div class="grid grid-cols-4 gap-x-3 text-lg">
          <div class="text-right leading-[26px]">Current</div>
          <div
            ref="latestChangeLabel"
            class="group flex cursor-pointer items-center justify-end gap-x-1 leading-[26px]"
          >
            Change
            <Icon name="exclamation-circle" class="group-hover:text-p-700" />
          </div>
          <div class="text-right leading-[26px]">YOY</div>
          <div class="text-right leading-[26px]">YTD</div>
        </div>
      </div>
    </div>
    <div
      class="relative min-h-[200px] px-6 pb-3.5"
      :class="disableFrequencyBySeries ? 'pt-2' : 'pt-4'"
    >
      <div
        v-for="(item, i) in priceSummary"
        :key="`${item.label}-${i}`"
        class="last:pb-2.5"
      >
        <div
          v-if="showProductName && !isProductNameRepeated(i)"
          class="bg-s-300 mb-4 mt-6 rounded-lg p-2 px-3 text-lg font-semibold"
        >
          {{ item.productName }}
        </div>
        <SummaryTableSectionNewPortal
          :label="item.label"
          :class-text-color="item.classTextColor"
          :data="item.values"
          :authorized="item.authorized"
          :category="category"
          :subscription="item.subscription || subscription"
          :frequency="getFrequency(item, i)"
          :show-pills="showPills"
          :is-sustainable="item.isSustainable"
          :initial-fields="getFieldsByProductName(item.productName)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import tippy from 'tippy.js'
import SummaryTableSectionNewPortal from '~/components/price-assessments/SummaryTableSectionNewPortal.vue'
import Icon from '~/components/common/Icon'

import { SIGN_IN, LITHIUM } from '~/constants/services/constants'
import { camelAndPascalCase } from '~/utils/string'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'

export default {
  components: {
    Icon,
    SummaryTableSectionNewPortal,
  },
  mixins: [AuthenticationMixin],
  props: {
    priceSummary: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      default: null,
    },
    disableFrequencyBySeries: {
      type: Boolean,
      default: false,
    },
    showPills: {
      type: Boolean,
      default: false,
    },
    initialFields: {
      type: Array,
      default: () => [],
    },
    showProductName: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      signInText: SIGN_IN,
    }
  },

  mounted() {
    tippy(this.$refs.latestChangeLabel, {
      content: `
        <div class="p-4 text-white text-sm rounded-lg" style="background: #23252c;">
            <div>
              The percentage change on last reported price. Frequency of price publication varies. Please refer to price methodologies for more information.
            </div>
        </div>
        `,
      allowHTML: true,
      maxWidth: 408,
      arrow: true,
      placement: 'bottom',
    })
  },

  methods: {
    isFrequencyRepeated(i) {
      const excludedMinerals = [LITHIUM.slug]
      if (i === 0 || excludedMinerals.includes(this.category)) return false

      return (
        this.priceSummary[i].frequency === this.priceSummary[i - 1].frequency
      )
    },
    isProductNameRepeated(i) {
      if (i === 0) return false
      return (
        this.priceSummary[i].productName ===
        this.priceSummary[i - 1].productName
      )
    },
    getFrequency(item, i) {
      if (this.isFrequencyRepeated(i) || this.disableFrequencyBySeries) {
        return ''
      }
      return item.frequency
    },
    getFieldsByProductName(productName) {
      if (!productName) return this.initialFields
      const { strKebabCase } = camelAndPascalCase(productName)
      return [strKebabCase, ...this.initialFields]
    },
  },
}
</script>
