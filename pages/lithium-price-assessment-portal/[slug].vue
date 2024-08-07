<template>
  <div
    class="fixed flex h-[calc(100vh_-_3.5rem)] w-full flex-col items-center justify-center overflow-hidden bg-white md:static md:h-full"
  >
    <TheLoader />
  </div>
</template>

<script>
import TheLoader from '~/components/TheLoader.vue'

export default {
  components: { TheLoader },
  /**
   * This page is to handle the redirect of the price assessments
   * lithium portal old routes to the new route.
   *
   * E.g:
   *
   * From:
   * /lithium-price-assessment-portal/lopal-announces-jv-project-with-tangshan-xinfeng-to-build-integrated-lithium-chemicals-facility-in-hubei-province-benchmark-lithium/
   *
   * To:
   * /price-assessments/lithiumlopal-announces-jv-project-with-tangshan-xinfeng-to-build-integrated-lithium-chemicals-facility-in-hubei-province-benchmark-lithium/
   */
  mounted() {
    const slug = this.$route.params.slug
    this.$router.push(`/price-assessments/lithium/${slug}`)
  },
}
</script>
