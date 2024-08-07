<template>
  <TheLayout>
    <PreviewSiteLayout :client-only="$config.public.isPreviewSite">
      <div class="flex-grow">
        <slot />
      </div>
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
  mounted() {
    this.$store.commit('menu/setActiveMenu', {
      activeMenu: null,
      activeSubMenu: null,
    })
  },
}
</script>
