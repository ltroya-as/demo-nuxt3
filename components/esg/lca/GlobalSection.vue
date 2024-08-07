<template>
  <section
    class="max-w-content-container mx-auto mt-0 w-full xl:mt-10 2xl:mt-0"
  >
    <picture>
      <source
        media="(max-width:767px)"
        :srcset="image.desktop"
        class="mx-auto w-full"
      />
      <source
        media="(min-width:768px)"
        :srcset="image.mobile"
        class="mx-auto w-full"
      />
      <img :src="image.default" class="mx-auto" alt="subscriptions" />
    </picture>
  </section>
</template>

<script>
export default {
  data() {
    return {
      image: {
        desktop:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1677092868/assets/lca/LCA_ixxcgs.png',
        mobile:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1677077661/assets/lca/LCA_zw46jm.png',
        default:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1677077661/assets/lca/LCA_zw46jm.png',
      },
    }
  },
}
</script>
