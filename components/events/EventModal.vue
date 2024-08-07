<template>
  <CommonModal
    :modal-name="modalName"
    :modal-classes="modalClasses"
    :modal-content-classes="modalContentClasses"
    modal-header-classes="-top-2.5 right-5 absolute !px-0 z-10"
    button-close-classes="bg-white p-2 rounded-full outline-none absolute top-0 right-0"
  >
    <template #content>
      <ContactFormContainer
        ref="form"
        :form-id="$config.public.fmEventsFormId"
        :show-container="false"
      />
    </template>
  </CommonModal>
</template>

<script>
import CommonModal from '~/components/common/Modal.vue'
import ContactFormContainer from '~/components/contact/FormContainer.vue'

export default {
  components: { ContactFormContainer, CommonModal },
  props: {
    formId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    modalName() {
      return 'event'
    },
    modalContentClasses() {
      return 'h-full overflow-y-auto px-4 md:px-8 pb-2 pt-5'
    },
    modalClasses() {
      return 'h-full w-full max-w-xl rounded-xl bg-white shadow-dp-01 max-h-[85vh] lg:max-h-[800px] relative py-4 px-2'
    },
  },
}
</script>
