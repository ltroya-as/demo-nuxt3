<template>
  <div class="mx-auto flex w-full flex-col items-start justify-center gap-y-6">
    <h3 v-if="subtitle" class="text-s-900 w-full text-2xl font-bold">
      {{ subtitle }}
    </h3>

    <DescriptionAndPackages
      v-if="descriptions || packages"
      :services-title="packages.title"
      :services-items="packages.services"
      :services-items-classes="packages.classes"
      :descriptions-title="descriptions.title"
      :descriptions-items="descriptions.texts"
    >
      <slot name="description" />
    </DescriptionAndPackages>

    <div v-if="subscribe" class="flex flex-col gap-y-4">
      <h4 class="text-left text-xl font-bold"> Subscribe to gain access </h4>
      <GroupButtons
        :initial-fields="subscribe.checkboxes"
        :file="subscribe.methodology"
      />
    </div>
  </div>
</template>
<script>
/** @components */
import DescriptionAndPackages from '~/components/capacity-database/DescriptionAndPackages.vue'
import GroupButtons from '~/components/capacity-database/GroupButtons.vue'

export default {
  components: {
    DescriptionAndPackages,
    GroupButtons,
  },
  props: {
    subtitle: {
      type: String || null,
      default: null,
    },
    descriptions: {
      type: Object || null,
      default: null,
    },
    packages: {
      type: Object || null,
      default: null,
    },
    subscribe: {
      type: Object || null,
      default: null,
    },
  },
}
</script>

<style scoped>
@media (width >= 1024px) {
  .price-assessments {
    max-width: calc(100vw - 379px);
  }
}
</style>
