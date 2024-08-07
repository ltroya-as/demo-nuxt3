<template>
  <div
    class="absolute z-[5] flex -translate-x-2/4 -translate-y-2/4 items-center justify-center opacity-10"
    :class="[
      topClass,
      leftClass,
      widthClass,
      { 'remove-me': removeFromChartDownload },
    ]"
  >
    <BenchmarkLogoBlack class="h-28 w-full" />
  </div>
</template>

<script>
import BenchmarkLogoBlack from '~/assets/icons/BenchmarkLogoBlack.svg'

export default {
  components: {
    BenchmarkLogoBlack,
  },
  props: {
    topClass: {
      type: String,
      default: 'top-1/2',
    },
    leftClass: {
      type: String,
      default: 'left-1/2',
    },
    widthClass: {
      type: String,
      default: 'w-[95%] mx-auto',
    },
    removeFromChartDownload: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
