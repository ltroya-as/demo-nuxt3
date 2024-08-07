<template>
  <div class="max-w-content-container mx-auto">
    <PriceAssessmentsSectionTitle
      :title="heroTitle"
      :methodology-file-info="methodologyFileInfo"
      :logo="logo"
    />

    <div class="flex flex-col xl:flex-row">
      <div class="self-center md:self-start xl:w-1/2">
        <div class="mb-8 flex flex-col lg:flex-col xl:flex-row">
          <div class="flex flex-1 flex-col leading-6 xl:mt-0">
            <div v-for="line in heroTexts" :key="line" class="pb-4 text-base">
              {{ line }}
            </div>
          </div>
        </div>

        <div class="hidden xl:block">
          <slot name="afterDescription"> </slot>
        </div>

        <!-- Desktop Video -->
        <div v-if="videoId" class="hidden xl:mt-20 xl:block">
          <VideoPlayer :id="videoId" :provider="videoProvider"></VideoPlayer>
        </div>
      </div>

      <div class="xl:w-1/2 xl:pl-12">
        <!-- Price Assessments Package -->
        <h2 class="text-s-900 py-4 text-2xl font-bold xl:pt-0">
          {{ packageTitle }}
        </h2>
        <div class="text-s-900 mb-14">
          <div
            v-for="(line, index) in infoTexts"
            :key="line"
            class="mb-2.5 rounded-[20px] px-6 py-5 text-center text-sm font-semibold md:px-8 md:py-2.5"
            :class="[bgForPackages(index)]"
          >
            {{ line }}
          </div>
        </div>

        <!-- Mobile Video -->
        <div v-if="videoId" class="block xl:hidden">
          <VideoPlayer :id="videoId" :provider="videoProvider"></VideoPlayer>
        </div>

        <h2
          v-if="priceDataTexts.length > 0"
          class="text-s-900 py-4 text-2xl font-bold xl:pt-0"
        >
          Includes Price data
        </h2>
        <div v-if="priceDataTexts.length > 0" class="text-s-900 mb-10">
          <div
            v-for="(line, index) in priceDataTexts"
            :key="line"
            class="mb-2.5 rounded-[20px] px-6 py-5 text-center text-sm font-semibold md:px-8 md:py-2.5"
            :class="[bgForPackages(index)]"
          >
            {{ line }}
          </div>
        </div>

        <slot name="afterPackages"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { LITHIUM_ION_BATTERIES } from '~/constants/services/constants'

const PACKAGES_BACKGROUNDS = ['bg-p-300', 'bg-p-200', 'bg-p-100', 'bg-p-50']
const MARKET_ASSESSMENTS_TITLES = [
  'Cathodes',
  'Anodes',
  LITHIUM_ION_BATTERIES.menu,
]
export default {
  props: {
    heroTitle: {
      type: String,
      required: true,
    },
    heroTexts: {
      type: Array,
      required: true,
    },
    infoTexts: {
      type: Array,
      required: true,
    },
    priceDataTitle: {
      type: String,
      required: true,
    },
    priceDataTexts: {
      type: Array,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    methodologyFileInfo: {
      type: Object,
      default: () => null,
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

  computed: {
    packageTitle() {
      if (MARKET_ASSESSMENTS_TITLES.includes(this.heroTitle)) {
        return 'Market Assessment Package'
      }
      return 'Market & Price Assessment Package'
    },
  },

  methods: {
    bgForPackages(index) {
      return PACKAGES_BACKGROUNDS[index] || 'bg-p-50'
    },
  },
}
</script>
