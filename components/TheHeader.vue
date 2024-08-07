<template>
  <div id="navbar" class="fixed top-0 z-50 w-full lg:sticky">
    <TheTicker class="hidden md:block" />
    <div
      class="border-t-p-500 bg-s-50 lg:border-b-s-200 w-full border-t-2 lg:border-b"
    >
      <div
        class="max-w-content-container mx-auto w-full px-0 lg:px-14 2xl:px-0"
      >
        <NavigationSection :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script>
import TheTicker from '@/components/TheTicker.vue'
import NavigationSection from '@/components/navigation/Section.vue'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'

export default {
  components: {
    TheTicker,
    NavigationSection,
  },

  mixins: [ScreenSizeMixin],

  props: {
    showInMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prevScrollPos: 0,
    }
  },
  mounted() {
    if (this.isTablet() || this.isMobile()) {
      window.onscroll = () => {
        this.scrollFunction()
      }
    }
  },
  methods: {
    scrollFunction() {
      const currentScrollPos = window.scrollY
      const navbar = document.getElementById('navbar')
      const navbarHeight = navbar.offsetHeight

      if (
        this.prevScrollPos < currentScrollPos &&
        currentScrollPos > navbarHeight
      ) {
        navbar.style.top = `-${navbarHeight}px`
      } else if (this.prevScrollPos > currentScrollPos) {
        navbar.style.top = '0'
      }

      this.prevScrollPos = currentScrollPos
    },
  },
}
</script>

<style scoped>
#navbar {
  transition: top 0.3s ease;
}
</style>
