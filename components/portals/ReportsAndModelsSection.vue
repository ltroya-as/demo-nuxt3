<template>
  <div class="mt-16 w-full">
    <div
      v-if="loading"
      class="flex h-[444px] w-full items-center justify-center"
    >
      <TheLoader />
    </div>
    <div v-show="!loading" data-testid="reports-and-models" class="w-full">
      <SectionTitle
        title="Reports & Models"
        :url="viewMoreUrl"
        view-more-text="View More"
      />

      <div v-if="!loading" class="mb-2.5 overflow-x-hidden">
        <div class="relative flex h-[312px] gap-x-2">
          <Swiper
            data-testid="reports-swiper"
            class="h-[312px] w-full max-w-full xl:grow-0"
            :slides-per-view="slidesPerView"
            :slides-per-group="slidesPerView"
            :space-between="12"
            :loop="false"
            :speed="500"
            @swiper="onSwiper"
            @slide-change="updateNavigationButtons"
          >
            <SwiperSlide data-testid="report-swiper-slide-0">
              <HeroReportCard
                :report="featuredReport"
                :category="productSlug"
              />
            </SwiperSlide>
            <SwiperSlide
              v-for="[report, _report] in reportsPairs"
              :key="report.id"
              :data-testid="`report-swiper-slide-${i + 1}`"
              class="!grid grid-rows-2 gap-3"
            >
              <div>
                <SharedMarketVideoCard
                  v-if="
                    report?.tags[0]?.name === 'forecast-video' ||
                    report?.tags[0]?.name === 'esg-video'
                  "
                  :report="report"
                  :product="productSlug"
                  :initial-fields="[
                    productSlug,
                    report?.tags[0]?.name === 'forecast-video'
                      ? forecastCheckboxes
                      : esgCheckboxes,
                  ]"
                />
                <ReportCard v-else :report="_report" :category="productSlug" />
              </div>
              <div>
                <SharedMarketVideoCard
                  v-if="
                    _report?.tags[0]?.name === 'forecast-video' ||
                    _report?.tags[0]?.name === 'esg-video'
                  "
                  :report="_report"
                  :product="productSlug"
                  :initial-fields="[
                    productSlug,
                    report?.tags[0]?.name === 'forecast-video'
                      ? forecastCheckboxes
                      : esgCheckboxes,
                  ]"
                />
                <ReportCard v-else :report="_report" :category="productSlug" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div class="text-p-500 md:pl-6">
        <button
          ref="buttonPrev"
          data-testid="swiper-prev-button"
          :disabled="isFirstSlide"
          class="hover:border-s-400 rounded-full border-2 border-white bg-white p-1.5 shadow-md transition-all disabled:opacity-40"
          @click="() => swiperInstance.slidePrev()"
        >
          <IconChevronLeft class="h-4 w-4" />
        </button>
        <button
          ref="buttonNext"
          data-testid="swiper-next-button"
          :disabled="isLastSlide"
          class="hover:border-s-400 rounded-full border-2 border-white bg-white p-1.5 shadow-md transition-all disabled:opacity-40"
          @click="() => swiperInstance.slideNext()"
        >
          <IconChevronLeft class="h-4 w-4 rotate-180" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

import { arrayToPairs } from '~/utils/array'
import { random } from '~/utils/random'

import SectionTitle from '~/components/portals/SectionTitle.vue'
import HeroReportCard from '~/components/portals/HeroReportCard.vue'
import ReportCard from '~/components/portals/ReportCard.vue'
import SharedMarketVideoCard from '~/components/shared/market/VideoCard.vue'

import IconChevronLeft from '~/assets/icons/chevron-left.svg'

import GetVimeoDataMixin from '~/mixins/GetVimeoDataMixin'

import { MARKET, FORECASTS, ESG } from '~/constants/services/constants'
import { getForecastsImagesByReportType } from '~/constants/forecasts'
import { getEsgImagesByReportType } from '~/constants/esg'
import { images } from '@/constants/data-reports/images'

export default {
  components: {
    IconChevronLeft,
    SectionTitle,
    HeroReportCard,
    ReportCard,
    SharedMarketVideoCard,
    Swiper,
    SwiperSlide,
  },
  mixins: [GetVimeoDataMixin],

  props: {
    productSlug: {
      type: String,
      required: true,
    },
    productCategory: {
      type: [String, null],
      default: null,
    },
  },

  data() {
    return {
      loading: true,
      featuredReport: null,
      reportsPairs: null,
      slidesPerView: 2,
      isFirstSlide: true,
      isLastSlide: false,
      swiperInstance: null,
      images: [],
      forecastCheckboxes: FORECASTS.checkbox,
      esgCheckboxes: ESG.slug,
    }
  },

  computed: {
    viewMoreUrl() {
      return `/${MARKET.slug}/${this.productSlug}/data-reports`
    },
    category() {
      return this.productCategory ?? this.productSlug
    },
  },

  created() {
    this.images = images
  },

  async mounted() {
    await this.getReportData()
    this.initializeBreakpoints()

    this.loading = false
  },

  methods: {
    onSwiper(swiper) {
      this.swiperInstance = swiper
    },

    updateNavigationButtons() {
      this.isFirstSlide = this.swiperInstance.isBeginning
      this.isLastSlide = this.swiperInstance.isEnd
    },

    handleVideoClick() {
      this.$modal.open('contact')
    },

    initializeBreakpoints() {
      const mql = window.matchMedia('(max-width: 1420px)')
      const mqlMobile = window.matchMedia('(max-width: 720px)')

      this.slidesPerView = 2
      if (!mql.matches) {
        this.slidesPerView = 3
      } else if (mqlMobile.matches) {
        this.slidesPerView = 1
      }
      mql.onchange = (e) => {
        if (e.matches) {
          this.slidesPerView = 2
        } else {
          this.slidesPerView = 3
        }
      }
      mqlMobile.onchange = (e) => {
        if (e.matches) {
          this.slidesPerView = 1
        } else {
          this.slidesPerView = 2
        }
      }
    },

    async getReportData() {
      const reports = await this.$downloadManager.getAllReports({
        market: this.category,
        marketTypes: ['prices', 'forecast', 'esg', 'market'],
        page_limit: 10,
      })

      if (reports && reports.length) {
        const reportsCard = reports
          .filter(
            (report) =>
              !report.tags.length ||
              report.tags.some(
                (tag) =>
                  !['esg-video-intro', 'forecast-video-intro'].includes(
                    tag.name,
                  ),
              ),
          )
          .map((report) => ({
            ...report,
            show_overlay: report.market_type === 'prices',
            hide_label:
              report.tags.length &&
              report.tags.some((tag) => tag.name === 'esg-video'),
            hide_border: true,
          }))
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 11)

        reportsCard.forEach((report) => {
          report.images = this.getImagesByReportType(report)
        })

        this.featuredReport = reportsCard.shift()
        this.featuredReport.show_label =
          this.featuredReport.market_type === 'prices'
        this.reportsPairs = arrayToPairs(reportsCard)
      }
    },

    getImagesByReportType(report) {
      let images = {
        desktop: null,
      }
      if (report.market_type === 'forecast') {
        images = getForecastsImagesByReportType(
          report?.tags[0]?.name,
          this.productSlug,
        )
      } else if (report.market_type === 'esg') {
        const esgTypesReport = {
          'esg-methodology': 'ESG_METHODOLOGY',
          'esg-report': 'ESG_REPORT',
          'esg-tiering': 'ESG_TIERING',
          'esg-matrix': 'ESG_MATRICES',
          'esg-matrix-2': 'ESG_MATRICES_2',
          'esg-profiles': 'ESG_PROFILES',
          'esg-battery-emissions-analyser': 'ESG_BATTERY_EMISSIONS_ANALYSER',
          'esg-video': 'ESG_CLIENT_BRIEFING',
          'esg-carbon-intensity': 'ESG_CARBON_INTENSITY',
        }

        Object.entries(esgTypesReport).forEach(([key, value]) => {
          if (key === report?.tags[0]?.name) {
            images = getEsgImagesByReportType(this.productSlug, value)
          }
        })
      } else {
        images.desktop = this.getRandomImage()
      }

      return images
    },

    getRandomImage() {
      const arrWithRandomValues = this.images.map((value) => ({
        value,
        random: random(),
      }))
      arrWithRandomValues.sort((a, b) => a.random - b.random)

      return arrWithRandomValues.slice(0, 1).map((item) => item.value)
    },
  },
}
</script>
