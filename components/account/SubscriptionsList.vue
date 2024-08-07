<template>
  <div class="flex w-full flex-col items-center md:block md:columns-2">
    <div
      v-for="[key, subscription] of Object.entries(subscriptions)"
      :key="key"
      class="mb-4 inline-block w-full rounded-xl bg-white px-6 py-6 md:pr-11"
      style="box-shadow: 0 4px 10px rgba(0 0 0 5%)"
      data-testid="subscription-card"
    >
      <h3 class="mb-5 text-xl font-bold">{{ key }}</h3>

      <ul class="flex flex-col p-0" :data-testid="`subscription-list-${key}`">
        <li
          v-for="item in subscription"
          :key="item.name"
          class="my-1 grid grid-cols-2"
        >
          <span class="flex items-center gap-1 text-sm md:text-base">
            <Icon
              name="check-subscribe"
              class="text-p-500 opacity-0"
              :class="item.expirationDate === 'none' || 'opacity-100'"
            />
            {{ item.name }}
          </span>
          <div class="flex items-center justify-end text-xs">
            <div v-if="item.expirationDate !== 'none'" class="flex justify-end">
              <span
                class="mr-1"
                :class="
                  item.status === 'expired' &&
                  'text-error-light ml-4 font-semibold'
                "
              >
                {{ item.status === 'expired' ? 'Expired' : 'Expires' }}:
              </span>
              <div
                v-if="item.status === 'expired'"
                class="ml-3 flex cursor-pointer items-center font-bold"
                @click="renew(item, key)"
              >
                Renew
                <Icon name="Refresh" class="ml-1 h-4 w-4 stroke-black" />
              </div>
              <span v-else>
                {{ item.expirationDate }}
              </span>
            </div>
            <span v-else class="bg-p-500 rounded px-3 py-1 font-bold">
              <a
                v-if="item.slug === 'subscriber'"
                :href="getRouteSource(LEARN_MORE_LINKS[item.slug])"
                target="_blank"
                rel="noopener"
              >
                Learn More
              </a>
              <nuxt-link
                v-else
                :to="getRouteService(LEARN_MORE_LINKS[item.slug])"
              >
                Learn More
              </nuxt-link>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <TrialConversionsModal
      v-show="$store.state.modal.trialConversionsOpen"
      :key="modalKey"
    />
  </div>
</template>

<script>
import Icon from '~/components/common/Icon.vue'
import { LEARN_MORE_LINKS } from '~/constants/memberships'
import TrialConversionsModal from '~/components/TrialConversionsModal.vue'

export default {
  components: { Icon, TrialConversionsModal },
  props: {
    subscriptions: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { LEARN_MORE_LINKS, modalKey: 0 }
  },
  computed: {
    sourceUrl() {
      return this.$config.public.sourceUrl
    },
    modals() {
      return this.$store.state.modal
    },
  },
  methods: {
    getRouteSource(slug) {
      return `${this.sourceUrl}${slug}`
    },
    getRouteService(slug) {
      return slug ?? '/contact'
    },
    renew(item, key) {
      const defaultValues = {}
      const subName = `${key} ${item.name}`
      const { email, firstName, lastName } = this.$store.state.auth.user

      defaultValues[this.$config.public.fmTrialConversionsFirstNameFieldId] =
        firstName || ''
      defaultValues[this.$config.public.fmTrialConversionsLastNameFieldId] =
        lastName || ''
      defaultValues[this.$config.public.fmTrialConversionsEmailFieldId] =
        email || ''
      defaultValues[
        this.$config.public.fmTrialConversionsHiddenFieldId
      ] = `${subName} Renewal`
      this.$store.commit('modal/setRenewData', { subName, defaultValues })

      this.modalKey++
      this.$modal.open('trialConversions')
    },
  },
}
</script>
