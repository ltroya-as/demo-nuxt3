<template>
  <label
    class="flex cursor-pointer items-center"
    @click.prevent="$emit('click', $event)"
  >
    <div class="relative">
      <input type="checkbox" class="sr-only" :checked="value" />
      <div
        class="toggle-bar bg-s-400 h-4 w-10 rounded-full shadow-inner transition"
      />
      <div
        class="dot bg-s-500 absolute -left-1 -top-1 h-6 w-6 rounded-full shadow transition"
      ></div>
    </div>
    <div v-if="showLabel" class="ml-3 text-xs font-medium text-gray-700">
      {{ label }}
    </div>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => 'Toggle Label',
    },
    showLabel: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
  @apply bg-p-500;
}

input:checked ~ .toggle-bar {
  @apply bg-p-200;
}
</style>
