<template>
  <div>
    <div
      class="mb-6 flex w-full flex-col items-end justify-between gap-y-2 md:mb-10 md:flex-row md:items-start"
    >
      <h3
        class="border-p-500 text-s-900 w-full border-l-4 pl-2 text-xl font-bold capitalize md:w-auto lg:text-3xl"
      >
        Sustainability Index
      </h3>
      <LinkWithAnimation
        v-if="isAuthorized"
        text="View More"
        class="flex-shrink-0 text-sm font-semibold md:text-base"
        :url="getRoute"
      />
      <ButtonContactUs
        v-else
        text="Find out more"
        variant="clean"
        :services="checkboxesEsg"
        class="!text-sm !text-black"
      />
    </div>
    <SustainabilityIndexTable
      :sustainability-indexes="sustainabilityIndexes"
      :product="slug"
      :subscription="subscription"
    />
  </div>
</template>

<script>
import { ESG } from '~/constants/services/constants'

import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'
import ButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
import SustainabilityIndexTable from '~/components/esg/SustainabilityIndexTable.vue'

import AuthorizationMixin from '~/mixins/AuthorizationMixin'

export default {
  components: {
    LinkWithAnimation,
    ButtonContactUs,
    SustainabilityIndexTable,
  },
  mixins: [AuthorizationMixin],
  props: {
    sustainabilityIndexes: {
      type: Array,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
    },
    checkbox: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isAuthorized: false,
    }
  },
  computed: {
    checkboxesEsg() {
      return this.checkbox ? [this.checkbox, ESG.checkbox] : [ESG.checkbox]
    },
    getRoute() {
      const path = this.$route.path.split('/portal')[0]
      return `${path}/sustainability/?tab=sustainability-index`
    },
  },
  async mounted() {
    this.isAuthorized = await this.hasAuthorizedInEsg()
  },
  methods: {
    async hasAuthorizedInEsg() {
      const authorized = await this.hasMembership(this.subscription)
      return authorized && this.isAuthenticated
    },
  },
}
</script>
