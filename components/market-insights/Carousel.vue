<template>
  <div>
    <template v-for="(item, index) in items">
      <div
        v-if="index === activeItem"
        :key="item?.slug"
        class="relative flex h-full flex-col justify-between overflow-hidden rounded-lg"
      >
        <div
          class="relative flex flex-1 flex-col justify-between bg-black/60 p-6 text-white"
          :class="itemClass"
        >
          <div
            data-testid="carousel-cover"
            class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat mix-blend-multiply filter"
            :style="{ backgroundImage: `url('${item?.coverUrl}')` }"
          >
          </div>
          <div class="z-10">
            <slot name="content" :item="item" />
          </div>
          <div class="z-10 flex items-end justify-between">
            <slot name="action" :item="item" />
            <div data-testid="carousel-dots" class="flex gap-x-4">
              <button
                v-for="(_, i) in items"
                :key="i"
                :data-testid="`carousel-dot-${i}`"
                class="h-3 w-3 cursor-pointer rounded-full bg-white"
                :class="{ '!bg-p-500': i === activeItem }"
                @click="changeActiveItem(i)"
              />
            </div>
          </div>
        </div>

        <ProgressBar
          v-if="showProgressBar"
          :duration="`${duration}s`"
          class="z-10"
        />
      </div>
    </template>
  </div>
</template>

<script>
import ProgressBar from '~/components/portals/ProgressBar.vue'

export default {
  components: { ProgressBar },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    withProgressBar: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 10,
    },
    itemClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      interval: null,
      activeItem: 0,
    }
  },
  computed: {
    showProgressBar() {
      return this.items.length >= 2 && this.withProgressBar
    },
  },
  mounted() {
    this.initInterval()
  },
  beforeUnmount() {
    this.clearInterval()
  },
  methods: {
    changeActiveItem(index) {
      this.activeItem = index
      this.clearInterval()
      this.initInterval()
    },
    clearInterval() {
      if (!this.interval) return
      clearInterval(this.interval)
    },
    initInterval() {
      if (!this.showProgressBar) return
      const durationInMs = this.duration * 1000
      this.interval = setInterval(() => {
        this.activeItem = (this.activeItem + 1) % this.items.length
      }, durationInMs)
    },
  },
}
</script>

<style scoped>
.fade-in {
  animation: fade-in 0.5s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
}
</style>
