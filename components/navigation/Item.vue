<template>
  <div
    class="relative before:absolute before:left-0 before:top-full before:h-[20px] before:w-full before:bg-transparent before:content-['']"
    @mouseenter="openMenu"
    @mouseleave="closeMenu"
  >
    <component
      :is="setLink(menu)"
      class="group relative flex cursor-pointer select-none items-center gap-2 text-sm xl:text-base"
      v-bind="setAdditionalAttributes(menu)"
      @click="handleClick(menu.modal)"
    >
      <span
        class="text-s-900 transition-all duration-300 group-hover:text-opacity-60"
      >
        {{ menu.name }}
      </span>
      <CommonTriangleDown
        v-if="menu.groups && menu.groups.length"
        class="transition duration-300"
        :class="{ 'rotate-180': menu.open }"
      />
      <div
        v-if="isSelectedGroup"
        class="bg-p-500 absolute -bottom-[18px] left-0 right-0 h-1"
      />
    </component>

    <!-- Submenu -->
    <transition
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-500"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute top-10 z-50 -translate-x-1/2 pt-6"
        :class="[isProductsAndServices ? 'left-[55%] xl:left-1/2' : 'left-1/2']"
      >
        <!-- Submenu Arrow -->
        <div
          class="absolute left-1/2 top-4 z-[100] h-4 w-4 -translate-x-1/2 rotate-45 bg-white shadow-[-3px_-5px_10px_-1px_rgba(0,0,0,0.1)]"
        />
        <div class="sm-height:max-h-[60vh]">
          <div
            data-testid="navigation-item-container"
            class="text-s-900 flex max-h-[550px] flex-col flex-wrap gap-x-6 gap-y-6 rounded-xl bg-white p-6 shadow-[3px_3px_10px_rgba(0,0,0,0.25)] xl:max-h-[560px] xl:p-8"
            :class="{
              'xl:min-w-content-container min-w-[980px]': isProductsAndServices,
            }"
          >
            <div
              v-for="group in menu.groups"
              :key="`${menu.name}_${group.name}`"
              class="min-w-[215px]"
              :class="group.extraClass"
            >
              <div class="block">
                <div class="w-full">
                  <h4
                    class="border-p-500 font-montserrat text-s-900 mb-3 border-b-[3px] pb-3 text-sm font-semibold uppercase xl:text-base xl:leading-5"
                  >
                    {{ group.name }}
                  </h4>

                  <div
                    class="flex flex-col gap-y-1.5"
                    :class="{ 'flex !flex-row gap-x-3': group.hasSubMenu }"
                  >
                    <div
                      v-for="child in group.children"
                      :key="`${group.name}_${child.name}`"
                    >
                      <!-- Sub Menu -->
                      <ItemSubMenu
                        v-if="child.subMenu?.length"
                        :title="child.name"
                        :sub-menu="child.subMenu"
                        :group-href="'/market'"
                      />
                      <!-- Modal -->
                      <div
                        v-else-if="child.modal && checkIfCallback(child)"
                        class="mb-2 cursor-pointer font-normal hover:underline"
                        @click="
                          handleClick(child.modal, child['initial-fields'])
                        "
                      >
                        {{ child.name }}
                      </div>

                      <!-- Link -->
                      <div
                        v-else-if="!child.modal && checkIfCallback(child)"
                        class="flex gap-x-1.5"
                      >
                        <Icon
                          v-if="child.icon === 'source'"
                          name="sidebar/Terminal"
                          class="h-3.5 w-4"
                        />
                        <component
                          :is="setLink(child)"
                          v-bind="setAdditionalAttributes(child, group.href)"
                          :class="{
                            'bg-s-200': isSelected(child.href, group.href),
                          }"
                          class="font-montserrat hover:bg-s-200 flex items-center justify-between rounded-lg text-sm font-normal xl:text-base xl:leading-5"
                        >
                          <span class="max-w-[200px]">
                            {{ child.name }}
                          </span>
                          <span
                            v-if="hasAnyActiveMembership(child.memberships)"
                            class="h-4 w-4"
                          >
                            <Icon
                              name="check-subscribe"
                              class="text-p-500 h-full w-full"
                            />
                          </span>
                        </component>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'
import CommonTriangleDown from '~/components/common/TriangleDown.vue'
import ItemSubMenu from '~/components/navigation/ItemSubMenu.vue'
import { isTouchDevice } from '~/utils/devices'

export default {
  components: {
    Icon,
    CommonTriangleDown,
    ItemSubMenu,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },

    isSelectedGroup: {
      type: Boolean,
      default: false,
    },

    onClick: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      menu: this.data,
      isProductsAndServices: this.data.name === 'Products & Services',
    }
  },

  computed: {
    isOpen() {
      return this.menu?.groups?.length && this.menu?.open
    },
  },

  created() {
    if (process.client) {
      window.addEventListener(`click`, this.closePopup)
    }
  },

  beforeUnmount() {
    if (process.client) {
      window.removeEventListener(`click`, this.closePopup)
    }
  },

  methods: {
    isSelected(menuPath, base = '') {
      const { fullPath } = this.$route
      const childPath = menuPath.replace('/', '')

      if (childPath === '') return fullPath === base

      return (
        fullPath.includes(base) &&
        fullPath?.split('/')?.some((_item) => _item === childPath)
      )
    },

    checkIfCallback(child) {
      if (!child.if_callback) {
        return true
      }

      return child.if_callback()
    },

    isExternalLink(element) {
      return element?.href?.startsWith('https')
    },

    setLink(element) {
      if (this.isExternalLink(element)) {
        return 'a'
      }

      if (this.hasLink(element)) {
        return this.hasTarget(element) && typeof element.target === 'string'
          ? 'a'
          : resolveComponent('NuxtLink')
      }

      return 'div'
    },

    hasLink(element) {
      return !!element.href
    },

    hasTarget(element) {
      return 'target' in element
    },

    setLinkClass(element) {
      return element.href && 'hover:underline'
    },

    setAdditionalAttributes(element, base = '') {
      if (!this.hasLink(element)) return {}

      const OVERVIEW = 'Overview'
      let url = `${base}${element.href}`
      if (element.firstItem && element.firstItem !== OVERVIEW) {
        url += `/${element.firstItem}`
      }

      return this.isExternalLink(element)
        ? {
            href: element.href,
            target: element.target ? element.target : '_self',
          }
        : { to: url }
    },

    handleClick(modal, initialFields) {
      if (!modal) return this.toggle()

      if (initialFields) {
        this.$store.commit('modal/setInitialFields', initialFields)
      }

      this.$modal.open(modal)
    },

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

    /**
     * Close the menu if the user clicks outside the menu
     */
    closePopup(e) {
      const { $el } = this
      const { target } = e

      if (!$el.contains(target)) {
        this.menu.open = false
      }
    },

    hasAnyActiveMembership(memberships) {
      if (memberships) {
        return memberships.find(
          (membership) => this.$store.state.memberships[membership],
        )
      }
    },
  },
}
</script>
