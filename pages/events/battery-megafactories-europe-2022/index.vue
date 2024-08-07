<template>
  <div class="bg-bme22-red">
    <Header :nav-items="navItems">
      <template #section-one>
        <div class="md:w-1/2 lg:w-5/12">
          <img
            style="width: 400px"
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185116/assets/events/europe-2022/event_logo_yf9jyt.png?_i=AA"
            alt="logo"
            class="mb-10"
          />
          <div class="mt-10 md:ml-8 lg:ml-16">
            <div class="mb-6 font-bold uppercase">
              <div class="text-xl">
                The Westin Grand
                <br />Berlin, Germany
              </div>
              <br />
              <span class="text-sm">Battery Megafactories | Europe 2022</span>
              <br />
              <span class="text-xl">TUE 22 & WED 23 MARCH 2022</span>
            </div>
          </div>
        </div>
      </template>
      <template #section-two>
        <div class="my-4 md:w-1/2 lg:ml-16 lg:w-7/12">
          <div
            class="pb-12 text-5xl font-black uppercase leading-none sm:text-6xl md:mt-20 lg:text-8xl"
          >
            Scale,
            <br />quality, <br />speed:
          </div>
          <div class="text-2xl font-bold md:max-w-sm lg:max-w-3xl">
            Europe's electric vehicle revolution and the path to 500GWh of
            lithium ion battery capacity by 2030
          </div>
        </div>
      </template>
    </Header>
    <div class="bg-bme22-red px-8 text-white">
      <Info>
        <template #section-two>
          <div
            class="mx-6 hidden text-center text-lg md:mb-0 md:ml-20 md:mr-0 md:block lg:ml-8 xl:px-32"
          >
            <p class="mb-8 text-xl font-bold">
              Join Europe’s first ever commercial conference on the rise of the
              lithium ion battery megafactories on the continent.
            </p>
            <p class="font-baskerville">
              Created by the electric vehicle (EV) supply chain experts at
              Benchmark Mineral Intelligence, Battery Megafactories Europe 2022
              will focus on Europe’s lithium ion battery cell manufacturing
              facilities both operational and in the pipeline, cell production
              innovations, CO
              <sub>2</sub> impact, and localised raw material, cathode and anode
              solutions.
            </p>
          </div>
        </template>
      </Info>
    </div>
    <div class="bm-container bg-bme22-red px-8 pb-10 text-white md:px-20">
      <hr class="border-bme22-red-dark mx-12 mb-8" />
      <div class="flex justify-center">
        <AnchorLinkOrNuxtLink
          :nuxt="false"
          :to="mailLink"
          class="mb-4 border-2 font-extrabold"
        >
          Become a Sponsor
        </AnchorLinkOrNuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/events/battery-megafactories/Header'
import Info from '~/components/events/battery-megafactories/Info'
import AnchorLinkOrNuxtLink from '~/components/events/battery-megafactories/AnchorLinkOrNuxtLink.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Info,
    AnchorLinkOrNuxtLink,
  },
  data() {
    return {
      navItems: [
        { name: 'Event', to: '/events/battery-megafactories-europe-2022/' },
        {
          name: 'Location',
          to: '/events/battery-megafactories-europe-2022/location',
        },
      ],
      mailInfo: {
        to: 'sponsor@benchmarkminerals.com',
        subject: 'Megafactories Europe 2022: Sponsor Inquiry',
        body: 'I would like to learn more about becoming a sponsor for Battery Megafactories Europe 2022.',
      },
    }
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Libre+Baskerville:thin,extra-light,light,100,200,300,400,500,600,700,800&display=swap',
      },
    ],
  },
  computed: {
    mailLink() {
      const encodedSubject = encodeURIComponent(this.mailInfo.subject)
      const encodedBody = encodeURIComponent(this.mailInfo.body)
      const mailtoLink = `mailto:${this.mailInfo.to}?subject=${encodedSubject}&body=${encodedBody}`
      return mailtoLink
    },
  },
}
</script>

<style scoped>
#header {
  background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185116/assets/events/europe-2022/background_main_fd2dwi.jpg?_i=AA');
}
</style>
