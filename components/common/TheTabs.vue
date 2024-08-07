<template>
  <div class="flex flex-wrap">
    <SummaryViewerTab
      v-for="tab in tabs"
      :id="tab.slug"
      :key="tab.name"
      class="text-xs md:text-base"
      :text="tab.name"
      :mobile-text="tab.mobileName || ''"
      :is-active="tab.slug === activeTab"
      @click="activeTabChanged(tab.slug)"
    />
  </div>
</template>

<script>
import SummaryViewerTab from '~/components/price-assessments/SummaryViewerTab.vue'

export default {
  components: { SummaryViewerTab },

  props: {
    tabs: {
      type: Array,
      required: true,
    },
    defaultTab: {
      type: String || null,
      default: null,
    },
  },

  data() {
    return {
      activeTab: this.defaultTab ?? '',
    }
  },

  watch: {
    activeTab(newVal) {
      if (this.tabs.filter((tab) => tab.slug === newVal).length) {
        this.setUrlQueryParams(newVal)
        this.$emit('tab-change', newVal)
      }
    },
  },

  mounted() {
    this.activeTab = this.setDefaultQueryParams()
  },

  methods: {
    setDefaultQueryParams() {
      const currentTab = this.$route.query.tab
      const defaultTab = this.tabs[0].slug
      if (this.tabs.filter((tab) => tab.slug === currentTab).length) {
        return currentTab
      }
      this.setUrlQueryParams(defaultTab)
      return defaultTab
    },
    setUrlQueryParams(tabSlug) {
      const url = `${this.$route.path}?tab=${tabSlug}`

      if (typeof window !== 'undefined') window.history.pushState({}, '', url)
      this.$emit('activeTabChanged', this.activeTab)
    },
    activeTabChanged(tab) {
      this.activeTab = tab
      this.$emit('activeTabChanged', this.activeTab)
    },
  },
}
</script>
