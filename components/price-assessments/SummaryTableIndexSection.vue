<template>
  <div v-if="isNotEmpty(indexData) && latestChange" class="grid grid-cols-10">
    <!-- Index label -->
    <div class="col-span-4 font-semibold" data-testid="more-info-desktop">
      {{ getTitleIndex() }}
    </div>
    <!-- Index data -->
    <div
      class="col-span-6 grid grid-cols-6 place-content-center gap-3 font-semibold lg:text-sm"
    >
      <PriceAssessmentsSummaryIndexValue
        class="!justify-start"
        :value="latestChange"
      />
      <PriceAssessmentsSummaryIndexValue
        class="!justify-start"
        :value="yearOnYear"
      />
      <PriceAssessmentsSummaryIndexValue
        class="!justify-start"
        :value="yearToDate"
      />

      <div>{{ today }}</div>
      <div>{{ last }}</div>
      <a
        v-if="!isEmpty(indexData)"
        target="_blank"
        :href="`https://twitter.com/intent/tweet?text=${post}`"
        rel="noopener"
        class="mr-3 cursor-pointer justify-self-end"
      >
        <ShareIcon />
      </a>
    </div>
  </div>
</template>

<script>
import lowerCase from 'lodash/lowerCase'
import capitalize from 'lodash/capitalize'
import AuthenticationMixin from '@/mixins/AuthenticationMixin'
import ShareIcon from '~/assets/icons/TwitterLogo.svg'
import { PRICE_ASSESSMENTS } from '~/constants/services/constants'

export default {
  components: {
    ShareIcon,
  },
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
    pricingData: {
      type: Array,
      default() {
        return []
      },
    },
    authorized: Boolean,
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
    isAnodeOrCathodeCategory() {
      return ['ev', 'ess'].includes(this.indexName?.toLowerCase())
    },
    title() {
      const categories = {
        ev: 'EV',
        ess: 'ESS',
      }
      return categories[this.indexName?.toLowerCase()] ?? this.indexName
    },
    updateFrequency() {
      return this.indexData?.updateFrequency ?? '1M'
    },
    latestChange() {
      return this.indexData.latestChange
    },
    yearToDate() {
      return this.indexData.yearToDate
    },
    yearOnYear() {
      return this.indexData.yearOnYear
    },
    today() {
      return this.indexData.today
    },
    last() {
      return this.indexData.last
    },
    postBase() {
      const title = this.getTitleIndex(true)

      return `${title}
====================
TODAY:      ${this.today}
${this.updateFrequency}:             ${this.latestChange}%
Y-o-Y:         ${this.yearOnYear}%
`
    },
    post() {
      const routeForTweet = this.getRouteForTweet()
      const text = `${this.postBase}

Source: @Benchmarkmin
See more at ${routeForTweet}`
      return encodeURIComponent(text)
    },
    showButton() {
      return this.pricingData.length && this.indexName !== 'spodumene'
    },
  },

  methods: {
    isNotEmpty(_data) {
      return Object.values(_data).some(
        (_item) => _item !== null && _item !== '',
      )
    },
    isEmpty(_data) {
      return !Object.values(_data).every((_item) => _item)
    },
    getRouteForTweet() {
      if (
        this.slug === 'lithium-prices' ||
        this.slug === 'lithium-ion-battery-prices'
      ) {
        return `https://www.benchmarkminerals.com/${this.slug}/`
      }
      return `https://www.benchmarkminerals.com/${PRICE_ASSESSMENTS.slug}/${this.slug}/`
    },
    getTitleIndex(forTweet = false) {
      const suffix = forTweet ? 'Index' : ''
      if (this.isAnodeOrCathodeCategory) {
        return `${this.title} ${suffix}`.trim()
      }

      const title = `${this.title
        .split(' ')
        .map((_word) => capitalize(_word).replace('Ion', 'ion'))
        .join(' ')} ${suffix}`

      return lowerCase(this.mineral).includes('lithium') &&
        !['lithium', 'spodumene'].includes(lowerCase(this.title))
        ? `Lithium ${title}`
        : title
    },
    openModal() {
      this.$modal.open('tableIndexShare')
      const title = this.getTitleIndex(true)
      const routeForTweet = this.getRouteForTweet()
      const data = this.indexData
      this.$store.commit('modal/setInitialFields', {
        title,
        routeForTweet,
        data,
      })
    },
  },
}
</script>
