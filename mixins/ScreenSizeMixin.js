import { devices } from '~/constants/general'

export default {
  mounted() {
    this.getBreakpoints()
    window.addEventListener('resize', this.getBreakpoints)
  },
  data() {
    return {
      activeDevice: devices.DESKTOP,
    }
  },
  methods: {
    getBreakpoints() {
      if (window.innerWidth >= 1536) {
        this.activeDevice = devices.DESKTOP_BIG
      }
      if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
        this.activeDevice = devices.DESKTOP
      }
      if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        this.activeDevice = devices.DESKTOP_SMALL
      }
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        this.activeDevice = devices.TABLET
      }
      if (window.innerWidth < 768) {
        this.activeDevice = devices.MOBILE
      }
    },

    isBigDesktop() {
      return this.activeDevice === devices.DESKTOP_BIG
    },

    isMobile() {
      return this.activeDevice === devices.MOBILE
    },

    isTablet() {
      return this.activeDevice === devices.TABLET
    },

    isNotDesktop() {
      return this.isMobile() || this.isTablet()
    },
  },

  destroyed() {
    window.removeEventListener('resize', this.getBreakpoints)
  },
}
