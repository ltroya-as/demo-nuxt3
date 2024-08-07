<template>
  <div class="relative h-full">
    <div v-if="loading" class="absolute left-0 top-44 w-full lg:top-72">
      <TheLoader />
    </div>
    <div v-else>
      <div v-if="isAuthorized">
        <ChartPage
          v-if="!showSlot && hasData"
          :raw-data="data"
          :subtitle="authorizedActive.subtitle"
          :icon="authorizedActive.icon"
          :product="authorizedActive.product"
          :regions="regions"
          :capacity-unit="authorizedActive.unit"
          :colors="authorizedActive.colors"
          :check-class-colors="authorizedActive.checkClassColors"
          :circle-class-colors="authorizedActive.circleClassColors"
          :hide-y-label="isLithiumIonBatteries()"
          :is-lithium-ion-batteries="isLithiumIonBatteries()"
        />
        <slot v-else name="content" />
      </div>
      <UnauthorizedPage
        v-else
        :subtitle="unauthorizedActive.subtitle"
        :descriptions="unauthorizedActive.descriptions"
        :packages="unauthorizedActive.packages"
        :subscribe="unauthorizedActive.subscribe"
      >
        <template #description>
          <slot name="description" />
        </template>
      </UnauthorizedPage>
    </div>
  </div>
</template>
<script>
/** @components */
import ChartPage from '~/components/capacity-database/ChartPage.vue'
import UnauthorizedPage from '~/components/capacity-database/UnauthorizedPage.vue'
import TheLoader from '~/components/TheLoader.vue'

/** @constants */
import { GIGAFACTORY_ASSESSMENT } from '~/constants/services/constants'
/** @utils */
import { logError } from '~/utils/log-error'

export default {
  components: { UnauthorizedPage, ChartPage, TheLoader },
  props: {
    showSlot: {
      type: Boolean,
      default: false,
    },
    unauthorized: {
      type: Object || null,
      default: null,
    },
    authorized: {
      type: Object || null,
      default: null,
    },
    isAuthorized: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: [],
      loading: true,
      regions: [],
    }
  },
  computed: {
    hasData() {
      return this.data.length > 0
    },
    subscription() {
      return this.authorized.subscription
    },
    authorizedActive() {
      return { ...this.authorized }
    },
    unauthorizedActive() {
      return { ...this.unauthorized }
    },
  },
  async mounted() {
    this.loading = true
    await this.onInit()
    this.loading = false
  },
  methods: {
    isLithiumIonBatteries() {
      return this.authorizedActive.slug === GIGAFACTORY_ASSESSMENT.capacitySlug
    },
    async onInit() {
      try {
        if (
          this.isAuthorized &&
          this.authorizedActive?.slug &&
          !this.hasData &&
          !this.showSlot
        ) {
          this.data = await this.$capacityDatabase.getRecordsByProduct(
            this.authorizedActive.slug,
          )
          this.data.sort((a, b) => a.company.localeCompare(b.company))
          this.regions = await this.$capacityDatabase.getRegionsByProduct(
            this.authorizedActive.slug,
          )
        }
      } catch (error) {
        logError(error)
      }
    },
  },
}
</script>
