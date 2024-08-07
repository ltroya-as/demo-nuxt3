import { escapeSpecialCharacter } from './string'
import { EventBus } from '~/utils/eventBus'

const onMouseOnChart = (onMouseOnChart) => {
  const tooltipEl = document.getElementById('chartjs-tooltip')
  if (!tooltipEl) {
    return
  }

  if (!onMouseOnChart) {
    tooltipEl.style.opacity = 0
  } else {
    tooltipEl.style.opacity = 1
  }
}

const createTooltipElement = (chart) => {
  // Tooltip Element
  let tooltipEl = chart.canvas.parentNode.querySelector('div')

  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.classList.add('px-3', 'py-2')
    tooltipEl.style['max-height'] = '267px'
    tooltipEl.style['overflow-y'] = 'auto'
    tooltipEl.id = 'chartjs-tooltip'
    tooltipEl.innerHTML = '<table></table>'

    if (!EventBus._events.mouseonchart) {
      EventBus.$on('mouseonchart', onMouseOnChart)
    }

    chart.canvas.parentNode.appendChild(tooltipEl)
  }

  return tooltipEl
}

const handleTooltipClasses = (tooltipEl, tooltipModel) => {
  tooltipEl.classList.remove('above', 'below', 'no-transform')
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign)
  } else {
    tooltipEl.classList.add('no-transform')
  }
}

export const customTooltips = (context, isRange = false) => {
  const { chart, tooltip } = context
  const tooltipEl = createTooltipElement(chart)

  handleTooltipClasses(tooltipEl, tooltip)

  function getBody(bodyItem) {
    return bodyItem.lines
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || []
    const bodyLines = tooltip.body.map(getBody)

    let innerHtml = '<thead>'

    titleLines.forEach((title) => {
      innerHtml += `<tr><th class="text-left font-montserrat text-sm">${title}</th></tr>`
    })
    innerHtml += '</thead><tbody>'

    const generateTooltipRow = (body, i) => {
      const colors = tooltip.labelColors[i]
      const backgroundColor = colors.backgroundColor
      const bodyContent = escapeSpecialCharacter(
        body[0].replace('Tolling Fees', 'Graphitisation Tolling Fees'),
      )
      const tooltipKey = document.createElement('span')
      tooltipKey.classList.add('chartjs-tooltip-key')
      tooltipKey.style.background = backgroundColor
      tooltipKey.style.width = '3px'

      return `<tr><td style="margin-bottom: 4px;" class="flex font-montserrat ${
        isRange && bodyLines.length === 3 ? 'text-sm' : 'text-xs'
      }">${tooltipKey.outerHTML}${bodyContent}</td></tr>`
    }

    if (isRange && bodyLines.length === 3) {
      innerHtml += generateTooltipRow(bodyLines[0], 0)
    } else {
      bodyLines.forEach((body, i) => {
        innerHtml += generateTooltipRow(body, i)
      })
    }
    innerHtml += '</tbody>'

    const tableRoot = tooltipEl.querySelector('table')
    tableRoot.innerHTML = innerHtml
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

  const { width } = tooltipEl.getBoundingClientRect()

  const { xAlign, yAlign, caretX, caretY, x } = tooltip

  // Final coordinates
  const top = positionY + 10 + caretY
  let left = positionX + window.scrollX + caretX
  const space = 8 // The caret plus one pixel for some space, you can increase it.

  // xAlign could be: `left`, `center`, `right`
  if (xAlign === 'left') {
    left += width / 2 - x - space / 2
    if (yAlign === 'center') {
      left += space * 2
    }
  } else if (xAlign === 'right') {
    left -= width / 2
    if (yAlign === 'center') {
      left -= space
    } else {
      left += space
    }
  } else if (xAlign === 'center' && screen.width <= 550) {
    left = left / 2 + 50
  }

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1
  tooltipEl.style.left = `${left}px`
  tooltipEl.style.top = `${top}px`
  tooltipEl.style.fontFamily = tooltip.options.bodyFont.string
  tooltipEl.style.padding =
    tooltip.options.padding.bottom + 'px ' + tooltip.options.padding.left + 'px'
  tooltipEl.style.pointerEvents = 'auto'
}

export const rangeCustomTooltips = (tooltip) => {
  customTooltips(tooltip, true)
}
