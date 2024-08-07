<template>
  <div
    class="flex items-center justify-between gap-x-3"
    :class="{
      'cursor-not-allowed opacity-50': disabled,
    }"
  >
    <label
      :for="id"
      class="cursor-pointer select-none font-normal leading-5 text-black/90"
      :class="{
        '!cursor-not-allowed': disabled,
      }"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :name="name"
      :disabled="disabled"
      :checked="checked"
      type="radio"
      class="no-outline-on-click form-checkbox h-6 w-6 cursor-pointer rounded-full text-black focus:ring-2 focus:ring-black disabled:cursor-not-allowed"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  name: string
  checked: boolean
  disabled: boolean
  modelValue: Object
}>()

const emit = defineEmits(['update:modelValue'])

const id = useId()

const onInput = () => {
  emit('update:modelValue', props.modelValue)
}
</script>

<style scoped>
.no-outline-on-click:focus:not(:focus-visible) {
  @apply outline-none !important;
  @apply ring-0 !important;
}

input[type='radio']:checked {
  @apply border-2 border-black bg-white;

  background-image: none;
  position: relative;
}

input[type='radio']:checked::after {
  @apply bg-black;

  border-radius: 50%;
  content: '';
  display: block;
  height: 10px;
  width: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
