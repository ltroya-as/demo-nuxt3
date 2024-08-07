<template>
  <div>
    <div class="mb-16 w-full">
      <section class="pb-10 md:text-left">
        <p class="text-center text-xs md:text-left">
          These details will only be visible to you and Benchmark
        </p>
      </section>

      <hr class="border-s-200 border-t-2" />

      <section class="flex flex-col gap-x-20 gap-y-5 pb-10 pt-6 md:flex-row">
        <div class="text-center md:w-1/2 md:text-left">
          <label class="text-lg font-semibold">Email and Password</label>
        </div>

        <div class="flex flex-col items-center md:block md:w-1/2">
          <p class="text-sx mb-6 break-all" data-testid="account-email">
            {{ email || '-' }}
          </p>
          <button
            type="button"
            class="bg-s-900 rounded px-4 py-2 text-xs font-semibold text-white"
            data-testid="account-change-password-button"
            @click="$modal.open('changePassword'), ChangePasswordModalKey++"
          >
            Change Password
          </button>
        </div>
      </section>

      <ChangePasswordModal
        v-show="$store.state.modal.changePasswordOpen"
        :key="ChangePasswordModalKey"
      />

      <hr class="border-s-200 border-t-2" />

      <section class="pb-10 pt-6">
        <div class="mb-5 flex flex-col gap-x-20 gap-y-5 md:flex-row">
          <div class="text-center md:w-1/2 md:text-left">
            <label class="text-lg font-semibold"> Personal Information </label>
          </div>

          <div class="text-center md:w-1/2 md:text-left">
            <p class="text-sx" data-testid="account-name">{{ name || '-' }}</p>
          </div>
        </div>

        <p class="text-center text-lg md:text-left">
          To update your details, please
          <button
            class="text-p-500 font-bold underline"
            data-testid="account-change-contact-us"
            @click="$modal.open('updateAccountDetailRequest')"
          >
            contact us
          </button>
          .
        </p>
      </section>
    </div>

    <UpdateAccountDetailRequestModal
      v-show="$store.state.modal.updateAccountDetailRequestOpen"
    />
  </div>
</template>

<script>
import UpdateAccountDetailRequestModal from '~/components/UpdateAccountDetailRequestModal.vue'
import ChangePasswordModal from '~/components/ChangePasswordModal.vue'
definePageMeta({ layout: 'account', middleware: ['authenticated'] })

export default {
  components: { UpdateAccountDetailRequestModal, ChangePasswordModal },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({ title: 'Account' })

    useHead(seo)
  },

  data() {
    return {
      name: '',
      email: '',
      ChangePasswordModalKey: 0,
    }
  },

  async mounted() {
    const { name, email } = this.$store.state.auth.user
    this.name = name
    this.email = email

    if (this.$store.state.memberships.allSubscriptions === undefined) {
      this.$store.commit(
        'memberships/setAllSubscriptions',
        await this.$restClient.getSubscriptions(),
      )
    }
  },
}
</script>
