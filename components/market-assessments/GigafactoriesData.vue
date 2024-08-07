<template>
  <div class="flex h-full flex-col">
    <div data-testid="summary-box" class="bg-s-100 flex-1 rounded">
      <slot name="summaryBox"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTitleLarge: {
      type: Boolean,
      required: false,
    },
  },
}
</script>
