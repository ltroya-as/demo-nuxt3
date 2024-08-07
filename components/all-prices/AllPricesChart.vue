<template>
  <div
    v-if="!hasChartData && loading"
    class="flex min-h-[538px] items-center justify-center"
  >
    <TheLoader />
  </div>
  <div
    v-else-if="hasChartData"
    id="line-chart-wrapper"
    class="xl:shadow-pm mt-5 flex w-full flex-col items-end rounded-xl bg-white px-7 py-6"
  >
    <div class="flex w-full justify-center xl:w-1/2 xl:justify-normal">
      <client-only>
        <DatePickerWrapper
          data-testid="start-date"
          :min-date="minDate"
          :start-date="startDate"
          :end-date="endDate"
          :default-value="timeLineIndicator"
          @date-range-updated="$emit('updateSelectedDates', $event)"
        >
        </DatePickerWrapper>
      </client-only>
    </div>
    <div
      v-if="loading"
      class="flex min-h-[500px] w-full items-center justify-center"
    >
      <TheLoader />
    </div>
    <div
      v-else
      id="chart-canvas"
      class="h-[500px] w-full"
      data-testid="chart-container"
    >
      <PriceAssessmentsMultiAxisChart
        :chart-data="dataCollection"
        :price-axis-on="priceAxisOn"
        :payable-axis-on="payableAxisOn"
        :y-axis-label="nameAxisY1"
        :y-axis1-label="nameAxisY2"
        :min-y1="minY1"
        :max-y1="maxY1"
        :min-y2="minY2"
        :max-y2="maxY2"
        :plugins="plugins"
        is-dashed-crosshair
        class="h-[500px] w-full"
      />
    </div>
  </div>
</template>

<script>
import { CrosshairPlugin } from 'chartjs-plugin-crosshair'
import { EventBus } from '~/utils/eventBus'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    dataCollection: {
      type: Object,
      required: true,
    },
    priceAxisOn: {
      type: Boolean,
      required: true,
    },
    payableAxisOn: {
      type: Boolean,
      required: true,
    },
    nameAxisY1: {
      type: String,
      required: true,
    },
    nameAxisY2: {
      type: String,
      required: true,
    },
    minDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
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
    timeLineIndicator: {
      type: String,
      default: 'Last Calendar Year',
    },
  },
  data() {
    return {
      addEvent: false,
      element: null,
      plugins: [CrosshairPlugin],
    }
  },
  computed: {
    hasChartData() {
      return this.dataCollection?.datasets?.length > 0
    },
  },
  watch: {
    hasChartData: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          if (this.hasChartData && !this.addEvent) {
            this.element = document.getElementById('line-chart-wrapper')
            this.element.addEventListener('mouseenter', this.mouseEnterChart)
            this.element.addEventListener('mouseleave', this.mouseLeaveChart)
            this.addEvent = true
          }

          if (!this.hasChartData && this.addEvent && this.element) {
            this.element.removeEventListener('mouseenter', this.mouseEnterChart)
            this.element.removeEventListener('mouseleave', this.mouseLeaveChart)
            this.addEvent = false
          }
        })
      },
    },
  },
  beforeUnmount() {
    if (this.addEvent && this.element) {
      this.element.removeEventListener('mouseenter', this.mouseEnterChart)
      this.element.removeEventListener('mouseleave', this.mouseLeaveChart)
    }
  },
  methods: {
    mouseEnterChart() {
      this.mouseOnChart = true
      EventBus.$emit('mouseonchart', this.mouseOnChart)
    },
    mouseLeaveChart() {
      this.mouseOnChart = false
      EventBus.$emit('mouseonchart', this.mouseOnChart)
    },
  },
}
</script>
