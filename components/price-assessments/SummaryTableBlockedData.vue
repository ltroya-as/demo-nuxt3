<template>
  <div class="flex items-center justify-end gap-x-2">
    <div
      class="p-0.5"
      :class="{
        'group-hover:bg-p-500 group-hover:shadow-blockedIcon cursor-pointer transition-all duration-200 group-hover:rounded-sm':
          isClickable,
      }"
    >
      <slot>
        <CloseLock class="h-6 w-6 shrink-0" @click="openContactForm" />
      </slot>
    </div>
    <div class="flex shrink-0 gap-x-0.5">
      <div class="bg-s-700 h-3 w-3 rounded-full" />
      <div class="bg-s-700 h-3 w-3 rounded-full" />
      <div class="bg-s-700 h-3 w-3 rounded-full" />
    </div>
  </div>
</template>

<script>
import { getServices } from '~/constants/services'
import CloseLock from '~/assets/icons/close-lock.svg'

export default {
  components: {
    CloseLock,
  },

  props: {
    initialFields: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    isClickable() {
      return this.initialFields.length > 0
    },
  },

  methods: {
    openContactForm() {
      if (!this.isClickable) return
      const initialValues = getServices([...this.initialFields])
      this.$store.commit('modal/setInitialFields', initialValues)
      this.$modal.open('contact')
    },
  },
}
</script>

<style scoped>
.lock-icon {
  box-shadow: 0 3px 5px 0 rgb(0 0 0 / 20%), 0 1px 18px 0 rgb(0 0 0 / 12%),
    0 6px 10px 0 rgb(0 0 0 / 14%);
}
</style>
