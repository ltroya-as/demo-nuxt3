<template>
  <div
    id="chart-canvas"
    class="gigafactories--chart flex flex-col items-start justify-start"
  >
    <div
      class="border-s-300 flex w-full flex-grow flex-col gap-x-3 border-solid pb-3 capitalize lg:gap-x-3 lg:pb-5 xl:flex-row xl:border-b-[3px]"
    >
      <div
        class="mb-3 hidden flex-grow text-base font-semibold lg:mb-0 lg:flex lg:items-center lg:text-2xl lg:font-bold"
      >
        {{ subtitle }}
      </div>
      <div class="remove-me hidden justify-center">
        <button
          data-testid="large-screen-download-button"
          class="border-s-500 text-s-900 inline-flex w-full items-center justify-center rounded border bg-white px-4 py-2 font-semibold lg:px-3"
          :disabled="downloadingChart"
          @click="downloadChart()"
        >
          <DownloadReportIcon class="h-4 w-4" />
          <span
            class="font-montserrat ml-3 w-full text-left text-sm font-semibold lg:w-auto lg:text-xs"
          >
            Download
          </span>
        </button>
      </div>
    </div>

    <!-- Desktop Content -->
    <div class="mt-5 flex w-full xl:gap-x-11">
      <div class="w-full">
        <div
          id="legend-container"
          class="mx-4 mb-6 mt-2.5 flex flex-wrap justify-center gap-4 sm:mx-auto lg:mb-8 lg:mt-0"
        ></div>
        <div class="remove-me hidden xl:block">
          <MarketAssessmentsFilterLayout
            filter-box-title="Regions"
            search-box-title="Companies"
            benchmark-verified-title="Benchmark Verified"
            :show-benchmark-verified-box="isLithiumIonBatteries"
            :options="companies"
            :is-title-large="isTotalLabelLarge"
            @on-select-all="selectAll"
            @on-filter-change="searchChange"
          >
            <template #filterBox>
              <div v-for="region in regions" :key="region.name" class="mb-1">
                <label
                  class="flex cursor-pointer items-center"
                  :for="region.name"
                >
                  <input
                    :id="region.name"
                    v-model="region.selected"
                    type="checkbox"
                    :class="inputCheckboxClasses"
                  />
                  <span class="text-sm font-semibold text-white">
                    {{ region.name }}
                  </span>
                </label>
              </div>
            </template>

            <template #searchBoxMultiSelect>
              <div
                v-for="company in filterCompanies"
                :key="company.name"
                class="mb-1 max-h-[40vh] lg:max-h-[65vh]"
              >
                <label
                  class="ml-3 flex cursor-pointer items-center"
                  :for="company.name"
                >
                  <input
                    :id="company.name"
                    v-model="company.selected"
                    type="checkbox"
                    :class="inputCheckboxClasses"
                  />
                  <span
                    class="line-clamp-2 text-sm font-semibold text-white"
                    :title="company.name"
                  >
                    {{ company.name }}
                  </span>
                </label>
              </div>
            </template>

            <template #benchmarkMultiSelect>
              <div
                v-for="state in status"
                :key="state.slug"
                class="mb-1 max-h-[40vh] lg:max-h-[65vh]"
              >
                <label
                  class="ml-3 flex cursor-pointer items-center gap-x-2"
                  :for="state.label"
                >
                  <input
                    :id="state.label"
                    v-model="state.selected"
                    type="checkbox"
                    :class="inputCheckboxClasses"
                  />
                  <span class="min-w-[160px] text-sm font-semibold text-white">
                    {{ state.label }}
                  </span>
                  <component :is="statusIcons[state.slug]" class="h-4 w-auto" />
                </label>
              </div>
            </template>
          </MarketAssessmentsFilterLayout>
        </div>
      </div>
      <MarketAssessmentsGigafactoriesData
        summary-box-title="Gigafactories"
        class="hidden w-full xl:block"
      >
        <template #summaryBox>
          <div class="flex flex-row gap-1">
            <div
              class="text-p-em-high flex-grow p-4 pb-0 text-sm font-semibold lg:py-4 xl:px-6"
            >
              <div>Active:</div>
              <div>Planning / Construction:</div>
              <div>{{ labelTotal }}</div>
              <div>{{ filteredCapacityLabel }} ({{ unitActive }}):</div>
            </div>
            <div
              class="bg-s-300 text-p-em-high basis-[120px] p-4 pb-0 text-right text-sm font-bold lg:py-4 xl:px-6"
            >
              <div>{{ activeGigafactories.length }}</div>
              <div>{{ inactiveGigafactories }}</div>
              <div>{{ selectedGigafactoriesLength }}</div>
              <div>{{ total }}</div>
            </div>
          </div>
        </template>
      </MarketAssessmentsGigafactoriesData>
    </div>

    <!-- Mobile Content -->
    <MarketAssessmentsFilterLayout
      class="remove-me xl:hidden"
      filter-box-title="Regions"
      search-box-title="Companies"
      benchmark-verified-title="Benchmark Verified"
      :show-benchmark-verified-box="isLithiumIonBatteries"
      :options="companies"
      :is-title-large="isTotalLabelLarge"
      @on-select-all="selectAll"
      @on-filter-change="searchChange"
    >
      <template #filterBox>
        <div v-for="region in regions" :key="region.name" class="mb-1">
          <label class="flex cursor-pointer items-center" :for="region.name">
            <input
              :id="region.name"
              v-model="region.selected"
              type="checkbox"
              class="lg:h-5 lg:w-5"
              :class="inputCheckboxClasses"
            />
            <span class="text-sm font-semibold text-white">
              {{ region.name }}
            </span>
          </label>
        </div>
      </template>

      <template #searchBoxMultiSelect>
        <div
          v-for="company in filterCompanies"
          :key="company.name"
          class="mb-1 max-h-[40vh]"
        >
          <label
            class="ml-3 flex cursor-pointer items-center"
            :for="company.name"
          >
            <input
              :id="company.name"
              v-model="company.selected"
              type="checkbox"
              class="lg:h-5 lg:w-5"
              :class="inputCheckboxClasses"
            />
            <span
              class="line-clamp-2 text-sm font-semibold text-white"
              :title="company.name"
            >
              {{ company.name }}
            </span>
          </label>
        </div>
      </template>
      <template #benchmarkMultiSelect>
        <div
          v-for="state in status"
          :key="state.slug"
          class="mb-1 max-h-[40vh] lg:max-h-[65vh]"
        >
          <label
            class="ml-3 flex cursor-pointer items-center gap-x-2"
            :for="state.label"
          >
            <input
              :id="state.label"
              v-model="state.selected"
              type="checkbox"
              class="lg:h-5 lg:w-5"
              :class="inputCheckboxClasses"
            />
            <span class="min-w-[160px] text-sm font-semibold text-white">
              {{ state.label }}
            </span>
            <component :is="statusIcons[state.slug]" class="h-4 w-auto" />
          </label>
        </div>
      </template>
      <template #summaryContainer>
        <MarketAssessmentsGigafactoriesData
          summary-box-title="Gigafactories"
          :is-title-large="isTotalLabelLarge"
          class="xl:hidden"
        >
          <template #summaryBox>
            <div class="flex flex-row gap-1">
              <div
                class="text-p-em-high flex-grow p-4 text-sm font-semibold lg:py-4 xl:px-6"
              >
                <div>Active:</div>
                <div>Planning / Construction:</div>
                <div>{{ labelTotal }}</div>
                <div>{{ filteredCapacityLabel }} ({{ unitActive }}):</div>
              </div>
              <div
                class="bg-s-300 text-p-em-high basis-[120px] p-4 text-right text-sm font-bold lg:py-4 xl:px-6"
              >
                <div>{{ activeGigafactories.length }}</div>
                <div>{{ inactiveGigafactories }}</div>
                <div>{{ selectedGigafactoriesLength }}</div>
                <div>{{ total }}</div>
              </div>
            </div>
          </template>
        </MarketAssessmentsGigafactoriesData>
      </template>
    </MarketAssessmentsFilterLayout>
    <div class="flex w-full flex-col lg:mx-0">
      <div
        class="mx-4 my-10 flex justify-center text-center text-sm font-normal capitalize lg:mb-5 lg:mt-12 lg:text-sm lg:font-semibold"
      >
        {{ product }} Capacity Index ({{ unitActive }})
      </div>
      <div v-show="showChartPagination" class="mb-6 flex justify-center">
        <CommonPagination
          :total-records="selectedGigafactories.length"
          :page-size="pageSize"
          :current-page="currentPage"
          @page-change="updatePage"
        />
      </div>
      <div
        class="relative grid"
        :class="{
          'grid-cols-2': isLithiumIonBatteries,
          'grid-cols-1': !isLithiumIonBatteries,
        }"
      >
        <div
          v-if="isLithiumIonBatteries"
          class="mt-[85px] flex flex-col justify-around text-end"
        >
          <div
            v-for="(item, index) in getLabels"
            :key="index"
            class="text-xxs flex items-center justify-end gap-6 text-end lg:text-base"
          >
            <span class="line-clamp-1"> {{ item.location }} </span>
            <div
              class="hidden min-h-[16px] basis-4 lg:flex lg:min-h-[28px] lg:basis-7 lg:items-center"
            >
              <component
                :is="statusIcons[item.status]"
                class="h-4 w-4 lg:h-6 lg:w-6"
              />
            </div>
          </div>
        </div>

        <BarChart
          id="horizontal-bar-char-wrapper"
          class="relative z-10"
          :class="{ 'w-full': hideYLabel }"
          :style="{
            height: `${chartHeight}px`,
          }"
          :height="chartHeight"
          :width="chartWidth"
          :chart-data="data"
          :options="optionsActive"
          :plugins="plugins"
        />

        <BenchmarkWatermark
          left-class="left-[75%]"
          top-class="top-1/2"
          width-class="w-1/2"
        />
      </div>
    </div>
  </div>
</template>

<script>
/** @packages */
import uniqBy from 'lodash/uniqBy'
import intersection from 'lodash/intersection'
import { Decimal } from 'decimal.js'
import { sub } from 'date-fns'

/** @tailwindcss */
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config'

/** @icons */
import SatelliteIcon from '~/assets/icons/Satellite.svg'
import ConstructionIcon from '~/assets/icons/Construction.svg'
import NotYetAssessedIcon from '~/assets/icons/NotYetAssessed.svg'
import DownloadReportIcon from '~/assets/icons/DownloadReportIcon.svg'

/** @components */
import BenchmarkWatermark from '~/components/BenchmarkWatermark.vue'
import BarChart from '~/components/BarChart.vue'
import MarketAssessmentsGigafactoriesData from '~/components/market-assessments/GigafactoriesData.vue'
import MarketAssessmentsFilterLayout from '~/components/market-assessments/FilterLayout.vue'
import PriceAssessmentsSectionTitleChart from '~/components/price-assessments/SectionTitleChart.vue'
import TheTabs from '~/components/common/TheTabs.vue'
import TheLoader from '~/components/TheLoader.vue'

/** @mixins */
import DownloadChartMixin from '~/mixins/DownloadChartMixin'
import ResponsiveChartMixin from '~/mixins/ResponsiveChartMixin'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'

/** @utils */
import { generateCapacityLegends } from '~/utils/custom-legends'
import { EventBus } from '~/utils/eventBus'
import { numberFormatter } from '~/utils/number'

const fullConfig = resolveConfig(tailwindConfig)

export default {
  components: {
    TheLoader,
    TheTabs,
    BarChart,
    DownloadReportIcon,
    BenchmarkWatermark,
    MarketAssessmentsFilterLayout,
    MarketAssessmentsGigafactoriesData,
    PriceAssessmentsSectionTitleChart,
  },
  mixins: [DownloadChartMixin, ResponsiveChartMixin, ScreenSizeMixin],
  props: {
    showSlot: {
      type: Boolean,
      default: false,
    },
    rawData: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    product: {
      type: String,
      default: '',
    },
    colors: {
      type: Array,
      default: () => ['#fdbd00', '#2e459a', '#3856c1', '#a6b9ff'],
    },
    checkClassColors: {
      type: Array,
      default: () => [
        'text-grey-900',
        'text-grey-900',
        'text-grey-900',
        'text-grey-900',
      ],
    },
    circleClassColors: {
      type: Array,
      default: () => [
        'bg-grey-900',
        'bg-grey-900',
        'bg-grey-900',
        'bg-grey-900',
      ],
    },
    capacityUnit: {
      type: String || null,
      default: null,
    },
    decimalPlaces: {
      type: Number,
      default: 0,
    },
    labelTotal: {
      type: String,
      default: 'Total Producers:',
    },
    hideYLabel: {
      type: Boolean,
      default: false,
    },
    isLithiumIonBatteries: {
      type: Boolean,
      default: false,
    },
    regions: {
      type: Array,
      default: () => [
        { name: 'Asia (excl China)', selected: true },
        { name: 'Europe', selected: true },
        { name: 'North America', selected: true },
        { name: 'Other', selected: true },
        { name: 'China', selected: true },
      ],
    },
  },
  data() {
    /**
     * Get years from the first object of the api response
     */
    const years = this.rawData[0].capacities
      .map((capacity) => capacity.label)
      .sort((a, b) => a - b)
    const yearStates = this.getYearStates(years)

    return {
      loading: false,
      allCompanies: [],
      companies: [],
      data: {
        labels: [],
        datasets: [],
      },
      chartHeight: 800,
      yearStates,
      years,
      lastYear: years[2].split(' ')[0],
      dataCollection: {},
      filterCompanies: [],
      selectedAll: true,
      pageSize: 100,
      currentPage: 1,
      status: [
        { selected: true, label: 'Operational', slug: 'operational' },
        { selected: true, label: 'Construction', slug: 'construction' },
        { selected: true, label: 'Not Yet Assessed', slug: 'not_yet_assessed' },
      ],
      plugins: [generateCapacityLegends],
      statusIcons: {
        operational: SatelliteIcon,
        construction: ConstructionIcon,
        not_yet_assessed: NotYetAssessedIcon,
      },
      inputCheckboxClasses:
        'form-checkbox mr-2 h-4 w-4 cursor-pointer rounded-sm text-p-500 focus:shadow-none focus:ring-0 focus:ring-offset-0',
    }
  },
  computed: {
    showChartPagination() {
      return this.$browser.isApple() && this.$browser.isMobile()
    },
    total() {
      let totalCapacity = new Decimal(0)
      const availableYears = Object.keys(this.yearStates).filter(
        (year) => this.yearStates[year] === true,
      )
      this.selectedGigafactories.forEach((gigafactory) => {
        const historicalCapacity = gigafactory.capacities
        availableYears.forEach((year) => {
          historicalCapacity.forEach((capacity) => {
            if (capacity.label === year) {
              totalCapacity = totalCapacity.plus(capacity.value)
            }
          })
        })
      })
      return numberFormatter(totalCapacity, this.decimalPlaces)
    },
    isTotalLabelLarge() {
      return this.total?.length > 5
    },
    chartStyles() {
      return { height: `${this.chartHeight}px` }
    },
    activeGigafactories() {
      return this.selectedGigafactories.filter((gigafactory) => {
        return gigafactory.capacities[0].value > 0
      })
    },
    inactiveGigafactories() {
      return this.selectedGigafactories.length - this.activeGigafactories.length
    },
    selectedGigafactories() {
      return (this.rawData || []).filter((_capacity) => {
        const regions = this.selectedRegions.map((region) => region.name)
        const companies = this.activeCompanies.map((company) => company.name)
        if (this.isLithiumIonBatteries) {
          const status = this.selectedStatus.map((state) => state.slug)
          return (
            regions.includes(_capacity.region) &&
            companies.includes(_capacity.company) &&
            status.includes(_capacity.status.slug)
          )
        }
        return (
          regions.includes(_capacity.region) &&
          companies.includes(_capacity.company)
        )
      })
    },
    selectedGigafactoriesLength() {
      return uniqBy(this.selectedGigafactories, 'id').length
    },
    filteredCapacityLabel() {
      const yearStates = Object.values(this.yearStates)
      yearStates.pop()
      if (
        Object.values(this.yearStates).at(-1) ||
        yearStates.filter((x) => !x).length >= 1
      ) {
        return 'Selected Capacity'
      }
      if (
        this.selectedRegions.length !== this.regions.length ||
        this.activeCompanies.length !== this.allCompanies.length
      ) {
        return `Selected Capacity by ${this.lastYear}`
      }
      return `Total Capacity by ${this.lastYear}`
    },
    selectedRegions() {
      return this.regions.filter((region) => region.selected)
    },
    activeCompanies() {
      return this.companies.filter((company) => company.selected)
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageSize
    },
    endIndex() {
      return this.showChartPagination
        ? this.startIndex + this.pageSize
        : this.selectedGigafactories.length
    },
    selectedStatus() {
      return this.status.filter((state) => state.selected)
    },
    getLabels() {
      return this.selectedGigafactories
        .slice(this.startIndex, this.endIndex)
        .map((gigafactory) => {
          return {
            location: gigafactory.location,
            status: gigafactory.status.slug,
          }
        })
    },
    unitActive() {
      return this.capacityUnit
    },
    optionsActive() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        tooltips: {
          callbacks: {
            label: function label(tooltipItem, data) {
              const currentValueIndex = tooltipItem.index
              const currentYearIndex = tooltipItem.datasetIndex
              const currentYear = data.datasets[tooltipItem.datasetIndex].label
              const unit = data.datasets[tooltipItem.datasetIndex].unit
              const decimalPlaces =
                data.datasets[tooltipItem.datasetIndex].decimalPlaces
              let currentValue = new Decimal(0)
              // Get accumulated capacity per year
              for (let i = 0; i <= currentYearIndex; i++) {
                const yearCapacityValue = new Decimal(
                  data.datasets[i].data[currentValueIndex],
                )
                currentValue = currentValue.plus(yearCapacityValue)
              }
              return `${currentYear}: ${numberFormatter(
                currentValue,
                decimalPlaces,
              )} ${unit}`
            },
          },
        },
        scales: {
          x: {
            position: 'top',
            stacked: true,
            min: 0,
            title: {
              display: true,
              font: {
                family: 'Montserrat',
                size: 16,
              },
              text: this.capacityUnit,
            },
            ticks: {
              padding: 10,
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90,
              font: {
                family: 'Montserrat',
                size: 16,
                color: fullConfig.theme.colors.p.em.high,
              },
            },
          },

          y: {
            display: !this.hideYLabel,
            stacked: true,
            ticks: {
              font: {
                family: 'Montserrat',
                size: 16,
                color: fullConfig.theme.colors.p.em.high,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          htmlLegend: {
            containerID: 'legend-container',
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            callbacks: {
              label(context) {
                const { label, unit, decimalPlaces } = context.dataset
                const currentValueIndex = context.dataIndex
                const currentYearIndex = context.datasetIndex
                let currentValue = new Decimal(0)
                // Get accumulated capacity per year
                for (let i = 0; i <= currentYearIndex; i++) {
                  const yearCapacityValue = new Decimal(
                    context.chart.data.datasets[i].data[currentValueIndex],
                  )
                  currentValue = currentValue.plus(yearCapacityValue)
                }
                return `${label}: ${numberFormatter(
                  currentValue,
                  decimalPlaces,
                )} ${unit}`
              },
            },
          },
        },
      }
    },
  },
  watch: {
    selectedRegions(activeRegions) {
      this.setCompanyBasedOnActiveRegions(activeRegions)
      if (this.selectedGigafactories.length <= 100) {
        this.currentPage = 1
      }
      this.configureGraph()
    },
    activeCompanies() {
      if (this.selectedGigafactories.length <= 100) {
        this.currentPage = 1
      }
      this.configureGraph()
    },
    status: {
      handler() {
        if (this.selectedGigafactories.length <= 100) {
          this.currentPage = 1
        }
        this.configureGraph()
      },
      deep: true,
    },
  },
  mounted() {
    EventBus.$on('toggleonchart', (year) => this.updateChartState(year))
    this.extractCompanies(this.regions)
    this.configureGraph()
  },
  methods: {
    sub,
    configureGraph() {
      const colors = this.colors
      const checkClassColors = this.checkClassColors
      const circleClassColors = this.circleClassColors
      this.data = {
        labels: this.selectedGigafactories
          .slice(this.startIndex, this.endIndex)
          .map((gigafactory) => {
            const strLength = gigafactory.location.length
            if (window.innerWidth >= 768 || strLength < 30) {
              return gigafactory.location
            }
            if (this.showChartPagination) {
              return `${gigafactory.location.substr(0, 30)}...`
            }
            const items = gigafactory.location.split(',')
            return [items.shift(), items.join(', ')]
          }),
        datasets: this.years.map((year, index) => ({
          axis: 'y',
          label: year,
          backgroundColor: colors[index],
          checkClassColor: checkClassColors[index],
          circleClassColor: circleClassColors[index],
          data: this.getDataCollectionFromYear(year),
          unit: this.unitActive,
          decimalPlaces: this.decimalPlaces,
          barThickness: 24,
        })),
      }
      /**
       * We reduce the height of the chart to avoid this error on iPhone:
       * "Canvas area exceeds the maximum limit (width * height > 16777216)"
       */
      this.chartHeight =
        150 +
        this.selectedGigafactories.slice(this.startIndex, this.endIndex)
          .length *
          30

      this.setDatasetStates()
    },
    selectAll() {
      this.companies.forEach(
        (company) => (company.selected = !this.selectedAll),
      )
      this.selectedAll = !this.selectedAll
    },
    setCompanyBasedOnActiveRegions(activeRegions) {
      this.companies = this.allCompanies.filter((company) => {
        return intersection(
          company.regions,
          activeRegions.map((region) => region.name),
        ).length
      })
      this.filterCompanies = this.companies
    },
    extractCompanies() {
      const uniqueCompanies = uniqBy(this.rawData, 'company').map(
        (company) => company.company,
      )
      this.companies = uniqueCompanies.map((companyName) => {
        const companies = this.rawData.filter(
          (company) => company.company === companyName,
        )
        return {
          name: companyName,
          selected: true,
          regions: companies.map((company) => company.region),
        }
      })
      /**
       * This is to handle a kind of cache for every time the regions filter
       * changes, that gives the advantage of not doing this calculation again
       */
      this.allCompanies = this.companies
      this.filterCompanies = this.companies
    },
    getYearStates(years) {
      const yearStates = {}
      years.forEach((year) => (yearStates[year] = true))
      yearStates[years[years.length - 1]] = false
      return yearStates
    },
    setDatasetStates() {
      this.data.datasets.forEach((ds) => {
        ds.hidden = !this.yearStates[ds.label]
      })
    },
    getDataCollectionFromYear(year) {
      const dataCollection = []
      this.selectedGigafactories
        .slice(this.startIndex, this.endIndex)
        .forEach((gigafactory) => {
          gigafactory.capacities.forEach((capacity) => {
            if (capacity.label === year) {
              dataCollection.push(capacity.value)
            }
          })
        })
      return dataCollection
    },
    updateChartState(year) {
      this.yearStates[year] = !this.yearStates[year]
    },
    searchChange(search) {
      const filter = this.companies.filter((company) => {
        return company.name.toLowerCase().includes(search.toLowerCase())
      })
      this.filterCompanies = [...filter]
    },
    updatePage(page) {
      this.currentPage = page
      this.configureGraph()
    },
  },
}
</script>
