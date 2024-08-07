<template>
  <div class="flex w-full items-center pl-4">
    <IconCloseMenu
      v-if="$store.state.modal.mobileMenuOpen"
      class="h-6 w-6 cursor-pointer"
      data-testid="menu-mobile-close-icon"
      @click="manageMenuMobileClick"
    />
    <IconHamburgerMenu
      v-else
      class="h-6 w-6 cursor-pointer"
      data-testid="menu-mobile-icon"
      @click="manageMenuMobileClick"
    />
    <NuxtLink to="/" class="flex flex-grow items-center justify-center">
      <IconBenchmarkLogoMobile />
    </NuxtLink>
    <div class="block w-[75px]">
      <div
        v-if="!jwtToken"
        class="bg-p-100 cursor-pointer px-4 py-3 text-xs font-semibold"
        @click="manageSingInClick"
      >
        {{ signInText }}
      </div>
      <div v-if="jwtToken">
        <div
          class="flex cursor-pointer select-none items-center justify-end px-4 py-2.5"
          @click="manageMobileAccountClick"
        >
          <IconUser class="h-6 w-6" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconBenchmarkLogoMobile from '~/assets/icons/BenchmarkLogoBlackMobile.svg'
import IconCloseMenu from '~/assets/icons/Close.svg'
import IconHamburgerMenu from '~/assets/icons/Hamburger.svg'
import IconUser from '~/assets/icons/User.svg'
import { SIGN_IN } from '~/constants/services/constants'

export default {
  components: {
    IconBenchmarkLogoMobile,
    IconCloseMenu,
    IconHamburgerMenu,
    IconUser,
  },
  props: {
    jwtToken: { type: String, default: '' },
  },
  data() {
    return {
      signInText: SIGN_IN,
    }
  },
  methods: {
    manageMenuMobileClick() {
      if (this.$store.state.modal.mobileMenuOpen) {
        this.$modal.close('mobileMenu')
      } else {
        this.$modal.open('mobileMenu')
        this.$modal.close('mobileAccountMenu')
      }
    },
    manageMobileAccountClick() {
      if (this.$store.state.modal.mobileAccountMenuOpen) {
        this.$modal.close('mobileAccountMenu')
      } else {
        this.$modal.open('mobileAccountMenu')
        this.$modal.close('mobileMenu')
      }
    },
    manageSingInClick() {
      if (this.$store.state.modal.mobileMenuOpen) {
        this.$modal.close('mobileMenu')
      }
      this.$modal.open('signIn')
    },
  },
}
</script>
