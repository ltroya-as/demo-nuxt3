<template>
  <div
    id="chart-canvas"
    class="align-center relative flex min-h-[70vh] flex-1 flex-col pt-5"
  >
    <div
      class="mb-4 flex flex-col lg:mb-0 lg:flex-row lg:items-center lg:justify-between"
    >
      <!-- Chart Title -->
      <div
        class="z-30 flex flex-grow flex-col gap-x-3 pb-3 lg:absolute lg:bottom-full lg:right-0 lg:flex-row lg:pb-0"
      >
        <button
          class="remove-me bg-s-900 mb-3 flex items-center justify-center rounded px-4 py-2 font-semibold text-white lg:hidden"
          @click="openFiltersModal"
        >
          <span
            class="font-montserrat mr-3 w-full text-left text-sm font-semibold lg:w-auto lg:text-xs"
          >
            Filters
          </span>
          <ChevronDown class="h-6 w-6 group-hover:rotate-180" />
        </button>
        <div v-if="authorized" class="remove-me group relative inline-block">
          <button
            data-testid="chart-download-button"
            class="border-s-500 text-s-900 inline-flex w-full items-center justify-center rounded border bg-white px-4 py-2 font-semibold disabled:opacity-25 lg:px-3"
            :disabled="!showGraph || loading"
          >
            <span
              class="font-montserrat mr-5 w-full text-left text-sm font-semibold lg:w-auto lg:text-xs"
            >
              Download
            </span>
            <ChevronDown
              class="h-6 w-6"
              :class="[showGraph && !loading ? 'group-hover:rotate-180' : '']"
            />
          </button>
          <div
            class="bg-s-50 absolute hidden w-full rounded py-1 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            :class="[showGraph && !loading ? 'group-hover:block' : '']"
          >
            <button
              data-testid="chart-download-csv-button"
              type="button"
              class="bg-s-50 hover:bg-p-200 relative mx-auto flex w-full flex-row items-center overflow-hidden px-3 py-2 text-black"
              @click="downloadAsXlsx"
            >
              <span class="flex gap-x-2 text-xs font-normal lg:hidden">
                <DownloadReportIcon class="h-4 w-4" />
                Download XLSX
              </span>
              <span class="hidden text-xs font-normal lg:block"> XLSX </span>
            </button>
            <button
              data-testid="chart-download-png-button"
              type="button"
              class="bg-s-50 hover:bg-p-200 relative mx-auto flex w-full flex-row items-center overflow-hidden px-3 py-2 text-black"
              @click="downloadAsPNGImage"
            >
              <span class="flex gap-x-2 text-xs font-normal lg:hidden">
                <DownloadReportIcon class="h-4 w-4" />
                Download PNG
              </span>
              <span class="hidden text-xs font-normal lg:block"> PNG </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ChartSidebar
      class="remove-me"
      :mineral="category"
      :start-date="startDate"
      :end-date="endDate"
      :min-date="minDate"
      :disable-downloads="!showGraph || loading"
      :required-filters="requiredFilters"
      :subscription="subscription"
      :disabled="showOverlay"
      @download-csv="downloadAsXlsx"
      @download-chart="downloadAsPNGImage"
      @update-chart-options="updateChartOptions"
      @update-message="updateMessage"
      @start-date-updated="(_value) => (startDate = _value)"
      @end-date-updated="(_value) => (endDate = _value)"
      @apply-filters="applyFilters"
    />
    <div v-if="loading" class="absolute left-0 top-44 w-full lg:top-72">
      <TheLoader />
    </div>

    <div v-else class="flex flex-col">
      <!-- chart -->

      <div
        v-if="showGraph"
        class="relative flex flex-1 items-stretch justify-center"
      >
        <SubscriptionOverlay :show-overlay="showOverlay" />
        <div class="flex flex-1 items-stretch justify-center">
          <ChartContainer
            class="z-10"
            :title="title"
            :raw-data="rawData"
            :number-digits="numberDigits"
            :y-axis-label="yAxisLabel"
            :categories-order="categories"
            :replace-legend="replaceLegend"
          />
        </div>
        <BenchmarkWatermark top-class="top-52" />
      </div>

      <!-- messages -->
      <div v-else class="flex flex-1 items-center justify-center">
        <div class="flex flex-col items-center justify-center px-6">
          <IconChart class="mb-6 h-36 w-32 object-contain" />
          <div class="mb-3 flex">
            <IconGreetingPerson
              class="mb-1 h-6 w-6 object-scale-down"
              src="~assets/icons/GreetingPerson.svg"
            />
            <div class="font-semibold">Almost there!</div>
          </div>
          <div v-for="message in messages" :key="message" class="text-sm">
            {{ messages.length > 1 ? '-' : '' }} {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
import { format, parseISO, sub } from 'date-fns'
import isEmpty from 'lodash/isEmpty'
import { mapGetters } from 'vuex'
import DownloadChartMixin from '@/mixins/DownloadChartMixin'
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import DownloadReportIcon from '~/assets/icons/DownloadReportIcon.svg'
import ChevronDown from '~/assets/icons/ChevronDown.svg'
import IconChart from '~/assets/icons/Chart.svg'
import IconGreetingPerson from '~/assets/icons/GreetingPerson.svg'
import {
  isLithiumIonBatteries,
  objectToXlsxInGroupsServicePro,
  objectToXlsxOneSheet,
} from '@/utils/download-xlsx'
import TheLoader from '~/components/TheLoader.vue'

import {
  LITHIUM,
  RARE_EARTHS,
  BLACK_MASS,
  SYNTHETIC_GRAPHITE,
} from '~/constants/services/constants'
import ChartContainer from '~/components/shared/price-assessments/ChartContainer.vue'
import ChartSidebar from '~/components/shared/price-assessments/ChartSidebar.vue'
import SubscriptionOverlay from '~/components/price-assessments/SubscriptionOverlay.vue'

import { SHIPPING_ROUTES_PRICES, CATEGORIES_PRICES } from '~/constants/chart'
import BenchmarkWatermark from '~/components/BenchmarkWatermark.vue'
import { logError } from '~/utils/log-error'
import { getAdaptedPriceTab } from '@/utils/adapters'

export default {
  components: {
    BenchmarkWatermark,
    TheLoader,
    DownloadReportIcon,
    ChevronDown,
    IconGreetingPerson,
    IconChart,
    ChartContainer,
    ChartSidebar,
    SubscriptionOverlay,
  },
  mixins: [AuthorizationMixin, DownloadChartMixin],
  props: {
    requiredFilters: {
      type: Array,
      required: true,
    },
    initialMessages: {
      type: Array,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    minDate: {
      type: Date,
      required: true,
    },
    numberDigits: {
      type: Number,
      default: 0,
    },
    yAxisLabel: {
      type: String,
      default: 'USD / Tonne',
    },
  },
  data() {
    return {
      loading: true,
      chartOptions: {},
      rawData: null,
      messages: this.initialMessages,
      startDate: sub(new Date(), { years: 1 }).toISOString(),
      endDate: new Date().toISOString(),
      previousStartDate: sub(new Date(), { years: 1 }).toISOString(),
      previousEndDate: new Date().toISOString(),
      previousChartOptions: {},
      authorized: false,
      showOverlay: false,
    }
  },
  computed: {
    ...mapGetters({
      getPricesCatalogByMineral: 'chartSidebarFilter/getPricesCatalogByMineral',
    }),
    showGraph() {
      return (
        this.optionsReady &&
        this.validateDatasets() &&
        (this.messages.length === 0 || this.isValidGlobalWeightedAverage) &&
        this.loading === false
      )
    },
    isLithium() {
      return this.category === LITHIUM.category
    },
    isLithiumIonBatteries() {
      return this.category === 'lithium-ion-batteries'
    },
    isRareEarths() {
      return this.category === RARE_EARTHS.category
    },
    isBlackMass() {
      return this.category === BLACK_MASS.category
    },
    isSyntheticGraphite() {
      return this.category === SYNTHETIC_GRAPHITE.category
    },
    replaceLegend() {
      return this.isBlackMass || this.isSyntheticGraphite
    },
    optionsReady() {
      let ready = false
      if (this.isValidGlobalWeightedAverage || !this.authorized) {
        ready = true
      } else {
        const options = Object.keys(this.chartOptions).filter((_option) => {
          return this.chartOptions[_option]?.length
        })

        if (this.requiredFilters.length !== options.length) {
          return false
        }

        const isOptionCheckedArray = options.map((_option) => {
          return !isEmpty(this.chartOptions[_option])
        })

        if (!isEmpty(isOptionCheckedArray)) {
          ready = isOptionCheckedArray.every((x) => x)
        }
      }
      return ready
    },
    categories() {
      const pricesCatalog = this.getPricesCatalogByMineral(this.mineral)
      if (pricesCatalog.length === 0) return []
      return pricesCatalog[0].options.map((_option) => _option.name)
    },
    isGlobalWeightedAverage() {
      return this.chartOptions.categories?.some(
        (_option) =>
          (_option.data.name ===
            SHIPPING_ROUTES_PRICES.global_weighted_average.name ||
            _option.data.name === CATEGORIES_PRICES.china_weighted_index.name ||
            CATEGORIES_PRICES.china_weighted_average) &&
          _option.checked,
      )
    },
    isValidGlobalWeightedAverage() {
      return (
        (this.isLithiumIonBatteries || this.isRareEarths) &&
        this.isGlobalWeightedAverage &&
        this.chartOptions.categories?.length === 1
      )
    },
  },
  watch: {
    chartOptions() {
      if (this.optionsReady) {
        this.loading = true
        this.debouncedFetch()
      }
    },
    startDate() {
      this.optionsReady && this.debouncedFetch()
    },
    endDate() {
      this.optionsReady && this.debouncedFetch()
    },
  },
  methods: {
    openFiltersModal() {
      this.$modal.open('priceAssessmentFilters')
    },
    applyFilters() {
      this.previousStartDate = this.startDate
      this.previousEndDate = this.endDate
      this.fetchData()
      this.$modal.close('priceAssessmentFilters')
    },
    downloadAsXlsx() {
      try {
        const blob = isLithiumIonBatteries(this.category)
          ? objectToXlsxOneSheet(
              this.category,
              this.rawData,
              this.title,
              this.startDate,
              this.endDate,
            )
          : objectToXlsxInGroupsServicePro(this.category, this.rawData)
        const blobUrl = window.URL.createObjectURL(blob)
        // Create a download link then click it, this is so we can get a filename
        const link = document.createElement('a')
        link.href = blobUrl
        const endDate = format(parseISO(this.endDate), 'yyyy-MM-dd')
        const startDate = format(parseISO(this.startDate), 'yyyy-MM-dd')
        link.download = `benchmark-${this.title
          .toLowerCase()
          .replaceAll(
            ' ',
            '-',
          )}-prices-${startDate}-${endDate}-${new Date().getTime()}.xlsx`
        link.click()
        link.remove()
        window.URL.revokeObjectURL(blobUrl)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
    downloadAsPNGImage() {
      const endDate = format(parseISO(this.endDate), 'yyyy-MM-dd')
      const startDate = format(parseISO(this.startDate), 'yyyy-MM-dd')
      const pngName = `benchmark-${this.title
        .toLowerCase()
        .replaceAll(
          ' ',
          '-',
        )}-chart-${startDate}-${endDate}-${new Date().getTime()}`
      this.downloadChart({
        chartId: 'line-chart',
        name: pngName,
        watermarkLocations: ['center'],
      })
    },
    updateMessage(message) {
      this.messages = message
    },
    updateChartOptions(options) {
      this.chartOptions = options
    },
    debouncedFetch: debounce(function () {
      if (this.$browser.isMobile()) return
      this.loading = true
      this.fetchData()
    }, 1000),
    async fetchData() {
      // We can later add the chart filters to the query using chartOptions
      this.loading = true
      try {
        const hasAuthorized = await this.hasAuthorized()
        if (hasAuthorized) {
          this.rawData = await this.$restClient.getPricesByProduct(
            this.category,
            this.parseFilters(this.chartOptions),
          )
        } else {
          const response = await this.$restClient.getMarketPortal(
            this.category,
            this.parseFilters(this.chartOptions),
          )
          this.rawData = getAdaptedPriceTab(response)
          this.showOverlay = this.rawData.y1.hideChartComponent
        }
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },
    // parse filters and include the date range
    parseFilters(chartOptions) {
      const data = Object.keys(chartOptions).reduce((_data, key) => {
        if (this.category === 'nickel' && key === 'categories') {
          const valueKeys = chartOptions[key]
            .map((value) => {
              return {
                name: value?.data.name,
                isSustainable: value?.data.isSustainable,
              }
            })
            .filter(Boolean)

          if (valueKeys.length > 0) {
            _data[key] = valueKeys
          }

          return _data
        } else {
          const valueKeys = chartOptions[key]
            .map((value) => value?.data.name)
            .filter(Boolean)

          if (valueKeys.length > 0) {
            _data[key] = valueKeys
          }

          return _data
        }
      }, {})
      const startDate = format(parseISO(this.startDate), 'yyyy-MM-dd')
      const endDate = format(parseISO(this.endDate), 'yyyy-MM-dd')
      return { ...data, from: startDate, to: endDate }
    },
    validateDatasets() {
      let ready = false
      if (this.rawData) {
        const datasetsToCheck = ['y1', 'y2']

        ready = datasetsToCheck.some((key) => {
          const dataset = this.rawData[key]?.data
          return dataset && dataset.length > 0
        })
      }
      if (!ready && this.optionsReady && !this.loading) {
        this.updateMessage([
          `Unfortunately the selection you have
          made has returned no results. Try a
          different combination.`,
        ])
      }
      return ready
    },

    async hasAuthorized() {
      this.authorized = await this.hasMembership(this.subscription)

      return this.authorized && this.isAuthenticated
    },
  },
}
</script>
