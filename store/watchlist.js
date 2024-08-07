export const state = () => ({
  openMenu: null,
})

export const mutations = {
  setOpenMenu(state, menuId) {
    state.openMenu = menuId
  },
  closeMenu(state) {
    state.openMenu = null
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
