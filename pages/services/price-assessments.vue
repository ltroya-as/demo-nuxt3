<template>
  <div v-if="loading" class="flex min-h-[40vh] items-center justify-center">
    <TheLoader />
  </div>

  <div v-else>
    <BreadcrumbWithoutSidebar :menu="breadcrumb" class="mb-8" />
    <OverviewPage
      :services="services"
      :title="title"
      :subtitle="subtitle"
      :more-info-text="moreInfo"
    >
      <div>
        <ButtonContactUs
          text="Find out more"
          class="mb-4 mr-4 w-fit leading-5 md:text-base md:font-semibold"
          :services="checkboxServices"
        />
        <CommonButton
          class="mb-4 w-fit"
          variant="tertiary"
          @click="goToSpotlight"
        >
          Sign up to Price Spotlight
        </CommonButton>
        <div class="mb-6 w-3/4 md:w-full">
          <LinkWithAnimation
            class="text-left font-semibold"
            text="For enquiries about using prices in contracts"
            @click="$modal.open('subscribe')"
          />
        </div>
        <div
          class="grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-2 xl:grid-cols-3"
        >
          <Package
            v-for="(item, index) in packages"
            :key="index"
            class="px-small bg-white py-6"
            :service="item"
            content-classes="!font-normal"
          >
            <template #default="slotProps">
              <h3 class="mb-3 text-lg font-bold">
                {{ slotProps.service.title }}
              </h3>
              <span>{{ slotProps.service.description }}</span>
            </template>
          </Package>
        </div>
        <div class="mb-4 mt-6 font-semibold">
          Benchmark produces the leading market price assessments on weekly,
          bi-weekly and monthly cycles to mineral-specific methodologies.
        </div>
        <h3 class="text-lg font-semibold">Available Subscriptions</h3>
      </div>
    </OverviewPage>

    <CommonButton
      class="mt-4 md:ml-4 lg:ml-0"
      :disabled="isDownloadingFiles"
      variant="tertiary"
      @click="downloadFiles"
    >
      Price Assessments Control Documents
    </CommonButton>
  </div>
</template>

<script>
/** @components */
import TheLoader from '~/components/TheLoader.vue'
import Package from '~/components/shared/services/Package.vue'
import OverviewPage from '~/components/shared/services/OverviewPage.vue'
import ButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'
import CommonButton from '~/components/common/Button.vue'
import BreadcrumbWithoutSidebar from '~/components/navigation/BreadcrumbWithoutSidebar.vue'
/** @mixins */
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import DownloadReportMixin from '~/mixins/DownloadReportMixin'
/** @constants */
import overviewData from '~/constants/price-assessments/overview'
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'
/** @utils */
import { logError } from '~/utils/log-error'

definePageMeta({ layout: 'overviews' })

export default {
  components: {
    BreadcrumbWithoutSidebar,
    ButtonContactUs,
    OverviewPage,
    Package,
    TheLoader,
    LinkWithAnimation,
    CommonButton,
  },
  mixins: [SeoUtilsMixin, DownloadReportMixin],
  data() {
    return {
      loading: true,
      breadcrumb: [{ name: 'Services' }, { name: PRICE_ASSESSMENTS.name }],
      title: overviewData.title,
      subtitle: overviewData.subtitle,
      service: overviewData.service,
      services: overviewData.servicesPrice,
      packages: overviewData.packages,
      moreInfo: overviewData.moreInfo,
      availableText: overviewData.availableText,
      checkboxServices: [PRICE_ASSESSMENTS.checkbox],
      isDownloadingFiles: false,
    }
  },
  async fetch() {
    this.loading = true
    try {
      const priceFiles = await this.$downloadManager.getFilesForCategory(
        'methodology-price-assessments',
      )
      if (priceFiles) {
        this.services = overviewData.servicesPrice.map((_service) => {
          const file = priceFiles.find(
            (_file) =>
              _service.methodology?.active &&
              _service.methodology?.type === 'file' &&
              _service.methodology?.data === _file.tags[0]?.name,
          )
          return {
            ..._service,
            methodology: {
              ..._service.methodology,
              file: { ...file, category: 'methodology-price-assessments' },
            },
          }
        })
      }
    } catch (error) {
      logError(error)
    }
    this.loading = false
  },

  head() {
    return this.generateSeoInfo(
      {
        title: 'Price Assessments Overview',
        description: PRICE_ASSESSMENTS.seo.description,
      },
      {
        keywords: 'benchmark price assessments, benchmark',
      },
    )
  },
  watch: {
    loggedIn(value) {
      value && this.fetch()
    },
  },
  mounted() {
    this.fetch()
  },

  methods: {
    async fetch() {
      this.loading = true
      try {
        const priceFiles = await this.$downloadManager.getFilesForCategory(
          'methodology-price-assessments',
        )
        if (priceFiles) {
          this.services = overviewData.servicesPrice.map((_service) => {
            const file = priceFiles.find(
              (_file) =>
                _service.methodology?.active &&
                _service.methodology?.type === 'file' &&
                _service.methodology?.data === _file.tags[0]?.name,
            )
            return {
              ..._service,
              methodology: {
                ..._service.methodology,
                file: { ...file, category: 'methodology-price-assessments' },
              },
            }
          })
        }
      } catch (_error) {
        // eslint-disable-next-line no-console
        console.log({ _error })
      }
      this.loading = false
    },
    async downloadFiles() {
      const fileIDs = this.$config.public.priceAssessmentsControlDocuments

      this.isDownloadingFiles = true
      await this.downloadReportByIds(fileIDs)
      this.isDownloadingFiles = false
    },
    goToSpotlight() {
      this.$router.push('/price-spotlight-signup')
    },
  },
}
</script>
