<template>
  <div
    class="flex w-full flex-col gap-x-0 gap-y-4 xl:flex-row xl:gap-x-8 xl:gap-y-0"
    :class="[$attrs.class]"
  >
    <div
      class="flex w-full max-w-full flex-col justify-start gap-y-4 xl:max-w-[40%]"
      :class="[descriptionsTitleContainerClasses]"
    >
      <h3 v-if="descriptionsTitle" class="text-pretty text-2xl font-bold">
        {{ descriptionsTitle }}
      </h3>
      <span
        v-for="(description, index) in descriptionsItems"
        :key="index"
        class="text-pretty text-base leading-5"
      >
        {{ description }}
      </span>
      <slot></slot>
    </div>
    <div
      class="flex w-full max-w-full flex-col gap-y-3"
      :class="[servicesContainerClasses]"
    >
      <span v-if="servicesTitle" class="text-base font-semibold">
        {{ servicesTitle }}
      </span>
      <div
        class="flex w-full max-w-full flex-row flex-wrap justify-between gap-4"
        :class="[servicesItemsClasses]"
      >
        <PackageService
          v-for="(service, index) in servicesItems"
          :key="index"
          :service="service"
          :class="service.classes"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PackageService from '~/components/capacity-database/PackageService.vue'
export default {
  components: { PackageService },
  props: {
    descriptionsTitle: {
      type: String || null,
      default: null,
    },
    descriptionsItems: {
      type: Array,
      default: () => [],
    },
    descriptionsTitleContainerClasses: {
      type: String,
      default: '',
    },
    servicesTitle: {
      type: String || null,
      default: null,
    },
    servicesItems: {
      type: Array,
      default: () => [],
    },
    servicesContainerClasses: {
      type: String,
      default: '',
    },
    servicesItemsClasses: {
      type: String,
      default: '',
    },
  },
}
</script>
