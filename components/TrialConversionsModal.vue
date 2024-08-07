<template>
  <CommonModal modal-name="trialConversions">
    <template #content>
      <div class="max-w-md">
        <h3 class="mb-8 text-2xl font-bold">{{ modalTitle }}</h3>
        <p class="mb-6 text-lg">
          To renew with your {{ subscriptionName }} subscription, please check
          and submit your details below.
        </p>
        <CommonFormBuilder
          :default-values="defaultValues"
          :form-id="$config.public.trialConversionsFormId"
          :initial-focus="false"
          details-class="hidden"
          button-send-classes="md:!w-full"
          container-button-send-classes="lg:w-full"
          text-button="Submit"
        />
      </div>
    </template>
  </CommonModal>
</template>

<script>
import CommonFormBuilder from '@/components/common/FormBuilder.vue'
import CommonModal from '@/components/common/Modal.vue'
export default {
  components: { CommonFormBuilder, CommonModal },

  computed: {
    defaultValues() {
      return this.$store.state.modal.subscriptionRenewData.defaultValues
    },
    subscriptionName() {
      return this.$store.state.modal.subscriptionRenewData.subName
    },
    modalTitle() {
      return `Renew ${this.subscriptionName}`
    },
  },
}
</script>
