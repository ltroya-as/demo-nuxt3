<template>
  <div
    class="mb-4 mt-[18px] flex-row flex-wrap justify-end gap-x-40 gap-y-[7px] xl:mb-0 xl:mt-0 xl:gap-y-0"
  >
    <div class="flex max-h-[34px] flex-grow items-center">
      <NuxtLink
        to="/"
        class="width-logo inline-block max-h-[34px] w-full max-w-[235px] shrink xl:hidden"
      >
        <IconBenchmarkLogo class="width-logo h-[34px] w-full max-w-[235px]" />
      </NuxtLink>
    </div>
    <div
      class="text-p-500 relative flex min-h-[34px] w-fit items-center gap-x-3 font-bold xl:gap-x-4"
    >
      <NavigationItem
        v-for="(menu, index) in menuList"
        :key="getKey(menu)"
        class="text-s-900 group"
        :data="menu"
        :is-selected-group="activeMenuIndex === index"
        data-testid="top-navigation-item"
      />

      <a
        :href="sourceLink"
        target="_blank"
        class="flex items-baseline gap-1 pb-1 text-black"
      >
        <SourceIcon class="h-[21px] w-6" />
        <span>Source</span>
      </a>

      <div v-if="!jwtToken">
        <CommonButton
          extra-classes="max-h-[34px] !w-[103px]"
          data-testid="signInDesktopBtn"
          variant="primary"
          @click="$modal.open('signIn')"
        >
          {{ signInText }}
        </CommonButton>
      </div>
      <div v-else>
        <NavigationDesktopAccountMenu
          class="w-[103px]"
          :sub-menu="mobileAccountMenu"
        />
      </div>
    </div>
  </div>
</template>
<script>
import IconBenchmarkLogo from '~/assets/icons/BenchmarkLogoBlack.svg'
import NavigationItem from '~/components/navigation/Item.vue'
import NavigationDesktopAccountMenu from '~/components/navigation/DesktopAccountMenu.vue'
import CommonButton from '~/components/common/Button.vue'
import { SIGN_IN, SOURCE } from '~/constants/services/constants'
import SourceIcon from '~/assets/icons/sidebar/Terminal.svg'

export default {
  components: {
    NavigationItem,
    NavigationDesktopAccountMenu,
    IconBenchmarkLogo,
    CommonButton,
    SourceIcon,
  },

  props: {
    jwtToken: { type: String, default: '' },
    menuList: {
      type: Array,
      default: () => [],
    },
    mobileAccountMenu: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      signInText: SIGN_IN,
      sourceLink: SOURCE.slug,
    }
  },
  computed: {
    activeMenuIndex() {
      const { fullPath } = this.$route

      if (fullPath === '/') return

      const index = this.menuList.findIndex((item) => {
        if (item.groups.length === 0) return item.href === fullPath

        const paths = fullPath.split('/')

        return item.groups
          .filter(
            (group) =>
              group.href && paths.includes(group.href.replace('/', '')),
          )
          .map((group) => group.children)
          .flat()
          .some((subItem) => {
            const href = subItem.href.replace('/', '')
            return paths.includes(href)
          })
      })

      if (index >= 0) this.getActiveSubItem(this.menuList[index])
      return index
    },
  },

  methods: {
    getActiveSubItem(menu) {
      this.$store.commit('breadcrumb/clearBreadcrumb')
      this.$store.commit('breadcrumb/addItemBreadcrumb', menu.name)

      if (menu.groups.length === 0) return

      const activeSubMenu = this.$store.getters['menu/getActiveSubMenu']
      const activeMenu = this.$store.state.menu.activeMenu

      if (activeMenu !== null) {
        this.$store.commit('breadcrumb/addItemBreadcrumb', activeMenu.label)
      }

      if (!activeSubMenu) return

      this.$store.commit('breadcrumb/addItemBreadcrumb', activeSubMenu)
    },
    getKey(menu) {
      if (!menu.groups.length) return menu.name

      const childrenLength = menu.groups.flatMap(
        (group) => group.children,
      ).length

      return `${menu.name}_${childrenLength}`
    },
  },
}
</script>
