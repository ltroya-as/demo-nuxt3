import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const $store: any = nuxtApp.$store

  const clear = () => {
    $store.commit('toast/clearToast')
  }

  const show = ({ message, type, position, duration, icon }) => {
    const isShow = $store.state.toast.show
    const config = {
      duration,
      icon,
      message,
      position,
      type,
    }
    if (!isShow) return $store.commit('toast/setToast', config)

    clear()

    setTimeout(() => $store.commit('toast/setToast', config), 50)
  }
  return {
    provide: {
      toast: { show, clear },
    },
  }
})
