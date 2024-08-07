<template>
  <div>
    <!-- Desktop Sidebar -->
    <div class="hidden flex-row lg:mb-4 lg:flex">
      <!-- Date Filters -->
      <div class="flex-grow">
        <div class="group relative inline-block">
          <button
            class="bg-s-800 group-hover:bg-s-500 inline-flex items-center rounded-[5px] px-6 py-2 font-semibold text-white disabled:opacity-25"
            :disabled="loading || !authorized"
          >
            <span class="font-montserrat mr-3.5 text-sm font-semibold">
              Filters
            </span>
            <ChevronDown
              class="h-6 w-6"
              :class="[!loading && authorized ? 'group-hover:rotate-180' : '']"
            />
          </button>
          <div
            class="absolute z-30 hidden pt-1"
            :class="[!loading && authorized ? 'group-hover:block' : '']"
          >
            <div
              class="border-s-500 bg-s-900 flex flex-col rounded border-b bg-opacity-80 p-5 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            >
              <div class="flex flex-row gap-x-10">
                <CheckboxesFilter
                  v-for="filter in filters"
                  :key="filter.name"
                  :filter="filter"
                  @updated-filters="updateFilters"
                  @updated-header="updatedHeaders"
                />
              </div>
              <div class="mt-5 flex justify-end">
                <CommonButton
                  class="w-52"
                  variant="tertiary-dark"
                  @click="onSelectAll()"
                >
                  De/select All
                </CommonButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <client-only>
          <DatePickerWrapper
            data-testid="start-date"
            :min-date="minDate"
            :start-date="startDate"
            :end-date="endDate"
            :disabled="disabled"
            @date-range-updated="updateSelectedDates"
          >
          </DatePickerWrapper>
        </client-only>
      </div>
    </div>

    <!-- Modal chart filters -->
    <AssessmentsModal
      v-if="$store.state.modal.priceAssessmentFiltersOpen && authorized"
    >
      <template #content>
        <div>
          <!-- Date filter -->
          <div class="input relative mt-10 w-full">
            <client-only>
              <DatePickerWrapper
                data-testid="start-date"
                :min-date="minDate"
                :start-date="startDate"
                :end-date="endDate"
                :default-value="timeLineIndicator"
                @date-range-updated="updateSelectedDates"
              >
              </DatePickerWrapper>
            </client-only>
          </div>
          <div class="py-4">
            <div class="border-s-300 w-full border-t"></div>
          </div>
        </div>

        <!-- Mineral properties filters -->
        <div v-for="filter in filters" :key="filter.name">
          <CheckboxesFilter
            :filter="filter"
            :is-modal="true"
            @updated-filters="updateFilters"
            @updated-header="updatedHeaders"
          />
          <div class="py-4">
            <div class="border-s-300 w-full border-t"></div>
          </div>
        </div>
      </template>

      <template #footer>
        <div
          class="flex justify-end px-4 py-6 shadow-[0px_-4px_10px_rgba(0,0,0,0.1)]"
        >
          <div class="flex w-1/2 justify-start">
            <button
              class="flex items-center px-2.5 py-1.5"
              @click="resetFilters"
            >
              <span class="text-sm font-semibold underline">Reset</span>
            </button>
          </div>
          <div class="flex w-1/2 justify-end">
            <CommonButton
              class="border-0 px-6 text-sm"
              variant="primary"
              @click="applyFilters"
            >
              Apply
            </CommonButton>
          </div>
        </div>
      </template>
    </AssessmentsModal>
  </div>
</template>

<script>
import { sub } from 'date-fns'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import { mapActions, mapGetters } from 'vuex'
import {
  getAllowedOptionsServicePro,
  getAllowedProductsServicePro,
  getBrotherOptions,
  getLevelOptions,
} from '@/utils/chart'
import ChevronDown from '~/assets/icons/ChevronDown.svg'
import DatePickerWrapper from '~/components/DatePickerWrapper.vue'
import CheckboxesFilter from '~/components/shared/price-assessments/ChartCheckboxesFilter.vue'
import AssessmentsModal from '~/components/assessments/Modal.vue'
import CommonButton from '~/components/common/Button.vue'
import { FILTERS_CHART_NAME } from '~/constants/chart'
import { logError } from '~/utils/log-error'

import AuthorizationMixin from '~/mixins/AuthorizationMixin'

export default {
  components: {
    CheckboxesFilter,
    AssessmentsModal,
    ChevronDown,
    CommonButton,
    DatePickerWrapper,
  },
  mixins: [AuthorizationMixin],
  props: {
    mineral: {
      type: String,
      required: true,
    },
    requiredFilters: {
      type: Array,
      required: true,
    },
    minDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    disableDownloads: Boolean,
    subscription: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filters: [],
      previousFilters: [],
      initialFilters: [],
      timeLineIndicator: 'Last Calendar Year',
      availableProducts: [],
      loading: true,
      authorized: false,
    }
  },
  computed: {
    ...mapGetters({
      getPricesCatalogByMineral: 'chartSidebarFilter/getPricesCatalogByMineral',
      getAvailableCombinations: 'chartSidebarFilter/getAvailableCombinations',
    }),
    selectedOptions() {
      const selected = {}
      this.filters.forEach((_item) => {
        selected[_item.name] = _item.options.filter(
          (_option) => _option.checked,
        )
      })
      return selected
    },
    message() {
      const message = []
      Object.entries(this.selectedOptions).forEach(([key, value]) => {
        if (isEmpty(value) && this.requiredFilters.includes(key)) {
          message.push(
            `You need to select a ${FILTERS_CHART_NAME[key]} from the filters`,
          )
        }
      })
      return message
    },
  },
  watch: {
    selectedOptions() {
      this.$emit('update-message', this.message)
      this.$emit('update-chart-options', this.selectedOptions)
    },
  },
  async mounted() {
    await this.getFilterChart()
    // Update chart options with initial filters on start
    this.filters = cloneDeep(this.initialFilters)
    this.previousFilters = cloneDeep(this.initialFilters)
    const dateRange = {
      start: sub(new Date(), { years: 1 }),
      end: new Date(),
    }
    if (this.availableProducts && this.availableProducts.length) {
      this.updateFilters()
    }
    this.$emit('start-date-updated', dateRange.start.toISOString())
    this.$emit('end-date-updated', dateRange.end.toISOString())
    if (this.$browser.isMobile()) {
      this.applyFilters()
    }
  },
  methods: {
    ...mapActions({
      fetchCatalogByMineral: 'chartSidebarFilter/fetchCatalogByMineral',
    }),
    applyFilters() {
      this.previousFilters = cloneDeep(this.filters)
      this.$emit('apply-filters')
    },
    resetFilters() {
      this.filters = cloneDeep(this.initialFilters)
      this.$emit('apply-filters')
    },
    updateSelectedDates(dateRange) {
      this.$emit('start-date-updated', dateRange.range.start.toISOString())
      this.$emit('end-date-updated', dateRange.range.end.toISOString())
      this.timeLineIndicator = dateRange.option
    },
    updateFilters() {
      // update the filters with the disabled options
      this.filters.forEach((_property) => {
        /**
         * prepare the filters for each level
         * this means that in the first level, we omit all filters, because all products are allowed
         * in the second level, we only use the filters from the first level.
         * in the third level, we only use the filters from the first and second level
         * and so on with the rest of the levels
         */
        const levelOptions = getLevelOptions(
          this.selectedOptions,
          _property.level,
        )
        // we get the products and options that comply with the filters of the respective level
        const allowedProducts = getAllowedProductsServicePro(
          this.availableProducts,
          levelOptions,
        )
        const allowedOptions = getAllowedOptionsServicePro(allowedProducts)
        const brotherIds = getBrotherOptions(this.selectedOptions)
        _property.options.forEach((_option) => {
          // disable if not in the allowed options or if has brothers Ids
          _option.disabled =
            !allowedOptions.includes(_option.data.name) ||
            brotherIds.includes(_option.data.id)
          // disable if parent has nothing selected
          if (_option.parent) {
            const parentSelectedOptions = this.selectedOptions[_option.parent]
            if (isEmpty(parentSelectedOptions)) {
              _option.checked = false
              _option.disabled = true
            }
          }
          // Uncheck the option if the option is disabled
          if (_option.disabled) _option.checked = !_option.disabled
        })
      })
      this.validateParentCheck()
    },
    onSelectAll() {
      const currentValue = this.filters[0].checked
      this.filters.forEach((filter) => {
        filter.checked = !currentValue
        filter.options.forEach((_option) => (_option.checked = !currentValue))
      })
      this.updateFilters()
    },
    updatedHeaders(header) {
      const currentHeader = this.filters.find(
        (filter) => filter.label === header.name,
      )
      currentHeader.checked = header.value
      currentHeader.options.forEach(
        (_option) => (_option.checked = header.value),
      )
      this.filters
        .filter((filter) => filter.level > currentHeader.level)
        .forEach((header) => (header.checked = false))
      this.updateFilters()
    },
    validateParentCheck() {
      this.filters.forEach((filter) => {
        const allDisabled = filter.options.every((_option) => _option.disabled)
        filter.disabled = allDisabled
        if (!allDisabled) {
          filter.checked = filter.options
            .filter((_option) => !_option.disabled)
            .every((_option) => _option.checked)
        }
      })
    },
    async getFilterChart() {
      try {
        this.loading = true
        const hasAuthorized = await this.hasAuthorized()
        if (hasAuthorized) {
          if (
            !Object.hasOwn(
              this.$store.state.chartSidebarFilter.catalog,
              this.mineral,
            )
          ) {
            const response = await this.$restClient.getPricesCatalogByMineral(
              this.mineral,
            )
            await this.fetchCatalogByMineral({
              mineral: this.mineral,
              response,
            })
          }
          this.initialFilters = this.getPricesCatalogByMineral(this.mineral)
          this.availableProducts = this.getAvailableCombinations(this.mineral)
        }
      } catch (error) {
        logError(error)
      } finally {
        this.loading = false
      }
    },
    async hasAuthorized() {
      this.authorized = await this.hasMembership(this.subscription)
      return this.authorized && this.isAuthenticated
    },
  },
}
</script>
