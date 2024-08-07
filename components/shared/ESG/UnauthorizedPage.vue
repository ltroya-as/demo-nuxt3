<template>
  <div>
    <!-- Hero -->
    <BannerWithImages
      :images="banner.images"
      container-image-classes="xl:w-full md:justify-end xl:gap-x-4"
      expand-images
    >
      <div
        class="flex w-full flex-col gap-y-3 pb-4 xl:pb-0 2xl:w-[572px]"
        data-testid="banner-descriptions"
      >
        <h3 class="text-xl font-bold">{{ banner.title }}</h3>
        <div
          v-for="(desc, index) in banner.descriptions"
          :key="index"
          class="flex w-full flex-col gap-y-3 text-base"
        >
          <span
            v-for="(item, indexItem) in desc.items"
            :key="indexItem"
            v-html="item"
          >
          </span>
          <slot></slot>
        </div>
        <div class="flex gap-2">
          <div class="border-l-p-500 h-6 border-l-4"></div>
          <div class="text-lg font-semibold">
            Sustainability Index - Top 5 Companies
          </div>
        </div>
        <p>
          The Benchmark Sustainability Index is a composite index that
          benchmarks lithium companies based on their degree of ESG transparency
          and performance. All lithium companies have been included in this
          Index and scored on 79 indicators highlighting the most pressing
          topics of concern. Separate Environment, Social and Governance scores
          are calculated, along with an overarching composite ESG score, for
          each company in the upstream lithium supply chain. Companies are
          classified into four categories based on their performance: "Industry
          Leading", "Good Practice", "Moderate Visibility" and "Limited
          Visibility".
        </p>
        <LinkWithAnimation
          text="Contact Us"
          :services="initialFields"
          class="!w-fit flex-shrink-0 font-semibold"
          @click="openContactForm"
        />
      </div>
    </BannerWithImages>
    <div
      v-if="services.length > 0"
      class="max-w-content-container mx-auto"
      data-testid="package-section"
    >
      <div class="mb-6 text-lg font-semibold">
        {{ title }}
      </div>

      <div
        class="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-3"
        data-testid="package-cards"
      >
        <Package
          v-for="(service, index) in services"
          :key="index"
          :service="service"
          class="shadow-pm min-h-[112px] bg-white lg:shadow-none"
          data-testid="package-cards-items"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getServices } from '~/constants/services'
import BannerWithImages from '~/components/shared/common/BannerWithImages.vue'
import Package from '~/components/shared/services/Package.vue'
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'

export default {
  components: {
    BannerWithImages,
    Package,
    LinkWithAnimation,
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
    banner: {
      type: Object,
      required: true,
    },
    services: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openContactForm() {
      const modalName = 'contact'
      if (this.initialFields === null) return this.$modal.open(modalName)

      if (
        this.initialFields instanceof Array &&
        this.initialFields?.length > 0
      ) {
        const initialValues = getServices([...this.initialFields])
        this.$store.commit('modal/setInitialFields', initialValues)
        return this.$modal.open(modalName)
      }

      this.$store.commit('modal/setInitialFields', this.initialFields)
      return this.$modal.open(modalName)
    },
  },
}
</script>
