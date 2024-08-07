import { JWT_ACCESS_TOKEN } from '~/utils/constants'

export default {
  computed: {
    authenticationChanged() {
      return this.$store.state.auth.jwtToken
    },

    loggedIn() {
      return this.$store.getters['auth/authenticated']
    },
    isAuthenticated() {
      return !!this.$cookies.get(JWT_ACCESS_TOKEN)
    },
  },

  watch: {
    authenticationChanged(newValue, oldValue) {
      // If both values are equal, it means there is no change on the
      // authentication. We compare trusty vs falsy values because sometimes
      // there is a comparative between null and undefined bypassing this condition
      if (!!newValue === !!oldValue) return
      // The onInit method should have the same logic as the `mounted` method.
      if (typeof this.onInit === 'function') {
        this.onInit()
      }
    },
  },
}
