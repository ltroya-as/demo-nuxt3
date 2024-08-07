import { defineNuxtPlugin } from 'nuxt/app'
import Vcalendar from 'v-calendar'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vcalendar)
})
