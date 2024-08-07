<template>
  <div>
    <!-- Mobile version -->
    <div
      class="shadow-pm group relative mb-4 grid grid-cols-12 bg-white md:hidden"
      data-testid="mobile-report-card"
      :data-mobile-filename="data.file_name"
      :title="data.post_title"
    >
      <!-- PDF Icon -->
      <div class="relative col-span-2 sm:col-span-1">
        <div
          class="bg-p-400 absolute bottom-0 left-0 top-0 flex w-[80%] items-center justify-center sm:w-full"
        >
          <PdfIcon class="w-6 text-black" />
        </div>
      </div>

      <div
        class="col-span-10 grid grid-cols-12 py-3 pr-2 sm:col-span-11 sm:p-3"
      >
        <!-- Date -->
        <div
          class="col-span-6 flex items-center whitespace-nowrap text-sm font-semibold"
        >
          {{ shortDate }}
        </div>

        <!-- Type -->
        <div
          class="col-span-6 flex items-center justify-end whitespace-nowrap text-sm font-semibold"
        >
          {{ type }}
        </div>

        <!-- Name of report -->
        <div class="col-span-12 py-4 text-sm">
          {{ name }}
        </div>

        <!-- Download -->
        <div class="col-span-12 flex items-center justify-start">
          <DownloadReportIcon
            v-if="!downloading"
            class="cursor-pointer text-black"
            @click="handleClick"
          />

          <CommonCircularProgressBar
            v-if="downloading"
            :progress="downloadProgress"
            @click="handleClick"
          />

          <div
            v-if="isDownloadLinkCopyable"
            class="ml-3 flex cursor-pointer"
            :title="reportMessageTooltip"
          >
            <IconClipboardLink
              v-if="!reportCopied"
              class="h-6 w-6"
              @click="copyRouteReport(data)"
            />
            <IconCheck v-else class="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop version -->
    <div
      class="shadow-pm group relative hidden grid-cols-12 bg-white pr-3 md:grid"
      data-testid="report-card"
      :data-filename="data.file_name"
      :title="data.post_title"
    >
      <!-- Date -->
      <div class="col-span-2 flex items-center py-4 font-semibold">
        {{ shortDate }}
      </div>

      <!-- Type -->
      <div class="col-span-7">
        <div class="flex items-center py-4 pl-2">
          {{ type }}
        </div>

        <!-- Name of report -->
        <div class="flex items-center py-4">
          {{ name }}
        </div>
      </div>

      <!-- Download -->
      <div class="col-span-2 flex items-center justify-center py-4">
        <DownloadReportIcon
          v-if="!downloading"
          data-testid="report-downloader-button"
          class="cursor-pointer text-black"
          @click="handleClick"
        />

        <CommonCircularProgressBar
          v-if="downloading"
          :progress="downloadProgress"
          @click="handleClick"
        />

        <div
          v-if="isDownloadLinkCopyable"
          class="ml-3 flex cursor-pointer"
          :title="reportMessageTooltip"
        >
          <IconClipboardLink
            v-if="!reportCopied"
            class="h-6 w-6"
            @click="copyRouteReport(data, routeDefaultBySubscription)"
          />
          <IconCheck v-else class="h-6 w-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'
import { services } from '@/constants/services'
import DownloadReportMixin from '~/mixins/DownloadReportMixin'
import CopyToClipboard from '~/mixins/CopyToClipboard'
import DownloadReportIcon from '~/assets/icons/DownloadReportIcon.svg'
import IconClipboardLink from '~/assets/icons/IconClipboardLink.svg'
import IconCheck from '~/assets/icons/IconCheck.svg'
import PdfIcon from '~/assets/icons/Pdf.svg'
import CommonCircularProgressBar from '~/components/common/CircularProgressBar.vue'
import { getServiceBySubscription } from '~/constants/services/objects'

export default {
  components: {
    CommonCircularProgressBar,
    DownloadReportIcon,
    PdfIcon,
    IconClipboardLink,
    IconCheck,
  },
  mixins: [CopyToClipboard, DownloadReportMixin],
  props: {
    data: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    authorized: {
      type: Boolean,
      default: false,
    },
    loggedIn: {
      type: Boolean,
      default: false,
    },
    membership: {
      type: String,
      default: '',
    },
  },
  computed: {
    shortDate() {
      const date = this.data.assessment_date || this.data.post_date
      return format(parseISO(date), 'MMMM yyyy')
    },
    type() {
      return this.data.type
    },
    name() {
      return this.data.post_title
    },
    routeDefaultBySubscription() {
      const item = getServiceBySubscription(this.membership)
      if (item?.routes.default) {
        const host = window.location.origin
        return `${host}${item?.routes.default}/reports/`
      }
      return null
    },
  },
  methods: {
    handleClick() {
      if (this.downloading) {
        this.cancelDownload()
        return
      }

      if (!this.loggedIn) {
        this.$modal.open('signIn')
        return
      }

      if (!this.authorized) {
        this.openContactModal()
        return
      }
      this.downloadReport(this.data, this.category)
    },
    openContactModal() {
      this.$store.commit('modal/setInitialFields', services[this.membership])
      this.$modal.open('contact')
    },
  },
}
</script>
