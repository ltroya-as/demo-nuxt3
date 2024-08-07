<template>
  <NuxtLink
    class="border-b-4 px-2 py-0.5"
    :class="isActive ? 'border-p-500' : 'border-transparent'"
    :to="item.to"
  >
    {{ titleCase(item.name) }}
  </NuxtLink>
</template>

<script>
import { titleCase } from '~/utils/string'
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isActive() {
      return this.$route.path.replace(/\/$/, '') === this.item.to
    },
  },
  methods: {
    titleCase,
  },
}
</script>
