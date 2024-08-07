<template>
  <div class="bg-white">
    <CommonHero
      image="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1532,f_auto/v1677077661/assets/lca/lca-banner_fwddb8.jpg?_i=AA"
      content-classes="md:!top-0 !top-8"
      class="!max-h-[380px] !min-h-[380px]"
    >
      <div
        class="max-w-content-container mx-auto flex h-full flex-col justify-center text-white"
      >
        <h1 class="text-2xl font-bold leading-7 md:leading-10 lg:text-4xl">
          LCA Consultancy
        </h1>
        <p
          class="max-w-[700px] pb-28 pt-6 md:pb-6 lg:pt-4 lg:text-lg lg:font-medium"
        >
          In light of increasing pressure for transparency and carbon
          accounting, LCAs are becoming widely used to provide holistic,
          detailed assessments of environmental impacts. LCA is a scientifically
          proven method to quantify impacts of a product and its process system
          across the entire value chain, going beyond assessing carbon emissions
          alone.
        </p>
      </div>
    </CommonHero>
    <div class="mt-10 flex w-full flex-col gap-8 bg-white">
      <EsgLcaDescriptionSection />
      <EsgLcaGlobalSection />
      <EsgLcaAcrossSection />
    </div>
  </div>
</template>

<script>
import CommonHero from '~/components/common/Hero.vue'
import EsgLcaDescriptionSection from '~/components/esg/lca/DescriptionSection.vue'
import EsgLcaGlobalSection from '~/components/esg/lca/GlobalSection.vue'
import EsgLcaAcrossSection from '~/components/esg/lca/AcrossSection.vue'

import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

definePageMeta({ layout: 'overviews' })

export default {
  components: {
    CommonHero,
    EsgLcaAcrossSection,
    EsgLcaDescriptionSection,
    EsgLcaGlobalSection,
  },
  mixins: [SeoUtilsMixin],
  head() {
    return this.generateSeoInfo({
      title: 'Life Cycle Assessments',
      description:
        'In a climate where there is increasing pressure for transparency and carbon accounting, LCAs are becoming widely used in the industry to provide holistic, detailed assessment of a product or process’ environmental impacts.',
    })
  },
  mounted() {
    this.$store.commit('breadcrumb/clearBreadcrumb')

    this.$store.commit('breadcrumb/addItemBreadcrumb', 'Services')
    this.$store.commit('breadcrumb/addItemBreadcrumb', 'Life Cycle Assessments')
  },
}
</script>
