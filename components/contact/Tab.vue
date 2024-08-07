<template>
  <button
    class="hover:text-s-600 p-2 text-sm font-bold transition-colors"
    :class="[
      isActive
        ? 'border-p-500 border-b-4'
        : 'text-s-500 border-b-4 border-transparent',
    ]"
    @click="$emit('selectTab', tab)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    tab: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
