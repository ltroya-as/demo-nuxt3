import { defineNuxtPlugin } from 'nuxt/app'
import {
  getAdaptedAllPricesDataChart,
  getAdaptedSummaries,
} from '~/utils/adapters'

export default defineNuxtPlugin({
  dependsOn: ['httpClient'],
  setup(nuxtApp) {
    const { $httpClient, $config }: any = nuxtApp

    const getAllPricesCatalog = async () => {
      const response = await $httpClient.post(
        `${$config.public.apiRestEndpoint}/all-prices/builder`,
      )

      return response
    }

    const getAllPricesSummary = async (params) => {
      if (!params) return

      const response = await $httpClient.post(
        `${$config.public.apiRestEndpoint}/all-prices/summary`,
        params,
      )

      return getAdaptedSummaries(response)
    }

    const getAllProductsSummary = async () => {
      const response = await $httpClient.post(
        `${$config.public.apiRestEndpoint}/all-prices/all-products/summary`,
      )
      return getAdaptedSummaries(response)
    }

    const getAllPricesChart = async (params) => {
      if (!params) return

      const response = await $httpClient.post(
        `${$config.public.apiRestEndpoint}/all-prices/chart`,
        params,
      )

      return getAdaptedAllPricesDataChart(response)
    }

    const saveWatchlist = (params) => {
      return $httpClient.post(
        `${$config.public.apiRestEndpoint}/watchlist/create`,
        params,
      )
    }

    const editWatchlist = (id, params) => {
      return $httpClient.patch(
        `${$config.public.apiRestEndpoint}/watchlist/${id}`,
        params,
      )
    }

    const getWatchlist = () =>
      $httpClient.post(`${$config.public.apiRestEndpoint}/watchlist/lists`)

    const getWatchlistById = (watchlistId) =>
      $httpClient.post(
        `${$config.public.apiRestEndpoint}/watchlist/${watchlistId}`,
      )

    const removeWatchlistById = (id) =>
      $httpClient.delete(`${$config.public.apiRestEndpoint}/watchlist/${id}`)

    return {
      provide: {
        allPrices: {
          saveWatchlist,
          editWatchlist,
          getWatchlist,
          getWatchlistById,
          removeWatchlistById,
          getAllPricesCatalog,
          getAllPricesChart,
          getAllPricesSummary,
          getAllProductsSummary,
        },
      },
    }
  },
})
