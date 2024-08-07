<template>
  <CommonModal
    :modal-name="modalName"
    modal-classes="h-full w-full max-w-contact-form-container rounded-xl bg-white shadow-dp-01 max-h-[85vh] lg:max-h-[800px] relative md:pl-4"
    modal-content-classes="h-full overflow-y-auto"
    modal-header-classes="top-5 right-5 absolute !px-0 z-10"
    button-close-classes="bg-white p-2 rounded-full outline-none absolute top-0 right-0"
  >
    <template #content>
      <ContactFormWithSideImage />
    </template>
  </CommonModal>
</template>

<script>
import ContactFormWithSideImage from '~/components/contact/ContactFormWithSideImage.vue'
import CommonModal from '~/components/common/Modal.vue'

export default {
  components: {
    CommonModal,
    ContactFormWithSideImage,
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
