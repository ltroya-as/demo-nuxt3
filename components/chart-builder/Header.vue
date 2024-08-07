<template>
  <div class="header relative flex flex-col gap-y-2 p-6">
    <div class="flex items-center justify-between gap-2">
      <h1 class="font-semibold leading-6">Build price chart</h1>
      <button data-testid="close-icon">
        <CloseIcon class="h-6 w-6" @click="$emit('close')" />
      </button>
    </div>
    <CommonProgressBar
      :progress="progress"
      class="absolute bottom-0 left-0"
      :background-class="statusClasses.background"
      :color-class="statusClasses.color"
    />
  </div>
</template>

<script>
import CloseIcon from '~/assets/icons/Close.svg'
export default {
  components: {
    CloseIcon,
  },
  props: {
    dataSeries: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    hasError() {
      return this.dataSeries > 10
    },
    statusClasses() {
      if (!this.hasError) {
        return {
          background: 'bg-green-light/25',
          color: 'bg-green-light',
        }
      }
      return {
        background: 'bg-warning/25',
        color: 'bg-warning',
      }
    },
  },
}
</script>

<style scoped>
.header {
  box-shadow: 0 2px 20px 0 rgb(0 0 0 / 10%);
}
</style>
