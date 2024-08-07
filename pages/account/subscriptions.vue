<template>
  <div>
    <TheLoader v-if="loading" class="left-0 mb-[80%] mt-44 w-full lg:mt-72" />

    <div v-else>
      <AccountSubscriptionsList :subscriptions="subscriptions" />
    </div>
  </div>
</template>

<script>
import TheLoader from '~/components/TheLoader.vue'
import AccountSubscriptionsList from '~/components/account/SubscriptionsList.vue'
definePageMeta({ layout: 'account', middleware: ['authenticated'] })

export default {
  components: { AccountSubscriptionsList, TheLoader },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'My Subscriptions' })

    useHead(seo)
  },
  data() {
    return {
      subscriptions: [],
      loading: true,
    }
  },
  async mounted() {
    if (this.$store.state.memberships.allSubscriptions === undefined) {
      this.$store.commit(
        'memberships/setAllSubscriptions',
        await this.$restClient.getSubscriptions(),
      )
    }
    this.subscriptions = this.$store.state.memberships.allSubscriptions
    this.loading = false
  },
}
</script>
