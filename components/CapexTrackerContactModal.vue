<template>
  <CommonModal
    modal-name="capexTrackerContact"
    modal-classes="max-w-contact-form-container rounded-xl bg-white px-4 py-12 lg:py-8 shadow-dp-01 max-h-[85vh] lg:max-h-[96vh] relative top-2"
    button-close-classes="absolute -top-8 -right-14 lg:-top-4"
  >
    <template #content>
      <div class="col-span-12 min-h-[65vh] max-w-[450px]">
        <h3 class="border-p-400 mb-4 w-fit border-b-4 p-2 text-sm font-bold">
          Contact - Capital Expenditure
        </h3>
        <div class="mb-4 max-w-[400px] text-sm font-semibold">
          If you would like to learn more about Benchmark's CapEx Tracker,
          please fill out the form below
        </div>
        <div
          :class="{ 'flex min-h-[50vh] items-center justify-center': success }"
        >
          <CommonFormBuilder
            :form-id="$config.public.fmCapexTrackerContactUsFormId"
            reverse-button-row
            container-button-send-class="w-full"
            button-send-class="mx-auto text-sm !w-full"
            container-details-class="flex flex-col items-center justify-center"
            text-button="Submit"
            modal-name="capexTrackerContact"
            :is-modal="false"
            @set-success="setSuccess"
          />
        </div>
      </div>
    </template>
  </CommonModal>
</template>

<script>
import CommonFormBuilder from '~/components/common/FormBuilder.vue'
import CommonModal from '~/components/common/Modal.vue'

export default {
  components: { CommonFormBuilder, CommonModal },
  data() {
    return {
      success: false,
    }
  },
  methods: {
    setSuccess(value) {
      this.success = value
    },
  },
}
</script>
