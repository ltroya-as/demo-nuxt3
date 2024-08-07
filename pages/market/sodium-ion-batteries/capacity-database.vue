<template>
  <Wrapper
    :hero="hero"
    :title="title"
    :is-authorized="isAuthorized"
    :tabs="tabs"
    :loading="loading"
    @product-changed="productChanged"
  >
    <template #content>
      <CapacityDatabasePage
        :key="key"
        :unauthorized="unauthorized"
        :authorized="authorizedActive"
        :is-authorized="isAuthorized"
      >
        <template #description>
          <div class="flex flex-col items-start justify-center gap-5">
            <ButtonContactUs
              text="Find out more"
              :services="checkboxes"
              class="!h-full !max-h-[44px] !min-h-[44px] !w-fit flex-shrink-0 text-base font-semibold leading-5 md:!w-full md:!min-w-[160px] md:!max-w-[160px] lg:!min-w-[160px] lg:!max-w-[160px]"
            />
            <img
              alt="sodium ion batteries overview"
              :src="image.src"
              class="h-full max-h-[134px] min-h-[134px] w-full rounded-lg object-cover lg:max-h-[224px] lg:min-h-[224px]"
            />
          </div>
        </template>
      </CapacityDatabasePage>
    </template>
  </Wrapper>
</template>

<script>
/** @components */
import ButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
import Wrapper from '~/components/capacity-database/Wrapper.vue'
/** @constants */
import {
  SODIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED,
  SODIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED,
} from '~/constants/capacities-database/sodium-ion-batteries'

/** @mixins */
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import TabsMixin from '~/mixins/TabsMixin'

definePageMeta({ layout: 'services' })

export default {
  components: { ButtonContactUs, Wrapper },
  mixins: [AuthorizationMixin, SeoUtilsMixin, TabsMixin],
  data() {
    return {
      image: SODIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED.image,
      checkboxes: SODIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED.checkboxes,
      unauthorized: SODIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED,
      activeTab: SODIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.defaultTab,
      title: SODIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED.title,
      hero: {
        ...SODIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED.hero,
        methodology: {
          ...SODIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED.methodology,
          ID: this.$config[
            SODIUM_ION_BATTERIES_CAPACITIES_UNAUTHORIZED.methodology.varName
          ],
        },
      },
      loading: false,
      commonTabs: SODIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.commonTabs,
      subscription: SODIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.subscription,
      key: 0,
    }
  },
  head() {
    return this.generateSeoInfo({ ...this.unauthorized.seo })
  },
  computed: {
    defaultTab() {
      return this.isAuthorized
        ? SODIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.defaultTab
        : null
    },
    tabs() {
      return this.isAuthorized
        ? SODIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED.commonTabs
        : null
    },
    authorizedActive() {
      return { ...this.authorized }
    },
    authorized() {
      return SODIUM_ION_BATTERIES_CAPACITIES_AUTHORIZED[this.activeTab]
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
    if (this.isAuthorized) {
      this.activeTab = this.setDefaultQueryParams(this.commonTabs)
    }
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
