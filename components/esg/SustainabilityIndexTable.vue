<template>
  <div class="max-w-content-container mx-auto">
    <div class="relative">
      <div v-show="sustainabilityIndexes.length > 1" class="mb-0.5 mt-4 flex">
        <PriceAssessmentsSummaryViewerTab
          v-for="sustainabilityIndex in sustainabilityIndexes"
          :key="sustainabilityIndex.name"
          class="max-w-[130px]"
          :is-active="activeMineral?.name === sustainabilityIndex.name"
          :text="sustainabilityIndex.name"
          @click="updateTabView(sustainabilityIndex.name)"
        />
      </div>
      <SwipeIndicator
        v-if="sustainabilityData[tapNameActive]?.length"
        class="absolute left-1/2 top-[100px] z-10 -translate-x-1/2 md:hidden"
      />
      <div
        class="relative h-full overflow-auto md:overflow-hidden"
        :class="[
          isAuthorized ? 'min-h-[500px] md:min-h-[458px]' : 'min-h-[280px]',
        ]"
      >
        <div class="absolute h-full w-full">
          <div v-if="loading" class="absolute left-0 top-20 w-full lg:top-32">
            <TheLoader />
          </div>
          <div v-else class="ag-grid-sustainability-index-page">
            <div
              v-if="hasData()"
              class="ag-grid-pa-portal table-isolation h-full"
            >
              <CustomTable
                v-if="isAuthorized"
                data-testid="sustainability-table"
                :class="[sustainabilityIndexes.length > 1 ? 'mt-0' : 'mt-4']"
                :column-defs="columnDefs"
                :row-data="sustainabilityData[tapNameActive]"
                :row-height="32"
                :default-col-def="defaultColDef"
                pagination
              />
              <div v-else class="min-w-[750px]">
                <div
                  class="border-p-500 absolute top-[66px] w-full min-w-[750px] border-b-4 md:hidden"
                ></div>
                <UnauthorizedTableSustainabilityIndex
                  :items="sustainabilityData[tapNameActive]"
                />
              </div>
            </div>
            <div
              v-else
              class="flex h-full min-h-[280px] w-full items-center justify-center text-lg font-semibold"
            >
              Data available soon
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SwipeIndicator from '~/components/price-assessments/SwipeIndicator.vue'
import CustomTable from '~/components/price-assessments/CustomTableAG.vue'
import CustomHeaderTable from '~/components/price-assessments/CustomHeaderTable'
import UnauthorizedTableSustainabilityIndex from '~/components/shared/ESG/UnauthorizedTableSustainabilityIndex.vue'
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'
import { logError } from '~/utils/log-error'

export default {
  components: {
    SwipeIndicator,
    CustomTable,
    // eslint-disable-next-line vue/no-unused-components
    CustomHeaderTable,
    UnauthorizedTableSustainabilityIndex,
  },
  mixins: [AuthorizationMixin, ScreenSizeMixin],
  props: {
    sustainabilityIndexes: {
      type: Array,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      columnDefs: [],
      sustainabilityData: {},
      loading: true,
      defaultColDef: {
        sortable: false,
        cellClass: (params) => this.cellClass(params, 'justify-end'),
        minWidth: 180,
        suppressMovable: true,
        resizable: false,
      },
      activeMineral: null,
      isReady: false,
      isAuthorized: false,
    }
  },
  computed: {
    tapNameActive() {
      return this.activeMineral?.slug
    },
    tapNameAuthenticatedActive() {
      return `${this.tapNameActive}_authorized`
    },
  },
  watch: {
    isAuthenticated: {
      handler() {
        this.forceRerender()
      },
      deep: true,
    },
    sustainabilityData: {
      handler() {
        this.isReady = this.hasData()
      },
      deep: true,
    },
  },
  async mounted() {
    const data = {}
    const hasAuthorized = await this.hasAuthorized()
    this.isAuthorized = hasAuthorized
    this.sustainabilityIndexes.forEach((item) => {
      data[`${item.slug}_authorized`] = hasAuthorized
    })
    this.sustainabilityData = data
    this.activeMineral = this.sustainabilityIndexes[0]
    await this.getSustainabilityIndex()
    this.columnDefs = [
      {
        field: 'company',
        headerName: '',
        pinned: this.isMobile() ? '' : 'left',
        cellClass: (params) => this.cellClass(params, 'border-right'),
        minWidth: 280,
      },
      {
        field: 'overall_index_performance',
        headerName: 'Classification',
        minWidth: 150,
        headerClass:
          'without-overflow right-text bg-[#8F0000] text-white hover:!bg-[#8F0000]/[.8] text-xs !border-r !border-r-solid !border-r-white',
      },
      {
        field: 'index_score',
        headerName: 'Benchmark Sustainability Index Score',
        minWidth: 150,
        headerClass:
          'without-overflow right-text bg-[#FDBD00] text-black hover:!bg-[#FDBD00]/[.8] text-xs !border-r !border-r-solid !border-r-white',
      },
      {
        field: 'environment',
        headerName: 'Environment',
        headerClass:
          'right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !border-r !border-r-solid !border-r-white',
        headerComponent: 'CustomHeaderTable',
        headerComponentParams: {
          childrenColumns: [
            'E.1',
            'E.2',
            'E.3',
            'E.4',
            'E.5',
            'E.6',
            'E.7',
            'E.8',
            'E.9',
            'E.10',
            'E.11',
          ],
        },
      },
      {
        field: 'Net zero/carbon neutrality',
        headerName: 'E.1 Net zero/carbon neutrality',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.1',
        hide: true,
      },
      {
        field: 'Carbon accounting',
        headerName: 'E.2 Carbon accounting',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003a1e]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.2',
        hide: true,
      },
      {
        field: 'LCA',
        headerName: 'E.3 LCA',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003a1e]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.3',
        hide: true,
      },
      {
        field: 'Emissions reductions activities',
        headerName: 'E.4 Emissions reductions activities',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.4',
        hide: true,
      },
      {
        field: 'Carbon tools',
        headerName: 'E.5 Carbon tools',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.5',
        hide: true,
      },
      {
        field: 'Water accounting and management',
        headerName: 'E.6 Water accounting and management',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.6',
        hide: true,
      },
      {
        field: 'Biodiversity',
        headerName: 'E.7 Biodiversity',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.7',
        hide: true,
      },
      {
        field: 'Circular economy',
        headerName: 'E.8 Circular economy',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.8',
        hide: true,
      },
      {
        field: 'Pollution',
        headerName: 'E.9 Pollution',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.9',
        hide: true,
      },
      {
        field: 'Disclosure frameworks',
        headerName: 'E.10 Disclosure frameworks',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.10',
        hide: true,
      },
      {
        field: 'Waste and tailings management',
        headerName: 'E.11 Waste and tailings management',
        headerClass:
          'without-overflow right-text bg-[#003A1E] text-white hover:!bg-[#003A1E]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'E.11',
        hide: true,
      },
      {
        field: 'social',
        headerName: 'Social',
        headerClass:
          'without-overflow right-text bg-[#E25100] text-white hover:!bg-[#E25100]/[.8] text-xs !border-r !border-r-solid !border-r-white',
        headerComponent: 'CustomHeaderTable',
        headerComponentParams: {
          childrenColumns: ['S.1', 'S.2', 'S.3', 'S.4', 'S.5', 'S.6', 'S.7'],
        },
      },
      {
        field: 'Workforce',
        headerName: 'S.1 Workforce',
        headerClass:
          'without-overflow right-text bg-[#E25100] text-white hover:!bg-[#E25100]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'S.1',
        hide: true,
      },
      {
        field: 'Gender',
        headerName: 'S.2 Gender',
        headerClass:
          'without-overflow right-text bg-[#E25100] text-white hover:!bg-[#E25100]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'S.2',
        hide: true,
      },
      {
        field: 'Indigenous Peoples',
        headerName: 'S.3 Indigenous Peoples',
        headerClass:
          'without-overflow right-text bg-[#E25100] text-white hover:!bg-[#E25100]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'S.3',
        hide: true,
      },
      {
        field: 'Resettlement',
        headerName: 'S.4 Resettlement',
        headerClass:
          'without-overflow right-text bg-[#E25100] text-white hover:!bg-[#E25100]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'S.4',
        hide: true,
      },
      {
        field: 'Local spending and investment',
        headerName: 'S.5 Local spending and investment',
        headerClass:
          'without-overflow right-text bg-[#E25100] text-white hover:!bg-[#E25100]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'S.5',
        hide: true,
      },
      {
        field: 'Social conflict around environmental issues',
        headerName: 'S.6 Social conflict around environmental issues',
        headerClass:
          'without-overflow right-text bg-[#E25100] text-white hover:!bg-[#E25100]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'S.6',
        hide: true,
      },
      {
        field: 'Artisanal and small-scale mining (ASM)',
        headerName: 'S.7 Artisanal and small-scale mining (ASM)',
        headerClass:
          'without-overflow right-text bg-[#E25100] text-white hover:!bg-[#E25100]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'S.7',
        hide: true,
      },
      {
        field: 'governance',
        headerName: 'Governance',
        headerComponent: 'CustomHeaderTable',
        headerComponentParams: {
          childrenColumns: [
            'G.1',
            'G.2',
            'G.3',
            'G.4',
            'G.5',
            'G.6',
            'G.7',
            'G.8',
            'G.9',
          ],
        },
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !border-r !border-r-solid !border-r-white',
      },
      {
        field: 'ESG Reporting',
        headerName: 'G.1 ESG Reporting',
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'G.1',
        hide: true,
      },
      {
        field: 'Internal policies',
        headerName: 'G.2 Internal policies',
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'G.2',
        hide: true,
      },
      {
        field: 'Gender diversity',
        headerName: 'G.3 Gender diversity',
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'G.3',
        hide: true,
      },
      {
        field: 'Auditing and sustainability standards',
        headerName: 'G.4 Auditing and sustainability standards',
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'G.4',
        hide: true,
      },
      {
        field: 'Human rights',
        headerName: 'G.5 Human rights',
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'G.5',
        hide: true,
      },
      {
        field: 'Responsible sourcing',
        headerName: 'G.6 Responsible sourcing',
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'G.6',
        hide: true,
      },
      {
        field: 'Health and Safety',
        headerName: 'G.7 Health and Safety',
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'G.7',
        hide: true,
      },
      {
        field: 'Mine closure',
        headerName: 'G.8 Mine closure',
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        cellClass: (params) => this.cellClass(params, 'justify-end'),
        colId: 'G.8',
        hide: true,
      },
      {
        field: 'Contract transparency',
        headerName: 'G.9 Contract transparency',
        headerClass:
          'without-overflow right-text bg-[#192E5B] text-white hover:!bg-[#192E5B]/[.8] !text-xs !border-r !border-r-solid !border-r-white',
        colId: 'G.9',
        hide: true,
      },
    ]
  },
  methods: {
    async hasAuthorized() {
      const authorized = await this.hasMembership(this.subscription)
      return authorized && this.isAuthenticated
    },
    hasData() {
      return this.sustainabilityData[this.tapNameActive]?.length > 0
    },
    async forceRerender() {
      try {
        this.loading = true
        const isAuthorized = await this.hasAuthorized()
        this.isAuthorized = isAuthorized
        if (
          isAuthorized &&
          !this.sustainabilityData[this.tapNameAuthenticatedActive]
        ) {
          const response =
            await this.$restClient.getSustainabilityIndexByProduct(
              this.product,
              this.tapNameActive,
            )
          this.sustainabilityData[this.tapNameActive] = response.map((item) =>
            this.transformData(item),
          )
          this.sustainabilityData[this.tapNameAuthenticatedActive] =
            this.isAuthorized
        }
        this.isReady = this.hasData()
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },
    cellClass(params, extraClass) {
      const { value } = params
      if (typeof value === 'number') {
        return `!flex items-center justify-end tabular-nums !border-b !border-b-solid !border-b-white ${extraClass}`
      }
      return `!flex items-center ${extraClass}`
    },
    async getSustainabilityIndex() {
      try {
        this.loading = true
        if (
          !this.sustainabilityData[this.tapNameActive] ||
          this.sustainabilityData[this.tapNameActive].length <= 0 ||
          (this.isAuthorized &&
            !this.sustainabilityData[this.tapNameAuthenticatedActive])
        ) {
          const response =
            await this.$restClient.getSustainabilityIndexByProduct(
              this.product,
              this.tapNameActive,
            )
          this.sustainabilityData[this.tapNameAuthenticatedActive] =
            this.isAuthorized
          this.sustainabilityData[this.tapNameActive] = response.map((item) =>
            this.transformData(item),
          )
          this.isReady = this.hasData()
        }
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },
    transformData(originalData) {
      const transformedData = {
        company: originalData.company,
        index_score: originalData.index_score,
        overall_index_performance: originalData.overall_index_performance,
      }

      const excludedKeys = [
        'company',
        'index_score',
        'overall_index_performance',
      ]

      const transform = (key, value) => {
        if (!excludedKeys.includes(key)) {
          transformedData[key] = value
          if (this.isAuthorized && originalData[key].children) {
            originalData[key].children.forEach((category) => {
              transformedData[category.label] = category.index_score
            })
          }
        }
      }

      Object.keys(originalData).forEach((key) => {
        const value = this.isAuthorized
          ? originalData[key].index_score
          : originalData[key].overall_index_performance
        transform(key, value)
      })

      return transformedData
    },
    updateTabView(typeName) {
      this.activeMineral = this.sustainabilityIndexes.find(
        (sustainabilityIndex) => sustainabilityIndex.name === typeName,
      )
      this.getSustainabilityIndex()
    },
  },
}
</script>
<style lang="scss">
.table-isolation {
  .ag-body {
    border: none !important;
  }
  .ag-center-cols-container,
  .ag-pinned-left-cols-container {
    border: none !important;
    & > div {
      border: none !important;
      & > div {
        border: solid 1px #f0f1f7 !important;
      }
    }
  }
}
</style>
