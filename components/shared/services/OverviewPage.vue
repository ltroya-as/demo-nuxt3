<template>
  <div class="flex flex-col gap-4">
    <div
      class="text-2xl font-bold md:text-4xl"
      data-testid="unauthorized-overview-title"
    >
      {{ title }}
    </div>
    <slot name="header"></slot>
    <div v-if="purchasedServices.length > 0">
      <h3 class="mb-3 mt-2 text-lg font-semibold"> Purchased Subscriptions </h3>
      <ServicesSection :services="purchasedServices" colorize-cards />
    </div>
    <div
      v-if="availableServices.length > 0"
      class="flex w-full flex-col gap-y-3.5 px-4 md:gap-y-4 lg:px-0"
    >
      <div
        class="font-semibold"
        data-testid="unauthorized-overview-subtitle"
        :class="subtitleClasses"
      >
        {{ subtitle }}
      </div>
      <div
        v-if="descriptions.length > 0"
        class="mb-3 grid gap-y-3 text-sm"
        :class="descriptionsContainerClasses"
      >
        <p
          v-for="(description, index) in descriptions"
          :key="index"
          data-testid="unauthorized-overview-description"
        >
          {{ description }}
        </p>
      </div>
      <slot />
      <div class="flex flex-col">
        <span
          v-if="moreInfoText"
          class="text-base"
          :class="[moreInfoDescription ? 'mb-2' : 'mb-7']"
          data-testid="unauthorized-overview-more-info"
        >
          {{ moreInfoText }}
        </span>
        <p v-if="moreInfoDescription" class="mb-7 text-base">
          {{ moreInfoDescription }}
        </p>
        <ServicesSection
          :services="availableServices"
          :card-classes="`2xl:!h-auto' ${servicesClasses}`"
          colorize-cards
        />
      </div>
    </div>
  </div>
</template>
<script>
import ServicesSection from '~/components/shared/services/Section.vue'

export default {
  components: { ServicesSection },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    subtitleClasses: {
      type: String,
      default: '',
    },
    descriptions: {
      type: Array,
      default: () => [],
    },
    descriptionsContainerClasses: {
      type: String,
      default: '',
    },
    services: {
      type: Array,
      required: true,
    },
    servicesClasses: {
      type: String,
      default: '',
    },
    moreInfoText: {
      type: String,
      default: '',
    },
    moreInfoDescription: {
      type: String,
      default: '',
    },
  },
  computed: {
    purchasedServices() {
      if (this.services.length === 0) return []
      return [...this.services].filter(
        (service) => this.$store.state.memberships[service.membership],
      )
    },
    availableServices() {
      if (this.services.length === 0) return []
      return [...this.services].filter(
        (service) => !this.$store.state.memberships[service.membership],
      )
    },
  },
}
</script>
