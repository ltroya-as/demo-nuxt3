<template>
  <div v-if="loading" class="flex min-h-[40vh] items-center justify-center">
    <TheLoader />
  </div>

  <div v-else>
    <BreadcrumbWithoutSidebar :menu="breadcrumb" class="mb-8" />
    <div>
      <OverviewPage
        :services="services"
        :title="title"
        :subtitle="subtitle"
        :descriptions="descriptions"
      >
        <div class="flex gap-2">
          <div class="border-l-p-500 h-6 border-l-4"></div>
          <div class="text-xl font-bold">Benchmark ESG Reports</div>
        </div>
        <div class="text-base font-normal">
          <p>
            Benchmark ESG Reports provide a framework to assess and benchmark
            ESG performance across the industry, and navigate the changing
            state-of-play. All reports are updated on a quarterly basis. Each
            issue includes:
          </p>
          <ul class="marker:text-p-500 ml-6 mt-6 list-disc">
            <li>
              <strong>Benchmark’s Sustainability Index</strong>
              which benchmarks the ESG transparency and commitments of
              individual companies
            </li>
            <li>
              Expert insights on the environmental impacts of production from
              Benchmark’s Global
              <strong>Life Cycle Assessments,</strong> assessing the dominant
              production routes seen in industry today
            </li>
            <li>
              Review of the industry’s most salient <strong>materiality</strong>
              topics based on stakeholder consultations and market research
            </li>
            <li>
              Updates on key developments in <strong>global policy</strong> and
              <strong>sustainability standards</strong>
            </li>
            <li>In-depth analysis of the latest <strong>ESG trends</strong></li>
            <li>
              Detailed <strong>Carbon Intensity Curves</strong> for top
              producers
            </li>
            <li>Regional ESG risk maps</li>
          </ul>
        </div>
        <div class="mt-2" @click="$modal.open('contact')">
          <SharedCommonLinkWithAnimation
            class="font-semibold"
            text="Contact Us"
          />
        </div>
        <div class="flex gap-2">
          <div class="border-l-p-500 h-6 border-l-4"></div>
          <div class="text-xl font-bold">Benchmark’s Sustainability Index</div>
        </div>
        <div class="text-base font-normal">
          <p class="mb-6">
            A <strong>composite index</strong> composite index measuring the ESG
            transparency and commitments to best practices of companies across
            the most relevant and pressing Environment, Social and Governance
            (ESG) topics within the battery supply chain.
          </p>
          <p>
            Each company assessed receives individual E, S and G scores, along
            with a composite score classifying them into one of the four tiers:
            <strong>
              Industry Leading, Good Practice, Moderate Visibility and Limited
              Visibility.
            </strong>
          </p>
        </div>
        <div>
          <SharedCommonLinkWithAnimation
            class="font-semibold"
            text="Contact Us"
            @click="$modal.open('contact')"
          />
          <PlayerVideoVimeoModal
            :vimeo-id="vimeoId"
            class="mb-5 mt-2.5 lg:mb-2"
          />
        </div>
        <h3 class="text-lg font-semibold">Available Subscriptions</h3>
      </OverviewPage>
    </div>
  </div>
</template>

<script>
/** @components */
import TheLoader from '~/components/TheLoader.vue'
import OverviewPage from '~/components/shared/services/OverviewPage.vue'
import PlayerVideoVimeoModal from '~/components/video/PlayerVideoVimeoModal.vue'
import BreadcrumbWithoutSidebar from '~/components/navigation/BreadcrumbWithoutSidebar.vue'
/** @mixins */
import SeoUtilsMixin from '~/mixins/SeoUtilsMixin'
import AuthorizationMixin from '~/mixins/AuthorizationMixin'
import AuthenticationMixin from '~/mixins/AuthenticationMixin'
/** @constants */
import overviewData from '~/constants/esg/overview'
import {
  ESG,
  SUBSCRIPTION_ESG_COBALT,
  SUBSCRIPTION_ESG_LITHIUM,
  SUBSCRIPTION_ESG_NATURAL_GRAPHITE,
  SUBSCRIPTION_ESG_NICKEL,
  SUBSCRIPTION_ESG_SYNTHETIC_GRAPHITE,
} from '~/constants/services/constants'
import { getServices } from '~/constants/services'

definePageMeta({ layout: 'overviews' })

export default {
  components: {
    BreadcrumbWithoutSidebar,
    OverviewPage,
    TheLoader,
    PlayerVideoVimeoModal,
  },
  mixins: [AuthenticationMixin, AuthorizationMixin, SeoUtilsMixin],
  data() {
    return {
      loading: true,
      authorized: false,
      breadcrumb: [{ name: 'Services' }, { name: ESG.name }],
      title: overviewData.title,
      subtitle: overviewData.subtitle,
      descriptions: overviewData.descriptions,
      service: overviewData.service,
      services: overviewData.servicesESG,
      availableText: overviewData.availableText,
      moreInfo: overviewData.moreInfo,
      checkboxServices: [ESG.checkbox],
      subscriptionFeatures: [
        {
          icon: 'icon-finger-print.svg',
          label: 'Communicate your environmental impact',
        },
        {
          icon: 'icon-globe.svg',
          label: 'Plan how to mitigate or remediate the impact',
        },
        {
          icon: 'icon-eco-earth.svg',
          label: 'Understand what drives the environmental burden',
        },
        {
          icon: 'icon-table-chart.svg',
          label: 'Learn about the industry’s environmental risks',
        },
        {
          icon: 'icon-folder.svg',
          label: 'Develop a sustainability strategy',
        },
        {
          icon: 'icon-plant-care.svg',
          label: 'Build the road to a net zero target',
        },
      ],
      vimeoId: null,
    }
  },
  head() {
    return this.generateSeoInfo({
      title: 'Environmental, Social & Governance',
      description:
        "Having emerged out of the investor space, ESG (environment, social and governance) is a tool for companies to monitor and report on their sustainability performance. Good ESG practices and disclosure ensure the conduct of an organisation does not jeopardise future generation's access to resources and operates with social license",
    })
  },
  async mounted() {
    this.loading = true
    const config = useRuntimeConfig()
    this.vimeoId = Number(config.public.IntroSustainabilityVimeoId)
    this.authorized = await this.hasOneOfThisMemberships(
      SUBSCRIPTION_ESG_LITHIUM,
      SUBSCRIPTION_ESG_COBALT,
      SUBSCRIPTION_ESG_NICKEL,
      SUBSCRIPTION_ESG_NATURAL_GRAPHITE,
      SUBSCRIPTION_ESG_SYNTHETIC_GRAPHITE,
    )
    const initialValues = getServices([...this.checkboxServices])
    this.$store.commit('modal/setInitialFields', initialValues)
    this.loading = false
  },
}
</script>
