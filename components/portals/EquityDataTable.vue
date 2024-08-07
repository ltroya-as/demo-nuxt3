<template>
  <div v-if="equityData.length">
    <client-only>
      <div
        class="text-s-900 mb-2.5 flex flex-col justify-between gap-x-2 gap-y-3 sm:flex-row sm:items-center"
      >
        <h3 class="border-p-500 border-l-4 pl-2 text-3xl font-bold">
          Equity Data
        </h3>
        <CommonButton
          v-if="!loggedIn && !loading"
          variant="clean"
          class="ml-auto max-w-fit text-sm sm:ml-0"
          @click="subscribe"
        >
          Subscribe
        </CommonButton>
      </div>
      <div
        v-if="loading"
        class="flex h-full min-h-[650px] w-full items-center justify-center"
      >
        <Loader />
      </div>
      <div v-else class="flex flex-col gap-y-3">
        <div class="flex items-center justify-between gap-2 pr-6">
          <span class="font-lato text-xxs text-s-800 uppercase">
            Last Updated: {{ equityDataLastUpdate }}
          </span>
          <CommonButton
            v-if="loggedIn"
            class="ml-auto !w-fit text-sm"
            variant="clean"
            @click="toggleFiltersTable"
          >
            <div class="flex gap-x-1">
              <span>Filters</span>
              <FilterIcon class="h-5 w-5" />
            </div>
          </CommonButton>
        </div>

        <div class="ag-grid-pa-portal h-full">
          <CustomTable
            v-if="columnDefs.length"
            is-fixed
            pagination
            :column-defs="columnDefs"
            :filter-options="filterOptions"
            :row-data="equityData"
            :show-filters="showFilters"
            :rows-per-page-list="[5, 10, 25, 50]"
            @close-filters="closeFiltersTable"
          />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import CommonButton from '~/components/common/Button.vue'
import CustomTable from '~/components/price-assessments/CustomTableAG.vue'
import CustomTableTooltip from '~/components/price-assessments/CustomTableTooltip.vue'
import EquityDataChange from '~/components/price-assessments/EquityDataChange.vue'
import FilterIcon from '~/assets/icons/FilterIcon.svg'
import Loader from '~/components/TheLoader.vue'
import TableAGBlockedData from '~/components/price-assessments/TableAGBlockedData.vue'

import { capitalize } from '~/utils/string'
import { PRICE_ASSESSMENTS_LITHIUM } from '~/constants/services/price-assessments'
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'

import AuthenticationMixin from '~/mixins/AuthenticationMixin'

export default {
  components: {
    CommonButton,
    CustomTable,
    Loader,
    FilterIcon,
    // eslint-disable-next-line vue/no-unused-components
    customTableTooltip: CustomTableTooltip,
    // eslint-disable-next-line vue/no-unused-components
    equityDataChange: EquityDataChange,
    // eslint-disable-next-line vue/no-unused-components
    tableAGBlockedData: TableAGBlockedData,
  },
  mixins: [AuthenticationMixin],
  props: {
    equityData: {
      type: Array,
      default: () => [],
    },
    initialValues: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showFilters: false,
      columnDefs: [],
      columnNumberDefs: {
        headerClass: 'without-overflow right-text',
        cellClass: (params) => this.cellClass(params, 'border-right'),
        minWidth: 150,
        valueFormatter: (params) => this.valueFormatter(params),
      },
      filterOptions: {
        currency: { name: 'Currency', order: 1 },
        exchange: { name: 'Exchange', order: 2 },
        type: { name: 'Market Position', order: 3 },
        hqCountry: { name: 'HQ', order: 4 },
        marketCap: { name: 'Market Cap', order: 5 },
      },
    }
  },
  computed: {
    equityDataLastUpdate() {
      return this.equityData[0]?.lastUpdated.toUpperCase()
    },
  },
  watch: {
    equityData: {
      handler() {
        this.loadTableConfig()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getColumnBlockedDefs(isAuth) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { cellClass, ...all } = this.columnNumberDefs
      if (isAuth) return this.columnNumberDefs
      return { ...all, cellClass: 'blocked' }
    },
    closeFiltersTable() {
      this.showFilters = false
    },
    toggleFiltersTable() {
      this.showFilters = !this.showFilters
    },
    cellClass(params, extraClass) {
      const { value } = params
      if (typeof value === 'number') {
        return `!flex items-center font-bold !pr-10 justify-end tabular-nums ${extraClass}`
      }

      return `!flex items-center font-bold !pr-10 ${extraClass}`
    },
    subscribe() {
      this.$store.commit('modal/setInitialFields', this.initialValues)
      this.$modal.open('contact')
    },
    exchangeFormatter(params) {
      const { value } = params
      if (value) {
        const words = value.split(' ')
        return words.map((w) => capitalize(w.toLowerCase())).join(' ')
      }
      return ''
    },
    valueFormatter(params) {
      const { value } = params
      if (typeof value === 'number') {
        return value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
          useGrouping: true,
        })
      }
      return value
    },
    loadTableConfig() {
      const isAuth = this.isAuthenticated
      const initialFields = [
        PRICE_ASSESSMENTS_LITHIUM.checkbox,
        PRICE_ASSESSMENTS.slug,
      ]
      this.columnDefs = [
        {
          field: 'companyName',
          headerName: 'Company',
          cellClass: (params) => this.cellClass(params, 'border-right w-auto'),
          minWidth: 200,
          cellRenderer: 'customTableTooltip',
          cellRendererParams: {
            class: '!text-left font-bold',
          },
        },
        {
          field: 'currency',
          headerName: 'Currency',
          headerClass: 'right-text',
          cellClass: (params) =>
            this.cellClass(params, 'border-left justify-end'),
          minWidth: 150,
        },
        {
          field: 'currentPrice',
          headerName: 'Current Share Price',
          ...this.columnNumberDefs,
        },
        {
          field: 'previousClose',
          headerName: 'Last Share Price',
          unSortIcon: true,
          ...this.getColumnBlockedDefs(isAuth),
          cellRendererParams: { initialFields },
          cellRenderer: !isAuth ? 'tableAGBlockedData' : null,
        },
        {
          field: 'change',
          headerName: 'Change',
          headerClass: 'right-text',
          cellClass: isAuth ? '!pr-7 font-bold' : 'blocked font-bold',
          minWidth: 150,
          suppressSizeToFit: true,
          cellRendererParams: { initialFields },
          cellRenderer: !isAuth ? 'tableAGBlockedData' : 'equityDataChange',
        },
        {
          field: 'fiftyTwoWeekHigh',
          headerName: '52 Week High',
          unSortIcon: true,
          ...this.getColumnBlockedDefs(isAuth),
          cellRendererParams: { initialFields },
          cellRenderer: !isAuth ? 'tableAGBlockedData' : null,
        },
        {
          field: 'fiftyTwoWeekLow',
          headerName: '52 Week Low',
          unSortIcon: true,
          ...this.getColumnBlockedDefs(isAuth),
          cellRendererParams: { initialFields },
          cellRenderer: !isAuth ? 'tableAGBlockedData' : null,
        },
        {
          field: 'exchange',
          headerName: 'Exchange',
          minWidth: 150,
          headerClass: 'right-text',
          cellClass: 'border-left text-right !flex items-center font-bold',
          valueFormatter: (params) => this.exchangeFormatter(params),
          cellRenderer: 'customTableTooltip',
        },
        {
          field: 'ticker',
          headerName: 'Ticker',
          headerClass: 'right-text',
          cellClass: (params) =>
            this.cellClass(params, 'border-left justify-end'),
          minWidth: 150,
        },
        {
          field: 'type',
          headerName: 'Market Position',
          headerClass: 'without-overflow right-text ',
          cellClass: (params) =>
            this.cellClass(params, 'border-left justify-end capitalize'),
          minWidth: 150,
        },
        {
          field: 'hqCountry',
          headerName: 'HQ',
          headerClass: 'right-text',
          cellClass: (params) =>
            this.cellClass(params, 'border-left justify-end'),
          minWidth: 150,
        },
        {
          field: 'marketCap',
          suppressSizeToFit: true,
          headerName: 'Market Cap',
          headerClass: 'without-overflow right-text market-cap-header',
          cellClass: (params) =>
            this.cellClass(params, 'border-right border-left'),
          minWidth: 150,
          valueFormatter: (params) => this.valueFormatter(params),
        },
      ]
    },
  },
}
</script>
