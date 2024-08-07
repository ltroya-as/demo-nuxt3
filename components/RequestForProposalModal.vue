<template>
  <CommonModal
    modal-name="requestForProposal"
    modal-classes="h-full w-full max-w-contact-form-container rounded-xl bg-white shadow-dp-01 max-h-[85vh] lg:max-h-[800px] relative md:pl-4"
    modal-content-classes="h-full overflow-y-auto"
    modal-header-classes="top-5 right-5 absolute !px-0 z-20"
    button-close-classes="bg-white p-2 rounded-full outline-none absolute top-0 right-0"
  >
    <template #content>
      <div
        class="grid h-full grid-cols-1 overflow-y-auto md:grid-cols-3 lg:grid-cols-2"
      >
        <div
          class="order-last overflow-y-auto px-4 md:order-none md:col-span-2 md:pr-8 lg:col-span-1"
        >
          <h3 class="mb-3 mt-6 hidden text-2xl font-bold lg:block">
            Request for Proposal
          </h3>
          <CommonFormBuilder
            :form-id="$config.public.fmRequestForProposalModalFormId"
            reverse-button-row
            btn-extra-classes="xl:w-auto ml-auto"
            @set-success="setSuccess"
          />
        </div>

        <div
          class="relative h-[330px] overflow-hidden rounded-t-lg md:h-auto md:rounded-l-none md:rounded-r-lg"
        >
          <div class="absolute z-10 p-7 text-white">
            <h2
              class="border-p-500 mb-6 mt-6 border-b-4 pb-2 text-2xl font-bold lg:hidden"
            >
              Request for Proposal
            </h2>
            <h3 class="text-lg font-bold lg:mt-6 lg:text-xl">
              How can we help your take your business further?
            </h3>
            <p>
              We appreciate your interest in Benchmark’s Advisory Services.
              Please complete the form below and our team will be in touch.
            </p>
            <p class="mt-5 lg:mt-0"> Documents can also be uploaded. </p>
          </div>
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
  </CommonModal>
</template>

<script>
import CommonModal from '~/components/common/Modal.vue'

export default {
  components: { CommonModal },
  data() {
    return {
      success: false,
      image: {
        desktop:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,f_auto,q_auto,w_500,h_750/v1712698141/assets/request-for-proposal/Group_1835_viv5kj.png',
        mobile:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,f_auto,q_auto,w_720,h_200/v1712698151/assets/request-for-proposal/samson-ZGjbiukp_-A-unsplash_1_cg9f6y.png',
      },
    }
  },
  methods: {
    setSuccess(value) {
      this.success = value
    },
  },
}
</script>
