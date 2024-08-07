<template>
  <div
    v-if="isNotEmpty(indexData) && latestChange !== null"
    class="grid grid-cols-10"
  >
    <!-- Index label -->
    <div class="col-span-4 font-semibold" data-testid="more-info-desktop">
      {{ indexName }}
    </div>
    <!-- Index data -->
    <div
      class="col-span-6 grid grid-cols-6 place-content-center gap-3 font-semibold lg:text-sm"
    >
      <PriceAssessmentsSummaryIndexValueNewPortal
        class="!justify-start"
        :value="latestChange"
      />
      <PriceAssessmentsSummaryIndexValueNewPortal
        class="!justify-start"
        :value="yearOnYear"
      />
      <PriceAssessmentsSummaryIndexValueNewPortal
        class="!justify-start"
        :value="yearToDate"
      />

      <div class="flex items-center">{{ today }}</div>
      <div class="flex items-center">{{ last }}</div>
      <TooltipShare
        v-if="!isEmpty(indexData)"
        :twitter-link="twitterLink"
        :linkedin-link="getRouteToShare()"
        :linkedin-shareable-title="`${indexName} Index`"
        :link="getRouteToShare()"
        class="mr-3"
      />
    </div>
  </div>
</template>

<script>
import { Decimal } from 'decimal.js'
import AuthenticationMixin from '@/mixins/AuthenticationMixin'
import { MARKET } from '~/constants/services/constants'

export default {
  mixins: [AuthenticationMixin],
  props: {
    indexName: {
      type: String,
      required: true,
    },
    indexData: {
      type: Object,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modalOpen: false,
      tweetText: '',
    }
  },

  computed: {
    updateFrequency() {
      return this.indexData?.updateFrequency ?? '1M'
    },
    latestChange() {
      return this.indexData.latestChange?.value
    },
    yearToDate() {
      return this.indexData.yearToDate?.value
    },
    yearOnYear() {
      return this.indexData.yearOnYear?.value
    },
    today() {
      return new Decimal(this.indexData.today?.value ?? 0).toFixed(1)
    },
    last() {
      return new Decimal(this.indexData.last?.value ?? 0).toFixed(1)
    },
    postBase() {
      const title = this.indexName
      const YOY = this.yearOnYear
        ? `YOY: ${this.formatPercentageValue(this.yearOnYear)}%`
        : ''
      const LATEST_CHANGE = this.latestChange?.value
        ? `${this.updateFrequency}: ${this.formatPercentageValue(
            this.latestChange,
          )}%`
        : ''
      const TODAY = this.indexData.today?.value
        ? `TODAY: ${new Decimal(this.indexData.today?.value ?? 0).toFixed(0)}`
        : ''
      return `${title} Index
====================
${TODAY}
${LATEST_CHANGE}
${YOY}
`
    },
    post() {
      const routeForTweet = this.getRouteToShare()
      const text = `${this.postBase}

Source: @Benchmarkmin
See more at: ${routeForTweet}`
      return encodeURIComponent(text)
    },
    twitterLink() {
      return `https://twitter.com/intent/tweet?text=${this.post}`
    },
  },

  methods: {
    formatPercentageValue(value) {
      if (value === null) return '0.0'
      return new Decimal(value).toFixed(1)
    },
    isNotEmpty(_data) {
      return Object.values(_data).some(
        (_item) => _item !== null && _item !== '',
      )
    },
    isEmpty(_data) {
      return !Object.values(_data).some((_item) => _item)
    },
    getRouteToShare() {
      if (
        [
          'lithium-prices',
          'lithium-ion-battery-prices',
          'lithium-ion-battery-raw-material-index',
        ].includes(this.slug?.toLowerCase())
      ) {
        return `https://www.benchmarkminerals.com/${this.slug}/?tab=chart`
      }
      return `https://www.benchmarkminerals.com/${MARKET.slug}/${this.slug}/${this.slug}-prices/?tab=index`
    },
  },
}
</script>
