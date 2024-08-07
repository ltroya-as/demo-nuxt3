import debounce from 'lodash/debounce'

export default {
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  data() {
    return {
      chartWidth: 0,
    }
  },
  methods: {
    onResize: debounce(function () {
      this.updated++
      this.getChartWidth()
    }, 400),
    getChartWidth() {
      if (window.innerWidth >= 1536) {
        this.chartWidth = window.innerWidth * 0.65
      }
      if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
        this.chartWidth = window.innerWidth * 0.55
      }
      if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        this.chartWidth = window.innerWidth * 0.45
      }
      if (window.innerWidth < 1024) {
        this.chartWidth = window.innerWidth * 0.9
      }
    },
  },

  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
}
