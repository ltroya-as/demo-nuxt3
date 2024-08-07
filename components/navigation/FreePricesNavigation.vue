<template>
  <div
    class="mb-4 flex flex-wrap justify-center text-sm font-semibold 2xl:justify-start"
    data-testid="navigation-bar"
  >
    <div v-for="item in links" :key="item.text">
      <div
        v-if="item.active"
        class="border-p-500 flex gap-2.5 border-b-4 p-2.5 pb-1.5"
      >
        <component :is="icons[item.icon]" class="h-6 w-auto" />
        {{ item.text }}
      </div>
      <nuxt-link v-else class="flex gap-2.5 p-2.5" :to="item.url">
        <component :is="icons[item.icon]" class="h-6 w-auto" />
        {{ item.text }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import NewsletterIcon from '~/assets/icons/icon-newsletter.svg'
import PriceSpotlightIcon from '~/assets/icons/icon-priceSpotlight.svg'
import IndustryReportsIcon from '~/assets/icons/icon-industryReports.svg'
import PolicyNewsletterIcon from '~/assets/icons/icon-policyNewsletter.svg'
import CopperWeeklyIcon from '~/assets/icons/icon-copper-weekly.svg'

export default {
  props: {
    activeMenu: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      links: [
        {
          url: '/newsletter-signup',
          text: 'Newsletter',
          icon: 'newsletter',
        },
        {
          url: '/price-spotlight-signup',
          text: 'Price Spotlight',
          icon: 'priceSpotlight',
        },
        {
          url: '/industry-reports',
          text: 'Industry Reports',
          icon: 'industryReports',
        },
        {
          url: '/policy-newsletter',
          text: 'Policy Newsletter',
          icon: 'policyNewsletter',
        },
        {
          url: '/copper-weekly',
          text: 'Copper Weekly',
          icon: 'copperWeekly',
        },
      ],
      icons: {
        newsletter: NewsletterIcon,
        priceSpotlight: PriceSpotlightIcon,
        industryReports: IndustryReportsIcon,
        policyNewsletter: PolicyNewsletterIcon,
        copperWeekly: CopperWeeklyIcon,
      },
    }
  },
  created() {
    this.links = this.links.map((link) => {
      return {
        ...link,
        active: this.activeMenu === link.text,
      }
    })
  },
}
</script>
