import { getAdaptedRegions } from '@/utils/adapters'

export default defineNuxtPlugin((nuxtApp) => {
  const { $config, $httpClient }: any = nuxtApp

  const CAPACITY_DATABASE_API_PATH = `${$config.public.baseUrl}/wp-json/benchmark/v1/ma-data`
  const getRegionsByProduct = async (product) => {
    return getAdaptedRegions(
      await $httpClient.post(
        `${CAPACITY_DATABASE_API_PATH}/v2/${product}/regions`,
      ),
    )
  }

  const getRecordsByProduct = (product) => {
    return $httpClient.post(
      `${CAPACITY_DATABASE_API_PATH}/v2/${product}/report`,
    )
  }

  return {
    provide: {
      capacityDatabase: {
        getRecordsByProduct,
        getRegionsByProduct,
      },
    },
  }
})
