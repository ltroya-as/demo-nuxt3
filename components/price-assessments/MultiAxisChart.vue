<template>
  <LineChartGenerator
    v-if="chartData.datasets.length > 0"
    :id="chartId"
    :options="chartOptions"
    :data="chartData"
    :dataset-id-key="datasetIdKey"
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
import tailwindConfig from '~/tailwind.config'
import { reformat, parsePresentationStringDate } from '@/utils/date'
import { numberFormatter } from '@/utils/number'
import { customTooltips } from '~/utils/handleTooltipChart'

const fullConfig = resolveConfig(tailwindConfig)

export default {
  name: 'MultiAxisChart',
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
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
    chartData: {
      type: Object,
      default: () => {},
    },
    categories: {
      type: Array,
      default: () => [],
    },
    priceAxisOn: {
      type: Boolean,
      required: true,
    },
    payableAxisOn: {
      type: Boolean,
      required: true,
    },
    yAxisLabel: {
      type: String,
      required: true,
    },
    yAxis1Label: {
      type: String,
      default: '% Payable',
    },
    minY1: {
      type: Number,
      default: 0,
    },
    maxY1: {
      type: Number,
      default: null,
    },
    minY2: {
      type: Number,
      default: 0,
    },
    maxY2: {
      type: Number,
      default: null,
    },
    replaceLegend: {
      type: Boolean,
      default: false,
    },
    isDashedCrosshair: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          // required for crosshair snap to work
          intersect: false,
          mode: 'x',
        },

        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
            },
            distribution: 'linear',
            bounds: 'ticks',
            grid: {
              drawOnChartArea: false,
            },
            stacked: false,
            ticks: {
              font: {
                family: 'Montserrat',
                size: 12,
                color: fullConfig.theme.colors.s['700'],
              },
            },
          },
        },

        plugins: {
          htmlLegend: {
            containerID: 'legend-container',
            categories: this.categories,
            replaceLegend: this.replaceLegend,
          },
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            enabled: false,
            external: customTooltips,
            mode: 'x',
            position: 'nearest',
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
              left: 12,
              right: 12,
              top: 8,
              bottom: 8,
            },
            callbacks: {
              label(context) {
                const { dataIndex, dataset } = context
                const digits = 2
                const { label, symbol, data, yAxisID } = dataset
                const labelReplaceFirst = label.replace(/#/, '')
                const { x: date, y: value } = data[dataIndex]
                const dateLabel = reformat(date, 'MMM dd, yyyy')
                if (symbol) {
                  const formattedValue =
                    symbol !== '%'
                      ? `${symbol}${numberFormatter(value, digits)}`
                      : `${value}${symbol}`

                  return `(${dateLabel}) ${labelReplaceFirst}: ${formattedValue}`
                }
                if (yAxisID === 'y1') {
                  // Returns a number with commas as thousands
                  // separators
                  return `(${dateLabel}) ${labelReplaceFirst}: $${numberFormatter(
                    value,
                    digits,
                  )}`
                } else {
                  return `(${dateLabel}) ${labelReplaceFirst}: ${value}%`
                }
              },
              labelColor(context) {
                return {
                  backgroundColor: context.dataset.borderColor,
                  borderColor: context.dataset.borderColor,
                  borderWidth: 2,
                  borderRadius: 4,
                  color: fullConfig.theme.colors.s['100'],
                }
              },
              title(tooltipItems) {
                const { dataIndex } = tooltipItems[0]
                const tooltipItem = tooltipItems[0].dataset.data[dataIndex]
                const unixEpochDates = tooltipItems.map((item) =>
                  Date.parse(item.dataset.data[item.dataIndex].x),
                )
                const minDate = new Date(Math.min(...unixEpochDates))
                  .toISOString()
                  .split('T')[0]
                const maxDate = new Date(Math.max(...unixEpochDates))
                  .toISOString()
                  .split('T')[0]

                const date = tooltipItem.x

                if (maxDate !== minDate) {
                  const dateRange = `${reformat(
                    minDate,
                    'MMM dd, yyyy',
                  )} to ${reformat(maxDate, 'MMM dd, yyyy')}`
                  return dateRange
                }
                try {
                  return reformat(date, 'MMM dd, yyyy')
                } catch (e) {
                  return reformat(
                    parsePresentationStringDate(date),
                    'MMM dd, yyyy',
                  )
                }
              },
            },
          },
          crosshair: {
            line: {
              dashPattern: this.isDashedCrosshair ? [2, 2] : [0, 0],
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
        },
      },
    }
  },
  beforeMount() {
    this.setYAxes()
  },
  methods: {
    setYAxes() {
      if (this.priceAxisOn) {
        this.chartOptions.scales.y1 = {
          display: true,
          min: this.minY1,
          max: this.maxY1,
          title: {
            display: true,
            text: this.yAxisLabel,
            font: {
              family: 'Montserrat',
              size: 12,
              color: fullConfig.theme.colors.s['900'],
            },
          },
          position: 'left',
          grid: {
            drawTicks: false,
          },
          ticks: {
            display: this.showTicks(),
            font: {
              family: 'Montserrat',
              size: 12,
              color: fullConfig.theme.colors.s['700'],
            },
            padding: 10,
            callback(value) {
              return value > 0 ? `${numberFormatter(value)}` : value
            },
          },
        }
      }

      if (this.payableAxisOn) {
        this.chartOptions.scales.y2 = {
          display: true,
          min: this.minY2,
          max: this.maxY2,
          position: this.priceAxisOn ? 'right' : 'left',
          grid: {
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            font: {
              family: 'Montserrat',
              color: fullConfig.theme.colors.s['900'],
            },
            beginAtZero: true,
            padding: 10,
          },
          title: {
            display: true,
            text: this.yAxis1Label,
            color: fullConfig.theme.colors.s['900'],
            font: {
              family: 'Montserrat',
              size: 12,
            },
          },
        }
      }
    },
    showTicks() {
      return !this.chartData.datasets.some((dataset) =>
        dataset.data.every((point) => point.y === null),
      )
    },
  },
}
</script>
