<template>
  <div class="relative">
    <!-- Current Menu -->
    <div
      class="bg-s-900 text-p-500 flex cursor-pointer select-none items-center justify-between p-4 text-sm font-bold"
      @click="toggleContextualMenu"
    >
      <span>{{ activeMenuLabel }}</span>

      <img
        class="h-6 w-6 origin-center duration-500"
        :class="{
          'rotate-180': menuOpen,
          transform: menuOpen,
        }"
        src="~assets/icons/ChevronDown.svg"
        alt="down"
      />
    </div>

    <!-- All menus -->
    <transition
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-500"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="menuOpen" class="bg-s-800 absolute left-0 top-14 z-20 w-full">
        <NuxtLink v-for="menu in menus" :key="menu.name" :to="menu.to">
          <div class="p-4 text-sm text-white" @click="menuOpen = false">
            {{ menu.label }}
          </div>
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      required: true,
    },

    parent: {
      type: String,
      default: 'forecasts',
    },
  },

  data() {
    return {
      menuOpen: false,
    }
  },

  computed: {
    activeMenu() {
      return this.$route.fullPath.split('/')[2]?.toLowerCase() || 'home'
    },

    activeMenuLabel() {
      const currentMenu = this.menus.find(
        (menu) => menu.name === this.activeMenu,
      )
      return currentMenu?.label
    },

    activeSubMenu() {
      return this.$route.fullPath.split('/')[3]?.toLowerCase() || ''
    },
  },

  /**
   * This method will be executed on each page change
   */
  mounted() {
    const activeMenu = this.menus.find((menu) => menu.name === this.activeMenu)

    if (activeMenu) {
      this.$store.commit('menu/setActiveMenu', {
        activeMenu,
        activeSubMenu: this.activeSubMenu,
      })
    }
  },

  methods: {
    toggleContextualMenu() {
      this.menuOpen = !this.menuOpen
    },
  },
}
</script>
