import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      reportCopied: false,
      reportMessageTooltip: 'Copy url to clipboard',
    }
  },
  computed: {
    ...mapGetters({
      getUserRoles: 'auth/userRoles',
    }),
    isDownloadLinkCopyable() {
      return (
        this.category &&
        !this.category.includes('control-documents') &&
        this.isUserAllowedToCopyDownloadLink
      )
    },
    isUserAllowedToCopyDownloadLink() {
      return this.getUserRoles.some((_role) => {
        return ['author', 'download_manager', 'editor']?.some(
          (_roleName) => _roleName === _role.toLowerCase(),
        )
      })
    },
  },
  methods: {
    async copyToClipboard(text) {
      try {
        if (!navigator?.clipboard) return
        await navigator.clipboard.writeText(text)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
    /**
     * @param {Object} report
     * @param {String|null} route
     */
    async copyRouteReport(report, route = null) {
      if (report.ID && this.isDownloadLinkCopyable) {
        const routeBase = route ?? window.location.href
        const routeCopy = routeBase.endsWith('/')
          ? `${routeBase}${report.ID}/`
          : `${routeBase}/${report.ID}/`
        this.reportCopied = true
        await this.copyToClipboard(routeCopy)
        this.reportMessageTooltip = 'Url copied'
        setTimeout(() => {
          this.reportCopied = false
          this.reportMessageTooltip = 'Copy url to clipboard'
        }, 1000)
      }
    },
  },
}
