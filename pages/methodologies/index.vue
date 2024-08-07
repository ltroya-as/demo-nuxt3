<template>
  <div>
    <div v-if="loading" class="flex flex-grow justify-center">
      <TheLoader />
    </div>

    <div v-else>
      <CommonHero
        image="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1677708812/assets/methodologies/Methodology_Overview_Hero_jprxkz.png"
      >
        <div
          class="max-w-content-container mx-auto flex h-full flex-col justify-center text-white"
        >
          <h1 class="text-2xl font-bold leading-7 md:leading-10 lg:text-4xl">
            Assessment Methodologies
          </h1>
          <p class="max-w-[700px] pb-16 pt-6 lg:pt-4 lg:text-xl">
            Benchmark’s Price Assessment methodologies are created to accurately
            reflect the market dynamics of the industries we cover and allow for
            independent data collection, free of distortion or
            misrepresentation.
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

      <div class="pb-12 pt-10">
        <div
          class="max-w-content-container px-small lg:px-big mx-auto pb-12 pt-10"
        >
          <h2 class="mb-12 text-2xl font-bold">
            Benchmark’s Price Assessment methodology
          </h2>

          <div class="flex flex-col gap-x-4 gap-y-12 md:flex-row">
            <div
              v-for="(description, index) in descriptions"
              :key="index"
              class="shadow-pm flex flex-col gap-8 rounded-lg bg-white px-4 py-7 md:flex-row"
            >
              <div
                class="h-fit max-h-full min-w-[140px] max-w-[140px] overflow-hidden rounded-full"
              >
                <img
                  :src="description.image"
                  :alt="`description-${index}`"
                  class=""
                />
              </div>
              <p>
                {{ description.text }}
              </p>
            </div>
          </div>
        </div>

        <div class="lg:bg-grey-100 mb-12 bg-white px-0 py-10 md:px-14 md:py-14">
          <div class="max-w-content-container px-small lg:px-big mx-auto">
            <div class="mb-10 flex flex-col justify-between gap-4 md:flex-row">
              <div class="md:max-w-contact-form-container">
                <h3 class="mb-8 text-2xl font-bold">
                  Benchmark’s Price Assessment methodology process
                </h3>
                <h4 class="mb-4 text-lg font-semibold">
                  Collecting and Assessing the Dat
                </h4>
                <p>
                  Benchmark collects proprietary lithium ion battery cell data
                  from a global network of industry contacts and uses its
                  in-house expertise to qualify and assess the data before
                  publishing.
                </p>
              </div>
            </div>

            <picture>
              <source
                media="(max-width:1023px)"
                :srcset="methodologyProcessImages.mobile"
                class="mx-auto w-full"
              />
              <source
                media="(min-width:1024px)"
                :srcset="methodologyProcessImages.desktop"
                class="mx-auto w-full"
              />
              <img
                :src="methodologyProcessImages.default"
                class="mx-auto w-full"
                alt="subscriptions"
              />
            </picture>
          </div>
        </div>

        <div class="max-w-content-container px-small lg:px-big mx-auto">
          <h3 class="mb-12 text-2xl font-bold">
            Our Price Assessment Methodologies
          </h3>
          <SharedServicesSection :services="services" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getServices } from '~/constants/services'
import overviewData from '~/constants/price-assessments/overview'

const PRODUCT_LIST = [
  'battery-database',
  'lithium',
  'cobalt',
  'nickel',
  'natural-graphite',
  'synthetic-graphite',
]

export default {
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: 'Assessment Methodologies',
      description:
        'Benchmark’s Price Assessment methodologies are created to accurately reflect the market dynamics of the industries we cover and allow for independent data collection, free of distortion or misrepresentation.',
    })
    useHead(seo)
  },

  data() {
    return {
      loading: true,
      services: [],
      methodologyProcessImages: {
        desktop:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,w_2500,q_auto/v1677708811/assets/methodologies/Methodology_Overview_Graph_jxfcdt.png',
        mobile:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1025/v1677782039/assets/methodologies/Methodology_Overview_Graph_Mobile_ttjs9z.png',
        default:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,w_2500,q_auto/v1677708811/assets/methodologies/Methodology_Overview_Graph_jxfcdt.png',
      },
      descriptions: [
        {
          image:
            'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_140,f_auto/v1677708811/assets/methodologies/Methodology_Overview_Card_1_vkdppb.png',
          text: 'Benchmark’s price assessment data is collected by polling a cross-section of active market participants. Our team of expert analysts verify and substantiate this information through a range of primary and secondary sources.',
        },
        {
          image:
            'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_140,f_auto/v1677708811/assets/methodologies/Methodology_Overview_Card_2_avjw20.png',
          text: 'This information is reviewed for each price assessment period, during which our analysts collate all data received and agree on an independent range (high and low) for prices reflective of prevailing market trends.',
        },
      ],
    }
  },
  async mounted() {
    await this.fetch()
    this.$store.commit('modal/setInitialFields', this.getOptionsServices())
  },
  methods: {
    async fetch() {
      this.loading = true

      try {
        const priceFiles = await this.$downloadManager.getFilesForCategory(
          'methodology-price-assessments',
        )
        if (priceFiles) {
          this.services = overviewData.servicesPrice.map((_service) => {
            const file = priceFiles.find(
              (_file) =>
                _service.methodology.active &&
                _service.methodology.type === 'file' &&
                _service.methodology.data === _file.tags[0].name,
            )
            return {
              ..._service,
              methodology: {
                ..._service.methodology,
                file: { ...file, category: 'methodology-price-assessments' },
              },
            }
          })
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    sortPriceMethodologies(files) {
      files.sort((a, b) => {
        if (a.tags && b.tags) {
          const aIndex = PRODUCT_LIST.findIndex(
            (product) => a.tags[0].name === product,
          )

          const bIndex = PRODUCT_LIST.findIndex(
            (product) => b.tags[0].name === product,
          )

          return aIndex - bIndex
        }

        return 0
      })

      return files
    },
    getOptionsServices() {
      return getServices(['price-assessments', 'market-assessments'])
    },
  },
}
</script>
