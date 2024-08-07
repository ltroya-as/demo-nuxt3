<template>
  <transition name="translate-x">
    <div
      data-testid="mobile-menu"
      class="mobile-menu fixed left-0 top-[46px] z-[998] flex w-full flex-col items-center bg-white md:top-20 lg:hidden"
    >
      <div
        v-show="menuTitle !== initialMenuTitle"
        class="bg-s-100"
        @click="backPreviousMenu"
      >
        <button
          aria-label="Back Mobile Button"
          class="absolute left-0 top-3 ml-5 p-1"
        >
          <IconLeftAngle class="h-4 w-4" />
        </button>

        <div
          class="border-s-600 text-s-900 w-screen border-b border-solid py-3 pl-12 text-lg font-semibold"
        >
          {{ menuTitle }}
        </div>
      </div>

      <section
        class="w-screen overflow-y-auto pb-2"
        :class="[menuTitle !== initialMenuTitle ? 'bg-white' : 'bg-s-100']"
      >
        <div
          v-for="menu in menuList"
          :key="menu.name"
          class="border-s-400 mx-5 border-b text-base font-normal"
          :class="menu.menuStyle"
        >
          <div v-if="checkIfCallback(menu)">
            <div
              class="flex cursor-pointer select-none py-3"
              @click="handleClick(menu)"
            >
              <div
                class="flex flex-grow items-center justify-between font-normal"
              >
                <div
                  class="flex flex-row items-center justify-center gap-2"
                  data-testid="menu-mobile-item"
                >
                  <component
                    :is="menu.icon"
                    v-if="menu.icon"
                    class="h-5 w-auto"
                  />
                  {{ menu.name }}
                  <IconCheckSubscribe
                    v-if="hasAnyActiveMembership(menu.memberships)"
                    class="text-p-500 h-3 w-3"
                  />
                </div>
                <IconRightAngle v-if="hasAnyChild(menu)" class="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        <div v-show="menuTitle === initialMenuTitle" class="text-lg">
          <div class="flex w-screen flex-col">
            <template v-if="initialMenuTitle !== 'Account'">
              <div
                v-for="link in quickLinks"
                :key="link.text"
                class="border-s-400 mx-5 flex cursor-pointer select-none border-b py-3 text-base font-normal last:border-none"
                @click="quickLinksAction(link.url)"
              >
                {{ link.text }}
              </div>
            </template>
            <client-only>
              <div v-if="!jwtToken">
                <div
                  class="border-s-400 mx-5 flex cursor-pointer select-none border-b py-3 text-base font-normal"
                  @click="handleClick({ modal: 'signIn' })"
                >
                  {{ signInText }}
                </div>
              </div>
              <div v-else>
                <div
                  class="border-s-400 mx-5 flex cursor-pointer select-none border-b py-3 text-base font-normal"
                  @click="logout"
                >
                  Logout
                </div>
              </div>
            </client-only>
          </div>
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
import IconRightAngle from '~/assets/icons/angle-right.svg'
import IconLeftAngle from '~/assets/icons/angle-left.svg'
import IconCheckSubscribe from '~/assets/icons/check-subscribe.svg'
import SourceIcon from '~/assets/icons/sidebar/Terminal.svg'
import { SIGN_IN } from '~/constants/services/constants'

export default {
  components: {
    IconRightAngle,
    IconLeftAngle,
    IconCheckSubscribe,
    SourceIcon,
  },

  props: {
    data: {
      type: Array,
      default: () => [],
    },
    initialMenuTitle: {
      type: String,
      default: 'Menu',
    },
    modalName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      menuList: this.data,
      menuTitle: this.initialMenuTitle,
      quickLinks: [],
      signInText: SIGN_IN,
    }
  },

  computed: {
    jwtToken() {
      return this.$store.state.auth.jwtToken
    },

    groups() {
      return this.data.flatMap((e) => e.groups)
    },
  },

  methods: {
    setLinkClass(element) {
      return element.href && 'hover:underline'
    },

    checkIfCallback(child) {
      if (!child.if_callback) {
        return true
      }

      return child.if_callback()
    },

    handleClick(item) {
      this.menuTitle = item.name
      this.previousMenuList = this.menuList
      this.menuList = item?.children || item?.groups

      if (item?.modal) {
        this.$modal.open(item.modal)
        this.closeMobileMenu()
        return
      }
      if (!this.menuList?.length) {
        if (item.target) {
          window.open(item.href)
        } else if (!item?.parent && item.href?.startsWith('https')) {
          window.location.assign(item.href)
        } else {
          const route = item?.parent ? `${item.parent}${item.href}` : item.href
          this.$router.push(route)
        }
        this.closeMobileMenu()
      }
    },

    closeMobileMenu() {
      this.$modal.close(this.modalName)
      this.resetMenu()
    },

    resetMenu() {
      this.menuTitle = this.initialMenuTitle
      this.menuList = this.data
    },

    backPreviousMenu() {
      const menuInGroupsLevel = this.groups.find(
        (e) => e.name === this.menuTitle,
      )

      let previousMenu = this.data
      let parentMenu = this.initialMenuTitle
      if (menuInGroupsLevel) {
        for (const item of this.data) {
          if (item.groups) {
            const group = item.groups.find(
              (g) => g.name === menuInGroupsLevel.name && !g.initial,
            )
            if (group) {
              parentMenu = item.name
              previousMenu = item.groups
              break
            }
          }
        }

        if (previousMenu === this.data) {
          previousMenu = this.previousMenuList
        }
      }

      this.menuTitle = parentMenu
      this.menuList = previousMenu
    },

    hasAnyActiveMembership(memberships) {
      if (memberships) {
        return memberships.find(
          (membership) => this.$store.state.memberships[membership],
        )
      }
    },

    hasAnyChild(menu) {
      return menu?.children?.length || menu?.groups?.length
    },

    async logout() {
      await this.$bmAuth.logout()
      this.closeMobileMenu()
      await this.$router.push('/')
    },

    quickLinksAction(url) {
      this.closeMobileMenu()
      this.$router.push(url)
    },
  },
}
</script>

<style scoped>
.mobile-menu {
  height: calc(100dvh - 48px);
}

@media (min-width: 768px) {
  .mobile-menu {
    height: calc(100dvh - 80px);
  }
}

.translate-x-enter {
  transform: translateX(-100%);
}

.translate-x-enter-active,
.translate-x-leave-active {
  transition: 0.5s ease;
}

.translate-x-leave-to {
  transform: translateX(-100%);
}
</style>
