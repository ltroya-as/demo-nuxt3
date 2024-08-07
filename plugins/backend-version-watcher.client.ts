import { defineNuxtPlugin } from 'nuxt/app'
import { BACKEND_VERSION_COOKIE } from '~/utils/constants'

export default defineNuxtPlugin({
  name: 'backend-version-watcher',
  enforce: 'post',
  dependsOn: ['cookies', 'bmAuth'],
  setup(nuxtApp) {
    const { $bmAuth, $cookies }: any = nuxtApp

    const getBackendVersion = async () => {
      const response = await $bmAuth.getBackendVersion()
      return response.version
    }

    const getBackendVersionCookieValue = () => {
      return $cookies.get(BACKEND_VERSION_COOKIE)
    }

    const isBackendValid = async () => {
      const backendVersion = await getBackendVersion()
      const cookieBackendVersion = getBackendVersionCookieValue()

      return backendVersion === cookieBackendVersion
    }

    const invalidateSession = async () => {
      const isAuthenticated = $bmAuth.isAuthenticated()
      const isSameVersion = await isBackendValid()

      if (!isAuthenticated) return

      if (!isSameVersion) {
        $bmAuth.logout()
      }
    }

    return {
      provide: {
        backendVersionWatcher: {
          invalidateSession,
        },
      },
    }
  },
})
