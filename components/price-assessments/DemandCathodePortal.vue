<template>
  <div class="rounded-xl px-4 pb-5 pt-7">
    <div
      class="relative flex flex-col gap-10 md:gap-[50px] xl:min-h-[630px] xl:flex-row xl:gap-2"
    >
      <SubscriptionOverlay :show-overlay="!isAuthenticated" />
      <div
        class="flex w-full flex-col justify-between gap-10 md:gap-[36px] xl:flex-row"
      >
        <div
          v-if="loadingDemandChemistry"
          class="flex h-full min-h-[630px] w-full items-center justify-center md:basis-1/2"
        >
          <Loader />
        </div>
        <StackedBarPortalChart
          v-else
          :legend="demandChemistryLegend"
          :title="titleDemandChemistry"
          :datasets="demandChemistryPortal.data"
          :labels="demandChemistryPortal.labels"
          :show-y-axis="isAuthenticated"
          :unit="demandChemistryPortal.unit"
          identifier="demandChemistry"
          class="h-[600px] basis-1/2"
          height="h-[450px]"
        />
        <div
          v-if="loadingEndMarket"
          class="flex h-full min-h-[630px] w-full items-center justify-center md:basis-1/2"
        >
          <Loader />
        </div>

        <DoughnutPortalChart
          v-else
          identifier="demandChart"
          :data="endMarketPortal.data"
          :labels="endMarketPortal.labels"
          :unit="endMarketPortal.unit"
          :digits="0"
          class="basis-1/2 justify-center"
          :has-access="isAuthenticated"
        >
          <h3 class="text-s-900 mb-4 text-lg font-semibold">
            Global Battery Consumption
          </h3>
        </DoughnutPortalChart>
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutPortalChart from '~/components/price-assessments/DoughnutPortalChart.vue'
import Loader from '~/components/TheLoader.vue'
import StackedBarPortalChart from '~/components/price-assessments/StackedBarPortalChart.vue'
import { reformat } from '~/utils/date'

import SubscriptionOverlay from '~/components/price-assessments/SubscriptionOverlay.vue'

export default {
  components: {
    DoughnutPortalChart,
    Loader,
    StackedBarPortalChart,
    SubscriptionOverlay,
  },
  props: {
    evGlobalSales: {
      type: Object || null,
      default: null,
    },
    titleEvGlobalSales: {
      type: String,
      required: true,
    },
    backgroundColorsEvGlobalSales: {
      type: Array,
      default: () => ['#374C33', '#FDC723'],
    },
    loadingEvGlobalSales: {
      type: Boolean,
      default: true,
    },
    endMarket: {
      type: Object || null,
      default: null,
    },
    loadingEndMarket: {
      type: Boolean,
      default: true,
    },
    demandChemistry: {
      type: Object || null,
      default: null,
    },
    titleDemandChemistry: {
      type: String,
      default: 'Cathode Demand',
    },
    loadingDemandChemistry: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/authenticated']
    },
    evGlobalSalesPortal() {
      const labels =
        [
          ...new Set([
            ...(this.evGlobalSales?.vehiclesTypes[0]?.data || []).map(
              (_vehicle) => reformat(_vehicle.name, 'MMM yyyy'),
            ),
          ]),
        ]?.sort((a, b) => a - b) ?? []

      const data = this.evGlobalSales?.vehiclesTypes?.map((_vehicle) => {
        return {
          label: _vehicle.name,
          data: _vehicle.data.map((_item) => _item.data),
        }
      })
      return {
        unit: this.evGlobalSales?.unit ?? '',
        labels,
        data,
      }
    },
    endMarketPortal() {
      return {
        unit: this.endMarket?.unit ?? '',
        labels: this.endMarket?.data?.map((_market) => _market.name) ?? [],
        data: this.endMarket?.data?.map((_market) => _market.data) ?? [],
        year: this.endMarket?.year ?? '',
      }
    },
    demandChemistryPortal() {
      const labels =
        [
          ...new Set([
            ...(this.demandChemistry?.chemistries[0]?.data || []).map(
              (_chemistry) => _chemistry.name,
            ),
          ]),
        ].sort((a, b) => a - b) ?? []

      const lastYear = labels.at(-1)
      const data = this.demandChemistry?.chemistries?.map((_chemistry) => {
        return {
          label: _chemistry.name,
          data: _chemistry.data.map((_item) => {
            if (_item.name === lastYear) return 0
            return _item.data
          }),
        }
      })
      const forecastDemand = this.demandChemistry?.chemistries?.reduce(
        (accumulator, object) => {
          const _data = object.data.find((data) => data.name === lastYear)
          return accumulator + (_data ? _data.data : 0)
        },
        0,
      )
      data.push({
        label: 'Forecast Demand',
        data: this.demandChemistry?.chemistries[0]?.data.map((_item) => {
          if (_item.name === lastYear) return forecastDemand
          return 0
        }),
      })

      return {
        unit: this.demandChemistry?.unit ?? '',
        labels,
        data,
      }
    },
    demandChemistryLegend() {
      return `Demand (${this.demandChemistryPortal.unit})`
    },
  },
}
</script>
