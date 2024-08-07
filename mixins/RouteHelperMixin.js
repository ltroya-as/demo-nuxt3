export default {
  methods: {
    isMarketAssessments() {
      return this.$route.path.includes('/market-assessments')
    },

    isForecast() {
      return this.$route.path.includes('/forecasts')
    },

    isPriceAssessment() {
      return this.$route.path.includes('/price-assessments')
    },

    isProductPage() {
      return [
        this.isMarketAssessments(),
        this.isForecast(),
        this.isPriceAssessment(),
      ].some((isTrue) => isTrue)
    },
  },
}
