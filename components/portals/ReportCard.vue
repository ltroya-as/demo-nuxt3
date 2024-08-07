<template>
  <div
    v-if="report"
    class="shadow-pm mx-auto flex h-full w-full flex-row justify-between rounded-lg bg-white"
    data-testid="report-card"
  >
    <div class="bg-s-300 relative h-full w-[125px] flex-shrink-0 rounded-l-lg">
      <img
        :src="reportImage"
        class="flex h-full max-h-full w-full rounded-l-lg object-cover"
        alt="Report cover"
        data-testid="report-card-image"
      />
      <CardLabel :type="fileType || 'pdf'" class="absolute left-3 top-3 z-10" />
    </div>
    <div class="flex w-full flex-col justify-between p-3">
      <div>
        <div class="flex items-start justify-between gap-1">
          <h3
            class="line-clamp-2 text-sm font-semibold xl:text-lg"
            data-testid="report-card-title"
          >
            {{ reportTitle }}
          </h3>
        </div>
        <div v-if="reportDescriptions" class="pt-4">
          <span v-for="(description, index) in reportDescriptions" :key="index">
            {{ description }}
          </span>
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
        initialFields.push(ESG.slug)
      } else {
        initialFields.push(PRICE_ASSESSMENTS.slug)
      }
      return initialFields
    },
  },
}
</script>
