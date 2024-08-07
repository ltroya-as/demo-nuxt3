<template>
  <div class="h-full">
    <div class="font-montserrat mb-2 text-left text-lg font-semibold">
      {{ title }}
    </div>
    <div
      class="flex flex-col items-center gap-10 md:flex-col md:gap-5 xl:gap-2"
    >
      <div class="w-[99%] md:w-[80%]" :class="height">
        <BarVerticalChart
          :key="updated"
          :chart-data="filteredChartData"
          :legend="legend"
          :show-y-axis="showYAxis"
          :container-id="containerId"
          :plugins="plugins"
          css-classes="h-full relative"
          css-class-legend="md:grid-cols-5"
        />
      </div>
      <div :id="containerId"></div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import BarVerticalChart from '~/components/price-assessments/BarVerticalChart'
import { generateSliderLegends } from '~/utils/custom-legends'

export default {
  components: { BarVerticalChart },
  props: {
    legend: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    datasets: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    showYAxis: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: Array,
      default: () => [
        '#EA8000',
        '#FDC723',
        '#FEEBB2',
        '#92A678',
        '#374C33',
        '#7D2F59',
        '#BA86A2',
        '#F2A900',
        '#589F97',
      ],
    },
    unit: {
      type: String,
      default: '',
    },
    identifier: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: 'h-[400px]',
    },
  },
  data() {
    return {
      isFilteredDataReady: false,
      updated: 0,
      keyEvent: uuidv4(),
      filteredChartData: {},
      plugins: [generateSliderLegends],
    }
  },
  computed: {
    containerId() {
      return `legend-container-${this.identifier}`
    },
  },
  mounted() {
    this.filteredChartData = {
      labels: this.labels,
      keyEvent: this.keyEvent,
      datasets: this.datasets.map((item, index) => ({
        label: item.label,
        backgroundColor: this.backgroundColor[index],
        data: item.data,
        hidden: false,
        unit: this.unit,
      })),
    }

    this.updated++
  },
}
</script>
