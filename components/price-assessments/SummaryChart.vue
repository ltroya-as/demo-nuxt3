<template>
  <div>
    <div class="bg-grey-300 h-[42px]"></div>
    <div class="relative px-6 py-8">
      <div
        v-if="title"
        class="mb-4 flex w-full flex-row items-center justify-center font-bold lg:text-xl"
      >
        {{ slug !== 'synthetic-graphite' ? title : altTitle }}
        {{ slug !== 'synthetic-graphite' ? 'Prices' : '' }} Index
      </div>
      <div id="legend-container" class="mb-4" />
      <PriceAssessmentsLineChart
        :chart-data="datacollection"
        :plugins="plugins"
        class="relative z-20 min-h-[400px] w-full"
      />
      <div class="mt-4 text-right text-xs font-normal">*Index Values</div>

      <BenchmarkWatermark />
    </div>
    <div class="block overflow-x-auto">
      <PriceAssessmentsSummaryTableIndex
        :authorized="tableAuthorized"
        :pricing="tablePricing"
        :slug="slug"
        :summary="tableSummary"
      />
    </div>
  </div>
</template>

<script>
import { CrosshairPlugin } from 'chartjs-plugin-crosshair'
import PriceAssessmentsLineChart from '~/components/price-assessments/LineChart.vue'
import PriceAssessmentsSummaryTableIndex from '~/components/price-assessments/SummaryTableIndex.vue'
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import ResponsiveChartMixin from '~/mixins/ResponsiveChartMixin'
import { generateSimpleLegends } from '~/utils/custom-legends'

export default {
  components: { PriceAssessmentsLineChart, PriceAssessmentsSummaryTableIndex },
  mixins: [AuthorizationMixin, ResponsiveChartMixin],
  props: {
    summary: {
      type: Object,
      required: true,
    },
    authorized: {
      type: Boolean,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    tableSummary: {
      type: Object,
      required: true,
    },
    tablePricing: {
      type: Array,
      required: true,
    },
    tableAuthorized: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    altTitle: {
      type: String,
      default: null,
      required: false,
    },
  },

  data() {
    return {
      datacollection: {
        datasets: [],
      },
      plugins: [generateSimpleLegends, CrosshairPlugin],
    }
  },
  mounted() {
    this.extractLabels()

    this.setDatasetsByMineral(this.summary)
  },

  methods: {
    extractLabels() {
      // Collect unique dates.
      const dates = []

      for (const dataset in this.summary) {
        this.summary[dataset].forEach(({ date }) => {
          dates.includes(date) || dates.push(date)
        })
      }

      // Sort dates by ascending order.
      dates.sort((a, b) => new Date(a) - new Date(b))

      this.datacollection.labels = dates
    },

    setDatasetsByMineral(data) {
      Object.entries(data).forEach(([name, values]) => {
        const label = name
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
          /* The above steps change the name to capitalize but for 'Lithium ion Battery'
            the correct form is 'Lithium-ion Battery', so the word 'Ion' is replaced by 'ion' */
          .replace('Ion', 'ion')
        this.setDataset(label, values, this.getColorChart(label))
      })
    },

    getColorChart(label) {
      const colors = {
        lithium: '#FDBD00',
        'lithium carbonate': '#FD8900',
        'lithium hydroxide': '#86C6F4',
        anode: '#FDBD00',
        cathode: '#FDBD00',
        ev: '#FD8900',
        portable: '#86C6F4',
        ess: '#8B6CD2',
      }
      return colors[label?.toLowerCase()] ?? '#FDBD00'
    },

    setDataset(label, array, borderColor) {
      const points = array
        .filter((_data) => _data.value && _data.date)
        .map((item) => ({
          x: item.date,
          y: item.value,
        }))

      this.datacollection.datasets.push({
        label: this.setLabelByCategory(label),
        data: points,
        borderColor,
        fill: false,
      })
    },
    setLabelByCategory(label) {
      const categories = {
        ev: 'EV',
        ess: 'ESS',
      }
      return categories[label?.toLowerCase()] ?? label
    },
  },
}
</script>
