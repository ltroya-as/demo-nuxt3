<template>
  <div>
    <div v-if="loading" class="h-full min-h-[70dvh] w-full">
      <TheLoader class="min-h-[70dvh]" />
    </div>
    <div v-else>
      <ServicesHero
        v-if="!isAuthenticated"
        :initial-fields="initialFields"
        :title="titleHero"
        :images="bannerImages"
        :file="brochureFileInfo"
        download-text="Methodology"
      />
      <div
        class="max-w-content-container px-small mx-auto flex w-full flex-col justify-center gap-y-7 pb-20 pt-8 md:items-start xl:pb-36 xl:pl-16 xl:pr-0 xl:pt-10"
      >
        <Breadcrumb
          v-if="isAuthenticated"
          :menu="$store.state.breadcrumb.items"
        />
        <PriceAssessmentsSectionTitle
          class="mb-6"
          title-classes="!text-4xl"
          :title="titlePage"
          :icon="icon"
          authorized
        />
        <div v-if="!isAuthenticated" class="mb-[18px]">
          <DescriptionAndPackage
            :title="packageTitle"
            :services="services"
            :descriptions="descriptions"
          >
            <div v-if="descriptionImage" class="overflow-hidden rounded-lg">
              <img
                class="h-full w-full"
                :src="descriptionImage"
                alt="description banner"
              />
            </div>
          </DescriptionAndPackage>
          <div class="mt-9 flex flex-col gap-y-4">
            <h4 class="text-center text-xl font-bold md:text-left">
              Subscribe to gain access
            </h4>
            <ServicesGroupButtons
              class="md:w-fit"
              :initial-fields="initialFields"
              :file="brochureFileInfo"
            />
          </div>
        </div>
        <section class="w-full">
          <div class="justify-between md:flex">
            <TheTabs
              :key="jwtToken"
              :class="{ 'mb-3': !isChartActiveTab }"
              :tabs="tabs"
              @active-tab-changed="setActiveTab"
            />
            <div
              v-if="isCustomisationToolActiveTab"
              class="my-6 text-base font-semibold md:hidden lg:pb-0"
            >
              Benchmark’s flexible pricing tool provides estimated delivered
              costs of several assessed battery raw materials via shipping
              container to selected geographic locations. Our market assessed
              prices as well as third party information and market research is
              combined to create indicative prices.
            </div>
            <div
              v-if="isAuthenticated && !isChartActiveTab"
              id="download-methodology"
              v-click-outside="closeDropdown"
              class="bg-s-900 relative mb-3 mt-[22px] flex h-fit cursor-pointer select-none items-center justify-between rounded px-4 py-2.5 text-sm text-white md:m-0"
              :class="{
                '!bg-s-600': isDropdownOpen,
                '!bg-s-400 !cursor-default': downloading,
              }"
              @click="handleDropdownClick"
            >
              <div class="flex items-center">
                <IconDownload v-if="!downloading" class="h-5 w-5 p-0.5" />
                <IconSpinner v-else class="h-5 w-5 animate-spin" />
                <span class="ml-2 mr-[37px] font-semibold">Methodology</span>
              </div>
              <ChevronDown
                class="h-5 w-5 transition-transform"
                :class="{ 'rotate-180': isDropdownOpen }"
              />

              <div
                v-if="isDropdownOpen"
                class="absolute left-0 top-[calc(100%_+_4px)] z-10 w-full cursor-pointer rounded bg-white text-black transition-all"
                style="box-shadow: 0 1px 10px 0 #c1c5cf"
              >
                <div
                  v-if="brochureFileInfo"
                  class="border-s-300 hover:bg-s-100 border-b p-4 transition-colors"
                  @click="
                    downloadReport(brochureFileInfo, brochureFileInfo.category)
                  "
                >
                  Price Assessment
                </div>
                <div
                  v-if="customisationToolBrochureFileInfo"
                  class="hover:bg-s-100 p-4 transition-colors"
                  @click="
                    downloadReport(
                      customisationToolBrochureFileInfo,
                      customisationToolBrochureFileInfo.category,
                    )
                  "
                >
                  Price Customisation Tool
                </div>
              </div>
            </div>
          </div>
          <slot></slot>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ServicesHero from '~/components/shared/services/Hero.vue'
import PriceAssessmentsSectionTitle from '~/components/price-assessments/SectionTitle.vue'
import DescriptionAndPackage from '~/components/shared/services/DescriptionAndPackage.vue'
import TheTabs from '~/components/common/TheTabs.vue'
import Breadcrumb from '~/components/shared/navigation/Breadcrumb.vue'
import ServicesGroupButtons from '~/components/shared/services/GroupButtons.vue'
import ChevronDown from '~/assets/icons/ChevronDown.svg'
import IconDownload from '~/assets/icons/IconDownload.svg'
import IconSpinner from '@/assets/icons/Spinner.svg'

import DownloadReportMixin from '~/mixins/DownloadReportMixin'

export default {
  components: {
    ServicesHero,
    PriceAssessmentsSectionTitle,
    DescriptionAndPackage,
    TheTabs,
    Breadcrumb,
    ServicesGroupButtons,
    ChevronDown,
    IconDownload,
    IconSpinner,
  },
  mixins: [DownloadReportMixin],
  props: {
    initialFields: {
      type: Array,
      required: true,
    },
    titleHero: {
      type: String,
      required: true,
    },
    bannerImages: {
      type: Object,
      required: true,
    },
    brochureFileInfo: {
      type: Object,
      default: () => null,
    },
    customisationToolBrochureFileInfo: {
      type: Object,
      default: () => null,
    },
    titlePage: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
    packageTitle: {
      type: String,
      required: true,
    },
    services: {
      type: Array,
      required: true,
    },
    descriptions: {
      type: Array,
      required: true,
    },
    descriptionImage: {
      type: [String, null],
      default: null,
    },
  },

  data() {
    return {
      isDropdownOpen: false,
      activeTab: '',
      loading: true,
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/authenticated']
    },
    jwtToken() {
      return this.$store.state.auth.jwtToken
    },
    isChartActiveTab() {
      return this.activeTab === 'chart'
    },
    isCustomisationToolActiveTab() {
      return this.activeTab === 'price-customisation-tool'
    },
  },
  mounted() {
    this.setLoading()
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
      this.$emit('activeTabChanged', tab)
    },
    handleDropdownClick() {
      if (this.downloading) {
        this.isDropdownOpen = false
        return
      }
      this.isDropdownOpen = !this.isDropdownOpen
    },
    setLoading() {
      setTimeout(() => {
        this.loading = false
      }, 50)
    },
    closeDropdown() {
      this.isDropdownOpen = false
    },
  },
}
</script>
