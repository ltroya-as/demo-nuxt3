<template>
  <div
    :class="[$attrs.class]"
    class="flex flex-wrap items-start justify-between md:items-center"
  >
    <div class="flex flex-wrap gap-3">
      <CommonButton
        extra-classes="!w-fit text-sm font-semibold px-10 py-3"
        variant="primary"
        @click="openContactModal()"
      >
        Find out more
      </CommonButton>
      <div v-if="methodologyFileInfo">
        <CommonButton
          extra-classes="!w-fit text-sm px-6 py-3"
          variant="tertiary"
          :disabled="downloading"
          @click="downloadMethodology"
        >
          Methodology
        </CommonButton>
      </div>
    </div>
    <LinkWithAnimation
      text="Contact Us"
      class="font-semibold"
      @click="openContactModal()"
    />
  </div>
</template>

<script>
import CommonButton from '~/components/common/Button.vue'
import DownloadReportMixin from '~/mixins/DownloadReportMixin'
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'

export default {
  components: { LinkWithAnimation, CommonButton },
  mixins: [DownloadReportMixin],
  props: {
    methodologyFileInfo: {
      type: Object,
      default: () => null,
    },
    containerClasses: {
      type: String,
      default: 'flex flex-col lg:flex-row',
    },
  },

  methods: {
    downloadMethodology() {
      this.methodologyFileInfo &&
        this.downloadReport(
          this.methodologyFileInfo,
          this.methodologyFileInfo.category,
        )
    },
    openContactModal() {
      this.$modal.open('contact')
    },
  },
}
</script>
