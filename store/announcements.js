export const state = () => ({
  announcements: {},
})

export const mutations = {
  setAnnouncements(
    state,
    { announcements, startDate, endDate, hasNextPage, endCursor },
  ) {
    state.announcements = {
      list: announcements,
      startDate,
      endDate,
      hasNextPage,
      endCursor,
    }
  },

  setCursorPosition(state, { cursorPosition }) {
    state.announcements.cursorPosition = cursorPosition
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
