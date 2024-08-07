<template>
  <transition
    enter-class="opacity-0"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-500"
    leave-to-class="opacity-0"
  >
    <div
      :aria-hidden="!modalOpen"
      class="bg-s-900 fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-opacity-80"
      @keydown="handleKeyDown"
      @click.self="closeModal"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="file-uploader-modal-title"
        data-testid="file-uploader-modal"
        class="max-w-contact-form-container bg-s-50 shadow-dp-01 w-11/12 rounded-xl px-4 pb-12 pt-12 lg:w-3/4"
        style="max-height: 96vh"
      >
        <div class="px-16">
          <header class="relative w-full text-right">
            <button
              aria-label="Close modal"
              class="absolute -right-8 -top-4"
              type="button"
              @click="closeModal"
            >
              <Icon class="h-5 w-5" name="Close" />
            </button>
          </header>
        </div>

        <div class="h-full overflow-y-auto px-4 pt-8 lg:px-16">
          <client-only>
            <FilePond
              ref="pond"
              allow-multiple
              max-files="3"
              max-total-file-size="10MB"
              :credits="false"
              :accepted-file-types="allowedMimeTypes"
              :file-validate-type-label-expected-types-map="allowedFileTypes"
              :instant-upload="false"
              @updatefiles="onUpdateFiles"
            />
          </client-only>

          <div class="flex justify-end">
            <CommonButton
              variant="primary"
              class="mt-7 text-lg"
              type="button"
              :disabled="fileError"
              :show-spinner="false"
              @click="closeModal"
            >
              Done
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from '@/components/common/Icon.vue'
import AccessibleModalMixin from '@/mixins/AccessibleModalMixin'

export default {
  components: {
    Icon,
  },
  mixins: [AccessibleModalMixin],

  data() {
    return {
      files: [],
      attachmentIds: [],
      modalName: 'fileUploader',
      allowedFileTypes: {
        'text/plain': '.txt',
        'image/png': '.png',
        'image/jpg': '.jpg',
        'image/jpeg': '.jpeg',
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
      fileError: null,
    }
  },

  computed: {
    allowedMimeTypes() {
      return Object.keys(this.allowedFileTypes)
    },
  },

  methods: {
    closeModal() {
      if (!this.files.length || this.fileError) this.$emit('set-files', [])
      else this.$emit('set-files', this.files)

      this.handleClose()
    },
    onUpdateFiles(files) {
      // https://pqina.nl/filepond/docs/api/exports/#filestatus
      this.files = files
      this.fileError = this.files.some((file) => file.status === 8)
    },
    reset() {
      this.$refs.pond.removeFiles()
      this.files = []
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

.filepond--file .filepond--file-status {
  margin-left: 0 !important;
}

.filepond--file-status {
  font-size: 1rem !important;
}

.filepond--file-info {
  margin-right: 0 !important;
}

@media (min-width: 640px) {
  .filepond--file .filepond--file-status {
    margin-left: auto !important;
  }

  .filepond--file-status {
    font-size: inherit !important;
  }

  .filepond--file-info {
    margin-right: 2.5em !important;
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
