<template>
  <CommonModal modal-name="changePassword" modal-header-classes="!px-4">
    <template #content>
      <client-only>
        <Form v-slot="{ handleSubmit, meta }" as="">
          <form
            :key="formKey"
            class="max-w-md"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <h3 class="mb-8 text-2xl font-bold">Change Password</h3>

            <FormInput
              v-model="currentPassword"
              label="Current Password"
              type="password"
              name="Current Password"
              rules="required"
            />
            <FormInput
              v-model="newPassword"
              label="New Password"
              type="password"
              name="new-password"
              rules="required|min:8"
            />
            <FormInput
              v-model="newPasswordConfirmation"
              label="Repeat Password"
              type="password"
              name="Repeat Password"
              rules="required|confirmed:@new-password"
            />
            <PasswordStrength
              :input-value="newPassword"
              @is-valid="(isValid) => (isPasswordValid = isValid)"
            />

            <div v-if="errorText" class="mb-4 max-w-[270px]">
              <p
                class="font-lato text-error mt-1 text-xs"
                :class="
                  errorText === successfulMessage &&
                  'text-base font-bold text-black'
                "
              >
                {{ errorText }}
              </p>
            </div>

            <div class="flex justify-end">
              <Button
                variant="primary"
                :disabled="!isPasswordValid || !meta.valid || loading"
                :show-spinner="loading"
                type="submit"
                tabindex="0"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </client-only>
    </template>
  </CommonModal>
</template>

<script>
import { Form } from 'vee-validate'
import CommonModal from '@/components/common/Modal.vue'
import Button from '@/components/common//Button.vue'
import FormInput from '@/components/common/FormInput.vue'
import PasswordStrength from '@/components/PasswordStrength.vue'
export default {
  components: {
    CommonModal,
    Form,
    FormInput,
    Button,
    PasswordStrength,
  },

  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
      isPasswordValid: false,
      errorText: '',
      successfulMessage: 'Your password was changed successfully.',
      loading: false,
      formKey: 0,
    }
  },

  methods: {
    async onSubmit() {
      this.errorText = ''
      this.loading = true
      const res = await this.$restClient.user.changePassword({
        current_password: this.currentPassword,
        new_password: this.newPassword,
        new_password_confirmation: this.newPasswordConfirmation,
      })
      this.loading = false

      if (res.message === this.successfulMessage) {
        this.currentPassword = ''
        this.newPassword = ''
        this.newPasswordConfirmation = ''
        this.formKey++
      }

      this.errorText = res.message || ''
    },
  },
}
</script>
