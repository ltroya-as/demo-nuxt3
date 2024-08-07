import { defineNuxtPlugin } from 'nuxt/app'
import { store } from '~/store'

export default defineNuxtPlugin({
  enforce: 'pre',
  name: 'vuex',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(store)

    return {
      provide: {
        store,
      },
    }
  },
})
