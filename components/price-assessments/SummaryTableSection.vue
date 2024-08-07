<template>
  <div>
    <!-- Index Section-->
    <div
      class="border-p-400 mb-2.5 grid grid-cols-10 border-b-2"
      :class="!hasFrequency ? 'mt-5' : ''"
    >
      <!-- Index label -->
      <div
        data-testid="more-info-desktop"
        class="col-span-4 flex select-none font-semibold capitalize xl:col-span-5"
        :class="[showLogo ? 'mb-2 items-end' : 'items-center']"
        :style="`color: ${getClassesColor(classTextColor)}`"
      >
        {{ changeLabel }}
        <IconPriceHighlightedLogo v-if="showLogo" class="ml-2" />
      </div>
      <div
        v-if="hasFrequency"
        class="bg-s-100 text-surface-em-high col-span-6 mt-3 rounded-t-xl py-2 text-sm font-semibold capitalize md:px-7 lg:text-lg xl:col-span-5"
      >
        <div class="grid grid-cols-4 gap-x-3">
          <div class="text-right">Current</div>
          <div class="pr-4 text-right">{{ frequency }}</div>
          <div class="pr-4 text-right">YOY</div>
          <div class="pr-4 text-right">YTD</div>
        </div>
      </div>
    </div>

    <!-- Pricing Detail Section -->
    <transition
      enter-active-class="transition duration-300 ease-in"
      leave-active-class="transition duration-300 ease-out"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div>
        <div
          v-for="item in data"
          :key="item.name"
          class="grid grid-cols-10 items-center pb-2.5 tabular-nums last:pb-0"
        >
          <!-- Pricing labels -->
          <div
            class="col-span-4 text-sm capitalize lg:text-base xl:col-span-5"
            :style="`color: ${getClassesColor(item.classTextColor)}`"
          >
            {{ buildName(item.name) }}
          </div>
          <!-- Pricing Data -->
          <div
            class="relative col-span-6 place-content-center px-7 text-xs font-semibold lg:text-base xl:col-span-5"
          >
            <!-- Authorized -->
            <div class="grid grid-cols-4 gap-3 text-sm">
              <div v-if="item.today" class="text-right">
                {{ formatValue(item.today, item.unitMeasure) }}
              </div>
              <div
                v-else-if="item.isPublic || hasActiveMembership"
                class="flex items-center justify-end pr-5"
              >
                --
              </div>
              <SummaryTableBlockedData v-else />

              <PriceAssessmentsSummaryIndexValue
                v-if="item.latestChange"
                :value="item.latestChange"
              />
              <div
                v-else-if="item.isPublic || hasActiveMembership"
                class="flex items-center justify-end pr-5"
              >
                --
              </div>
              <SummaryTableBlockedData v-else />

              <PriceAssessmentsSummaryIndexValue
                v-if="item.yearOnYear"
                :value="item.yearOnYear"
              />
              <div
                v-else-if="item.isPublic || hasActiveMembership"
                class="flex items-center justify-end pr-5"
              >
                --
              </div>
              <SummaryTableBlockedData v-else />

              <PriceAssessmentsSummaryIndexValue
                v-if="item.yearToDate"
                :value="item.yearToDate"
              />
              <div
                v-else-if="item.isPublic || hasActiveMembership"
                class="flex items-center justify-end pr-5"
              >
                --
              </div>
              <SummaryTableBlockedData v-else />
              <TooltipShare
                v-if="item.isPublic"
                :twitter-link="
                  getTwitterLink(
                    label,
                    item.name,
                    frequency,
                    item.today || '--',
                    item.latestChange || '--',
                    item.yearOnYear || '--',
                    item.yearToDate || '--',
                  )
                "
                :linkedin-shareable-title="`${label} Index`"
                :linkedin-link="getRouteToShare"
                :link="getRouteToShare"
                class="absolute -top-1 right-0 text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SummaryTableBlockedData from './SummaryTableBlockedData.vue'
import TooltipShare from '@/components/TooltipShare.vue'
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'
import { getClassesColor } from '~/utils/get-classes-color'
import IconPriceHighlightedLogo from '~/assets/icons/price-highlighted-logo.svg'

export default {
  components: {
    SummaryTableBlockedData,
    TooltipShare,
    IconPriceHighlightedLogo,
  },

  props: {
    label: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    classTextColor: {
      type: String,
      default: 'text-surface-em-high',
    },
    authorized: Boolean,
    frequency: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      tweetText: '',
      getClassesColor,
      showLogo: this.classTextColor === 'industry-leading',
    }
  },

  computed: {
    hasFrequency() {
      return this.frequency !== ''
    },
    getRouteToShare() {
      return `https://www.benchmarkminerals.com/${PRICE_ASSESSMENTS.slug}/${this.category}/?tab=table`
    },
    hasActiveMembership() {
      return !!this.$store.state.memberships[this.subscription]
    },
    changeLabel() {
      if (
        this.category === 'nickel' &&
        this.label === 'Benchmark Sustainable Nickel Metal'
      ) {
        return 'Ni Metal'
      } else if (
        this.category === 'nickel' &&
        this.label === 'Benchmark Sustainable Nickel Sulphate'
      ) {
        return 'NiSO4'
      } else if (
        this.category === 'synthetic-graphite' &&
        this.label === 'External Tolling Fees'
      ) {
        return 'Graphitisation Tolling Fees'
      }

      return this.label
    },
  },
  methods: {
    getTwitterLink(
      indexLabel,
      valueLabel,
      frequencyLabel,
      todayValue,
      latestChangeValue,
      yoyValue,
      ytdValue,
    ) {
      const encodePost = encodeURIComponent(`${indexLabel}
${valueLabel}
====================
Current: ${todayValue}
${frequencyLabel}: ${latestChangeValue}
YOY: ${yoyValue}
YTD: ${ytdValue}

Source: @Benchmarkmin
See more at ${this.getRouteToShare}
`)
      return `https://twitter.com/intent/tweet?text=${encodePost}`
    },
    transformData(value) {
      if (value === '--') return '0.0'

      return value
    },
    buildName(name) {
      if (this.category === 'lithium' && name.includes('CIF Asia;')) {
        name = name.replace('CIF Asia;', 'CIF Asia (Combined);')
      } else if (
        this.category === 'nickel' &&
        name.includes('EXW Europe; Min 99.8%') &&
        this.label === 'Benchmark Sustainable Nickel Metal'
      ) {
        name = 'Benchmark Sustainable EXW Europe; Min 99.8%'
      } else if (
        this.category === 'nickel' &&
        name.includes('CIF Asia; 100% Ni Contained') &&
        this.label === 'Benchmark Sustainable Nickel Sulphate'
      ) {
        name = 'Benchmark Sustainable CIF Asia, 100% Ni contained'
      }

      return name
    },
    formatValue(data, unitMeasure) {
      const transformData = this.transformData(data)

      let value = ''
      if (unitMeasure === '%') {
        value = `${transformData}%`
      } else {
        value = `$${transformData}`
      }

      return value
    },
  },
}
</script>
