<template>
  <TheLayout>
    <PreviewSiteLayout>
      <slot />
    </PreviewSiteLayout>
  </TheLayout>
</template>

<script>
import TheLayout from '~/components/TheLayout.vue'
import PreviewSiteLayout from '~/components/PreviewSiteLayout.vue'
import LightboxMixin from '~/mixins/LightboxMixin'

export default {
  components: {
    TheLayout,
    PreviewSiteLayout,
  },
  mixins: [LightboxMixin],
}
</script>
