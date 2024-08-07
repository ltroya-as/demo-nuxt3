<template>
  <LoginLayout :image="image" :wit-min-height="isPage">
    <client-only>
      <Form v-slot="{ meta }" as="" :class="[contentClasses]">
        <div
          class="flex w-full flex-col items-center"
          :class="{ 'px-small md:px-big': !isPage }"
        >
          <div class="w-full">
            <h2
              id="signin-modal-title"
              class="mb-10 text-left text-2xl font-bold text-gray-900"
            >
              {{ signInText }}
            </h2>
          </div>
          <form class="w-full" @submit.prevent="signIn">
            <input type="hidden" name="remember" value="true" />
            <div class="flex flex-col gap-y-3">
              <CommonFormInput
                v-model="form.username"
                name="username"
                rules="required"
                data-testid="email"
                label="Username or Email"
                class="w-full"
              />
              <CommonFormInput
                v-model="form.password"
                name="password"
                rules="required"
                data-testid="password"
                type="password"
                autocomplete="current-password"
                label="Password"
                class="w-full"
              />
            </div>

            <div class="text-right">
              <button
                type="button"
                class="text-sm font-semibold underline"
                @click="openForgotPasswordModal"
              >
                Forgot your password?
              </button>
            </div>

            <div class="text-error text-center">{{ error }}</div>

            <div
              class="mt-4 flex w-full items-center gap-x-6 gap-y-3"
              :class="
                isPage ? 'mt-5 flex-col md:flex-row-reverse' : 'mt-3.5 flex-col'
              "
            >
              <CommonButton
                data-testid="login"
                class="px-16 text-sm lg:w-28"
                :class="isPage ? '' : '!w-full'"
                variant="primary"
                type="submit"
                :disabled="(!meta.valid && !autofilled) || loading"
                :show-spinner="loading"
              >
                {{ signInText }}
              </CommonButton>

              <button
                class="w-fit font-semibold underline lg:w-28"
                @click.prevent="openContactModal"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </Form>
    </client-only>
  </LoginLayout>
</template>

<script>
import { Form } from 'vee-validate'
import { getServiceDataFromRoute, hasPricingMenu } from '~/utils/memberships'
import {
  FORECASTS,
  MARKET_ASSESSMENTS,
  PRICE_ASSESSMENTS,
  SIGN_IN,
  ESG,
} from '~/constants/services/constants'
import LoginLayout from '~/components/common/LoginLayout.vue'

export default {
  ssr: false,
  components: { LoginLayout, Form },
  props: {
    image: {
      type: String,
      required: true,
    },
    contentClasses: {
      type: String,
      default: '',
    },
    module: {
      type: String,
      default: () => 'modal',
      validate: (value) => ['page', 'modal'].includes(value),
    },
  },

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      error: null,
      loading: false,
      autofilled: false,
      signInText: SIGN_IN,
    }
  },

  computed: {
    isPage() {
      return this.module === 'page'
    },
  },

  methods: {
    openForgotPasswordModal() {
      this.$modal.close('signIn')
      this.$modal.open('forgotPassword')
    },

    openContactModal() {
      this.$modal.close('signIn')
      this.$modal.open('contact')
    },

    async signIn() {
      this.loading = true
      this.error = ''

      try {
        await this.$bmAuth.login(this.form)
        await this.$membershipApi.getActiveMemberships()
        await this.executeCallback()
        this.$modal.close('signIn')
      } catch (e) {
        this.error = 'Incorrect username/password. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async executeCallback() {
      const callback = this.$store.state.modal.callback

      if (typeof callback === 'function') {
        await callback()
        return
      }

      await this.guessRedirect()
    },

    async guessRedirect() {
      const currentRoute = this.$router.currentRoute.value.path
      const routeName = this.$route.name

      // Redirect to the authorized page (chart, reports, etc) after
      // a successful authentication in a price-assessments, market-assessments, forecasts promotional page
      if (
        currentRoute.includes(PRICE_ASSESSMENTS.slug) ||
        currentRoute.includes(MARKET_ASSESSMENTS.slug) ||
        currentRoute.includes(FORECASTS.slug) ||
        currentRoute.includes(ESG.slug)
      ) {
        const membershipData = getServiceDataFromRoute(
          currentRoute,
          'authorized',
        )

        const isMembershipActive =
          await this.$membershipApi.hasActiveMembershipFor(
            membershipData?.subscription,
          )
        // Don't redirect when inside a Lithium article
        if (
          isMembershipActive &&
          routeName !== 'price-assessments-lithium-slug'
        ) {
          return this.$router.push(membershipData.route)
        }

        if (membershipData?.subscription === 'pricing-price-dashboard') {
          const { memberships } = this.$store.state
          const pricingMenu = hasPricingMenu(memberships)
          if (pricingMenu) {
            return this.$router.push(membershipData.route)
          }
        }
        return
      }

      // Redirect the user to the home page if logged in on the login
      // page without a next_page param
      if (!this.$route.query.next_page && this.module === 'page') {
        return this.$router.push('/')
      }

      if (this.$route.query.next_page) {
        return this.$router.push(this.$route.query.next_page)
      }
    },
  },
}
</script>
