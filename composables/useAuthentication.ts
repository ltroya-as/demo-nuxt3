import { useStore } from 'vuex'

const useAuthentication = (onInit?: () => void) => {
  const { $cookies } = useNuxtApp()
  const store = useStore()

  const authenticated = ref(null)

  const authenticationChanged = computed(() => store.state.auth.jwtToken)
  const loggedIn = computed(() => store.getters['auth/authenticated'])

  const isAuthenticated = () => {
    authenticated.value = !!$cookies.get(JWT_ACCESS_TOKEN)
    return authenticated.value
  }

  watch(authenticationChanged, (newValue, oldValue) => {
    if (!!newValue === !!oldValue) return
    if (typeof onInit === 'function') onInit()
  })

  return { authenticated, authenticationChanged, loggedIn, isAuthenticated }
}

export default useAuthentication
