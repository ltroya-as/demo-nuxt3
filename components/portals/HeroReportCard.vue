<template>
  <div
    data-testid="hero-report-card"
    class="flex h-full w-full flex-shrink-0 flex-col rounded-lg"
  >
    <div
      class="bg-s-100 relative flex flex-grow flex-col justify-between rounded-lg p-6"
    >
      <CardLabel
        class="absolute left-3 top-3 z-10"
        type="pdf"
        :show-label="report?.show_label"
        :label="cardLabel"
      />

      <div class="absolute left-0 top-0 h-full w-full">
        <img
          data-testid="hero-report-card-image"
          class="h-full w-full rounded-lg object-cover object-center"
          :src="$cloudinary.resize(reportImage, 'hero-video-card')"
          alt=""
        />
        <div
          class="absolute left-0 top-0 h-full w-full rounded-lg bg-black/60"
        ></div>
      </div>
      <div class="z-10 mt-12 text-white">
        <div
          data-testid="hero-report-title"
          class="line-clamp-3 text-xl font-bold"
        >
          {{ reportTitle }}
        </div>
      </div>
      <ReportCardFooter
        :report-name="reportName"
        :report-file="reportFile"
        :report-has-access="reportHasAccess"
        :initial-fields="initialFields"
      />
    </div>
  </div>
</template>

<script>
import CardLabel from '~/components/portals/CardLabel.vue'
import ReportCardFooter from '~/components/portals/ReportCardFooter.vue'

import {
  FORECASTS,
  ESG,
  PRICE_ASSESSMENTS,
} from '~/constants/services/constants'
import { reformat } from '~/utils/date'

export default {
  components: {
    CardLabel,
    ReportCardFooter,
  },
  props: {
    report: {
      type: Object,
      default: () => null,
    },
    category: {
      type: String,
      default: null,
    },
  },
  computed: {
    cardLabel() {
      if (!this.report) return

      return this.report.market_type === 'prices'
        ? reformat(this.report.date, 'dd MMM yyyy')
        : null
    },
    reportTitle() {
      return this.report?.title
    },
    reportName() {
      return this.report?.file_name
    },
    reportDescriptions() {
      return this.report?.descriptions || false
    },
    reportImage() {
      return this.report?.images?.desktop
    },
    reportImageMobile() {
      return this.report?.images?.mobile
    },
    fileType() {
      const extension = this.report.file_extension

      if (extension === 'pdf') {
        return 'pdf'
      }

      if (['xls', 'xlsm', 'xlsx', 'csv'].includes(extension)) {
        return 'xlsx'
      }

      if (extension === 'pptx' || extension === 'ppt') {
        return 'ppt'
      }

      return ''
    },
    reportFile() {
      return { ...this.report, category: this.category }
    },
    reportHasAccess() {
      return this.report?.has_access
    },
    initialFields() {
      const initialFields = [this.category]
      const marketType = this.report?.market_type
      if (marketType === 'forecast') {
        initialFields.push(FORECASTS.checkbox)
      } else if (marketType === 'esg') {
        initialFields.push(ESG.checkbox)
      } else {
        initialFields.push(PRICE_ASSESSMENTS.checkbox)
      }
      return initialFields
    },
  },
}
</script>
