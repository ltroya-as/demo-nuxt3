<template>
  <section class="bg-grey-100 py-10 md:py-8 lg:py-16">
    <div class="max-w-content-container px-small lg:px-big mx-auto 2xl:px-0">
      <picture>
        <source
          media="(max-width:1023px)"
          :srcset="image.mobile"
          class="mx-auto w-full"
        />
        <source
          media="(min-width:1024px)"
          :srcset="image.desktop"
          class="mx-auto w-full"
        />
        <img src="image.default" class="mx-auto" alt="subscriptions" />
      </picture>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      image: {
        desktop:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1424/v1680109614/assets/esg/LCA_desktop_nyzgad.png',
        mobile:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_720/v1680109614/assets/esg/LCA_mobile_pkgxzl.png',
        default:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1424/v1680109614/assets/esg/LCA_desktop_nyzgad.png',
      },
    }
  },
}
</script>
