import {
  PUBLIC_GRAPHQL_ENDPOINT,
} from './utils/constants'

const baseUrl = 'https://wp-staging.benchmarkminerals.com'
const API_BASED_URL_ENDPOINT = `${baseUrl}/wp-json`
const GRAPHQL_ENDPOINT = `${baseUrl}/wp/graphql`
const API_REST_ENDPOINT = `${baseUrl}/wp-json/benchmark/v1`

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  typescript: {
    strict: false
  },
  css: [
    '~/assets/main.scss',
    '~/assets/lightbox.scss',
    '~/assets/multiselect.scss',
    '~/assets/date-picker.scss',
    '~/assets/tippy.scss',
    '~/assets/mapbox.scss',
    'tippy.js/dist/tippy.css',
    'v-calendar/style.css',
  ],
  runtimeConfig: {
    public: {
      graphqlEndpoint: GRAPHQL_ENDPOINT,
      publicGraphqlEndpoint: PUBLIC_GRAPHQL_ENDPOINT,
      apiRestEndpoint: API_REST_ENDPOINT,
      apiRestBasedEndpoint: API_BASED_URL_ENDPOINT,
      baseUrl,
      sourceUrl:
          process.env.SOURCE_URL || 'https://source-staging.benchmarkminerals.com',
    }
  },
  graphql: {
    includeNodeModules: true,
    clients: {
      default: {
        endpoint: PUBLIC_GRAPHQL_ENDPOINT,
        options: {
          requireCredentials: false,
        } as any,
      },
      authenticatedClient: {
        endpoint: GRAPHQL_ENDPOINT,
        options: {
          requireCredentials: true,
        } as any,
      },
    },
  },
  modules: ['nuxt-graphql-request', 'nuxt-svgo'],
  build: {
    transpile: ['nuxt-graphql-request'],
  },
  vite: {
    define: {
      global: 'window',
    },
  },
})