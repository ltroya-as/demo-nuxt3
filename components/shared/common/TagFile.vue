<template>
  <div
    v-if="isFileTypeValid"
    class="bg-s-900 absolute left-0 top-8 flex w-full max-w-max flex-row items-center justify-between gap-x-2 p-1 pr-2 text-sm font-semibold leading-5 text-white md:top-5 md:pl-3"
  >
    <IconPDF
      v-if="isPDF"
      class="w-full min-w-[22px] max-w-[22px] md:min-w-[20px] md:max-w-[20px]"
    />
    <IconVIDEO
      v-else-if="isVIDEO"
      class="w-full min-w-[22px] max-w-[22px] md:min-w-[20px] md:max-w-[20px]"
    />
    <IconPPTX v-else-if="isPowerPoint" class="w-[24px]" />
    <IconExcel
      v-else
      class="w-full min-w-[22px] max-w-[22px] md:min-w-[20px] md:max-w-[20px]"
    />
    <span>{{ fileType }}</span>
  </div>
</template>
<script>
import IconExcel from '~/assets/icons/icon-excel.svg'
import IconPDF from '~/assets/icons/icon-pdf.svg'
import IconVIDEO from '~/assets/icons/icon-video.svg'
import IconPPTX from '~/assets/icons/icon-pptx.svg'
export default {
  components: { IconExcel, IconPDF, IconVIDEO, IconPPTX },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
  computed: {
    fileType() {
      if (this.type) {
        return this.type.toUpperCase()
      }
      return 'PDF'
    },
    isPowerPoint() {
      return this.fileType === 'PPT'
    },
    isPDF() {
      return this.fileType === 'PDF'
    },
    isVIDEO() {
      return ['VIDEO', 'MP4'].includes(this.fileType)
    },
    isFileTypeValid() {
      return ['PDF', 'EXCEL', 'VIDEO', 'XLSX', 'MP4', 'PPT'].includes(
        this.fileType,
      )
    },
  },
}
</script>
