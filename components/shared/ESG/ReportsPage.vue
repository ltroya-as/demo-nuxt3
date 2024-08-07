<template>
  <div class="max-w-content-container relative mx-auto min-h-[500px]">
    <div v-if="loading" class="absolute left-0 w-full lg:top-1/2">
      <TheLoader />
    </div>

    <div v-else>
      <div
        v-if="isAuthenticated"
        class="mb-6 lg:absolute lg:right-0 lg:-mt-[62px]"
      >
        <SharedCommonButton
          v-if="reports.length"
          text="Download all"
          class="!w-full whitespace-nowrap !text-sm lg:!w-auto"
          event-id="button-download-all"
        >
          <IconDownload class="z-index w-full min-w-[16px] max-w-[16px]" />
        </SharedCommonButton>
      </div>

      <VideoIntroCard
        v-if="isValidVideoIntro && isAuthenticated"
        class="mb-3"
        :report-data="videoIntro"
        :vimeo-video="vimeoVideo"
        :vimeo-source="vimeoSource"
        :video-ratio="videoRatio"
        :video-cover="videoCover"
      />

      <div v-if="!reports.length" class="text-center text-xl">
        There are currently no reports published, please check back later
      </div>

      <div
        v-if="reports.length"
        class="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2"
      >
        <div v-for="(report, index) in reports" :key="index">
          <SharedMarketVideoCard
            v-if="report?.tags[0]?.name === 'esg-video'"
            :report="report"
            :initial-fields="initialFields"
            :product="product"
          />
          <SharedMarketReportCard
            v-else
            :report="report"
            :category="categoryReport"
            :initial-fields="initialFields"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SharedMarketReportCard from '~/components/shared/market/ReportCard.vue'
import SharedCommonButton from '~/components/shared/common/Button.vue'
import VideoIntroCard from '~/components/shared/market/VideoIntroCard.vue'
import SharedMarketVideoCard from '~/components/shared/market/VideoCard.vue'
import TheLoader from '~/components/TheLoader.vue'

import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import GetVimeoDataMixin from '~/mixins/GetVimeoDataMixin'

import { getEsgImagesByReportType } from '~/constants/esg'
import { ESG } from '~/constants/services/constants'

import IconDownload from '~/assets/icons/icon-download.svg'
import { logError } from '~/utils/log-error'

export default {
  components: {
    IconDownload,
    SharedCommonButton,
    SharedMarketReportCard,
    TheLoader,
    VideoIntroCard,
    SharedMarketVideoCard,
  },
  mixins: [AuthorizationMixin, GetVimeoDataMixin],
  props: {
    category: {
      type: String,
      required: true,
    },
    categoryReport: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      videoId: null,
      loading: true,
      files: [],
      videoIntro: null,
      reports: [],
    }
  },
  computed: {
    isValidVideoIntro() {
      return !!this.videoIntro
    },
    initialFields() {
      return [this.product, ESG.slug]
    },
  },
  async mounted() {
    this.loading = true
    try {
      const data = await this.$downloadManager.getAllReports({
        market: this.product,
        marketTypes: ['esg'],
        show_total: true,
      })

      data.forEach((report) => {
        this.getImagesByReportType(report)
      })

      this.files = this.filterReports(data, 'esg-video-intro')

      this.videoIntro = this.files.match[0] ?? null
      this.orderFiles()

      if (this.isValidVideoIntro) {
        await this.getVimeoData(this.videoIntro.file_name)
      }
    } catch (error) {
      logError(error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    getImagesByReportType(report) {
      try {
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
        report.images = getEsgImagesByReportType(this.category, 'DEFAULT')
        Object.entries(esgTypesReport).forEach(([key, value]) => {
          if (key === report?.tags[0]?.name) {
            report.images = getEsgImagesByReportType(this.category, value)
          }
        })
      } catch (e) {
        return report
      }
    },

    orderFiles() {
      // get index from esg-report file post type
      const indexEsgReportFile = this.files.noMatch.findIndex(
        (file) => file.tags[0]?.name === 'esg-report',
      )

      // remove file from array and get the file to later put in first position
      const esgReportFile = this.files.noMatch.splice(indexEsgReportFile, 1)[0]

      if (esgReportFile) {
        this.files.noMatch.unshift(esgReportFile)
      }
      this.reports = this.files.noMatch.map((report) => ({
        ...report,
      }))
    },

    filterReports(reports, search) {
      return reports.reduce(
        (result, item) => {
          const hasMatchSearch = item.tags.some((tag) => tag.name === search)
          if (hasMatchSearch) {
            result.match.push(item)
          } else {
            result.noMatch.push(item)
          }
          return result
        },
        { match: [], noMatch: [] },
      )
    },
  },
}
</script>
