<template>
  <div class="flex min-h-[630px] basis-1/2 flex-col gap-5">
    <div
      v-if="loadingHistoricalChemical"
      class="flex h-full max-h-[350px] w-full items-center justify-center"
    >
      <Loader />
    </div>
    <StackedBarPortalChart
      v-else
      class="h-full max-h-[700px] w-full lg:max-h-[330px]"
      :legend="legendHistoricalChemical"
      :title="titleHistoricalChemical"
      :datasets="historicalChemicalPortal.data"
      :labels="historicalChemicalPortal.labels"
      :background-color="backgroundColorsHistoricalChemical"
      :unit="historicalChemicalPortal.unit"
      identifier="historicalChemical"
      height="h-[300px] lg:h-[200px]"
    />
    <div
      v-if="loadingSupplyCompany"
      class="flex h-full min-h-[315px] w-full items-center justify-center"
    >
      <Loader />
    </div>
    <DoughnutPortalChart
      v-else
      identifier="supplyChart"
      :data="supplyCompanyPortal.data"
      :labels="supplyCompanyPortal.labels"
      :unit="supplyCompanyPortal.unit"
      :has-access="hasAccess"
      :digits="0"
    >
      <h3 class="text-surface-em-high mb-3.5 text-xl font-bold">
        {{ supplyCompanyPortal.title }}
      </h3>
    </DoughnutPortalChart>
  </div>
</template>

<script>
import DoughnutPortalChart from '~/components/price-assessments/DoughnutPortalChart.vue'
import Loader from '~/components/TheLoader.vue'
import StackedBarPortalChart from '~/components/price-assessments/StackedBarPortalChart.vue'

export default {
  components: {
    DoughnutPortalChart,
    Loader,
    StackedBarPortalChart,
  },
  props: {
    historicalChemical: {
      type: Object || null,
      default: null,
    },
    titleHistoricalChemical: {
      type: String,
      required: true,
    },
    legendHistoricalChemical: {
      type: String,
      default: 'Supply (LCe tpa)',
    },
    backgroundColorsHistoricalChemical: {
      type: Array,
      default: () => [
        '#374C33',
        '#FDC723',
        '#EA8000',
        '#BA86A2',
        '#7D2F59',
        '#DADADA',
        '#589F97',
      ],
    },
    loadingHistoricalChemical: {
      type: Boolean,
      default: true,
    },
    supplyCompany: {
      type: Object || null,
      default: null,
    },
    loadingSupplyCompany: {
      type: Boolean,
      default: true,
    },
    hasAccess: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    historicalChemicalPortal() {
      const labels =
        [
          ...new Set([
            ...(this.historicalChemical?.regions[0]?.data || []).map(
              (_region) => _region.year,
            ),
          ]),
        ]?.sort((a, b) => a - b) ?? []

      const lastYear = labels.at(-1)
      const data =
        this.historicalChemical?.regions.map((_region) => {
          return {
            label: _region.name,
            data: _region.data.map((_item) => {
              if (_item.year === lastYear) return 0
              return _item.value
            }),
          }
        }) ?? []

      const forecastDemand = this.historicalChemical?.regions.reduce(
        (accumulator, object) => {
          const _data = object.data.find((data) => data.year === lastYear)
          return accumulator + (_data ? _data.value : 0)
        },
        0,
      )

      data.push({
        label: 'Forecast Demand',
        data: this.historicalChemical?.regions[0].data.map((_item) => {
          if (_item.year === lastYear) return forecastDemand
          return 0
        }),
      })

      return {
        unit: this.historicalChemical?.unit ?? '',
        labels,
        data,
      }
    },
    supplyCompanyPortal() {
      return {
        unit: this.supplyCompany.unit ?? '',
        labels:
          this.supplyCompany?.companies.map((_company) => _company.company) ??
          [],
        data:
          this.supplyCompany?.companies.map(
            (_company) => _company.production,
          ) ?? [],
        title: `${this.supplyCompany.year} Chemical Supply by Company`,
      }
    },
  },
}
</script>
