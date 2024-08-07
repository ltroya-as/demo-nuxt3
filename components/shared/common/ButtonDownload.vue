<template>
  <button
    type="button"
    class="relative flex w-full flex-row items-center justify-center gap-x-1 overflow-hidden rounded-md border px-4 py-3 text-base font-semibold leading-5 lg:gap-x-3"
    :class="[baseClasses, $attrs.class]"
    @click="handlerDownload()"
  >
    <IconDownload
      v-if="isButtonDownload && !downloading && showIcon"
      class="z-index w-full min-w-[16px] max-w-[16px]"
    />
    <IconClose
      v-if="isButtonDownload && downloading && showIcon"
      class="z-index w-full min-w-[16px] max-w-[16px]"
    />
    <span v-if="isButtonDownload && showLabel" class="z-index">
      {{ buttonText }}
    </span>
    <span
      v-if="isButtonDownload"
      class="progress-bar-container"
      :class="backgroundColorDownload"
      :style="progressBarDownloadingStyles"
    ></span>
    <NavigationLink v-if="!isButtonDownload" :url="url">
      {{ buttonText }}
    </NavigationLink>
  </button>
</template>

<script>
import IconClose from '~/assets/icons/Close.svg'
import IconDownload from '~/assets/icons/icon-download.svg'
import DownloadReportMixin from '~/mixins/DownloadReportMixin'
import ButtonClassesAndEvent from '~/mixins/ButtonClassesAndEvent'
import NavigationLink from '~/components/shared/navigation/Link.vue'
export default {
  components: { IconClose, IconDownload, NavigationLink },
  mixins: [ButtonClassesAndEvent, DownloadReportMixin],
  props: {
    text: {
      type: String,
      default: 'Download',
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    downloadFile: {
      type: Object,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    buttonText() {
      return this.downloading ? 'Cancel' : this.text
    },
    downloadCategory() {
      return this.downloadFile?.category
    },
    isButtonDownload() {
      return this.url === '' || this.url === undefined || this.url === null
    },
    url() {
      return this.downloadFile?.url || ''
    },
  },
  methods: {
    handlerDownload() {
      if (this.isButtonDownload) {
        if (this.downloading) {
          this.cancelDownload()
          return
        }
        if (this.downloadFile?.isVideoVimeo) {
          this.downloadVideoVimeo(
            this.downloadFile?.vimeoId,
            this.downloadFile?.vimeoAuthToken,
          )
        } else {
          this.downloadReport(this.downloadFile, this.downloadCategory)
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.progress-bar-container {
  position: absolute;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
  height: 100%;
  bottom: 0;
  left: 0;
  z-index: 1;
  border-radius: 0;
}
.z-index {
  z-index: 2;
}
</style>
