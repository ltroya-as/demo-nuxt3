import axios from 'axios'
import { defineNuxtPlugin } from 'nuxt/app'

const ZAxios = axios.create()

export default defineNuxtPlugin({
  name: 'axios',
  setup: () => ({ provide: { axios: ZAxios } }),
})
