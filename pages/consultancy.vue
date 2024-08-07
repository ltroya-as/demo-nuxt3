<template>
  <div class="flex w-full flex-col pb-32 md:pb-36">
    <!-- Hero -->
    <Hero data-testid="consultancy-hero" :title="titleHero" :image="imageHero">
      <template #desktop>
        <div
          class="hidden w-full flex-col text-white md:flex"
          data-testid="consultancy-hero-content"
        >
          <div
            class="leading-low md:leading-medium flex w-full flex-col gap-y-6 text-base md:w-[80%] md:gap-y-8 md:text-xl md:font-medium lg:w-[50%]"
          >
            <span>
              Benchmark provides individual consultancy projects for many types
              of companies across the lithium ion battery supply chain, electric
              vehicle manufacturers, and investors.
            </span>
            <span>
              We help major actors from the mine to electric vehicle address
              complex commercial decisions including acquisitions, divestitures,
              and expansions of operations.
            </span>
            <div class="flex flex-row gap-4 text-sm">
              <CommonButton
                variant="tertiary-dark"
                extra-classes=""
                @click="$modal.open('requestForProposal')"
              >
                Request for Proposal
              </CommonButton>
              <SharedCommonButtonContactUs :services="services" />
            </div>
          </div>
        </div>
      </template>
      <template #mobile>
        <div
          class="leading-low md:leading-medium flex w-full flex-col gap-y-6 text-base md:w-[80%] md:gap-y-8 md:text-xl md:font-medium lg:w-[50%]"
        >
          <span>
            Benchmark provides individual consultancy projects for many types of
            companies across the lithium ion battery supply chain, electric
            vehicle manufacturers, and investors.
          </span>
          <span>
            We help major actors from the mine to electric vehicle address
            complex commercial decisions including acquisitions, divestitures,
            and expansions of operations.
          </span>
          <div class="flex gap-2 text-xs">
            <CommonButton
              variant="tertiary-dark"
              class="!text-black"
              @click="$modal.open('requestForProposal')"
            >
              Request for Proposal
            </CommonButton>
            <SharedCommonButtonContactUs :services="services" />
          </div>
        </div>
      </template>
    </Hero>
    <!-- Banner -->
    <SharedCommonBannerWithImages
      :images="imagesBanner"
      data-testid="consultancy-about-services"
    >
      <h3 class="leading-large md:leading-11 text-2xl font-bold md:text-4xl">
        About our services
      </h3>
      <div class="leading-low w-full text-base">
        <span>
          Benchmark is a lithium-ion battery supply chain specialist
          organization which independently collects first-hand price, production
          and cost data. Using this we provide regular analysis on the
          international trade of minerals and metals, offering a range of
          information products through subscriptions, reports, events and
          consultancy services.
        </span>
      </div>
    </SharedCommonBannerWithImages>
    <!-- Our methodology -->
    <div
      class="bg-s-100 flex w-full flex-col py-8 md:py-20"
      data-testid="consultancy-our-methodology"
    >
      <div
        class="max-w-content-container px-small mx-auto flex w-full flex-col gap-y-3 lg:px-14 2xl:px-0"
      >
        <h3 class="text-2xl font-bold md:text-3xl md:leading-9">
          Our methodology
        </h3>
        <div class="leading-low hidden w-full text-base md:flex lg:w-1/2">
          <span>
            Benchmark’s consulting methodology is focused on insights from the
            primary data continuously collected throughout the global industry
          </span>
        </div>
      </div>
      <div
        class="max-w-content-container px-small md:mt-big mx-auto mt-5 flex w-full flex-col items-center justify-center lg:px-14 2xl:px-0"
      >
        <OurMethodologyTimeline />
      </div>
    </div>
    <!-- Our process -->
    <div
      class="md:pb-large md:pt-big flex w-full flex-col pb-2.5 pt-8"
      data-testid="consultancy-our-process"
    >
      <div
        class="mb-medium max-w-content-container px-small mx-auto flex w-full flex-col gap-y-3 md:mb-7 lg:px-14 2xl:px-0"
      >
        <h3 class="leading-large text-2xl font-bold md:text-3xl md:leading-9">
          Our process
        </h3>
        <div class="leading-low flex w-full text-base lg:w-1/2">
          <span>
            Our continuous contact with the value chain, we have the world’s
            most extensive, accurate and up-to-date and knowledge bases.
          </span>
        </div>
      </div>
      <SharedTimelineSectionWithSquares />
    </div>
    <!-- Our consultancy services -->
    <div
      class="md:pb-large md:pt-big flex w-full flex-col pb-2.5 pt-8"
      data-testid="consultancy-our-services"
    >
      <div
        class="mb-medium max-w-content-container px-small mx-auto flex w-full flex-col gap-y-3 rounded-xl md:mb-7 lg:px-14 2xl:px-0"
      >
        <div
          class="bg-s-100 md:p-big flex w-full flex-col rounded-xl p-4 lg:flex-row"
        >
          <div class="flex w-full flex-col lg:max-w-[30%]">
            <h3
              class="leading-medium md:leading-large mb-3 text-xl font-bold md:text-2xl"
            >
              Our consultancy services
            </h3>
            <div class="leading-low text-base">
              <span>
                Whether a lithium brine or hard rock mine, battery grade
                chemical operation or lithium ion battery gigafactory plant,
                Benchmark Minerals’ unique data sets, world class analysis and
                independent thinking offers you the solution in a variety of
                ways:
              </span>
            </div>
          </div>
          <div
            class="bg-p-500 my-6 h-auto min-h-[2px] w-full lg:mx-14 lg:min-h-full lg:w-[2px]"
          ></div>
          <div
            class="grid w-full items-start gap-x-6 gap-y-8 md:grid-cols-3 lg:gap-y-4"
          >
            <div
              v-for="(section, index) in sectionIcons"
              :key="index"
              class="flex flex-row gap-x-3"
              data-testid="consultancy-our-services-item"
            >
              <Icon :name="section.icon" class="h-8 w-8" />
              <span class="leading-low text-base font-semibold">
                {{ section.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Cards -->
    <div
      class="md:pt-big flex w-full flex-col pt-8"
      data-testid="consultancy-designed-for"
    >
      <div
        class="mb-medium max-w-content-container px-small mx-auto flex w-full flex-col gap-y-3 md:mb-7 lg:px-14 2xl:px-0"
      >
        <h3 class="leading-large text-2xl font-bold md:text-3xl md:leading-9">
          Who is this designed for?
        </h3>
        <div class="leading-low flex w-full text-base lg:w-1/2">
          <span>
            Whether a lithium brine or hard rock mine, battery grade chemical
            operation or lithium ion battery gigafactory plant, Benchmark
            Minerals’ unique data sets, world class analysis and independent
            thinking offers you the solution in a variety of ways:
          </span>
        </div>
      </div>
      <div
        data-testid="consultancy-designed-for-items"
        class="max-w-content-container gap-x-small px-small mx-auto mb-0 flex w-full flex-col flex-wrap items-center justify-center md:mb-7 md:flex-row md:items-start md:justify-between lg:px-14 2xl:px-0"
      >
        <CommonGeneralCard
          v-for="(card, index) in imagesCard"
          :key="index"
          :title="card.title"
          :image="card.url"
          class="lg:w-[32%]"
          :show-button-contact="false"
        >
          <div>
            <ul class="leading-low list-disc pl-5 text-base">
              <li
                v-for="(phrase, indexPhrase) in card.phrases"
                :key="indexPhrase"
              >
                {{ phrase }}
              </li>
            </ul>
            <div class="mt-2" @click="$modal.open('contact')">
              <SharedCommonLinkWithAnimation text="Contact Us" />
            </div>
          </div>
        </CommonGeneralCard>
      </div>
      <div
        data-testid="consultancy-we-deliver"
        class="max-w-content-container px-small mx-auto flex w-full md:mt-12 lg:px-14 2xl:px-0"
      >
        <CommonGeneralCard
          :portrait="false"
          title="How do we deliver?"
          :image="imageCard"
        >
          <div
            class="leading-low flex flex-col gap-y-4 text-base md:text-xl md:leading-7"
          >
            <span>
              Benchmark’s most senior and relevant analysts will be your
              consult. Providing workshops, in depth presentations and vast
              excel databases.
            </span>
            <span>
              Each engagement includes support for 12-months after the original
              workshop including quarterly calls with Benchmark Minerals and an
              in-person follow up after one-year.
            </span>
            <span>
              As the world’s leading experts, Benchmark is committed to
              developing long term relationships and a community for the lithium
              ion to EV supply chain.
            </span>
          </div>
        </CommonGeneralCard>
      </div>
    </div>
  </div>
</template>

<script>
import { services } from '~/constants/services'
import {
  consultancyIcons,
  consultancyImagesBanner,
  consultancyImagesCard,
} from '~/constants/consultancy'
import Icon from '~/components/common/Icon.vue'
import Hero from '~/components/shared/common/Hero.vue'
import CommonGeneralCard from '~/components/shared/common/GeneralCard.vue'
import OurMethodologyTimeline from '~/components/shared/timeline/Services.vue'

export default {
  components: {
    Icon,
    CommonGeneralCard,
    Hero,
    OurMethodologyTimeline,
  },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: 'Consultancy',
      description:
        'Benchmark provides individual consultancy projects for many types of companies across the lithium ion battery supply chain, electric vehicle manufacturers, and investors. We help major actors from the mine to electric vehicle address complex commercial decisions including acquisitions, divestitures, and expansions of operations.',
    })

    useHead(seo)
  },
  data() {
    return {
      services: services.consultancy,
      sectionIcons: consultancyIcons,
      imageCard:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1024,f_auto/v1675799596/assets/consultancy/consultancy-card-big_qd1rj6.png?_i=AA',
      imageHero:
        'https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,w_1920,f_auto/v1675448928/assets/consultancy/hero-consultancy_tarmrf.png?_i=AA',
      imagesBanner: consultancyImagesBanner,
      imagesCard: consultancyImagesCard,
      titleHero: 'Consultancy',
    }
  },
}
</script>
