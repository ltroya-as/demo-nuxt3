import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const { $httpClient, $config }: any = nuxtApp

  /**
   * Get a list of files for a category
   *
   * @param {String} category
   * @param {Object} params
   * @returns []
   */
  const getFilesForCategory = (category, params = {}) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/downloads/category/${category}`,
      params,
    )
  }

  /**
   * Get data report by id and category
   *
   * @returns {Object}
   * @param {string} categoryName
   * @param {number|string} reportId
   */
  const getDataFileByIdAndCategory = (categoryName, reportId) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/downloads/report/${categoryName}/${reportId}`,
    )
  }

  /**
   * Get a list of files for a group of forecast categories
   *
   * @param {Array} categories
   * @param {Object} params
   * @returns
   */
  const getFilesForForecasts = (categories, params = {}) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/downloads/forecast`,
      {
        categories,
        params,
      },
    )
  }

  const getFilesForForecast = (category) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/downloads/forecast/${category}`,
    )
  }

  /**
   * Get files for ESG
   *
   * @param {Object} params
   * @returns
   */
  const getFilesForESG = (params) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/downloads/esg`,
      params,
    )
  }

  /**
   * Get most recent file for each category
   *
   * @param {Array} categories
   * @returns
   */
  const getRecentFilesForCategories = (categories) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/downloads/recent-files-for-categories`,
      { categories },
    )
  }

  /**
   * Get the file's blob for a specific category
   *
   * @param {String} category
   * @param {String|Integer} id
   * @returns
   */
  const downloadFile = (category, id) => {
    const url = `${$config.public.apiRestEndpoint}/downloads/category/${category}/${id}`
    return $httpClient.post(url, {}, null, 'blob')
  }

  /**
   * Get a list of reports
   *
   * @param {String} category
   * @param {Object} params
   * @returns []
   */
  const getAllReports = (params = {}) => {
    return $httpClient.post(
      `${$config.public.apiRestEndpoint}/reports/all`,
      params,
    )
  }

  return {
    provide: {
      downloadManager: {
        getFilesForCategory,
        getDataFileByIdAndCategory,
        getFilesForForecast,
        getFilesForForecasts,
        getFilesForESG,
        getRecentFilesForCategories,
        downloadFile,
        getAllReports,
      },
    },
  }
})
