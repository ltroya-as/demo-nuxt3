<template>
  <div class="mb-5">
    <div class="flex flex-col items-center gap-x-7 lg:flex-row lg:items-start">
      <div class="flex w-full flex-col font-semibold">
        <p class="mb-2 text-xs">
          {{ label }}
        </p>
        <div
          class="border-s-500 font-lato flex max-h-[34px] w-full flex-row items-center justify-end rounded border border-r-0 pl-4"
        >
          <p v-if="attachmentCounter">
            <span class="font-bold">
              {{ attachmentCounter }}
            </span>
            file(s) added.</p
          >
          <CommonButton
            variant="primary"
            type="button"
            class="text-md w-auto !py-1"
            @click="$modal.open('fileUploader')"
          >
            Select files
          </CommonButton>
        </div>
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

    <CommonFileUploaderModal
      v-show="$store.state.modal.fileUploaderOpen"
      ref="formidable-file-uploader-modal"
      @set-files="setFiles"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null,
    },

    label: {
      type: String,
      required: true,
    },

    id: {
      type: String,
      default: null,
    },

    modelValue: {
      type: Array,
      required: true,
    },
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
      return this.files?.length
    },
  },

  watch: {
    modelValue(newValue) {
      this.files = newValue
      if (!newValue?.length) this.reset()
    },
  },

  methods: {
    setFiles(files) {
      this.files = files
      this.$emit('update:modelValue', files)
    },
    reset() {
      this.$refs['formidable-file-uploader-modal'].reset()
    },
  },
}
</script>
