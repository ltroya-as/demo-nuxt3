import { defineNuxtPlugin } from 'nuxt/app'
import { USER_INFO } from '~/utils/constants'

export default defineNuxtPlugin({
  name: 'hubspot-identity',
  dependsOn: ['cookies'],
  setup(nuxtApp) {
    const { $cookies }: any = nuxtApp

    const getUserId = (user) => {
      const decoded = window.atob(user.id)
      const [, id] = decoded.split(':')
      return id
    }

    /**
     * Identify the user in HubSpot. Docs: https://developers.hubspot.com/docs/api/events/tracking-code?_ga=2.208975890.101053308.1706540799-1452547414.1706540799
     *
     * @param retries
     */
    const identifyUser = (retries = 0) => {
      const user = $cookies.get(USER_INFO)

      // If there is no user, do nothing
      if (!user) {
        return
      }

      if (window._hsq) {
        window._hsq.push([
          'identify',
          {
            id: getUserId(user),
            email: user.email,
          },
        ])
      } else if (retries < 5) {
        setTimeout(() => identifyUser(retries + 1), 500)
      }
    }

    // Identify the user if there is a user
    identifyUser()

    return {
      provide: {
        hubspotIdentity: {
          identifyUser,
        },
      },
    }
  },
})
