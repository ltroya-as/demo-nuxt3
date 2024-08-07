<template>
  <div
    class="bg-p-100 font-lato inline-block rounded-full px-3 py-1 text-sm md:px-5 md:py-1.5 md:text-base xl:text-xl"
    :title="text"
  >
    <p class="line-clamp-1">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>
