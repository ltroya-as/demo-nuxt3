<template>
  <div class="relative h-full w-full overflow-hidden">
    <PanelFilters
      v-if="filters?.length > 0"
      v-model="filters"
      class="absolute bottom-0 top-0 z-10 transition-all duration-300 ease-in-out"
      :class="!showFilters ? '-right-[375px]' : 'right-0'"
      @close="closeFilters"
    />
    <ag-grid-vue
      class="ag-theme-alpine"
      :class="[$attrs.class, { normal: isNormal, hidden: loading }, className]"
      :column-defs="columnDefs"
      :row-data="filteredData"
      :pagination="pagination"
      :header-height="64"
      :row-height="rowHeight"
      :default-col-def="defaultColDef"
      :dom-layout="domLayout"
      :pagination-page-size="rowPerPage"
      suppress-pagination-panel
      enable-sorting
      animate-rows
      suppress-scroll-on-new-data
      @grid-ready="onGridReady"
      @pagination-changed="onPaginationChanged"
      @cell-clicked="$emit('cellClick', $event)"
      @first-data-rendered="onFirstDataRendered"
      @grid-size-changed="onGridSizeChanged"
      @sort-changed="onSortChanged"
      @body-scroll="onBodyScroll"
    >
    </ag-grid-vue>
    <PaginationCustom
      v-if="pagination && !loading"
      :pages="pages"
      :current-page="currentPage"
      :row-per-page="rowPerPage"
      :rows-per-page-list="rowsPerPageList"
      :total="total"
      @change-row-per-page="onChangeRowPerPage($event)"
      @change-page="onChangePage"
    />
  </div>
</template>
<script>
import { AgGridVue } from 'ag-grid-vue3'
import { createFilters, filterDataWithPanel } from '~/utils/filters'

import PanelFilters from '~/components/filters/Panel.vue'
import PaginationCustom from '@/components/price-assessments/PaginationTableAG.vue'

export default {
  components: {
    AgGridVue,
    PaginationCustom,
    PanelFilters,
  },
  props: {
    columnDefs: {
      type: Array,
      required: true,
    },
    rowData: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    rowHeight: {
      type: Number,
      default: 64,
    },
    rowsPerPageList: {
      type: Array,
      default: () => [10, 50, 100],
    },
    defaultColDef: {
      type: Object,
      default: () => ({
        sortable: true,
        resizable: false,
        suppressMovable: true,
        suppressMenu: true,
        unSortIcon: true,
      }),
    },
    layout: {
      type: String,
      default: undefined,
    },
    isFixed: {
      type: Boolean,
      default: undefined,
    },
    className: {
      type: String,
      default: '',
    },
    showFilters: {
      type: Boolean,
      default: false,
    },
    filterOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      filters: [],
      gridApi: null,
      rowPerPage: null,
      loading: true,
      currentPage: 1,
      pages: 1,
    }
  },
  computed: {
    filteredData() {
      return filterDataWithPanel(this.rowData, this.filters)
    },
    isNormal() {
      if (this.isFixed !== undefined) return this.isFixed
      return this.rowsInPage > 10
    },
    rowsInPage() {
      if (!this.gridApi || !this.currentPage || !this.rowPerPage) return 0
      if (+this.rowPerPage === this.gridApi.paginationGetRowCount())
        return this.rowPerPage
      if (this.currentPage === this.pages) {
        return this.gridApi.paginationGetRowCount() % this.rowPerPage
      }
      return this.rowPerPage
    },
    domLayout() {
      if (this.layout !== undefined) return this.layout
      return this.isNormal ? 'normal' : 'autoHeight'
    },
    total() {
      return !this.rowData ? 0 : this.rowData.length
    },
  },
  watch: {
    rowData: {
      handler(data) {
        if (!data) return
        this.filters = createFilters({
          data,
          filterOptions: this.filterOptions,
        })
      },
      deep: true,
      immediate: true,
    },
  },
  beforeMount() {
    if (!this.pagination) return
    this.rowPerPage = this.rowsPerPageList[0]
  },
  methods: {
    closeFilters() {
      this.$emit('closeFilters')
    },
    onGridReady(params) {
      this.loading = true
      this.gridApi = params.api
      if (this.pagination) {
        this.gridApi.setPagination(true)
        this.gridApi.paginationSetPageSize(this.rowPerPage)
      }
      this.gridApi.setRowData(this.rowData)
      this.loading = false
    },
    onFirstDataRendered() {
      if (!this.gridApi) return
      this.gridApi.sizeColumnsToFit()
    },
    onGridSizeChanged() {
      if (!this.gridApi) return
      this.gridApi.sizeColumnsToFit()
    },
    onBodyScroll(event) {
      this.onVerticalScroll(event)
      this.onHorizontalScroll(event)
      this.$emit('bodyScroll', event)
    },
    onVerticalScroll(event) {
      const elements = document.querySelectorAll(
        '.ag-theme-alpine .ag-pinned-left-cols-container, .ag-theme-alpine .ag-pinned-left-header',
      )
      if (!elements) return
      if (event.left > 0) {
        elements.forEach(
          (el) => (el.style.boxShadow = '6px 0 4px 0 rgba(0, 0, 0, 0.25)'),
        )
        return
      }
      elements.forEach((el) => (el.style.boxShadow = 'none'))
    },
    onHorizontalScroll(event) {
      const elements = document.querySelectorAll('.ag-theme-alpine .ag-header')
      if (!elements) return
      if (event.top > 0) {
        elements.forEach(
          (el) => (el.style.boxShadow = '0 6px 4px 0 rgba(0, 0, 0, 0.25)'),
        )
        return
      }
      elements.forEach((el) => (el.style.boxShadow = 'none'))
    },
    onPaginationChanged() {
      if (!this.gridApi) return
      this.gridApi.sizeColumnsToFit()
      this.currentPage = this.gridApi.paginationGetCurrentPage() + 1
      this.rowPerPage = this.gridApi.paginationGetPageSize()
      this.pages = this.gridApi.paginationGetTotalPages()
    },
    onChangePage(page) {
      if (!this.gridApi) return
      this.gridApi.paginationGoToPage(page - 1)
    },
    onChangeRowPerPage(value) {
      this.rowPerPage = +value
      this.onChangePage(1)
    },
    onSortChanged() {
      this.onChangePage(1)
    },
  },
}
</script>
