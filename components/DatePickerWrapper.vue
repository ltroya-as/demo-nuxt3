<template>
  <div
    class="font-montserrat lg:text-s-700 flex flex-col-reverse items-center justify-center gap-x-6 text-xs font-normal lg:flex-row lg:gap-x-4 lg:text-sm lg:font-semibold xl:gap-x-6"
  >
    <div class="flex w-full justify-center gap-x-3 lg:justify-start lg:gap-x-6">
      <div
        class="border-s-900 flex min-w-fit rounded-3xl border px-5 py-1.5 hover:cursor-pointer sm:px-6 lg:flex-grow lg:border-0 lg:p-0"
        :class="[value === 'All Time' ? 'underline' : '']"
        @click="updateDateRange('All Time')"
      >
        All Time
      </div>
      <div
        class="border-s-900 flex min-w-fit rounded-3xl border px-5 py-1.5 hover:cursor-pointer sm:px-6 lg:flex-grow lg:border-0 lg:p-0"
        :class="[value === 'Last Calendar Year' ? 'underline' : '']"
        @click="updateDateRange('Last Calendar Year')"
      >
        1 Year
      </div>
      <div
        class="border-s-900 flex min-w-fit rounded-3xl border px-5 py-1.5 hover:cursor-pointer sm:px-6 lg:flex-grow lg:border-0 lg:p-0"
        :class="[value === 'YTD' ? 'underline' : '']"
        @click="updateDateRange('YTD')"
      >
        YTD
      </div>
    </div>

    <div
      class="custom-calendar border-s-300 z-20 mb-5 flex h-full w-full justify-end gap-x-3 border-b pb-8 lg:mb-0 lg:gap-x-1 lg:border-b-0 lg:pb-0 xl:gap-x-6"
    >
      <v-date-picker
        ref="picker"
        v-model="startDateComputed"
        :first-day-of-week="2"
        :min-date="minDate"
        :max-date="maxDate"
        :locale="localeLanguage"
        :select-attribute="attribute"
        :popover="{ showDelay: 500, visibility: 'focus' }"
        @dayclick="updateDateRange('Custom Date Range')"
      >
        <template #default="{ inputValue, inputEvents }">
          <div>
            <div class="relative flex w-full flex-wrap items-stretch">
              <label class="text-s-900 mb-2 text-sm font-semibold lg:hidden">
                Start date
              </label>
              <span
                class="absolute z-10 flex h-full w-8 items-center justify-center rounded bg-transparent pb-1 pl-3 pt-8 text-center text-base font-normal leading-snug text-gray-400 lg:pb-3 lg:pt-3"
              >
                <dates-chart-icon class="h-4 w-4" />
              </span>
              <input
                :value="inputValue"
                class="border-s-300 relative w-full rounded border p-2 pl-10 text-sm focus:outline-none lg:w-[8.5rem]"
                data-testid="chart-start-date-picker"
                :disabled="disabled"
                v-on="inputEvents"
              />
            </div>
          </div>
        </template>
      </v-date-picker>
      <v-date-picker
        ref="picker"
        v-model="endDateComputed"
        :first-day-of-week="2"
        :min-date="startDateComputed"
        :max-date="maxDate"
        :locale="localeLanguage"
        :select-attribute="attribute"
        :popover="{ showDelay: 500, visibility: 'focus' }"
        @dayclick="updateDateRange('Custom Date Range')"
      >
        <template #default="{ inputValue, inputEvents }">
          <div>
            <div class="relative flex w-full flex-wrap items-stretch">
              <label class="text-s-900 mb-2 text-sm font-semibold lg:hidden">
                End date
              </label>
              <span
                class="absolute z-10 flex h-full w-8 items-center justify-center rounded bg-transparent pb-1 pl-3 pt-8 text-center text-base font-normal leading-snug text-gray-400 lg:pb-3 lg:pt-3"
              >
                <dates-chart-icon class="h-4 w-4" />
              </span>
              <input
                :value="inputValue"
                class="border-s-300 relative w-full rounded border p-2 pl-10 text-sm focus:outline-none lg:w-[8.5rem]"
                data-testid="chart-end-date-picker"
                :disabled="disabled"
                v-on="inputEvents"
              />
            </div>
          </div>
        </template>
      </v-date-picker>
    </div>
  </div>
</template>

<script>
import { sub } from 'date-fns'
import { getLastCalendarYear, getYTD } from '@/utils/date'
import DatesChartIcon from '@/assets/icons/mobile/charts/Dates.svg'

export default {
  components: {
    'dates-chart-icon': DatesChartIcon,
  },
  props: {
    minDate: {
      type: Date,
      required: true,
    },
    maxDate: {
      type: Date,
      default: () => new Date(),
    },
    startDate: {
      type: String,
      default: () => sub(new Date(), { years: 1 }),
    },
    endDate: {
      type: String,
      default: () => new Date(),
    },
    defaultValue: {
      type: String,
      default: 'Last Calendar Year',
    },
    loading: Boolean,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: this.defaultValue,
      range: {
        start: new Date(this.startDate),
        end: new Date(this.endDate),
      },
      dateOptions: ['Custom Date Range'],
      attribute: {
        highlight: {
          start: {
            style: {
              backgroundColor: this.$theme.colors.p['500'],
            },
            contentStyle: {
              color: this.$theme.colors.s['900'],
            },
          },
        },
      },
      localeLanguage: navigator.language,
    }
  },
  computed: {
    startDateComputed: {
      get() {
        return this.startDate
      },
      set(value) {
        this.range.start = value
      },
    },
    endDateComputed: {
      get() {
        return this.endDate
      },
      set(value) {
        this.range.end = value
      },
    },
  },
  methods: {
    updateDateRange(option) {
      if (this.disabled) return
      this.value = option
      switch (option) {
        case 'Custom Date Range':
          break
        case 'Last Calendar Year':
          this.range = getLastCalendarYear(new Date())
          break
        case 'All Time':
          this.range = { start: this.minDate, end: this.maxDate }
          break
        case 'YTD':
          this.range = getYTD(new Date())
          break
      }
      this.$emit('date-range-updated', { range: this.range, option })
    },
  },
}
</script>
