import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const $store: any = nuxtApp.$store

  return {
    provide: {
      modal: {
        open(modalName, { callback, initialFields }: any = {}) {
          $store.commit('modal/open', { modalName, callback, initialFields })
        },

        close(modalName) {
          $store.commit('modal/close', { modalName })
        },
      },
    },
  }
})
