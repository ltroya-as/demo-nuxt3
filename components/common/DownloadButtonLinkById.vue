<template>
  <CommonButton
    v-bind="$attrs"
    :variant="$attrs['variant']"
    @click="downloading ? cancelDownload() : downloadReportById(id)"
  >
    <span class="group flex items-center">
      {{ text }}

      <DownloadReportIcon
        v-if="!downloading"
        class="group:hover:text-p-900 ml-1 h-4 w-4"
      />

      <CommonCircularProgressBar
        v-if="downloading"
        :progress="downloadProgress"
        class="ml-0.5"
      />
    </span>
  </CommonButton>
</template>

<script>
import DownloadReportMixin from '~/mixins/DownloadReportMixin'
import DownloadReportIcon from '~/assets/icons/DownloadReportIcon.svg'
import CommonButton from '~/components/common/Button.vue'
import CommonCircularProgressBar from '~/components/common/CircularProgressBar.vue'

export default {
  components: {
    CommonButton,
    CommonCircularProgressBar,
    DownloadReportIcon,
  },

  mixins: [DownloadReportMixin],

  props: {
    fileId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    fileInfo: {
      type: Object,
      default: () => ({}),
    },
    category: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      // We declare the id here instead of the prop to avoid
      // any conflict with the html id attribute
      id: this.fileId,
    }
  },
}
</script>
