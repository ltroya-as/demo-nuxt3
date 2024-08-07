<template>
  <div class="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5">
    <img :src="sponsorLogo" alt class="max-auto" />
  </div>
</template>

<script>
export default {
  name: 'Sponsor',
  // eslint-disable-next-line vue/require-prop-types
  props: ['sponsorLogo'],
}
</script>
