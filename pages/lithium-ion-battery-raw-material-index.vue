<template>
  <div class="flex w-full flex-col pb-10 md:pb-36">
    <!-- Hero -->
    <div class="relative h-[694px] lg:h-[560px]">
      <img
        :src="heroImageUrl"
        alt="Lithium ion Battery raw material"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="max-w-content-container px-small lg:px-big mx-auto flex h-full w-full flex-col sm:justify-center 2xl:px-0"
      >
        <div class="relative z-10 pt-14 text-white lg:pt-0">
          <h3 class="mb-3 text-2xl font-bold lg:mb-6 lg:text-4xl">
            Lithium ion Batteries - Raw Material Index
          </h3>

          <div class="pb-4 text-base lg:pb-6 lg:text-xl lg:font-medium">
            The Lithium ion Battery Raw Material Price Index allows electric
            vehicle and energy storage end users to track the real-world
            proportionate percentage movement in the cost of the critical
            battery cathode raw materials over time, and tie this to their
            relative application of lithium ion battery cathode chemistries on a
            per kilowatt hour (kWh) basis.
          </div>
          <div class="pb-7 text-base lg:pb-6 lg:text-xl lg:font-medium">
            The data is designed specifically to be used in lithium ion
            batteries supply contracts, allowing suppliers and customers to
            accurately track the relative movement in raw material battery costs
            to use in a cost pass through structure, without surrendering
            confidential upstream contract price structures or details.
          </div>
          <CommonButton
            v-if="!loading && loggedIn"
            class="text-sm lg:text-base"
            variant="primary"
            @click="openContactModal"
          >
            Contact Us
          </CommonButton>
        </div>
      </div>
    </div>
    <div
      class="max-w-content-container px-small lg:px-big mx-auto flex h-full w-full flex-col justify-center 2xl:px-0"
    >
      <div
        class="mt-7 flex flex-col justify-start md:flex-row lg:mt-14 lg:items-center lg:gap-x-4"
      >
        <div
          class="flex w-full flex-col items-start lg:flex-row lg:items-center lg:gap-x-6"
        >
          <span class="font-montserrat mb-3 mr-0 text-xl font-medium lg:hidden">
            Download the methodology for further details
          </span>
          <span class="font-montserrat hidden text-xl font-medium lg:block">
            Download the Benchmark Lithium ion Battery Raw Material Price Index
            methodology for further details
          </span>
          <SharedCommonButtonDownload
            :data-filename="methodologyFileInfo.name"
            :download-file="methodologyFileInfo"
            class="mx-0 !w-full !text-sm lg:!min-w-[170px] lg:!max-w-[170px]"
            data-testid="download-methodology-button"
            text="Methodology"
            variant="secondary"
          />
        </div>
      </div>

      <client-only>
        <div
          v-if="loading"
          class="mt-12 flex h-[calc(100vh_-_5.5rem)] flex-grow items-center justify-center lg:h-auto"
        >
          <TheLoader />
        </div>

        <!-- Chart and Table -->
        <div
          v-if="!loading && loggedIn"
          id="lithium-ion-battery-raw-material-index-chart"
          class="shadow-pm mt-8 rounded-xl bg-white"
        >
          <ChartIndexes
            :summary="detailedData"
            :table-summary="priceIndex.summary"
            slug="lithium-ion-battery-raw-material-index"
            title="Benchmark Lithium ion Battery Raw Material"
            alt-title="lithium-ion-battery-raw-material-index"
          />
        </div>

        <!-- Contact Form -->
        <div v-if="!loggedIn" class="flex flex-col items-center justify-center">
          <div class="font-montserrat mb-3 mt-10 text-xl font-bold lg:text-4xl">
            Subscribe to gain access to our services
          </div>
          <ContactFormWithSideImage
            data-testid="lithium-ion-battery-raw-material-index-contact-form"
            class="gap-y-8 lg:w-[894px] lg:gap-x-10"
            hide-contact-general
          />
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import { services } from '~/constants/services'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import ContactFormWithSideImage from '~/components/contact/ContactFormWithSideImage.vue'
import { scrollTo } from '~/utils/scroll'
import ChartIndexes from '~/components/price-assessments/SummaryChartNewPortal.vue'
import GetData from '~/mixins/price-assessments/GetData'
import { logError } from '~/utils/log-error'

export default {
  components: {
    ContactFormWithSideImage,
    ChartIndexes,
  },
  mixins: [AuthenticationMixin, GetData, SeoUtilsMixin],
  data() {
    const heroImageUrls = {
      desktop:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,c_fill,w_1920/v1677614100/assets/skycrappers_yzbpm3.png?_i=AA',
      mobile:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,c_fill,w_1024/v1677614100/assets/skycrappers_yzbpm3.png?_i=AA',
    }

    const imageSizes = {
      desktop: 'f_auto,q_auto,w_125,c_fill',
      mobile: 'f_auto,q_auto,w_52,h_200,c_fill,g_north_west',
    }

    return {
      imageSizes,
      heroImageUrls,
      imageParams: 'f_auto,q_auto,w_125,h_201',
      heroImageUrl: heroImageUrls.desktop,
      data: {},
      loading: true,

      methodologyFileInfo: {
        ID: this.$config.public.lithiumIonBatteryPriceIndexMethodologyId,
        file_name: 'Lithium ion Battery Prices Index.pdf',
        category: 'public-documents',
      },
      scrollTo,
      category: 'raw-material-index',
      detailedData: {},
    }
  },

  async mounted() {
    try {
      this.loading = true
      this.$store.commit('modal/setInitialFields', services.lithium)
      await this.getSummaryData()
      this.priceIndex?.detailed?.forEach((product) => {
        this.detailedData[product.product] = product.data
      })
      if (this.$route.query.tab === 'chart') {
        this.scrollTo('lithium-ion-battery-raw-material-index-chart')
      }
    } catch (error) {
      logError(error)
    } finally {
      this.loading = false
    }
  },

  methods: {
    openContactModal() {
      this.$modal.open('contact')
    },
  },
}
</script>
