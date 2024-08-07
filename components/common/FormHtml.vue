<template>
  <div>
    <div v-html="description"></div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.fm-h4 {
  @apply py-4 text-base font-semibold;
}
</style>
