<template>
  <div
    data-testid="event-tag"
    class="absolute flex w-full max-w-max flex-row items-center justify-between gap-x-2 bg-[#23252c] px-3 py-1 text-sm font-semibold text-white"
    :class="$attrs.class"
  >
    <IconInPerson
      v-if="IsInPersonEvent"
      class="w-full min-w-[14px] max-w-[14px] lg:min-w-[20px] lg:max-w-[20px]"
    />
    <IconOnline
      v-else
      class="w-full min-w-[14px] max-w-[14px] lg:min-w-[20px] lg:max-w-[20px]"
    />
    <span data-testid="event-location-type">{{ type }}</span>
  </div>
</template>
<script>
import IconInPerson from '~/assets/icons/icon-in-person.svg'
import IconOnline from '~/assets/icons/icon-online.svg'
export default {
  components: { IconInPerson, IconOnline },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
  computed: {
    IsInPersonEvent() {
      return ['in person'].includes(this.type.toLowerCase())
    },
  },
}
</script>
