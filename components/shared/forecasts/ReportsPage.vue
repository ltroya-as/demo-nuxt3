<template>
  <div class="max-w-content-container relative mx-auto min-h-[500px]">
    <div v-if="loading" class="absolute left-0 w-full lg:top-1/2">
      <TheLoader />
    </div>

    <div v-else class="flex flex-col gap-5">
      <div
        v-if="isAuthenticated && reports.length"
        class="mb-6 lg:absolute lg:right-0 lg:-mt-[62px]"
      >
        <SharedCommonButton
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
            v-if="report?.tags[0]?.name === 'forecast-video'"
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
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'

import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import GetVimeoDataMixin from '~/mixins/GetVimeoDataMixin'

import { getForecastsImagesByReportType } from '~/constants/forecasts'
import { FORECASTS } from '~/constants/services/constants'

import TheLoader from '~/components/TheLoader.vue'
import SharedMarketReportCard from '~/components/shared/market/ReportCard.vue'
import VideoIntroCard from '~/components/shared/market/VideoIntroCard.vue'
import SharedCommonButton from '~/components/shared/common/Button.vue'
import SharedMarketVideoCard from '~/components/shared/market/VideoCard.vue'

import IconDownload from '~/assets/icons/icon-download.svg'
import { logError } from '~/utils/log-error'

export default {
  components: {
    IconDownload,
    SharedCommonButton,
    SharedMarketReportCard,
    VideoIntroCard,
    TheLoader,
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
      loading: true,
      reports: [],
      videoIntro: null,
      files: [],
    }
  },
  computed: {
    isValidVideoIntro() {
      return !!this.videoIntro
    },
    initialFields() {
      return [this.product, FORECASTS.checkbox]
    },
  },
  async mounted() {
    this.loading = true
    try {
      const data = await this.$downloadManager.getAllReports({
        market: this.product,
        marketTypes: ['forecast'],
        show_total: true,
      })

      this.files = this.filterReports(data, 'forecast-video-intro')
      this.videoIntro = this.files.match[0] ?? null
      this.reports = this.sortByTitleReport(this.files.noMatch, this.category)
      if (this.isValidVideoIntro) {
        this.vimeoData = await this.getVimeoData(this.videoIntro.file_name)
      }
    } catch (error) {
      logError(error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    /**
     We want to sort the reports by title. First, we will have reports whose titles contain one of these strings and in this order:
     - Forecast report
     - Forecast
     - Price Forecast
     - Cost model
     All other reports will be sorted alphabetically and added to the end of the list.
     */
    sortByTitleReport(reports, category) {
      try {
        const namingConventions = [
          /forecast report/,
          /(?!price )forecast/,
          /price forecast/,
          /cost model/,
          /outlook report/,
        ]
        const namingVideo = 'Client Briefing Q'

        const conventionalReports = []
        let remainingReports = [...reports]?.map((_report) => {
          return { ..._report, report_type: 'default' }
        })

        namingConventions.forEach((pattern) => {
          let reportType = false
          const report = reports.find((_report) => {
            const result = pattern.test(_report?.title?.toLowerCase())
            if (result) {
              reportType = pattern
            }
            return result
          })

          if (report) {
            conventionalReports.push({ ...report, report_type: reportType })
            remainingReports = remainingReports.filter(
              (_report) => _report.id !== report.id,
            )
          }
        })

        let remainingReportsWithOutVideo = remainingReports?.filter(
          (_report) => !_report.title?.includes(namingVideo),
        )

        const reportsVideo = remainingReports?.filter((_report) =>
          _report.title?.includes(namingVideo),
        )

        remainingReportsWithOutVideo = sortBy(
          remainingReportsWithOutVideo,
          (_report) => _report?.title?.toLowerCase(),
        )

        const uniqueReports = uniqBy(
          [
            ...conventionalReports,
            ...remainingReportsWithOutVideo,
            ...reportsVideo,
          ],
          'id',
        )
        return uniqueReports.map((_report) => {
          const reportType = _report?.tags[0]?.name
          const images = getForecastsImagesByReportType(reportType, category)
          return {
            ..._report,
            images,
          }
        })
      } catch (_error) {
        return reports.map((_report, index) => {
          const images = getForecastsImagesByReportType(
            'DEFAULT',
            category,
            index,
          )
          return { ..._report, images }
        })
      }
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
