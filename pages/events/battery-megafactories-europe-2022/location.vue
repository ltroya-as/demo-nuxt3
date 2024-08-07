<template>
  <div class="bg-bme22-red">
    <Header :nav-items="navItems" style="min-height: 300px">
      <template #section-one>
        <div class="md:w-1/2 lg:w-5/12">
          <NuxtLink to="/events/battery-megafactories-europe-2022">
            <img
              style="width: 400px"
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185116/assets/events/europe-2022/event_logo_yf9jyt.png?_i=AA"
              alt="logo"
            />
          </NuxtLink>
        </div>
      </template>
      <template #section-two>
        <div class="my-2 md:w-1/2 lg:ml-8 lg:w-7/12">
          <div
            class="text-4xl font-black uppercase leading-none sm:text-5xl md:ml-8 md:text-4xl lg:text-5xl xl:text-6xl"
          >
            Rise of the Battery Megafactories in Europe
          </div>
        </div>
      </template>
    </Header>
    <div class="bg-bme22-red px-8 text-white">
      <Info>
        <template #section-one>
          <div class="mb-8 text-xl font-bold md:w-1/2 lg:w-2/5">
            <p>
              Berlin, Germany is an ideally located hub for the rise of the
              lithium ion battery megafactories within Europe, a continent that
              has witnessed the fastest growing battery cell pipeline since H1
              2018.
            </p>
          </div>
        </template>
        <template #section-two>
          <div
            class="font-baskerville hidden text-lg md:ml-16 md:block md:w-1/2 lg:w-3/5"
          >
            <p class="mb-4">
              Not only is Berlin, the Battery Gigafactories Europe 2022 host
              city, close to Germany's major automakers such as VW, BMW and
              Daimler, and the political hub of the country, it is now the home
              of Tesla's future production hub, Gigafactory 4.
            </p>
            <p>
              As of November 2021, Europe has 27 lithium ion battery
              gigafactories being planned out to 2030 including active battery
              plants in Poland (LGES), Hungary (Samsung SDI) and multiple
              planned plants including Northvolt's in Sweden, two SK Innovation
              gigafactories in Hungary, and VW and Tesla in Germany.
            </p>
            <div class="mt-4 text-2xl font-light md:max-w-sm lg:max-w-lg">
              Scroll for Venue details &dArr;
            </div>
          </div>
        </template>
      </Info>
      <hr class="border-bme22-red-dark mx-12" />
      <Info>
        <template #section-one>
          <div class="md:w-1/2 lg:w-2/5">
            <div class="mb-8 text-xl">
              <p class="mb-2 text-center font-bold">The Venue</p>
              <p class>
                The Westin Grand, Friedrichstraße 158-164, 10117 Berlin, Germany
              </p>
            </div>
            <div>
              <img
                class="mb-8 block w-full xl:px-8"
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1680626147/assets/events/battery-gigafactories-europe-2022/8e982d3_rdmbnr.jpg?_i=AA"
                alt="Hotel Front"
              />
              <img
                class="mb-8 block w-full xl:px-8"
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1680626147/assets/events/battery-gigafactories-europe-2022/fa9fbe1_twgwcj.jpg?_i=AA"
                alt="Hotel Front"
              />
              <img
                class="block w-full xl:px-8"
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1680626147/assets/events/battery-gigafactories-europe-2022/d2b5716_agdi5q.jpg?_i=AA"
                alt="Hotel Front"
              />
            </div>
          </div>
        </template>
        <template #section-two>
          <div class="mt-8 text-lg md:ml-16 md:mt-0 md:w-1/2 lg:w-3/5">
            <p class="font-baskerville mb-6">
              Benchmark has chosen The Westin Grand as the location for the
              inaugural Battery Megafactories Europe for a number of reasons.
            </p>
            <p class="font-baskerville mb-6">
              The Westin Grand offers a quality, international-standard hotel
              and reasonable nightly rates to ensure that as many delegates as
              possible stay onsite and increase the evening networking
              opportunities.
            </p>
            <p class="font-baskerville mb-6">
              It has a number of bars and open spaces to hold informal meetings
              and is located in the centre of Berlin, 10 minutes walk from the
              Brandenburg Gate.
            </p>
            <p class="font-baskerville mb-6">
              There are plenty of restaurants and bars in the immediate vicinity
              for private meetings and post conference relaxation.
            </p>
            <AnchorLinkOrNuxtLink
              :nuxt="false"
              to="https://www.eventbrite.com/e/battery-megafactories-europe-2022-tickets-86133470529"
              bg-color-class="bg-black"
              class="my-6"
            >
              Sign Up
            </AnchorLinkOrNuxtLink>

            <p class="font-baskerville">
              For venue or accommodation questions, email Emily Dunn:
              <a
                href="mailto:edunn@benchmarkminerals.com?Subject=Battery%20Megafactories%20Europe%202022"
                target="_blank"
                class="hover:underline"
                >edunn@benchmarkminerals.com</a
              >
            </p>
          </div>
        </template>
      </Info>
    </div>
  </div>
</template>

<script>
import Header from '~/components/events/battery-megafactories/Header'
import Info from '~/components/events/battery-megafactories/Info'
import AnchorLinkOrNuxtLink from '~/components/events/battery-megafactories/AnchorLinkOrNuxtLink.vue'

export default {
  name: 'Location',
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
}
</script>

<style scoped>
#header {
  background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185116/assets/events/europe-2022/background_main_fd2dwi.jpg?_i=AA');
}
</style>
