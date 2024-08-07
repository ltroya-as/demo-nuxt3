<template>
  <div>
    <SharedServicesHero
      :title="bannerTitle"
      :images="bannerImages"
      :file="methodologyFileInfo"
      download-text="Methodology"
    />

    <div
      class="max-w-content-container mx-auto flex w-full flex-col items-center justify-center px-4 pb-20 pt-8 md:items-start md:px-16 lg:pb-36 lg:pt-11"
    >
      <SharedServicesTitleWithIcon
        :mineral-name="mineralName"
        :logo="logo"
        class="mb-6"
      />

      <SharedServicesDescriptionAndPackage
        :title="packageTitle"
        class="mb-10"
        :services="services"
        :descriptions="descriptions"
      >
        <slot name="description" />
      </SharedServicesDescriptionAndPackage>

      <div v-if="videoId" class="mb-10 w-full">
        <VideoPlayer :id="videoId" :provider="videoProvider"></VideoPlayer>
      </div>

      <SharedServicesPriceData :info="priceDataInfo" />

      <div class="max-w-full">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mineral: {
      type: String,
      default: '',
    },
    bannerImages: {
      type: Object,
      default: () => ({
        desktop: '',
        mobile: '',
      }),
    },
    packageTitle: {
      type: String,
      default: 'Price Assessment Package',
    },
    services: {
      type: Array,
      required: true,
    },
    descriptions: {
      type: Array,
      default: () => [],
    },
    bannerTitle: {
      type: String,
      required: true,
    },
    methodologyFileInfo: {
      type: Object,
      default: () => null,
    },
    mineralName: {
      type: String,
      default() {
        return this.mineral?.split('-').join(' ')
      },
    },
    logo: {
      type: String,
      default() {
        const logoSvg = ['synthetic-graphite', 'natural-graphite'].includes(
          this.mineral,
        )
          ? 'graphite'
          : this.mineral
        return `${logoSvg}-logo.svg`
      },
    },
    priceDataInfo: {
      type: Array,
      default: () => [],
    },
    videoId: {
      type: String,
      default: null,
    },
    videoProvider: {
      type: String,
      default: null,
    },
  },
}
</script>
