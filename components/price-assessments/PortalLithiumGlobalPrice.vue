<template>
  <div
    class="shadow-pm relative flex min-h-[640px] flex-col rounded-xl bg-white px-3 pb-9 pt-8"
  >
    <h3
      class="mb-2 flex w-full justify-start p-2 text-base font-semibold leading-5"
      data-testid="chart-title"
    >
      {{ titlePrices }}
    </h3>
    <div
      v-if="loadingPricesPortal"
      class="flex h-full w-full grow items-center justify-center"
    >
      <TheLoader />
    </div>
    <div v-else class="flex flex-col gap-6">
      <section class="flex w-full flex-col">
        <SimpleLineChart
          :key="updatedPricesPortal"
          css-classes="h-[311px] w-full"
          :chart-data="dataCollection"
          :y-axis-label="axisLabel"
          :is-mobile="isMobile()"
          :plugins="plugins"
        />
      </section>
      <section class="relative w-full">
        <div class="h-full w-full" data-testid="portal-summary-table">
          <div
            class="bg-s-300 flex justify-between rounded-lg px-3 py-2 pr-[60px] text-sm font-semibold leading-[17px] md:pr-[75px]"
            data-testid="portal-summary-table-header"
          >
            <div> {{ titlePricesSummary }} </div>
            <div>{{ selectedLabel }}</div>
          </div>
          <div data-testid="portal-summary-table-content">
            <div
              v-for="(prices, i) in pricesSummaryPortal"
              :key="`${prices.label}-${i}`"
            >
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
                  :slug="slug"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { CrosshairPlugin } from 'chartjs-plugin-crosshair'
import SimpleLineChart from './SimpleLineChart'
import TheLoader from '~/components/TheLoader.vue'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'
import { getClassesColor } from '~/utils/get-classes-color'
import IconPriceHighlightedLogo from '~/assets/icons/price-highlighted-logo.svg'

export default {
  components: {
    IconPriceHighlightedLogo,
    SimpleLineChart,
    TheLoader,
  },
  mixins: [ScreenSizeMixin],
  props: {
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    titlePrices: {
      type: String,
      default: null,
    },
    pricesPortal: {
      type: Array || [],
      required: true,
    },
    loadingPricesPortal: {
      type: Boolean,
      default: true,
    },
    titlePricesSummary: {
      type: String,
      default: null,
    },
    pricesSummaryPortal: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      updatedPricesPortal: 0,
      colors: [
        '#EA8000',
        '#FDC723',
        '#FEEBB2',
        '#92A678',
        '#374C33',
        '#7D2F59',
        '#BA86A2',
        '#F2A900',
        '#589F97',
      ],
      dataCollection: {
        labels: [],
        datasets: [],
      },
      plugins: [CrosshairPlugin],
      getClassesColor,
      selectedLabel: 'Current',
      filters: {
        Current: 'today',
      },
      yAxisLabel: '',
    }
  },
  computed: {
    pricesData() {
      return this.pricesPortal ?? []
    },
    axisLabel() {
      if (this.pricesData?.[0]?.currency.symbol !== '') {
        return `${this.pricesData?.[0]?.currency.iso}/${this.pricesData?.[0]?.unitOfMeasure.name}`
      }
      return 'Index Value'
    },
  },
  watch: {
    pricesData: {
      handler() {
        this.extractDatesByPricesData()
        this.setDatasetsByPricesData()
        this.updatedPricesPortal++
      },
      deep: true,
    },
  },
  methods: {
    extractDatesByPricesData() {
      const dates = new Set()
      this.pricesData?.forEach((item) => {
        item.series.forEach((serie) => {
          dates.add(serie.date)
        })
      })
      this.dataCollection.labels = [...dates].sort((a, b) => a - b)
    },

    setDatasetsByPricesData() {
      this.dataCollection.datasets = this.pricesData?.map((data, index) => {
        return {
          label: data.category.name,
          fill: false,
          yAxisID: 'y',
          digits: 0,
          unit: data.currency.symbol ?? '',
          spanGaps: true,
          lineTension: 0,
          borderColor: this.colors[index],
          backgroundColor: this.colors[index],
          data: data.series.map((serie) => ({
            x: serie.date,
            y: serie.valueMid,
          })),
        }
      })
    },
  },
}
</script>
