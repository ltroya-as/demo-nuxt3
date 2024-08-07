import {
  PAYABLE_AND_KWH,
  PAYABLE_ID,
  UNITS_MEASUREMENTS,
} from '~/constants/all-prices/chart-builder'

export const state = () => ({
  unitsMeasurement: UNITS_MEASUREMENTS,
  selectedUnits: [],
})

export const mutations = {
  setSelectedUnits(state, selectedUnits) {
    state.selectedUnits = selectedUnits
  },
  setUnitsMeasurement(state, unitsMeasurement) {
    state.unitsMeasurement = unitsMeasurement
  },
  reset(state) {
    state.unitsMeasurement = UNITS_MEASUREMENTS
    state.selectedUnits = []
  },
}

export const actions = {
  setSelectedUnits({ commit, state }, selectedUnits) {
    const unitsMeasurement = state.unitsMeasurement.map((unit) => {
      const isSelected = selectedUnits.includes(unit.value)
      return { ...unit, isSelected }
    })
    commit('setSelectedUnits', selectedUnits)
    commit('setUnitsMeasurement', unitsMeasurement)
  },
  reset({ commit }) {
    commit('reset')
  },
}

export const getters = {
  unitsMeasurement: (state) => state.unitsMeasurement,
  selectedUnits: (state) => state.selectedUnits,
  havePayableAndKWH: (state) =>
    PAYABLE_AND_KWH.every((unit) => state.selectedUnits.includes(unit)),
  hasOnlyPayable: (state) =>
    state.selectedUnits.length === 1 && state.selectedUnits[0] === PAYABLE_ID,
  hasOnlyKWH: (state) =>
    state.selectedUnits.length === 1 && state.selectedUnits[0] === 'kwh',
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
