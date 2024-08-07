/** @packages */
import { mapGetters } from 'vuex'

/** @utils */
import { asyncSome } from '~/utils/array'

/** @constants */
import { FORBIDDEN } from '~/constants/http'

/** @mixins */
import AuthenticationMixin from '~/mixins/AuthenticationMixin'

export default {
  mixins: [AuthenticationMixin],
  computed: {
    ...mapGetters({
      hasMembershipActive: 'memberships/isMembershipActive',
    }),
  },
  data() {
    return {
      isAuthorized: false,
    }
  },
  methods: {
    async hasAuthorized(_subscription) {
      const authorized = await this.hasMembership(
        _subscription ?? this.subscription,
      )
      return authorized && this.isAuthenticated
    },

    hasOneOfThisMemberships(...memberships) {
      return asyncSome(memberships, this.hasMembership)
    },

    async hasMembership(membershipName) {
      const authenticated = this.$bmAuth.isAuthenticated()
      let isMembershipActive = this.hasMembershipActive(membershipName)
      if (authenticated && !isMembershipActive) {
        const memberships = await this.$membershipApi.getActiveMemberships()
        isMembershipActive = memberships.includes(membershipName)
      }
      return isMembershipActive
    },

    async updateMembershipsAndRedirect(error, route) {
      if (error?.status === FORBIDDEN || error.data?.status === FORBIDDEN) {
        await this.$membershipApi.getActiveMemberships()
        await this.$router.push(route)
      }
    },
  },
}
