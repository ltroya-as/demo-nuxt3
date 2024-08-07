<template>
  <ServicesPageWrapper
    :membership="subscription"
    :authorized-route="authorizedRoute"
  >
    <UnauthorizedView />
  </ServicesPageWrapper>
</template>

<script>
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'

import UnauthorizedView from '~/components/all-prices/Unauthorized.vue'
import ServicesPageWrapper from '~/components/shared/services/PageWrapper.vue'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'

import { MARKET_PRICE_DASHBOARD } from '~/constants/services/market'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

definePageMeta({
  layout: 'price-assessments',
})

export default {
  components: {
    UnauthorizedView,
    ServicesPageWrapper,
  },
  mixins: [AuthenticationMixin, SeoUtilsMixin],
  data() {
    return {
      authorizedRoute: MARKET_PRICE_DASHBOARD.routes.authorized,
      subscription: MARKET_PRICE_DASHBOARD.subscription,
    }
  },
  head() {
    return this.generateSeoInfo(
      {
        title: 'Price Assessments Chart Builder',
        description: PRICE_ASSESSMENTS.seo.description,
      },
      {
        keywords: 'benchmark price assessments, benchmark',
      },
    )
  },
}
</script>
