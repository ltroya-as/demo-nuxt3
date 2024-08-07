export default defineNuxtRouteMiddleware((to) => {
  const { $bmAuth } = useNuxtApp()
  if (!$bmAuth.isAuthenticated()) {
    return navigateTo(`/login?next_page=${to.path}`)
  }
})
