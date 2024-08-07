<template>
  <div class="flex flex-col">
    <slot></slot>
    <div class="flex flex-col items-center gap-6 md:flex-row">
      <div class="w-[99%] md:w-[50%]">
        <div class="relative z-10">
          <DoughnutChart
            :key="updated"
            :chart-data="chartData"
            :container-id="containerId"
            :plugins="plugins"
          />
        </div>
      </div>

      <div :id="containerId"></div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '~/components/DoughnutChart'
import { numberFormatter } from '@/utils/number'
import { generateSliderLegends } from '~/utils/custom-legends'

const doughnutLabelPlugin = {
  id: 'doughnutLabelPlugin',
  beforeDatasetsDraw(chart) {
    let sumValue = 0
    const { ctx, data } = chart
    const unit = data.datasets[0].unit
    const items = chart.options.plugins.legend.labels.generateLabels(chart)
    items.forEach((item) => {
      if (item.hidden) return
      sumValue += data.datasets[0].data[item.index]
    })
    const text = numberFormatter(sumValue, data.datasets[0].digits) || 0

    ctx.save()
    const xCoordinate = chart.getDatasetMeta(0).data[0].x
    const yCoordinate = chart.getDatasetMeta(0).data[0].y
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 1.25rem Montserrat, sans-serif'
    ctx.fillStyle = '#000'
    ctx.lineWidth = 100

    ctx.fillText(`${text} ${unit}`, xCoordinate, yCoordinate, 100)
  },
}

export default {
  components: { DoughnutChart },
  props: {
    data: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    unit: {
      type: String,
      default: 'TPA',
    },
    digits: {
      type: Number,
      default: 2,
    },
    identifier: {
      type: String,
      required: true,
    },
    hasAccess: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      updated: 0,
      chartData: {},
      colors: [
        '#374C33',
        '#FDC723',
        '#FEEBB2',
        '#EA8000',
        '#BA86A2',
        '#7D2F59',
      ],
      plugins: this.hasAccess
        ? [generateSliderLegends, doughnutLabelPlugin]
        : [generateSliderLegends],
    }
  },
  computed: {
    containerId() {
      return `legend-container-${this.identifier}`
    },
  },
  mounted() {
    this.orderColor()
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          backgroundColor: this.colors,
          data: this.data.slice(),
          unit: this.unit,
          digits: this.digits,
        },
      ],
    }
    this.updated++
  },
  methods: {
    orderColor() {
      const index = this.labels.findIndex((label) =>
        label.toLowerCase().includes('other'),
      )

      if (index > -1) {
        const otherLabelColor = this.colors[index]
        this.colors[index] = '#DADADA'
        this.colors.push(otherLabelColor)
      }
    },
  },
}
</script>
