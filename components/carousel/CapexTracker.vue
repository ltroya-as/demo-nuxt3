<template>
  <div
    data-testid="capex-tracker"
    class="bg-s-900 absolute flex h-full w-full min-w-full origin-left cursor-pointer select-none items-center justify-between overflow-hidden transition-all duration-700 ease-in-out"
    :class="classesContainerActive"
    @click="$modal.open('capexTracker')"
  >
    <!-- Image -->
    <div class="absolute top-0 h-full w-full">
      <img
        :src="imageUrl"
        alt="capex tracker background"
        class="image min-h-full w-full object-cover lg:h-full"
        data-testid="capex-image"
      />
    </div>
    <div
      class="z-10 flex h-full w-full flex-col justify-between px-5 pb-7 pt-6 md:px-8 md:py-5 md:pt-8 lg:px-10 lg:pt-8"
    >
      <div class="h-fit text-white">
        <div class="mb-3 flex items-baseline justify-start">
          <BenchmarkDataLogo class="5xl:h-6 h-3.5 w-auto md:h-4" />
          <p class="5xl:text-lg ml-1 text-xs md:text-[13px]">DATA</p>
        </div>

        <h2
          class="line-clamp-2 font-bold md:mb-3 md:text-xl md:leading-6"
          data-testid="capex-title"
        >
          Capital Tracker: {{ material }}
        </h2>

        <p class="text-2xl font-bold md:text-3xl">${{ value }}</p>
      </div>

      <CommonButton
        variant="clean"
        class="!w-fit text-sm"
        data-testid="capex-button"
      >
        View Now
      </CommonButton>
    </div>
  </div>
</template>
<script>
import CommonButton from '~/components/common/Button.vue'
import BenchmarkDataLogo from '~/assets/icons/BenchmarkLogo.svg'
import { getClassesContainerActive } from '~/utils/carousel'

export default {
  components: { CommonButton, BenchmarkDataLogo },
  props: {
    material: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    buttonClasses: {
      type: String,
      default: '',
    },
    indexMaximum: {
      type: Number,
      default: null,
    },
    carouselIndex: {
      type: Number,
      default: null,
    },
    articleIndex: {
      type: Number,
      default: null,
    },
  },

  computed: {
    buttonExtraClasses() {
      return this.buttonClasses + ' hidden md:flex !w-fit mt-3 lg:mt-10'
    },
    classesContainerActive() {
      if (
        this.indexMaximum === null ||
        this.carouselIndex === null ||
        this.articleIndex === null
      )
        return ''

      return getClassesContainerActive({
        articleIndex: this.articleIndex,
        carouselIndex: this.carouselIndex,
        indexMaximum: this.indexMaximum,
      })
    },
  },
}
</script>

<style>
.image {
  background: linear-gradient(90deg, #00000087 0%, #0000006b 59.74%, #000 100%);
}
</style>
