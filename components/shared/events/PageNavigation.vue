<template>
  <div
    class="border-b-s-700 flex flex-row border-b-2 text-sm font-semibold"
    data-testid="event-navigation-item"
  >
    <nuxt-link
      v-for="(item, index) in menu"
      :key="index"
      :to="item.url"
      class="text-s-600 px-2 pb-2 text-xs md:px-2.5 md:text-sm"
    >
      <span>
        {{ item.subtitle }}
      </span>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      menu: [
        { url: '/events', subtitle: 'All events' },
        { url: '/events/webinars', subtitle: 'Webinars' },
        { url: '/events/world-tour', subtitle: 'World tour' },
        { url: '/events/past', subtitle: 'Past events' },
      ],
    }
  },
}
</script>
<style scoped lang="scss">
.nuxt-link-exact-active {
  @apply text-s-600 after:bg-p-500 relative text-black;

  &:after {
    content: '';
    position: absolute;
    height: 4px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
