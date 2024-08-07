<template>
  <MarketPriceWrapper
    :initial-fields="initialFields"
    :title-hero="titlePage"
    :banner-images="bannerImages"
    :brochure-file-info="brochureFileInfo"
    :customisation-tool-brochure-file-info="customisationToolBrochureFileInfo"
    :title-page="titlePage"
    :icon="icon"
    :tabs="tabs"
    :package-title="titlePackage"
    :services="services"
    :descriptions="descriptions"
    :description-image="descriptionImage"
    @active-tab-changed="setActiveTab"
  >
    <div>
      <div v-if="activeTab === 'table'" class="relative">
        <div v-if="loading" class="absolute left-0 top-44 w-full lg:top-72">
          <TheLoader />
        </div>
        <div v-else class="shadow-pm rounded-3xl bg-white pt-9">
          <div class="relative overflow-x-auto">
            <div class="min-w-[1050px]">
              <div
                class="bg-s-300 mx-6 -mb-3.5 rounded-lg px-3 py-2 text-lg font-semibold leading-[22px]"
              >
                {{ product.name }}
              </div>
              <SummaryTableNewPortal
                :price-summary="pricesSummaryPortal"
                :category="category"
                :subscription="subscription"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'chart'" class="relative">
        <ChartPage
          :min-date="minDate"
          :required-filters="requiredFilters"
          :initial-messages="initialMessages"
          :category="category"
          :mineral-id="mineralId"
          :subscription="subscription"
          :title="titlePage"
          use-new-title-layout
        />
      </div>
      <div v-if="activeTab === 'index'" class="relative">
        <div v-if="loading" class="absolute left-0 top-44 w-full lg:top-72">
          <TheLoader />
        </div>
        <SummaryChartNewPortal
          v-else
          :summary="detailedData"
          :table-summary="priceIndex.summary"
          :slug="slug"
          :title="indexTitle"
        />
      </div>
      <div v-if="activeTab === 'price-customisation-tool'">
        <CustomizationTool :key="customisationToolKey" :mineral="slug" />
      </div>
    </div>
  </MarketPriceWrapper>
</template>

<script>
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'
import GetData from '~/mixins/price-assessments/GetData'
import { logError } from '~/utils/log-error'

import MarketPriceWrapper from '~/components/shared/services/MarketPriceWrapper.vue'
import SummaryTableNewPortal from '~/components/price-assessments/SummaryTableNewPortal.vue'
import SummaryChartNewPortal from '~/components/price-assessments/SummaryChartNewPortal.vue'
import ChartPage from '~/components/shared/price-assessments/ChartPage.vue'
import CustomizationTool from '~/components/price-assessments/customisation-tool.vue'
import TheLoader from '~/components/TheLoader.vue'

export default {
  components: {
    MarketPriceWrapper,
    SummaryTableNewPortal,
    SummaryChartNewPortal,
    TheLoader,
    ChartPage,
    CustomizationTool,
  },
  mixins: [GetData],
  props: {
    product: {
      type: Object,
      required: true,
    },
    productData: {
      type: Object,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 'table',
      titlePage: `${this.product.name} Prices`,
      titlePackage: `Price Assessment Package`,
      indexTitle: `${this.product.name} Price Index`,
      category: this.product.category,
      slug: this.product.reportSlug || this.product.slug,
      icon: this.product.iconColor,
      bannerImages: this.productData.images,
      services: this.productData.services,
      descriptions: this.productData.descriptions,
      descriptionImage: this.productData.descriptionImage,
      brochureFileInfo: {
        ...(this.productData.brochureFile || {}),
        ID: this.$config.public[this.productData.brochureFile?.EnvKey],
      },
      customisationToolBrochureFileInfo: {
        ID: this.$config.public.priceCustomisationToolMethodologyId,
        category: 'methodology-price-assessments',
        file_name: 'Benchmark-Price-Customisation-Tool-Methodology.pdf',
      },
      initialFields: [this.product.slug, PRICE_ASSESSMENTS.slug],
      detailedData: {},
      loading: true,

      mineralId: this.product.mineralId,
      minDate: new Date(2016, 0, 29),
      requiredFilters: this.productData.requiredFilters,
      initialMessages: [
        'You need to select a Category from the filters',
        'You need to select a Shipping Route from the filters',
      ],

      customisationToolKey: 0,
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/authenticated']
    },

    tabs() {
      const indexTab = this.productData.indexTab
        ? [{ name: 'Index', slug: 'index' }]
        : []
      const customisationToolTab = this.productData.customisationToolTab
        ? [
            {
              name: 'Price Customisation Tool',
              slug: 'price-customisation-tool',
            },
          ]
        : []

      return [
        { name: 'Table', slug: 'table' },
        { name: 'Chart', slug: 'chart' },
        ...indexTab,
        ...customisationToolTab,
      ]
    },
  },

  watch: {
    async isAuthenticated() {
      this.customisationToolKey += 1
      try {
        this.loading = true
        await this.getSummaryData()
        this.priceIndex?.detailed?.forEach((product) => {
          this.detailedData[product.product] = product.data
        })
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },
  },

  async mounted() {
    try {
      this.loading = true
      await this.getSummaryData()
      this.priceIndex?.detailed?.forEach((product) => {
        this.detailedData[product.product] = product.data
      })
    } catch (error) {
      logError(error)
    } finally {
      this.loading = false
    }
  },

  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
    },
  },
}
</script>
