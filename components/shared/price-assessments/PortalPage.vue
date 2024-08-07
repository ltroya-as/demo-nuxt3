<template>
  <div>
    <ServicesHeroPortal
      v-show="!isAuthenticated"
      :title="titlePage"
      :icon="general.icon"
      :sub-title="general.subTitle"
      :list-items="general.listItems"
      :images="general.images"
    />
    <div
      class="max-w-content-container px-small mx-auto flex w-full flex-col justify-center gap-y-7 pb-20 md:items-start xl:pb-36 xl:pl-16 xl:pr-0"
      :class="{
        'pt-8 xl:pt-10': isAuthenticated,
      }"
    >
      <div v-show="isAuthenticated">
        <Breadcrumb :menu="$store.state.breadcrumb.items" />
      </div>

      <div class="relative h-full w-full">
        <PriceAssessmentsSectionTitle
          v-show="isAuthenticated"
          data-testid="portal-title"
          class="ml-0 lg:ml-5"
          :title="titlePage"
          :icon="general.icon"
          :mineral="general.category"
          authorized
        />
        <div class="mt-5 pb-0 lg:mt-8">
          <div class="flex grid-cols-5 flex-col gap-x-3 gap-y-6 xl:grid">
            <div
              v-if="!hideTableAndChart"
              class="bg-s-300 col-span-3 rounded-xl"
              :class="loadingPricesPortal ? 'animate-pulse' : ''"
            >
              <PortalLithiumGlobalPrice
                v-show="!loadingPricesPortal"
                :category="general.category"
                :slug="general.slug"
                :title-prices-summary="titlePricesTable"
                :prices-summary-portal="pricesSummaryPortal"
                :title-prices="titlePrices"
                :prices-portal="pricesPortal"
                :loading-prices-portal="loadingPricesPortal"
              />
            </div>
            <div
              class="flex flex-col gap-2.5"
              :class="
                hideTableAndChart
                  ? 'col-span-5 grid-cols-2 xl:grid'
                  : 'col-span-2'
              "
            >
              <div
                class="bg-s-300 flex min-h-[220px] w-full animate-pulse items-center justify-center rounded-xl xl:min-h-[381px]"
                :class="{
                  '!animate-none': !loadingArticles,
                  'xl:!min-h-[274px]': hideTableAndChart,
                }"
              >
                <CarouselArticle
                  v-if="articles.length"
                  data-testid="portal-carousel-article"
                  :market="general.slug"
                  :articles="articles"
                  class="w-full"
                  :class="hideTableAndChart ? 'xl:h-[274px]' : 'xl:h-[381px]'"
                />
              </div>
              <div
                class="bg-s-300 relative h-[181px] grow rounded-xl md:h-60 xl:h-auto"
              >
                <CarouselCapexTracker
                  class="!relative rounded-xl [&_img]:rounded-xl"
                  button-classes="!flex bg-white !text-black border-2"
                  :material="ALL_MATERIALS_TOTALS.mineral"
                  :value="ALL_MATERIALS_TOTALS.value"
                  :image-url="ALL_MATERIALS_TOTALS.imageUrl"
                />
              </div>
            </div>
          </div>

          <div class="max-w-content-container relative mt-5 w-full">
            <ReportsAndModelsSection
              :key="`reports-and-models-${jwtToken}`"
              class="mb-[58px]"
              :product-slug="general.reportSlug || general.slug"
              :product-category="general.categoryReportPricing"
            />
          </div>

          <div
            v-if="isLithium && false"
            class="shadow-pm mb-7 rounded-xl bg-white px-4 pb-5 pt-7"
          >
            <MarketIntelligenceSection :category="general.category" />
          </div>

          <div class="max-w-content-container relative mt-5 w-full">
            <VideoSection
              :key="`video-section-${jwtToken}`"
              :product-slug="general.slug"
              :categories-videos="categoriesArticles"
            />
          </div>

          <div v-if="isLithium && false" class="pt-7">
            <EquityDataTable
              :initial-values="initialValues"
              :equity-data="equityData"
              :loading="loadingEquityData"
            />
          </div>
          <div
            v-if="!hideSustainabilityIndex"
            class="max-w-content-container mt-8 w-full rounded-xl bg-white p-6 shadow-md md:pb-0"
          >
            <SustainabilityIndexSection
              :sustainability-indexes="esgData.sustainabilityIndexes"
              :slug="SustainabilityIndexSlug"
              :subscription="esgData.subscription"
              :checkbox="esgData.checkbox"
            />
          </div>
          <div
            class="max-w-content-container mt-8 w-full rounded-xl bg-white p-6 shadow-md"
          >
            <EventSection />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getServices } from '~/constants/services'
import { LITHIUM, BLACK_MASS } from '~/constants/services/constants'
import { ALL_MATERIALS_TOTALS } from '~/constants/capex-tracker-data'

import {
  getAdaptedSummaryTable,
  transformIndexToPricesStructure,
} from '~/utils/adapters'
import { reformat } from '~/utils/date'
import { logError } from '~/utils/log-error'

import PriceAssessmentsSectionTitle from '~/components/price-assessments/SectionTitle.vue'
import EquityDataTable from '~/components/portals/EquityDataTable.vue'
import VideoSection from '~/components/portals/VideoSection.vue'
import EventSection from '~/components/portals/EventSection.vue'
import ReportsAndModelsSection from '~/components/portals/ReportsAndModelsSection.vue'
import MarketIntelligenceSection from '~/components/portals/MarketIntelligenceSection.vue'
import SustainabilityIndexSection from '~/components/portals/SustainabilityIndexSection.vue'
import PortalLithiumGlobalPrice from '~/components/price-assessments/PortalLithiumGlobalPrice.vue'
import CarouselArticle from '~/components/market-insights/CarouselArticle.vue'
import Breadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
import CarouselCapexTracker from '~/components/carousel/CapexTracker.vue'
import ServicesHeroPortal from '~/components/shared/services/HeroPortal.vue'

export default {
  components: {
    EquityDataTable,
    PriceAssessmentsSectionTitle,
    PortalLithiumGlobalPrice,
    VideoSection,
    EventSection,
    ReportsAndModelsSection,
    CarouselArticle,
    Breadcrumb,
    MarketIntelligenceSection,
    SustainabilityIndexSection,
    CarouselCapexTracker,
    ServicesHeroPortal,
  },
  props: {
    general: {
      type: Object,
      default: () => null,
    },
    esgData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      initialValues: {},
      pricesPortal: [],
      loadingPricesPortal: true,
      pricesSummaryPortal: [],
      equityData: [],
      loadingEquityData: true,
      articles: [],
      loadingArticles: true,
      ALL_MATERIALS_TOTALS,
      isPrices: true,
      categoriesArticles: this.general?.categoriesArticles ?? [
        this.general.slug,
      ],
      hideTableAndChart: this.general.hideTableAndChart || false,
      hideSustainabilityIndex: this.general.hideSustainabilityIndex || false,
    }
  },
  computed: {
    SustainabilityIndexSlug() {
      return this.general.slug === 'natural-graphite' ||
        this.general.slug === 'synthetic-graphite'
        ? 'graphite'
        : this.general.slug
    },
    titlePrices() {
      if (this.isPrices) {
        return `${this.general.name} Global Weighted Average`
      }
      if (this.isBlackMass) {
        return `${this.general.menu} Index`
      }
      return `${this.general.name} Index`
    },
    isAuthenticated() {
      return this.$store.getters['auth/authenticated']
    },
    jwtToken() {
      return this.$store.state.auth.jwtToken ? 'with-token' : 'without-token'
    },
    titlePage() {
      return `${this.general.title}`
    },
    titlePricesTable() {
      if (this.isBlackMass) {
        return `${this.general.menu}`
      }
      return `${this.general.title}`
    },
    isLithium() {
      return this.general.slug === LITHIUM.slug
    },
    isBlackMass() {
      return this.general.slug === BLACK_MASS.category
    },
  },
  async mounted() {
    try {
      await this.getArticles()
      if (!this.hideTableAndChart) await this.getPricesPortal()
    } catch (error) {
      logError(error)
    }
  },
  methods: {
    async getArticles() {
      this.loadingArticles = true
      try {
        const { articles } =
          await this.$graphqlClient.getMarketInsightsArticles({
            market: this.general.slug,
            articles: this.general?.categoriesArticles || null,
          })
        this.articles = articles
      } catch (error) {
        logError(error)
      } finally {
        this.loadingArticles = false
      }
    },

    async getPricesPortal() {
      try {
        const response = await this.$restClient.getPricesPortalByMineral(
          this.general.category,
        )
        if (response.prices) {
          this.pricesPortal = response.prices.chart
          this.pricesSummaryPortal = getAdaptedSummaryTable(
            response.prices.table,
          )
        } else if (response.indexes) {
          this.isPrices = false
          this.pricesPortal = response.indexes.detail.map((item) => ({
            category: {
              name: item.product,
            },
            currency: {
              symbol: '',
            },
            series: item.data.map((seriesData) => ({
              valueMid: seriesData.value,
              date: seriesData.date,
            })),
          }))

          this.pricesSummaryPortal = [transformIndexToPricesStructure(response)]
        } else {
          this.hideTableAndChart = true
        }
      } catch (error) {
        logError(error)
        this.hideTableAndChart = true
      } finally {
        this.loadingPricesPortal = false
      }
    },

    async getEquityDataPortal() {
      this.loadingEquityData = true
      this.initialValues = getServices([
        'price-assessments',
        'forecasts_and_costs',
        'lithium',
      ])
      try {
        const response = await this.$restClient.getEquityDataByMineral(
          this.general.category,
        )
        const data = response?.data ?? {}
        this.equityData = Object.values(data?.equityData)
          .flat()
          .map((value) => ({
            ...value,
            id: value.id,
            name: value.name,
            lastUpdated: reformat(value.consultedAt, 'HH:mm, dd MMMM yyyy'),
          }))
      } finally {
        this.loadingEquityData = false
      }
    },
  },
}
</script>
