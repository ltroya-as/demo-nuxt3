<template>
  <div>
    <label class="flex cursor-pointer items-center">
      <div class="relative">
        <div
          class="h-6 w-10 rounded-full shadow-inner transition"
          :style="{ backgroundColor: backgroundColor }"
          style="opacity: 0.38"
        ></div>

        <div
          :style="{ backgroundColor: backgroundColor }"
          class="absolute left-1 top-1 h-4 w-4 rounded-full shadow transition"
          :class="{ 'translate-x-4': checked, 'translate-x-0': !checked }"
        ></div>

        <input
          v-model="checked"
          type="checkbox"
          class="hidden"
          @change="toggle"
        />
      </div>
      <div class="ml-3 font-medium text-gray-700">{{ label }}</div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: '#DADADA',
    },
  },
  data() {
    return {
      checked: this.value,
    }
  },
  methods: {
    toggle() {
      this.$emit('update:modelValue', this.checked)
      this.$emit('change', this.checked)
    },
  },
}
</script>
