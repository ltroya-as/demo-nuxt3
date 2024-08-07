<template>
  <LoginLayout :image="image">
    <div class="max-w-sm px-6">
      <h2 class="mb-5 text-2xl font-bold lg:mb-4">Change Your Password</h2>
      <p class="mb-5 text-sm lg:mb-3">
        For your security, we highly recommend that you choose a unique password
        that you don’t use for any other online account.<br /><br />
        Use only letters, numbers, and common symbols. Avoid spaces at the start
        and end.
      </p>

      <client-only>
        <form @submit.prevent="submit">
          <ValidationObserver v-slot="{ invalid }" ref="observer">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min:8"
              vid="new_password"
              name="New password"
              mode="aggressive"
            >
              <CommonFormInput
                v-model="form.new_password"
                type="password"
                name="new_password"
                label="Enter New Password"
                :error-text="errors[0]"
                help-text="*Must be at least 8 characters"
                @input="type"
              />
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="new_password_confirmation"
              name="Confirm password"
              mode="aggressive"
            >
              <CommonFormInput
                v-model="form.new_password_confirmation"
                type="password"
                name="new_password_confirmation"
                label="Re-enter Password"
                :error-text="errors[0]"
                help-text="*Both passwords must match"
              />
            </ValidationProvider>

            <PasswordStrength
              :input-value="inputValue"
              :confirmation-value="form.new_password_confirmation"
              @is-valid="(isValid) => (isPasswordValid = isValid)"
            />

            <div v-if="form.errors.get('message')" class="text-error my-1">
              {{ form.errors.get('message') }}
            </div>

            <div class="mt-9 md:text-right">
              <CommonButton
                class="w-full md:will-change-auto"
                :class="!isPasswordValid && 'cursor-not-allowed'"
                variant="primary"
                :disabled="form.busy || invalid"
                :show-spinner="form.busy"
                @click="onClick"
              >
                Change Password
              </CommonButton>
            </div>

            <div v-if="form.successful" class="font-lato text-good my-1">
              Your password has been changed successfully
            </div>
          </ValidationObserver>
        </form>
      </client-only>
    </div>
  </LoginLayout>
</template>

<script>
import LoginLayout from '@/components/common/LoginLayout.vue'
import PasswordStrength from '@/components/PasswordStrength.vue'
import { SET_RESET_PASSWORD } from '@/constants/login-images'
import { Form } from '~/utils/form'
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'

export default {
  components: {
    LoginLayout,
    PasswordStrength,
  },
  mixins: [SeoUtilsMixin],
  data() {
    return {
      errorMessage: '',
      successMessage: '',
      form: new Form(null, {
        new_password: '',
        new_password_confirmation: '',
        email: '',
        token: '',
      }),
      image: SET_RESET_PASSWORD,
      isPasswordValid: false,
      inputValue: '',
      isFormValid: false,
    }
  },

  head() {
    return this.generateSeoInfo({
      title: 'Set your new password',
    })
  },

  mounted() {
    this.loadParams()
  },

  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate()

      if (!isValid) return

      this.form.startProcessing()

      try {
        const { message } = await this.$restClient.user.setPassword(this.form)
        this.successMessage = message

        this.form.reset()
        this.form.finishProcessing()

        this.loadParams()
        this.$refs.observer.reset()
      } catch (e) {
        this.form.setErrors({ message: e.message })
      } finally {
        this.inputValue = ''
        // this.$router.push('/login')
      }
    },

    loadParams() {
      this.form.email = this.$route.query.email
      this.form.token = this.$route.query.token
    },

    type(inputValue) {
      this.inputValue = inputValue
    },

    onClick(e) {
      if (!this.isPasswordValid) e.preventDefault()
    },
  },
}
</script>
