<template>
  <div>
    <div>
      <h1 class="text-2xl font-bold lg:text-4xl"> {{ title }} </h1>
      <p class="mb-6 mt-4 font-normal lg:mb-5 lg:mt-2.5">
        {{ subtitle }}
      </p>
    </div>
    <div
      class="lg:shadow-pm mb-2 flex flex-col gap-4 bg-white lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:rounded-md lg:p-5"
    >
      <div class="flex flex-grow gap-4">
        <CommonButton
          class="!w-auto flex-grow lg:w-full lg:flex-grow-0"
          data-testid="build-chart-button"
          variant="primary"
          extra-classes="!px-2.5 !py-2"
          @click="$emit('openPanel')"
        >
          <div
            v-if="series === 0 || !hasData"
            class="flex items-center gap-1 text-sm"
          >
            <ChartIcon class="h-6 w-6" />
            <span>Build Chart</span>
          </div>
          <div v-else class="flex items-center gap-1 text-sm">
            <EditChart class="h-6 w-6" />
            <span>Edit Chart ({{ series }})</span>
          </div>
        </CommonButton>
        <CommonButton
          class="w-fit basis-6 lg:basis-auto"
          variant="tertiary"
          :disabled="!hasData"
          :show-spinner="false"
          extra-classes="!px-2.5 !py-2"
          @click="$emit('clearChart')"
        >
          <div class="flex items-center gap-1 text-sm">
            <CloseIcon class="h-6 w-6" />
            <span class="hidden lg:block">Clear Chart</span>
          </div>
        </CommonButton>
      </div>
      <div class="flex gap-4">
        <SaveWatchlist
          :show="showModal"
          :disabled="!hasData"
          :loading="saveLoading"
          :is-saved="isWatchlistSaved"
          @save-watchlist="saveWatchlist"
          @edit-watchlist="editWatchlist"
          @change-show="changeShowModal"
        />
        <div class="relative inline-block" :class="hasData && 'group'">
          <button
            data-testid="chart-download-button"
            class="border-s-500 text-s-900 inline-flex w-full items-center justify-center gap-2.5 rounded border bg-white px-2.5 py-2 font-semibold disabled:opacity-25"
            :disabled="!hasData"
          >
            <span
              class="font-montserrat hidden w-full text-left text-sm font-semibold lg:block lg:w-auto"
            >
              Download
            </span>
            <span
              class="font-montserrat w-full min-w-[95px] text-left text-sm font-semibold lg:hidden"
            >
              {{ withCopyButton ? 'Export/Copy' : 'Export' }}
            </span>
            <ChevronDown class="h-6 w-6 group-hover:rotate-180" />
          </button>
          <div
            class="bg-s-50 absolute z-30 hidden w-full rounded py-1 shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover:block"
          >
            <button
              data-testid="chart-download-csv-button"
              type="button"
              class="bg-s-50 hover:bg-p-200 relative mx-auto flex w-full flex-row items-center overflow-hidden px-3 py-2 text-black"
              @click="$emit('downloadAsXLSX')"
            >
              <span class="flex gap-x-2 text-xs font-normal lg:hidden">
                <DownloadReportIcon class="h-4 w-4" />
                Download XLSX
              </span>
              <span class="hidden text-xs font-normal lg:block"> XLSX </span>
            </button>
            <button
              v-if="withExportPng"
              data-testid="chart-download-png-button"
              type="button"
              class="bg-s-50 hover:bg-p-200 relative mx-auto flex w-full flex-row items-center overflow-hidden px-3 py-2 text-black"
              @click="$emit('downloadAsPNGImage')"
            >
              <span class="flex gap-x-2 text-xs font-normal lg:hidden">
                <DownloadReportIcon class="h-4 w-4" />
                Download PNG
              </span>
              <span class="hidden text-xs font-normal lg:block"> PNG </span>
            </button>
            <button
              v-if="withCopyButton"
              data-testid="chart-download-png-button"
              type="button"
              class="bg-s-50 hover:bg-p-200 relative mx-auto flex w-full flex-row items-center overflow-hidden px-3 py-2 text-black lg:hidden"
              :disabled="!hasData"
              @click="$emit('copyData')"
            >
              <span class="flex gap-x-2 text-xs font-normal lg:hidden">
                <CopyIcon class="h-4 w-4" />
                Copy Clipboard
              </span>
              <span class="hidden text-xs font-normal lg:block"> PNG </span>
            </button>
          </div>
        </div>
        <CommonButton
          v-if="withCopyButton"
          class="hidden lg:flex xl:w-fit"
          variant="tertiary"
          extra-classes="!px-2.5 !py-2"
          :disabled="!hasData"
          :show-spinner="false"
          @click="$emit('copyData')"
        >
          <div class="flex items-center gap-1 text-sm">
            <CopyIcon class="h-6 w-6" /> Copy
          </div>
        </CommonButton>
      </div>
    </div>
  </div>
</template>

<script>
import ChartIcon from '~/assets/icons/dot-chart.svg'
import EditChart from '~/assets/icons/edit-chart.svg'
import ChevronDown from '~/assets/icons/ChevronDown.svg'
import CloseIcon from '~/assets/icons/Close.svg'
import CopyIcon from '~/assets/icons/copy-icon.svg'
import DownloadReportIcon from '~/assets/icons/DownloadReportIcon.svg'
import SaveWatchlist from '~/components/all-prices/SaveWatchList.vue'
import { logError } from '~/utils/log-error'

export default {
  components: {
    ChartIcon,
    CloseIcon,
    ChevronDown,
    CopyIcon,
    EditChart,
    DownloadReportIcon,
    SaveWatchlist,
  },
  props: {
    isWatchlistSaved: {
      type: Boolean,
      default: false,
    },
    hasData: {
      type: Boolean,
      default: false,
    },
    series: {
      type: Number,
      default: 0,
    },
    watchlistId: {
      type: String,
      default: '',
    },
    watchlistTitle: {
      type: String,
      default: '',
    },
    builder: {
      type: Object,
      default: () => null,
    },
    withExportPng: {
      type: Boolean,
      default: false,
    },
    withCopyButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
      saveLoading: false,
    }
  },
  computed: {
    title() {
      return !this.isWatchlistSaved ? 'Price Dashboard' : this.watchlistTitle
    },
    subtitle() {
      return !this.isWatchlistSaved
        ? 'The Price Dashboard allows you to view all Benchmark Prices in one table and create bespoke charts with selected price data. Select multiple minerals and products, purities, incoterms, currencies and units to create your own custom chart. Save combinations to your watchlist to keep up to date with the latest price data for the products you care most about across the lithium ion and energy transition supply chain.'
        : ''
    },
  },
  methods: {
    async saveWatchlist(name) {
      if (!this.builder || !name) return

      this.saveLoading = true
      try {
        const response = await this.$allPrices.saveWatchlist({
          ...this.builder,
          title: name,
        })
        this.saveLoading = false
        this.showModal = false
        this.$toast.show({
          type: 'success',
          message: 'Saved to your Watchlist',
        })
        this.$emit('saveWatchlist', response)
      } catch (error) {
        logError(error)
        this.$toast.show({
          type: 'error',
          message: 'Failed to save to your Watchlist',
        })
      } finally {
        this.saveLoading = false
      }
    },
    async editWatchlist() {
      if (!this.builder) return

      this.saveLoading = true
      try {
        const response = await this.$allPrices.editWatchlist(
          this.watchlistId,
          this.builder,
        )
        this.saveLoading = false
        this.showModal = false
        this.$toast.show({
          type: 'success',
          message: 'Watchlist updated',
        })
        this.$emit('updateWatchlist', response)
      } catch (error) {
        logError(error)
        this.$toast.show({
          type: 'error',
          message: 'Failed to update to your Watchlist',
        })
      } finally {
        this.saveLoading = false
      }
    },
    changeShowModal(show) {
      this.showModal = show
    },
  },
}
</script>
