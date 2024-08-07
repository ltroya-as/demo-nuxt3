import fetch from 'isomorphic-fetch'
import {jwtDecode} from 'jwt-decode'
import { v4 as uuidv4 } from 'uuid'
import {
  JWT_ACCESS_TOKEN,
  REFRESH_TOKEN,
  ONE_YEAR_DURATION,
} from '~/utils/constants'

const addAuthorizationHeader = (options, token) => {
  if (!token) return options

  options.headers.Authorization = `Bearer ${token}`
  return options
}

const decodeToken = (token) => {
  let decoded = null

  try {
    decoded = jwtDecode(token)
  } catch (e) {}

  return decoded
}

export const isTokenValid = ($cookies) => {
  const jwtToken = $cookies.get(JWT_ACCESS_TOKEN)
  const decodedToken = decodeToken(jwtToken)

  return decodedToken && Date.now() < decodedToken.exp * 1000
}

export const getNewToken = async ({ $cookies, $config }) => {
  const refreshToken = $cookies.get(REFRESH_TOKEN)

  if (!refreshToken) return null

  const fetchResult = await fetch($config.public.graphqlEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation refreshToken {
          refreshJwtAuthToken(input: { clientMutationId: "${uuidv4()}", jwtRefreshToken: "${refreshToken}" }) {
            authToken
          }
        }
      `,
    }),
  }).then((res) => res.json())

  const authToken = fetchResult.data.refreshJwtAuthToken.authToken

  $cookies.set(JWT_ACCESS_TOKEN, authToken, {
    expires: ONE_YEAR_DURATION,
    path: '/',
  })

  return authToken
}

export const getToken = ({ $cookies, $config }) => {
  const jwtToken = $cookies.get(JWT_ACCESS_TOKEN)

  if (isTokenValid($cookies)) {
    return jwtToken
  }

  return getNewToken({ $cookies, $config })
}

/**
 * Add Authorization header if it is necessary
 *
 * @param {*} options
 * @param $cookies
 * @param $config
 * @returns
 */
export const extendOptions = async (options, $cookies, $config) => {
  const jwtToken = await getToken({ $cookies, $config })
  return addAuthorizationHeader(options, jwtToken)
}
