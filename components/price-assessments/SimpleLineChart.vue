<template>
  <LineChartGenerator
    data-testid="simple-line-chart"
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
import { numberFormatter } from '@/utils/number'
import { reformat } from '~/utils/date'
import { logError } from '~/utils/log-error'

import tailwindConfig from '~/tailwind.config'

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
    yAxisLabel: {
      type: String,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
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
                size: this.isMobile ? 8 : 14,
                color: fullConfig.theme.colors.s['900'],
                weight: '600',
              },
              padding: this.isMobile ? 20 : 14,
              beginAtZero: true,
              callback(value) {
                return value > 0 ? `${numberFormatter(value)}` : value
              },
            },
            title: {
              display: true,
              text: this.yAxisLabel,
              font: {
                family: 'Montserrat',
                color: fullConfig.theme.colors.s['900'],
                size: this.isMobile ? 8 : 14,
                weight: '600',
              },
            },
          },
          x: {
            type: 'time',
            time: {
              unit: 'month',
            },
            bounds: 'ticks',
            ticks: {
              font: {
                family: 'Montserrat',
                size: this.isMobile ? 8 : 14,
                color: fullConfig.theme.colors.s['900'],
                weight: '600',
              },
              padding: 14,
            },
            grid: {
              drawOnChartArea: false,
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
          legend: {
            display: true,
            position: 'bottom',
            align: 'start',
            labels: {
              font: {
                family: 'lato',
                size: 10,
                color: fullConfig.theme.colors.s['900'],
                weight: '600',
              },
              boxWidth: 12,
              padding: this.isMobile ? 17 : 23,
              fillStyle: 'transparent',
            },
          },
          tooltip: {
            enabled: true,
            mode: 'x',
            intersect: false,
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
                const { label, digits } = context.dataset
                const labelReplaceFirst = label.replace(/[*]+/g, '').trim()
                return `${labelReplaceFirst}: ${numberFormatter(
                  dataset.data[dataIndex].y,
                  digits,
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
}
</script>
