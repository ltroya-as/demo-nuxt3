<template>
  <AuthorizedView :default-open-builder="isOpen" :watchlist-id="watchlistId" />
</template>

<script>
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'

import AuthorizedView from '~/components/all-prices/Authorized.vue'

import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'

definePageMeta({
  layout: 'price-assessments',
})

export default {
  components: {
    AuthorizedView,
  },
  mixins: [AuthenticationMixin, SeoUtilsMixin],
  data() {
    return {
      watchlistId: null,
      isOpen: false,
    }
  },

  head() {
    return this.generateSeoInfo(
      {
        title: 'Price Assessments Save Watchlist',
        description: PRICE_ASSESSMENTS.seo.description,
      },
      {
        keywords: 'benchmark price assessments, benchmark',
      },
    )
  },
  watch: {
    $route: {
      handler(route) {
        const { params, query } = route
        this.watchlistId = params.id || null
        this.isOpen = Boolean(query.openBuilder)
      },
      immediate: true,
    },
  },
}
</script>
