<template>
  <div class="h-1 w-full" :class="backgroundClass">
    <div
      class="transition-width-and-colors h-1 rounded-r-full duration-500"
      :class="colorClass"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    colorClass: {
      type: String,
      required: true,
    },
    backgroundClass: {
      type: String,
      required: true,
    },
  },
}
</script>
