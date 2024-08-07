<template>
  <nav class="relative z-40 flex h-[44px] items-center lg:h-auto">
    <div class="relative flex w-full items-center justify-between">
      <NuxtLink
        to="/"
        class="hidden h-[68px] w-full max-w-[225px] shrink xl:inline-block"
      >
        <IconBenchmarkLogo class="relative top-[12px] w-[225px]" />
      </NuxtLink>

      <ClientOnly>
        <template #placeholder>
          <MobileNavigation class="w-screen lg:hidden" />

          <DesktopNavigation
            class="hidden w-full lg:flex xl:w-fit"
            :menu-list="menuItems"
          />
        </template>
        <!-- Mobile nav -->
        <MobileNavigation :jwt-token="jwtToken" class="lg:hidden" />

        <!-- Desktop nav -->
        <DesktopNavigation
          class="hidden w-full lg:flex xl:w-fit"
          :jwt-token="jwtToken"
          :menu-list="menuItems"
          :mobile-account-menu="mobileAccountMenu"
        />
      </ClientOnly>
    </div>

    <ForgotPasswordModal v-show="$store.state.modal.forgotPasswordOpen" />
    <SignInModal v-show="$store.state.modal.signInOpen" />
    <SubscribeModal v-show="$store.state.modal.subscribeOpen" />
    <ModalNewsletter v-show="$store.state.modal.newsletterOpen" />
    <CapexTrackerModal v-show="$store.state.modal.capexTrackerOpen" />
    <CapexTrackerContactModal
      v-show="$store.state.modal.capexTrackerContactOpen"
    />
    <IndustryReportsModal v-show="$store.state.modal.industryReportsOpen" />
    <RequestForProposalModal
      v-show="$store.state.modal.requestForProposalOpen"
    />
    <NavigationMobileMenu
      v-show="$store.state.modal.mobileMenuOpen"
      :data="menuMobileItems"
      modal-name="mobileMenu"
    />
    <NavigationMobileMenu
      v-show="$store.state.modal.mobileAccountMenuOpen"
      :data="mobileAccountMenu"
      initial-menu-title="Account"
      modal-name="mobileAccountMenu"
    />
  </nav>
</template>

<script>
import IconBenchmarkLogo from '~/assets/icons/BenchmarkLogoBlack.svg'
import { JWT_ACCESS_TOKEN, USER_INFO } from '~/utils/constants'
import DesktopNavigation from '~/components/navigation/DesktopNavigation.vue'
import MobileNavigation from '~/components/navigation/MobileNavigation.vue'
import ForgotPasswordModal from '~/components/ForgotPasswordModal.vue'
import SignInModal from '~/components/SignInModal.vue'
import ModalNewsletter from '~/components/shared/common/ModalNewsletter.vue'
import CapexTrackerModal from '~/components/CapexTrackerModal.vue'
import NavigationMobileMenu from '~/components/navigation/MobileMenu.vue'
import SubscribeModal from '~/components/subscribe/Modal.vue'
import CapexTrackerContactModal from '~/components/CapexTrackerContactModal.vue'
import IndustryReportsModal from '~/components/IndustryReportsModal.vue'
import RequestForProposalModal from '~/components/RequestForProposalModal.vue'
import { menuItems, menuMobileItems } from '~/constants/main-menu'

export default {
  components: {
    SubscribeModal,
    NavigationMobileMenu,
    ModalNewsletter,
    SignInModal,
    ForgotPasswordModal,
    CapexTrackerModal,
    MobileNavigation,
    DesktopNavigation,
    IconBenchmarkLogo,
    CapexTrackerContactModal,
    IndustryReportsModal,
    RequestForProposalModal,
  },

  data() {
    return {
      mobileAccountMenu: [
        { name: 'My Account', href: '/account' },
        { name: 'Current Subscriptions', href: '/account/subscriptions' },
        { name: 'Change Password', href: '/account', menuStyle: 'border-none' },
      ],
      menuItems,
      menuMobileItems,
    }
  },

  computed: {
    jwtToken() {
      return this.$store.state.auth.jwtToken
    },

    mobileMenuOpen() {
      return this.$store.state.modal.mobileMenuOpen
    },

    mobileAccountMenuOpen() {
      return this.$store.state.modal.mobileAccountMenuOpen
    },
  },

  watch: {
    mobileMenuOpen(isOpen) {
      if (isOpen) {
        document.body.classList.add('overflow-hidden')
        document.body.classList.add('lg:overflow-visible')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    },
    mobileAccountMenuOpen(isOpen) {
      if (isOpen) {
        document.body.classList.add('overflow-hidden')
        document.body.classList.add('lg:overflow-auto')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    },
  },

  beforeUnmount() {
    // event listener for back button
    window.addEventListener('popstate', (_event) => {
      this.$modal.close('mobileMenu')
      this.$modal.close('mobileAccountMenu')
      document.body.classList.remove('overflow-hidden')
    })
  },

  beforeMount() {
    const jwtToken = this.$cookies.get(JWT_ACCESS_TOKEN)
    this.$store.commit('auth/setJwtToken', jwtToken)
    this.$store.commit('auth/setUser', this.$cookies.get(USER_INFO))
    if (!jwtToken) this.$store.commit('memberships/clearKeys')
  },

  mounted() {
    this.$membershipApi.restoreMemberships()
  },

  methods: {
    async logout() {
      await this.$bmAuth.logout()
      this.$router.push('/')
    },
  },
}
</script>
