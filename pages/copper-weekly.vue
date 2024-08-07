<template>
  <div class="relative w-full flex-grow">
    <div class="gap-x-big absolute hidden h-full w-full lg:grid lg:grid-cols-2">
      <div
        data-testid="newsletter-signup-image"
        class="bg-black bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1246,f_auto/v1715973359/assets/copper-weekly/copper-weekly_ufh8vr.png')] bg-cover bg-center bg-no-repeat"
      ></div>
    </div>
    <div
      class="max-w-content-container gap-x-big relative z-10 mx-auto grid w-full grid-cols-1 lg:grid-cols-2"
    >
      <div
        class="px-small lg:pl-big w-full bg-black bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1015,f_auto/v1715973359/assets/copper-weekly/copper-weekly_ufh8vr.png')] bg-cover bg-[center_bottom_25%] bg-no-repeat pb-60 pt-3 text-white lg:min-h-[1000px] lg:bg-inherit lg:bg-none lg:pb-32 2xl:px-0"
      >
        <div class="bg-black/10 pb-3 backdrop-blur-sm">
          <FreePricesNavigation
            class="mb-6 lg:mb-5"
            active-menu="Copper Weekly"
          />
          <h3
            class="mb-3 text-2xl font-semibold lg:text-3xl lg:font-bold xl:pr-32"
          >
            Sign up for Benchmark’s Copper Weekly
          </h3>
          <h4 class="mb-4 text-sm font-normal lg:text-base">
            Launching in July 2024
          </h4>
          <div class="mx-auto lg:mx-0 xl:pr-24">
            <ul class="flex flex-col gap-3 text-sm">
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
        <h3
          v-show="!success"
          class="mb-7 text-lg font-semibold lg:mb-14 lg:text-xl lg:font-bold"
        >
          To gain access fill out the form below
        </h3>
        <div class="mx-auto" :class="formClass">
          <CommonFormBuilder
            text-button="Sign up now!"
            :form-id="$config.public.fmContactFormId"
            :initial-focus="false"
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
import { COPPER_WEEKLY_SENTENCES } from '~/constants/services/constants'

export default {
  components: { IconCheckCircle, CommonFormBuilder, FreePricesNavigation },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Copper Weekly' })
    useHead(seo)
  },
  data() {
    return {
      sentences: COPPER_WEEKLY_SENTENCES,
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
