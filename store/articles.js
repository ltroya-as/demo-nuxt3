export const state = () => ({
  articles: {},
})

export const mutations = {
  setArticles(
    state,
    { service, articles, categories, hasNextPage, endCursor },
  ) {
    state.articles[service] = {
      articles,
      categories,
      hasNextPage,
      endCursor,
    }
  },

  setCursorPosition(state, { service, cursorPosition }) {
    state.articles[service] = state.articles[service] || {}
    state.articles[service].cursorPosition = cursorPosition
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
