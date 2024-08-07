<template>
  <div
    data-testid="contact-form-container"
    class="max-w-contact-form-container bg-s-50 shadow-dp-01 relative mx-auto flex justify-center rounded-xl px-4 py-10 lg:px-20 lg:py-14"
  >
    <!-- Message -->
    <div
      class="absolute left-0 top-0 flex h-full w-full items-center justify-center transition-all duration-500"
      :class="{
        invisible: !success,
        'opacity-0': !success,
        'opacity-100': success,
      }"
    >
      <div class="mx-14 my-20 text-center">
        <ContactSuccessMessage :message="message" />

        <div class="flex flex-col items-center justify-center gap-y-2">
          <slot>
            <CommonButton variant="primary" class="text-lg" link="/">
              Return to Homepage
            </CommonButton>
            <CommonButton
              variant="tertiary"
              class="text-lg"
              @click="success = false"
            >
              Return to form
            </CommonButton>
          </slot>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div
      class="h-full transition-all duration-500"
      :class="{
        invisible: success,
        'opacity-0': success,
        'opacity-100': !success,
      }"
    >
      <CommonFormBuilder
        :form-id="$config.public.fmRequestForProposalFormId"
        reverse-button-row
        btn-extra-classes="xl:w-auto ml-auto"
        @set-success="setSuccess"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: `Thank you for contacting us, one of our team will be
                in touch in the next working day.`,
    },
  },

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
