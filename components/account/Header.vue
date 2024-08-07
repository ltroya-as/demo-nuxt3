<template>
  <div
    class="lg:max-w-contact-form-container mx-auto mb-10 w-full lg:mt-16 lg:px-14 2xl:px-0"
  >
    <div
      class="bg-s-900 lg:text-s-900 flex w-full justify-center gap-4 py-2 text-sm font-semibold text-white md:text-lg lg:relative lg:top-0 lg:justify-start lg:bg-transparent"
    >
      <AccountTabMenu
        v-for="item in items"
        :id="item.id"
        :key="item.name"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import AccountTabMenu from '~/components/account/TabMenu.vue'

export default {
  components: { AccountTabMenu },
  data() {
    return {
      items: [
        {
          title: 'My Account',
          name: 'Account details',
          to: '/account',
          id: 'account-details-tab',
        },
        {
          title: 'Current subscriptions',
          name: 'Subscriptions',
          to: '/account/subscriptions',
          id: 'current-subscriptions-tab',
        },
      ],
    }
  },

  computed: {
    title() {
      const item = this.items.find(
        (i) => i.to === this.$route.path.replace(/\/$/, ''),
      )
      return item?.title || 'My Account'
    },
  },
}
</script>
