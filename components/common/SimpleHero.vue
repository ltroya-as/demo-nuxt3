<template>
  <section
    :style="{ backgroundImage: `url(${image})` }"
    class="relative min-h-[284px] bg-cover bg-center pb-10 pt-20 sm:pb-20 sm:pt-28 md:min-h-[338px]"
  >
    <div class="max-w-content-container px-small mx-auto lg:px-14 2xl:px-0">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    image: { type: String, required: true },
  },
}
</script>
