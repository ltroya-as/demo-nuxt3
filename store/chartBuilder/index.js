import catalog from '~/store/chartBuilder/catalog'
import config from '~/store/chartBuilder/config'
import steps from '~/store/chartBuilder/steps'
import unitsMeasurement from '~/store/chartBuilder/unitsMeasurement'

export const state = () => ({
  isOpen: false,
})

export const mutations = {
  setIsOpen(state, isOpen) {
    state.isOpen = isOpen
  },
}

export const actions = {
  setIsOpen({ commit }, isOpen) {
    commit('setIsOpen', isOpen)
  },
  autoPopulate({ dispatch }) {
    dispatch('chartBuilder/catalog/autoPopulateCurrency', null, { root: true })
    dispatch('chartBuilder/catalog/autoPopulateUnit', null, { root: true })
  },
  reset({ dispatch }) {
    dispatch('chartBuilder/catalog/reset', null, { root: true })
    dispatch('chartBuilder/config/reset', null, { root: true })
    dispatch('chartBuilder/steps/reset', null, { root: true })
    dispatch('chartBuilder/unitsMeasurement/reset', null, { root: true })
    dispatch('autoPopulate')
  },
}

export const getters = {
  isOpen: (state) => state.isOpen,
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    catalog,
    config,
    steps,
    unitsMeasurement,
  },
}
