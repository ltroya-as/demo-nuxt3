<template>
  <div
    v-if="loading || loadingWatchlist"
    class="flex min-h-[40vh] items-center justify-center"
  >
    <TheLoader />
  </div>

  <div v-else data-testid="price-dashboard">
    <ChartBuilder
      ref="chartBuilder"
      :builder="builder"
      :series="series"
      @change-series="changeSeries"
      @build-chart="build"
      @reset="resetAll"
      @close="closePanel"
    />

    <AllPricesHeader
      :has-data="hasChartData"
      :series="series"
      :builder="builder"
      :is-watchlist-saved="isWatchlistSaved"
      :watchlist-id="watchlistId"
      :watchlist-title="builder?.title"
      @save-watchlist="saveWatchlist"
      @edit-watchlist="saveWatchlist"
      @open-panel="openPanel"
      @clear-chart="openClearChartModal"
      @download-as-p-n-g-image="downloadAsPNGImage"
      @download-as-x-l-s-x="downloadAsXLSX"
      @copy-data="copyData"
    />

    <AllPricesHero
      v-if="!hasChartData && !loadingChart"
      @open-panel="openPanel"
    />

    <AllPricesChart
      v-else
      :loading="loadingChart"
      :data-collection="dataCollection"
      :price-axis-on="priceAxisOn"
      :payable-axis-on="payableAxisOn"
      :name-axis-y1="nameAxisY1"
      :name-axis-y2="nameAxisY2"
      :min-date="minDate"
      :start-date="startDate"
      :end-date="endDate"
      :min-y1="minAxisy1"
      :max-y1="maxAxisy1"
      :min-y2="minAxisy2"
      :max-y2="maxAxisy2"
      :time-line-indicator="timeLineIndicator"
      @update-selected-dates="updateSelectedDates"
    />

    <div
      v-if="loadingTable"
      class="flex items-center justify-center"
      :class="isFirstLoad ? 'mt-28' : 'mt-4'"
    >
      <TheLoader />
    </div>

    <div v-else class="relative mt-5 overflow-x-auto">
      <div
        class="min-w-[1300px] bg-white lg:min-w-[400px] lg:max-w-2xl xl:min-w-[1000px] xl:max-w-none"
      >
        <SummaryTableNewPortal
          v-if="summary.length"
          class="w-auto lg:w-[1000px] xl:w-auto"
          :price-summary="summary"
          :category="category"
          disable-frequency-by-series
          :show-pills="showPills"
          :initial-fields="initialFields"
          show-product-name
        />
      </div>
    </div>

    <ClearChartModal
      v-if="$store.state.modal.clearChartOpen"
      :loading="clearLoading"
      :has-watchlist="isWatchlistSaved"
      @close="$modal.close('clearChart')"
      @confirm="clearChart"
    />
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'
import { mapActions } from 'vuex'
import { LITHIUM } from '~/constants/services/constants'
import { logError } from '~/utils/log-error'
import { objectToXlsxInGroupsAllPrices } from '@/utils/download-xlsx'
import { PRICE_ASSESSMENTS_LITHIUM } from '~/constants/services/price-assessments'

import AllPricesMixin from '~/mixins/all-prices/AllPricesMixin'
import DownloadChartMixin from '@/mixins/DownloadChartMixin'

import AllPricesChart from '~/components/all-prices/AllPricesChart.vue'
import AllPricesHeader from '~/components/all-prices/AllPricesHeader.vue'
import AllPricesHero from '~/components/all-prices/AllPricesHero.vue'
import ChartBuilder from '~/components/all-prices/ChartBuilder.vue'
import ClearChartModal from '~/components/all-prices/ClearChartModal.vue'
import SummaryTableNewPortal from '~/components/price-assessments/SummaryTableNewPortal.vue'
import TheLoader from '~/components/TheLoader.vue'
import { DASHBOARD_URL } from '~/constants/all-prices/chart-builder'

const formatIsoDate = (date) => format(new Date(date), 'yyyy-MM-dd')

export default {
  components: {
    AllPricesChart,
    AllPricesHeader,
    AllPricesHero,
    ChartBuilder,
    ClearChartModal,
    SummaryTableNewPortal,
    TheLoader,
  },
  mixins: [AllPricesMixin, DownloadChartMixin],
  props: {
    watchlistId: {
      type: String,
      default: '',
    },
    defaultOpenBuilder: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      catalog: null,
      category: LITHIUM.category,
      summaryTableAllProductsData: [],
      subscription: PRICE_ASSESSMENTS_LITHIUM.subscription,
      initialFields: ['price-dashboard'],
      summary: [],
      builder: null,
      series: 0,
      rawData: [],
      loading: true,
      loadingWatchlist: true,
      loadingTable: false,
      clearLoading: false,
      loadingChart: false,
      isFirstLoad: true,
      showPills: false,
    }
  },
  computed: {
    hasChartData() {
      return this.dataCollection?.datasets?.length > 0
    },
    isWatchlistSaved() {
      return Boolean(this.watchlistId)
    },
  },
  watch: {
    defaultOpenBuilder: {
      immediate: true,
      handler(val) {
        this.setIsOpen(val)
      },
    },
  },
  async mounted() {
    this.loadingTable = true
    await Promise.all([this.fetchData(), this.fetchAllProductsData()])
    this.summary = this.summaryTableAllProductsData
    this.isFirstLoad = false
    this.loadingTable = false
    this.$watch(
      () => [this.watchlistId, this.catalog],
      async ([watchlistId, catalog]) => {
        if (!catalog || !watchlistId || this.hasChartData) {
          this.loadingWatchlist = false
          return
        }
        await this.fetchWatchList(watchlistId)
        this.showPills = true
      },
      { immediate: true },
    )
  },
  methods: {
    ...mapActions({
      setIsOpen: 'chartBuilder/setIsOpen',
      setCurrencies: 'chartBuilder/catalog/setCurrencies',
      setUnits: 'chartBuilder/catalog/setUnits',
      setProducts: 'chartBuilder/catalog/setProducts',
    }),
    async fetchAllProductsData() {
      const response = await this.$allPrices.getAllProductsSummary()
      this.summaryTableAllProductsData = response
    },
    openPanel() {
      this.setIsOpen(true)
    },
    closePanel() {
      this.setIsOpen(false)
      if (this.isWatchlistSaved) {
        this.$router.push({ query: {} })
      }
    },
    openClearChartModal() {
      this.$modal.open('clearChart')
    },
    saveWatchlist({ title }) {
      this.builder = { ...this.builder, title }
    },
    changeSeries(series) {
      this.series = series
    },
    async saveChart(name) {
      this.clearLoading = true
      await this.$allPrices.saveWatchlist({
        ...this.builder,
        title: name,
      })
      this.clearLoading = false
      this.$toast.show({
        type: 'success',
        message: 'Saved to your Watchlist',
      })
    },
    async clearChart(name) {
      if (name) await this.saveChart(name)
      this.resetWatchList()
      this.resetBuilder()
      this.$modal.close('clearChart')
    },
    async resetWatchList() {
      if (!this.isWatchlistSaved) return

      await this.$router.push(DASHBOARD_URL)
    },
    resetBuilder(cleanSummary = false) {
      this.dataXLSX = []
      if (cleanSummary) this.summary = []
      else {
        this.summary = this.summaryTableAllProductsData
        this.showPills = false
      }
      this.dataCollection = {
        labels: [],
        datasets: [],
      }
      this.builder = null
    },
    resetAll() {
      this.resetBuilder()
      this.resetWatchList()
    },
    async build({ params, series }) {
      this.closePanel()

      const title = this.builder?.title

      this.resetBuilder(true)

      const from = formatIsoDate(this.startDate)
      const to = formatIsoDate(this.endDate)
      const date = { from, to }

      this.builder = { from, to, title, ...params }

      await Promise.all([
        this.buildTable(params),
        this.buildChart({ ...params, ...date }),
      ])

      this.series = series
      this.showPills = true
    },
    async buildTable(params) {
      try {
        this.loadingTable = true
        const summary = await this.$allPrices.getAllPricesSummary(params)
        this.summary = summary
      } catch (error) {
        logError(error)
      } finally {
        this.loadingTable = false
      }
    },
    async buildChart(params) {
      try {
        this.loadingChart = true
        const raw = await this.getAllPricesChartData(params)
        this.rawData = raw
        this.generateGraph(raw)
      } catch (error) {
        logError(error)
      } finally {
        this.loadingChart = false
      }
    },
    downloadAsPNGImage() {
      const endDate = format(parseISO(this.endDate), 'yyyy_MM')
      const startDate = format(parseISO(this.startDate), 'yyyy_MM')
      const pngName = `benchmark-all-prices-chart-${startDate}-${endDate}`
      this.downloadChart({
        chartId: 'line-chart-wrapper',
        name: pngName,
        watermarkLocations: ['center'],
      })
    },
    downloadAsXLSX() {
      try {
        const xlsx = this.formatXlsxData(this.rawData)
        const blob = objectToXlsxInGroupsAllPrices(xlsx)
        const blobUrl = window.URL.createObjectURL(blob)
        // Create a download link then click it, this is so we can get a filename
        const link = document.createElement('a')
        link.href = blobUrl
        const endDate = format(parseISO(this.endDate), 'yyyy-MM-dd')
        const startDate = format(parseISO(this.startDate), 'yyyy-MM-dd')
        link.download = `benchmark-all-prices-chart--${startDate}-${endDate}-${new Date().getTime()}.xlsx`
        link.click()
        link.remove()
        window.URL.revokeObjectURL(blobUrl)
      } catch (error) {
        logError(error)
      }
    },
    async fetchWatchList(watchlistId) {
      if (!watchlistId) return

      this.loadingWatchlist = true
      try {
        const response = await this.$allPrices.getWatchlistById(watchlistId)
        const { products, unit, currency, from, to } = response
        this.builder = response
        await Promise.all([
          this.buildTable({ products, unit, currency }),
          this.buildChart({ products, unit, currency, from, to }),
        ])
      } catch (error) {
        logError(error)
      } finally {
        this.loadingWatchlist = false
      }
    },
    async fetchData() {
      try {
        this.loading = true
        const catalog = await this.getAllPricesCatalog()
        const { products, currencies, units } = catalog

        this.catalog = catalog
        this.setCurrencies(currencies)
        this.setUnits(units)
        this.setProducts(products)
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },
    async updateSelectedDates(dateRange) {
      this.startDate = dateRange.range.start.toISOString()
      this.endDate = dateRange.range.end.toISOString()
      this.timeLineIndicator = dateRange.option

      const from = formatIsoDate(this.startDate)
      const to = formatIsoDate(this.endDate)
      const date = { from, to }
      this.builder = { ...this.builder, ...date }
      await this.buildChart(this.builder)
    },
    async copyData() {
      try {
        await this.formatClipboardData(this.rawData)
      } catch (error) {
        logError(error)
      }
    },
  },
}
</script>
