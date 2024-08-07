<template>
  <Carousel :items="events" item-class="!p-4 md:!p-6">
    <template #content>
      <span
        class="text-p-500 flex size-8 items-center justify-center rounded-lg bg-black p-1"
      >
        <InPersonIcon class="w-5" />
      </span>
    </template>
    <template #action="{ item }">
      <NavigationLink
        :url="getEventUrl(item)"
        :type="getNavigationTypeElement(item)"
      >
        <Button variant="clean" class="text-sm"> Learn More </Button>
      </NavigationLink>
    </template>
  </Carousel>
</template>

<script>
import InPersonIcon from '~/assets/icons/in-person.svg'
import Button from '~/components/common/Button.vue'
import Carousel from '~/components/market-insights/Carousel.vue'
import NavigationLink from '~/components/shared/navigation/Link.vue'

export default {
  components: { Carousel, Button, NavigationLink, InPersonIcon },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getNavigationTypeElement(event) {
      return event.eventType !== 'Online' ? 'a' : 'nuxt-link'
    },
    getEventUrl(event) {
      if (event?.url) return event.url
      return event.slug ? `/events/${event.slug}` : ''
    },
  },
}
</script>
