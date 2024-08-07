import { validUnitsByProductConfig } from '~/utils/allPrices/chartBuilder/config'
import { getAllCombinationsByProduct } from '~/utils/allPrices/price-chart-builder'

export const state = () => ({
  currency: null,
  unit: null,
  products: [
    {
      id: '',
      key: 'default-product',
      name: '',
      completed: false,
      config: null,
      valid: false,
    },
  ],
})

export const mutations = {
  setCurrency(state, currency) {
    state.currency = currency
  },
  setUnit(state, unit) {
    state.unit = unit
  },
  updateProduct(state, { id, product }) {
    const index = state.products.findIndex((p) => p.id === id)

    if (index === -1) return

    const newProduct = { ...state.products[index], ...product }
    state.products.splice(index, 1, newProduct)
  },
  selectProduct(state, product) {
    const index = state.products.length - 1
    const lastProduct = state.products[index]

    const newProduct = { ...lastProduct, ...product }
    state.products.splice(index, 1, newProduct)
  },
  unSelectProduct(state, name) {
    const index = state.products.findIndex((p) => p.name === name)

    if (index === -1) return

    const newProduct = {
      ...state.products[index],
      id: '',
      name: '',
      completed: false,
      config: null,
      valid: false,
    }
    state.products.splice(index, 1, newProduct)
  },
  addProduct(state, newProduct) {
    state.products.push(newProduct)
  },
  removeProduct(state, id) {
    const index = state.products.findIndex((p) => p.id === id)
    const products = state.products

    products.splice(index, 1)

    if (products.length === 0) {
      products.push({
        id: '',
        key: 'default-product',
        name: '',
        completed: false,
        config: null,
        valid: false,
      })
    }

    state.products = products
  },
  loadProducts(state, products) {
    state.products = products
  },
  reset(state) {
    state.currency = null
    state.unit = null
    state.products = [
      {
        id: '',
        key: 'default-product',
        name: '',
        completed: false,
        config: null,
        valid: false,
      },
    ]
  },
}

export const actions = {
  setCurrency({ commit }, currency) {
    commit('setCurrency', currency)
  },
  setUnit({ commit }, unit) {
    commit('setUnit', unit)
  },
  updateProduct({ commit }, { id, product }) {
    commit('updateProduct', { id, product })
  },
  addProduct({ commit }, newProduct) {
    commit('addProduct', newProduct)
  },
  removeProduct({ commit }, id) {
    commit('removeProduct', id)
  },
  selectProduct({ commit }, product) {
    commit('selectProduct', product)
  },
  unSelectProduct({ commit }, name) {
    commit('unSelectProduct', name)
  },
  completedCurrentProduct({ state, commit }) {
    const index = state.products.length - 1

    if (index === -1) return

    const lastProduct = state.products[index]

    commit('updateProduct', {
      id: lastProduct.id,
      product: { completed: true },
    })
    commit(
      'chartBuilder/catalog/updateProduct',
      {
        id: lastProduct.id,
        product: { isSelected: true },
      },
      { root: true },
    )
  },
  loadProducts({ commit }, products) {
    commit('loadProducts', products)
  },
  reset({ commit }) {
    commit('reset')
  },
}

export const getters = {
  products: (state) => state.products,
  currency: (state) => state.currency,
  unit: (state) => state.unit,
  isValidProducts: (_, getters) =>
    getters.products.every((product) => product.completed),
  isEditing: (_, getters) =>
    getters.products.some((product) => product.id !== ''),
  validateProducts: (state) =>
    state.products.every((product) => product.completed),
  validateCurrency: (_, getters) =>
    getters.validateProducts && getters.currency !== null,
  validProductsByUnits(state, _, __, rootGetters) {
    const selectedUnits =
      rootGetters['chartBuilder/unitsMeasurement/selectedUnits']
    return state.products.map((product) => ({
      ...product,
      config: validUnitsByProductConfig(product.config, selectedUnits),
    }))
  },
  series(state) {
    const combinations = state.products
      .map((product) => getAllCombinationsByProduct(product))
      .flat()
    return combinations.length
  },
  validateUnit(_, getters, __, rootGetters) {
    const hasOnlyPayable =
      rootGetters['chartBuilder/unitsMeasurement/hasOnlyPayable']
    const hasOnlyKWH = rootGetters['chartBuilder/unitsMeasurement/hasOnlyKWH']
    const havePayableAndKWH =
      rootGetters['chartBuilder/unitsMeasurement/havePayableAndKWH']

    if (hasOnlyPayable || hasOnlyKWH) return true
    if (havePayableAndKWH) return getters.validateCurrency
    return getters.validateCurrency && getters.unit !== null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
