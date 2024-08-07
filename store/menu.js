export const state = () => ({
  activeMenu: null,
  activeSubMenu: null,
})

export const mutations = {
  setActiveMenu(state, { activeMenu, activeSubMenu }) {
    state.activeMenu = activeMenu
    state.activeSubMenu = activeSubMenu
  },
}

export const getters = {
  getActiveSubMenu: (state) => {
    return state.activeMenu?.children.find((menu) =>
      menu.to.includes(state.activeSubMenu),
    )?.name
  },
  getActiveSubMenuPath: (state) => {
    return state.activeMenu?.children.find((menu) =>
      menu.to.includes(state.activeSubMenu),
    )?.to
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}
