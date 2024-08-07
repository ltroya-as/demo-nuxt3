<template>
  <div class="relative">
    <BenchmarkLogo
      v-if="showLogo"
      class="relative top-0 z-10 hidden h-[30px] w-[204px] md:-left-8 md:block md:h-[40px] md:w-[271px] lg:-left-12 lg:h-[59px] lg:w-[392px]"
      :class="logoColor"
    />

    <div class="flex flex-col lg:flex-row lg:justify-between">
      <div
        class="relative left-0 top-0 mt-1 block lg:mt-2"
        :class="titleClasses"
      >
        <div
          class="text-2xl font-bold uppercase leading-none md:text-4xl lg:text-5xl"
          :class="titleColor"
        >
          {{ title }}
        </div>
        <div
          v-if="subtitle"
          :class="showSubtitleOnMobile ? 'block' : 'hidden md:block'"
          class="text-p-500 mb-8 text-xl font-bold capitalize leading-none md:text-3xl lg:text-5xl"
        >
          {{ subtitle }}
        </div>
      </div>
      <slot name="search"></slot>
    </div>
  </div>
</template>

<script>
import BenchmarkLogo from '@/assets/icons/benchmark-logo.svg'

export default {
  components: {
    BenchmarkLogo,
  },
  props: {
    title: {
      type: String,
      default: () => undefined,
    },
    subtitle: {
      type: String,
      default: () => undefined,
    },
    variant: {
      type: String,
      default: 'black',
      validator(variant) {
        return ['black', 'white'].includes(variant)
      },
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    showSubtitleOnMobile: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    titleClasses() {
      return ['About Us'].includes(this.title)
        ? 'md:left-6 lg:left-7'
        : 'md:left-4 lg:left-6'
    },
    titleColor() {
      return this.variant === 'white' ? 'text-white' : 'text-s-900'
    },
    logoColor() {
      return this.variant === 'white' ? 'text-white' : 'text-black'
    },
  },
}
</script>
