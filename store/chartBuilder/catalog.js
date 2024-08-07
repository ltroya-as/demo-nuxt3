import { TONNE_ID, USD_ID } from '~/constants/all-prices/chart-builder'
import { getCatalogWithBlockedProducts } from '~/utils/allPrices/chartBuilder/config'

export const state = () => ({
  currencies: [],
  units: [],
  products: [],
})

export const mutations = {
  setCurrencies(state, currencies) {
    state.currencies = currencies
  },
  setUnits(state, units) {
    state.units = units
  },
  setProducts(state, products) {
    state.products = products
  },
  selectCurrency(state, name) {
    state.currencies = state.currencies.map((currency) => {
      const isSelected = currency.name === name
      return { ...currency, isSelected }
    })
  },
  selectUnit(state, symbol) {
    state.units = state.units.map((unit) => {
      const isSelected = unit.symbol === symbol
      return { ...unit, isSelected }
    })
  },
  updateProduct(state, { id, product }) {
    const index = state.products.findIndex((p) => p.id === id)

    if (index === -1) return

    const newProduct = { ...state.products[index], ...product }
    state.products.splice(index, 1, newProduct)
  },
  reset(state) {
    const isSelected = false
    state.currencies = state.currencies.map((currency) => ({
      ...currency,
      isSelected,
    }))
    state.units = state.units.map((unit) => ({ ...unit, isSelected }))
    state.products = state.products.map((product) => ({
      ...product,
      isSelected,
    }))
  },
  autoPopulateCurrency(state) {
    const index = state.currencies.findIndex((item) => item.id === USD_ID)

    if (index === -1) return

    const newCurrency = { ...state.currencies[index], isSelected: true }
    state.currencies.splice(index, 1, newCurrency)
  },
  autoPopulateUnit(state) {
    const index = state.units.findIndex((item) => item.id === TONNE_ID)

    if (index === -1) return

    const newUnit = { ...state.units[index], isSelected: true }
    state.units.splice(index, 1, newUnit)
  },
}

export const actions = {
  setCurrencies({ commit }, currencies) {
    commit('setCurrencies', currencies)
  },
  setUnits({ commit }, units) {
    commit('setUnits', units)
  },
  setProducts({ commit }, products) {
    commit('setProducts', products)
  },
  updateProduct({ commit }, { id, product }) {
    commit('updateProduct', { id, product })
  },
  autoPopulateCurrency({ commit }) {
    commit('autoPopulateCurrency')
  },
  autoPopulateUnit({ commit }) {
    commit('autoPopulateUnit')
  },
  reset({ commit }) {
    commit('reset')
  },
  selectCurrency({ commit }, name) {
    commit('selectCurrency', name)
  },
  selectUnit({ commit }, symbol) {
    commit('selectUnit', symbol)
  },
}

export const getters = {
  currencies: (state) => state.currencies,
  units: (state, _, __, rootGetters) => {
    const hasOnlyPayable =
      rootGetters['chartBuilder/unitsMeasurement/hasOnlyPayable']
    const hasOnlyKWH = rootGetters['chartBuilder/unitsMeasurement/hasOnlyKWH']

    if (hasOnlyPayable)
      return state.units.filter((unit) => unit.value === 'percentage')
    if (hasOnlyKWH) return state.units.filter((unit) => unit.value === 'kWh')

    return state.units
  },
  products: (state, _, __, rootGetters) => {
    const selectedUnits =
      rootGetters['chartBuilder/unitsMeasurement/selectedUnits']
    return state.products.map((product) =>
      getCatalogWithBlockedProducts(product, selectedUnits),
    )
  },
  hasProducts: (state) => state.products.length > 0,
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
