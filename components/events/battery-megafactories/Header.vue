<template>
  <div id="header" class="bg-cover bg-no-repeat px-4 py-4 text-white">
    <div class="bm-container">
      <Nav v-if="navItems.length" :nav-items="navItems" />
      <div
        class="flex flex-col text-center md:flex-row md:justify-around md:text-left"
      >
        <slot name="section-one"></slot>
        <slot name="section-two"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './Nav'

export default {
  name: 'Header',
  components: {
    Nav,
  },
  props: {
    navItems: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
#header {
  background-position-x: center;
}

@media (min-width: 1024px) {
  #header {
    min-height: 700px;
  }
}

@media (min-width: 2560px) {
  #header {
    min-height: 1000px;
  }
}

.bm-container {
  max-width: 1500px;
  margin: auto;
}
</style>
