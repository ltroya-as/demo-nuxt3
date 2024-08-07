<template>
  <component
    :is="componentByType"
    :class="$attrs.class"
    v-bind="propsByType"
    :target="target"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'nuxt-link',
    },
    url: {
      type: [String, Object],
      required: true,
    },
    target: {
      type: String,
      default: '_parent',
    },
  },
  computed: {
    componentByType() {
      return this.type === 'nuxt-link' ? resolveComponent('NuxtLink') : 'a'
    },
    propsByType() {
      return this.type === 'nuxt-link' ? { to: this.url } : { href: this.url }
    },
  },
  mounted() {},
}
</script>
