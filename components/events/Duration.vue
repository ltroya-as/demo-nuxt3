<template>
  <div class="flex items-center">
    <div class="mr-2">{{ time }}</div>
    <IconClock class="h-6 w-6 object-contain" :class="clockColorClass" />
  </div>
</template>

<script>
import IconClock from '~/assets/icons/Clock.svg'
export default {
  name: 'Duration',
  components: {
    IconClock,
  },
  props: {
    time: {
      type: String,
      required: true,
    },
    clockColor: {
      type: String,
      default: 'white',
    },
  },
  computed: {
    clockColorClass() {
      return `text-${this.clockColor}`
    },
  },
}
</script>
