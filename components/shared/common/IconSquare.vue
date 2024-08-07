<template>
  <div
    class="flex h-full max-h-[88px] min-h-[88px] w-full min-w-[88px] max-w-[88px] items-center justify-center rounded-[32px] md:rounded-xl"
    :class="[backgroundColor, $attrs.class]"
  >
    <Icon :name="icon" class="h-[37px] w-[37px]" />
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    iconAlt: {
      type: String,
      default: 'icon',
    },
    backgroundColor: {
      type: String,
      default: 'bg-p-100',
    },
  },
}
</script>
