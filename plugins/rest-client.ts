import { defineNuxtPlugin } from 'nuxt/app'
import { format, subYears } from 'date-fns'
import {
  getAdaptedMembershipStatuses,
  getAdaptedTickerIndexes,
  getAdaptedPrices,
} from '@/utils/adapters'
import { subscriptionsQueryParamValues } from '@/constants/memberships'

export default defineNuxtPlugin((nuxtApp) => {
  const { $httpClient, $config }: any = nuxtApp
  let controller = null

  /**
   * Get data for the price-assessments charts for service pro
   *
   * @param {string} product
   * @param {Object} params
   * @returns
   */
  const getPricesByProduct = async (product, params) => {
    if (controller) controller.abort()

    controller = new AbortController()
    const response = await $httpClient.post(
      `${$config.public.apiRestEndpoint}/prices/v2/${product}`,
      params,
      { signal: controller.signal },
    )

    return getAdaptedPrices(response)
  }

  /**
   * Get data for the price-assessments charts
   *
   * @param {Object} params
   * @returns
   */
  const getMineralData = (params) => {
    return $httpClient.post(`${$config.public.apiRestEndpoint}/mineral`, params)
  }

  /**
   * Get data for flake graphite pages
   *
   * @returns
   */
  const getFlakeGraphiteData = () => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/natural-graphite`,
    )
  }

  /**
   * Get data for lithium ion battery price index page
   *
   * @returns
   */
  const getLithiumIonPriceData = () => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/lithium-ion-pricing-data`,
    )
  }

  /**
   * Change authenticated user password
   *
   * @property {Object} params
   * @property {string} params.current_password
   * @property {string} params.new_password
   * @property {string} params.new_password_confirmation
   * @returns
   */
  const changePassword = (params) => {
    return $httpClient.put(
      `${$config.public.apiRestEndpoint}/password/change`,
      params,
    )
  }

  /**
   * Request a token to reset the password
   *
   * @property {Object} params
   * @property {string} params.email
   * @property {string} params.source
   */
  const resetPassword = (params) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/password/reset-password`,
      params,
    )
  }

  /**
   * Set a new password using the token
   *
   * @property {Object} params
   * @property {string} params.token
   * @property {string} params.new_password
   * @property {string} params.email
   */
  const setPassword = (params) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/password/set-password`,
      params,
    )
  }

  const getSubscriptions = async () => {
    const memberships = await $httpClient.post(
      `${$config.public.apiRestEndpoint}/memberships/info?${subscriptionsQueryParamValues}`,
    )
    return getAdaptedMembershipStatuses(memberships)
  }

  const getTickerIndexes = async () => {
    return getAdaptedTickerIndexes(
      await $httpClient.post(
        `${$config.public.apiRestEndpoint}/prices/v2/ticker`,
      ),
    )
  }

  /**
   * Get price data for mineral portal pages
   *
   * @returns
   */
  const getPricesPortalByMineral = async (market) => {
    const response = await $httpClient.post(
      `${$config.public.apiRestEndpoint}/prices/v2/${market}/market-portal`,
      {
        to: format(new Date(), 'yyyy-MM-dd'),
        from: format(subYears(new Date(), 5), 'yyyy-MM-dd'),
      },
    )
    return response
  }

  /**
   * Get price index data for mineral portal pages
   *
   * @returns
   */
  const getPriceIndexByMineral = async (mineral) => {
    const response = await $httpClient.post(
      `${$config.public.apiRestEndpoint}/price-index/${mineral}`,
    )
    return response.data ?? null
  }

  /**
   * Get prices summary data for mineral portal pages
   * @params {string} mineral
   * @returns
   */
  const getPricesConsolidatedByMineral = (market) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/prices/v2/${market}/consolidated`,
      {
        to: format(new Date(), 'yyyy-MM-dd'),
        from: format(subYears(new Date(), 5), 'yyyy-MM-dd'),
      },
    )
  }

  /**
   * Get Supply By Company for mineral portal pages
   *
   * @returns
   */
  const getSupplyCompanyByMineral = (mineral) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/chemical-supply-by-company/${mineral}/portal`,
    )
  }

  /**
   * Get End Market for mineral portal pages
   *
   * @returns
   */
  const getEndMarketByMineral = (mineral) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/end-market/${mineral}`,
    )
  }

  /**
   * Get historical chemical for mineral portal pages
   *
   * @returns
   */
  const getHistoricalChemicalByMineral = (mineral) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/chemical-supply-by-regions/${mineral}/portal`,
    )
  }

  /**
   * Get historical chemical for mineral portal pages
   *
   * @returns
   */
  const getGlobalEVSalesByMineral = (mineral) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/ev-global-sales/${mineral}`,
    )
  }

  /**
   * Get cathode demand for mineral portal pages
   *
   * @returns
   */
  const getCathodeDemandByMineral = (mineral) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/demand-chemistry/${mineral}`,
    )
  }

  const getCurrentMinesByMineral = (mineral) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/current-mines/${mineral}`,
    )
  }

  const getEquityDataByMineral = (mineral) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/company-equity-data/${mineral}`,
    )
  }

  const getDatabaseSummaryByMineral = (mineral) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/database-page/${mineral}/summary`,
    )
  }

  const getReportDetailsById = async (category, id) => {
    return await $httpClient.post(
      `${$config.public.apiRestEndpoint}/downloads/details/${category}/${id}`,
    )
  }

  const getSustainabilityIndexByProduct = async (product, indexName) => {
    return await $httpClient.post(
      `${$config.public.apiRestEndpoint}/esg/sustainability/${product}/${indexName}`,
    )
  }

  const getPricesCustomisationToolByProduct = async (product) => {
    return await $httpClient.post(
      `${$config.public.apiRestEndpoint}/prices-customisation-tool/v2/${product}/assessments`,
    )
  }

  const getPricesCatalogByMineral = async (mineral) => {
    return await $httpClient.post(
      `${$config.public.apiRestEndpoint}/prices/v2/${mineral}/catalog`,
    )
  }

  /**
   * Get data for the price-assessments charts for service pro
   *
   * @param {string} product
   * @param {Object} params
   * @returns
   */
  const getMarketPortal = (product, params) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/prices/v2/${product}/market-portal`,
      params,
    )
  }

  return {
    provide: {
      restClient: {
        getCathodeDemandByMineral,
        getCurrentMinesByMineral,
        getDatabaseSummaryByMineral,
        getEndMarketByMineral,
        getEquityDataByMineral,
        getFlakeGraphiteData,
        getGlobalEVSalesByMineral,
        getHistoricalChemicalByMineral,
        getLithiumIonPriceData,
        getMarketPortal,
        getMineralData,
        getPriceIndexByMineral,
        getPricesByProduct,
        getPricesCatalogByMineral,
        getPricesConsolidatedByMineral,
        getPricesCustomisationToolByProduct,
        getPricesPortalByMineral,
        getReportDetailsById,
        getSubscriptions,
        getSupplyCompanyByMineral,
        getSustainabilityIndexByProduct,
        getTickerIndexes,
        user: {
          changePassword,
          resetPassword,
          setPassword,
        },
      },
    },
  }
})
