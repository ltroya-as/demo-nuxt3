import { defineNuxtPlugin } from 'nuxt/app'
import velocity from 'velocity-animate'

export default defineNuxtPlugin(() => ({ provide: { velocity } }))
