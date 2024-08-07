import { logError } from '~/utils/log-error'
import { camelAndPascalCase } from '~/utils/string'
import { getAdaptedSummaryTable } from '@/utils/adapters'

const REPORTS_QUERY_LIMIT = 4
export default {
  data() {
    return {
      loading: true,
      summary: null,
      priceSummary: null,
      pricesSummaryPortal: null,
      priceIndex: null,
      articles: [],
      reports: [],
    }
  },
  computed: {
    serviceCategoryName() {
      const { strLower } = camelAndPascalCase(this.serviceNameAnalysis)
      return `${strLower}Categories`
    },
  },
  methods: {
    async getDatabaseSummary() {
      try {
        const { priceIndex, pricesSummary } =
          await this.$restClient.getDatabaseSummaryByMineral(this.category)
        this.priceSummary = pricesSummary.data
        this.priceIndex = priceIndex.data.priceIndex
      } catch (error) {
        logError(error)
      }
    },
    async getReports() {
      try {
        this.reports = await this.$downloadManager.getFilesForCategory(
          this.categoryReport,
          { page_limit: REPORTS_QUERY_LIMIT },
        )
      } catch (e) {
        this.reports = []
      }
    },
    async getArticles() {
      if (!this.serviceNameAnalysis) return []

      const responseCategories =
        await this.$graphqlClient.getAnalysisCategories({
          service: this.serviceNameAnalysis,
        })

      const categories = responseCategories.data[
        this.serviceCategoryName
      ].nodes.map((category) => category.slug)

      const response = await this.$graphqlClient.getAnalysisArticles({
        service: this.serviceNameAnalysis,
        first: 8,
        categories,
      })

      this.articles = response.data?.articles?.nodes ?? []
    },
    async getSummaryData() {
      try {
        const response = await this.$restClient.getPricesConsolidatedByMineral(
          this.category,
        )
        if (response.summary) {
          this.pricesSummaryPortal = getAdaptedSummaryTable(response.summary)
        }
        if (response.indexes) {
          this.priceIndex = {
            detailed: response.indexes.detail,
            summary: response.indexes.summary.map((summary) => ({
              product: summary.product,
              order: summary.order,
              updateFrequency: summary.updateFrequency,
              data: {
                today: { value: summary.data.today, unit: 'index' },
                last: { value: summary.data.last, unit: 'index' },
                latestChange: summary.data.latestChange,
                yearToDate: summary.data.yearToDate,
                yearOnYear: summary.data.yearOnYear,
              },
            })),
          }
        } else {
          this.priceIndex = {}
        }
      } catch (error) {
        logError(error)
      }
    },
  },
}
