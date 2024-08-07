<template>
  <a
    :href="url"
    target="_blank"
    class="align-right flex h-12 w-32 items-center justify-center rounded-lg px-4 py-2 text-center font-bold uppercase shadow-xl hover:underline"
    :class="[{ hidden: url == '' }]"
    @click="(e) => $emit('click', e)"
  >
    {{ linkText }}
  </a>
</template>

<script>
export default {
  name: 'ButtonJoin',
  props: {
    url: {
      type: String,
      default: null,
    },
    linkText: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
.join-members {
  position: absolute;
  right: 10px;
}
</style>
