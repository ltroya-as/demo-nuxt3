import { REFRESH_TOKEN } from '~/utils/constants'
import { getNewToken, getToken } from '~/utils/auth'
import { UNAUTHORIZED } from '~/constants/http'

class GraphQlClientProxy {
  graphQLClient
  cookies
  config

  currentRetries = 0
  maxNumberOfRetries = 0
  INTERNAL_SERVER_ERROR = 'Internal server error'

  constructor({ graphQLClient, $cookies = {}, $config = {}, options = {} }) {
    this.graphQLClient = graphQLClient
    this.maxNumberOfRetries = options.maxNumberOfRetries || 0
    this.cookies = $cookies
    this.config = $config
  }

  addAuthorizationHeader = async ({ $cookies = {}, $config = {} }) => {
    this.graphQLClient.setHeaders({}) // Reset authorization header

    const jwtToken = await getToken({ $cookies, $config })

    if (!jwtToken) return

    this.graphQLClient.setHeaders({ Authorization: `Bearer ${jwtToken}` })
  }

  async query({ query, variables }) {
    const refreshToken = this.cookies.get(REFRESH_TOKEN)

    if (this.graphQLClient.requestConfig.requireCredentials) {
      await this.addAuthorizationHeader({
        $cookies: this.cookies,
        $config: this.config,
      })
    }

    try {
      const data = await this.graphQLClient.request(query, variables)
      return { data }
    } catch (e) {
      if (
        e?.message === this.INTERNAL_SERVER_ERROR &&
        refreshToken &&
        this.currentRetries < this.maxNumberOfRetries
      ) {
        this.currentRetries++
        await getNewToken({ $cookies: this.cookies, $config: this.config })
        return this.query({ query, variables })
      }
    }
  }

  async mutate({ mutation, variables }) {
    this.graphQLClient.setHeaders({}) // Reset authorization header
    const data = await this.graphQLClient.request(mutation, variables)
    return { data }
  }
}

class HttpClientProxy {
  fetcher
  maxNumberOfRetries = 0
  currentRetries = 0
  cookies
  config

  constructor($fetcher, $cookies, $config, options) {
    this.fetcher = $fetcher
    this.maxNumberOfRetries = options.maxNumberOfRetries || 0
    this.cookies = $cookies
    this.config = $config
  }

  static buildHttpOptions = async (baseOptions, $cookies, $config) => {
    const jwtToken = await getToken({
      $cookies,
      $config,
    })

    if (!jwtToken) return baseOptions

    return {
      ...baseOptions,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  }

  async request(url, baseOptions) {
    const refreshToken = this.cookies.get(REFRESH_TOKEN)
    const options = await HttpClientProxy.buildHttpOptions(
      baseOptions,
      this.cookies,
      this.config,
    )

    try {
      return await this.fetcher({
        url,
        ...options,
      })
    } catch (e) {
      if (
        e?.response?.status === UNAUTHORIZED &&
        refreshToken &&
        this.currentRetries < this.maxNumberOfRetries
      ) {
        this.currentRetries++
        await getNewToken({ $cookies: this.cookies, $config: this.config })
        return this.request(url, options)
      }

      return e?.response
    }
  }
}

export { HttpClientProxy, GraphQlClientProxy }
