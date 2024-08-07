<template>
  <div
    class="flex w-full flex-row items-center justify-start gap-x-4"
    :class="[$attrs.class]"
    data-testid="services-title-with-icon"
  >
    <Icon v-if="icon" :name="icon" class="h-12 w-12" />
    <h2 class="text-s-900 text-2xl font-bold md:text-4xl">
      {{ title }}
    </h2>
  </div>
</template>

<script>
import Icon from '@/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
