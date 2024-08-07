<template>
  <transition
    enter-class="opacity-0"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-500"
    leave-to-class="opacity-0"
  >
    <div
      :aria-hidden="!modalOpen"
      class="bg-s-900 fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-opacity-95 px-2"
      @keydown="handleKeyDown"
      @click.self="handleClose"
    >
      <div
        data-testid="capex-tracker-modal"
        role="dialog"
        aria-modal="true"
        class="relative w-full rounded-xl px-5 py-7 md:w-auto md:min-w-[710px] md:px-7"
      >
        <img
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_scale,w_600/v1690304230/assets/home/capex-modal-image_ufn6kv.png"
          alt=""
          class="absolute left-0 top-0 h-full w-full rounded-xl object-cover"
        />

        <div class="relative text-white">
          <div class="mb-2 flex items-baseline justify-start">
            <BenchmarkDataLogo class="h-[18px] w-auto" />
            <p class="ml-1 text-[15px]">DATA</p>
          </div>
          <div class="flex flex-col font-bold">
            <span class="text-xl md:text-2xl">Capital Tracker:</span>
            <span class="text-base md:text-xl">
              Bridging the EV Supply chain divide
            </span>
          </div>

          <div
            class="mt-6 flex flex-col text-sm font-bold md:mt-3 md:items-end"
          >
            Year of Analysis
            <div class="mt-1 flex gap-x-4 md:justify-center">
              <div
                v-for="year in yearsOfAnalysis"
                :key="year.label"
                class="flex cursor-pointer select-none items-center gap-x-1 font-normal"
                @click="toggleYearsOfAnalysis(year)"
              >
                <IconRadioChecked v-if="year.isChecked" />
                <IconRadioUnchecked v-else />
                {{ year.label }}
              </div>
            </div>
          </div>

          <div
            data-testid="capex-modal-total"
            class="mt-2 text-3xl font-bold tabular-nums md:mt-1 md:text-6xl"
          >
            {{ totalCapex }}
          </div>
          <div
            data-testid="capex-modal-selected-year"
            class="text-base font-bold md:text-sm"
          >
            of investment needed to fill the shortfall
            {{ yearSelectedLabel }}
          </div>

          <div class="mt-6 flex grid-cols-2 flex-col md:mt-2 md:grid">
            <div>
              <div
                class="border-t-2 pt-2 md:border-l-2 md:border-t-0 md:pl-3 md:pt-0"
                :style="`border-color: ${checkboxData.rawMaterials.mainColor};`"
              >
                <h2
                  class="mb-1 text-lg font-semibold"
                  :style="`color: ${checkboxData.rawMaterials.mainColor};`"
                >
                  Raw Materials
                </h2>
                <div class="grid grid-cols-2 md:block">
                  <div
                    v-for="item in checkboxData.rawMaterials.items"
                    :key="item.label"
                    data-testid="capex-modal-checkboxes"
                    class="mb-2 flex cursor-pointer select-none items-center gap-x-1"
                    @click="item.isChecked = !item.isChecked"
                  >
                    <SliderCheckbox
                      :is-checked="item.isChecked"
                      :style="`color: ${item.color};`"
                    />
                    {{ item.label }}
                  </div>
                </div>
              </div>

              <div
                class="mb-2 hidden cursor-pointer select-none items-center gap-x-1 border-l-2 pl-3 md:flex"
                :style="`border-color: ${checkboxData.others.mainColor};`"
                @click="
                  checkboxData.others.items[0].isChecked =
                    !checkboxData.others.items[0].isChecked
                "
              >
                <SliderCheckbox
                  :is-checked="checkboxData.others.items[0].isChecked"
                  :style="`color: ${checkboxData.others.items[0].color};`"
                />
                {{ checkboxData.others.items[0].label }}
              </div>
            </div>
            <div>
              <div
                class="mt-5 border-t-2 pt-2 md:mt-0 md:border-l-2 md:border-t-0 md:pl-3 md:pt-0"
                :style="`border-color: ${checkboxData.batteryMaterials.mainColor};`"
              >
                <h2
                  class="mb-1 text-lg font-semibold"
                  :style="`color: ${checkboxData.batteryMaterials.mainColor};`"
                >
                  Battery Materials
                </h2>
                <div class="grid grid-cols-2 md:block">
                  <div
                    v-for="item in checkboxData.batteryMaterials.items"
                    :key="item.label"
                    class="mb-2 flex cursor-pointer select-none items-center gap-x-1"
                    @click="item.isChecked = !item.isChecked"
                  >
                    <SliderCheckbox
                      :is-checked="item.isChecked"
                      :style="`color: ${item.color};`"
                    />
                    {{ item.label }}
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 md:block">
                <div
                  class="mt-5 border-t-2 pt-2 md:mt-0 md:border-l-2 md:border-t-0 md:pl-3 md:pt-0"
                  :style="`border-color: ${checkboxData.batteries.mainColor};`"
                >
                  <h2
                    class="mb-1 text-lg font-semibold"
                    :style="`color: ${checkboxData.batteries.mainColor};`"
                  >
                    Batteries
                  </h2>
                  <div>
                    <div
                      v-for="item in checkboxData.batteries.items"
                      :key="item.label"
                      class="mb-2 flex cursor-pointer select-none items-center gap-x-1"
                      @click="item.isChecked = !item.isChecked"
                    >
                      <SliderCheckbox
                        :is-checked="item.isChecked"
                        :style="`color: ${item.color};`"
                      />
                      {{ item.label }}
                    </div>
                  </div>
                </div>
                <div
                  class="mt-5 flex cursor-pointer select-none items-center gap-x-1 border-t-2 pt-8 md:hidden"
                  :style="`border-color: ${checkboxData.others.mainColor};`"
                  @click="
                    checkboxData.others.items[0].isChecked =
                      !checkboxData.others.items[0].isChecked
                  "
                >
                  <SliderCheckbox
                    :is-checked="checkboxData.others.items[0].isChecked"
                    :style="`color: ${checkboxData.others.items[0].color};`"
                  />
                  {{ checkboxData.others.items[0].label }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-start justify-between gap-3 md:flex-row-reverse md:items-end"
          >
            <CommonButton
              variant="tertiary-dark"
              class="mt-9 select-none md:mt-0"
              extra-classes=""
              @click="$modal.open('capexTrackerContact')"
            >
              Contact us about CapEx
            </CommonButton>
            <span class="text-xs"> Values last updated - June 2023 </span>
          </div>
        </div>

        <button
          aria-label="Close modal"
          class="absolute right-5 top-[26px] md:top-5"
          @click="handleClose"
        >
          <IconClose class="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import AccessibleModalMixin from '@/mixins/AccessibleModalMixin'
import IconClose from '~/assets/icons/Close.svg'
import BenchmarkDataLogo from '~/assets/icons/BenchmarkLogo.svg'
import IconRadioUnchecked from '~/assets/icons/radio-button-unchecked.svg'
import IconRadioChecked from '~/assets/icons/radio-button-checked.svg'
import SliderCheckbox from '~/components/SliderCheckbox.vue'
import CommonButton from '~/components/common/Button.vue'
import {
  YEARS_OF_ANALYSIS,
  ALL_MATERIALS,
} from '~/constants/capex-tracker-data'

export default {
  components: {
    IconClose,
    BenchmarkDataLogo,
    IconRadioUnchecked,
    IconRadioChecked,
    CommonButton,
    SliderCheckbox,
  },
  mixins: [AccessibleModalMixin],

  data() {
    return {
      modalName: 'capexTracker',
      yearsOfAnalysis: YEARS_OF_ANALYSIS,
      checkboxData: ALL_MATERIALS,
    }
  },

  computed: {
    totalCapex() {
      let total = 0
      const ONE_BILLION = 1000000000
      for (const key in this.checkboxData) {
        const category = this.checkboxData[key]
        for (const item of category.items) {
          if (item.isChecked) {
            total += item.values[this.yearSelected.label]
          }
        }
      }

      total *= ONE_BILLION
      return total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    },

    yearSelected() {
      return this.yearsOfAnalysis.find((item) => item.isChecked)
    },

    yearSelectedLabel() {
      const { label } = this.yearSelected
      if (label === 'Net Zero') return `to ${label}`
      return `by ${label}`
    },
  },

  methods: {
    toggleYearsOfAnalysis(year) {
      this.yearsOfAnalysis.forEach((item) => {
        item.isChecked = false
      })
      year.isChecked = true
    },
  },
}
</script>
