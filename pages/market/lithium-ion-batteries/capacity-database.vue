<template>
  <Wrapper
    :hero="hero"
    :title="title"
    :is-authorized="isAuthorized"
    :tabs="tabs"
    :loading="loading"
    @product-changed="productChanged"
  >
    <template v-if="showSlot" #next-tabs>
      <ButtonDownload
        :download-file="report"
        :show-icon="false"
        text="Download"
        class="hidden sm:block sm:!w-[150px]"
        variant="clean"
      />
    </template>
    <template #content>
      <CapacityDatabasePage
        :key="key"
        :unauthorized="unauthorized"
        :authorized="authorizedActive"
        :is-authorized="isAuthorized"
        :show-slot="showSlot"
      >
        <template v-if="showSlot" #content>
          <div class="flex w-full flex-col">
            <div
              class="mt-8 flex w-full flex-col items-center justify-between gap-4 sm:flex-row"
            >
              <h3 class="w-full text-lg font-bold lg:text-2xl">
                Benchmark’s Tiers of automotive-grade battery producers
              </h3>
              <ButtonDownload
                :download-file="report"
                :show-icon="false"
                text="Download"
                class="sm:hidden"
                variant="clean"
              />
            </div>
            <div class="my-6">
              <picture>
                <source
                  media="(max-width:1023px)"
                  :srcset="imageMobile"
                  class="mx-auto w-full"
                />
                <source
                  media="(min-width:1024px)"
                  :srcset="imageDesktop"
                  class="mx-auto w-full"
                />
                <img
                  :srcset="imageDesktop"
                  class="mx-auto w-full"
                  alt="subscriptions"
                />
              </picture>
            </div>
            <span class="text-center text-sm font-bold lg:text-base">
              Contact us to view all tiers of producers
            </span>
            <span
              class="text-s-600 text-center text-sm lg:text-base"
              data-testid="email-container"
            >
              info@benchmarkminerals.com
            </span>
          </div>
        </template>
      </CapacityDatabasePage>
    </template>
  </Wrapper>
</template>

<script>
/** @components */
import ButtonDownload from '~/components/shared/common/ButtonDownload.vue'
import Wrapper from '~/components/capacity-database/Wrapper.vue'
/** @constants */
import {
  LITHIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED,
  LITHIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED,
} from '~/constants/capacities-database/lithium-ion-batteries'
/** @mixins */
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import TabsMixin from '~/mixins/TabsMixin'

definePageMeta({ layout: 'services' })

export default {
  components: { ButtonDownload, Wrapper },
  mixins: [AuthorizationMixin, SeoUtilsMixin, TabsMixin],
  data() {
    return {
      key: 0,
      unauthorized: LITHIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED,
      imageDesktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,c_fill,q_auto,g_auto,w_1920/v1678405986/assets/market-assessments/tier-ranking_fuuenf.png?_i=AA',
      imageMobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,c_fill,q_auto,g_auto,w_1200/v1678405986/assets/market-assessments/tier-ranking_fuuenf.png?_i=AA',
      report: {
        ID: this.$config.public.gigafactoriesTierRankingPdfId,
        file_name: 'benchmark_tiers_automotive_grade_battery_producers.pdf',
        category: 'public-documents',
      },
      activeTab: LITHIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.defaultTab,
      title: LITHIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED.title,
      hero: LITHIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED.hero,
      loading: false,
      commonTabs: LITHIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.commonTabs,
      subscription: LITHIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.subscription,
    }
  },
  head() {
    return this.generateSeoInfo({
      ...LITHIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED.seo,
    })
  },
  computed: {
    showSlot() {
      return this.activeTab === 'tier-ranking'
    },
    defaultTab() {
      return this.isAuthorized
        ? LITHIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.defaultTab
        : null
    },
    tabs() {
      return this.isAuthorized
        ? LITHIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.commonTabs
        : null
    },
    authorizedActive() {
      return { ...this.authorized }
    },
    authorized() {
      return LITHIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED[this.activeTab]
    },
    jwtToken() {
      return this.$store.state.auth.jwtToken
    },
  },
  watch: {
    jwtToken: {
      handler(value) {
        if (value) {
          this.loading = true
          this.hasAuthorized(this.subscription)
            .then((isAuthorized) => {
              this.isAuthorized = isAuthorized
              this.key++
            })
            .finally(() => {
              this.loading = false
            })
        }
      },
      immediate: true,
    },
  },
  async created() {
    this.loading = true
    this.isAuthorized = await this.hasAuthorized(this.subscription)
    this.loading = false
  },
  mounted() {
    this.activeTab = this.setDefaultQueryParams(this.commonTabs)
  },
  methods: {
    productChanged(tab) {
      this.loading = true
      this.activeTab = tab
      this.key++
      this.loading = false
    },
  },
}
</script>
