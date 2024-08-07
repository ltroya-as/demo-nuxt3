<template>
  <span
    class="bg-s-900 text-xxs flex items-center whitespace-nowrap rounded-full px-3 py-1.5 text-white"
    data-testid="category-pill"
  >
    {{ category.name }}
  </span>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
}
</script>
