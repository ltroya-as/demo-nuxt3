<template>
  <header class="relative w-full">
    <!-- Background -->
    <div
      class="background-section absolute right-0 top-0 hidden h-full w-3/5 lg:block"
    >
      <img
        src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185114/assets/events/world-tour-2022/header-bg_wxxdcq.jpg?_i=AA"
        alt=""
        class="relative -top-px h-full w-full object-cover object-center grayscale"
      />
    </div>

    <!-- Logo -->
    <div class="logo-section bg-p-50 relative">
      <div class="max-w-content-container mx-auto px-4 lg:pl-16 2xl:pl-52">
        <div class="flex w-full justify-center py-40 lg:justify-start">
          <nuxt-link to="/events/world-tour-2022">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185114/assets/events/world-tour-2022/logo_aytzwi.png?_i=AA"
              alt=""
              class="max-h-[160px] w-full max-w-[500px]"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
  .logo-section {
    clip-path: polygon(0 0, 50% 0, 90% 100%, 0 100%);
  }
}

@media (min-width: 1536px) {
  .logo-section {
    clip-path: polygon(0 0, 45% 0, 70% 100%, 0 100%);
  }
}
</style>
