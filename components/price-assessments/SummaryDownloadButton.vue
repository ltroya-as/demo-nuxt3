<template>
  <SharedCommonButtonDownload
    v-if="methodologyFileInfo"
    :data-filename="reportName"
    class="mx-0 !w-full !text-sm lg:!min-w-[150px] lg:!max-w-[150px]"
    :download-file="methodologyFileInfo"
    variant="secondary"
    text="Methodology"
  />
</template>
<script>
import SharedCommonButtonDownload from '~/components/shared/common/ButtonDownload.vue'
export default {
  components: { SharedCommonButtonDownload },
  props: {
    methodologyFileInfo: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    reportName() {
      return this.methodologyFileInfo?.file_name
    },
  },
}
</script>
