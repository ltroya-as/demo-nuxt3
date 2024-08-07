const state = () => ({
  message: '',
  type: '',
  position: 'bottom-center',
  duration: 3000,
  icon: null,
  show: false,
})

const mutations = {
  setToast(
    state,
    {
      message,
      type = 'success',
      position = 'bottom-center',
      duration = 3000,
      icon = null,
    },
  ) {
    state.message = message
    state.type = type
    state.position = position
    state.duration = duration
    state.icon = icon
    state.show = true
  },
  clearToast(state) {
    state.message = ''
    state.type = ''
    state.position = ''
    state.duration = 3000
    state.icon = null
    state.show = false
  },
}

export default {
  state,
  mutations,
}
