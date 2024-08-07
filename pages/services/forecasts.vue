<template>
  <div v-if="loading" class="flex min-h-[40vh] items-center justify-center">
    <TheLoader />
  </div>

  <div v-else>
    <BreadcrumbWithoutSidebar :menu="breadcrumb" class="mb-8" />
    <OverviewPage
      :services="services"
      :title="title"
      :subtitle="subtitle"
      :descriptions="descriptions"
    >
      <h3 class="text-lg font-semibold">Available Subscriptions</h3>
    </OverviewPage>
  </div>
</template>

<script>
/** @components */
import TheLoader from '~/components/TheLoader.vue'
import OverviewPage from '~/components/shared/services/OverviewPage.vue'
import BreadcrumbWithoutSidebar from '~/components/navigation/BreadcrumbWithoutSidebar.vue'
/** @mixins */
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
/** @constants */
import overviewData from '~/constants/forecasts/overview'
import { FORECASTS } from '~/constants/services/constants'

definePageMeta({ layout: 'overviews' })

export default {
  components: {
    BreadcrumbWithoutSidebar,
    OverviewPage,
    TheLoader,
  },
  mixins: [AuthorizationMixin, AuthenticationMixin, SeoUtilsMixin],
  data() {
    return {
      loading: true,
      breadcrumb: [{ name: 'Services' }, { name: FORECASTS.name }],
      title: overviewData.title,
      subtitle: overviewData.subtitle,
      descriptions: overviewData.descriptions,
      service: overviewData.service,
      services: overviewData.servicesForecasts,
      availableText: overviewData.availableText,
      checkboxServices: [FORECASTS.checkbox],
    }
  },
  mounted() {
    this.loading = false
  },
}
</script>
