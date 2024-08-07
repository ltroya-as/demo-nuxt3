<template>
  <div
    v-if="date"
    class="flex w-full flex-row items-center justify-start gap-x-2"
    :class="$attrs.class"
  >
    <IconCalendar class="w-full min-w-3 max-w-3" :class="[iconClasses]" />
    <span
      class="text-sm leading-5"
      :class="[textClasses]"
      data-testid="event-date"
    >
      {{ date }}
    </span>
  </div>
</template>

<script>
import IconCalendar from '~/assets/icons/icon-calendar.svg'
export default {
  components: { IconCalendar },
  props: {
    date: {
      type: String,
      default: null,
    },
    iconClasses: {
      type: String,
      default: '',
    },
    textClasses: {
      type: String,
      default: '',
    },
  },
}
</script>
