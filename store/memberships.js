import {
  SUBSCRIPTION_ALL,
  SUBSCRIPTION_ESG_COBALT,
  SUBSCRIPTION_ESG_BATTERY_EMISSIONS_ANALYSER,
  SUBSCRIPTION_ESG_LITHIUM,
  SUBSCRIPTION_ESG_NATURAL_GRAPHITE,
  SUBSCRIPTION_ESG_NICKEL,
  SUBSCRIPTION_ESG_SYNTHETIC_GRAPHITE,
  SUBSCRIPTION_ESG_GRAPHITE,
  SUBSCRIPTION_ESG_RARE_EARTHS,
  SUBSCRIPTION_FORECASTS_ANODE,
  SUBSCRIPTION_FORECASTS_LITHIUM_ION_BATTERIES,
  SUBSCRIPTION_FORECASTS_CATHODE,
  SUBSCRIPTION_FORECASTS_COBALT,
  SUBSCRIPTION_FORECASTS_LITHIUM,
  SUBSCRIPTION_FORECASTS_SILICON_ANODE,
  SUBSCRIPTION_FORECASTS_NATURAL_GRAPHITE,
  SUBSCRIPTION_FORECASTS_NICKEL,
  SUBSCRIPTION_FORECASTS_RECYCLING,
  SUBSCRIPTION_FORECASTS_SOLID_STATE,
  SUBSCRIPTION_FORECASTS_SYNTHETIC_GRAPHITE,
  SUBSCRIPTION_FORECASTS_RARE_EARTHS,
  SUBSCRIPTION_FORECASTS_MANGANESE,
  SUBSCRIPTION_FORECASTS_PHOSPHATE,
  SUBSCRIPTION_MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT,
  SUBSCRIPTION_MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT,
  SUBSCRIPTION_MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES,
  SUBSCRIPTION_PRICE_ASSESSMENTS_ANODE,
  SUBSCRIPTION_PRICE_ASSESSMENTS_CATHODE,
  SUBSCRIPTION_PRICE_ASSESSMENTS_COBALT,
  SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM,
  SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES,
  SUBSCRIPTION_PRICE_ASSESSMENTS_NATURAL_GRAPHITE,
  SUBSCRIPTION_PRICE_ASSESSMENTS_NICKEL,
  SUBSCRIPTION_PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE,
  SUBSCRIPTION_SOURCE_SUBSCRIBER,
  SUBSCRIPTION_PRICE_ASSESSMENTS_BLACK_MASS,
  SUBSCRIPTION_PRICE_ASSESSMENTS_RARE_EARTHS,
  SUBSCRIPTION_FORECASTS_FLUORSPAR,
  SUBSCRIPTION_PRICE_ASSESSMENTS_PRICE_DASHBOARD,
} from '~/constants/services/constants'

export const state = () => ({
  [SUBSCRIPTION_ESG_COBALT]: undefined,
  [SUBSCRIPTION_ESG_BATTERY_EMISSIONS_ANALYSER]: undefined,
  [SUBSCRIPTION_ESG_LITHIUM]: undefined,
  [SUBSCRIPTION_ESG_NATURAL_GRAPHITE]: undefined,
  [SUBSCRIPTION_ESG_NICKEL]: undefined,
  [SUBSCRIPTION_ESG_SYNTHETIC_GRAPHITE]: undefined,
  [SUBSCRIPTION_ESG_GRAPHITE]: undefined,
  [SUBSCRIPTION_ESG_RARE_EARTHS]: undefined,
  [SUBSCRIPTION_FORECASTS_ANODE]: undefined,
  [SUBSCRIPTION_FORECASTS_LITHIUM_ION_BATTERIES]: undefined,
  [SUBSCRIPTION_FORECASTS_CATHODE]: undefined,
  [SUBSCRIPTION_FORECASTS_COBALT]: undefined,
  [SUBSCRIPTION_FORECASTS_LITHIUM]: undefined,
  [SUBSCRIPTION_FORECASTS_SILICON_ANODE]: undefined,
  [SUBSCRIPTION_FORECASTS_NATURAL_GRAPHITE]: undefined,
  [SUBSCRIPTION_FORECASTS_NICKEL]: undefined,
  [SUBSCRIPTION_FORECASTS_SOLID_STATE]: undefined,
  [SUBSCRIPTION_FORECASTS_SYNTHETIC_GRAPHITE]: undefined,
  [SUBSCRIPTION_FORECASTS_RECYCLING]: undefined,
  [SUBSCRIPTION_FORECASTS_RARE_EARTHS]: undefined,
  [SUBSCRIPTION_FORECASTS_MANGANESE]: undefined,
  [SUBSCRIPTION_FORECASTS_PHOSPHATE]: undefined,
  [SUBSCRIPTION_FORECASTS_FLUORSPAR]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_COBALT]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_NICKEL]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_NATURAL_GRAPHITE]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_SYNTHETIC_GRAPHITE]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_LITHIUM_ION_BATTERIES]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_ANODE]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_CATHODE]: undefined,
  [SUBSCRIPTION_SOURCE_SUBSCRIBER]: undefined,
  [SUBSCRIPTION_MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT]: undefined,
  [SUBSCRIPTION_MARKET_ASSESSMENTS_PRECURSOR_ASSESSMENT]: undefined,
  [SUBSCRIPTION_MARKET_ASSESSMENTS_SODIUM_ION_BATTERIES]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_BLACK_MASS]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_RARE_EARTHS]: undefined,
  [SUBSCRIPTION_PRICE_ASSESSMENTS_PRICE_DASHBOARD]: undefined,
  [SUBSCRIPTION_ALL]: undefined,
})

export const mutations = {
  setMembershipStatus(state, { category, isActive }) {
    state[category] = isActive
  },

  /**
   * Enable current memberships on the state, so we can use them to
   * handle authorization in the site without doing an extra http request
   * to the server to check that.
   *
   * @param {Object} state
   * @param {Array} memberships
   */
  setActiveMembershipStatuses(state, memberships) {
    Object.keys(state).forEach((_membership) => {
      if (_membership === SUBSCRIPTION_ALL) return
      state[_membership] = memberships.includes(_membership)
    })
  },

  setAllSubscriptions(state, allSubscriptions) {
    state.allSubscriptions = allSubscriptions
  },

  clearKeys(state) {
    Object.keys(state).forEach((key) => (state[key] = undefined))
  },
}

export const getters = {
  isMembershipActive: (state) => (membershipName) => {
    return state[membershipName]
  },

  activeMemberships: (state) => {
    return Object.keys(state).filter((key) => {
      return !!state[key]
    })
  },

  allSubscriptions: (state) => {
    return state.allSubscriptions
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
