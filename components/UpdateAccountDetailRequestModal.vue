<template>
  <CommonModal
    modal-name="updateAccountDetailRequest"
    modal-header-classes="!px-4"
  >
    <template #content>
      <div class="max-w-md">
        <h3 class="mb-8 text-2xl font-bold">Update Account Details</h3>
        <CommonFormBuilder
          :form-id="$config.public.fmUpdateAccountDetailRequest"
          :initial-focus="false"
          details-class="hidden"
          button-send-classes="md:!w-full"
          container-button-send-classes="lg:w-full"
          text-button="Submit"
          modal-content-classes="h-full overflow-y-auto px-4 pt-4"
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
}
</script>
