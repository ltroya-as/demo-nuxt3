<template>
  <div>
    <div v-if="success">
      <div class="w-full">
        <p class="mt-6 text-center font-bold lg:text-xl">
          Please check the email address {{ successEmail }} for instructions to
          reset your password
        </p>

        <div class="text-center">
          <CommonButton
            class="my-12 lg:text-lg"
            variant="primary"
            @click.prevent="onBackButtonClick"
          >
            Return to Homepage
          </CommonButton>
        </div>

        <div
          class="text-surface-em-medium cursor-pointer text-center font-bold lg:text-xl"
          @click="success = false"
        >
          Return to form
        </div>
      </div>
    </div>
    <div v-if="!success">
      <client-only>
        <Form ref="observer" as="">
          <div class="mx-auto flex flex-col items-center">
            <div v-if="showDefaultTitle" class="w-full">
              <h2
                class="mt-6 text-left font-extrabold text-gray-900"
                :class="
                  module === 'page'
                    ? 'text-2xl lg:text-4xl'
                    : 'text-xl lg:text-3xl'
                "
              >
                Password Reset
              </h2>

              <p class="mt-6 lg:text-xl">
                Enter your email address that you used to register. We'll send
                you an email with your username and a link to reset your
                password.
              </p>
            </div>
            <form
              class="mt-8 w-full"
              novalidate
              @submit.prevent="resetPassword"
            >
              <input type="hidden" name="remember" value="true" />
              <div class="-space-y-px rounded-md">
                <CommonFormInput
                  v-model="form.email"
                  name="Email"
                  rules="required|email"
                  type="email"
                  data-testid="forgot-password-email"
                  label="Email"
                  class="w-full"
                />
              </div>

              <div v-if="form.errors.get('message')" class="text-error my-1">
                {{ form.errors.get('message') }}
              </div>

              <div class="my-5 flex flex-col items-center lg:pt-20">
                <CommonButton
                  data-testid="send-instructions-btn"
                  class="w-full px-16 text-lg lg:w-auto lg:self-end"
                  variant="primary"
                  type="submit"
                  :disabled="form.busy"
                >
                  Send
                </CommonButton>
              </div>
            </form>
          </div>
        </Form>
      </client-only>
    </div>
  </div>
</template>

<script>
import { Form } from 'vee-validate'
import { Form as FormClass } from '~/utils/form'
export default {
  ssr: false,
  components: { Form },
  props: {
    module: {
      type: String,
      default: () => 'modal',
      validate: (value) => ['page', 'modal'].includes(value),
    },
    showDefaultTitle: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: new FormClass(null, {
        email: '',
        source: 'website',
      }),
      success: false,
      successEmail: '',
    }
  },

  methods: {
    async resetPassword() {
      const isValid = await this.$refs.observer.validate()

      if (!isValid) return

      this.prepareForm()

      try {
        await this.$restClient.user.resetPassword(this.form)

        this.successEmail = this.form.email

        this.form.reset()
        this.form.finishProcessing()
        this.$refs.observer.reset()

        this.success = true
        this.form.source = 'website'
      } catch (e) {
        this.form.setErrors({ message: e.message })
      }
    },

    prepareForm() {
      this.success = false

      this.form.startProcessing()
    },

    onBackButtonClick() {
      if (this.module === 'modal') {
        this.$modal.close('forgotPassword')
      }

      this.$router.push('/')
    },
  },
}
</script>
