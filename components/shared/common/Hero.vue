<template>
  <div>
    <div
      class="relative flex w-full flex-col md:max-h-[560px] md:min-h-[560px]"
    >
      <img
        :src="image"
        class="h-full max-h-[283px] min-h-[283px] w-full object-cover md:max-h-[560px] md:min-h-[560px]"
        :alt="title"
      />
      <div
        class="margin-auto max-w-content-container absolute top-0 flex h-full w-full flex-col items-center justify-center px-4 text-white md:items-start md:justify-start lg:px-14 2xl:px-0"
      >
        <SharedNavigationBreadcrumb
          v-if="showBreadcrumb"
          :menu="breadcrumbItems"
          class="mb-big mt-large text-white"
        />
        <h3 v-if="title" class="pb-4 text-2xl font-bold md:text-4xl">
          {{ title }}
        </h3>
        <slot name="desktop"></slot>
      </div>
    </div>
    <div
      v-if="showSectionMobile"
      class="margin-auto max-w-content-container px-small bottom-0 flex w-full flex-col pb-6 pt-5 text-black md:hidden"
    >
      <slot name="mobile"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    showSectionMobile: {
      type: Boolean,
      default: true,
    },
    showBreadcrumb: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      breadcrumbItems: ['Services', 'Consultancy'],
    }
  },
}
</script>
<style lang="scss" scoped>
$maxWidth: 1424px;
@media (min-width: 1424px) {
  .margin-auto {
    margin-left: calc(calc(100% - $maxWidth) / 2);
    margin-right: calc(calc(100% - $maxWidth) / 2);
  }
}
</style>
