<template>
  <div
    data-testid="general-card"
    class="my-3 flex w-full lg:my-0"
    :class="[classesContainer, $attrs.class]"
  >
    <div class="flex w-full">
      <img
        :src="image"
        class="h-full w-full rounded-2xl object-cover md:rounded-xl"
        :class="[classesImage, imageClasses]"
        :alt="title"
      />
    </div>
    <div class="flex w-full flex-col" :class="[classesContainerTitle]">
      <h3 v-if="title" class="mb-3 mt-6 font-bold" :class="classesTitle">
        {{ title }}
      </h3>
      <slot></slot>
      <CommonButtonContactUs
        v-if="showButtonContact"
        :text="textButtonContact"
        :services="initialFields"
        class="my-6"
      />
    </div>
  </div>
</template>
<script>
import CommonButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
export default {
  components: { CommonButtonContactUs },
  props: {
    portrait: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    imageClasses: {
      type: String,
      default: '',
    },
    showButtonContact: {
      type: Boolean,
      default: true,
    },
    textButtonContact: {
      type: String,
      default: 'Find out more',
    },
    initialFields: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    classesContainer() {
      return this.portrait
        ? 'flex-col max-w-[464px] md:max-w-full'
        : 'flex-col lg:flex-row gap-x-6 md:max-w-full max-w-[464px] mx-auto'
    },
    classesImage() {
      return this.portrait
        ? 'max-h-[191px] min-h-[191px] md:max-h-[274px] md:min-h-[274px]'
        : 'max-h-[191px] min-h-[191px] w-full object-cover'
    },
    classesContainerTitle() {
      return this.portrait ? 'justify-start' : 'justify-center'
    },
    classesTitle() {
      return this.portrait
        ? 'text-xl md:text-2xl leading-medium md:leading-large'
        : 'text-xl md:text-3xl leading-medium md:leading-9'
    },
  },
}
</script>
