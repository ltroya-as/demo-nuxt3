<template>
  <div
    :class="[authenticated ? 'min-h-[405.6px]' : 'min-h-[315.6px]']"
    class="shadow-pm relative mx-auto flex h-full w-full max-w-[324px] flex-col justify-between gap-y-8 rounded-lg bg-white p-6"
  >
    <CloseLockIcon
      v-if="!isMember"
      class="text-p-900 absolute right-4 top-4"
      data-testid="service-card-item-lock"
    />
    <CheckSubscriptionIcon
      v-else
      class="text-p-900 absolute right-4 top-4 h-5 w-5"
      data-testid="service-card-item-check"
    />
    <div class="flex w-full flex-col gap-y-3">
      <!-- icon -->
      <div
        class="icon-container flex h-[88px] w-[88px] items-center justify-center rounded-[32px]"
        data-testid="service-card-item-icon"
      >
        <component :is="serviceIcon" class="path-stroke h-[37px] w-[37px]" />
      </div>
      <!-- title -->
      <h3
        class="text-xl font-bold md:text-base"
        :class="[comingSoonBackgroundColor]"
      >
        {{ serviceTitle }}
      </h3>
      <div
        v-if="serviceMenu.length && !service.isComingSoon"
        class="flex w-full flex-col gap-y-2"
        data-testid="service-card-item-menu"
      >
        <CommonLinkWithAnimation
          v-for="item in serviceMenu"
          :key="item.membership"
          class="whitespace-nowrap"
          :url="item.to"
          :text="item.name"
        />
        <CommonLinkWithAnimation
          text="Contact Us"
          data-testid="service-card-contact-button"
          @click="openModal()"
        />
      </div>
    </div>
    <CommonButtonDownload
      v-if="Object.keys(brochureFile).length"
      :class="{ 'mt-11': !serviceMenu.length }"
      text="Brochure"
      :download-file="brochureFile"
      variant="tertiary"
      data-testid="service-card-item-download"
    />
    <CommonButton
      v-if="service.isComingSoon"
      variant="primary"
      disabled
      :show-spinner="false"
    >
      Coming Soon
    </CommonButton>
    <CommonButtonDownload
      v-if="isMethodologyActive && isButtonDownload"
      :class="{ 'mt-11': !serviceMenu.length }"
      text="Methodology"
      :download-file="methodologyFile"
      variant="tertiary"
    />
    <CommonButtonLink
      v-if="isMethodologyActive && !isButtonDownload"
      :class="{ 'mt-11': !serviceMenu.length }"
      text="Methodology"
      :route="methodologyUrl"
    />
  </div>
</template>

<script>
import CommonButtonDownload from '~/components/shared/common/ButtonDownload.vue'
import CommonButtonLink from '~/components/shared/common/ButtonLink.vue'
import CommonLinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'
import AnodesIcon from '~/assets/icons/sidebar/Anodes.svg'
import BatteryDatabaseIcon from '~/assets/icons/sidebar/BatteryDatabase.svg'
import LithiumIcon from '~/assets/icons/sidebar/Lithium.svg'
import CobaltIcon from '~/assets/icons/sidebar/Cobalt.svg'
import NickelIcon from '~/assets/icons/sidebar/Nickel.svg'
import BlackMassIcon from '~/assets/icons/sidebar/blackMass.svg'
import FlakeGraphiteIcon from '~/assets/icons/sidebar/FlakeGraphite.svg'
import SyntheticGraphiteIcon from '~/assets/icons/sidebar/SyntheticGraphite.svg'
import SolidStateIcon from '~/assets/icons/sidebar/SolidState.svg'
import CathodesIcon from '~/assets/icons/sidebar/Cathodes.svg'
import SiliconAnodeIcon from '~/assets/icons/sidebar/SiliconAnode.svg'
import RecyclingIcon from '~/assets/icons/sidebar/Recycling.svg'
import MotorIcon from '~/assets/icons/sidebar/motor.svg'
import ManganeseIcon from '~/assets/icons/sidebar/Manganese.svg'
import PhosphateIcon from '~/assets/icons/sidebar/Phosphate.svg'
import FluorsparIcon from '~/assets/icons/sidebar/Fluorspar.svg'
import LineChartIcon from '~/assets/icons/sidebar/lineChart.svg'
import CloseLockIcon from '~/assets/icons/close-lock.svg'
import CheckSubscriptionIcon from '~/assets/icons/check-subscribe.svg'
import { getServices } from '~/constants/services'
/**
 * New Icons
 */
import AnodeIcon from '~/assets/icons/market-assessments/icon-anode.svg'
import CathodeIcon from '~/assets/icons/market-assessments/icon-cathode.svg'
import LithiumIonBatteriesIcon from '~/assets/icons/market-assessments/icon-litihum-ion-batteries.svg'
import SodiumIonBatteriesIcon from '~/assets/icons/market-assessments/icon-sodium-ion-batteries.svg'

export default {
  components: {
    CloseLockIcon,
    CommonButtonLink,
    CommonButtonDownload,
    CommonLinkWithAnimation,
    AnodeIcon,
    CathodeIcon,
    LithiumIonBatteriesIcon,
    SodiumIonBatteriesIcon,
    AnodesIcon,
    BatteryDatabaseIcon,
    LithiumIcon,
    CobaltIcon,
    NickelIcon,
    BlackMassIcon,
    FlakeGraphiteIcon,
    SyntheticGraphiteIcon,
    SolidStateIcon,
    CathodesIcon,
    SiliconAnodeIcon,
    RecyclingIcon,
    MotorIcon,
    ManganeseIcon,
    PhosphateIcon,
    FluorsparIcon,
    LineChartIcon,
    CheckSubscriptionIcon,
  },
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isMember() {
      return this.$store.state.memberships[this.service.membership]
    },
    serviceTitle() {
      return this.service.name ?? ''
    },
    serviceBackgroundIcon() {
      return this.service.backgroundIcon ?? 'bg-p-100'
    },
    serviceIcon() {
      return (this.service.icon ?? 'Lithium') + 'Icon'
    },
    serviceMenu() {
      return this.service.menu ?? []
    },
    isThisMembershipActive() {
      return this.$store.state.memberships[this.service.membership]
    },
    isButtonDownload() {
      return this.service.methodology?.type === 'file'
    },
    methodologyFile() {
      if (!this.isMethodologyActive) return {}
      return this.service.methodology?.file ?? {}
    },
    isMethodologyActive() {
      return !!this.service.methodology?.active
    },
    methodologyUrl() {
      return this.service.methodology?.data || ''
    },
    brochureFile() {
      if (
        !this.service.brochure ||
        Object.keys(this.service.brochure).length === 0
      )
        return {}

      const file = { ...this.service.brochure }
      file.ID = this.$config.public[file.EnvKey]
      return file
    },
    comingSoonBackgroundColor() {
      return this.service.isComingSoon ? 'text-p-em-disabled' : ''
    },
    authenticated() {
      return this.$store.getters['auth/authenticated']
    },
  },
  methods: {
    openModal() {
      this.$store.commit(
        'modal/setInitialFields',
        getServices(this.service.initialFields),
      )
      this.$modal.open('contact')
    },
  },
}
</script>

<style scoped>
.path-stroke > path {
  @apply text-s-700;
}
</style>
