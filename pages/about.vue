<template>
  <div>
    <Hero
      class="!min-h-[200px] md:!min-h-[470px]"
      :with-breadcrumb="false"
      image="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_1536,c_fill/v1678916887/assets/about/AboutHero_ephr9y.jpg"
    >
      <div class="flex h-full w-full items-center">
        <h1
          class="max-w-[468px] text-center text-xl font-bold text-white md:text-left md:text-2xl lg:text-4xl"
        >
          Benchmark enables the most critical decisions of the energy transition
        </h1>
      </div>
    </Hero>
    <div class="flex flex-col">
      <!-- About Header -->

      <div
        class="max-w-content-container gap-x-big px-small pb-big pt-small lg:px-big lg:pt-big mx-auto flex flex-col gap-y-4 lg:flex-row 2xl:px-0"
      >
        <div class="lg:basis-1/2">
          <div class="flex flex-col gap-y-4">
            <p class="text-xl font-bold md:text-2xl lg:text-3xl">
              Independent prices, data and supply chain intelligence for lithium
              ion batteries and rare earth elements
            </p>
            <p>
              Benchmark Mineral Intelligence was formed in 2014 by a new
              generation of industry experts who strived for a robust,
              independent way of collecting market sensitive information.
            </p>

            <p>
              We specialise in assessing market prices, supply chain data,
              forecasting and strategic advisory for the technologies and supply
              chains central to the energy transition.
            </p>

            <p>
              Our unique supply chain approach gives us unrivalled insight into
              the opaque world’s of lithium ion batteries, electric vehicles,
              energy storage, and rare earth permanent magnets.
            </p>

            <p>
              Benchmark’s influence extends beyond the active industry into the
              highest level of political and financial spheres.
            </p>

            <p>
              As the fastest growing intelligence business in our industry,
              Benchmark is expanding into new supply chains including rare earth
              elements to permanent magnets.
            </p>
          </div>
          <div class="mt-7 flex flex-col gap-y-3">
            <h3 class="text-base font-bold md:text-xl lg:text-2xl">
              Keep up to date with Benchmark
            </h3>
            <LinkWithAnimation
              class="font-semibold"
              text="Sign up to our newsletter"
              @click="$modal.open('newsletter')"
            />
          </div>
        </div>
        <!-- Images -->
        <div
          class="flex flex-row gap-2 lg:basis-1/2 lg:items-center lg:justify-center"
        >
          <div class="flex flex-grow flex-col gap-2 py-7">
            <div>
              <img
                class="rounded-lg"
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_380,c_fill/v1675179262/assets/about/image_6_bu9kmh.png"
                alt="about image"
              />
            </div>
            <div>
              <img
                class="rounded-lg"
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_380,c_fill/v1675179262/assets/about/image_5_xx8qo2.png"
                alt="about logo"
              />
            </div>
          </div>
          <div class="flex flex-grow flex-col gap-3">
            <div>
              <img
                class="rounded-lg"
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_480,c_fill/v1675179262/assets/about/image_4_urpmtc.png"
                alt="about logo"
              />
            </div>
            <div>
              <img
                class="rounded-lg"
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto,w_480,c_fill/v1675179262/assets/about/image_3_cwfeca.png"
                alt="about image"
              />
            </div>
          </div>
        </div>
      </div>

      <Hero
        content-classes="relative flex h-full md:py-0 py-12 !px-0 md:!px-small lg:!px-big 2xl:!px-0 min-h-[470px] lg:min-h-[560px]"
        :with-breadcrumb="false"
        image="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1678916887/assets/about/AboutHero2_hpssck.jpg"
      >
        <div class="mt-auto flex h-full items-end">
          <div
            class="bg-grey-900 bg-opacity-70 p-4 text-white md:max-h-[470px] md:max-w-[664px] md:rounded-t-lg md:px-10 md:pb-12 md:pt-10"
          >
            <h3 class="lg:3xl text-xl font-bold md:text-2xl">
              The world’s most trusted PRA for future facing commodities
            </h3>
            <div class="flex flex-col gap-y-3 py-5 text-base md:text-lg">
              <p>
                Benchmark is the world’s most trusted, regulated and independent
                Price Reporting Agency (PRA) in our space.
              </p>
              <p>
                We set the industry’s benchmark and reference pricing for
                lithium, nickel, cobalt, synthetic graphite, natural graphite,
                anodes, cathodes and lithium ion batteries.
              </p>
              <p>
                Our approach is industry-first and data led, not a journalistic
                one.
              </p>
              <p>How can the Benchmark Price Reporting Agency help you?</p>
            </div>
            <LinkWithAnimation
              class="font-semibold text-white"
              text="Speak to one of our team to find out"
              @click="$modal.open('contact')"
            />
          </div>
        </div>
      </Hero>

      <!-- Our Process -->

      <OurDivisionsSection />

      <!-- Locations -->
      <div class="bg-s-100">
        <div
          class="max-w-content-container px-small lg:px-big mx-auto pb-20 pt-11 2xl:px-0"
        >
          <h2
            class="mb-11 text-xl font-bold md:text-2xl lg:text-3xl 2xl:mx-auto"
          >
            Where you'll find us
          </h2>
          <img
            class="w-full"
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/q_auto,g_auto,f_auto,c_fill,w_1536/v1700845139/assets/about/Geography_rhkdwe.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from '~/components/common/Hero.vue'
import OurDivisionsSection from '~/components/OurDivisionsSection.vue'
import LinkWithAnimation from '~/components/shared/common/LinkWithAnimation.vue'

export default {
  components: { LinkWithAnimation, Hero, OurDivisionsSection },
  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo({
      title: 'About',
      description:
        'Benchmark enables the most critical decisions of the energy transition',
    })
    useHead(seo)
  },
  data() {
    return {
      mainEvents: [
        'benchmark_world_tour',
        'battery_sustainability_summit',
        'lithium',
        'cathodes',
        'benchmark_week',
        'benchmark_summit',
        'battery_megafactories',
        'graphites_anodes',
      ],
    }
  },
  mounted() {
    this.$store.commit('modal/setInitialFields', {})
  },
}
</script>
