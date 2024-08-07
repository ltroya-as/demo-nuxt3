<template>
  <div class="mt-8 flex w-full flex-col md:mt-10">
    <div class="flex w-full justify-between">
      <h3 v-if="subtitle" class="mb-3.5 text-sm font-semibold">
        {{ subtitle }}
      </h3>
    </div>
    <div v-if="subtitle" class="bg-s-200 mb-8 h-[2px] w-full"></div>
    <div
      v-if="existsEvents"
      class="gap-x-small grid grid-cols-1 gap-y-5 md:grid-cols-2 xl:grid-cols-3"
    >
      <EventsCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div v-else class="mb-2.5 flex w-full flex-col md:mb-5">
      <h3 class="mb-2 text-lg font-semibold md:text-2xl">
        {{ messageFallback }}
      </h3>
      <span class="md:leading-large mb-7 text-lg md:text-2xl">
        Sign up to our newsletter to be notified as soon as the next event is
        announced
      </span>
      <CommonButton
        variant="primary"
        extra-classes="md:!w-fit md:text-sm text-sm"
        link="/newsletter-signup"
      >
        Newsletter sign up
      </CommonButton>
    </div>
  </div>
</template>

<script>
import CommonButton from '~/components/common/Button.vue'
import EventsCard from '~/components/shared/events/Card.vue'
export default {
  components: { CommonButton, EventsCard },
  props: {
    events: {
      type: Array,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
  },
  computed: {
    existsEvents() {
      return !!this.events.length
    },
    messageFallback() {
      if (this.subtitle) {
        const subtitle = this.subtitle.toLowerCase()
        return `There are no ${subtitle} at the moment`
      }
      return 'There are no upcoming events at the moment'
    },
  },
}
</script>
