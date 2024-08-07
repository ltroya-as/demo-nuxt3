import uniq from 'lodash/uniq'

export const state = () => ({
  items: [],
})

export const mutations = {
  addItemBreadcrumb(state, item) {
    state.items = uniq([...state.items, item])
  },
  clearBreadcrumb(state) {
    state.items = []
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
