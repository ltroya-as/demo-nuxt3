<template>
  <SharedNavigationLink :url="route">
    <button
      type="button"
      class="flex w-full flex-row items-center justify-center gap-x-3 rounded border border-black px-6 py-2"
    >
      <slot></slot>
      <span class="text-base font-semibold">
        {{ text }}
      </span>
    </button>
  </SharedNavigationLink>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    route: {
      type: String,
      required: true,
    },
  },
}
</script>
