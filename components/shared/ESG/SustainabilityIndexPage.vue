<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <div class="max-w-content-container mx-auto">
    <div class="flex flex-col gap-10 xl:flex-row">
      <div class="flex flex-col gap-6">
        <p class="text-sm lg:max-w-3xl">
          <slot></slot>
        </p>
        <LinkWithAnimation
          v-if="!isAuthenticated"
          text="Contact Us"
          :services="initialFields"
          class="!w-fit flex-shrink-0 font-semibold"
          @click="openContactForm"
        />
        <CommonButtonDownload
          v-if="isAuthenticated && report"
          class="min-w-[140px] max-w-full !rounded lg:max-w-fit"
          :download-file="reportFile"
          variant="secondary"
          data-testid="lithium-sustainability-download-button"
        />
      </div>
      <div class="w-[100%] lg:min-h-[300px] lg:min-w-[500px] lg:max-w-[500px]">
        <PlayerVideoVimeoModal :vimeo-id="vimeoId" />
      </div>
    </div>
    <SustainabilityIndexTable
      :sustainability-indexes="sustainabilityIndexes"
      :product="product"
      :subscription="subscription"
    />
  </div>
</template>
<script>
import CommonButtonDownload from '~/components/shared/common/ButtonDownload.vue'
import PlayerVideoVimeoModal from '~/components/video/PlayerVideoVimeoModal.vue'
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import SustainabilityIndexTable from '~/components/esg/SustainabilityIndexTable.vue'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'

import { getServices } from '~/constants/services'
import { logError } from '~/utils/log-error'

export default {
  components: {
    SustainabilityIndexTable,
    CommonButtonDownload,
    PlayerVideoVimeoModal,
    LinkWithAnimation,
  },
  mixins: [AuthorizationMixin, ScreenSizeMixin],
  props: {
    title: {
      type: String,
      required: true,
    },
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
    vimeoId: {
      type: Number,
      required: true,
    },
    initialFields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      columnDefs: [],
      sustainabilityData: {},
      loading: true,
      reports: null,
      report: null,
      defaultColDef: {
        sortable: false,
        cellClass: (params) => this.cellClass(params, 'justify-end'),
        minWidth: 180,
        suppressMovable: true,
      },
      activeMineral: null,
      isAuthorized: false,
    }
  },
  computed: {
    reportFile() {
      return { ...this.report, category: this.subscription }
    },
  },
  async mounted() {
    this.activeMineral = this.sustainabilityIndexes[0]
    const hasAuthorized = await this.hasAuthorized()
    this.isAuthorized = hasAuthorized
    if (hasAuthorized) {
      await this.getReportData()
    }
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
    cellClass(params, extraClass) {
      const { value } = params
      if (typeof value === 'number') {
        return `!flex items-center justify-end tabular-nums !border-b !border-b-solid !border-b-white ${extraClass}`
      }
      return `!flex items-center ${extraClass}`
    },
    async getSustainabilityIndex() {
      this.loading = true
      try {
        if (
          !this.sustainabilityData[this.tapNameActive] ||
          this.sustainabilityData[this.tapNameActive].length <= 0 ||
          (this.isAuthorized &&
            !this.sustainabilityData[this.tapNameAuthenticatedActive])
        ) {
          const response =
            await this.$restClient.getSustainabilityIndexByProduct(
              this.product,
              this.activeMineral.slug,
            )
          this.sustainabilityData[this.activeMineral.slug] = response.map(
            (item) => this.transformData(item),
          )
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
          if (this.isAuthenticated && originalData[key].children) {
            originalData[key].children.forEach((category) => {
              transformedData[category.label] = category.index_score
            })
          }
        }
      }

      Object.keys(originalData).forEach((key) => {
        const value = this.isAuthenticated
          ? originalData[key].index_score
          : originalData[key].overall_index_performance
        transform(key, value)
      })

      return transformedData
    },
    async getReportData() {
      try {
        const tag = this.activeMineral.tag || 'esg-matrix'
        if (!this.reports) {
          this.reports = await this.$downloadManager.getFilesForESG({
            categories: [this.subscription],
          })
        }
        this.report = this.reports[this.subscription].filter(
          (item) => item.post_type === tag,
        )[0]
      } catch (error) {
        logError(error)
      }
    },
    openContactForm() {
      const modalName = 'contact'
      if (this.initialFields === null) return this.$modal.open(modalName)

      if (
        this.initialFields instanceof Array &&
        this.initialFields?.length > 0
      ) {
        const initialValues = getServices([...this.initialFields])
        this.$store.commit('modal/setInitialFields', initialValues)
        return this.$modal.open(modalName)
      }

      this.$store.commit('modal/setInitialFields', this.initialFields)
      return this.$modal.open(modalName)
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
