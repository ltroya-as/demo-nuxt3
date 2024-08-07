<template>
  <Wrapper
    :hero="hero"
    :title="title"
    :is-authorized="isAuthorized"
    :loading="loading"
  >
    <template #content>
      <CapacityDatabasePage
        :key="key"
        :unauthorized="unauthorized"
        :authorized="authorized"
        :is-authorized="isAuthorized"
      >
        <template #description>
          <div
            class="flex flex-row items-center justify-between gap-x-2 pt-4 xl:pt-16"
          >
            <img
              alt="anode overview one"
              :src="images.big.src"
              class="bg-p-500 max-h-[250px] min-h-[250px] w-full rounded-lg object-cover lg:w-[60%] xl:max-h-[240px] xl:min-h-[240px] xl:w-[68%]"
            />
            <img
              alt="anode overview two"
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
import Wrapper from '~/components/capacity-database/Wrapper.vue'
import CapacityDatabasePage from '~/components/capacity-database/CapacityDatabasePage.vue'
/** @constants */
import {
  ANODE_CAPACITIES_AUTHORIZED,
  ANODE_CAPACITIES_UNAUTHORIZED,
} from '~/constants/capacities-database/anode'
/** @mixins */
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

definePageMeta({ layout: 'services' })

export default {
  components: { CapacityDatabasePage, Wrapper },
  mixins: [AuthorizationMixin, SeoUtilsMixin],
  data() {
    const methodology = {
      ...ANODE_CAPACITIES_UNAUTHORIZED.methodology,
      ID: this.$config[ANODE_CAPACITIES_UNAUTHORIZED.methodology.varName],
    }
    return {
      key: 0,
      loading: false,
      images: ANODE_CAPACITIES_UNAUTHORIZED.images,
      subscription: ANODE_CAPACITIES_AUTHORIZED.subscription,
      hero: {
        ...ANODE_CAPACITIES_UNAUTHORIZED.hero,
        methodology,
      },
      title: ANODE_CAPACITIES_UNAUTHORIZED.title,
      unauthorized: {
        ...ANODE_CAPACITIES_UNAUTHORIZED,
        hero: {
          ...ANODE_CAPACITIES_UNAUTHORIZED.hero,
          methodology,
        },
        subscribe: {
          ...ANODE_CAPACITIES_UNAUTHORIZED.subscribe,
          methodology,
        },
      },
      authorized: ANODE_CAPACITIES_AUTHORIZED,
    }
  },
  head() {
    return this.generateSeoInfo({ ...ANODE_CAPACITIES_UNAUTHORIZED.seo })
  },
  computed: {
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
}
</script>
