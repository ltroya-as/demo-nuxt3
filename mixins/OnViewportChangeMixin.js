export default {
  data() {
    return {
      breakpoints: {
        sm: '(min-width: 640px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 1024px)',
        xl: '(min-width: 1280px)',
        '2xl': '(min-width: 1536px)',
      },
    }
  },
  mounted() {
    window.addEventListener('resize', this.onViewportChange)
    this.onViewportChange()
  },
  unmounted() {
    window.removeEventListener('resize', this.onViewportChange)
  },
  methods: {
    /**
     * Callback method for viewport resizing event. This method should be
     *  overridden in the component that implement this.
     *
     * @param event
     */
    onViewportChange() {},

    /**
     * Check if the screen matches the breakpoint
     *
     * @param breakpoint
     * @returns {boolean}
     */
    matchMedia(breakpoint) {
      return window.matchMedia(breakpoint).matches
    },
  },
}
