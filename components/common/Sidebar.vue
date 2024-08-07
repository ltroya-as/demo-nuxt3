<template>
  <div
    id="sidebar"
    class="fixed top-[46px] z-40 w-full min-w-[235px] bg-white text-xs leading-3 md:top-[82px] lg:relative lg:top-0 lg:z-10 lg:mb-8 lg:w-[235px]"
  >
    <button
      class="bg-grey-900 flex w-full items-center gap-2 px-4 py-2.5 lg:hidden"
      @click="toggleOpenMobile"
    >
      <IconChevronDown
        class="text-p-400 w-full min-w-[22px] max-w-[22px] duration-300"
        :class="{
          'rotate-180': openMobileMenu,
          'animate-bounceMenu': !openMobileMenu,
        }"
      />
      <span class="font-bold text-white">{{ sectionName }}</span>
    </button>

    <div
      :class="{ 'h-fit': openMobileMenu, 'h-0': !openMobileMenu }"
      class="bg-grey-100 shadow-file absolute z-10 flex max-h-[calc(100vh-105px)] w-full flex-col overflow-hidden overflow-y-auto transition-all duration-300 lg:sticky lg:top-[153px] lg:bg-white lg:shadow-none xl:top-[105px]"
    >
      <client-only>
        <div
          v-for="menu in menus"
          :key="menu.name"
          class="relative flex w-full flex-col items-center font-medium before:absolute before:bottom-0 before:left-3.5 before:right-3.5 before:block before:h-px before:content-[''] lg:before:hidden"
          :class="{
            'bg-grey-300 text-s-900': isMenuActive(menu.name),
            'text-s-700': !isMenuActive(menu.name),
          }"
        >
          <button
            v-if="
              menu.children.length > 0 &&
              (!menu.isPrivate || $store.getters['auth/authenticated'])
            "
            class="flex w-full items-center justify-between gap-2 px-3.5 py-2.5"
            @click="toggleMenu(menu.name)"
          >
            <span class="flex items-center gap-2 font-medium">
              <span class="h-5 w-5">
                <Icon :name="menu.icon" class="h-5 w-5 lg:text-inherit" />
              </span>
              <span class="text-left">{{ menu.label }}</span>
            </span>

            <IconChevronDown
              class="w-full min-w-[22px] max-w-[22px] duration-500"
              :class="{ 'rotate-180': menu.open }"
            />
          </button>

          <NuxtLink
            v-else
            :to="menu.to"
            class="flex w-full items-center justify-between gap-2 px-3.5 py-2.5"
          >
            <div class="flex items-center gap-2">
              <div class="h-5 w-5">
                <Icon :name="menu.icon" class="h-5 w-5" />
              </div>
              <div class="text-left">{{ menu.label }}</div>
            </div>

            <IconChevronDown
              class="w-full min-w-[22px] max-w-[22px] opacity-0"
            />
          </NuxtLink>

          <div
            :class="{
              'unfold-animation': isOpenSubmenu(menu),
              'fold-animation': !isOpenSubmenu(menu),
            }"
            class="submenu bg-grey-300 lg:bg-s-50 flex w-full flex-col"
          >
            <div v-for="subitem in menu.children" :key="subitem.name">
              <a
                v-if="subitem.externalLink"
                :href="subitem.to"
                target="_blank"
                class="flex bg-[#020d1d]"
              >
                <div class="flex items-center gap-1.5 py-3 pl-6">
                  <Icon :name="subitem.icon" class="text-p-900 h-5 w-5" />
                  <span class="text-white">
                    {{ subitem.name }}
                  </span>
                </div>
              </a>
              <NuxtLink
                v-else
                :to="subitem.to"
                class="hover:bg-grey-100 flex"
                :class="{
                  'bg-grey-400 lg:bg-grey-100':
                    isSubMenuActive(subitem.page) && isMenuActive(menu.name),
                }"
              >
                <div
                  class="bg-p-500 w-1"
                  :class="{
                    'opacity-0':
                      !isSubMenuActive(subitem.page) ||
                      !isMenuActive(menu.name),
                  }"
                />
                <span class="py-3 pl-11 capitalize">
                  {{ subitem.name }}
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'
import IconChevronDown from '~/assets/icons/ChevronDown.svg'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'

export default {
  components: { Icon, IconChevronDown },

  mixins: [ScreenSizeMixin],

  props: {
    menus: {
      type: Array,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    activeMenu: {
      type: String,
      default: 'home',
    },
    activeSubMenu: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    openMenus: [],
    openMobileMenu: false,
    sectionName: '',
    prevScrollPos: 0,
  }),

  mounted() {
    const activeMenu = this.menus.find((menu) => menu.name === this.activeMenu)
    this.sectionName = activeMenu?.section
    this.getIsMobile()

    window.addEventListener('resize', this.getIsMobile)

    if (activeMenu) {
      this.$store.commit('sidebar/openMenu', {
        service: this.service,
        menu: activeMenu.name,
      })
      this.$store.commit('menu/setActiveMenu', {
        activeMenu,
        activeSubMenu: this.activeSubMenu,
      })
    }
    if (this.isTablet() || this.isMobile()) {
      window.onscroll = () => {
        this.scrollFunction()
      }
    }
  },

  unmounted() {
    window.removeEventListener('resize', this.getIsMobile)
  },

  methods: {
    isOpenSubmenu(menu) {
      return (
        menu.children.length > 0 &&
        menu.open &&
        (!menu.isPrivate || this.$store.getters['auth/authenticated'])
      )
    },
    getIsMobile() {
      const width = window.innerWidth
      this.openMobileMenu = width > 1023
    },

    toggleOpenMobile() {
      this.openMobileMenu = !this.openMobileMenu
    },

    toggleMenu(menuName) {
      this.$store.commit('sidebar/toggleMenu', {
        service: this.service,
        menu: menuName,
      })
    },

    isMenuActive(menuName) {
      return this.activeMenu === menuName.toLowerCase()
    },

    isSubMenuActive(subMenuName) {
      if (this.activeSubMenu?.toLowerCase() === subMenuName?.toLowerCase())
        return true
      const activeSubMenu = this.activeSubMenu.replaceAll('-', ' ')
      return activeSubMenu === subMenuName?.toLowerCase()
    },
    scrollFunction() {
      const currentScrollPos = window.scrollY
      const navbar = document.getElementById('navbar')
      const navbarHeight = navbar.offsetHeight
      const sidebar = document.getElementById('sidebar')
      const sidebarHeight = sidebar.offsetHeight
      const totalHeight = navbarHeight + sidebarHeight

      if (
        this.prevScrollPos < currentScrollPos &&
        currentScrollPos > totalHeight
      ) {
        navbar.style.top = `-${navbarHeight}px`
        sidebar.style.top = `-${totalHeight}px`
      } else if (this.prevScrollPos > currentScrollPos) {
        navbar.style.top = '0'
        sidebar.style.top = `${navbarHeight}px`
      }

      this.prevScrollPos = currentScrollPos
    },
  },
}
</script>

<style scoped>
.submenu {
  transition: max-height 0.3s ease-out;
  overflow: hidden;
}

.fold-animation {
  max-height: 0;
}

.unfold-animation {
  max-height: 300px;
}

#sidebar {
  transition: top 0.3s ease;
}
</style>
