<template>
  <MarketWrapper
    :initial-fields="initialFields"
    title-hero="Sustainability"
    :banner-images="bannerImages"
    :brochure-file-info="brochureFileInfo"
    :title-page="titlePage"
    :icon="icon"
    :tabs="tabs"
    @active-tab-changed="setActiveTab"
  >
    <div class="relative pt-6">
      <esgUnauthorizedPage
        v-if="!isAuthenticated && activeTab === 'overview'"
        :initial-fields="initialFields"
        :services="services"
        :title="titlePackage"
        :banner="banner"
        :product="slug"
      />

      <SustainabilityIndexPage
        v-if="activeTab === 'sustainability-index'"
        :title="titlePage"
        :subscription="subscription"
        :product="SustainabilityIndexSlug"
        :sustainability-indexes="sustainabilityIndexes"
        :vimeo-id="vimeoId"
        :initial-fields="initialFields"
      >
        <slot></slot>
      </SustainabilityIndexPage>

      <esgReportsPage
        v-if="activeTab === 'battery-emissions-analyser'"
        :category="category"
        :initial-fields="initialFields"
        :product="slug"
      />

      <LcaSection v-if="activeTab === 'lca'" />
    </div>
  </MarketWrapper>
</template>

<script>
import { BATTERY_EMISSIONS_ANALYSER, ESG } from '~/constants/services/constants'

import MarketWrapper from '~/components/shared/services/MarketWrapper.vue'
import esgUnauthorizedPage from '~/components/shared/ESG/UnauthorizedPage'
import SustainabilityIndexPage from '~/components/shared/ESG/SustainabilityIndexPage.vue'
import LcaSection from '~/components/LcaSection.vue'
import esgReportsPage from '~/components/shared/ESG/ReportsPageBEA.vue'
import AuthorizationMixin from '~/mixins/AuthorizationMixin'

export default {
  components: {
    esgUnauthorizedPage,
    SustainabilityIndexPage,
    MarketWrapper,
    LcaSection,
    esgReportsPage,
  },
  mixins: [AuthorizationMixin],
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
      activeTab: 'overview',
      reports: [],
      category: BATTERY_EMISSIONS_ANALYSER.category,
      vimeoId: this.$config.public.IntroSustainabilityVimeoId,
      titlePage: `${this.product.name} ${ESG.name}`,
      titlePackage: `${this.product.name} Lithium ESG Report`,
      slug: this.product.slug,
      icon: this.product.iconColor,
      bannerImages: this.productData.images,
      banner: this.productData.banner,
      services: this.productData.services,
      sustainabilityIndexes: this.productData.sustainabilityIndexes,
      brochureFileInfo: {
        ...this.productData.brochureFile,
        ID: this.$config.public[this.productData.brochureFile?.EnvKey],
      },
      initialFields: [this.product.slug, ESG.checkbox],
      isAuthorized: false,
    }
  },
  computed: {
    SustainabilityIndexSlug() {
      return this.product.slug === 'natural-graphite' ||
        this.product.slug === 'synthetic-graphite'
        ? 'graphite'
        : this.product.slug
    },
    tabs() {
      const commonTabs = [
        { name: 'Sustainability Index', slug: 'sustainability-index' },
        {
          name: 'Battery Emissions Analyser',
          mobileName: 'BEA',
          slug: 'battery-emissions-analyser',
        },
        {
          name: 'LCA',
          slug: 'lca',
        },
      ]

      if (!this.isAuthenticated) {
        return [{ name: 'Overview', slug: 'overview' }, ...commonTabs]
      }

      return commonTabs
    },
  },
  watch: {
    isAuthenticated: {
      immediate: true,
      handler() {
        this.hasAuthorized().then((authorized) => {
          this.isAuthorized = authorized
        })
      },
    },
  },
  async mounted() {
    this.isAuthorized = await this.hasAuthorized()
  },
  methods: {
    async hasAuthorized() {
      const authorized = await this.hasMembership(this.subscription)
      return authorized && this.isAuthenticated
    },
    setActiveTab(tab) {
      this.activeTab = tab
    },
  },
}
</script>
