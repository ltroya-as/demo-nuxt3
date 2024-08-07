import snakeCase from 'lodash/snakeCase.js'

class ConfigManager {
  branch

  constructor() {
    this.branch = snakeCase(process.env.CF_PAGES_BRANCH || '')
  }

  /**
   * Get the env variable value for a specific branch if that
   * exists. Otherwise, return the default value.
   *
   * E.g:
   * Env variables:
   * PREVIEW_URL = https://preview.benchmarkminerals.com
   * URL = https://www.benchmarkminerals.com
   *
   * Branch: master
   * This function will return: https://www.benchmarkminerals.com
   *
   * Branch: preview
   * This function will return: https://preview.benchmarkminerals.com
   *
   * @param key
   * @param defaultValue
   * @returns env variable value
   */
  get(key, defaultValue) {
    const branch = this.branch.toUpperCase()
    const value = process.env[`${branch}_${key}`] || process.env[key]

    // Environment variables are always strings, so manage booleans correctly.
    if (value === 'true') {
      return true
    } else if (value === 'false') {
      return false
    }

    return value || defaultValue
  }
}

export default new ConfigManager()
