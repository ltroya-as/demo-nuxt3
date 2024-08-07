<template>
  <div class="flex w-full flex-col">
    <!-- Hero -->
    <ServicesHero
      :initial-fields="initialFields"
      :title="titleHero"
      :images="images"
      :file="methodologyFile"
    />
    <!-- Content -->
    <div
      class="max-w-content-container mx-auto flex w-full flex-col items-center justify-center gap-y-6 px-4 pb-20 pt-8 md:items-start lg:px-16 lg:pb-36 lg:pt-11"
    >
      <ServicesTitleWithIcon :icon="icon" :title="service" />
      <ServicesDescriptionAndPackage
        :title="titlePackage"
        :services="services"
        :descriptions="descriptions"
      />

      <div class="flex flex-col gap-y-4">
        <h4 class="text-center text-xl font-bold md:text-left">
          Subscribe to gain access
        </h4>
        <ServicesGroupButtons
          :initial-fields="initialFields"
          :file="methodologyFile"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ServicesDescriptionAndPackage from '~/components/shared/services/DescriptionAndPackage.vue'
import ServicesGroupButtons from '~/components/shared/services/GroupButtons.vue'
import ServicesHero from '~/components/shared/services/Hero.vue'
import ServicesTitleWithIcon from '~/components/shared/services/TitleWithIcon.vue'
import { MARKET_ASSESSMENTS } from '~/constants/services/constants'

export default {
  components: {
    ServicesHero,
    ServicesGroupButtons,
    ServicesTitleWithIcon,
    ServicesDescriptionAndPackage,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    initialFields: {
      type: Array,
      required: true,
    },
    unauthorizedTitle: {
      type: String,
      default: undefined,
    },
    service: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    methodologyFile: {
      type: Object,
      default: () => null,
    },
    priceDataInfo: {
      type: Array,
      default: () => [],
    },
    services: {
      type: Array,
      default: () => [],
    },
    descriptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      titlePackage: `${MARKET_ASSESSMENTS.name} Package`,
    }
  },
  computed: {
    titleHero() {
      return this.unauthorizedTitle ?? this.title
    },
  },
}
</script>
