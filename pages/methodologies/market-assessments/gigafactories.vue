<template>
  <div>
    <CommonHero
      :with-breadcrumb="false"
      image="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1677599812/assets/price-assessments/gam-bg_v0nlpe.jpg"
    >
      <div
        class="max-w-content-container mx-auto flex h-full flex-col justify-center text-white"
      >
        <h1 class="text-2xl font-bold leading-7 md:leading-10 lg:text-4xl">
          Gigafactory Assessment Methodology
        </h1>
        <div
          class="flex max-w-[700px] flex-col gap-4 pb-12 pt-4 lg:pt-4 lg:text-xl"
        >
          <p>
            In 2017 Benchmark created its market specific Lithium ion Battery
            Cell Data Methodology which includes the company’s tier ranking of
            lithium ion battery producers.
          </p>
          <p>
            The data and analysis is presented monthly and quarterly in two
            subscription services
          </p>
        </div>
        <CommonButton
          class="px-11 py-3 text-sm !font-semibold md:!w-fit"
          variant="primary"
          @click="openContactModal"
        >
          Contact Us
        </CommonButton>
      </div>
    </CommonHero>

    <div class="lg:py-big pb-3 pt-10">
      <div
        class="max-w-content-container gap-x-small px-small lg:mb-big lg:px-big mx-auto mb-10 flex flex-col gap-y-8 xl:flex-row"
      >
        <MethodologiesMarketAssessmentsGigafactoriesDescriptionCard
          v-for="(description, index) in descriptions"
          :key="index"
          :title="description.title"
          :content="description.content"
          :image="description.image"
          @open-contact-modal="openContactModal"
        />
      </div>

      <div class="bg-grey-100 py-10">
        <div class="max-w-content-container px-small lg:px-big mx-auto">
          <div class="flex flex-col md:flex-row">
            <div>
              <h3 class="text-2xl font-bold">
                Benchmark’s Lithium ion Battery cell data methodology
              </h3>
              <h4 class="mb-2 mt-8 text-lg font-semibold">
                Collecting and Assessing the Data
              </h4>
              <span>
                Benchmark collects proprietary lithium ion battery cell data
                from a global network of industry contacts and uses its in-house
                expertise to qualify and assess the data before publishing.
              </span>
            </div>
            <div class="md:max-w-fit">
              <SharedCommonButtonDownload
                :download-file="methodologyFileInfo"
                class="mt-6 lg:mt-0"
                text="Methodology"
                variant="tertiary"
              />
            </div>
          </div>
          <div class="mt-7 md:mt-24">
            <picture>
              <source
                media="(max-width:1023px)"
                :srcset="methodologyProcessImages.mobile"
                class="mx-auto"
              />
              <source
                media="(min-width:1024px)"
                :srcset="methodologyProcessImages.desktop"
                class="mx-auto"
              />
              <img
                :src="methodologyProcessImages.desktop"
                class="mx-auto"
                alt="graph"
              />
            </picture>
          </div>
        </div>
      </div>

      <!-- Tier Ranking Desktop-->
      <div class="max-w-content-container px-small lg:px-big mx-auto mt-12">
        <!-- Tier summary -->
        <div>
          <h3 class="text-2xl font-bold">Tier Qualification</h3>
          <p class="mt-6">
            We assess a lithium ion battery producer’s ability to supply lithium
            ion battery cells to the electric vehicle (EV) / automotive OEM
            industry.
          </p>
          <p class="mt-3">
            Benchmark’s ranking system is used by the automotive industry,
            institutional investors and governments in their workflow and
            decision-making process.
          </p>
        </div>
        <!-- Tier download -->
        <div class="mt-12 flex flex-col gap-x-4 lg:flex-row">
          <h2 class="text-2xl font-bold">
            Every three months, Benchmark assesses each lithium ion battery cell
            producer into the following three tiers:
          </h2>
          <div class="hidden md:block">
            <SharedCommonButtonDownload
              class="mt-6 min-w-[215px] lg:mt-0"
              variant="tertiary"
              text="Download Tiers"
              :download-file="report"
            />
          </div>
        </div>

        <!-- Tier Ranking picture Desktop -->
        <div class="mt-10 hidden lg:block">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1677599811/assets/price-assessments/gam-pyramid_uy9j8q.png"
            alt="tier ranking large"
            class="mx-auto w-full"
          />
        </div>
      </div>
      <!-- Tier Ranking Mobile-->
      <div class="mt-12 block lg:hidden">
        <div
          class="px-small mx-auto max-w-fit bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1677604769/assets/price-assessments/gam-pyramid-mobile_pfx48i.png')] bg-contain bg-no-repeat"
        >
          <div
            class="bg-grey-100 flex max-w-sm flex-col gap-20 rounded-lg bg-opacity-70 px-7 py-12"
          >
            <!-- Tier 1 -->
            <div>
              <h3 class="text-base font-bold"> TIER 1: </h3>
              <div class="flex flex-col items-center gap-6 lg:mt-0 lg:flex-row">
                <ul class="list-inside list-disc">
                  <li
                    >Qualified to supply multinational automotive OEMs / EV
                    producers outside of China</li
                  >
                  <li>
                    >5 GWh of annual cumulative capacity (equivalent at time of
                    assessment)
                  </li>
                  <li>Assessed every 3 months</li>
                </ul>
              </div>
            </div>
            <!-- Tier 2 -->
            <div>
              <h3 class="text-base font-bold"> TIER 2: </h3>
              <div class="flex flex-col items-center gap-6 lg:mt-0 lg:flex-row">
                <ul class="list-inside list-disc">
                  <li
                    >Not yet qualified to supply multinational automotive OEMs /
                    EV producers outside of China</li
                  >
                  <li>
                    Qualified to supply domestic Chinese EV manufacturers
                  </li>
                  <li>Qualified to supply non EV applications</li>
                </ul>
              </div>
            </div>
            <!-- Tier 3 -->
            <div>
              <h3 class="text-base font-bold"> TIER 3: </h3>
              <div class="flex flex-col items-center gap-6 lg:mt-0 lg:flex-row">
                <ul class="list-inside list-disc">
                  <li>Not yet qualified to supply EV end markets</li>
                  <li>
                    >1GWh of annual cumulative capacity (equivalent at time of
                    assessment)
                  </li>
                  <li
                    >Primary focus: non xEV markets including portable and
                    stationary</li
                  >
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-small my-12 md:hidden">
        <SharedCommonButtonDownload
          variant="tertiary"
          text="Download Tiers"
          :download-file="report"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DownloadReportMixin from '~/mixins/DownloadReportMixin'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
import MethodologyFileMixin from '~/mixins/MethodologyFileMixin'
import { getServices } from '~/constants/services'

export default {
  mixins: [DownloadReportMixin, AuthenticationMixin, MethodologyFileMixin],
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: 'Gigafactory Assessment Methodology',
      description:
        'In 2017 Benchmark created its market specific Lithium ion Battery Cell Data Methodology which includes the company’s tier ranking of lithium ion battery producers. The data and analysis is presented monthly and quarterly in two subscription services',
    })
    useHead(seo)
  },
  data() {
    const ID = this.$config.public.gigafactoriesTierRankingPdfId
    return {
      methodologyProcessImages: {
        mobile:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1024/v1677604769/assets/price-assessments/gam-graph-mobile_zriunn.png',
        desktop:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_2500/v1677599811/assets/price-assessments/gam-graph_g3exlo.png',
      },
      descriptions: [
        {
          title: 'Benchmark’s Lithium ion Battery Gigafactory Assessment',
          content:
            'Monthly assessment of the current capacity Forecasted outlook of lithium ion battery capacity on a global basis; tracking all lithium ion cell production facility, greater than 1 GWh, on a plant by plant basis that is active, under construction and in planning.',
          image:
            'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_300,f_auto/v1677599811/assets/price-assessments/gam-card-1_wp79um.jpg',
        },
        {
          title: 'Benchmark’s Lithium ion Battery Forecast Database',
          content:
            'Our most comprehensive database and analysis service for lithium ion batteries detailing the forecasted supply, format and chemistry of every battery cell plant globally and our most comprehensive cell demand forecast.',
          image:
            'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_300,f_auto/v1677599811/assets/price-assessments/gam-card-2_bbfetc.jpg',
        },
      ],
      methodologyFileInfo: {
        category: 'methodology-market-assessments',
        tag: 'gigafactory',
      },
      report: {
        ID,
        category: 'public-documents',
        file_name: 'benchmark_tiers_automotive_grade_battery_producers.pdf',
      },
    }
  },
  async mounted() {
    await this.fetch()
    this.$store.commit('modal/setInitialFields', this.getOptionsServices())
  },
  methods: {
    async fetch() {
      await this.setMethodologyFileInfo()
    },
    openContactModal() {
      this.$modal.open('contact')
    },
    getOptionsServices() {
      return getServices(['gigafactory', 'market-assessments'])
    },
  },
}
</script>
