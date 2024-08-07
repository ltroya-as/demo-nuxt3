<template>
  <div class="min-w-[920px] text-sm lg:text-base">
    <div class="bg-grey-300 grid grid-cols-10 px-6 py-3 font-semibold">
      <div class="col-span-4">Products</div>
      <div class="col-span-6 grid grid-cols-6 gap-3">
        <div>{{ isLithium ? '2WK' : '1M' }}</div>
        <div>YOY</div>
        <div>YTD</div>
        <div>Current</div>
        <div>Previous</div>
        <div class="text-right">Share</div>
      </div>
    </div>
    <div class="flex flex-col gap-8 p-6 text-sm lg:text-base">
      <PriceAssessmentsSummaryTableIndexSection
        v-for="(item, name) in summary"
        :key="name"
        :index-name="name.replace(/[_-]/g, ' ')"
        :index-data="item"
        :pricing-data="pricing"
        :authorized="authorized"
        :slug="slug"
      />
    </div>
  </div>
</template>

<script>
import PriceAssessmentsSummaryTableIndexSection from '~/components/price-assessments/SummaryTableIndexSection.vue'
export default {
  components: { PriceAssessmentsSummaryTableIndexSection },
  props: {
    summary: {
      type: Object,
      required: true,
    },
    pricing: {
      type: Array,
      required: true,
    },
    authorized: { type: Boolean, required: true },
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    isLithium() {
      return this.slug === 'lithium'
    },
  },
}
</script>
