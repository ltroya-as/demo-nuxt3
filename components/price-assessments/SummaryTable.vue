<template>
  <div>
    <div class="relative min-h-[200px] px-6 pb-3.5 pt-4">
      <div
        v-for="(item, i) in pricing"
        :key="`${item.label}-${i}`"
        class="last:pb-2.5"
      >
        <PriceAssessmentsSummaryTableSection
          :label="item.label"
          :data="item.values"
          :class-text-color="item?.classTextColor ?? 'text-surface-em-high'"
          :authorized="authorized"
          :category="category"
          :subscription="subscription"
          :frequency="getFrequency(item?.frequency, item.label, i)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PriceAssessmentsSummaryTableSection from '~/components/price-assessments/SummaryTableSection.vue'
import { SIGN_IN } from '~/constants/services/constants'

export default {
  components: { PriceAssessmentsSummaryTableSection },
  props: {
    summary: {
      type: Object,
      required: true,
    },
    pricing: {
      type: Array,
      required: true,
    },
    authorized: Boolean,
    category: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      signInText: SIGN_IN,
    }
  },
  methods: {
    getFrequency(frequency, label, i) {
      if (this.isFrequencyRepeated(i)) return ''
      if (frequency) return frequency
      return this.getUpdateFrequency(label)
    },
    getUpdateFrequency(label) {
      // this method need refactor, this.summary is undefined
      const summary = Object.values(this.summary).find(
        (summary) => summary.label === label,
      )
      return summary?.updateFrequency ?? '1M'
    },
    isFrequencyRepeated(i) {
      if (i === 0) return false

      return (
        this.getUpdateFrequency(this.pricing[i].label) ===
        this.getUpdateFrequency(this.pricing[i - 1].label)
      )
    },
  },
}
</script>
