import { EventBus } from './eventBus'
import { escapeSpecialCharacter } from './string'

export const iconChecked = `
    <svg style="height: 19px; width: 20px" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
    </svg>`

export const iconUnchecked = `
    <svg style="height: 19px; width: 20px" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99988 30L29.9999 10M9.99988 10L29.9999 30" stroke="currentColor" stroke-width="4.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`

export const SliderCheckbox = `
    <svg style="height: 22px; width: 34px" xmlns="http://www.w3.org/2000/svg">
      <rect y="5" width="34" height="14" rx="7" fill="currentColor" fill-opacity="0.38" />
        <g id="Group_1" class="transition-all duration-300 ease-in-out translate-x-0">
          <path d="M24 22C29.5228 22 34 17.5228 34 12C34 6.47715 29.5228 2 24 2C18.4772 2 14 6.47715 14 12C14 17.5228 18.4772 22 24 22Z" fill="#212121" fill-opacity="0.08" />
        </g>
      <path id="path_2" d="M24 22C29.5228 22 34 17.5228 34 12C34 6.47715 29.5228 2 24 2C18.4772 2 14 6.47715 14 12C14 17.5228 18.4772 22 24 22Z" fill="currentColor" class="transition-all duration-300 ease-in-out translate-x-0" />
    </svg>`

const getOrCreateContainer = (id, classes) => {
  const legendContainer = document.getElementById(id)
  let divContainer = legendContainer.querySelector('div')

  if (!divContainer) {
    divContainer = document.createElement('div')
    divContainer.classList.add(...classes)

    legendContainer.appendChild(divContainer)
  }

  return divContainer
}

const buildCategoryToggle = (category, chart, replaceLegend) => {
  const categoryChecked = category.value ? 'checked' : ''
  const categoryBackgroundColor = category.value ? '#FDBD00' : '#CACBD3'
  const iconBackground = categoryChecked ? iconChecked : iconUnchecked

  const principalContainer = document.createElement('div')
  principalContainer.classList.add('flex', 'flex-col')
  principalContainer.setAttribute('id', `id-container--${category.name}`)

  const label = document.createElement('label')
  label.setAttribute('for', `id--${category.name}`)
  label.classList.add('flex', 'cursor-pointer', 'items-center', 'w-max')

  const divContainer = document.createElement('div')
  divContainer.classList.add('relative')

  const input = document.createElement('input')
  input.setAttribute('id', `id--${category.name}`)
  input.setAttribute('type', 'checkbox')
  input.checked = category.value
  if (categoryChecked) {
    input.setAttribute('checked', categoryChecked)
  } else {
    input.removeAttribute('checked')
  }
  input.classList.add('peer', 'sr-only')

  const div = document.createElement('div')
  div.classList.add('block', 'h-6', 'w-11', 'rounded-full', 'bg-grey-400')
  div.style.backgroundColor = categoryBackgroundColor

  const div2 = document.createElement('div')
  div2.classList.add('pt-[2.5px]', 'pl-[1px]', 'flex', 'pr-[1.6px]')
  if (!categoryChecked) {
    div2.classList.add('justify-end')
  } else {
    div2.classList.add('justify-start')
  }
  div2.innerHTML = iconBackground

  div.appendChild(div2)

  const div3 = document.createElement('div')
  div3.classList.add(
    'absolute',
    'left-[2px]',
    'top-0.5',
    'h-5',
    'w-5',
    'rounded-full',
    'bg-grey-900',
    'transition',
    'peer-checked:translate-x-full',
  )

  divContainer.appendChild(input)
  divContainer.appendChild(div)
  divContainer.appendChild(div3)

  const div4 = document.createElement('div')
  div4.classList.add('text-gray-700', 'ml-2', 'font-semibold')
  const legendMappings = {
    LCO: 'LCO Feedstock',
    LFP: 'LFP Feedstock',
    NCM: 'NCM Feedstock',
    'Tolling Fees': 'Graphitisation Tolling Fees',
  }

  div4.innerHTML = replaceLegend
    ? category.name.replace(
        /\b(LCO|LFP|NCM|Tolling(?:\s+Fees)?)\b/g,
        (match) => legendMappings[match],
      )
    : category.name

  label.appendChild(divContainer)
  label.appendChild(div4)

  const div5 = document.createElement('div')
  div5.classList.add(
    'mt-4',
    'mb-6',
    'grid',
    'grid-cols-1',
    'gap-x-4',
    'gap-y-1.5',
    'lg:grid-cols-4',
  )
  div5.setAttribute('id', `container-subcategories`)
  principalContainer.appendChild(label)
  principalContainer.appendChild(div5)

  label.onclick = () => {
    category.value = !category.value
    const items = chart.options.plugins.legend.labels.generateLabels(chart)
    items
      .filter(
        (element) =>
          element.text.replace('(RHS)', '').split('#')[0].trim() ===
          category.name,
      )
      .forEach((item) => {
        chart.setDatasetVisibility(item.datasetIndex, category.value)
      })
    chart.update()
  }

  return principalContainer
}

const validateAllSelectOption = (categoryLabel, chart) => {
  chart.update()
  const items = chart.options.plugins.legend.labels.generateLabels(chart)
  const elements = items.filter((element) =>
    element.text.includes(`${categoryLabel} #`),
  )

  return elements.every((element) => !element.hidden)
}

const getBackgroundColor = (legendType, item) => {
  if (item.hidden) {
    return '#CACBD3'
  }

  return legendType === 'capacity' ? item.fillStyle : item.strokeStyle
}

const getClassText = (legendType) => {
  const classes = ['text-gray-900', 'mr-2', 'font-semibold', 'text-sm']
  if (legendType === 'capacity') {
    classes.push('w-min', 'text-right')
  } else {
    classes.push('w-auto')
  }

  return classes
}

const generateLegends = (
  chart,
  options,
  legendType,
  classes = ['flex', 'flex-wrap', 'gap-6'],
) => {
  const container = getOrCreateContainer(options.containerID, classes)
  // Remove old legend items
  while (container.firstChild) {
    container.firstChild.remove()
  }

  // Reuse the built-in legendItems generator
  const items = chart.options.plugins.legend.labels.generateLabels(chart)
  items.forEach((item) => {
    const checked = !item.hidden ? 'checked' : ''
    const iconBackground = !item.hidden ? iconChecked : iconUnchecked
    const backgroundColor = getBackgroundColor(legendType, item)

    const principalContainer = document.createElement('div')
    principalContainer.classList.add('flex', 'flex-col')
    principalContainer.setAttribute('id', `id-container--${item.text}`)

    const label = document.createElement('label')
    label.setAttribute('for', `id--${item.text}`)
    label.classList.add('flex', 'cursor-pointer', 'items-center', 'w-max')

    const div4 = document.createElement('div')
    div4.classList.add(...getClassText(legendType))
    div4.innerHTML = item.text

    const divContainer = document.createElement('div')
    divContainer.classList.add('relative')

    const input = document.createElement('input')
    input.setAttribute('id', `id--${item.text}`)
    input.setAttribute('type', 'checkbox')
    input.checked = !item.hidden
    input.classList.add('peer', 'sr-only')

    const circleClassColor =
      chart.getDatasetMeta(item.datasetIndex)?._dataset?.circleClassColor ??
      'bg-grey-900'

    const checkClassColor =
      chart.getDatasetMeta(item.datasetIndex)?._dataset?.checkClassColor ??
      'text-grey-900'

    const div = document.createElement('div')
    div.classList.add('block', 'h-6', 'w-11', 'rounded-full', 'bg-grey-400')
    div.style.backgroundColor = backgroundColor

    const div2 = document.createElement('div')
    div2.classList.add('pt-[2.5px]', 'pl-[1px]', 'flex', 'pr-[1.6px]')

    if (checked) {
      div2.classList.add(checkClassColor)
      div2.classList.add('justify-start')
      input.setAttribute('checked', checked)
    } else {
      div2.classList.add('text-grey-900')
      div2.classList.add('justify-end')
      input.removeAttribute('checked')
    }

    div2.innerHTML = iconBackground

    div.appendChild(div2)

    const div3 = document.createElement('div')
    div3.classList.add(
      'absolute',
      'left-[2px]',
      'top-0.5',
      'h-5',
      'w-5',
      'rounded-full',
      'transition',
      'peer-checked:translate-x-full',
    )
    if (checked) {
      div3.classList.add(circleClassColor)
    } else {
      div3.classList.add('bg-grey-900')
    }

    divContainer.appendChild(input)
    divContainer.appendChild(div)
    divContainer.appendChild(div3)

    label.appendChild(div4)
    label.appendChild(divContainer)

    principalContainer.appendChild(label)

    label.onclick = () => {
      chart.setDatasetVisibility(
        item.datasetIndex,
        !chart.isDatasetVisible(item.datasetIndex),
      )
      if (legendType === 'capacity') {
        EventBus.$emit('toggleonchart', item.text)
      }
      chart.update()
    }

    container.appendChild(principalContainer)
  })
}

export const generatePriceLegends = {
  id: 'htmlLegend',
  afterUpdate(chart, _, options) {
    const container = getOrCreateContainer(options.containerID, [
      'flex',
      'flex-col',
    ])
    // Remove old legend items
    while (container.firstChild) {
      container.firstChild.remove()
    }

    options.categories.forEach((category) => {
      container.appendChild(
        buildCategoryToggle(category, chart, options.replaceLegend),
      )
    })

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart)
    items.forEach((item) => {
      const div = document.createElement('div')
      div.classList.add(
        'flex',
        'items-center',
        'ml-2',
        'flex-row',
        'cursor-pointer',
      )
      const categoryLabel = item.text.split('#')[0].replace('(RHS)', '').trim()

      div.onclick = () => {
        chart.setDatasetVisibility(
          item.datasetIndex,
          !chart.isDatasetVisible(item.datasetIndex),
        )

        const categoryValue = validateAllSelectOption(categoryLabel, chart)

        const category = options.categories.find(
          (category) => category.name === categoryLabel,
        )
        category.value = categoryValue

        chart.update()
      }

      const backgroundColor = !item.hidden ? item.strokeStyle : '#ffffff'
      // Color box
      const boxSpan = document.createElement('input')
      boxSpan.classList =
        'form-checkbox h-4 w-4 cursor-pointer border border-b focus:shadow-none focus:ring-0 focus:ring-offset-0'
      boxSpan.type = 'checkbox'
      boxSpan.checked = !item.hidden
      boxSpan.style.backgroundColor = backgroundColor
      boxSpan.style.borderColor = item.strokeStyle
      boxSpan.style.borderWidth = item.lineWidth + 'px'
      boxSpan.style.display = 'inline-block'
      boxSpan.style.marginRight = '10px'

      // Text
      const textContainer = document.createElement('p')
      textContainer.style.color = item.fontColor
      textContainer.style.margin = 0
      textContainer.style.padding = 0
      textContainer.classList = 'text-gray-900 ml-2 font-normal text-xs'

      let label = item.text.split('#').slice(1).join('-')
      if (label.trim() === '') {
        label = item.text.replace('#', '')
      }

      textContainer.innerHTML = escapeSpecialCharacter(label)

      div.appendChild(boxSpan)
      div.appendChild(textContainer)

      document
        .getElementById(`id-container--${categoryLabel}`)
        .querySelector('#container-subcategories')
        .appendChild(div)
    })
  },
}

export const generateCapacityLegends = {
  id: 'htmlLegend',
  afterUpdate(chart, _, options) {
    generateLegends(chart, options, 'capacity', [
      'flex',
      'gap-4',
      'mx-4',
      'flex-wrap',
      'justify-center',
      'sm:mx-auto',
      'lg:flex-nowrap',
    ])
  },
}

export const generateSimpleLegends = {
  id: 'htmlLegend',
  afterUpdate(chart, _, options) {
    generateLegends(chart, options, 'simple')
  },
}

export const generateSliderLegends = {
  id: 'htmlLegend',
  afterUpdate(chart, _, options) {
    const container = getOrCreateContainer(options.containerID, [
      'grid',
      'grid-cols-2',
      'gap-4',
      'px-9',
      'md:px-0',
      options.cssClass,
    ])
    // Remove old legend items
    while (container.firstChild) {
      container.firstChild.remove()
    }

    const items = chart.options.plugins.legend.labels.generateLabels(chart)
    items.forEach((item) => {
      const checked = !item.hidden ? 'translate-x-0' : '-translate-x-[12px]'
      const re = /translate-x-0/gi
      const newSlider = SliderCheckbox.replace(re, checked)

      const label = document.createElement('label')
      label.classList.add(
        'flex',
        'w-full',
        'cursor-pointer',
        'items-center',
        'justify-start',
      )

      label.onclick = () => {
        const { type } = chart.config
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index)
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex),
          )
        }
        chart.update()
      }
      const backgroundColor = !item.hidden ? item.fillStyle : '#CACBD3'

      const div = document.createElement('div')
      div.classList.add('relative')
      div.style.color = backgroundColor
      div.innerHTML = newSlider

      // Text
      const textContainer = document.createElement('div')
      textContainer.classList.add(
        'text-gray-900',
        'ml-2',
        'uppercase',
        'text-xxs',
        'font-lato',
      )

      const text = document.createTextNode(item.text)
      textContainer.appendChild(text)

      label.appendChild(div)
      label.appendChild(textContainer)

      container.appendChild(label)
    })
  },
}
