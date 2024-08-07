import {
  MARKET_PRICE_DASHBOARD,
  MARKET_ANODE,
  MARKET_CATHODE,
  MARKET_COBALT,
  MARKET_LITHIUM,
  MARKET_LITHIUM_ION_BATTERIES,
  MARKET_NATURAL_GRAPHITE,
  MARKET_NICKEL,
  MARKET_SYNTHETIC_GRAPHITE,
  MARKET_RARE_EARTHS,
  MARKET_MANGANESE,
  MARKET_PHOSPHATE,
  MARKET_FLUORSPAR,
  MARKET_SILICON_ANODE,
  MARKET_SODIUM_ION_BATTERIES,
  MARKET_SOLID_STATE,
  MARKET_RECYCLING,
} from '~/constants/services/market'
import { MARKET } from '~/constants/services/constants'

export const state = () => ({
  [MARKET.slug]: [
    MARKET_PRICE_DASHBOARD.sidebar,
    MARKET_LITHIUM.sidebar,
    MARKET_COBALT.sidebar,
    MARKET_NICKEL.sidebar,
    MARKET_NATURAL_GRAPHITE.sidebar,
    MARKET_SYNTHETIC_GRAPHITE.sidebar,
    MARKET_MANGANESE.sidebar,
    MARKET_PHOSPHATE.sidebar,
    MARKET_FLUORSPAR.sidebar,
    MARKET_ANODE.sidebar,
    MARKET_CATHODE.sidebar,
    MARKET_SILICON_ANODE.sidebar,
    MARKET_LITHIUM_ION_BATTERIES.sidebar,
    MARKET_SODIUM_ION_BATTERIES.sidebar,
    MARKET_SOLID_STATE.sidebar,
    MARKET_RECYCLING.sidebar,
    MARKET_RARE_EARTHS.sidebar,
  ],
})

export const mutations = {
  openMenu(state, { service, menu }) {
    state[service] = state[service].map((item) => ({
      ...item,
      open: item.name === menu,
    }))
  },
  toggleMenu(state, { service, menu }) {
    state[service] = state[service].map((item) => {
      if (item.name !== menu) return item

      return { ...item, open: !item.open }
    })
  },
  hiddenAnalysisInMenu(state, { service, section }) {
    state[service] = state[service].map((item) => {
      if (item.name !== section) return item
      return {
        ...item,
        children: item.children?.filter((_item) => _item.name !== 'Analysis'),
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
