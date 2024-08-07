<template>
  <div
    :id="containerId"
    data-testid="contact-form-container"
    class="contact-form-container max-w-contact-form-container relative mx-auto flex min-h-[550px] w-full justify-center pb-10 lg:w-auto"
    :class="
      showContainer && 'bg-s-50 shadow-dp-01 rounded-xl px-4 py-4 lg:px-8'
    "
  >
    <!-- Message -->
    <div
      class="left-0 top-0 flex h-full items-center justify-center transition-opacity duration-500"
      :class="{
        'w-0 overflow-hidden lg:invisible lg:absolute lg:w-auto lg:overflow-auto':
          !success,
        'opacity-0': !success,
        'w-full opacity-100': success,
      }"
    >
      <div class="mx-10 my-10 text-center">
        <ContactSuccessMessage :message="message" />

        <div class="flex flex-col items-center justify-center gap-y-2">
          <slot>
            <CommonButton
              v-if="showReturnToHomeButton"
              variant="primary"
              class="text-lg"
              link="/"
            >
              Return to Homepage
            </CommonButton>
            <CommonButton
              v-if="showReturnToFormButton"
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
      v-if="!success"
      class="flex h-full w-full flex-col items-center justify-center transition-opacity duration-500"
    >
      <h2
        v-if="showDefaultTitle"
        id="signin-modal-title"
        class="mb-12 text-center text-3xl font-extrabold text-gray-900"
      >
        Contact us
      </h2>

      <slot name="description"></slot>
      <CommonFormBuilder
        reverse-button-row
        button-send-class="mx-auto text-sm !w-full"
        :show-link-privacy-policy="showLinkPrivacyPolicy"
        :form-id="contactFormId"
        :show-success-message="false"
        :show-services="showServices"
        :initial-focus="initialFocus"
        :is-modal="isModal"
        :show-labels="showLabels"
        :default-values="initialValues"
        :always-visible-section-ids="alwaysVisibleSectionIds"
        :ignore-conditionals="ignoreConditionals"
        text-button="Submit"
        @set-success="setSuccess"
      >
      </CommonFormBuilder>
    </div>
  </div>
</template>

<script>
import CommonFormBuilder from '~/components/common/FormBuilder.vue'
import ContactSuccessMessage from '~/components/contact/SuccessMessage.vue'
import CommonButton from '~/components/common/Button.vue'

export default {
  components: {
    CommonFormBuilder,
    CommonButton,
    ContactSuccessMessage,
  },
  props: {
    formId: {
      type: [String, Number],
      default: null,
    },
    message: {
      type: String,
      default: `Thank you for contacting us, one of our team will be in touch shortly.`,
    },
    containerId: {
      type: String,
      default: '',
    },
    defaultValues: {
      type: Object,
      default: () => ({}),
    },
    showLabels: {
      type: Boolean,
      default: true,
    },
    showContainer: {
      type: Boolean,
      default: true,
    },
    showServices: {
      type: Boolean,
      default: true,
    },
    showDefaultTitle: {
      type: Boolean,
      default: false,
    },
    showReturnToFormButton: {
      type: Boolean,
      default: true,
    },
    showReturnToHomeButton: {
      type: Boolean,
      default: true,
    },
    showLinkPrivacyPolicy: {
      type: Boolean,
      default: true,
    },
    initialFocus: {
      type: Boolean,
      default: true,
    },
    initialValues: {
      type: Object,
      default: () => null,
    },
    isModal: {
      type: Boolean,
      default: false,
    },
    alwaysVisibleSectionIds: {
      type: Array,
      default: () => [],
    },
    ignoreConditionals: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentTab: 2,
      success: false,
    }
  },

  computed: {
    contactFormId() {
      return this.formId ?? this.$config.public.fmContactFormId
    },
    contactModalOpen() {
      return this.$store.state.modal.contactOpen
    },
  },

  watch: {
    contactModalOpen(opened) {
      /*
        Waits until the modal's fade out animation
        ends in order to change the modal's state;
        otherwise, the form briefly shows up during
        the animation.
      */
      if (!opened) {
        setTimeout(() => {
          this.success = false
        }, 2000)
      }
    },

    success(value) {
      /*
        Scrolls up to the success message, either on
        mobile and tablet resolutions.
      */
      if (value && this.containerId) {
        const viewportWidth = Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0,
        )

        if (viewportWidth < 1024) {
          document.getElementById(this.containerId).scrollIntoView()
        }
      }
    },
  },

  methods: {
    changeTab(tab) {
      this.tab = tab
    },
    setSuccess(value) {
      this.success = value
      this.$emit('set-success', value)
    },
  },
}
</script>
