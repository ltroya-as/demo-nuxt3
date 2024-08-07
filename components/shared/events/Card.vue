<template>
  <NavigationLink
    v-if="isEventValid"
    class="max-h[266px] bg-s-100 mx-auto block h-full min-h-[266px] w-full rounded-xl"
    :url="eventUrl"
    :type="navigationTypeElement"
    data-testid="event-card"
  >
    <div class="relative h-full max-h-[176px] min-h-[176px] w-full bg-black">
      <EventsTag :type="eventType" class="left-3 top-3" />
      <div
        class="background-card absolute bottom-0 flex w-full items-end px-7 pb-3"
      >
        <h4
          data-testid="event-title"
          class="line-clamp-3 text-base font-semibold capitalize text-white lg:line-clamp-2"
          :title="eventTitle"
        >
          {{ eventTitle }}
        </h4>
      </div>
      <img
        data-testid="event-image"
        :src="eventImage"
        class="h-full w-full object-cover"
        :alt="eventTitle"
      />
    </div>
    <div class="flex w-full flex-col gap-y-3 p-5 text-black">
      <CommonDate :date="eventDate" />
      <CommonLocation :location="eventLocation" />
    </div>
  </NavigationLink>
</template>
<script>
import ValidatedEvent from '~/mixins/ValidatedEvent'
import CommonDate from '~/components/shared/common/Date.vue'
import CommonLocation from '~/components/shared/common/Location.vue'
import EventsTag from '~/components/shared/events/Tag.vue'
import NavigationLink from '~/components/shared/navigation/Link.vue'
export default {
  components: { CommonDate, CommonLocation, EventsTag, NavigationLink },
  mixins: [ValidatedEvent],
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  computed: {
    navigationTypeElement() {
      if (this.eventType !== 'Online') {
        return 'a'
      }
      return 'nuxt-link'
    },
    isEventValid() {
      return this.eventDate && this.eventTitle && this.eventImage
    },
  },
}
</script>
<style scoped lang="scss">
.background-card {
  background: linear-gradient(
    360deg,
    rgba(37, 38, 42, 0.8) 28.28%,
    rgba(37, 38, 42, 0) 60.61%
  );
  height: 176px;
}
</style>
