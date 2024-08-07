<template>
  <a
    v-if="imageUrl"
    class="flex items-center justify-center"
    :href="websiteUrl"
    target="_blank"
  >
    <img :src="imageUrl" alt="sponsor" />
  </a>
</template>

<script>
export default {
  name: 'Sponsor',
  props: {
    imageUrl: {
      type: [String, null, undefined],
      default: null,
    },
    websiteUrl: {
      type: [String, null, undefined],
      default: null,
    },
  },
}
</script>
