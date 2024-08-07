<template>
  <CommonModal
    :modal-name="modalName"
    :modal-classes="modalClasses"
    :modal-content-classes="modalContentClasses"
    modal-header-classes="top-5 right-5 absolute !px-0 z-10"
    button-close-classes="bg-white p-2 rounded-full outline-none absolute top-0 right-0"
  >
    <template #content>
      <div
        class="border-p-500 ml-4 inline-block border-b-4 p-2 text-sm font-bold"
      >
        {{ modalConfiguration.title }}
      </div>

      <div class="order-last px-4 md:order-none">
        <ContactFormContainer
          ref="form"
          :initial-focus="initialFocus"
          :initial-values="initialFields"
          :form-id="$config.public.fmDataContract"
          :default-values="defaultValues"
          :show-container="false"
          :show-labels="false"
        >
          <template #description>
            <h4 class="mt-2 py-4 text-base font-semibold">
              If you would like to learn more about Benchmark's
              {{ modalConfiguration.productDescription }} and about using our
              data in contracts, please fill out the form below
            </h4>
          </template>

          <CommonButton variant="primary" class="text-lg" @click="returnToPage">
            Return to Page
          </CommonButton>
        </ContactFormContainer>
      </div>
    </template>
  </CommonModal>
</template>

<script>
import ContactFormContainer from '~/components/contact/FormContainer.vue'
import CommonButton from '~/components/common/Button.vue'
import CommonModal from '~/components/common/Modal.vue'
import RouteHelperMixin from '~/mixins/RouteHelperMixin'

export default {
  components: {
    ContactFormContainer,
    CommonButton,
    CommonModal,
  },
  mixins: [RouteHelperMixin],
  data() {
    return {
      modalName: 'subscribe',
      initialFocus: false,
      initialValues: {},
      success: false,
    }
  },
  computed: {
    defaultValues() {
      return {
        [this.$config.public.fmPurposeMetaFieldId]: 'For use in Contracts',
      }
    },
    modalContentClasses() {
      return 'h-full overflow-y-auto'
    },
    modalClasses() {
      return 'h-full w-full max-w-xl rounded-xl bg-white shadow-dp-01 max-h-[85vh] lg:max-h-[770px] relative  pb-4 md:pt-4 md:px-4'
    },
    modalOpen() {
      return this.$store.state.modal.contactOpen
    },
    modalConfiguration() {
      if (this.isMarketAssessments()) {
        return {
          productDescription: 'market assessments',
          title: 'Contact - Market Assessment Team',
        }
      }

      if (this.isForecast()) {
        return {
          productDescription: 'forecasts',
          title: 'Contact - Forecasting Team',
        }
      }

      return {
        productDescription: 'price assessments',
        title: 'Contact - Pricing Team',
      }
    },
    initialFields() {
      return this.$store.state.modal.initialFields ?? this.initialValues
    },
  },

  watch: {
    modalOpen(open) {
      this.initialFocus = open
    },

    initialFields(newValue) {
      this.initialValues = newValue
    },
  },

  methods: {
    returnToPage() {
      // Show message and close the modal
      this.$modal.close(this.modalName)
    },
  },
}
</script>
