<template>
  <LineChartGenerator
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
import { Line as LineChartGenerator } from 'vue-chartjs'
import resolveConfig from 'tailwindcss/resolveConfig'
import { reformat } from '@/utils/date'
import { numberFormatter } from '@/utils/number'
import tailwindConfig from '~/tailwind.config'
import { logError } from '~/utils/log-error'

const fullConfig = resolveConfig(tailwindConfig)

export default {
  components: {
    LineChartGenerator,
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
  },

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0, // disables bezier curves
          },
          point: {
            radius: 0,
          },
        },
        scales: {
          y: {
            display: true,
            position: 'left',
            ticks: {
              font: {
                family: 'Montserrat',
                size: 12,
                color: fullConfig.theme.colors.s['900'],
              },
              padding: 10,
              beginAtZero: false,
              callback(value) {
                return value > 0 ? `${numberFormatter(value)}` : value
              },
            },
          },
          x: {
            type: 'time',
            time: {
              unit: 'month',
            },
            bounds: 'ticks',
            stacked: false,
            ticks: {
              font: {
                family: 'Montserrat',
                color: fullConfig.theme.colors.s['900'],
              },
              autoSkip: true,
              autoSkipPadding: 30,
            },
          },
        },
        plugins: {
          crosshair: {
            line: {
              color: fullConfig.theme.colors.s['500'],
              width: 1,
            },
            zoom: {
              enabled: false,
            },
            snap: {
              enabled: true,
            },
            sync: {
              enabled: false,
            },
          },
          htmlLegend: {
            containerID: 'legend-container',
          },
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: 'nearest',
            axis: 'x',
            intersect: false,
            titleFont: {
              family: 'Montserrat',
              size: 14,
            },
            bodyFont: {
              family: 'Montserrat',
              size: 14,
            },
            callbacks: {
              label(context) {
                const { dataIndex, dataset } = context
                const { label } = context.dataset
                const labelReplaceFirst = label.replace(/[*]+/g, '').trim()
                return `${labelReplaceFirst}: ${numberFormatter(
                  dataset.data[dataIndex].y,
                  1,
                )}`
              },
              labelColor(context) {
                return {
                  backgroundColor: context.dataset.borderColor,
                }
              },
              title(tooltipItems) {
                const { dataIndex } = tooltipItems[0]
                const tooltipItem = tooltipItems[0].dataset.data[dataIndex]
                const date = tooltipItem.x

                try {
                  return reformat(date, 'MMM dd, yyyy')
                } catch (e) {
                  logError(e)
                }
              },
            },
          },
        },
      },
    }
  },

  methods: {
    toggle(text) {
      this.$emit('toggle-dataseries', text)
    },
  },
}
</script>
