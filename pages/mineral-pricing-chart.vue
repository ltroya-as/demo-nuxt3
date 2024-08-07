<template>
  <div
    class="fixed flex h-[calc(100vh_-_3.5rem)] w-full flex-col items-center justify-center overflow-hidden bg-white md:static md:h-full"
  >
    <TheLoader />
  </div>
</template>

<script>
import TheLoader from '~/components/TheLoader.vue'
import {
  PRICE_ASSESSMENTS_ANODE,
  PRICE_ASSESSMENTS_CATHODE,
  PRICE_ASSESSMENTS_COBALT,
  PRICE_ASSESSMENTS_LITHIUM,
  PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
  PRICE_ASSESSMENTS_NICKEL,
  PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
} from '~/constants/services/price-assessments'

const MINERAL_PRICING_ROUTES = {
  Lithium: PRICE_ASSESSMENTS_LITHIUM.routes.chart,
  Cobalt: PRICE_ASSESSMENTS_COBALT.routes.chart,
  Graphite: PRICE_ASSESSMENTS_NATURAL_GRAPHITE.routes.chart,
  Synthetic_graphite: PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE.routes.chart,
  Nickel: PRICE_ASSESSMENTS_NICKEL.routes.chart,
  Anode: PRICE_ASSESSMENTS_ANODE.routes.chart,
  Cathode: PRICE_ASSESSMENTS_CATHODE.routes.chart,
}

export default {
  components: { TheLoader },
  /**
   * We added this redirects here because cloudflare doesn't allow to redirect
   * based on query params.
   *
   * See support for query params here:
   * https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/url-components/
   *
   * Also, see the error cloudflare throws when trying to redirect based on query params:
   * https://github.com/allansolutions/benchmark-frontend/pull/533#issue-1405245320
   */
  mounted() {
    const productId = this.$route.query.productId || 'Lithium'
    const chartRoute =
      MINERAL_PRICING_ROUTES[productId] || MINERAL_PRICING_ROUTES.Lithium

    this.$router.push(chartRoute)
  },
}
</script>
