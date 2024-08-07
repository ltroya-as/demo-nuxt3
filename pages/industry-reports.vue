<template>
  <div class="relative w-full flex-grow">
    <div class="gap-x-big absolute hidden h-full w-full lg:grid lg:grid-cols-2">
      <div
        data-testid="industry-reports-image"
        class="bg-black bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1246,f_auto/v1703165990/assets/industry%20reports/Industry_Reports_3_ro4kqf.png')] bg-cover bg-center bg-no-repeat"
      ></div>
    </div>
    <div
      class="max-w-content-container gap-x-big relative z-10 mx-auto grid w-full grid-cols-1 lg:grid-cols-2"
    >
      <div
        class="px-small lg:pl-big flex w-full flex-col justify-between gap-96 bg-black bg-[url('https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1015,f_auto/v1703165989/assets/industry%20reports/Industry_Reports_authorised_-_Mobile_i6mzli.png')] bg-cover bg-[center_bottom_25%] bg-no-repeat pt-3 text-white lg:min-h-[1000px] lg:gap-0 lg:bg-inherit lg:bg-none lg:pb-32 2xl:px-0"
      >
        <div class="bg-black/10 pb-3 backdrop-blur-sm">
          <div>
            <FreePricesNavigation
              class="mb-6 lg:mb-5"
              active-menu="Industry Reports"
            />
            <h3
              class="mb-3 text-2xl font-semibold lg:text-3xl lg:font-bold xl:pr-32"
            >
              Benchmark’s State of the Industry Reports
            </h3>
            <p class="text-sm font-normal lg:text-base">
              Our free State of the Industry reports present Benchmark's views
              for key areas of the energy transition and draw from the detail in
              our data and market intelligence services.
            </p>
            <br />
            <p class="text-sm font-normal lg:text-base">
              To request a copy of this analysis, please complete the form and
              our team will contact you shortly.
            </p>
          </div>
          <div class="flex justify-center">
            <CommonButton
              variant="secondary"
              class="!bg-s-50 mb-4 mt-4 max-w-[185px] text-sm !text-black lg:mb-0 lg:mt-0"
              extra-classes=""
              @click="$modal.open('industryReports')"
            >
              What’s in this issue?
            </CommonButton>
          </div>
        </div>
      </div>
      <div
        class="px-small lg:pr-big w-full pb-8 pt-4 lg:pb-32 lg:pt-10 2xl:px-0"
        :class="{
          'items-center justify-center lg:flex': isAuthenticated,
        }"
      >
        <div :class="{ 'flex min-h-[650px] items-center': success }">
          <h3
            v-if="!isAuthenticated && !success"
            class="mb-7 text-lg font-semibold lg:mb-14 lg:text-xl lg:font-bold"
          >
            To gain access fill out the form below
          </h3>
          <CommonFormBuilder
            v-if="!isAuthenticated"
            class="mx-auto"
            :class="formClass"
            text-button="Request Access"
            :default-values="defaultValues"
            :form-id="$config.public.fmIndustryReportsFormId"
            :initial-focus="false"
            :show-link-privacy-policy="true"
            :show-title="false"
            :show-labels="false"
            field-bg-color="white"
            container-details-class="flex flex-col items-center justify-center"
            container-button-send-class="w-full"
            button-send-class="!w-full"
            success-text="Thank you for submitting your request to access our industry report. Our team will contact you shortly."
            @set-success="setSuccess"
            @page-number="onChangePage"
          />
          <div v-else class="max-w-[460px] text-center">
            <div class="mb-4 text-xl font-bold lg:mb-5">
              To download this month’s Industry report please click below
            </div>
            <ButtonDownload
              class="mx-0 w-full md:text-lg md:font-bold md:leading-7"
              variant="primary"
              text="Download"
              :download-file="file"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonFormBuilder from '~/components/common/FormBuilder.vue'
import FreePricesNavigation from '~/components/navigation/FreePricesNavigation'
import ButtonDownload from '~/components/shared/common/ButtonDownload.vue'

export default {
  components: { CommonFormBuilder, ButtonDownload, FreePricesNavigation },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Industry Reports' })
    useHead(seo)
  },
  data() {
    return {
      defaultValues: {},
      file: {
        ID: this.$config.public.industryReportsFilePdfID,
        category: 'public-documents',
        file_name: '',
      },
      success: false,
      formClass: 'max-w-[500px] px-4',
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/authenticated',
    }),
  },
  created() {
    this.getFileName()
  },
  methods: {
    setSuccess(value) {
      this.success = value
    },
    async getFileName() {
      try {
        const { file_name: fileName } =
          await this.$restClient.getReportDetailsById(
            this.file.category,
            this.file.ID,
          )
        this.file.file_name = fileName
      } catch (error) {
        this.file.file_name = 'industry report.pdf'
      }
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
