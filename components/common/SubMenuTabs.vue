<template>
  <div
    class="h-[40px] lg:hidden"
    :class="shouldShowSubmenuTabs ? 'bg-s-50' : 'bg-s-100'"
  >
    <div v-if="shouldShowSubmenuTabs" class="border-s-200 flex border-t-2">
      <nuxt-link
        v-for="item in activeMenu.children"
        :key="item.name"
        class="border-b-2 px-4 py-2 text-sm font-semibold"
        :class="[
          isActive(item)
            ? 'border-b-s-emcolor-high text-p-em-high'
            : 'text-p-em-disabled border-b-white',
        ]"
        :to="item.to"
      >
        {{ titleCase(item.name) }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { titleCase } from '~/utils/string'
export default {
  data() {
    return {
      items: [],
    }
  },

  computed: {
    activeMenu() {
      return this.$store.state.menu.activeMenu
    },
    activeSubMenu() {
      return this.$store.state.menu.activeSubMenu
    },

    shouldShowSubmenuTabs() {
      return (
        this.activeMenu &&
        this.activeSubMenu &&
        this.activeMenu.children?.length > 1
      )
    },
  },

  methods: {
    titleCase,
    isActive({ name }) {
      return name === this.activeSubMenu
    },
  },
}
</script>
