export const state = () => ({
  indexesStates: [],
})

export const mutations = {
  setIndexesStates(state, indexes) {
    state.indexesStates = indexes
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
