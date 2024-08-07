<template>
  <MarketWrapper
    :initial-fields="initialFields"
    :title-hero="titlePage"
    :banner-images="bannerImages"
    :brochure-file-info="brochureFileInfo"
    :title-page="titlePage"
    :icon="icon"
    :tabs="tabs"
    @active-tab-changed="setActiveTab"
  >
    <div class="relative pt-6">
      <ForecastsUnauthorizedPage
        v-if="!isAuthenticated && activeTab === 'overview'"
        :initial-fields="initialFields"
        :sections="sections"
        :images="images"
        :banner="banner"
      />
      <AssessmentsReportPage
        v-if="activeTab === 'price-assessments'"
        :key="`price${key}`"
        :category="categoryReport"
        :initial-fields="priceAssessmentsInitialFields"
        :product="slug"
      />
      <AssessmentsReportPage
        v-if="activeTab === 'market-assessments'"
        :key="`market${key}`"
        :category="marketAssessmentSubscription"
        :initial-fields="marketAssessmentsInitialFields"
        :product="slug"
        market="market"
      />
      <forecastsReportsPage
        v-if="activeTab === 'forecast'"
        :category="category"
        :category-report="forecastSubscription"
        :product="slug"
      />
      <esgReportsPage
        v-if="activeTab === 'sustainability'"
        :category="category"
        :category-report="esgSubscription"
        :product="slug"
      />
    </div>
  </MarketWrapper>
</template>

<script>
import {
  MARKET,
  PRICE_ASSESSMENTS,
  MARKET_ASSESSMENTS,
} from '~/constants/services/constants'

import MarketWrapper from '~/components/shared/services/MarketWrapper.vue'
import ForecastsUnauthorizedPage from '~/components/shared/forecasts/UnauthorizedPage.vue'
import AssessmentsReportPage from '~/components/assessments/ReportPage.vue'
import esgReportsPage from '~/components/shared/ESG/ReportsPage.vue'
import forecastsReportsPage from '~/components/shared/forecasts/ReportsPage.vue'

export default {
  components: {
    ForecastsUnauthorizedPage,
    MarketWrapper,
    AssessmentsReportPage,
    esgReportsPage,
    forecastsReportsPage,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    productData: {
      type: Object,
      required: true,
    },
    forecastSubscription: {
      type: String,
      default: '',
    },
    esgSubscription: {
      type: String,
      default: '',
    },
    marketAssessmentSubscription: {
      type: String,
      default: '',
    },
    hidePriceAssessmentsTab: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeTab: 'overview',
      key: 0,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/authenticated']
    },
    tabs() {
      const commonTabs = [
        {
          name: 'Forecasts',
          slug: 'forecast',
        },
      ]

      if (!this.hidePriceAssessmentsTab) {
        commonTabs.unshift({
          name: 'Price Assessments',
          slug: 'price-assessments',
        })
      }
      if (this.marketAssessmentSubscription) {
        commonTabs.splice(1, 0, {
          name: 'Market Assessments',
          slug: 'market-assessments',
        })
      }
      if (this.esgSubscription) {
        commonTabs.push({
          name: 'Sustainability',
          slug: 'sustainability',
        })
      }

      return commonTabs
    },
    titlePage() {
      return `${this.product.name} Data & Reports`
    },
    titlePackage() {
      return `${this.product.name} Lithium ESG Report`
    },
    slug() {
      return this.product.categoryReportPricing || this.product.slug
    },
    icon() {
      return this.product.iconColor
    },
    images() {
      return this.productData?.images || []
    },
    banner() {
      return this.productData?.banner
    },
    bannerImages() {
      return this.productData?.images || []
    },
    services() {
      return this.productData?.services || []
    },
    sections() {
      return this.productData?.sections || []
    },
    brochureFileInfo() {
      return {
        ...this.productData?.brochureFile,
        ID: this.$config.public[this.productData?.brochureFile?.EnvKey],
      }
    },
    initialFields() {
      return [this.product.slug, MARKET.slug]
    },
    categoryReport() {
      return this.product.categoryReportPricing
    },
    category() {
      return this.product.category
    },
    priceAssessmentsInitialFields() {
      return [PRICE_ASSESSMENTS.slug, this.slug]
    },
    marketAssessmentsInitialFields() {
      return [MARKET_ASSESSMENTS.slug, this.slug]
    },
  },

  watch: {
    $route(to) {
      if (to.query.tab) {
        setTimeout(
          () => document.querySelector(`#${to.query.tab}`)?.click(),
          100,
        )
      }
    },
  },

  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
      this.key += 1
    },
  },
}
</script>
