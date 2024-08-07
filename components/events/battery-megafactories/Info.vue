<template>
  <div id="info" :class="bgColor">
    <div class="bm-container flex flex-col py-12 sm:p-12 md:flex-row lg:p-20">
      <slot name="section-one"></slot>
      <slot name="section-two"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  // eslint-disable-next-line vue/require-prop-types
  props: ['bgColorClass'],
  computed: {
    bgColor() {
      return this.bgColorClass ? this.bgColorClass : ''
    },
  },
}
</script>

<style scoped>
.bm-container {
  max-width: 1500px;
  margin: auto;
}
</style>
