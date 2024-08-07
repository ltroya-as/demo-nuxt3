<template>
  <div class="mb-4">
    <div class="flex flex-col items-center gap-x-7 lg:flex-row lg:items-start">
      <div class="flex w-full flex-col items-center">
        <CommonButton
          variant="primary"
          type="button"
          class="text-lg"
          @click="$modal.open('requestForProposal')"
        >
          Attachments
        </CommonButton>
        <p v-if="attachmentCounter" class="mt-1">
          <span class="font-bold">
            {{ attachmentCounter }}
          </span>
          file(s) added.</p
        >
      </div>

      <p v-if="errorText" class="font-lato text-error text-sm">
        {{ errorText }}
      </p>
      <p
        v-else-if="helpText"
        class="font-lato text-surface-em-medium text-center text-sm lg:text-left"
      >
        {{ helpText }}
      </p>
    </div>

    <RequestForProposalFileUploaderModal
      v-show="$store.state.modal.requestForProposalOpen"
      ref="file-uploader-modal"
      @set-files="setFiles"
    />
  </div>
</template>

<script>
export default {
  props: {
    helpText: {
      type: String,
      default: '',
    },
    errorText: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      files: [],
    }
  },

  computed: {
    attachmentCounter() {
      return this.files.length
    },
  },

  methods: {
    setFiles(files) {
      this.files = files
      this.$emit('input', files)
    },
    reset() {
      this.$refs['file-uploader-modal'].reset()
    },
  },
}
</script>
