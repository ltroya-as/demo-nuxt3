<template>
  <div>
    <BarChartGenerator
      v-if="chartData"
      ref="chart"
      :data="chartData"
      :options="options"
      :style="computedStyles"
      :plugins="plugins"
    />
  </div>
</template>

<script>
import { Bar as BarChartGenerator } from 'vue-chartjs'

export default {
  components: {
    BarChartGenerator,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => {},
    },
    height: {
      type: Number,
      default: 400,
    },
    width: {
      type: Number,
      default: 400,
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
  computed: {
    computedStyles() {
      return {
        ...this.styles,
        height: `${this.height}px`,
        width: `${this.width}px`,
      }
    },
  },
}
</script>
