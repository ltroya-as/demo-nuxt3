<template>
  <div class="max-w-content-container mx-auto">
    <div
      class="mb-8 flex flex-col-reverse items-end justify-end lg:mb-4 lg:flex-row-reverse lg:items-center"
    >
      <div v-if="frequencyValues.length">
        <CommonFormRadios
          v-model="frequency"
          :options="frequencyValues"
          label-classes="text-sm"
          @input="onFilterChange"
        />
      </div>
    </div>

    <div v-if="!reports.length" class="text-center text-xl">
      There are currently no reports published for this section, please check
      back later
    </div>

    <div v-else-if="data.years.length">
      <div>
        <div v-for="year in data.years" :key="year">
          <div class="bg-s-200 mb-4 px-3 py-4 text-xl font-bold">
            {{ year }} Reports
          </div>
          <div class="mb-4 grid gap-3 lg:grid-cols-2">
            <SharedMarketReportCard
              v-for="report in data.groups[year]"
              :key="report.ID"
              :report="report"
              :category="category"
              :initial-fields="initialFields"
              show-copy-link
            />
          </div>
        </div>
      </div>

      <div class="mt-7 flex justify-center lg:justify-start">
        <CommonPagination
          :total-records="currentReports.length"
          :page-size="pageSize"
          :current-page="currentPage"
          @page-change="updatePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'
import debounce from 'lodash/debounce'
import uniq from 'lodash/uniq'
import { random } from '~/utils/random'

import PaginatorMixin from '~/mixins/PaginatorMixin'

import CommonFormRadios from '~/components/common/FormRadios.vue'
import CommonPagination from '~/components/common/Pagination.vue'
import SharedMarketReportCard from '~/components/shared/market/ReportCard.vue'

import { images } from '@/constants/data-reports/images'

export default {
  components: {
    CommonFormRadios,
    CommonPagination,
    SharedMarketReportCard,
  },
  mixins: [PaginatorMixin],
  props: {
    reports: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    initialFields: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    data: {
      groups: [],
      years: [],
    },
    currentReports: [],
    frequency: 'All',
    frequencyValues: [],
    images: [],
  }),

  created() {
    this.images = images
  },

  mounted() {
    this.currentReports = [...this.reports].sort(
      (a, b) => parseISO(b.date) - parseISO(a.date),
    )
    this.buildFrequencyValues()
    this.buildReportGroups()
  },
  methods: {
    buildFrequencyValues() {
      const expectedOrder = ['Weekly updated', 'Full Assessment']

      const frequencyValues = uniq(
        this.reports.map((report) => report.assessment_type),
      ).sort((a, b) => expectedOrder.indexOf(a) - expectedOrder.indexOf(b))

      if (frequencyValues.length > 1) {
        this.frequencyValues = ['All', ...frequencyValues]
      }
    },
    dateToYear(date) {
      return +format(parseISO(date), 'yyyy')
    },
    parseReports(reports) {
      return reports.map((report) => ({
        show_overlay: true,
        images: {
          desktop: this.getRandomImage(),
        },
        ...report,
        year: this.dateToYear(report.date),
      }))
    },
    getYears(reports) {
      const dates = reports.map((report) => this.dateToYear(report.date))
      return [...new Set(dates)].sort((a, b) => b - a)
    },
    buildReportGroups() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      const reports = this.currentReports.slice(start, end)

      this.data.years = this.getYears(reports)
      this.data.groups = this.groupReportsByYear(reports)
    },
    groupReportsByYear(reports) {
      const groups = {}
      this.parseReports(reports).forEach((report) => {
        groups[report.year] = groups[report.year] || []
        groups[report.year].push(report)
      })
      return groups
    },
    onFilterChange: debounce(function () {
      this.currentReports = this.reports.filter((report) => {
        if (this.frequency === 'All') return report
        const includesFrequency =
          this.frequency === 'All' || report.assessment_type === this.frequency
        return includesFrequency
      })
      this.resetPagination()
      this.buildReportGroups()
    }, 500),
    onPageChange() {
      this.buildReportGroups()
    },
    getRandomImage() {
      const arrWithRandomValues = this.images.map((value) => ({
        value,
        random: random(),
      }))

      arrWithRandomValues.sort((a, b) => a.random - b.random)

      return arrWithRandomValues.slice(0, 1).map((item) => item.value)
    },
  },
}
</script>
