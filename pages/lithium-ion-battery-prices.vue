<template>
  <div class="w-full">
    <CommonHero
      image="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_auto/v1678207901/assets/battery-prices-seo/AdobeStock_486553393_qwim8c.png?_i=AA"
    >
      <div class="flex h-full flex-col justify-center text-white">
        <h1 class="text-xl font-bold lg:text-4xl">
          Lithium ion Batteries Price Assessments
        </h1>
        <p
          class="max-w-[674px] pb-12 pt-6 text-sm font-normal lg:text-xl lg:font-medium"
        >
          What is the price of a lithium ion batteries today?
          <br /><br />
          How do lithium ion battery prices vary by chemistry?
          <br /><br />
          How do battery prices change with the rise of electric vehicles and
          energy storage / ESS?
        </p>
        <CommonButton
          class="px-11 py-3 text-sm !font-semibold md:!w-fit"
          variant="primary"
          @click="$modal.open('contact')"
        >
          Contact Us
        </CommonButton>
      </div>
    </CommonHero>
    <main
      class="max-w-content-container px-small pb-big lg:px-big mx-auto w-full pt-10 2xl:px-0"
    >
      <h2 class="mb-6 text-lg font-bold uppercase md:text-lg lg:text-2xl">
        Benchmark Lithium ion Batteries Price Data
      </h2>

      <div class="max-w-content-container mx-auto lg:px-0">
        <div class="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
          <div
            v-for="card in cards"
            :key="card.id"
            class="shadow-pm flex max-h-[380px] flex-col rounded-xl bg-white lg:h-[300px] lg:flex-row xl:h-[220px]"
          >
            <img
              :src="getImageByScreen(card)"
              alt="We are seeking"
              class="h-[160px] rounded-xl object-cover lg:h-auto lg:w-[187px] lg:rounded-bl-xl lg:rounded-br-none lg:rounded-tl-xl lg:rounded-tr-none"
            />
            <div
              class="flex flex-col justify-center p-4 pb-8 lg:w-[calc(100%_-_187px)] lg:pl-6 lg:pr-0"
            >
              <div class="text-sm lg:text-base">
                {{ card.content }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PriceAssessmentsSummaryViewer
        v-if="pricesSummaryPortal"
        class="mt-12"
        :price-summary="pricesSummaryPortal"
        :price-index="priceIndex"
        :category="category"
        :slug="slug"
      />

      <!-- Contact Form -->
      <div class="flex flex-col items-center justify-center">
        <div class="font-montserrat mb-3 mt-10 text-xl font-bold lg:text-4xl">
          Subscribe to gain access to our services
        </div>
        <ContactFormWithSideImage
          data-testid="lithium-prices-contact-modal"
          class="gap-y-8 lg:w-[894px] lg:gap-x-10"
          hide-contact-general
        />
      </div>

      <section class="mt-12 w-full">
        <h2 class="mb-6 text-2xl font-bold lg:pl-14">
          Other Product & Services
        </h2>

        <div class="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
          <HomeOurDivision
            v-for="division in DIVISIONS"
            :key="division.title"
            :title="division.title"
            :title-link="division.link"
            :icon="division.icon"
            :image-background="division.imageBackground"
            :sub-title="division.subTitle"
            :description="division.description"
            :elements="division.elements"
            :links="division.links"
          />
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import { getServices } from '~/constants/services'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import MethodologyFileMixin from '~/mixins/MethodologyFileMixin'
import ScreenSizeMixin from '~/mixins/ScreenSizeMixin'
import CommonButton from '~/components/common/Button.vue'
import CommonHero from '~/components/common/Hero.vue'
import HomeOurDivision from '~/components/home/OurDivision.vue'
import ContactFormWithSideImage from '~/components/contact/ContactFormWithSideImage.vue'
import {
  PRICE_ASSESSMENTS_LITHIUM,
  PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES,
} from '~/constants/services/price-assessments'
import { LITHIUM, PRICE_ASSESSMENTS } from '~/constants/services/constants'
import { DIVISIONS } from '~/constants/divisions'
import GetData from '~/mixins/price-assessments/GetData'

export default {
  components: {
    CommonButton,
    CommonHero,
    HomeOurDivision,
    ContactFormWithSideImage,
  },
  mixins: [MethodologyFileMixin, AuthenticationMixin, ScreenSizeMixin, GetData],
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: 'Lithium ion Batteries Price Index',
      description:
        'What is the price of a lithium ion batteries today? How do lithium ion batteries prices vary by chemistry? How do battery prices change with the rise of electric vehicles and energy storage / ESS?',
    })
    useHead(seo)
  },
  data() {
    return {
      category: 'lithium-ion-batteries',
      slug: 'lithium-ion-battery-prices',
      subscription: PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES.subscription,
      initialValues: getServices([
        PRICE_ASSESSMENTS_LITHIUM.checkbox,
        PRICE_ASSESSMENTS.slug,
      ]),
      methodologyFileInfo: {
        category: 'methodology-price-assessments',
        tag: LITHIUM.category,
      },
      DIVISIONS,
      summary: null,
      imageParams: 'f_auto,q_auto,w_200,h_400,c_fill,g_auto',
      imageParamsMobile: 'f_auto,q_auto,w_700,h_200,c_fill,g_auto',
      cards: [
        {
          id: 1,
          image:
            'v1678207753/assets/battery-prices-seo/Benchmark_Minerals_Manufacturing_solid-state_lithium_metal_batt_cedfd5e1-1312-4e10-9210-bc034f03c1e9_2_1_vyp72w.png?_i=AA',
          imageMobile:
            'v1678213476/assets/battery-prices-seo/Benchmark_Minerals_Manufacturing_solid-state_lithium_metal_batt_cedfd5e1-1312-4e10-9210-bc034f03c1e9_2_3_cnpr6k.png?_i=AA',
          content: `Benchmark Mineral Intelligence assesses lithium ion batteries prices each month to demystify this opaque industry.
                    Analysis of cell prices across all major formats (pouch, prismatic, cylindrical) and distinct cathode chemistries
                    (including NCM111, 523, 622, 811, NCA, LCO, LFP)`,
        },
        {
          id: 2,
          image:
            'v1678207753/assets/battery-prices-seo/Benchmark_Minerals_Futuristic_people_in_action_of_investment_tr_7744fe4a-073d-4645-85c5-af5355fc6481_2_2_sjm6qd.png?_i=AA',
          imageMobile:
            'v1678213476/assets/battery-prices-seo/Benchmark_Minerals_Futuristic_people_in_action_of_investment_tr_7744fe4a-073d-4645-85c5-af5355fc6481_2_3_e750xo.png?_i=AA',
          content: `This ensures our service reflects how changes in key cost inputs - including raw materials, labour and energy -
                    impact the global regional structure of cell prices in real time.`,
        },
        {
          id: 3,
          image:
            'v1678207753/assets/battery-prices-seo/Benchmark_Minerals_Manufacturing_solid-state_lithium_metal_batt_e61d6a01-5a7f-4556-b9a3-b418f18b7063_2_1_ynv0s2.png?_i=AA',
          imageMobile:
            'v1678213476/assets/battery-prices-seo/Benchmark_Minerals_Manufacturing_solid-state_lithium_metal_batt_e61d6a01-5a7f-4556-b9a3-b418f18b7063_2_2_brqxg5.png?_i=AA',
          content: `Global weighted average and large contract prevailing price analysis to track global market cell price margins`,
        },
        {
          id: 4,
          image:
            'v1678207753/assets/battery-prices-seo/Benchmark_Minerals_batteries_lo-fi_illustration_shades_of_yello_aa39d16a-db88-41e3-9206-a83c83ebd3d4_2_1_y8pe4p.png?_i=AA',
          imageMobile:
            'v1678213476/assets/battery-prices-seo/Benchmark_Minerals_batteries_lo-fi_illustration_shades_of_yello_aa39d16a-db88-41e3-9206-a83c83ebd3d4_2_2_hdz0y3.png?_i=AA',
          content: `This new service is powered by Benchmark’s proprietary Lithium ion Batteries Price Assessment model and our IOSCO certified raw material price assessments.`,
        },
        {
          id: 5,
          image:
            'v1678207753/assets/battery-prices-seo/Benchmark_Minerals_Factory_production_industry_Batteries_lo-fi__08f67ea8-82c5-4cc3-91f0-02fcd29f4008_1_1_cztcoj.png?_i=AA',
          imageMobile:
            'v1678213476/assets/battery-prices-seo/Benchmark_Minerals_Factory_production_industry_Batteries_lo-fi__08f67ea8-82c5-4cc3-91f0-02fcd29f4008_1_2_qnmd5h.png?_i=AA',
          content: `Analysis of key cell types by raw material input, cell components including cathode and anode, operating costs and assembly costs`,
        },
        {
          id: 6,
          image:
            'v1678207753/assets/battery-prices-seo/Benchmark_Minerals_Data_tracking_maps_and_charts_lo-fi_illustra_81c077ee-4e6a-47e2-a6a9-94d59c7f2091_1_2_hox1cg.png?_i=AA',
          imageMobile:
            'v1678213476/assets/battery-prices-seo/Benchmark_Minerals_Data_tracking_maps_and_charts_lo-fi_illustra_81c077ee-4e6a-47e2-a6a9-94d59c7f2091_1_3_tbulgo.png?_i=AA',
          content: `Regional breakdown of battery cell prices, allowing for comparative analysis of global cost basis`,
        },
      ],
    }
  },
  computed: {},
  watch: {
    loggedIn(value) {
      value && this.fetch()
    },
  },

  async mounted() {
    await this.fetch()
    this.$store.commit(
      'modal/setInitialFields',
      getServices([
        PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES.checkbox,
        PRICE_ASSESSMENTS.slug,
      ]),
    )
  },
  methods: {
    async fetch() {
      await this.getSummaryData()
      await this.setMethodologyFileInfo()
    },
    setSuccess(value) {
      this.success = value
      this.$emit('set-success', value)
    },
    getImageByScreen(card) {
      const urlImage = `https://res.cloudinary.com/benchmarkminerals/image/upload/`
      let image = `${urlImage}${this.imageParams}/${card.image}`

      if (this.isMobile() || this.isTablet()) {
        image = `${urlImage}${this.imageParamsMobile}/${card.imageMobile}`
      }
      return image
    },
  },
}
</script>
