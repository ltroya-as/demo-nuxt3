<template>
  <div>
    <div
      v-if="loading"
      class="flex h-full min-h-[630px] w-full items-center justify-center"
    >
      <Loader />
    </div>
    <div v-else>
      <div
        v-if="isFullScreen"
        class="mine-overlay"
        @click="closeFullScreenMode"
      />
      <div class="relative" :class="{ 'mine-fixed-container': isFullScreen }">
        <div class="mb-8 flex flex-row items-center justify-between">
          <h3 class="text-lg font-semibold"> Lithium Production by Country </h3>
          <IconMaximize
            v-if="!isFullScreen"
            class="h-4 w-4 hover:cursor-pointer"
            @click="toggleFullscreenMode"
          />
          <IconClose
            v-else
            class="h-4 w-4 hover:cursor-pointer"
            @click="toggleFullscreenMode"
          />
        </div>
        <PortalSupplyMap :mines="mines" :resize="isFullScreen" />
      </div>
    </div>
  </div>
</template>

<script>
import PortalSupplyMap from '~/components/price-assessments/PortalSupplyMap.vue'
import IconMaximize from '~/assets/icons/maximize.svg'
import IconClose from '~/assets/icons/Close.svg'
import Loader from '~/components/TheLoader.vue'

export default {
  components: {
    PortalSupplyMap,
    Loader,
    IconMaximize,
    IconClose,
  },
  props: {
    mines: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isFullScreen: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('keyup', (event) => {
        if (this.isFullScreen && event.key === 'Escape')
          this.closeFullScreenMode()
      })
    })
  },
  beforeUnmount() {
    window.removeEventListener('keyup', (event) => {
      if (this.isFullScreen && event.key === 'Escape')
        this.closeFullScreenMode()
    })
  },
  methods: {
    toggleFullscreenMode() {
      this.isFullScreen = !this.isFullScreen
    },
    closeFullScreenMode() {
      this.isFullScreen = false
    },
  },
}
</script>

<style scoped>
.mine-fixed-container {
  transition: all 250ms;
  max-width: 90vw;
  max-height: 90vh;
  height: fit-content;
  width: 90vw;
  z-index: 90;
  overflow-y: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
}

.mine-overlay {
  content: '';
  z-index: 60;
  position: fixed;
  background-color: rgba(0 0 0 / 25%);
  inset: 0;
}
</style>
