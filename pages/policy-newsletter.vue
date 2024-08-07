<template>
  <div class="relative w-full flex-grow">
    <div class="gap-x-big absolute hidden h-full w-full lg:grid lg:grid-cols-2">
      <div
        data-testid="policy-newsletter-image"
        class="bg-black bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1246,f_auto/v1703177178/assets/policy-newsletter/Policy_Newsletter_kzgqih.png')] bg-cover bg-center bg-no-repeat"
      ></div>
    </div>

    <div
      class="max-w-content-container gap-x-big relative z-10 mx-auto grid w-full grid-cols-1 lg:grid-cols-2"
    >
      <div
        class="px-small lg:pl-big w-full bg-black bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1015,f_auto/v1703166117/assets/policy-newsletter/Mask_group_5_vwdupl.png')] bg-cover bg-[center_bottom_25%] bg-no-repeat pb-96 pt-3 text-white lg:min-h-[1000px] lg:bg-inherit lg:bg-none lg:pb-32 2xl:px-0"
      >
        <div class="bg-black/10 pb-3 backdrop-blur-sm">
          <FreePricesNavigation
            class="mb-6 lg:mb-5"
            active-menu="Policy Newsletter"
          />
          <h3
            class="mb-3 text-2xl font-semibold lg:text-3xl lg:font-bold xl:pr-32"
          >
            Sign up for Benchmark’s Policy Newsletter
          </h3>
          <div class="mb-4">
            Free governmental policy changes direct to your email every two
            weeks. You will receive:
          </div>
          <div class="mx-auto max-w-fit lg:mx-0 lg:max-w-full">
            <ul class="flex max-w-2xl flex-col gap-3 text-sm">
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
      </div>
      <div
        class="px-small lg:pr-big w-full pb-8 pt-4 lg:pb-32 lg:pt-10 2xl:px-0"
        :class="{ 'flex items-center justify-center': success }"
      >
        <div>
          <h3
            class="mb-7 text-lg font-semibold lg:mb-14 lg:text-xl lg:font-bold"
          >
            To gain access fill out the form below
          </h3>
          <CommonFormBuilder
            class="mx-auto"
            :class="formClass"
            text-button="Sign up now!"
            :default-values="defaultValues"
            :form-id="$config.public.fmPolicyNewsletterFormId"
            :initial-focus="false"
            :show-link-privacy-policy="false"
            field-bg-color="white"
            container-details-class="flex flex-col items-center justify-center"
            container-button-send-class="w-full"
            button-send-class="!w-full"
            @set-success="onSuccess"
            @page-number="onChangePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonFormBuilder from '~/components/common/FormBuilder.vue'
import FreePricesNavigation from '~/components/navigation/FreePricesNavigation'
import IconCheckCircle from '~/assets/icons/CheckCircle.svg'
import { POLICY_NEWSLETTER_SENTENCES } from '~/constants/services/constants'

export default {
  components: { IconCheckCircle, CommonFormBuilder, FreePricesNavigation },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Policy Newsletter' })
    useHead(seo)
  },
  data() {
    return {
      defaultValues: {},
      sentences: POLICY_NEWSLETTER_SENTENCES,
      success: false,
      formClass: 'max-w-[500px] px-4',
    }
  },
  methods: {
    onSuccess(value) {
      this.success = value
    },
    onChangePage(pageNumber) {
      if (pageNumber === 2) {
        this.formClass = 'max-w-[500px]'
      } else {
        this.formClass = 'max-w-[500px] px-4'
      }
    },
  },
}
</script>
