<template>
  <div v-if="text" class="text-error block">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: () => {},
    },
  },
}
</script>
