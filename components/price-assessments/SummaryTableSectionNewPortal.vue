<template>
  <div>
    <!-- Index Section-->
    <div
      class="border-p-400 mb-2 grid grid-cols-10 border-b-2 pr-[69px]"
      :class="!hasFrequency ? 'mt-4' : ''"
    >
      <!-- Index label -->
      <div
        data-testid="more-info-desktop"
        class="col-span-4 mb-2 flex select-none items-end font-semibold"
        :style="labelClassColor"
      >
        {{ label }}
        <Icon name="price-highlighted-logo" v-if="showLogo" class="ml-2" />
      </div>
      <div
        v-if="hasFrequency"
        class="bg-s-100 text-surface-em-high col-span-6 ml-6 mt-3 rounded-t-xl py-2 text-sm font-semibold md:px-7 lg:text-lg"
      >
        <div class="grid grid-cols-4 gap-x-3 text-lg">
          <div class="text-right">Current</div>
          <div class="pr-4 text-right uppercase">{{ frequency }}</div>
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
          v-for="(item, i) in data"
          :key="item.name + i"
          class="even:bg-s-100 grid grid-cols-10 items-center py-2 pl-6 pr-[69px] tabular-nums odd:bg-white"
        >
          <div
            class="col-span-4 flex items-center gap-x-3 text-sm lg:text-base"
            :style="labelClassColor"
          >
            <div
              v-if="showPills"
              class="h-3 w-6 shrink-0 rounded-full"
              :style="{ background: item.pillColor || '#000' }"
              data-testid="data-series-pill"
            ></div>
            {{ item.name }}
          </div>
          <div
            class="relative col-span-6 place-content-center px-7 text-xs font-semibold lg:text-base"
          >
            <div class="grid grid-cols-4 gap-3 text-sm">
              <div v-if="item.today" class="text-right">
                {{ formatValue(item.today, item.unitMeasure, item.currency) }}
              </div>
              <div
                v-else-if="hasAccess(item)"
                class="flex items-center justify-end pr-5"
              >
                --
              </div>
              <SummaryTableBlockedData v-else :initial-fields="initialFields" />

              <PriceAssessmentsSummaryIndexValueNewPortal
                v-if="item.latestChange !== null"
                :value="item.latestChange"
              />
              <div
                v-else-if="hasAccess(item)"
                class="flex items-center justify-end pr-5"
              >
                --
              </div>
              <SummaryTableBlockedData v-else :initial-fields="initialFields" />

              <PriceAssessmentsSummaryIndexValueNewPortal
                v-if="item.yearOnYear !== null"
                :value="item.yearOnYear"
              />
              <div
                v-else-if="hasAccess(item)"
                class="flex items-center justify-end pr-5"
              >
                --
              </div>
              <SummaryTableBlockedData v-else :initial-fields="initialFields" />

              <PriceAssessmentsSummaryIndexValueNewPortal
                v-if="item.yearToDate !== null"
                :value="item.yearToDate"
              />
              <div
                v-else-if="hasAccess(item)"
                class="flex items-center justify-end pr-5"
              >
                --
              </div>
              <SummaryTableBlockedData v-else :initial-fields="initialFields" />

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
                class="absolute -right-[37px] -top-1 text-black"
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
import AuthenticationMixin from '@/mixins/AuthenticationMixin'
import { numberFormatter } from '~/utils/number'
import { MARKET } from '~/constants/services/constants'
import { getClassesColor } from '~/utils/get-classes-color'
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    SummaryTableBlockedData,
    TooltipShare,
    Icon,
  },
  mixins: [AuthenticationMixin],
  props: {
    label: {
      type: String,
      required: true,
    },
    classTextColor: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    authorized: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'cobalt',
    },
    subscription: {
      type: String,
      default: null,
    },
    showPills: {
      type: Boolean,
      default: false,
    },
    isSustainable: {
      type: Boolean,
      default: false,
    },
    initialFields: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tweetText: '',
      showLogo:
        this.classTextColor === 'industry-leading' || this.isSustainable,
    }
  },

  computed: {
    hasFrequency() {
      return this.frequency !== ''
    },
    getRouteToShare() {
      if (
        [
          'lithium-prices',
          'lithium-ion-battery-prices',
          'lithium-ion-battery-raw-material-index',
        ].includes(this.slug?.toLowerCase())
      ) {
        return `https://www.benchmarkminerals.com/${this.category}/?tab=chart`
      }
      return `https://www.benchmarkminerals.com/${MARKET.slug}/${this.category}/${this.category}-prices/?tab=index`
    },
    hasActiveMembership() {
      return !!this.$store.state.memberships[this.subscription]
    },
    labelClassColor() {
      let colorStyle = `color: ${getClassesColor(this.classTextColor)}`
      if (this.isSustainable) {
        colorStyle = `color: ${getClassesColor('industry-leading')}`
      }
      return colorStyle
    },
  },
  methods: {
    hasAccess(item) {
      return item.isPublic || this.hasActiveMembership || this.authorized
    },
    transformData(value) {
      if (value === null) return 0

      return value
    },
    formatValue(data, unitMeasure, symbol) {
      const transformedData = numberFormatter(this.transformData(data), 2)
      return unitMeasure === '%'
        ? `${transformedData}%`
        : `${symbol}${transformedData}`
    },

    getTwitterLink(
      indexLabel,
      valueLabel,
      frequencyLabel,
      todayValue,
      latestChangeValue,
      yoyValue,
      ytdValue,
    ) {
      const CURRENT = todayValue ? `Current: ${todayValue}` : ''
      const LATEST_CHANGE = latestChangeValue
        ? `${frequencyLabel}: ${latestChangeValue}`
        : ''
      const YOY = yoyValue ? `YOY: ${yoyValue}` : ''
      const YTD = yoyValue ? `YTD: ${ytdValue}` : ''
      const encodePost = encodeURIComponent(`${indexLabel}
${valueLabel}
====================
${CURRENT}
${LATEST_CHANGE}
${YOY}
${YTD}

Source: @Benchmarkmin
See more at ${this.getRouteToShare}
`)
      return `https://twitter.com/intent/tweet?text=${encodePost}`
    },
  },
}
</script>
