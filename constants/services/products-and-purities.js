import { COBALT, LITHIUM, NICKEL } from '~/constants/services/constants'

export const CATEGORIES_CHART = Object.freeze([
  {
    name: 'Lithium Hydroxide',
    alias: 'LiOH',
    unit: 'USD/metric tonne (LCE)',
    category: LITHIUM.category,
    format: '#,##0',
  },
  {
    name: 'Lithium Carbonate',
    alias: 'Li2CO3',
    unit: 'USD/metric tonne (LCE)',
    category: LITHIUM.category,
    format: '#,##0',
  },
  {
    name: 'Spodumene',
    alias: 'Li2O',
    unit: 'USD/metric tonne',
    category: LITHIUM.category,
    format: '#,##0',
  },
  {
    name: 'CoSO4',
    alias: 'Cobalt Sulphate',
    unit: 'USD/metric tonne',
    category: COBALT.category,
    format: '#,##0',
  },
  {
    name: 'Co(OH)2',
    alias: 'Cobalt Hydroxide',
    unit: 'USD/metric tonne',
    category: COBALT.category,
    format: '#,##0',
  },
  {
    name: 'Co Metal',
    alias: 'Cobalt Metal',
    unit: 'USD/metric tonne',
    category: COBALT.category,
    format: '#,##0',
  },
  {
    name: 'NiSO4 premium over global refined nickel',
    alias: 'Nickel sulphate',
    unit: 'USD/metric tonne',
    category: NICKEL.category,
    format: '#,##0',
  },
  {
    name: 'NiSO4',
    alias: 'Nickel sulphate',
    unit: 'USD/metric tonne',
    category: NICKEL.category,
    format: '#,##0',
  },
  {
    name: 'Mixed Hydroxide Precipitate',
    alias: 'Ni',
    unit: '%',
    category: NICKEL.category,
    format: '#,##0',
  },
  {
    name: '',
    alias: '',
    unit: 'USD/kWh',
    category: 'lithium-ion-batteries',
    format: '#,##0.00',
  },
])

/**
 * @returns {string|{unit: string, name: string, alias: string}}
 * @param {string} valueSearch
 * @param {string}  propertySearch
 * @param {string|null}  propertyResponse
 */
export const getPropertyOrCategoryByProperty = (
  valueSearch,
  propertySearch = 'name',
  propertyResponse = null,
) => {
  const category = CATEGORIES_CHART.find(
    (item) => item[propertySearch] === valueSearch,
  )
  if (
    category &&
    propertyResponse &&
    Object.keys(category).includes(propertyResponse)
  ) {
    return category[propertyResponse]
  } else if (category) {
    return category
  } else if (propertyResponse === 'format') {
    return '#,##0.00'
  }
  return valueSearch
}
