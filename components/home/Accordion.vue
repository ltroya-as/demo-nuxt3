<template>
  <div class="bg-p-50 overflow-hidden">
    <div
      class="relative hidden transform flex-col items-stretch pb-4 transition-transform duration-300 md:flex md:flex-row md:pb-0"
      :class="translation"
    >
      <HomeAccordionSection
        v-for="(stage, id) in stages"
        :key="id"
        :title="stage.title"
        :icon-name="stage.iconName"
        :icon-classes="stage.iconClasses"
        :container-icon-classes="stage.containerIconClasses"
        :click-for-more-classes="stage.clickForMoreClasses"
        :feature-list="stage.products"
        :is-active="id === activeSection"
        :class="stage.classes"
        @open="openSection(id)"
        @close="closeSection()"
      />
    </div>
    <div
      class="relative flex transform flex-col items-stretch pb-4 transition-transform duration-300 md:hidden md:pb-0"
    >
      <HomeAccordionMobileSection
        v-for="(stage, id) in stages"
        :key="id"
        :title="stage.title"
        :icon-name="stage.iconName"
        :icon-classes="stage.iconClassesMobile"
        :feature-list="stage.products"
        :is-active="id === activeSection"
        :is-first-item="id === 0"
        :is-last-item="id === stages.length[-1]"
        :class="stage.classes"
        @open="openSection(id)"
        @close="closeSection()"
      />
    </div>
  </div>
</template>

<script>
import HomeAccordionMobileSection from '~/components/home/AccordionMobileSection.vue'
import HomeAccordionSection from '~/components/home/AccordionSection.vue'
import {
  CONSULTANCY,
  ESG,
  FORECASTS,
  LITHIUM_ION_BATTERIES,
  MARKET_ASSESSMENTS,
  PRICE_ASSESSMENTS,
  SOURCE,
} from '~/constants/services/constants'
import { MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT } from '~/constants/services/market-assessments'

export default {
  components: { HomeAccordionMobileSection, HomeAccordionSection },
  data() {
    return {
      activeSection: null,
      stages: [
        {
          title: 'Critical Minerals',
          iconName: 'critical-minerals',
          containerIconClasses:
            'h-[120px] md:h-[100px] lg:h-[130px] xl:h-[146px]',
          clickForMoreClasses: 'text-p-500',
          iconClassesMobile: 'h-[146px]',
          classes: [
            'caret-p-500',
            'bg-p-500',
            'md:py-9',
            'md:pl-8',
            'lg:pl-16 lg:py-11',
          ],
          products: [
            { name: SOURCE.service, href: SOURCE.slug, target: true },
            {
              name: PRICE_ASSESSMENTS.service,
              href: `/services/${PRICE_ASSESSMENTS.slug}`,
              target: false,
            },
            null,
            {
              name: FORECASTS.service,
              href: `/${FORECASTS.slug}`,
              target: false,
            },
            {
              name: CONSULTANCY.service,
              href: `/${CONSULTANCY.slug}`,
              target: false,
            },
            { name: ESG.service, href: `/services/${ESG.slug}`, target: false },
          ],
        },
        {
          title: 'Cathode & Anode',
          iconName: 'electrodes',
          containerIconClasses:
            'h-[120px] md:h-[100px] lg:h-[130px] xl:h-[146px]',
          clickForMoreClasses: 'text-p-300',
          iconClassesMobile: 'h-[146px]',
          classes: [
            'caret-p-300',
            'bg-p-300',
            'md:pl-14',
            'md:py-9',
            'lg:pl-16 lg:py-11',
          ],
          products: [
            { name: SOURCE.service, href: SOURCE.slug, target: true },
            {
              name: PRICE_ASSESSMENTS.service,
              href: `/services/${PRICE_ASSESSMENTS.slug}`,
              target: false,
            },
            {
              name: MARKET_ASSESSMENTS.service,
              href: MARKET_ASSESSMENTS_GIGAFACTORY_ASSESSMENT.routes.default,
              target: false,
            },
            {
              name: FORECASTS.service,
              href: `/${FORECASTS.slug}`,
              target: false,
            },
            {
              name: CONSULTANCY.service,
              href: `/${CONSULTANCY.slug}`,
              target: false,
            },
            { name: ESG.service, href: `/services/${ESG.slug}`, target: false },
          ],
        },
        {
          title: LITHIUM_ION_BATTERIES.menu,
          iconName: 'icon-battery',
          containerIconClasses:
            'h-[120px] md:h-[100px] lg:h-[130px] xl:h-[146px]',
          iconClasses:
            'w-[180px] h-[120px] md:w-[120px] md:h-[100px] lg:w-[125px] lg:h-[130px] xl:w-[155px] xl:h-[146px] mx-auto',
          iconClassesMobile: 'mx-auto w-[180px]',
          clickForMoreClasses: 'text-p-100',
          classes: [
            'caret-p-100',
            'bg-p-100',
            'md:pl-16',
            'md:py-9',
            'lg:pl-16 lg:py-11',
          ],
          products: [
            { name: SOURCE.service, href: SOURCE.slug, target: true },
            null,
            {
              name: FORECASTS.service,
              href: `/${FORECASTS.slug}`,
              target: false,
            },
            {
              name: CONSULTANCY.service,
              href: `/${CONSULTANCY.slug}`,
              target: false,
            },
            { name: ESG.service, href: `/services/${ESG.slug}`, target: false },
            null,
          ],
        },
        {
          title: 'EV, ESS, Portable Tech',
          iconName: 'vehicle',
          containerIconClasses:
            'h-[120px] md:h-[100px] lg:h-[130px] xl:h-[146px]',
          iconClasses:
            'w-[180px] h-[120px] md:w-[120px] md:h-[100px] lg:w-[125px] lg:h-[130px] xl:w-[155px] xl:h-[146px] mx-auto',
          iconClassesMobile: 'mx-auto w-[200px]',
          clickForMoreClasses: 'text-p-50',
          classes: [
            'caret-p-50',
            'bg-p-50',
            'no-caret',
            'md:py-9 md:pl-16',
            'lg:pl-16 lg:py-11',
          ],
          products: [
            { name: SOURCE.service, href: SOURCE.slug, target: true },
            null,
            {
              name: CONSULTANCY.service,
              href: `/${CONSULTANCY.slug}`,
              target: false,
            },
            { name: ESG.service, href: `/services/${ESG.slug}`, target: false },
            null,
            null,
          ],
        },
      ],
    }
  },
  computed: {
    translation() {
      const translations = [
        // section 1
        '-translate-x-8',
        // section 2
        '-translate-x-1/4',
        // section 3
        '-translate-x-2/4',
        // section 4
        '-translate-x-3/4',
      ]
      return [
        translations[this.activeSection],

        // If there's no active section or
        // section 1 is active (activeSection === 0),
        // remove transition for the initial
        // translation.
        !this.activeSection && 'transition-none',
      ]
    },
  },
  methods: {
    openSection(id) {
      this.activeSection = id
    },
    closeSection() {
      this.activeSection = null
    },
  },
}
</script>
