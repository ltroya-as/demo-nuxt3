<template>
  <p
    class="mx-auto mb-11 w-full text-center text-base font-bold md:w-96 md:text-xl xl:w-auto"
  >
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
