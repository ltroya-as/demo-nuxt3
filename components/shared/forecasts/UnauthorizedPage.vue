<template>
  <div class="flex w-full flex-col">
    <BannerWithImages
      :images="banner.images"
      class="grid-cols-2 !flex-col !gap-y-4 md:!gap-y-4 xl:!grid"
      image-classes="lg:min-h-[343px]"
      container-image-classes="xl:!w-full md:!w-[70%]"
    >
      <ServicesDescriptions
        :descriptions="banner.descriptions"
        :title="banner.title"
      />
    </BannerWithImages>
    <div
      class="max-w-content-container mx-auto flex w-full flex-col items-center justify-center gap-y-10 px-4 md:items-start lg:px-0 lg:pt-2"
    >
      <CommonGeneralCard
        v-if="sectionOne"
        :portrait="false"
        :image="sectionOne.image"
        :show-button-contact="false"
        image-classes="max-h-[235px] min-h-[235px] md:max-h-[423px] lg:max-h-full md:min-h-[423px] md:!w-[70%] xl:!w-full mx-auto"
        class="!max-w-full !flex-col-reverse lg:!flex-col-reverse xl:!flex-row"
      >
        <ServicesDescriptions
          :descriptions="sectionOne.descriptions"
          :title="sectionOne.title"
        />
      </CommonGeneralCard>
      <CommonGeneralCard
        v-if="sectionTwo"
        :portrait="false"
        :image="sectionTwo.image"
        :show-button-contact="sectionTwo.showButtonContact"
        :text-button-contact="sectionTwo.textButtonContact"
        :initial-fields="initialFields"
        image-classes="max-h-[235px] min-h-[235px] md:max-h-[423px] lg:max-h-full md:min-h-[423px] md:!w-[70%] xl:!w-full mx-auto"
        class="!max-w-full !flex-col-reverse lg:!flex-col-reverse xl:!flex-row-reverse"
      >
        <ServicesDescriptions
          :descriptions="sectionTwo.descriptions"
          :title="sectionTwo.title"
        />
      </CommonGeneralCard>
    </div>
  </div>
</template>
<script>
import BannerWithImages from '~/components/shared/common/BannerWithImages.vue'
import CommonGeneralCard from '~/components/shared/common/GeneralCard.vue'
import ServicesDescriptions from '~/components/shared/services/Descriptions.vue'

export default {
  components: {
    BannerWithImages,
    CommonGeneralCard,
    ServicesDescriptions,
  },
  props: {
    images: {
      type: Object,
      required: true,
    },
    initialFields: {
      type: Array,
      required: true,
    },
    banner: {
      type: Object,
      required: true,
    },
    sections: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sectionOne() {
      return this.sections?.one
    },
    sectionTwo() {
      return this.sections?.two
    },
  },
}
</script>
