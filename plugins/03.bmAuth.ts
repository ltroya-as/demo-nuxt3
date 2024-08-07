import { defineNuxtPlugin } from 'nuxt/app'
import { v4 as uuidv4 } from 'uuid'
import loginGql from '~/queries/login.gql'
import { getAdaptedUser } from '@/utils/adapters'
import {
  BACKEND_VERSION_COOKIE,
  DEFAULT_OPTIONS,
  JWT_ACCESS_TOKEN,
  MEMBERSHIPS,
  REFRESH_TOKEN,
  USER_INFO,
} from '~/utils/constants'
import { GraphQlClientProxy } from '~/utils/http'

/**
 * This is a client to handle all the authentication flow with graphql
 *
 * @method login
 * @method register
 */
export default defineNuxtPlugin({
  name: 'bmAuth',
  dependsOn: ['cookies', 'vuex', 'axios'],
  setup(nuxtApp) {
    const {
      $cookies,
      $config,
      $store,
      $axios,
      $graphql,
      $hubspotIdentity,
    }: any = nuxtApp

    const authenticatedClient = new GraphQlClientProxy({
      graphQLClient: $graphql.authenticatedClient,
      $cookies,
      $config,
      options: { maxNumberOfRetries: 1 },
    })

    const unAuthenticatedClient = new GraphQlClientProxy({
      graphQLClient: $graphql.default,
      $cookies,
      $config,
    })

    const defaultClient = $config.public.isStellateEnabled
      ? unAuthenticatedClient
      : authenticatedClient

    const logout = () => {
      $store.commit('auth/setJwtToken', null)
      $store.commit('auth/setUser', null)
      $store.commit('memberships/clearKeys')

      $cookies.remove(JWT_ACCESS_TOKEN)
      $cookies.remove(REFRESH_TOKEN)
      $cookies.remove(USER_INFO)
      $cookies.remove(MEMBERSHIPS)
    }

    const login = async (form) => {
      const response = await authenticatedClient.mutate({
        mutation: loginGql,
        variables: {
          ...form,
          clientMutationId: uuidv4(),
        },
      })

      console.log({ response, $cookies, $store, $hubspotIdentity })

      const { authToken, refreshToken, user } = response.data.login
      const adaptedUser = getAdaptedUser(user)

      $cookies.set(JWT_ACCESS_TOKEN, authToken, DEFAULT_OPTIONS)
      $cookies.set(REFRESH_TOKEN, refreshToken, DEFAULT_OPTIONS)
      $cookies.set(USER_INFO, adaptedUser, DEFAULT_OPTIONS)
      $cookies.set(
        BACKEND_VERSION_COOKIE,
        (await getBackendVersion()).version,
        DEFAULT_OPTIONS,
      )

      $store.commit('auth/setJwtToken', authToken)
      $store.commit('auth/setUser', adaptedUser)

      $hubspotIdentity.identifyUser()

      return response.data
    }

    const isAuthenticated = () => {
      return !!$cookies.get(JWT_ACCESS_TOKEN)
    }

    /**
     * Get an graphql client based on the authentication status of the client
     *
     * For unauthenticated users, they will use the defaultClient. It uses a GET request for all queries
     * For authenticate users, they will use authenticatedClient. It uses a POST request, so won't care about the LightSpeed GET caching system
     *
     * @returns an graphql client
     */
    const getGraphqlClient = () => {
      return isAuthenticated() ? authenticatedClient : defaultClient
    }

    /**
     * Client to get information that doesn't require authentication. It will use GET request
     * to take advantage of the GET caching server system
     *
     * @returns a graphql client that uses GET request
     */
    const getPublicGraphqlClient = () => defaultClient

    const getAuthenticatedClient = () => authenticatedClient

    // This endpoint is added here because of it is required by this plugin, and the
    // order of the plugin imports matters, and restClient cannot be imported before
    // this plugin because of other plugin dependencies.
    const getBackendVersion = async () => {
      return (
        await $axios.get(`${$config.public.apiRestEndpoint}/backend-version`)
      ).data
    }

    const bmAuth = {
      login,
      logout,
      isAuthenticated,
      getGraphqlClient,
      getPublicGraphqlClient,
      getAuthenticatedClient,
      getBackendVersion,
    }

    return { provide: { bmAuth } }
  },
})
