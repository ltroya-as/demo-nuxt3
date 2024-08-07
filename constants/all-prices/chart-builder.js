export const WATCHLIST_URL = '/market/price-dashboard/watchlist/'
export const DASHBOARD_URL = '/market/price-dashboard'
export const KWH_ID = '4404ca2b-b080-456a-88bb-f99b1f179f59'
export const LITHIUM_ION_BATTERIES_ID = 'lithium-ion-batteries'
export const PAYABLE_ID = 'percentage'
export const PERCENTAGE_ID = '67154b80-7d36-4cd3-a9f3-d135f44046bf'
export const USD_ID = '8e5475a4-0124-43ef-9cb0-9dc03fe75ce8'
export const TONNE_ID = 'f945bd07-b82a-4c36-ba31-4901adccf0ef'
export const IS_SUSTAINABLE = ' (Sustainable)'
export const PRODUCTS_WITH_SUSTAINABLE = ['nickel']

export const STEPS = [
  {
    id: 'products',
    title: 'Products',
    subtitle: 'Select at least one product',
    completed: false,
    hidden: false,
    requiredStep: 1,
  },
  {
    id: 'currency',
    title: 'Currency',
    subtitle: 'Prices will be shown in the selected currency',
    completed: false,
    hidden: true,
    requiredStep: 2,
  },
  {
    id: 'unit',
    title: 'Unit',
    subtitle: 'Prices will be shown in the selected unit',
    completed: true,
    hidden: true,
    requiredStep: 3,
  },
]

export const STEPS_WITHOUT_CURRENCY = STEPS.filter(
  (step) => step.id !== 'currency',
).map((step) => {
  if (step.id === 'unit') return { ...step, requiredStep: 2 }
  return step
})

export const STEP_NAMES = {
  STEP_1: 'products',
  STEP_2: 'currency',
  STEP_3: 'units',
}

export const CHILDREN_NAMES = {
  shippingRegions: 'Shipping Routes',
  unitOfMeasures: 'Price Type',
}

export const KWH_TYPE = {
  id: 'kwh',
  symbol: 'kWh',
  label: 'kWh (Lithium ion Batteries Selected)',
  tooltip: `<div class="bg-black p-4 text-white text-sm rounded-lg">
    <span class="font-semibold">Lithium ion Batteries</span> is measured in <span class="font-semibold">Currency/kWh</span> and cannot be edited.
  </div>`,
}

export const PAYABLE_TYPE = {
  id: PAYABLE_ID,
  label: '% Payable',
  symbol: '%',
  tooltip: `<div class="bg-black p-4 text-white text-sm rounded-lg">
    Payables are measured in Percentage (%) and cannot be edited.
  </div>`,
}

export const PAYABLE_AND_KWH = [KWH_TYPE.id, PAYABLE_TYPE.id]

export const OPTION_NAMES = {
  Tonne: 'Fixed Price',
  Percentage: 'Payable',
}

export const UNITS_MEASUREMENTS = [
  {
    id: 1,
    value: 'tonne',
    name: 'Price',
    isSelected: false,
  },
  { id: 2, value: 'kwh', name: 'unit/kWh', isSelected: false },
  { id: 3, value: PAYABLE_ID, name: '% Payable', isSelected: false },
]
