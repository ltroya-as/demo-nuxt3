<template>
  <div
    class="flex min-h-[165px] w-full flex-col items-center justify-center gap-6 rounded-md bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto,h_350,f_auto/v1707838364/assets/price-assessments/all-prices/istockphoto-1407983911-2048x2048_1_x2xkau.png')] bg-cover bg-no-repeat px-11 xl:min-h-[320px] xl:px-0"
  >
    <h2
      class="text-center text-2xl font-semibold text-white xl:w-[400px] xl:text-5xl"
    >
      Build your own Price Chart
    </h2>
    <CommonButton
      variant="primary"
      extra-classes="!px-2.5 !py-2"
      class="hidden xl:flex xl:!w-[400px]"
      @click="$emit('openPanel')"
    >
      <div class="flex items-center gap-1 text-sm">
        <ChartIcon class="h-6 w-6" /> Build Chart
      </div>
    </CommonButton>
  </div>
</template>

<script>
import ChartIcon from '~/assets/icons/dot-chart.svg'
export default {
  components: {
    ChartIcon,
  },
}
</script>
