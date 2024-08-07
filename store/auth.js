export const state = () => ({
  jwtToken: null,
  user: {},
})

export const mutations = {
  setJwtToken(state, jwtToken) {
    state.jwtToken = jwtToken
  },

  setUser(state, user = {}) {
    state.user = user
  },
}

export const getters = {
  authenticated(state) {
    return !!state.jwtToken
  },
  userRoles: (state) => {
    return state.user?.roles ?? []
  },
  fullName: (state) => {
    return `${state.user?.firstName} ${state.user?.lastName}`
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
