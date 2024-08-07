<template>
  <div
    class="flex flex-row items-center justify-center gap-2 md:gap-4"
    :class="[$attrs.class]"
    data-testid="services-group-buttons"
  >
    <ContactUsButton
      text="Find out more"
      :services="initialFields"
      class="!h-full !max-h-[44px] !min-h-[44px] !w-fit flex-shrink-0 text-base font-semibold leading-5 md:!w-full md:!min-w-[160px] md:!max-w-[160px] lg:!min-w-[160px] lg:!max-w-[160px]"
    />

    <CommonButton
      v-if="file && file.url"
      class="mx-0 w-full text-sm font-semibold leading-5"
      :class="[classesCustom]"
      variant="secondary"
      @click="$router.push(file.url)"
    >
      {{ downloadText }}
    </CommonButton>

    <DownloadButton
      v-if="file && file.ID"
      class="mx-0 w-full text-sm font-semibold leading-5"
      :class="[classesCustom]"
      variant="secondary"
      :text="downloadText"
      :download-file="file"
    />
  </div>
</template>
<script>
import CommonButton from '~/components/common/Button.vue'
import ContactUsButton from '~/components/shared/common/ButtonContactUs.vue'
import DownloadButton from '~/components/shared/common/ButtonDownload.vue'

export default {
  components: { ContactUsButton, CommonButton, DownloadButton },
  props: {
    downloadText: {
      type: String,
      default: 'Methodology',
    },
    initialFields: {
      type: Array,
      required: true,
    },
    file: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    classesCustom() {
      return this.downloadText === 'Methodology'
        ? '!max-w-[160px] !min-w-[160px] md:!max-w-[200px] md:!min-w-[200px] md:!w-full !min-h-[44px] !max-h-[44px] !h-full'
        : 'md:!max-w-[160px] md:!min-w-[160px] md:!w-full  !min-h-[44px] !max-h-[44px] !h-full'
    },
  },
}
</script>
