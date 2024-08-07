<template>
  <div class="flex w-full flex-col lg:flex-col lg:gap-2">
    <div class="flex w-full flex-col justify-between xl:flex-row xl:gap-x-4">
      <!-- FILTER BOX -->
      <div
        v-if="showFilterBox"
        class="group relative mx-4 mb-7 inline-block xl:mx-0 xl:mb-0 xl:w-full"
      >
        <button
          class="bg-s-900 group-hover:bg-s-500 inline-flex w-full items-center justify-center rounded px-6 py-2 font-semibold text-white"
        >
          <span class="font-montserrat mr-3.5 text-sm font-semibold">
            {{ filterBoxTitle }}
          </span>
          <ChevronDown class="h-6 w-6 group-hover:rotate-180" />
        </button>
        <div class="absolute z-20 hidden w-full pt-1 group-hover:block">
          <div
            class="border-s-500 bg-s-900 flex flex-col rounded border-b bg-opacity-[0.97] p-5 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          >
            <div class="flex flex-col gap-x-10">
              <slot name="filterBox"></slot>
            </div>
          </div>
        </div>
      </div>
      <!-- SEARCH BOX -->
      <div
        class="group relative mx-4 mb-7 inline-block xl:mx-0 xl:mb-0 xl:w-full"
      >
        <button
          class="bg-s-900 group-hover:bg-s-500 inline-flex w-full items-center justify-center rounded px-6 py-2 font-semibold text-white"
        >
          <span class="font-montserrat mr-3.5 text-sm font-semibold">
            {{ searchBoxTitle }}
          </span>
          <ChevronDown class="h-6 w-6 group-hover:rotate-180" />
        </button>
        <div
          class="absolute z-20 hidden w-full pt-1 group-hover:block lg:w-[600px]"
        >
          <div
            class="border-s-500 bg-s-900 flex flex-col rounded border-b bg-opacity-[0.97] px-3 pb-4 pt-2 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          >
            <div class="relative mb-2 w-full">
              <SearchReportIcon
                class="absolute left-2 top-[50%] -translate-y-1/2 text-black"
              />

              <input
                v-model="search"
                type="text"
                class="border-s-600 placeholder:text-s-400 focus:ring-p-500 h-8 w-full rounded py-1 pl-8 outline-none focus:border-0 focus:ring-2 focus:ring-inset"
                placeholder="Search..."
                @input="onFilterChange"
              />
            </div>
            <div
              class="mb-3 flex max-h-[35vh] flex-col gap-x-10 overflow-y-auto"
            >
              <slot name="searchBoxMultiSelect"></slot>
            </div>

            <div class="lg:flex lg:justify-end">
              <CommonButton
                v-if="options.length"
                variant="tertiary-dark"
                :extra-classes="'shadow-none text-xs'"
                data-testid="deselect-all"
                @click="$emit('on-select-all')"
              >
                De/select All
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showBenchmarkVerifiedBox"
      class="flex w-full flex-col justify-between xl:flex-row xl:gap-x-4"
    >
      <div
        class="group relative mx-4 mb-7 inline-block xl:mx-0 xl:mb-0 xl:w-full"
      >
        <button
          class="bg-s-900 group-hover:bg-s-500 inline-flex w-full items-center justify-center rounded px-6 py-2 font-semibold text-white"
        >
          <span class="font-montserrat mr-3.5 text-sm font-semibold">
            {{ benchmarkVerifiedTitle }}
          </span>
          <ChevronDown class="h-6 w-6 group-hover:rotate-180" />
        </button>
        <div class="absolute z-20 hidden w-full pt-1 group-hover:block">
          <div
            class="border-s-500 bg-s-900 flex flex-col rounded border-b bg-opacity-[0.97] px-3 pb-4 pt-2 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          >
            <div
              class="mb-3 flex max-h-[35vh] flex-col gap-x-10 overflow-y-auto"
            >
              <slot name="benchmarkMultiSelect"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- SUMMARY BOX -->
    <div
      data-testid="summary-container"
      class="h-auto flex-1 md:w-auto xl:hidden"
    >
      <slot name="summaryContainer"></slot>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import ChevronDown from '@/assets/icons/ChevronDown.svg'
import SearchReportIcon from '@/assets/icons/SearchReportIcon.svg'

export default {
  components: { ChevronDown, SearchReportIcon },
  props: {
    filterBoxTitle: {
      type: String,
      required: true,
    },
    searchBoxTitle: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    isTitleLarge: {
      type: Boolean,
      required: false,
    },
    showFilterBox: {
      type: Boolean,
      default: true,
    },
    showBenchmarkVerifiedBox: {
      type: Boolean,
      default: false,
    },
    benchmarkVerifiedTitle: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    onFilterChange: debounce(function () {
      this.$emit('on-filter-change', this.search)
    }, 500),
  },
}
</script>
