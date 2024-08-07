<template>
  <div v-if="loading" class="flex min-h-[40vh] items-center justify-center">
    <TheLoader />
  </div>

  <div v-else>
    <BreadcrumbWithoutSidebar :menu="breadcrumb" class="mb-8" />
    <OverviewPage
      :services="setServices()"
      services-classes="min-h-[405.6px]"
      :title="title"
      subtitle=""
      subtitle-classes="max-w-full"
      descriptions-container-classes="!mb-0"
    >
      <template #header>
        <div class="font-semibold">
          {{ subtitle }}
        </div>
        <div v-for="item in descriptions" :key="item">
          {{ item }}
        </div>
      </template>

      <h3 class="text-lg font-semibold">Available Subscriptions</h3>
      <div>
        {{ moreInfoDescription }}
      </div>
    </OverviewPage>
  </div>
</template>

<script>
/** @components */
import TheLoader from '~/components/TheLoader.vue'
import BreadcrumbWithoutSidebar from '~/components/navigation/BreadcrumbWithoutSidebar.vue'
import OverviewPage from '~/components/shared/services/OverviewPage.vue'
/** @mixins */
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
/** @constants */
import { MARKET_ASSESSMENTS } from '~/constants/services/constants'
import { getServices } from '~/constants/services'
import { marketAssessmentsOverview } from '~/constants/market-assessments'

definePageMeta({ layout: 'overviews' })

export default {
  components: {
    BreadcrumbWithoutSidebar,
    OverviewPage,
    TheLoader,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      loading: true,
      breadcrumb: [{ name: 'Services' }, { name: MARKET_ASSESSMENTS.name }],
      title: marketAssessmentsOverview.title,
      subtitle: marketAssessmentsOverview.subtitle,
      descriptions: marketAssessmentsOverview.descriptions,
      service: marketAssessmentsOverview.service,
      services: marketAssessmentsOverview.services,
      moreInfoText: marketAssessmentsOverview.moreInfoText,
      moreInfoDescription: marketAssessmentsOverview.moreInfoDescription,
      checkboxServices: [MARKET_ASSESSMENTS.checkbox],
    }
  },
  head() {
    return this.generateSeoInfo({ ...marketAssessmentsOverview.seo })
  },
  mounted() {
    this.loading = true
    const initialValues = getServices([...this.checkboxServices])
    this.$store.commit('modal/setInitialFields', initialValues)
    this.loading = false
  },
  methods: {
    setServices() {
      const config = useRuntimeConfig()
      return this.services.map((service) => {
        if (service.methodology.active && service.methodology.type === 'file') {
          return {
            ...service,
            methodology: {
              ...service.methodology,
              file: {
                ...service.methodology.file,
                ID: service.methodology.file?.EnvKey
                  ? config.public[service.methodology.file.EnvKey]
                  : '',
              },
            },
          }
        }
        return service
      })
    },
  },
}
</script>
