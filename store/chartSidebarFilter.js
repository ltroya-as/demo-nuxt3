import {
  createDynamicFilter,
  generateCombinations,
  checkAllPredefinedOptions,
  sortOptionsAlphabetically,
} from '@/utils/chart'

export const state = () => ({
  catalog: {},
  preselected: {
    lithium: [
      'Lithium Carbonate',
      'Lithium Hydroxide',
      'Min 55.0%',
      'Min 99.0%',
      'Global Weighted Average',
    ],
    cobalt: [
      'Cobalt Hydroxide',
      'Cobalt Metal',
      'Cobalt Oxide',
      'Cobalt Sulphate',
      'Min 20%',
      'Min 20.5%',
      'Min 72.8%',
      'Min 99.8%',
      'CIF Asia',
      'EXW China',
      'EXW Europe',
    ],
    nickel: [
      'Nickel Metal',
      'Nickel Sulphate',
      '100% Ni Contained',
      'Min 22%',
      'Min 99.8%',
      'CIF Asia',
      'CIF Asia (Normalised)',
      'EXW China',
      'EXW Europe',
    ],
    'natural-graphite': [
      'Flake',
      'Spherical Uncoated',
      '-100 mesh',
      '15 microns',
      '94-95% C',
      'DDP China',
      'FOB China',
      'CIF N America',
    ],
    'synthetic-graphite': [
      'Pre-calcined Pet Coke',
      'Pre-calcined Pet Needle Coke',
      'Pre-calcined Pitch Needle Coke',
      'Tolling Fees',
      'S<0.5%',
      '0.5%<S<3.0%',
      'C≥90%',
      'DDP China',
    ],
    anode: [
      'Natural Graphite Anode',
      'Synthetic Graphite Anode',
      'High (360-370 mAh/g), min 99.97% C',
      'High (350-370 mAh/g), min 99.97% C',
      'DDP China',
    ],
    cathode: [
      'LFP, ≥160 mAh/g',
      'NCM523, 150-170 mAh/g',
      'NCM613, 170-200 mAh/g',
      'NCM622, 155-180 mAh/g',
      'DDP China',
    ],
    'lithium-ion-batteries': [
      'NCM111',
      'NCM523',
      'NCM622',
      'NCM811',
      'NCA',
      'LFP',
      'LCO',
      'Global Weighted Average',
      'Pouch',
      'Prismatic',
      'Cylindrical',
      'EXW Asia',
      'EXW China',
      'EXW Europe',
      'EXW North America',
    ],
    'black-mass': [
      'All Chemistries',
      'LCO',
      'LFP',
      'NCM',
      'All Scrap',
      'Cobalt Metal',
      'Cobalt Sulphate',
      'End of Life',
      'Lithium Carbonate Equivalent',
      'Li Price per Percentage Point',
      'Nickel Metal',
      'Nickel Sulphate',
      'Process Scrap',
      'CIF Asia',
      'EXW China',
      'EXW North America',
    ],
    'rare-earths': [
      'Dysprosium Oxide',
      'Neodymium-Praseodymium Oxide',
      'Samarium Oxide',
      'Terbium Oxide',
      'China Weighted Average',
      '>22%>70%',
      '99.0-99.5%',
      '99.0-99.9%',
      'DDP China',
    ],
  },
})

export const mutations = {
  setCatalogByMineral(state, { mineral, response }) {
    state.catalog[mineral] = {
      response,
    }
  },
}

export const actions = {
  fetchCatalogByMineral({ commit }, { mineral, response }) {
    commit('setCatalogByMineral', { mineral, response })
  },
}

export const getters = {
  getPricesCatalogByMineral: (state) => (mineral) => {
    const catalog = state.catalog[mineral]?.response
    const preselected = state.preselected[mineral]

    if (!catalog) return []

    const filters = createDynamicFilter(catalog, catalog.nextLevel, null, null)
    checkAllPredefinedOptions(filters, preselected)
    const sortedData = sortOptionsAlphabetically(filters)

    return Object.values(sortedData)
  },

  getAvailableCombinations: (state) => (mineral) => {
    const catalog = state.catalog[mineral]?.response

    if (!catalog) return []

    const selected = generateCombinations(catalog)
    return selected
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
