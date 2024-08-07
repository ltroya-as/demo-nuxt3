<template>
  <CommonModal
    :modal-name="modalName"
    modal-classes="w-11/12 max-w-contact-form-container rounded-xl bg-s-50 px-4 pt-12 pb-12 shadow-dp-01 lg:w-1/2"
  >
    <template #content>
      <client-only>
        <FilePond
          ref="pond"
          allow-multiple="true"
          max-files="3"
          credits="false"
          max-total-file-size="10MB"
          :accepted-file-types="allowedMimeTypes"
          :file-validate-type-label-expected-types-map="allowedFileTypes"
          :onupdatefiles="setFiles"
          :instant-upload="false"
        />
      </client-only>

      <div class="flex justify-end">
        <CommonButton
          variant="primary"
          class="mt-7 text-lg"
          type="button"
          @click="done"
        >
          Done
        </CommonButton>
      </div>
    </template>
  </CommonModal>
</template>

<script>
export default {
  data() {
    return {
      modalName: 'requestForProposal',
      allowedFileTypes: {
        'text/plain': '.txt',
        'application/zip': '.zip',
        'application/pdf': '.pdf',
        'application/msword': '.doc',
        'application/vnd.ms-powerpoint': '.ppt',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          '.xlsx',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          '.docx',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          '.pptx',
        'application/vnd.ms-excel': '.xls',
      },
    }
  },

  computed: {
    allowedMimeTypes() {
      return Object.keys(this.allowedFileTypes)
    },
  },

  methods: {
    setFiles() {
      this.$emit('set-files', this.$refs.pond.getFiles())
    },
    reset() {
      this.$refs.pond.removeFiles()
    },
    done() {
      this.$modal.close(this.modalName)
    },
  },
}
</script>

<style lang="scss">
/* stylelint-disable selector-class-pattern */
.filepond--root {
  height: 300px;
  width: 100%;
  font-size: 1.5rem !important;
  font-family: Montserrat, sans-serif !important;
}

@media (min-width: 1024px) {
  /* stylelint-disable-next-line selector-class-pattern */
  .filepond--root {
    width: 100%;
  }
}

.filepond--panel-root {
  border-style: dashed;
  border-width: 2px;
  @apply border-s-400 bg-s-100 rounded-md #{!important};
}

.filepond--drop-label {
  @apply text-surface-em-medium text-base #{!important};
}

.filepond--file-status-main {
  @apply text-black opacity-80 #{!important};
}

.filepond--file-status-sub {
  @apply opacity-100 #{!important};
}
</style>
