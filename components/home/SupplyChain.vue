<template>
  <div class="relative flex md:flex-row">
    <div
      class="supply-chain-divider bg-p-500 md:w-small mt-10 hidden h-7 md:flex lg:w-14 2xl:flex-grow"
    ></div>
    <div
      class="supply-chain-section xl:max-w-content-container mx-auto mb-7 mt-3 flex flex-col md:mx-0 md:flex-grow md:flex-row xl:mx-auto 2xl:min-w-[1424px]"
    >
      <HomeSupplyChainSection
        v-for="(stage, id) in stages"
        :key="id"
        :is-last="id === stages.length - 1"
        :title="stage.title"
        :background-image="stage.backgroundImage"
        :color="stage.color"
        :container-arrow-classes="stage.containerArrowClasses"
        :feature-list="stage.products"
        :is-open="stage.isOpen"
        data-testid="supplyChain-item"
        @click="onClick"
      />
    </div>
    <div
      class="supply-chain-divider bg-p-50 md:w-small mt-10 hidden h-7 md:flex lg:w-14 2xl:flex-grow"
    ></div>
  </div>
</template>

<script>
import HomeSupplyChainSection from '~/components/home/SupplyChainSection.vue'
import {
  CONSULTANCY,
  ESG,
  FORECASTS,
  LITHIUM_ION_BATTERIES,
  MARKET_ASSESSMENTS,
  PRICE_ASSESSMENTS,
  SOURCE,
} from '~/constants/services/constants'
export default {
  components: { HomeSupplyChainSection },
  data() {
    return {
      stages: [
        {
          title: 'Critical Minerals',
          backgroundImage: 'bg-[url("~/assets/icons/diamond.svg")]',
          color: 'p-500',
          isOpen: false,
          containerArrowClasses:
            'bg-p-500 after:border-x-p-300 after:border-t-p-500 md:after:border-y-p-300 md:after:border-l-p-500',
          products: [
            { name: 'Benchmark Source', href: SOURCE.slug, target: true },
            {
              name: PRICE_ASSESSMENTS.service,
              href: `/services/${PRICE_ASSESSMENTS.slug}`,
              target: false,
            },
            {
              name: FORECASTS.service,
              href: `/services/${FORECASTS.slug}`,
              target: false,
            },
            {
              name: CONSULTANCY.service,
              href: `/${CONSULTANCY.slug}`,
              target: false,
            },
            {
              name: 'Sustainability',
              href: `/services/${ESG.slug}`,
              target: false,
            },
          ],
        },
        {
          title: 'Cathode & Anode',
          backgroundImage: 'bg-[url("~/assets/icons/cathode-anode.svg")]',
          color: 'p-300',
          isOpen: false,
          containerArrowClasses:
            'bg-p-300 after:border-x-p-100 after:border-t-p-300 md:after:border-y-p-100 md:after:border-l-p-300',
          products: [
            { name: 'Benchmark Source', href: SOURCE.slug, target: true },
            {
              name: PRICE_ASSESSMENTS.service,
              href: `/services/${PRICE_ASSESSMENTS.slug}`,
              target: false,
            },
            {
              name: MARKET_ASSESSMENTS.service,
              href: `/services/${MARKET_ASSESSMENTS.slug}`,
              target: false,
            },
            {
              name: FORECASTS.service,
              href: `/services/${FORECASTS.slug}`,
              target: false,
            },
            {
              name: CONSULTANCY.service,
              href: `/${CONSULTANCY.slug}`,
              target: false,
            },
            {
              name: 'Sustainability',
              href: `/services/${ESG.slug}`,
              target: false,
            },
          ],
        },
        {
          title: LITHIUM_ION_BATTERIES.menu,
          backgroundImage: 'bg-[url("~/assets/icons/battery-cells.svg")]',
          color: 'p-100',
          isOpen: false,
          containerArrowClasses:
            'bg-p-100 after:border-x-p-50 after:border-t-p-100 md:after:border-y-p-50 md:after:border-l-p-100',
          products: [
            { name: 'Benchmark Source', href: SOURCE.slug, target: true },
            {
              name: PRICE_ASSESSMENTS.service,
              href: `/services/${PRICE_ASSESSMENTS.slug}`,
              target: false,
            },
            {
              name: MARKET_ASSESSMENTS.service,
              href: `/services/${MARKET_ASSESSMENTS.slug}`,
              target: false,
            },
            {
              name: FORECASTS.service,
              href: `/services/${FORECASTS.slug}`,
              target: false,
            },
            {
              name: CONSULTANCY.service,
              href: `/${CONSULTANCY.slug}`,
              target: false,
            },
            {
              name: 'Sustainability',
              href: `/services/${ESG.slug}`,
              target: false,
            },
          ],
        },
        {
          title: 'EV, ESS, Portable Tech',
          backgroundImage: 'bg-[url("~/assets/icons/vehicle-logo.svg")]',
          color: 'p-50',
          isOpen: false,
          containerArrowClasses:
            'hidden bg-p-50 after:border-t-p-50 after:border-x-p-50 after:border-t-p-50 md:block md:after:border-y-p-50 md:after:border-l-p-50',
          products: [
            { name: 'Benchmark Source', href: SOURCE.slug, target: true },
            {
              name: CONSULTANCY.service,
              href: `/${CONSULTANCY.slug}`,
              target: false,
            },
            {
              name: 'Sustainability',
              href: `/services/${ESG.slug}`,
              target: false,
            },
          ],
        },
      ],
    }
  },
  methods: {
    onClick(title) {
      this.stages.forEach((stage) => {
        if (stage.title === title) {
          stage.isOpen = !stage.isOpen
          return
        }
        stage.isOpen = false
      })
    },
  },
}
</script>

<style scoped>
@media (width >= 1424px) and (width <= 1535px) {
  .supply-chain-section {
    max-width: 1312px;
    min-width: 1312px;
  }

  .supply-chain-divider {
    flex-grow: 1;
  }
}
</style>
