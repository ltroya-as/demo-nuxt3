<template>
  <label
    :for="id"
    class="flex cursor-pointer items-center justify-between gap-x-3 rounded-lg px-3 py-0.5"
    :class="{
      'cursor-not-allowed opacity-50': disabled,
    }"
  >
    <span class="select-none font-normal leading-5 text-black/90">
      {{ label }}
    </span>
    <input
      :id="id"
      :checked="checked"
      :disabled="disabled"
      type="checkbox"
      class="no-outline-on-click form-checkbox text-p-500 focus:ring-p-500 h-5 w-5 cursor-pointer rounded focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
      @change="$emit('change', $event.target.checked)"
    />
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  checked: boolean
  disabled: boolean
}>()

defineEmits(['change'])

const id = useId()
</script>

<style scoped>
.no-outline-on-click:focus:not(:focus-visible) {
  @apply outline-none !important;
  @apply ring-0 !important;
}
</style>
