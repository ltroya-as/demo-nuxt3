<template>
  <BarChartGenerator
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
import { Bar as BarChartGenerator } from 'vue-chartjs'
import resolveConfig from 'tailwindcss/resolveConfig'
import { numberFormatter } from '@/utils/number'

import tailwindConfig from '~/tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

export default {
  components: {
    BarChartGenerator,
  },
  props: {
    legend: {
      type: String,
      required: true,
    },
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
    showYAxis: {
      type: Boolean,
      default: false,
    },
    containerId: {
      type: String,
      default: 'legend-container',
    },
    cssClassLegend: {
      type: String,
      default: 'md:grid-cols-2',
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: {
            stacked: true,
            ticks: {
              font: {
                size: 14,
                family: 'Montserrat',
                color: fullConfig.theme.colors.s['900'],
                weight: '600',
              },
            },
            grid: {
              drawOnChartArea: false,
            },
          },
          yAxes: {
            display: true,
            stacked: true,
            title: {
              display: true,
              text: this.legend,
              font: {
                size: 14,
                family: 'Montserrat',
                weight: '600',
                color: fullConfig.theme.colors.s['900'],
              },
            },
            ticks: {
              display: this.showYAxis,
              font: {
                size: 12,
                family: 'Montserrat',
                weight: '400',
                color: fullConfig.theme.colors.s['900'],
              },
              beginAtZero: false,
            },
            grid: {
              drawOnChartArea: true,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          htmlLegend: {
            containerID: this.containerId,
            cssClass: this.cssClassLegend,
          },
          tooltip: {
            enabled: true,
            mode: 'x',
            position: 'nearest',
            titleFont: {
              family: 'Montserrat',
              size: 14,
            },
            bodyFont: {
              family: 'Montserrat',
              size: 12,
            },
            multiKeyBackground: '#00000000',
            bodySpacing: 8,
            padding: {
              x: 12,
              y: 8,
            },
            callbacks: {
              label(context) {
                const { dataIndex, dataset } = context
                const { label, digits, unit } = context.dataset
                const labelReplaceFirst = label.replace(/#/, '')
                const yLabel = dataset.data[dataIndex]
                if (yLabel === 0) {
                  return
                }
                return `${labelReplaceFirst}: ${numberFormatter(
                  yLabel,
                  digits,
                )} ${unit}`
              },
              labelColor(context) {
                return {
                  backgroundColor: context.dataset.backgroundColor,
                }
              },
            },
          },
        },
      },
    }
  },
  computed: {
    isDataReady() {
      return Object.keys(this.chartData).length > 0
    },
  },
}
</script>
