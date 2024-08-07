<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-x-2">
      <span :data-testid="name">{{ name }}</span>
      <IconHelpSquare
        v-if="tooltip"
        ref="message"
        class="hover:text-p-500 h-6 w-6 cursor-pointer transition-colors"
      />
    </div>
    <IconCheck class="h-6 w-6" />
  </div>
</template>

<script>
import tippy from 'tippy.js'
import IconCheck from '~/assets/icons/IconCheck.svg'
import IconHelpSquare from '~/assets/icons/help-square.svg'

export default {
  components: {
    IconCheck,
    IconHelpSquare,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
  },
  mounted() {
    if (!this.tooltip) return
    if (!this.$refs.message) return
    tippy(this.$refs.message.$el, {
      content: this.tooltip,
      allowHTML: true,
      maxWidth: 318,
      arrow: true,
      placement: 'bottom',
    })
  },
}
</script>
