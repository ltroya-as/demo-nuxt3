<template>
  <tr class="text-right lg:text-lg">
    <td class="text-p-em-high p-4 text-left text-sm font-semibold lg:px-7">
      {{ NAME_ALIASES[cathode] }}
    </td>

    <LithiumIonBatteryCell :value="month" />
    <LithiumIonBatteryCell :value="YOY" />
    <LithiumIonBatteryCell :value="YTD" />
    <td class="p-4 text-sm font-semibold lg:px-7">{{ latest.toFixed(1) }}</td>
    <td class="p-4 text-sm font-semibold lg:px-7">{{ last.toFixed(1) }}</td>
    <td class="grid p-4 text-left lg:px-7">
      <a
        :href="`https://twitter.com/intent/tweet?text=${post}`"
        class="mr-3 cursor-pointer justify-self-end"
        rel="noopener"
        target="_blank"
      >
        <ShareIcon />
      </a>
    </td>
  </tr>
</template>

<script>
import { Decimal } from 'decimal.js'
import { parse } from 'date-fns'
import ShareIcon from '@/assets/icons/TwitterLogo.svg'

const NAME_ALIASES = {
  'NCM 622 (CIF Asia)': 'NCM Mid-Nickel',
  'NCM 811 (CIF Asia)': 'NCM High-Nickel',
  'LFP Index (EXW China)': 'LFP',
}

export default {
  components: { ShareIcon },
  props: {
    cathode: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      NAME_ALIASES,
    }
  },

  computed: {
    YTD() {
      const lastDecember = this.lastDecember
      const latest = this.latest
      return latest.div(lastDecember).minus(1).times(100)
    },

    YOY() {
      // Get 12 months ago data
      const _12MonthsAgo = this.dataFrom12MonthsAgo
      const latest = this.latest
      return latest.div(_12MonthsAgo).minus(1).times(100)
    },

    month() {
      const latest = this.latest
      const last = this.last
      return latest.div(last).minus(1).times(100)
    },

    last() {
      return new Decimal(this.data[this.data.length - 2].value)
    },

    latest() {
      return new Decimal(this.data[this.data.length - 1].value)
    },

    lastDecember() {
      const current = this.reversedData[0]
      const lastDecember = this.reversedData.find((point) => {
        const sameDate = point.date === current.date
        const pointDate = parse(point.date, 'yyyy-MM-dd', new Date())
        const isDecember = pointDate.getMonth() === 11
        return !sameDate && isDecember
      })

      return new Decimal(lastDecember.value)
    },

    dataFrom12MonthsAgo() {
      const latestDate = this.data[this.data.length - 1].date
      const latestMonth = parse(latestDate, 'yyyy-MM-dd', new Date()).getMonth()

      const _12MonthsAgo = this.reversedData.find((point) => {
        const sameDate = point.date === latestDate
        const pointDate = parse(point.date, 'yyyy-MM-dd', new Date())
        const sameMonth = pointDate.getMonth() === latestMonth
        return !sameDate && sameMonth
      })

      return new Decimal(_12MonthsAgo.value)
    },

    reversedData() {
      const dataCopy = JSON.parse(JSON.stringify(this.data))
      return dataCopy.reverse()
    },

    postBase() {
      const title = this.NAME_ALIASES[this.cathode]

      return `${title}
====================
1M:        ${this.month.abs().toFixed(1)}%
Y-O-Y:  ${this.YOY.abs().toFixed(1)}%
YTD:     ${this.YTD.abs().toFixed(1)}%`
    },
    post() {
      const routeForTweet =
        'https://www.benchmarkminerals.com/lithium-ion-battery-raw-material-index/'
      const text = `${this.postBase}

Source: @Benchmarkmin
See more at ${routeForTweet}`
      return encodeURIComponent(text)
    },
  },
}
</script>
