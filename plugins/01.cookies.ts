import Cookies from 'js-cookie'
const CONSENT_KEY = 'cookie-accepted'

export default defineNuxtPlugin({
  name: 'cookies',
  setup() {
    const cookies = {
      get(key) {
        const cookieValue = Cookies.get(key)
        try {
          return JSON.parse(cookieValue)
        } catch (e) {
          return cookieValue
        }
      },
      set(key, value) {
        let cookieValue = value

        if (typeof value === 'object') {
          cookieValue = JSON.stringify(value)
        }

        Cookies.set(key, cookieValue)
      },
      remove: Cookies.remove,
      setConsentCookie(accepted: boolean) {
        Cookies.set(CONSENT_KEY, accepted)
      },
      getConsentCookie(): string | undefined {
        return Cookies.get(CONSENT_KEY)
      },
    }

    return { provide: { cookies } }
  },
})
