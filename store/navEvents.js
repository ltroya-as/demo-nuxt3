export const state = () => ({
  upcomingEvents: [],
  pastEvents: [],
})
export const mutations = {
  SET_NAV_UPCOMING_EVENTS(state, events) {
    state.upcomingEvents = events
  },
  SET_NAV_PAST_EVENTS(state, events) {
    state.pastEvents = events
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
