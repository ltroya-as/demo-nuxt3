import { getServiceDataFromRoute } from '@/utils/memberships'

export default defineNuxtRouteMiddleware(async (to) => {
  const { $store, $bmAuth, $membershipApi } = useNuxtApp()

  const authenticated = $bmAuth.isAuthenticated()
  const { memberships } = $store.state
  console.log(to.path)
  const membershipData = getServiceDataFromRoute(to.path, 'default')
  let isMembershipActive = memberships[membershipData.subscription]

  if (authenticated && !isMembershipActive) {
    isMembershipActive = await $membershipApi.hasActiveMembershipFor(
      membershipData.subscription,
    )
    if (
      membershipData.subscription === 'pricing-price-dashboard' &&
      !isMembershipActive
    ) {
      isMembershipActive = hasPricingMenu(memberships)
    }
  }

  if (!authenticated || !isMembershipActive) {
    return navigateTo(membershipData.route)
  }
})
