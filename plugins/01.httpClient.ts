import { defineNuxtPlugin } from 'nuxt/app'
import FormData from 'form-data'
import { HttpClientProxy } from '~/utils/http'

export default defineNuxtPlugin({
  name: 'httpClient',
  setup(nuxtApp) {
    const { $cookies, $axios, $config: config } = nuxtApp
    const $config = config.public

    const get = (uri, data = null, options = {}) => {
      return sendRequest(uri, 'get', data, options)
    }

    const remove = (uri, data = null, options = {}) => {
      return sendRequest(uri, 'delete', data, options)
    }

    const post = (uri, data = null, options = {}) => {
      return sendRequest(uri, 'post', data, options)
    }

    const put = (uri, data = null, options = {}) => {
      return sendRequest(uri, 'put', data, options)
    }

    const patch = (uri, data = null, options = {}) => {
      return sendRequest(uri, 'patch', data, options)
    }

    const sendRequest = async (
      uri,
      method,
      data = null,
      customOptions = {},
    ) => {
      const options = {
        method,
        ...customOptions,
      }

      if (['post', 'put', 'patch'].includes(method)) {
        options.data = data
      }

      if (!(data instanceof FormData)) {
        options.headers = options.headers || {}
        options.headers['Content-type'] = 'application/json'
      }

      const httpProxy = new HttpClientProxy($axios, $cookies, $config, {
        maxNumberOfRetries: 1,
      })
      const response = await httpProxy.request(uri, options)

      // We throw instead of return, so we can manage that logic in the "catch" block
      // of the try-catch
      if ([403, 404, 401, 409, 500].includes(response.status)) {
        throw response.data
      }

      return response.data
    }

    return {
      provide: {
        httpClient: {
          get,
          post,
          put,
          patch,
          delete: remove,
        },
      },
    }
  },
})
