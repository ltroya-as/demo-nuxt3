<template>
  <AuthorizedView />
</template>

<script>
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'
import AuthorizedView from '~/components/all-prices/Authorized.vue'

definePageMeta({
  layout: 'price-assessments',
  middleware: ['has-active-membership'],
})

export default {
  components: {
    AuthorizedView,
  },
  beforeRouteEnter(_, __, next) {
    next((vm) => vm.$store.dispatch('chartBuilder/reset'))
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo(
      {
        title: 'Price Assessments Chart Builder',
        description: PRICE_ASSESSMENTS.seo.description,
      },
      {
        keywords: 'benchmark price assessments, benchmark',
      },
    )
    useHead(seo)
  },
}
</script>
