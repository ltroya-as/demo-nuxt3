<template>
  <div data-testid="overview" class="h-full w-full">
    <div
      v-if="loading"
      class="flex h-full min-h-[30vh] w-full flex-col items-center justify-center lg:min-h-[50vh] lg:w-[80%]"
    >
      <TheLoader />
    </div>

    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { hasPricingMenu } from '@/utils/memberships'
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import TheLoader from '~/components/TheLoader.vue'

export default {
  components: { TheLoader },
  mixins: [AuthorizationMixin],
  props: {
    membership: {
      type: String,
      required: true,
    },
    authorizedRoute: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  async mounted() {
    if (!this.$bmAuth.isAuthenticated()) {
      this.loading = false
      return
    }

    const isMembershipActive = await this.hasMembership(this.membership)

    if (isMembershipActive) {
      return this.$router.push(this.authorizedRoute)
    }

    if (this.membership === 'pricing-price-dashboard' && !isMembershipActive) {
      const memberships = this.$store.state.memberships
      const pricingMenu = hasPricingMenu(memberships)
      if (pricingMenu) {
        return this.$router.push(this.authorizedRoute)
      }
    }

    this.loading = false
  },
}
</script>
