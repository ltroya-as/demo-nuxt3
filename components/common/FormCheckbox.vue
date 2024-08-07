<template>
  <div class="mb-1 flex items-center">
    <label>
      <input
        :checked="modelValue"
        type="checkbox"
        class="no-outline-on-click form-checkbox text-s-900 focus:ring-s-900 h-5 w-5 cursor-pointer rounded focus:ring-2"
        @input="$emit('update:modelValue', $event.target.checked)"
        @change="$emit('change', data)"
      />

      <span class="font-lato cursor-pointer pl-2">
        {{ label }}
      </span>
    </label>
  </div>
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

    modelValue: {
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
