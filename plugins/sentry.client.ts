import * as Sentry from '@sentry/vue'
import * as pkg from '~~/package.json'

export default defineNuxtPlugin((nuxtApp) => {
  const { $config, vueApp, $router }: any = nuxtApp
  const environment = $config.public.SENTRY_ENVIROMENT
  const dsn = $config.public.SENTRY_DSN
  const release = `${pkg.name}@${pkg.version}`

  Sentry.init({
    app: vueApp,
    dsn,
    environment,
    release,
    integrations: [
      Sentry.browserTracingIntegration({ router: $router }),
      Sentry.replayIntegration(),
    ],
    sampleRate: 1,
    tracesSampleRate: 1,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 1.0,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
    ignoreErrors: ['ResizeObserver loop limit exceeded'],
  })
})
