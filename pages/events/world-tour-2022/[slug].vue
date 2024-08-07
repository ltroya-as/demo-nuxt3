<template>
  <div>
    <div>
      <EventsWorldTour2022Header />

      <div class="relative overflow-hidden">
        <div class="absolute h-full w-full">
          <div class="background-stripe mt-96 w-full" />
          <div class="background-stripe mt-96 w-full" />
        </div>

        <div
          class="max-w-content-container relative mx-auto my-10 px-3 md:px-16 2xl:my-20 2xl:px-52"
        >
          <div class="gap-10 md:flex">
            <!-- Main Content -->
            <div class="grow">
              <section class="flex flex-col items-center md:block">
                <EventsWorldTour2022SectionTitle
                  :title="currentEvent.city"
                  tag="h1"
                  left
                />

                <p class="my-4 text-xl font-semibold uppercase md:text-2xl">
                  {{ formattedDate }}
                </p>

                <a
                  v-if="currentEvent.registerUrl"
                  class="bg-p-500 inline-block rounded-md px-4 py-2 text-lg font-semibold leading-7"
                  :href="currentEvent.registerUrl"
                >
                  Register To Attend
                </a>
              </section>

              <section
                v-if="currentEvent.hostPartners.length"
                class="mt-16 flex flex-col items-center md:block"
              >
                <EventsWorldTour2022SectionTitle title="Host Partners" left />

                <div
                  class="mt-4 flex flex-wrap justify-center md:justify-start"
                >
                  <div
                    v-for="organization in currentEvent.hostPartners"
                    :key="organization.website"
                    class="w-1/2 p-2.5 lg:w-1/3"
                  >
                    <EventsWorldTour2022OrganizationEntry
                      :website="organization.website"
                      :logo-url="organization.logoUrl"
                    />
                  </div>
                </div>
              </section>

              <section v-if="currentEvent.location" class="mt-16">
                <EventsWorldTour2022SectionTitle title="Location" left />

                <p
                  class="mx-auto my-4 max-w-md text-center text-xl uppercase md:mx-0 md:text-left md:text-2xl"
                >
                  {{ currentEvent.location }}
                </p>
              </section>

              <section v-if="agendas[currentEvent.slug]" class="mt-16">
                <EventsWorldTour2022SectionTitle title="Agenda" left />

                <component :is="agendas[currentEvent.slug]"></component>
              </section>
            </div>

            <!-- Sidebar -->
            <section class="hidden shrink-0 md:block">
              <EventsWorldTour2022SectionTitle title="Host Cities" />

              <EventsWorldTour2022HostCityTextCard
                v-for="event in orderedEvents"
                :key="event.city"
                :event="event"
                :disable-link="currentEvent.slug === event.slug"
              />

              <p
                v-if="eventsWithoutCity.length"
                class="text-xl font-light leading-9 2xl:text-2xl"
              >
                <span class="font-bold">{{ eventsWithoutCity.length }}</span>
                more events TBC.
              </p>
            </section>
          </div>

          <section v-if="currentEvent.sponsors.length" class="mt-16">
            <EventsWorldTour2022OrganizationListSection
              title="Sponsors"
              :organizations="currentEvent.sponsors"
            />
          </section>

          <div class="md:hidden">
            <EventsWorldTour2022Section title="Host Cities">
              <div
                class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 lg:grid-cols-3"
              >
                <EventsWorldTour2022HostCityCard
                  v-for="event in orderedEvents"
                  :key="event.city"
                  :event="event"
                  :disable-link="currentEvent.slug === event.slug"
                />
              </div>
            </EventsWorldTour2022Section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reformat } from '@/utils/date'
import events from '@/constants/events/world-tour-2022/events'
import TorontoAgenda from '@/components/events/world-tour-2022/TorontoAgenda.vue'
import CapeTownAgenda from '@/components/events/world-tour-2022/CapeTownAgenda.vue'

export default {
  components: {
    TorontoAgenda,
    CapeTownAgenda,
  },

  setup() {
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo(
      { title: 'Agenda' },
      {
        twitterImage:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/g_center,w_1600,h_900,c_fill/v1680714497/assets/events/events_default_image_vmdug0.png',
        opengraphImage:
          'https://res.cloudinary.com/benchmarkminerals/image/upload/g_center,w_1600,h_900,c_fill/v1680714497/assets/events/events_default_image_vmdug0.png',
      },
    )
    useHead(seo)
  },
  data() {
    return {
      events,
      agendas: {
        toronto: TorontoAgenda,
        'cape-town': CapeTownAgenda,
      },
    }
  },

  computed: {
    currentEvent() {
      return this.events.find((event) => event.slug === this.$route.params.slug)
    },

    orderedEvents() {
      const withDate = this.events.filter((e) => !!e.date)
      const withoutDate = this.events.filter((e) => !e.date)

      withDate.sort((a, b) => {
        const diff = new Date(a.date) - new Date(b.date)

        if (diff === 0) {
          return a.city < b.city ? -1 : 1
        }
        return diff
      })

      withoutDate.sort((a, b) => (a.city < b.city ? -1 : 1))

      return [...withDate, ...withoutDate]
    },

    eventsWithoutCity() {
      return this.events.filter((e) => !e.city)
    },

    formattedDate() {
      return this.currentEvent.date
        ? reformat(this.currentEvent.date, 'EEE dd MMM', 'yyyy-MM-dd')
        : 'Date TBC'
    },
  },
}
</script>
