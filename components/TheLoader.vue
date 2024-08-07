<template>
  <div
    class="flex h-full flex-col items-center justify-center"
    :class="[$attrs.class]"
  >
    <Icon name="Spinner" :class="['text-p-500 animate-spin', sizeClasses]" />
  </div>
</template>

<script>
import Icon from '@/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },

  props: {
    size: {
      type: String,
      default: () => 'large',
    },
  },

  computed: {
    sizeClasses() {
      if (this.size === 'small') {
        return 'w-8 h-8'
      }
      return 'w-16 h-16'
    },
  },
}
</script>
