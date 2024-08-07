export default defineNuxtRouteMiddleware((to, _from) => {
  /**
   * Validate that we are not on the home page and remove the slash (/)
   * if the url has it at the end.
   */
  if (import.meta.client && to.name !== 'index' && to.path.endsWith('/')) {
    const params = to.fullPath.split('?')[1]
    let route = to.path.slice(0, -1)

    if (params) route = `${route}?${params}`

    return navigateTo(route, { redirectCode: 301 })
  }
})
