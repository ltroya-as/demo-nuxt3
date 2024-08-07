<template>
  <div class="border-grey-600 flex flex-col border-b bg-white px-2 py-2.5">
    <button
      class="text-grey-900 flex select-none items-center gap-x-2"
      @click="toggleExpanded"
    >
      <ChevronDownIcon
        class="h-6 w-6 transition-transform duration-300 ease-in-out"
        :class="{ 'rotate-180': isExpanded }"
      />
      <span class="text-sm font-semibold">{{ title }}</span>
    </button>
    <div
      class="duration-300 ease-in-out"
      :class="isExpanded ? 'mt-3 max-h-[400px]' : 'max-h-0 overflow-hidden'"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ChevronDownIcon from '~/assets/icons/ChevronDown.svg'

export default {
  components: {
    ChevronDownIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    }
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>
