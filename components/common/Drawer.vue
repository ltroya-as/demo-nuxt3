<template>
  <div>
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isOpen"
        class="fixed inset-0 z-[60] transition-opacity"
        @keydown.esc="closeDrawer"
      >
        <div
          class="absolute inset-0 bg-black opacity-50"
          data-testid="drawer-overlay"
          @click="closeDrawer"
        ></div>
      </div>
    </transition>
    <aside
      class="fixed top-0 z-[70] h-full min-w-64 transform overflow-auto bg-white transition-all duration-300 ease-in-out"
      :class="[isOpen ? 'translate-x-0' : 'translate-x-full', drawerPosition]"
    >
      <slot></slot>
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'right',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    drawerPosition() {
      return this.position === 'right' ? 'right-0' : 'left-0'
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty('overflow', 'hidden')
          else document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  methods: {
    closeDrawer() {
      this.$emit('close', false)
    },
  },
}
</script>
