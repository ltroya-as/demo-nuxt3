<template>
  <section
    :class="[$attrs.class]"
    :style="{ backgroundImage: `url(${image})` }"
    class="relative min-h-[470px] bg-cover bg-center lg:min-h-[560px]"
  >
    <div v-if="withBreadcrumb" class="absolute left-0 top-5 w-full">
      <div
        :class="[breadcrumbClasses]"
        class="max-w-content-container px-small lg:px-big mx-auto w-full 2xl:px-0"
      >
        <SharedNavigationBreadcrumb
          :menu="$store.state.breadcrumb.items"
          class="text-white"
        />
      </div>
    </div>

    <div
      :class="[contentClasses]"
      class="max-w-content-container px-small lg:px-big absolute left-0 right-0 top-0 mx-auto h-full w-full 2xl:px-0"
    >
      <slot></slot>
    </div>
  </section>
</template>

<script>
import SharedNavigationBreadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
export default {
  components: { SharedNavigationBreadcrumb },
  props: {
    image: { type: String, required: true },
    withBreadcrumb: { type: Boolean, default: true },
    contentClasses: { type: String, default: '' },
    breadcrumbClasses: { type: String, default: '' },
  },
}
</script>
