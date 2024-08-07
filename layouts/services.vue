<template>
  <TheLayout class="bg-s-50">
    <div
      class="max-w-content-container mx-auto mt-[46px] flex h-full w-full flex-grow flex-col px-0 lg:mt-0 lg:flex-row lg:px-14 2xl:px-0"
    >
      <Sidebar
        :key="$route.fullPath"
        :menus="menus"
        :service="service"
        :active-menu="activeMenu"
        :active-sub-menu="activeSubMenu"
      />
      <PreviewSiteLayout class="min-w-0">
        <div class="h-full w-full min-w-0 px-0">
          <slot />
        </div>
      </PreviewSiteLayout>
    </div>
  </TheLayout>
</template>

<script>
import LightboxMixin from '~/mixins/LightboxMixin'
import TheLayout from '~/components/TheLayout.vue'
import PreviewSiteLayout from '~/components/PreviewSiteLayout.vue'
import Sidebar from '~/components/common/Sidebar.vue'
import { FORECASTS } from '~/constants/services/constants'

export default {
  components: {
    Sidebar,
    PreviewSiteLayout,
    TheLayout,
  },
  mixins: [LightboxMixin],
  computed: {
    activeMenu() {
      return this.$route.path.split('/')[2]?.toLowerCase() || 'home'
    },
    activeSubMenu() {
      return this.$route.path.split('/')[3]?.toLowerCase() || ''
    },
    service() {
      return this.$route.path.split('/')[1]
    },
    isForecastsService() {
      return this.service === FORECASTS.slug
    },
    menus() {
      const sidebar = this.$store.state.sidebar[this.service]?.map(
        (menuItem) => ({
          ...menuItem,
          icon: menuItem.icon ? `sidebar/${menuItem.icon}` : 'sidebar/Home',
        }),
      )
      return sidebar ?? []
    },
  },
}
</script>
