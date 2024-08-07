export const state = () => ({
  forms: {},
})

export const mutations = {
  save(state, { formId, configuration }) {
    state.forms[formId] = configuration
  },
}

export const getters = {
  retrieve: (state) => (formId) => {
    return state.forms[formId]
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
