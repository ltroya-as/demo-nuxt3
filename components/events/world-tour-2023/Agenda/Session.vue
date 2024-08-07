<template>
  <div class="px-6 py-4">
    <span class="text-xl font-bold"
      >Session {{ number }}: <br class="lg:hidden" />{{ title }}</span
    >
    <br />
    <div class="mt-2 italic">Chair: {{ chair }}</div>
    <div class="mt-4">{{ description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    chair: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
