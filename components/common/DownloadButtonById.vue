<template>
  <CommonButton
    v-bind="$attrs"
    :variant="downloading ? downloadButtonVariant : $attrs['variant']"
    :data-filename="fileInfo.file_name"
    @click="downloading ? cancelDownload() : downloadReportById(id)"
  >
    <div
      v-if="downloading"
      :class="[downloadingClasses, 'relative flex items-center px-4 py-2']"
    >
      Cancel

      <IconClose class="ml-3 h-4 w-4" />

      <span
        class="button-progress-bar bg-p-500 absolute -bottom-0.5 -left-0.5 h-1 rounded-bl rounded-br"
        :style="progressBarDownloadingStyles"
      ></span>
    </div>

    <slot v-else></slot>
  </CommonButton>
</template>

<script>
import DownloadReportMixin from '~/mixins/DownloadReportMixin'
import IconClose from '@/assets/icons/Close.svg'

export default {
  components: { IconClose },

  mixins: [DownloadReportMixin],

  props: {
    id: {
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
}
</script>
