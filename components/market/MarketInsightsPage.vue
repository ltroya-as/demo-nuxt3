<template>
  <div>
    <div v-if="loading" class="h-full min-h-[70dvh] w-full">
      <TheLoader class="min-h-[70dvh]" />
    </div>
    <div v-else>
      <div
        class="max-w-content-container px-small mx-auto flex w-full flex-col justify-center gap-y-7 pb-20 pt-8 md:items-start xl:pb-36 xl:pl-16 xl:pr-0 xl:pt-10"
      >
        <Breadcrumb :menu="$store.state.breadcrumb.items" />
        <div class="flex w-full flex-col gap-y-6">
          <SectionTitle :title="title" authorized :icon="icon" />
          <Hero
            v-if="!isViewMoreActive || !isVideosTab"
            :loading="loading"
            :market="slug"
            :articles="articles"
            :videos="videos"
            :events="events"
            @play="handleVideoClick"
          />
          <TheTabs
            class="mb-6"
            :tabs="tabs"
            @active-tab-changed="setActiveTab"
          />
          <div class="lg:min-h-[500px]">
            <PriceAnalysisTab
              v-if="isPriceAnalysisTab"
              :name="name"
              :slug="slug"
              :icon="icon"
            />
            <div v-if="isNewsTab">
              <NewsTab
                :market="slug"
                :categories-articles="categoriesArticles"
              />
            </div>
            <div v-if="isVideosTab">
              <VideosTab
                :key="jwtToken"
                :product="slug"
                :categories-videos="categoriesArticles"
                @is-view-more-active="setIsViewMoreActive"
                @play="handleVideoClick"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <VideoModal
      v-if="vimeoVideo && $store.state.modal.videoIntroOpen"
      :vimeo-source="vimeoSource"
      :video-ratio="videoRatio"
      :is-preview="isPreview"
    />
  </div>
</template>

<script>
import { getServices } from '~/constants/services'

import Breadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
import Hero from '~/components/market-insights/Hero.vue'
import NewsTab from '~/components/market-insights/NewsTab.vue'
import PriceAnalysisTab from '~/components/market-insights/PriceAnalysisTab.vue'
import SectionTitle from '~/components/price-assessments/SectionTitle.vue'
import TheTabs from '~/components/common/TheTabs.vue'
import VideosTab from '~/components/market-insights/VideosTab.vue'
import VideoModal from '~/components/video/VideoModal.vue'

import GetVimeoDataMixin from '~/mixins/GetVimeoDataMixin'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'

export default {
  components: {
    Breadcrumb,
    Hero,
    NewsTab,
    PriceAnalysisTab,
    SectionTitle,
    TheTabs,
    VideosTab,
    VideoModal,
  },
  mixins: [AuthenticationMixin, GetVimeoDataMixin],
  props: {
    market: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      articles: [],
      videos: [],
      events: [],
      activeTab: '',
      isViewMoreActive: false,
      priceAnalysis: {
        categories: [],
        articles: [],
      },
      initialValues: getServices([this.market, 'source']),
    }
  },
  computed: {
    jwtToken() {
      return this.$store.state.auth.jwtToken
    },
    isPriceAnalysisTab() {
      return this.activeTab === 'price-assessment-analysis'
    },
    isNewsTab() {
      return this.activeTab === 'news'
    },
    isVideosTab() {
      return this.activeTab === 'videos'
    },
    title() {
      return `${this.market.name} Market Insights`
    },
    slug() {
      return this.market.slug
    },
    name() {
      return this.market.name
    },
    categoriesArticles() {
      return this.market?.categoriesArticles ?? null
    },
    icon() {
      return this.market.iconColor
    },
    tabs() {
      const analysisTab = !this.market.hideAnalysis
        ? [{ name: 'Price Analysis', slug: 'price-assessment-analysis' }]
        : []

      return [
        ...analysisTab,
        { name: 'News', slug: 'news' },
        { name: 'Videos', slug: 'videos' },
      ]
    },
  },
  async mounted() {
    try {
      await this.onInit()
    } finally {
      this.loading = false
    }
  },

  methods: {
    async onInit() {
      const { articles, videos, events } =
        await this.$graphqlClient.getMarketInsightsArticles({
          market: this.slug,
          articles: this.categoriesArticles,
        })
      this.articles = articles
      this.videos = videos
      this.events = events
    },
    setActiveTab(tab) {
      this.activeTab = tab
    },
    setIsViewMoreActive(isActive) {
      this.isViewMoreActive = isActive
    },

    async handleVideoClick(vimeoData) {
      const vimeoId = vimeoData.vimeoId || vimeoData.previewVimeoId
      this.isPreview = !vimeoData.vimeoId && !!vimeoData.previewVimeoId
      this.$store.commit('modal/setInitialFields', this.initialValues)

      if (!vimeoId) {
        this.$modal.open('contact')
        return
      }

      await this.getVimeoData(vimeoId)
      this.handlerPlay()
    },
  },
}
</script>
