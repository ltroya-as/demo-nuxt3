<template>
  <TheLayout>
    <div class="flex-grow">
      <slot/>
    </div>
  </TheLayout>
</template>

<script>
import TheLayout from '~/components/TheLayout.vue'
import LightboxMixin from '~/mixins/LightboxMixin'

export default {
  components: {
    TheLayout,
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
