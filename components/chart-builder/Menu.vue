<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="menu absolute right-0 top-full z-50 flex min-w-[175px] flex-col overflow-hidden rounded-b bg-white text-black/90"
    >
      <button
        class="hover:bg-p-100 flex items-center gap-x-2 border-b border-b-black/40 px-2 py-3"
        @click="onEdit"
      >
        <IconEdit class="h-3.5 w-3.5" />
        <span class="text-sm leading-5">Edit</span>
      </button>
      <button
        class="hover:bg-p-100 flex items-center gap-x-2 px-2 py-3"
        @click="onRemove"
      >
        <IconRemove class="h-3.5 w-3.5" />
        <span class="text-sm leading-5">Delete</span>
      </button>
    </div>
  </transition>
</template>

<script>
import IconRemove from '~/assets/icons/icon-remove.svg'
import IconEdit from '~/assets/icons/icon-edit.svg'

export default {
  components: {
    IconRemove,
    IconEdit,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onEdit() {
      this.$emit('close')
      this.$emit('edit')
    },
    onRemove() {
      this.$emit('close')
      this.$emit('remove')
    },
  },
}
</script>

<style scoped>
.menu {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 1px 10px 0 rgb(0 0 0 / 12%),
    0 4px 5px 0 rgb(0 0 0 / 14%);
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
