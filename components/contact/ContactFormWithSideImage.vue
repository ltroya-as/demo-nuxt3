<template>
  <div
    class="grid h-full grid-cols-1 overflow-y-auto md:grid-cols-3 lg:grid-cols-2"
  >
    <div
      class="order-last overflow-y-auto px-4 md:order-none md:col-span-2 md:pr-8 lg:col-span-1"
    >
      <ContactTabs
        v-if="!hideContactGeneral"
        class="max-w-contact-form-container mx-auto mb-3 w-full pt-4"
        :current-tab="currentTab"
        @change-current-tab="changeCurrentTab"
      />

      <div v-show="!generalContactActive">
        <ContactFormContainer
          ref="form"
          :initial-focus="initialFocus"
          :initial-values="initialFields"
          :show-container="false"
          :show-labels="false"
          :ignore-conditionals="true"
          :always-visible-section-ids="[
            $config.public.fmServiceOfInterestFieldId,
          ]"
        >
          <CommonButton variant="primary" class="text-lg" @click="returnToPage">
            Return to Page
          </CommonButton>
        </ContactFormContainer>
      </div>

      <div v-show="generalContactActive">
        <ContactGeneralContactForm />
      </div>
    </div>

    <div
      class="relative h-[200px] overflow-hidden rounded-t-lg md:h-auto md:rounded-l-none md:rounded-r-lg"
    >
      <picture
        class="absolute left-0 top-0 h-full max-h-full w-full max-w-full"
      >
        <source
          media="(min-width:768px)"
          :srcset="image.desktop"
          class="h-full w-full"
        />
        <source
          media="(max-width:767px)"
          :srcset="image.mobile"
          class="h-full w-full"
        />
        <img
          :src="image.desktop"
          class="h-full w-full object-cover"
          alt="subscriptions"
        />
      </picture>
    </div>
  </div>
</template>

<script>
import ContactGeneralContactForm from '~/components/contact/GeneralContactForm.vue'
import ContactFormContainer from '~/components/contact/FormContainer.vue'
import CommonButton from '~/components/common/Button.vue'
import ContactTabs from '~/components/contact/Tabs.vue'

export default {
  components: {
    ContactGeneralContactForm,
    ContactFormContainer,
    CommonButton,
    ContactTabs,
  },
  props: {
    hideContactGeneral: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentTab: 1,
      modalName: 'contact',
      initialFocus: false,
      initialValues: {},
      success: false,
      image: {
        desktop:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,f_auto,q_auto,w_500,h_750/v1678221022/assets/login/login-1_vp84jy.jpg',
        mobile:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,f_auto,q_auto,w_720,h_200/v1678221022/assets/login/login-1_vp84jy.jpg',
      },
    }
  },
  computed: {
    generalContactActive() {
      return this.currentTab === 2
    },
    modalOpen() {
      return this.$store.state.modal.contactOpen
    },
    initialFields() {
      return this.$store.state.modal.initialFields ?? this.initialValues
    },
  },

  watch: {
    modalOpen() {
      this.currentTab = 1
    },

    initialFields(newValue) {
      this.initialValues = newValue
    },
  },

  methods: {
    changeCurrentTab(tab) {
      this.currentTab = tab
    },

    returnToPage() {
      // Show message and close the modal
      this.$modal.close(this.modalName)
    },
  },
}
</script>
