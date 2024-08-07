import { existProperty } from '~/utils/object'

const generateListData = (list) => {
  return list
    .map((item) => ({ id: item, name: item, selected: true }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

const getDataWithoutFilters = (data) => {
  const noFilters = [
    'productionWithUnit',
    'rank',
    'slug',
    'link',
    'formattedProduction',
  ]
  return data.map((item) => {
    return Object.entries(item)
      .filter(([key]) => !noFilters.includes(key))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  })
}

const getTransformedData = (data) => {
  return data.reduce((acc, item) => {
    const keys = Object.keys(item)
    keys.forEach((key) => {
      if (acc[key]) {
        acc[key] = [...acc[key], item[key]]
      } else {
        acc[key] = [item[key]]
      }
    })
    return acc
  }, {})
}

const getMinMax = (value) => {
  const min = Math.min(...value)
  const max = Math.max(...value)

  return { min, max }
}

const getNumberFilters = ({ name, value, id }) => {
  const { min, max } = getMinMax(value)
  return {
    id,
    name,
    type: 'number',
    minValue: min,
    maxValue: max,
    props: {
      gap: 1,
      min,
      max,
    },
  }
}

const getListFilters = ({ name, value, id }) => ({
  id,
  name,
  type: 'list',
  value,
})

const getFormattedValue = (value) => {
  if (value.some((item) => item > 1000))
    return value.map((item) => Math.ceil(item / 1000))
  return value.map((item) => Math.ceil(item))
}

export const createFilters = ({ data, filterOptions }) => {
  const dataWithoutFilters = getDataWithoutFilters(data)

  const transformedData = getTransformedData(dataWithoutFilters)

  return Object.entries(transformedData)
    .filter(([key]) => filterOptions[key])
    .map(([key, value], index) => {
      const id = `filter-${index}`
      const options = filterOptions[key]
      const name = options?.name || key
      const order = options?.order

      if (typeof value[0] === 'number') {
        return {
          ...getNumberFilters({ name, value: getFormattedValue(value), id }),
          order,
          property: key,
        }
      }

      if (Array.isArray(value[0])) {
        const list = generateListData([...new Set(value.flat())])
        return {
          ...getListFilters({ name, value: list, id }),
          order,
          property: key,
        }
      }

      const list = generateListData([...new Set(value)])
      return {
        ...getListFilters({ name, value: list, id }),
        order,
        property: key,
      }
    })
    .sort((a, b) => a.order - b.order)
}

export const filterDataWithPanel = (data, filters) => {
  return data.filter((producer) =>
    filters.every((filter) => {
      const { property, value, type } = filter
      if (!existProperty(producer, property)) return false

      if (Array.isArray(value) && type === 'list') {
        const producerValue = producer[property]
        const filterValue = value
          .filter((arrItem) => arrItem.selected)
          .map((arrItem) => arrItem.name)

        if (typeof producerValue !== 'string') {
          return producerValue.some((item) => filterValue.includes(item))
        }

        return filterValue.includes(producerValue)
      }

      const { minValue, maxValue } = filter

      if (property === 'production') {
        return (
          producer[property] >= minValue * 1000 &&
          producer[property] <= maxValue * 1000
        )
      }

      return producer[property] >= minValue && producer[property] <= maxValue
    }),
  )
}
