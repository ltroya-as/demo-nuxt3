<template>
  <button
    :class="[bgColor, textColor]"
    class="rounded-full px-12 py-4 text-lg font-semibold uppercase hover:underline focus:outline-none sm:px-16"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true,
    },
    bgColorClass: {
      type: String,
      default: null,
    },
    textColorClass: {
      type: String,
      default: null,
    },
  },
  computed: {
    bgColor() {
      return this.bgColorClass ? this.bgColorClass : 'bg-bme22-red'
    },
    textColor() {
      return this.textColorClass ? this.textColorClass : 'text-white'
    },
  },
}
</script>
