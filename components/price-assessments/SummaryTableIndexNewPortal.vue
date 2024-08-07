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
      <PriceAssessmentsSummaryTableIndexSectionNewPortal
        v-for="index in summary"
        :key="index.product"
        :index-name="index.product"
        :index-data="index.data"
        :slug="slug"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    summary: {
      type: Array,
      required: true,
    },
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
