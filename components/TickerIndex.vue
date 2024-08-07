<template>
  <div
    v-if="name"
    :id="elId"
    ref="tickerItem"
    class="relative flex items-center"
    :class="hasAccess ? '' : 'mx-1'"
  >
    <span class="mr-2 whitespace-nowrap font-normal">
      {{ indexName }}
    </span>
    <CloseLock
      v-if="!hasAccess"
      class="hover:text-green-light mx-1 max-h-4 w-auto cursor-pointer"
      @click="$modal.open('signIn')"
    />
    <span v-else>{{ today }}</span>
    <span
      class="ml-2 flex min-w-[45px] items-center text-xs"
      :class="getColor(percentageChange)"
    >
      {{ percentageChange }}%
      <IconLeftAngle
        v-if="percentageChange !== 0"
        class="w-5 -rotate-90"
        :class="
          (isPercentageChangeGreaterThanZero && 'rotate-90 ') + iconAngleHidden
        "
      />
    </span>
  </div>
</template>

<script>
import tippy from 'tippy.js'
import CloseLock from '~/assets/icons/close-lock.svg'
import IconLeftAngle from '@/assets/icons/angle-left.svg'
import { buildSVGChart } from '@/utils/build-svg-chart'
import { FRONTEND_DOMAIN } from '~/utils/constants'
import { scrollTo } from '~/utils/scroll'

const iconArrowDown =
  '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414Z"/></svg>'
const iconArrowUp =
  '<svg width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.707 11.707a1 1 0 0 1-1.414 0L9 8.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414Z"/></svg>'

const ZERO = 0

export default {
  components: {
    CloseLock,
    IconLeftAngle,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    percentageChange: {
      type: Number,
      default: null,
    },
    today: {
      type: Number,
      default: null,
    },
    hasAccess: {
      type: Boolean,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    membership: {
      type: String,
      required: true,
    },
    identifier: {
      type: String,
      required: true,
    },
    pauseAnimation: {
      type: Function,
      required: true,
    },
    resumeAnimation: {
      type: Function,
      required: true,
    },
    debounceResumeAnimation: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      elId: `${this.name.toLowerCase().replace(' ', '-')}-${this.identifier}`,
      indexName: `${this.name} Index`,
      chartInstance: null,
      link: this.url.replace(FRONTEND_DOMAIN, '') || '',
      buildSVGChart,
      elementIDsWithOpenModalAction: [],
      elementIDsWithTickerAnimationActions: [],
      elementIDsWithLinks: [],
      domain: FRONTEND_DOMAIN,
      scrollTo,
    }
  },

  computed: {
    isPercentageChangeGreaterThanZero() {
      return this.percentageChange !== null && this.percentageChange > ZERO
    },
    iconAngleHidden() {
      return this.percentageChange === 0 && 'hidden'
    },
  },

  mounted() {
    const {
      indexName,
      buildSVGChart,
      setOpenModalListener,
      setTickerAnimationListeners,
      setNavigationListener,
      getIndex,
      getColor,
      getFormattedValue,
    } = this
    this.$nextTick(() => {
      tippy(this.$refs.tickerItem, {
        content: '',
        allowHTML: true,
        interactive: true,
        appendTo: document.body,
        onShow(instance) {
          const {
            today,
            yearOnYear,
            yearToDate,
            chartData,
            percentageChange,
            updateFrequency,
            hasAccess,
          } = getIndex().values
          const yoyColor = getColor(yearOnYear)
          const yoyValue = getFormattedValue(yearOnYear)
          const ytdColor = getColor(yearToDate)
          const ytdValue = getFormattedValue(yearToDate)
          const indexPercentageColor = getColor(percentageChange)
          const indexPercentageValue = getFormattedValue(percentageChange)
          const isPercentageChangeZero = percentageChange === 0
          const isPercentageChangeGreaterThanZero =
            percentageChange !== null && percentageChange > ZERO
          const iconLock =
            '<svg xmlns="http://www.w3.org/2000/svg" width="12.7" height="16" viewBox="0 0 44 56" fill="currentColor"><path d="M38 20h-2v-6a14 14 0 0 0-28 0v6H6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h32a6 6 0 0 0 6-6V26a6 6 0 0 0-6-6Zm-26-6a10 10 0 0 1 20 0v6H12v-6Zm28 36a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V26a2 2 0 0 1 2-2h32a2 2 0 0 1 2 2v24Z"/><path  d="M22 31a4 4 0 0 0-2 7.4V43a2 2 0 0 0 4 0v-4.6a4 4 0 0 0-2-7.4Z"/></svg>'
          const iconTitle =
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="#FDBD00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

          const chartWidth = 146
          const chartHeight = 73
          const SVGChart = buildSVGChart(
            chartData.data,
            chartData.dates,
            chartWidth,
            chartHeight,
          )

          const chartContainer = document.createElement('div')
          chartContainer.innerHTML = SVGChart

          chartContainer.style.width = chartWidth
          chartContainer.style.height = chartHeight
          chartContainer.style.margin = '8px 0 11px 0'

          const mainDataContainer = document.createElement('div')
          const headerContainer = document.createElement('div')
          const contentContainer = document.createElement('div')
          const leftContainer = document.createElement('div')
          const rightContainer = document.createElement('div')
          const rightDataContainer = document.createElement('div')
          const rightFirstRow = document.createElement('div')
          const firstRowHeader = document.createElement('div')
          const firstRowContent = document.createElement('div')
          const rightSecondRow = document.createElement('div')
          const secondRowHeader = document.createElement('div')
          const secondRowContent = document.createElement('div')
          const spanCurrent = document.createElement('span')
          const spanCurrentIndexValue = document.createElement('span')
          const spanYOY = document.createElement('span')
          const spanYOYValue = document.createElement('span')
          const spanUpdateFrequency = document.createElement('span')
          const spanUpdateFrequencyValue = document.createElement('span')
          const spanYTD = document.createElement('span')
          const spanYTDValue = document.createElement('span')
          const linkTitle = document.createElement('div')
          const spanTitle = document.createElement('span')
          const spanTitleIcon = document.createElement('span')
          const leftTitle = document.createElement('span')
          const leftIndexValue = document.createElement('span')
          const leftChartLabel = document.createElement('span')

          linkTitle.classList.add('tooltip-header-link')
          contentContainer.classList.add('tooltip-content-container')
          leftContainer.classList.add('tooltip-left-container')
          rightContainer.classList.add('tooltip-right-container')
          leftTitle.classList.add('tooltip-left-title')
          leftIndexValue.classList.add('tooltip-left-index-value')
          leftChartLabel.classList.add('tooltip-left-chart-label')
          spanTitle.classList.add('tooltip-title')

          rightDataContainer.classList.add('tooltip-right-data-container')
          rightFirstRow.classList.add('tooltip-right-row')
          rightSecondRow.classList.add('tooltip-right-row')
          spanCurrentIndexValue.classList.add('tooltip-right-row-value')
          spanYOYValue.classList.add('tooltip-right-row-value')
          spanUpdateFrequencyValue.classList.add('tooltip-right-row-value')
          spanYTDValue.classList.add('tooltip-right-row-value')

          let indexArrow = ''
          if (!isPercentageChangeZero) {
            if (isPercentageChangeGreaterThanZero) {
              indexArrow = iconArrowUp
            } else {
              indexArrow = iconArrowDown
            }
          }

          if (hasAccess) {
            leftIndexValue.textContent = today
            spanCurrentIndexValue.innerHTML = indexArrow + today
            spanCurrentIndexValue.classList.add(indexPercentageColor)
          } else {
            const contactUsContainer = document.createElement('div')
            contactUsContainer.classList.add('tooltip-contact-us-container')
            const contactUsSpan = document.createElement('span')
            contactUsSpan.innerHTML = 'Contact us ' + iconArrowUp
            contactUsContainer.innerHTML = iconLock
            contactUsContainer.firstChild.style.color = '#FDC723'
            contactUsContainer.appendChild(contactUsSpan)
            leftIndexValue.appendChild(contactUsContainer)
            contactUsContainer.firstChild.style.height = '18px'
            contactUsContainer.firstChild.style.width = 'auto'
            contactUsContainer.firstChild.style.margin = '0 0 4px 0'
            spanCurrentIndexValue.innerHTML = iconLock
            spanCurrentIndexValue.firstChild.style.height = '18px'
            spanCurrentIndexValue.firstChild.style.width = 'auto'
            spanCurrentIndexValue.firstChild.style.color = '#FDC723'
          }

          spanTitle.textContent = indexName
          spanTitleIcon.innerHTML = iconTitle
          leftTitle.textContent = 'Current'
          leftChartLabel.textContent = '1 Year Index Trend'
          spanCurrent.textContent = 'Current'
          spanYOY.textContent = 'YOY'
          spanYOYValue.innerHTML = yoyValue
          spanYOYValue.classList.add(yoyColor)
          spanUpdateFrequency.textContent = updateFrequency?.toUpperCase()
          spanUpdateFrequencyValue.innerHTML = indexPercentageValue
          spanUpdateFrequencyValue.classList.add(indexPercentageColor)
          spanYTD.textContent = 'YTD'
          spanYTDValue.innerHTML = ytdValue
          spanYTDValue.classList.add(ytdColor)

          headerContainer.appendChild(linkTitle)
          linkTitle.appendChild(spanTitle)
          linkTitle.appendChild(spanTitleIcon)
          contentContainer.appendChild(leftContainer)
          contentContainer.appendChild(rightContainer)
          leftContainer.appendChild(leftTitle)
          leftContainer.appendChild(leftIndexValue)
          leftContainer.appendChild(leftChartLabel)
          leftContainer.appendChild(chartContainer)
          rightContainer.appendChild(rightDataContainer)
          rightDataContainer.appendChild(rightFirstRow)
          rightDataContainer.appendChild(rightSecondRow)
          rightFirstRow.appendChild(firstRowHeader)
          rightFirstRow.appendChild(firstRowContent)
          rightSecondRow.appendChild(secondRowHeader)
          rightSecondRow.appendChild(secondRowContent)
          firstRowHeader.appendChild(spanCurrent)
          firstRowHeader.appendChild(spanYOY)
          firstRowContent.appendChild(spanCurrentIndexValue)
          firstRowContent.appendChild(spanYOYValue)
          secondRowHeader.appendChild(spanUpdateFrequency)
          secondRowHeader.appendChild(spanYTD)
          secondRowContent.appendChild(spanUpdateFrequencyValue)
          secondRowContent.appendChild(spanYTDValue)

          mainDataContainer.appendChild(headerContainer)
          mainDataContainer.appendChild(contentContainer)

          instance.setContent(
            `<div class="ticker-tooltip">${mainDataContainer.outerHTML}</div>`,
          )
        },
        onMount(_instance) {
          const content = document.querySelector('.tippy-content')
          content.style.top = '12px'
          const arrow = document.querySelector('.tippy-arrow')
          arrow.style.top = '12px'
        },
        onShown(instance) {
          setOpenModalListener(instance)
          setTickerAnimationListeners(instance)
          setNavigationListener(instance)
        },
      })
      this.$emit('mounted')
    })
  },

  methods: {
    getIndex() {
      return this.$store.state.indexes.indexesStates.find(
        (index) => index.name === this.name,
      )
    },
    getColor(value) {
      if (value === ZERO || value === null) return 'text-s-500'
      if (value > ZERO) return 'text-green-light'
      return 'text-error-light'
    },
    getFormattedValue(value) {
      if (value === null) return `--`
      if (value === 0) return `0.0%`
      if (value < 0) return `${iconArrowDown}${value}%`
      return `${iconArrowUp}${value}%`
    },
    setOpenModalListener(instance) {
      const contactUsContainer = document.querySelector(
        '.tooltip-contact-us-container',
      )
      if (!contactUsContainer) return
      if (!this.elementIDsWithOpenModalAction.includes(instance.id)) {
        contactUsContainer?.addEventListener('click', () => {
          this.$modal.open('contact')
          instance.hide()
        })
        this.elementIDsWithOpenModalAction.push(instance.id)
      }
    },
    setTickerAnimationListeners(instance) {
      if (!this.elementIDsWithTickerAnimationActions.includes(instance.id)) {
        const tickerTooltip = document.querySelector('.ticker-tooltip')
        tickerTooltip.addEventListener('mouseover', (_e) => {
          this.pauseAnimation()
          this.debounceResumeAnimation.clear()
        })
        tickerTooltip.addEventListener('mouseleave', (_e) => {
          this.debounceResumeAnimation.debounce(this.resumeAnimation, 1000)
        })
        this.elementIDsWithTickerAnimationActions.push(instance.id)
      }
    },
    setNavigationListener(instance) {
      const linkTitle = document.querySelector('.tooltip-header-link')
      if (!linkTitle) return
      if (this.elementIDsWithLinks.includes(instance.id)) return

      linkTitle.addEventListener('click', () => {
        let link = this.link
        if (!link.includes('?tab=chart')) link += '?tab=chart'
        if (!link.includes('portal/')) link = link.replace('portal', 'portal/')
        if (!this.$store.state.memberships[this.membership])
          link = link.replace('portal/', '')
        this.$router.push(link)
        const { fullPath } = this.$router.currentRoute
        if (fullPath.includes(link)) {
          this.scrollTo('summary-content')
          this.scrollTo('lithium-ion-battery-raw-material-index-chart')
        }
        instance.hide()
      })
      this.elementIDsWithLinks.push(instance.id)
    },
  },
}
</script>
