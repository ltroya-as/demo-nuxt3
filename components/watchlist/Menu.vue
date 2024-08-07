<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="menu absolute right-0 top-6 z-10 flex min-w-[175px] flex-col overflow-hidden rounded-b bg-white text-black/90 xl:top-full"
    >
      <button
        v-for="action in actions"
        :key="action.label"
        class="hover:bg-p-100 flex items-center gap-x-2 border-b border-b-black/40 px-2 py-3 last:border-none"
        @click="emitEvent(action.action)"
      >
        <component :is="action.icon" class="h-3.5 w-3.5" />
        <span class="text-sm leading-5">{{ action.label }}</span>
      </button>
    </div>
  </transition>
</template>

<script>
import DownloadReportIcon from '~/assets/icons/DownloadReportIcon.svg'
import CopyIcon from '~/assets/icons/copy-icon.svg'
import IconEdit from '~/assets/icons/icon-edit.svg'
import IconRemove from '~/assets/icons/icon-remove.svg'

const actions = [
  {
    label: 'Edit',
    icon: IconEdit,
    action: 'edit',
  },
  {
    label: 'Delete',
    icon: IconRemove,
    action: 'delete',
  },
]

export default {
  components: {
    DownloadReportIcon,
    CopyIcon,
    IconEdit,
    IconRemove,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      actions,
    }
  },
  methods: {
    emitEvent(action) {
      this.$emit('close')
      this.$emit(action)
    },
  },
}
</script>

<style scoped>
.menu {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 1px 10px 0 rgb(0 0 0 / 12%),
    0 4px 5px 0 rgb(0 0 0 / 14%);
}
</style>
