import { defineNuxtPlugin } from 'nuxt/app'
import watermark from 'watermarkjs'

export default defineNuxtPlugin(() => ({ provide: { watermark } }))
