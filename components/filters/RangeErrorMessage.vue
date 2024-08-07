<template>
  <div
    class="container-error absolute left-0 right-0 z-10 flex flex-col rounded-xl p-3 text-xs text-white"
  >
    <span class="text-p-yellow-500 font-bold">{{ title }}</span>
    <span>
      The available data range is from
      <span class="text-p-yellow-500 font-bold">{{ min }}</span> to
      <span class="text-p-yellow-500 font-bold">{{ max }}</span
      >. We have updated the data input to the {{ value }} available value.
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.container-error {
  top: calc(100% + 0.5rem);
  background-color: #020c18e5;
  fill: rgba(2 12 24 / 80%);
  filter: drop-shadow(0 4px 4px rgba(0 0 0 / 25%));
  backdrop-filter: blur(2px);
}
</style>
