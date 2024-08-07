<template>
  <div class="mb-4 last:mb-0 sm:mb-10">
    <span class="flex items-center justify-between">
      <h3
        class="text-lg font-semibold leading-5"
        :class="{ 'text-black/60': isCompleted && isHidden }"
      >
        {{ title }}
      </h3>
      <button v-if="isCompleted" @click="$emit('toggleHidden')">
        <IconChevronDown
          class="duration-300"
          :class="{ 'rotate-180': !isHidden }"
        />
      </button>
    </span>
    <Collapse :collapse="isHidden">
      <div class="mb-6 mt-2.5 flex justify-between gap-2">
        <div class="text-sm leading-5">
          {{ subtitle }}
        </div>
        <slot name="actions" />
      </div>
      <slot />
    </Collapse>

    <div class="h-[1px] w-full bg-black" />
  </div>
</template>

<script>
import Collapse from '~/components/common/Collapse.vue'
import IconChevronDown from '~/assets/icons/icon-chevron-down.svg'

export default {
  components: {
    Collapse,
    IconChevronDown,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
