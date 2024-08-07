<template>
  <div :class="{ 'flex min-h-[70vh] items-center justify-center': success }">
    <CommonFormBuilder
      :show-labels="showLabels"
      :form-id="$config.public.fmGeneralContactFormId"
      button-send-class="mx-auto text-sm !w-full"
      container-details-class="relative flex flex-row-reverse w-full"
      container-button-send-class="flex w-full md:w-1/2"
      details-class="hidden"
      modal-name="contact"
      reverse-button-row
      @set-success="onSuccess"
    />
  </div>
</template>

<script>
import CommonFormBuilder from '~/components/common/FormBuilder.vue'
export default {
  components: { CommonFormBuilder },
  props: {
    showLabels: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      success: false,
    }
  },
  methods: {
    onSuccess(value) {
      this.success = value
    },
  },
}
</script>
