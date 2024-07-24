import { Decimal } from 'decimal.js'

export const YEARS_OF_ANALYSIS = [
  {
    label: '2030',
    isChecked: true,
  },
  {
    label: '2040',
    isChecked: false,
  },
  {
    label: 'Net Zero',
    isChecked: false,
  },
]

const LITHIUM = {
  label: 'Lithium',
  isChecked: true,
  color: '#20267C',
  values: {
    2030: 50.1472674402964,
    2040: 91.2679490340126,
    'Net Zero': 216.573055222917,
  },
}

const BATTERY_CELLS = {
  label: 'Battery Cell',
  isChecked: true,
  color: '#FDBD00',
  values: {
    2030: 210.881340385652,
    2040: 573.003785423783,
    'Net Zero': 1164.3580727883,
  },
}

export const ALL_MATERIALS = {
  rawMaterials: {
    mainColor: '#92B5D5',
    items: [
      {
        label: 'Nickel',
        isChecked: true,
        color: '#1C3E96',
        values: {
          2030: 56.1372674568609,
          2040: 114.701379539883,
          'Net Zero': 221.683422288822,
        },
      },
      { ...LITHIUM },
      {
        label: 'Cobalt',
        isChecked: true,
        color: '#2F76B2',
        values: {
          2030: 11.0646804849186,
          2040: 12.656087573764,
          'Net Zero': 33.6584730750522,
        },
      },
      {
        label: 'Graphite',
        isChecked: true,
        color: '#2F76B2',
        values: {
          2030: 6.55024008041267,
          2040: 17.1739214329159,
          'Net Zero': 32.8724348404068,
        },
      },
    ],
  },
  others: {
    mainColor: '#707070',
    items: [
      {
        label: 'Other Materials',
        isChecked: true,
        color: '#707070',
        values: {
          2030: 144.146599038327,
          2040: 446.00826902167,
          'Net Zero': 821.092061689389,
        },
      },
    ],
  },
  batteryMaterials: {
    mainColor: '#E96600',
    items: [
      {
        label: 'Cathode',
        isChecked: true,
        color: '#EB6600',
        values: {
          2030: 62.8170497075076,
          2040: 163.454327867669,
          'Net Zero': 340.046433107212,
        },
      },
      {
        label: 'Anode',
        isChecked: true,
        color: '#7A2F12',
        values: {
          2030: 17.8566747102248,
          2040: 54.8063549821618,
          'Net Zero': 109.835289224507,
        },
      },
    ],
  },
  batteries: {
    mainColor: '#FBBA00',
    items: [{ ...BATTERY_CELLS }],
  },
}

// get all items from all categories
const allItems = Object.values(ALL_MATERIALS).reduce((items, current) => {
  return [...items, ...current.items]
}, [])

const totalIn2030 = allItems.reduce((total, current) => {
  return total + current.values[2030]
}, 0)

export const ALL_MATERIALS_TOTALS = {
  id: 0,
  mineral: 'All Materials',
  value: `${new Decimal(totalIn2030).toFixed(2)} billion`,
  imageUrl:
    'https://res.cloudinary.com/benchmarkminerals/image/upload/c_scale,h_320/v1690298599/assets/home/all-minerals-image_yvirfn.png',
}

export const capexTrackerData = [
  ALL_MATERIALS_TOTALS,
  {
    id: 1,
    mineral: 'Lithium',
    value: `${new Decimal(LITHIUM.values['2030']).toFixed(2)} billion`,
    imageUrl:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_scale,q_auto,h_320/v1692224705/assets/home/lithium-image_ljdye9.png',
  },
  {
    id: 2,
    mineral: 'Batteries',
    value: `${new Decimal(BATTERY_CELLS.values['2030']).toFixed(2)} billion`,
    imageUrl:
      'https://res.cloudinary.com/benchmarkminerals/image/upload/c_scale,h_320/v1690298612/assets/home/batteries-image_jlnbbu.png',
  },
]
