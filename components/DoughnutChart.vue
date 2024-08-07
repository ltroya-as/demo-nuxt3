<template>
  <DoughnutGenerator
    :options="options"
    :data="chartData"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Doughnut as DoughnutGenerator } from 'vue-chartjs'
import { numberFormatter } from '@/utils/number'

export default {
  components: {
    DoughnutGenerator,
  },
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    containerId: {
      type: String,
      default: 'legend-container',
    },
  },
  data() {
    return {
      spanGaps: false,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage: 55,
        plugins: {
          htmlLegend: {
            containerID: this.containerId,
          },
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label(context) {
                const { dataIndex, dataset, label } = context
                const { digits, unit } = context.dataset
                return `${label}: ${numberFormatter(
                  dataset.data[dataIndex],
                  digits,
                )} ${unit}`
              },
            },
          },
        },
      },
    }
  },
}
</script>
