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
        :unauthorized="unauthorizedActive"
        :authorized="authorizedActive"
        :is-authorized="isAuthorized"
      >
        <template v-if="showImages" #description>
          <div
            class="flex flex-row items-center justify-between gap-x-2 pt-4 xl:pt-16"
          >
            <img
              alt="cathode overview one"
              :src="images.big.src"
              class="bg-p-500 max-h-[250px] min-h-[250px] w-full rounded-lg object-cover lg:w-[60%] xl:max-h-[240px] xl:min-h-[240px] xl:w-[68%]"
            />
            <img
              alt="cathode overview two"
              :src="images.small.src"
              class="bg-p-500 hidden max-h-[250px] min-h-[250px] w-full rounded-lg object-cover sm:block sm:w-[40%] xl:max-h-[240px] xl:min-h-[240px] xl:w-[30%]"
            />
          </div>
        </template>
      </CapacityDatabasePage>
    </template>
  </Wrapper>
</template>

<script>
/** @components */
import CapacityDatabasePage from '~/components/capacity-database/CapacityDatabasePage.vue'
import Wrapper from '~/components/capacity-database/Wrapper.vue'
/** @constants */
import {
  CATHODE_CAPACITIES_AUTHORIZED,
  CATHODE_CAPACITIES_UNAUTHORIZED,
} from '~/constants/capacities-database/cathode'

/** @mixins */
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import TabsMixin from '~/mixins/TabsMixin'

definePageMeta({ layout: 'services' })

export default {
  components: { Wrapper, CapacityDatabasePage },
  mixins: [AuthorizationMixin, SeoUtilsMixin, TabsMixin],
  data() {
    return {
      defaultTab: CATHODE_CAPACITIES_UNAUTHORIZED.defaultTab,
      tabs: CATHODE_CAPACITIES_UNAUTHORIZED.commonTabs,
      images: CATHODE_CAPACITIES_UNAUTHORIZED.images,
      title: CATHODE_CAPACITIES_AUTHORIZED.title,
      loading: false,
      activeTab: CATHODE_CAPACITIES_UNAUTHORIZED.defaultTab,
      key: 0,
    }
  },
  head() {
    const seo =
      this.unauthorizedActive?.seo ?? CATHODE_CAPACITIES_UNAUTHORIZED.seo
    return this.generateSeoInfo({ ...seo })
  },
  computed: {
    showImages() {
      return this.activeTab === this.defaultTab
    },
    unauthorizedActive() {
      return { ...this.unauthorized }
    },
    hero() {
      return this.isAuthorized
        ? this.authorizedActive?.hero
        : this.unauthorizedActive?.hero
    },
    subscription() {
      return this.authorizedActive?.subscription
    },
    unauthorized() {
      const CAPACITY_ACTIVE = CATHODE_CAPACITIES_UNAUTHORIZED[this.activeTab]
      const methodology = {
        ...CAPACITY_ACTIVE?.methodology,
        ID: this.$config[CAPACITY_ACTIVE?.methodology.varName],
      }
      return {
        ...CAPACITY_ACTIVE,
        subtitle: CAPACITY_ACTIVE?.subtitle,
        hero: {
          ...CAPACITY_ACTIVE?.hero,
          methodology,
        },
        subscribe: {
          ...CAPACITY_ACTIVE?.subscribe,
          methodology,
        },
      }
    },
    authorizedActive() {
      return { ...this.authorized }
    },
    authorized() {
      return CATHODE_CAPACITIES_AUTHORIZED[this.activeTab]
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
    this.activeTab = this.setDefaultQueryParams(this.tabs)
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
