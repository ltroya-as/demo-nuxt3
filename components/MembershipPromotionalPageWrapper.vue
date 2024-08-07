<template>
  <div data-testid="overview" class="relative">
    <div v-if="loading" class="absolute left-0 top-44 w-full lg:top-72">
      <TheLoader />
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
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
      default: '',
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
    this.loading = false
  },
}
</script>
