<template>
  <p class="mx-auto mb-11 w-full text-base font-bold md:w-96 md:text-xl">
    {{ message }}
  </p>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
}
</script>
