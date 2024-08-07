import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin(({ $config, vueApp }) => {
  vueApp.use(VueGtag, {
    isEnabled: $config.public.isProduction,
    property: {
      id: $config.public.googleAnalyticsId,
    },
  })
})
