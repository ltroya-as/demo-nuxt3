<template>
  <div
    class="flex w-full flex-col gap-x-0 gap-y-4 xl:flex-row xl:gap-x-14 xl:gap-y-0"
    :class="[$attrs.class]"
  >
    <div class="flex w-full max-w-full flex-col gap-y-4 xl:max-w-[35%]">
      <span v-for="(description, index) in descriptions" :key="index">
        {{ description }}
      </span>
      <slot></slot>
    </div>
    <div class="flex w-full max-w-full flex-col gap-y-3">
      <span class="text-base font-semibold">{{ title }}</span>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Package
          v-for="(service, index) in services"
          :key="index"
          :service="service"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Package from '~/components/shared/services/Package.vue'

export default {
  components: { Package },
  props: {
    title: {
      type: String,
      default: '',
    },
    services: {
      type: Array,
      default: () => [],
    },
    descriptions: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
