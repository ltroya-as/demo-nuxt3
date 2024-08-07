<template>
  <div class="flex w-full flex-col">
    <!-- Hero -->
    <ServicesHero
      :initial-fields="initialFields"
      :title="titleHero"
      :images="images"
      :file="methodologyFile"
      :show-sign-in="false"
    />
    <!-- Content -->
    <div
      class="max-w-content-container mx-auto w-full px-4 pb-20 pt-8 md:items-start lg:px-6 lg:pb-36 lg:pt-11"
    >
      <div class="block grid-cols-2 gap-6 xl:grid">
        <div>
          <ServicesTitleWithIcon :icon="icon" :title="title" class="mb-6" />
          <div class="mb-3 flex flex-col gap-4">
            <p v-for="(description, index) in descriptions" :key="index">
              {{ description }}
            </p>
          </div>
          <ButtonContactUs
            text="Find out more"
            :services="initialFields"
            class="!w-fit flex-shrink-0 px-6 py-3 font-semibold"
          />
          <img
            v-if="descriptionImage"
            class="my-4 rounded-xl"
            :src="descriptionImage"
            alt="second banner"
            data-testid="description-image"
          />
        </div>
        <div class="mt-8 xl:mt-0">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="shadow-pm mb-2 flex rounded-xl bg-white p-4 pb-5 xl:pr-0"
            data-testid="service-card"
          >
            <Icon class="h-12 w-12 min-w-[48px]" :name="service.icon" />
            <div class="border-p-500 ml-3 border-l-[3px] pl-3">
              <span class="font-semibold">{{ service.title }}</span>
              {{ service.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
import Icon from '~/components/common/Icon.vue'
import ServicesHero from '~/components/shared/services/Hero.vue'
import ServicesTitleWithIcon from '~/components/shared/services/TitleWithIcon.vue'

import { MARKET_ASSESSMENTS } from '~/constants/services/constants'

export default {
  components: {
    ButtonContactUs,
    Icon,
    ServicesHero,
    ServicesTitleWithIcon,
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
    icon: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    descriptionImage: {
      type: String,
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
