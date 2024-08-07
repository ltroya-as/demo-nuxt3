<template>
  <TheLayout class="bg-s-50">
    <PreviewSiteLayout>
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

        <div
          class="price-assessments min-h-[80vh] w-full flex-1 px-4 lg:px-0"
          :class="
            (isForecastsService && 'pt-0') ||
            (isPriceAssessmentsServiceAndBuilder && !loggedIn && 'relative')
          "
        >
          <div
            v-if="isPriceAssessmentsServiceAndBuilder && !loggedIn"
            id="price-assessments-chart-builder-background"
            class="absolute right-0 top-0 h-full w-full bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1710448492/assets/price-dashboard/AdobeStock_484193150_1_Converted_copy-01_1_j21nro.png')] bg-cover bg-no-repeat"
          ></div>
          <div
            class="xl:pl-big w-full pb-20 pt-5 lg:pb-36 lg:pl-8"
            :class="
              isPriceAssessmentsServiceAndBuilder && !loggedIn && 'relative'
            "
          >
            <Breadcrumb :menu="$store.state.breadcrumb.items" class="mb-6" />
            <slot />
          </div>
        </div>
      </div>
    </PreviewSiteLayout>
  </TheLayout>
</template>

<script>
import LightboxMixin from '~/mixins/LightboxMixin'
import TheLayout from '~/components/TheLayout.vue'
import Breadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
import Sidebar from '~/components/common/Sidebar.vue'
import PreviewSiteLayout from '~/components/PreviewSiteLayout.vue'

export default {
  components: {
    PreviewSiteLayout,
    Sidebar,
    Breadcrumb,
    TheLayout,
  },
  mixins: [LightboxMixin],
  computed: {
    activeMenu() {
      return this.$route.path.split('/')[2]?.toLowerCase() || 'home'
    },

    activeSubMenu() {
      return this.$route.path.split('/')[3]?.toLowerCase() || 'overview'
    },

    service() {
      return this.$route.path.split('/')[1]
    },

    isForecastsService() {
      return this.service === 'forecasts'
    },
    isPriceAssessmentsServiceAndBuilder() {
      return (
        this.service === 'price-assessments' &&
        this.activeSubMenu === 'price-chart-builder'
      )
    },
    loggedIn() {
      return this.$store.getters['auth/authenticated']
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

<style scoped>
@media (width > 1024px) {
  .price-assessments {
    max-width: calc(100vw - 379px);
  }
}

.price-assessments {
  min-width: 0;
}
</style>
