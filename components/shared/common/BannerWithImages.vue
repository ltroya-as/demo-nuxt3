<template>
  <div
    class="max-w-content-container mx-auto mb-6 flex flex-col justify-between gap-x-0 gap-y-6 md:flex-row md:gap-x-4 md:gap-y-0 lg:mb-8 xl:items-center"
    :class="[$attrs.class]"
    data-testid="banner-images"
  >
    <div class="flex w-full flex-col gap-y-3" :class="[containerSlotClasses]">
      <slot></slot>
    </div>
    <div
      class="md:gap-x-low flex w-full flex-row gap-x-3"
      :class="[containerImageClasses]"
      data-testid="container-banner-images"
    >
      <img
        :src="imageBig"
        class="md:rounded-8 rounded-xl object-cover"
        :class="[mainImageClasses, mainImageWidthClasses, classImageHeight]"
        :alt="altBig"
      />

      <div
        v-if="altSmallOne && altSmallTwo"
        class="flex w-1/2 flex-col gap-y-3 md:gap-y-6"
      >
        <img
          :src="imageSmallOne"
          class="md:rounded-8 h-full w-full rounded-xl object-cover"
          :alt="altSmallOne"
        />
        <img
          :src="imageSmallTwo"
          class="md:rounded-8 h-full w-full rounded-xl object-cover"
          :alt="altSmallTwo"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    images: {
      type: Object,
      required: true,
    },
    imageClasses: {
      type: String,
      default: '',
    },
    containerImageClasses: {
      type: String,
      default: '',
    },
    containerSlotClasses: {
      type: String,
      default: '',
    },
    expandImages: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mainImageWidthClasses() {
      if (this.altSmallOne && this.altSmallTwo) {
        return 'w-1/2'
      }
      return 'w-full'
    },
    mainImageClasses() {
      if (this.altSmallOne && this.altSmallTwo) {
        return this.imageClasses
      }
      return 'max-w-full'
    },
    imageBig() {
      return this.images.one.url
    },
    altBig() {
      return this.images.one?.alt ?? ''
    },
    imageSmallOne() {
      return this.images.two.url
    },
    altSmallOne() {
      return this.images.two?.alt ?? ''
    },
    imageSmallTwo() {
      return this.images.three.url
    },
    altSmallTwo() {
      return this.images.three?.alt ?? ''
    },
    classImageHeight() {
      return this.expandImages
        ? 'min-h-[184px] md:min-h-[340px] lg:min-h-[772px]'
        : ''
    },
  },
}
</script>
