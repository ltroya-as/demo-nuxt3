<template>
  <div>
    <component
      :is="tag"
      class="text-center font-bold uppercase"
      :class="[headingClasses, { 'md:text-left': left }]"
    >
      {{ title }}
    </component>
    <div
      class="border-p-500 mx-auto mt-1 w-32 border-b-4 md:w-56"
      :class="{ 'md:mx-0': left }"
    />
  </div>
</template>

<script>
const HEADING_CLASSES = {
  h1: 'text-2xl md:text-5xl',
  h2: 'text-xl md:text-4xl',
}

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'h2',
    },
    left: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    headingClasses() {
      return HEADING_CLASSES[this.tag]
    },
  },
}
</script>
