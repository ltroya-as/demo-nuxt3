<template>
  <Transition :name="position">
    <div
      v-if="show"
      class="z-50 flex w-fit cursor-pointer items-center gap-x-4 rounded border-2 px-3.5 py-2.5"
      :class="[border, background, positionClass]"
      @click="$emit('close')"
    >
      <div
        class="flex h-7 w-7 items-center justify-center rounded p-1"
        :class="[iconBackground, iconColor]"
      >
        <CommonIcon :name="typeIcon" class="max-h-5 max-w-5" />
      </div>
      <span class="text-sm font-semibold">{{ message }}</span>
    </div>
  </Transition>
</template>

<script>
const positions = {
  center: 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  'top-right': 'fixed top-4 right-4',
  'top-left': 'fixed top-4 left-4',
  'bottom-left': 'fixed bottom-4 left-4',
  'bottom-right': 'fixed bottom-4 right-4',
  'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2',
  'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2',
}

const types = {
  error: {
    icon: 'icon-exclamation',
    iconColor: 'text-white',
    iconBackground: 'bg-[#d94761]',
    border: 'border-[#d94761]',
    background: 'bg-[#FED2DA]',
  },
  success: {
    icon: 'icon-check',
    iconColor: 'text-white',
    iconBackground: 'bg-[#4bbf7c]',
    border: 'border-[#4bbf7c]',
    background: 'bg-[#f0fff6]',
  },
}

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'bottom-center',
    },
    type: {
      type: String,
      default: 'error',
    },
    message: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      timeOut: null,
    }
  },
  computed: {
    positionClass() {
      return positions[this.position] || ''
    },
    border() {
      return types[this.type]?.border || ''
    },
    background() {
      return types[this.type]?.background || ''
    },
    iconBackground() {
      return types[this.type]?.iconBackground || ''
    },
    iconColor() {
      return types[this.type]?.iconColor || ''
    },
    typeIcon() {
      return this.icon || types[this.type]?.icon
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.timeOut = setTimeout(() => {
          this.$emit('close')
        }, this.duration)
      } else {
        clearTimeout(this.timeOut)
      }
    },
  },
  beforeUnmount() {
    clearTimeout(this.timeOut)
  },
}
</script>

<style scoped>
.top-right-enter-active,
.top-left-enter-active,
.bottom-left-enter-active,
.bottom-right-enter-active,
.top-center-enter-active,
.bottom-center-enter-active {
  transition: all 0.6s;
}

.top-right-leave-active,
.top-left-leave-active,
.bottom-left-leave-active,
.bottom-right-leave-active,
.top-center-leave-active,
.bottom-center-leave-active {
  transition: all 0.6s;
}

.top-left-enter,
.top-left-leave-to {
  left: -100%;
}

.top-right-enter,
.top-right-leave-to {
  right: -100%;
}

.top-center-enter,
.top-center-leave-to {
  top: -100%;
}

.bottom-left-enter,
.bottom-left-leave-to {
  left: -100%;
}

.bottom-right-enter,
.bottom-right-leave-to {
  right: -100%;
}

.bottom-center-enter,
.bottom-center-leave-to {
  bottom: -100%;
}

.center-enter-active,
.center-leave-active {
  transition: opacity 0.3s;
}

.center-enter,
.center-leave-to {
  opacity: 0;
}
</style>
