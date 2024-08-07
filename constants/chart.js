export const FILTER_KEY_TO_FORM_PARAM = {
  category: 'ProductIdentifiers[]',
  purity: 'Purities[]',
  'shipping route': 'RegionIdentifiers[]',
  grade: 'Sizes[]',
}

export const FILTERS_CHART = {
  categories: [],
  purities: [],
  shippingRoutes: [],
  grades: [],
}

export const FILTERS_CHART_NAME = {
  categories: 'Category',
  purities: 'Purity',
  formats: 'Format',
  shippingRoutes: 'Shipping Route',
  grades: 'Grade',
  feedstocks: 'Feedstock',
  products: 'Product',
}

export const DATA = {
  datasets: [
    {
      data: [
        '99.58177192',
        '101.6096211',
        '106.0964895',
        '110.9831223',
        '114.148222',
        '112.9595657',
        '107.4877785',
        '105.1100388',
        '103.2',
        '102.0',
        '105.21946',
        '106.35045',
        '106.3013229',
        '100.2516433',
      ],
      backgroundColor: '#FDC723',
      borderColor: '#FDC723',
      borderWidth: 1,
      label: 'Natural Graphite',
    },
  ],
  labels: [
    '2022-01-31',
    '2022-02-28',
    '2022-03-31',
    '2022-04-29',
    '2022-05-31',
    '2022-06-30',
    '2022-07-29',
    '2022-08-31',
    '2022-09-30',
    '2022-10-31',
    '2022-11-30',
    '2022-12-30',
    '2023-01-31',
    '2023-02-28',
  ],
}

export const OPTIONS = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  // hide axis on v2 of chart js
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  // hide tooltips
  tooltips: {
    enabled: false,
  },
  // hide labels
  legend: {
    display: false,
  },
  // don't fill the area under the line
  elements: {
    point: {
      radius: 0,
    },
    line: {
      fill: false,
    },
  },
  // hide animation
  animation: {
    duration: 0,
  },
}

export const CATEGORIES_PRICES = Object.freeze({
  nis04: {
    name: 'Nickel Sulphate',
    id: null,
    wwwId: 29,
  },
  nis04_premium: {
    name: 'Nickel Sulphate premium over global refined nickel',
    id: null,
    wwwId: 30,
  },
  china_weighted_index: {
    name: 'China Weighted Index',
    id: 'China Weighted Index',
  },
  china_weighted_average: {
    name: 'China Weighted Average',
    id: 'China Weighted Average',
  },
})

export const SHIPPING_ROUTES_PRICES = Object.freeze({
  cif_asia: {
    name: 'CIF Asia',
  },
  cif_asia_combined: {
    name: 'CIF Asia (Combined)',
  },
  global_weighted_average: {
    name: 'Global Weighted Average',
  },
})

export const LEVEL_KEY_MAP = Object.freeze({
  categories: 'category',
  purities: 'purity',
  shippingRoutes: 'shippingRoute',
  meshSizes: 'grade',
  formats: 'purity',
  feedstocks: 'feedstock',
  products: 'product',
})

export const FILTER_KEY_MAP = Object.freeze({
  categories: 'Category',
  purities: 'Purity',
  shippingRoutes: 'Shipping Route',
  meshSizes: 'Mesh Size',
  formats: 'Format',
  feedstocks: 'Feedstock',
  products: 'Product',
})

export const LABEL_MAP = Object.freeze({
  'Nickel Metal': (subObject) =>
    subObject.isSustainable
      ? 'Benchmark Sustainable Nickel Metal'
      : subObject.alias || subObject.label,
  'Nickel Sulphate': (subObject) =>
    subObject.isSustainable
      ? 'Benchmark Sustainable Nickel Sulphate'
      : 'Nickel Sulphate',
  'Tolling Fees': 'Graphitisation Tolling Fees',
})
