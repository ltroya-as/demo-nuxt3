<template>
  <nav id="nav">
    <div
      class="mb-4 flex justify-center border-b border-white pb-2 text-sm font-semibold uppercase lg:mb-12 lg:justify-end lg:text-xs"
    >
      <div>
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="mx-3 hover:underline md:mx-4"
          >{{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.router-link-active {
  text-decoration: underline;
}
</style>
