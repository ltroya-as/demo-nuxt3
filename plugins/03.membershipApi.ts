import { defineNuxtPlugin } from 'nuxt/app'
import { MEMBERSHIPS, DEFAULT_OPTIONS } from '~/utils/constants'
import { getSubscriptionRCPByACF } from '~/constants/memberships'

export default defineNuxtPlugin((nuxtApp) => {
  const { $httpClient, $config, $cookies, $store }: any = nuxtApp

  /**
   * Check if a subscription is active
   *
   * @param {String} subscription
   * @returns
   */
  const hasActiveMembershipFor = async (subscription) => {
    const isActive = await $httpClient.post(
      `${$config.public.apiRestEndpoint}/membership/status/category/${subscription}`,
    )
    $store.commit('memberships/setMembershipStatus', {
      subscription,
      isActive,
    })

    return isActive
  }

  /**
   * Get active subscriptions from the server
   *
   * @returns
   */
  const getActiveMemberships = async () => {
    const memberships = await $httpClient.post(
      `${$config.public.apiRestEndpoint}/users/memberships`,
    )

    const activeMemberships = [
      ...new Set(
        memberships?.map((_membership) => getSubscriptionRCPByACF(_membership)),
      ),
    ]

    $cookies.set(
      MEMBERSHIPS,
      JSON.stringify(activeMemberships),
      DEFAULT_OPTIONS,
    )

    $store.commit('memberships/setActiveMembershipStatuses', activeMemberships)
    return activeMemberships
  }

  /**
   * Add active memberships to the $store on page load
   */
  const restoreMemberships = () => {
    const activeMemberships = $cookies.get(MEMBERSHIPS)

    if (activeMemberships) {
      $store.commit(
        'memberships/setActiveMembershipStatuses',
        activeMemberships,
      )
    }
  }

  return {
    provide: {
      membershipApi: {
        hasActiveMembershipFor,
        getActiveMemberships,
        restoreMemberships,
      },
    },
  }
})
