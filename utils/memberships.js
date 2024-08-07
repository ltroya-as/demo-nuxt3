import { getServiceByName } from '~/constants/services/objects'

export const getServiceDataFromRoute = (route, returnRoute) => {
  const [, category, product] = route.split('/')
  const item = getServiceByName(`${category}-${product}`)
  if (item) {
    return {
      subscription: item?.subscription,
      route: item?.routes[returnRoute],
    }
  }
  return { subscription: null, route: null }
}

export const hasPricingMenu = (memberships) => {
  return Object.keys(memberships)
    .filter((key) => key.startsWith('pricing'))
    .some((key) => memberships[key] === true)
}
