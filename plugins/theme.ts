import { defineNuxtPlugin } from 'nuxt/app'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

export default defineNuxtPlugin(() => ({
  provide: { theme: { ...fullConfig.theme } },
}))
