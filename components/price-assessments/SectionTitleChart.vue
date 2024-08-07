<template>
  <div class="mb-3.5 flex flex-col items-start justify-center lg:mb-8">
    <div class="flex w-full items-center gap-2 lg:gap-4">
      <div v-if="logo">
        <Icon class="h-full max-h-[50px] w-full max-w-[50px]" :name="logo" />
      </div>

      <h1 class="text-s-900 w-full text-2xl font-bold lg:text-4xl">
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
}
</script>
