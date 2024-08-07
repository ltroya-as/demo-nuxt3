<template>
  <a
    class="flex items-center justify-center"
    :href="websiteUrl"
    target="_blank"
  >
    <img
      :src="imageUrl"
      alt="Website Url"
      class="max-h-[200px] max-w-[320px]"
    />
  </a>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
  },
}
</script>
