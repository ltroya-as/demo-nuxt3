<template>
  <div>
    <div class="bg-grey-300 mb-2 h-[42px]"></div>
    <div class="shadow-pm rounded-xl">
      <div class="relative rounded-t-xl bg-white px-6 pb-8">
        <div
          v-if="title"
          class="mb-6 mt-1 flex w-full flex-row items-center justify-center font-bold lg:text-xl"
        >
          {{ slug !== 'synthetic-graphite' ? title : altTitle }}
        </div>
        <div
          id="legend-container"
          class="mx-4 mb-5 mt-2.5 flex flex-col items-end justify-center gap-y-4 md:mx-0 md:mb-9 md:flex-row md:items-start md:justify-start md:gap-x-6"
        />
        <div class="relative z-10 min-h-[400px] w-full">
          <PriceAssessmentsLineChart
            v-if="datacollection.datasets.length > 0"
            :chart-data="datacollection"
            :plugins="plugins"
            :width="400"
          />
        </div>

        <div class="mt-4 text-right text-xs font-normal">*Index Values</div>

        <BenchmarkWatermark />
      </div>
      <div class="block overflow-x-auto rounded-b-xl bg-white">
        <PriceAssessmentsSummaryTableIndexNewPortal
          :slug="slug"
          :summary="tableSummary"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { CrosshairPlugin } from 'chartjs-plugin-crosshair'
import PriceAssessmentsLineChart from '~/components/price-assessments/LineChart'
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import ResponsiveChartMixin from '~/mixins/ResponsiveChartMixin'
import { generateSimpleLegends } from '~/utils/custom-legends'

export default {
  components: { PriceAssessmentsLineChart },
  mixins: [AuthorizationMixin, ResponsiveChartMixin],
  props: {
    summary: {
      type: Object,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    tableSummary: {
      type: Array,
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
        labels: [],
      },
      plugins: [generateSimpleLegends, CrosshairPlugin],
    }
  },
  mounted() {
    // Get Axis Labels
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
        label,
        data: points,
        borderColor,
        fill: false,
      })
    },
  },
}
</script>
