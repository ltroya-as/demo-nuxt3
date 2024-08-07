import { sub } from 'date-fns'
import groupBy from 'lodash/groupBy'
import {
  formatCurrency,
  formatProduct,
  formatUnit,
} from '@/utils/allPrices/price-chart-builder'
import {
  extractDates,
  extractProductsBy,
  formatDatasets,
} from '~/utils/allPrices/chart'
import {
  groupDataByKey,
  generateSheetData,
  adjustSheetData,
  convertToExcelFormat,
} from '~/utils/allPrices/copy-data'
import { logError } from '~/utils/log-error'

export default {
  data() {
    return {
      productPriceDatasets: [],
      productPayableDatasets: [],
      dataCollection: { labels: [], datasets: [] },
      nameAxisY1: 'USD/tonne',
      nameAxisY2: '% Payable',
      minDate: new Date(2016, 0, 29),
      startDate: sub(new Date(), { years: 1 }).toISOString(),
      endDate: new Date().toISOString(),
      minAxisy1: 0,
      maxAxisy1: null,
      minAxisy2: 0,
      maxAxisy2: null,
      timeLineIndicator: 'Last Calendar Year',
    }
  },
  computed: {
    priceAxisOn() {
      return !!this.productPriceDatasets.length
    },
    payableAxisOn() {
      return !!this.productPayableDatasets.length
    },
  },
  methods: {
    async getAllPricesCatalog() {
      const response = await this.$allPrices.getAllPricesCatalog()
      const products = response.products.map(formatProduct)
      const currencies = response.currencies.map(formatCurrency)
      const units = response.units.map(formatUnit)

      return { products, currencies, units }
    },
    async getAllPricesChartData(params) {
      return await this.$allPrices.getAllPricesChart(params)
    },
    formatXlsxData(data) {
      let xlsx = groupBy(data.y1.data, 'Product.ProductName')

      if (!data) return { data: {}, xlsx: {} }

      const datasetsToCheck = ['y1', 'y2']

      datasetsToCheck.forEach((key) => {
        const groupedData = groupBy(data[key]?.data, 'Product.ProductName')
        xlsx = { ...xlsx, ...groupedData }
      })

      return xlsx
    },

    extractProducts({ data, dates }) {
      const responseY1 = extractProductsBy({ type: 'y1', data, dates })
      const responseY2 = extractProductsBy({ type: 'y2', data, dates })

      this.nameAxisY1 = responseY1?.label || this.nameAxisY1
      this.nameAxisY2 = responseY2?.label || this.nameAxisY2

      if (responseY2) {
        this.productPayableDatasets = responseY2.dataset
        this.minAxisy2 = responseY2.minAxis
        this.maxAxisy2 = responseY2.maxAxis
      }
      if (responseY1) {
        this.productPriceDatasets = responseY1.dataset
        this.minAxisy1 = responseY1.minAxis
        this.maxAxisy1 = responseY1.maxAxis
      }
    },
    generateGraph(data) {
      this.resetGraphData()
      const dates = extractDates(data)

      this.extractProducts({ data, dates })

      const datasets = [
        ...this.productPriceDatasets,
        ...this.productPayableDatasets,
      ]
      this.dataCollection.datasets = formatDatasets(datasets)
      this.dataCollection.labels = dates.filter((_date) => _date)
    },

    resetGraphData() {
      this.nameAxisY1 = 'USD/tonne'
      this.nameAxisY2 = '% Payable'
      this.productPriceDatasets = []
      this.productPayableDatasets = []
      this.dataCollection.labels = []
      this.dataCollection.datasets = []
    },

    async formatClipboardData(data) {
      if (!data) return

      const groupByData = groupDataByKey(data)
      const sheetData = generateSheetData(groupByData)
      const copySheetData = adjustSheetData(sheetData)
      const excelData = convertToExcelFormat(copySheetData)

      try {
        await navigator.clipboard.writeText(excelData)
      } catch (error) {
        logError(error)
      }
    },
  },
}
