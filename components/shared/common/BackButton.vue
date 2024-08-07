<template>
  <NavigationLink
    class="flex cursor-pointer flex-row gap-x-4 font-semibold"
    :class="$attrs.class"
    :url="route"
    :type="element"
  >
    <IconArrowBack v-if="showIconBack" :class="iconClass" />
    <h3>{{ title }}</h3>
  </NavigationLink>
</template>

<script>
import IconArrowBack from '~/assets/icons/icon-arrow-back.svg'
import NavigationLink from '~/components/shared/navigation/Link.vue'

export default {
  components: { IconArrowBack, NavigationLink },
  props: {
    showIconBack: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    route: {
      type: [String, Object],
      required: true,
    },
    element: {
      type: String,
      default: 'nuxt-link',
    },
    iconClass: {
      type: String,
      default: 'w-4',
    },
  },
}
</script>
