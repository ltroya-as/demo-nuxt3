<template>
  <label class="hover:bg-p-50 flex cursor-pointer gap-x-2 px-3 py-1.5">
    <input
      :checked="value"
      type="checkbox"
      class="no-outline-on-click text-p-500 h-4 w-4 rounded shadow-none !ring-0"
      @input="$emit('input', $event.target.checked)"
      @change="$emit('change', data)"
    />

    <span class="cursor-pointer text-xs font-normal">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },

    data: {
      type: Object,
      default: () => null,
    },

    value: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.no-outline-on-click:focus:not(:focus-visible) {
  @apply outline-none !important;
  @apply ring-0 !important;
}
</style>
