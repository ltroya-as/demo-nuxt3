<template>
  <CommonModal
    modal-name="newsletter"
    modal-classes="max-w-contact-form-container rounded-xl bg-white px-4 py-12 lg:py-8 shadow-dp-01 max-h-[85vh] lg:max-h-[96vh] relative top-2"
    modal-content-classes="h-full overflow-y-auto px-4 pt-4 lg:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-5"
    button-close-classes="absolute -top-8 -right-14 lg:-top-4"
  >
    <template #content>
      <div class="col-span-6">
        <h3 class="mb-4 text-xl font-bold lg:text-2xl">
          Sign up for Benchmark’s free newsletter now
        </h3>
        <img
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1679517219/assets/newsletter/newsletter-image_trpi3a.png"
          alt="newsletter-image"
        />
        <div class="mx-auto max-w-fit lg:mx-0 lg:max-w-full">
          <ul class="mt-small flex max-w-[425px] flex-col gap-3 text-sm">
            <li
              v-for="sentence in sentences"
              :key="sentence"
              class="flex gap-2.5"
            >
              <div class="w-5">
                <IconCheckCircle class="text-bga2022-green-300 h-5 w-5" />
              </div>

              {{ sentence }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-6">
        <CommonFormBuilder
          :form-id="$config.public.fmNewsletterFormId"
          :show-success-message="false"
          reverse-button-row
          container-button-send-class="w-full"
          button-send-class="mx-auto text-sm !w-full"
          container-details-class="flex flex-col items-center justify-center"
          :is-modal="false"
          @set-success="setSuccess"
        />
      </div>
    </template>
  </CommonModal>
</template>

<script>
import IconCheckCircle from '~/assets/icons/CheckCircle.svg'
import CommonFormBuilder from '~/components/common/FormBuilder.vue'
import CommonModal from '~/components/common/Modal.vue'
import { NEWSLETTER_SENTENCES } from '~/constants/services/constants'

export default {
  components: { CommonFormBuilder, CommonModal, IconCheckCircle },
  data() {
    return {
      sentences: NEWSLETTER_SENTENCES,
    }
  },
  methods: {
    setSuccess(value) {
      this.success = value
      this.$emit('set-success', value)
    },
  },
}
</script>
