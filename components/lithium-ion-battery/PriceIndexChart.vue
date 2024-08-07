<template>
  <div class="relative">
    <div
      id="legend-container"
      class="mx-4 mb-5 mt-2.5 flex flex-col items-end justify-center gap-y-4 md:mx-0 md:mb-9 md:flex-row md:items-start md:justify-start md:gap-x-6"
    ></div>
    <PriceAssessmentsLineChart
      :chart-data="datacollection"
      :plugins="plugins"
      :width="400"
      class="relative min-h-[400px] w-full"
    />
    <BenchmarkWatermark />
  </div>
</template>

<script>
import { parse } from 'date-fns'
import ResponsiveChartMixin from '@/mixins/ResponsiveChartMixin'
import { decimalFormatter } from '~/utils/chart'
import PriceAssessmentsLineChart from '~/components/price-assessments/LineChart.vue'
import { generateSimpleLegends } from '~/utils/custom-legends'

export default {
  components: {
    PriceAssessmentsLineChart,
  },
  mixins: [ResponsiveChartMixin],

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      datacollection: {
        datasets: [],
      },
      plugins: [generateSimpleLegends],
    }
  },

  mounted() {
    this.extractLabels()
    this.setDataset(
      'NCM Mid-Nickel',
      this.data['NCM 622 (CIF Asia)'],
      '#7D2F59',
    )
    this.setDataset(
      'NCM High-Nickel',
      this.data['NCM 811 (CIF Asia)'],
      '#FD8900',
    )
    this.setDataset('LFP', this.data['LFP Index (EXW China)'], '#86C6F4')

    // See: https://github.com/apertureless/vue-chartjs/issues/677#issuecomment-808920024
  },

  methods: {
    extractLabels() {
      // Collect unique dates.
      const dates = []

      for (const dataset in this.data) {
        this.data[dataset].forEach(({ date }) => {
          dates.includes(date) || dates.push(date)
        })
      }

      // Sort dates by ascending order.
      dates.sort(
        (a, b) =>
          parse(a, 'dd-MM-yyyy', new Date()) -
          parse(b, 'dd-MM-yyyy', new Date()),
      )

      this.datacollection.labels = dates
    },

    setDataset(label, array, borderColor) {
      const points = []

      this.datacollection.labels.forEach((date) => {
        const point = array.find((_point) => _point.date === date)

        if (point) {
          points.push({
            x: point.date,
            y: decimalFormatter(point.value, 1),
          })
        } else {
          points.push(null)
        }
      })

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
