<template>
  <div
    class="progress-container relative cursor-pointer"
    @click="$emit('click')"
  >
    <svg width="24" height="24">
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="transparent"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="circumference - (progress / 100) * circumference"
        stroke="#FD8B00"
        stroke-width="2"
        transform="rotate(-90 12 12)"
      />
    </svg>
    <IconClose class="text-p-900 absolute left-[3px] top-[3px]" />
  </div>
</template>

<script>
import IconClose from '@/assets/icons/Close.svg'

export default {
  components: { IconClose },

  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
  computed: {
    circumference() {
      return 2 * Math.PI * 11
    },
  },
}
</script>
