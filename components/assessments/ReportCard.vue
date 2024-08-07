<template>
  <div
    class="shadow-dp-04 group relative flex h-16 cursor-pointer items-center overflow-hidden rounded-lg lg:h-32"
    :class="[
      downloading ? 'bg-s-100 hover:bg-s-100' : 'bg-p-50 hover:bg-p-100',
    ]"
    data-testid="report-card"
    :data-filename="data.file_name"
    :title="data.post_title"
  >
    <span
      class="button-progress-bar"
      :style="progressBarDownloadingStylesForCard"
    />

    <div
      class="text-p-em-high flex h-full items-center justify-center rounded-lg px-2 group-hover:text-white md:px-5 lg:px-6"
      :class="[downloading ? 'bg-s-300 group-hover:bg-s-600' : 'bg-p-400']"
      @click="handleClick"
    >
      <IconClose v-if="downloading" class="h-7 w-7" />
      <IconPdf v-else class="w-7" />
    </div>

    <div
      class="flex flex-1 flex-row p-6 pl-2 pr-5 font-semibold uppercase md:px-5 lg:px-6"
      @click="handleClick"
    >
      <p
        class="line-clamp-3 text-xs md:text-xs lg:text-base"
        v-text="data.post_title"
      ></p>
    </div>
    <div
      v-if="isDownloadLinkCopyable"
      class="absolute right-2 top-1 flex cursor-pointer justify-end text-xl md:right-3 md:top-2"
      :title="reportMessageTooltip"
    >
      <IconClipboard
        v-if="!reportCopied"
        class="h-[12px] md:h-[16px]"
        @click="copyRouteReport(data)"
      />
      <IconCheck v-else class="h-[12px] md:h-[16px]" />
    </div>
  </div>
</template>

<script>
import IconPdf from '@/assets/icons/Pdf.svg'
import IconClose from '@/assets/icons/Close.svg'
import { services } from '@/constants/services'
import DownloadReportMixin from '~/mixins/DownloadReportMixin'
import CopyToClipboard from '~/mixins/CopyToClipboard'
import IconClipboard from '~/assets/icons/IconClipboard.svg'
import IconCheck from '~/assets/icons/IconCheck.svg'

export default {
  components: {
    IconPdf,
    IconClose,
    IconClipboard,
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

    membership: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick() {
      if (this.downloading) {
        this.cancelDownload()
        return
      }

      this.authorized
        ? this.downloadReport(this.data, this.category)
        : this.openContactModal()
    },

    openContactModal() {
      this.$store.commit('modal/setInitialFields', services[this.membership])
      this.$modal.open('contact')
    },
  },
}
</script>
