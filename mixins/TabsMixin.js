export default {
  methods: {
    /**
     * @param {object[]|null} tabs
     * @returns {string|null}
     */
    setDefaultQueryParams(tabs = null) {
      const tabsCurrent = tabs ?? this.tabs
      const currentTab = this.$route.query.tab
      const defaultTab = tabsCurrent[0].slug
      if (tabsCurrent.filter((tab) => tab.slug === currentTab).length) {
        return currentTab
      }
      this.setUrlQueryParams(defaultTab)
      return defaultTab
    },
    setUrlQueryParams(tabSlug) {
      const url = `${this.$route.path}?tab=${tabSlug}`

      if (typeof window !== 'undefined') window.history.pushState({}, '', url)
      this.$emit('activeTabChanged', tabSlug)
    },
    /**
     * @param {string} tab
     * @returns {void}
     */
    activeTabChanged(tab) {
      this.$emit('activeTabChanged', tab)
    },
  },
}
