<template>
  <div
    class="flex flex-row items-center justify-center gap-2 md:gap-4"
    :class="[$attrs.class]"
    data-testid="services-group-buttons"
  >
    <ButtonContactUs
      text="Find out more"
      :services="initialFields"
      class="!w-fit flex-shrink-0 text-sm font-semibold leading-5"
    />

    <CommonButton
      v-if="file && file.url"
      class="mx-0 w-full text-sm font-semibold leading-5"
      :class="[maxWidth]"
      variant="secondary"
      @click="$router.push(file.url)"
    >
      {{ downloadText }}
    </CommonButton>

    <ButtonDownload
      v-if="file && file.ID && false"
      class="mx-0 w-full text-sm font-semibold leading-5"
      :class="[maxWidth]"
      variant="secondary"
      :text="downloadText"
      :download-file="file"
    />
  </div>
</template>
<script>
import CommonButton from '~/components/common/Button.vue'
import ButtonDownload from '~/components/shared/common/ButtonDownload.vue'
import ButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'

export default {
  components: { ButtonContactUs, CommonButton, ButtonDownload },
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
    maxWidth() {
      return this.downloadText === 'Methodology'
        ? 'max-w-[200px]'
        : 'max-w-[160px]'
    },
  },
}
</script>
