<template>
  <div class="relative w-full" :class="[$attrs.class]">
    <div>
      <!-- viewer header -->
      <div class="relative flex w-full items-center justify-between font-bold">
        <!-- selector -->
        <div class="flex h-full">
          <PriceAssessmentsSummaryViewerTab
            :is-active="summaryFormat === 'table'"
            text="Table"
            @click="summaryFormat = 'table'"
          />
          <PriceAssessmentsSummaryViewerTab
            v-if="showIndex"
            :is-active="summaryFormat === 'chart'"
            text="Index"
            @click="summaryFormat = 'chart'"
          />

          <SwipeIndicator
            v-if="summaryFormat === 'table'"
            class="absolute left-1/2 top-[104px] z-[1] ml-3 -translate-x-1/2 md:flex lg:top-[108px] xl:hidden"
          />
        </div>
        <div class="hidden justify-end pb-2 md:flex">
          <SummaryDownloadButton :methodology-file-info="methodologyFileInfo" />
        </div>
      </div>

      <!-- viewer body -->
      <div class="shadow-pm rounded-b-xl bg-white">
        <transition
          enter-active-class="transition duration-300"
          leave-active-class="transition duration-300"
          enter-class="opacity-0"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <div
            v-if="summaryFormat === 'table'"
            class="relative overflow-x-auto"
          >
            <div
              class="min-w-[820px] lg:min-w-[400px] lg:max-w-2xl xl:min-w-[1000px] xl:max-w-none"
            >
              <PriceAssessmentsSummaryTableNewPortal
                class="w-auto lg:w-[1000px] xl:w-auto"
                :price-summary="priceSummary"
                :category="category"
                :subscription="subscription"
              />
            </div>
          </div>
          <div v-else class="overflow-x-auto">
            <PriceAssessmentsSummaryChartNewPortal
              :summary="detailedData"
              :table-summary="priceIndex.summary"
              :slug="slug"
              :title="title"
              :alt-title="altTitle"
            />
          </div>
        </transition>
      </div>
    </div>

    <div class="flex pt-6 md:hidden">
      <SummaryDownloadButton :methodology-file-info="methodologyFileInfo" />
    </div>
  </div>
</template>

<script>
import PriceAssessmentsSummaryViewerTab from '~/components/price-assessments/SummaryViewerTab.vue'
import SummaryDownloadButton from '~/components/price-assessments/SummaryDownloadButton.vue'
import SwipeIndicator from '~/components/price-assessments/SwipeIndicator.vue'

export default {
  components: {
    SwipeIndicator,
    SummaryDownloadButton,
    PriceAssessmentsSummaryViewerTab,
  },
  props: {
    priceIndex: {
      type: Object,
      required: true,
    },
    priceSummary: {
      type: Array,
      required: true,
    },
    methodologyFileInfo: {
      type: Object,
      default: () => null,
    },
    category: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    altTitle: {
      type: String,
      default: null,
      required: false,
    },
  },

  data() {
    const detailedData = {}
    this.priceIndex?.detailed?.forEach((product) => {
      detailedData[product.product] = product.data
    })

    return {
      summaryFormat: 'table',
      detailedData,
    }
  },

  computed: {
    showIndex() {
      return (
        Object.keys(this.detailedData).length > 0 &&
        Object.entries(this.detailedData).every(
          ([_, values]) => values.length > 0,
        )
      )
    },
  },

  watch: {
    summaryFormat(newVal) {
      this.setUrlQueryParams(newVal)
    },
  },

  mounted() {
    this.summaryFormat = this.setDefaultQueryParams()
  },

  methods: {
    setDefaultQueryParams() {
      const tabs = ['table', 'chart']
      const currentTab = this.$route.query.tab
      const defaultTab = tabs[0]

      if (tabs.includes(currentTab)) {
        return currentTab
      }

      this.setUrlQueryParams(defaultTab)

      return defaultTab
    },
    setUrlQueryParams(tab) {
      const url = `${this.$route.path}?tab=${tab}`

      if (typeof window !== 'undefined')
        window.history.pushState(this.slug, this.slug, url)
    },
  },
}
</script>
