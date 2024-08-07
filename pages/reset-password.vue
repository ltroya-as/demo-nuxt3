<template>
  <LoginLayout :image="image">
    <div class="mx-auto max-w-md px-6 lg:my-24 lg:px-0">
      <ForgotPasswordForm module="page" :show-default-title="true" />
    </div>
  </LoginLayout>
</template>

<script>
import { SET_RESET_PASSWORD } from '@/constants/login-images'
import LoginLayout from '@/components/common/LoginLayout.vue'
import { Form } from '~/utils/form'

export default {
  components: {
    LoginLayout,
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Reset your password' })
    useHead(seo)
  },

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
    }
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
      }
    },

    loadParams() {
      this.form.email = this.$route.query.email
      this.form.token = this.$route.query.token
    },
  },
}
</script>
