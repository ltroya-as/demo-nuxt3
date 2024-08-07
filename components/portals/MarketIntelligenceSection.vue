<template>
  <div>
    <h3
      class="border-p-500 text-s-900 mb-2.5 border-l-4 pl-2 text-3xl font-bold capitalize"
    >
      Market Intelligence
    </h3>
    <div class="flex gap-2 border-b-2 border-[#c1c5cf]">
      <PriceAssessmentsSummaryViewerTab
        v-for="tab in tabsName"
        :key="tab"
        :is-active="activeTab === tab"
        :text="tab"
        @click="updateTabView(tab)"
      />
    </div>
    <DemandCathodePortal
      v-if="activeTab === 'Demand'"
      title-ev-global-sales="Global EV Sales"
      :ev-global-sales="evGlobalSales"
      :loading-ev-global-sales="loadingEvGlobalSales"
      :end-market="endMarket"
      :loading-end-market="loadingEndMarket"
      title-demand-chemistry="Cathode Demand"
      :demand-chemistry="demandChemistry"
      :loading-demand-chemistry="loadingDemandChemistry"
    />
    <div v-else class="px-4 pb-5 pt-7">
      <div class="relative flex flex-col gap-6 lg:flex-row">
        <SubscriptionOverlay :show-overlay="!isAuthenticated" />
        <MinesSupplyPortal
          class="lg:basis-1/2"
          :mines="mines"
          :loading="loadingMines"
        />
        <SupplyChemicalPortal
          :supply-company="supplyCompany"
          :loading-supply-company="loadingSupplyCompany"
          title-historical-chemical="Historical Chemical Lithium Production"
          :historical-chemical="historicalChemical"
          :loading-historical-chemical="loadingHistoricalChemical"
          :has-access="isAuthenticated"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { historyChemical } from '~/constants/dummyData/historicalChemical'
import { supplyCompany } from '~/constants/dummyData/supplyCompany'
import { demandChemistry } from '~/constants/dummyData/demandChemistry'
import { endMarket } from '~/constants/dummyData/endMarket'
import { mines } from '~/constants/dummyData/mines'

import DemandCathodePortal from '~/components/price-assessments/DemandCathodePortal.vue'
import MinesSupplyPortal from '~/components/price-assessments/MinesSupplyPortal.vue'
import SupplyChemicalPortal from '~/components/price-assessments/SupplyChemicalPortal.vue'
import PriceAssessmentsSummaryViewerTab from '~/components/price-assessments/SummaryViewerTab.vue'
import SubscriptionOverlay from '~/components/price-assessments/SubscriptionOverlay.vue'

import { logError } from '~/utils/log-error'

export default {
  components: {
    DemandCathodePortal,
    MinesSupplyPortal,
    SupplyChemicalPortal,
    PriceAssessmentsSummaryViewerTab,
    SubscriptionOverlay,
  },
  props: {
    category: {
      type: String,
      default: () => null,
    },
  },
  data() {
    return {
      tabsName: ['Demand', 'Supply'],
      activeTab: 'Demand',
      evGlobalSales: null,
      loadingEvGlobalSales: true,
      endMarket: null,
      loadingEndMarket: true,
      demandChemistry: null,
      loadingDemandChemistry: true,
      mines: [],
      loadingMines: true,
      supplyCompany: null,
      loadingSupplyCompany: true,
      historicalChemical: null,
      loadingHistoricalChemical: true,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/authenticated']
    },
  },
  watch: {
    isAuthenticated: {
      handler() {
        this.getGlobalEVSalesPortal()
        this.getEndMarketPortal()
        this.getCathodeDemandPortal()
        this.getHistoricalChemicalPortal()
        this.getSupplyCompanyPortal()
        this.getAllMines()
      },
      deep: true,
    },
  },
  mounted() {
    this.getGlobalEVSalesPortal()
    this.getEndMarketPortal()
    this.getCathodeDemandPortal()
    this.getHistoricalChemicalPortal()
    this.getSupplyCompanyPortal()
    this.getAllMines()
  },
  methods: {
    updateTabView(tab) {
      this.activeTab = tab
    },

    async getAllMines() {
      try {
        this.loadingMines = true
        if (!this.isAuthenticated) {
          this.mines = mines
        } else {
          this.mines =
            (await this.$restClient.getCurrentMinesByMineral(this.category))
              ?.data ?? []
        }
      } catch (error) {
        this.mines = []
        logError(error)
      } finally {
        this.loadingMines = false
      }
    },

    async getHistoricalChemicalPortal() {
      try {
        this.loadingHistoricalChemical = true
        if (!this.isAuthenticated) {
          this.historicalChemical = historyChemical
        } else {
          const response =
            await this.$restClient.getHistoricalChemicalByMineral(this.category)
          this.historicalChemical = response?.data ?? {}
        }
      } catch (error) {
        logError(error)
      } finally {
        this.loadingHistoricalChemical = false
      }
    },

    async getSupplyCompanyPortal() {
      try {
        this.loadingSupplyCompany = true
        if (!this.isAuthenticated) {
          this.supplyCompany = supplyCompany
        } else {
          const response = await this.$restClient.getSupplyCompanyByMineral(
            this.category,
          )
          this.supplyCompany = response?.data ?? {}
        }
      } catch (error) {
        logError(error)
      } finally {
        this.loadingSupplyCompany = false
      }
    },

    async getGlobalEVSalesPortal() {
      try {
        const response = await this.$restClient.getGlobalEVSalesByMineral(
          this.category,
        )
        this.evGlobalSales = response?.data ?? {}
      } catch (error) {
        logError(error)
      } finally {
        this.loadingEvGlobalSales = false
      }
    },

    async getEndMarketPortal() {
      try {
        this.loadingEndMarket = true
        if (!this.isAuthenticated) {
          this.endMarket = {
            unit: endMarket.unit,
            data: endMarket.markets?.data?.sort((a, b) => b.data - a.data),
            year: endMarket.markets?.name,
          }
        } else {
          const response = await this.$restClient.getEndMarketByMineral(
            this.category,
          )
          this.endMarket = {
            unit: response?.data.unit,
            data: response?.data?.markets?.data?.sort(
              (a, b) => b.data - a.data,
            ),
            year: response?.data?.markets?.name,
          }
        }
      } catch (error) {
        logError(error)
      } finally {
        this.loadingEndMarket = false
      }
    },

    async getCathodeDemandPortal() {
      try {
        this.loadingDemandChemistry = true
        if (!this.isAuthenticated) {
          this.demandChemistry = demandChemistry
        } else {
          const response = await this.$restClient.getCathodeDemandByMineral(
            this.category,
          )
          this.demandChemistry = response?.data ?? {}
        }
      } catch (error) {
        logError(error)
      } finally {
        this.loadingDemandChemistry = false
      }
    },
  },
}
</script>
