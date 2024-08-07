<template>
  <div
    ref="collapse"
    class="h-full transition-all duration-300 ease-in-out"
    :class="{
      'mb-4 sm:mb-10': collapse,
      'mb-0 pb-4 sm:pb-10': !collapse,
    }"
  >
    <div ref="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      height: '0px',
      ro: null,
    }
  },
  watch: {
    collapse: {
      handler(newCollapse) {
        this.$nextTick(() => {
          if (!this.$slots.default) return

          if (!newCollapse) return this.show()
          this.hide()
        })
      },
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$refs.content) return

      this.ro = new ResizeObserver(this.onResize)
      this.ro.observe(this.$refs.content)
    })
  },
  beforeUnmount() {
    this.ro.unobserve(this.$refs.content)
  },
  methods: {
    onResize() {
      if (!this.$refs.collapse || !this.$refs.content) return

      const height = this.$refs.content.scrollHeight + 60

      if (this.collapse) {
        this.$refs.collapse.style.maxHeight = '0px'
        return
      }

      this.$refs.collapse.style.maxHeight = height + 'px'
    },
    show() {
      this.onResize()
      setTimeout(() => {
        this.$refs.collapse.style.overflow = 'visible'
      }, 50)
    },
    hide() {
      this.$refs.collapse.style.overflow = 'hidden'
      setTimeout(() => {
        this.onResize()
      }, 50)
    },
  },
}
</script>
