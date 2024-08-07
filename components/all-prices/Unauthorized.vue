<template>
  <div v-if="loading" class="flex min-h-[40vh] items-center justify-center">
    <TheLoader />
  </div>
  <div v-else>
    <VideoIntroCard
      :vimeo-video="vimeoVideo"
      :vimeo-source="vimeoSource"
      :video-ratio="videoRatio"
      :video-cover="videoCover"
      :title="title"
    >
      <template #description>
        <p>
          Access the full suite of Benchmark prices, enabling visibility of
          transacted prices across the entire lithium ion and energy transition
          supply chain.
        </p>
        <br />
        <p>
          Benchmark’s Price Dashboard is a comprehensive data platform,
          providing proprietary price data for mining and raw materials, battery
          chemicals, cathode, anode, cell through to black mass. Access
          Benchmark’s entire suite of market leading prices through one simple
          product.
        </p>
      </template>
      <template #footer>
        <CommonButton
          variant="tertiary-dark"
          type="button"
          @click="handlerPlay"
        >
          Watch Demo
        </CommonButton>
        <CommonButtonContactUs />
      </template>
    </VideoIntroCard>
    <div class="mt-16 text-xl font-bold">
      <h3 class="mb-3">Key Features include</h3>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BuilderCard
          v-for="card in featureCards"
          :key="card.title"
          :title="card.title"
          :icon="card.icon"
          :description="card.description"
        >
          <template #footer>
            <LinkWithAnimation
              text="Learn more"
              color-icon="black"
              class="text-xs"
              @click="openContactModal()"
            />
          </template>
        </BuilderCard>
      </div>
    </div>
  </div>
</template>

<script>
import VideoIntroCard from '~/components/shared/price-assessments/VideoIntroCard.vue'
import CommonButtonContactUs from '~/components/shared/common/ButtonContactUs.vue'
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'
import BuilderCard from '~/components/chart-builder/Card.vue'
import TheLoader from '~/components/TheLoader.vue'
import GetVimeoDataMixin from '~/mixins/GetVimeoDataMixin'

export default {
  components: {
    VideoIntroCard,
    CommonButtonContactUs,
    LinkWithAnimation,
    BuilderCard,
    TheLoader,
  },
  mixins: [GetVimeoDataMixin],
  data() {
    return {
      title: 'price dashboard',
      featureCards: [
        {
          icon: 'DatabaseIcon',
          title: 'All-Inclusive Data',
          description:
            'Our Price Dashboard collates all of our bespoke price datasets covering the entire battery supply chain, in one place.',
        },
        {
          icon: 'DotChartIcon',
          title: 'Bespoke Chart Creation',
          description:
            'Tailor charts to fit your specific needs. Our user-friendly interface allows you to effortlessly create charts, ensuring visibility into the exact data points crucial for your analysis.',
        },
        {
          icon: 'DesktopIcon',
          title: 'User Friendly Interface',
          description:
            'Designed for both beginners and industry experts alike, our Price Dashboard provides a seamless experience for users at every level.',
        },
        {
          icon: 'CopyIcon',
          title: 'Export & Analyse',
          description:
            'Effortlessly export your bespoke charts into various formats for presentations, reports, or spreadsheets and use our excel integration to directly feed prices into your data models. API access is available on an enterprise-wide basis.',
        },
      ],
      vimeoData: {},
      loading: true,
    }
  },
  async mounted() {
    try {
      this.loadingTable = true
      await this.getVimeoData(this.$config.public.IntroAllPricesVimeoId)
    } finally {
      this.loading = false
    }
  },
  methods: {
    handlerPlay() {
      this.$modal.open('videoIntro')
    },
    openContactModal() {
      this.$modal.open('contact')
    },
  },
}
</script>
