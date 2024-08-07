<template>
  <nuxt-link
    v-if="nuxt"
    :to="to"
    class="rounded-full px-16 py-4 text-center text-lg font-semibold uppercase hover:underline focus:outline-none"
    :class="[bgColor, textColor]"
  >
    <slot></slot>
  </nuxt-link>
  <div
    v-else
    :class="[bgColor, textColor]"
    class="rounded-full text-center text-lg font-semibold uppercase hover:underline focus:outline-none"
  >
    <a :href="to" target="__blank" class="inline-block w-full">
      <div class="px-8 py-4">
        <slot></slot>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    nuxt: {
      type: Boolean,
      required: true,
    },
    to: {
      type: String,
      default: null,
    },
    bgColorClass: {
      type: String,
      default: null,
    },
    textColorClass: {
      type: String,
      default: null,
    },
  },
  computed: {
    bgColor() {
      return this.bgColorClass ? this.bgColorClass : 'bg-bme22-red'
    },
    textColor() {
      return this.textColorClass ? this.textColorClass : 'text-white'
    },
  },
}
</script>
