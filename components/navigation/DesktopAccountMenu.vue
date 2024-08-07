<template>
  <div
    class="relative before:absolute before:left-0 before:top-full before:h-6 before:w-full before:bg-transparent before:content-['']"
    data-testid="accountDesktopMenu"
    @mouseenter="openMenu"
    @mouseleave="closeMenu"
  >
    <div
      class="text-s-900 flex cursor-pointer select-none items-center text-base"
      @click="toggle"
    >
      <span>Account</span>
      <IconUser class="text-s-900 ml-2 h-6 w-6" />
    </div>

    <!-- Submenu -->
    <transition
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-500"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menu.groups && menu.groups.length && menu.open"
        data-testid="navigation-item-container"
        class="dropdown-container text-s-900 absolute left-1/3 z-50 mt-4 min-w-[277px] -translate-x-1/2 rounded-lg bg-white p-8 shadow-[3px_3px_10px_rgba(0,0,0,0.25)] 2xl:left-1/2"
      >
        <div
          class="absolute -top-2 left-1/2 z-[100] h-4 w-4 -translate-x-1/2 rotate-45 bg-white shadow-[-3px_-5px_10px_-1px_rgba(0,0,0,0.1)]"
        />
        <div v-for="group in menu.groups" :key="`${menu.name}_${group.name}`">
          <div class="block w-max">
            <div class="inline-block w-full">
              <h4
                class="border-p-500 font-montserrat text-s-900 mb-3 border-b-[3px] pb-3 text-base font-semibold uppercase leading-5"
              >
                {{ group.name }}
              </h4>

              <div
                v-for="child in group.children"
                :key="`${group.name}_${child.name}`"
              >
                <a
                  class="font-montserrat hover:bg-s-200 mb-1.5 flex cursor-pointer items-start justify-between rounded-lg px-1 text-base font-normal leading-5"
                  :class="child.extraClasses"
                  :data-testid="child.dataTestId"
                  @click.prevent="handleClick(child)"
                >
                  {{ child.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import IconUser from '@/assets/icons/User.svg'
import { isTouchDevice } from '~/utils/devices'

export default {
  components: {
    IconUser,
  },

  props: {
    subMenu: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      menu: {
        name: 'Account',
        open: false,
        groups: [
          {
            name: 'Your Account',
            parent: 'Account',
            children: [
              ...this.subMenu,
              {
                name: 'Logout',
                href: '',
                extraClasses: 'mt-10',
                onClick: 'logout',
                dataTestId: 'logOutDesktopBtn',
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    toggle() {
      this.menu.open = !this.menu.open
    },
    openMenu() {
      // In touch devices, we return early to avoid conflict with the logic implemented in the "hover" state
      if (isTouchDevice()) return
      this.menu.open = true
    },
    closeMenu() {
      this.menu.open = false
    },

    async logout() {
      await this.$bmAuth.logout()
      this.$router.push('/')
    },

    handleClick({ href, onClick }) {
      onClick ? this[onClick]() : this.$router.push(href)
    },
  },
}
</script>
