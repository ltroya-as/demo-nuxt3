<template>
  <button
    type="button"
    class="relative flex w-fit flex-row items-center justify-center gap-x-3 overflow-hidden rounded-md px-6 py-2 text-base font-semibold leading-5"
    :class="[baseClasses, $attrs.class]"
    @click="handleClickButtonCommon"
  >
    <slot></slot>
    <span>{{ text }}</span>
  </button>
</template>

<script>
import ButtonClassesAndEvent from '~/mixins/ButtonClassesAndEvent'

export default {
  mixins: [ButtonClassesAndEvent],
}
</script>
