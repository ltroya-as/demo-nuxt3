<template>
  <div class="relative flex-1">
    <div id="line-chart-wrapper" class="line-chart-wrapper">
      <PriceAssessmentsMultiAxisChart
        :key="updatedPriceChart"
        data-testid="price-assessments-chart"
        :chart-data="datacollection"
        :title="titlePage"
        :price-axis-on="priceAxisOn"
        :payable-axis-on="payableAxisOn"
        :y-axis-label="axisy1"
        :y-axis1-label="axisy2"
        :categories="datacollection.categories"
        :replace-legend="replaceLegend"
        class="h-[500px] w-full lg:left-0 lg:top-0 lg:pr-10"
        :plugins="plugins"
        :min-y1="minAxisy1"
        :max-y1="maxAxisy1"
        :min-y2="minAxisy2"
        :max-y2="maxAxisy2"
      />
    </div>
    <div v-show="!hideLegend" id="legend-container" class="mt-4"></div>
  </div>
</template>

<script>
import { CrosshairPlugin } from 'chartjs-plugin-crosshair'
import ResponsiveChartMixin from '@/mixins/ResponsiveChartMixin'
import { reformat } from '@/utils/date'
import PriceAssessmentsMultiAxisChart from '~/components/price-assessments/MultiAxisChart'
import { EventBus } from '~/utils/eventBus'
import { SHIPPING_ROUTES_PRICES, CATEGORIES_PRICES } from '~/constants/chart'
import { generatePriceLegends } from '~/utils/custom-legends'

// tableau 20 color scheme
const DATASET_COLORS = [
  '#84445F',
  '#27445D',
  '#266171',
  '#9FAF49',
  '#B4D77C',
  '#EFBD4E',
  '#F88044',
  '#F65653',
  '#B44242',
  '#562020',
  '#00402F',
  '#829A00',
  '#C0C9B1',
  '#D1A646',
  '#AD4F20',
  '#E08785',
  '#4B3030',
  '#993961',
  '#2E699C',
  '#37889E',
  '#559B89',
  '#C5CE92',
  '#C0D2A3',
  '#C8A558',
  '#BD8467',
  '#F0918F',
  '#A92525',
  '#5B0000',
  '#3DB494',
  '#C1EA81',
  '#EAA100',
  '#9C79D6',
  '#603C9B',
  '#6497AD',
  '#8FB7BC',
  '#CCA1C2',
  '#785F72',
  '#DE5023',
]

export default {
  components: { PriceAssessmentsMultiAxisChart },
  mixins: [ResponsiveChartMixin],
  props: {
    rawData: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    numberDigits: {
      type: Number,
      required: true,
    },
    yAxisLabel: {
      type: String,
      required: true,
    },
    categoriesOrder: {
      type: Array,
      required: true,
    },
    replaceLegend: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      updatedPriceChart: 0,
      colorIndex: 0,

      titlePage: '',
      dates: [],
      productPriceDatasets: [],
      productPayableDatasets: [],

      datacollection: {
        labels: [],
        datasets: [],
        categories: [],
      },
      categories: [],
      addEvent: false,
      element: undefined,
      plugins: [generatePriceLegends, CrosshairPlugin],
      axisy1: 'USD/tonne',
      axisy2: '% Payable',
      minAxisy1: 0,
      maxAxisy1: null,
      minAxisy2: 0,
      maxAxisy2: null,
      hideLegend: false,
    }
  },

  computed: {
    priceAxisOn() {
      return !!this.productPriceDatasets.length
    },
    payableAxisOn() {
      return !!this.productPayableDatasets.length
    },
    productNamePayable() {
      return this.rawData?.y2?.data[0]?.Product?.ProductName
    },
  },
  watch: {
    rawData() {
      this.generateGraph()
    },
  },
  mounted() {
    this.generateGraph()
    this.$nextTick(() => {
      this.element = document.getElementById('line-chart-wrapper')
      if (!this.addEvent && this.element) {
        this.element.addEventListener('mouseenter', this.mouseEnterChart)
        this.element.addEventListener('mouseleave', this.mouseLeaveChart)
        this.addEvent = true
      }
    })
  },
  beforeUnmount() {
    if (this.addEvent && this.element) {
      this.element.removeEventListener('mouseenter', this.mouseEnterChart)
      this.element.removeEventListener('mouseleave', this.mouseLeaveChart)
    }
  },
  methods: {
    generateGraph() {
      this.resetGraphData()
      this.extractDates()

      this.extractProductsBy('y1')
      this.extractProductsBy('y2')

      this.setTitle()
      this.setLabels()
      this.setDatasets()
      this.orderDataset()

      // See: https://github.com/apertureless/vue-chartjs/issues/677#issuecomment-808920024
      this.updatedPriceChart++
    },

    resetGraphData() {
      this.dates = []
      this.productPriceDatasets = []
      this.productPayableDatasets = []
      this.datacollection.labels = []
      this.datacollection.datasets = []
      this.datacollection.categories = []
    },

    setTitle() {
      if (this.dates && this.dates.length > 0) {
        const startDate = this.dates[0]
        const endDate = this.dates[this.dates.length - 1]
        this.titlePage = `${this.title} Prices: ${reformat(
          startDate,
          'MMMM yyyy',
        )} - ${reformat(endDate, 'MMMM yyyy')}`
      }
    },

    setLabels() {
      this.datacollection.labels = this.dates?.filter(Boolean)
    },

    setDatasets() {
      const createDataset = (datasetInfo, yAxisID, labelPrefix = '') => ({
        label: `${labelPrefix}${datasetInfo.label}`,
        data: datasetInfo.dataset?.filter(Boolean),
        borderColor: this.getNewColor(),
        fill: false,
        yAxisID,
        spanGaps: true,
        digits: this.numberDigits,
        symbol: datasetInfo.symbol,
      })

      this.datacollection.datasets = [
        ...this.datacollection.datasets,
        ...this.productPriceDatasets.map((datasetInfo) =>
          createDataset(datasetInfo, 'y1'),
        ),
        ...this.productPayableDatasets.map((datasetInfo) =>
          createDataset(
            datasetInfo,
            'y2',
            this.priceAxisOn && this.productNamePayable === 'Nickel'
              ? '(RHS) '
              : '',
          ),
        ),
      ]

      this.datacollection.categories = this.categories
    },

    extractDates() {
      // Collect unique dates.
      const datesSet = new Set()
      for (const _item in this.rawData) {
        const dates = this.rawData[_item]?.data?.flatMap((_productType) =>
          _productType.series.map(({ date }) => date),
        )
        dates?.forEach((date) => datesSet.add(date))
      }
      // Sort dates by ascending order.
      this.dates = Array.from(datesSet).sort(
        (a, b) => new Date(a) - new Date(b),
      )
    },

    extractProductsBy(_productType) {
      const productType = {
        prices: { date: 'price', dataset: 'Price' },
        payable: { date: 'payable', dataset: 'Payable' },
        y1: { dataset: 'Price' },
        y2: { dataset: 'Payable' },
      }
      const rawData = this.rawData[_productType]
      if (rawData === undefined) return
      const { currency, unitOfMeasure, data, hideChartComponent } = rawData
      this.hideLegend = hideChartComponent
      this[`axis${_productType}`] =
        currency === null
          ? `${unitOfMeasure.symbol} Payable`
          : `${currency?.iso}/${unitOfMeasure.name}`
      data?.forEach((_product) => {
        const dataset = this.dates.map((date) => {
          const record = _product.series.find(
            (_series) => _series.date === date,
          )
          return record ? { y: record.valueMid, x: record.date } : null
        })
        let product = { ..._product }
        // change region name only for Lithium and CIF Asia (id 1)
        if (
          product.shippingRoute?.name ===
            SHIPPING_ROUTES_PRICES.cif_asia.name &&
          product.mineral === 'LITHIUM'
        ) {
          product = {
            ...product,
            shippingRoute: {
              ...product.shippingRoute,
              name: SHIPPING_ROUTES_PRICES.cif_asia_combined.name,
            },
          }
        }
        const label = this.getProductLabel({
          ...product,
          unit: unitOfMeasure.symbol,
        })
        this[`product${productType[_productType].dataset}Datasets`].push({
          label,
          dataset,
          symbol:
            unitOfMeasure.symbol === '%'
              ? unitOfMeasure.symbol
              : currency.symbol,
        })

        this.getCategories({
          ..._product,
          unit: unitOfMeasure.symbol,
        })
      })

      const allYValues = this[
        `product${productType[_productType].dataset}Datasets`
      ]
        .flatMap((entry) => entry.dataset.map((dataPoint) => dataPoint?.y))
        .filter((value) => typeof value === 'number')

      if (allYValues.length > 0 && currency === null) {
        const minNumber = Math.min(...allYValues)
        const maxNumber = Math.max(...allYValues)

        this[`minAxis${_productType}`] = Math.max(0, minNumber - 20)
        this[`maxAxis${_productType}`] = Math.min(100, maxNumber + 20)
      }
    },

    getNewColor() {
      // Get an element within DATASET_COLORS[]
      const color = DATASET_COLORS[this.colorIndex % DATASET_COLORS.length]
      this.colorIndex++
      return color
    },

    getProductLabel({
      unit,
      mineral,
      category,
      purity,
      format,
      grade,
      shippingRoute,
      seriesTitle,
      meshSize,
      feedstock,
      product,
    }) {
      const currencyUnitMeasure = unit === '%' ? unit : ''
      const categoryLabel = category ? category.name : feedstock.name
      const baseLabel = `${categoryLabel} ${currencyUnitMeasure}#`
      const purityLabel = purity ? `(${purity.name})` : ''
      const formatLabel = format ? ` (${format.name})` : ''
      const productLabel = product ? ` ${product.alias || product.name}` : ''
      const gradeLabel = grade || ''
      const meshSizeLabel = meshSize ? ` ${meshSize.size}` : ''
      const separator =
        purity || format || grade || meshSize || productLabel ? ' - ' : ''
      const shippingRouteLabel = shippingRoute ? `${shippingRoute.name}` : ''

      let label =
        `${baseLabel} ${purityLabel} ${formatLabel} ${gradeLabel} ${meshSizeLabel} ${productLabel} ${separator} ${shippingRouteLabel}`.trim()

      if (
        categoryLabel === SHIPPING_ROUTES_PRICES.global_weighted_average.name &&
        mineral === 'BATTERY CELLS'
      ) {
        label = `${seriesTitle} #`
      }
      // NiSO4
      if (categoryLabel === CATEGORIES_PRICES.nis04) {
        label += ' - per tonne of sulphate'
      }

      // NiSO4 premium over global refined nickel
      else if (
        categoryLabel ===
        CATEGORIES_PRICES.nis04_premium_over_global_refined_nickel
      ) {
        label += ' - per tonne of nickel contained'
      }

      return label
    },

    openModal() {
      this.$modal.open('priceAssessmentFilters')
    },

    orderDataset() {
      this.datacollection.datasets.sort((a, b) => {
        const [category1, route1] = a.label.split('-').map((x) => x.trim())
        const [category2, route2] = b.label.split('-').map((x) => x.trim())
        // order by category and them by shipping route
        if (category1 < category2) return -1
        if (category1 > category2) return 1
        if (route1 < route2) return -1
        if (route1 > route2) return 1
        return 0
      })

      // order by the same order that we have the filters categories
      this.datacollection.datasets.sort((a, b) => {
        const category1 = a.label.split('#')[0].trim()
        const category2 = b.label.split('#')[0].trim()
        return (
          this.categoriesOrder.indexOf(category1) -
          this.categoriesOrder.indexOf(category2)
        )
      })
    },

    getCategories({ category, feedstock, unit }) {
      const currencyUnitMeasure = unit === '%' ? unit : ''
      const categoryLabel = category ? category.name : feedstock.name
      const categoryName = `${categoryLabel} ${currencyUnitMeasure}`.trim()
      if (!this.categories.some(({ name }) => name.trim() === categoryName)) {
        this.categories.push({
          name: categoryName,
          value: true,
        })
      }
    },

    mouseEnterChart() {
      this.mouseOnChart = true
      EventBus.$emit('mouseonchart', this.mouseOnChart)
    },
    mouseLeaveChart() {
      this.mouseOnChart = false
      EventBus.$emit('mouseonchart', this.mouseOnChart)
    },
  },
}
</script>
