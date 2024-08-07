<template>
  <div>
    <a :href="website" target="_blank">
      <img :src="logoUrl" alt="" class="h-full w-full object-contain" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    website: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
  },
}
</script>
