<template>
  <div
    v-if="report"
    :class="{ 'border-grey-600 border': !report.hide_border }"
    class="shadow-pm mx-auto flex h-full w-full flex-row justify-between rounded-lg bg-white"
    data-testid="report-card"
  >
    <div class="bg-s-300 relative h-full w-[125px] flex-shrink-0 rounded-l-lg">
      <img
        :src="reportImage"
        class="flex h-[150px] max-h-[150px] w-full rounded-l-lg object-cover"
        alt="Report forecasts"
        data-testid="forecasts-report-card-image"
      />
      <OverlayCard
        v-if="report.show_overlay"
        :date-report="date"
        :type="fileType || 'pdf'"
      />
      <CardLabel
        v-else
        :type="fileType || 'pdf'"
        :show-label="false"
        class="absolute left-3 top-3 z-10"
      />
    </div>
    <div class="flex w-full flex-col justify-between p-3">
      <div>
        <div class="flex flex-col items-start justify-between gap-1">
          <span v-show="showType" class="text-s-700 text-xs font-semibold">
            {{ type }}
          </span>
          <h3
            class="line-clamp-2 text-sm font-semibold xl:text-lg"
            data-testid="forecasts-report-card-title"
          >
            {{ reportTitle }}
          </h3>
        </div>
        <div
          v-if="reportDescriptions"
          class="pt-4"
          data-testid="forecasts-report-card-description"
        >
          <span v-for="(description, index) in reportDescriptions" :key="index">
            {{ description }}
          </span>
        </div>
      </div>
      <ReportCardFooter
        :report-id="reportId"
        :report-name="reportName"
        :report-file="reportFile"
        :report-has-access="reportHasAccess"
        :initial-fields="initialFields"
        :show-copy-link="showCopyLink"
        :category="category"
      />
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

import OverlayCard from '@/components/portals/OverlayCard.vue'
import CardLabel from '~/components/portals/CardLabel.vue'
import ReportCardFooter from '~/components/portals/ReportCardFooter.vue'

export default {
  components: {
    CardLabel,
    ReportCardFooter,
    OverlayCard,
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
    initialFields: {
      type: Array,
      default: () => [],
      required: false,
    },
    showCopyLink: {
      type: Boolean,
      default: false,
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
    fileType() {
      const extension = this.report.file_extension

      const extensionMap = {
        pdf: 'pdf',
        xls: 'xlsx',
        xlsm: 'xlsx',
        xlsx: 'xlsx',
        csv: 'xlsx',
        pptx: 'ppt',
        ppt: 'ppt',
      }

      return extensionMap[extension] || ''
    },
    reportFile() {
      return { ...this.report, category: this.category }
    },
    reportHasAccess() {
      return this.report?.has_access
    },
    type() {
      return this.report?.assessment_type
    },
    date() {
      return this.report?.date
        ? format(new Date(this.report.date), 'dd MMM yyyy')
        : ''
    },
    reportId() {
      return this.report?.id
    },
    showType() {
      return (
        this.type &&
        this.report.market_type !== 'forecast' &&
        this.report.market_type !== 'esg'
      )
    },
  },
}
</script>
