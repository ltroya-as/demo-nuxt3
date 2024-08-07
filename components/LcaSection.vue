<template>
  <div class="flex w-full flex-col gap-6">
    <div>
      In light of increasing pressure for transparency and carbon accounting,
      LCAs are becoming widely used to provide holistic, detailed assessments of
      environmental impacts. LCA is a scientifically proven method to quantify
      impacts of a product and its process system across the entire value chain,
      going beyond assessing carbon emissions alone.
    </div>
    <EsgLcaDescriptionSection />
    <EsgLcaGlobalSection />
    <EsgLcaAcrossSection />
  </div>
</template>

<script>
import EsgLcaDescriptionSection from '~/components/esg/lca/DescriptionSection.vue'
import EsgLcaGlobalSection from '~/components/esg/lca/GlobalSection.vue'
import EsgLcaAcrossSection from '~/components/esg/lca/AcrossSection.vue'

export default {
  components: {
    EsgLcaDescriptionSection,
    EsgLcaGlobalSection,
    EsgLcaAcrossSection,
  },
}
</script>
