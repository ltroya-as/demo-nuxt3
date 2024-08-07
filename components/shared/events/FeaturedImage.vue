<template>
  <div
    class="relative h-[152px] max-h-[152px] min-h-[152px] overflow-hidden bg-black md:h-full md:max-h-[400px] md:min-h-[400px]"
  >
    <EventsTag :type="type" />
    <img :src="image" class="h-full w-full object-cover" :alt="alt" />
  </div>
</template>

<script>
import EventsTag from '~/components/shared/events/Tag.vue'
export default {
  components: { EventsTag },
  props: {
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
}
</script>
