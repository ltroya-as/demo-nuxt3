<template>
  <button
    class="w-full py-2 text-center text-lg font-bold uppercase text-white"
    :class="{ 'bg-bwo21-purple-300': active, 'text-white': active }"
  >
    {{ dayOfWeek }}
  </button>
</template>

<script>
export default {
  name: 'Day',
  props: {
    dayOfWeek: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
