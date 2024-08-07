<template>
  <div class="flex flex-col md:flex-row">
    <!-- agenda dates and location -->
    <div
      class="mb-4 mr-6 flex w-full justify-start font-medium md:w-2/6 md:justify-center lg:mb-0 lg:w-1/5 xl:w-3/12"
    >
      <div
        class="h-full w-full flex-row items-start justify-between rounded-lg p-4 text-left font-medium uppercase md:flex md:flex-col md:items-center md:justify-center md:border-0 md:py-0 md:text-center"
      >
        <Badge :event-type="duration" />
        <div
          class="font-montserrat ml-4 inline-flex items-end justify-between font-bold md:ml-0"
        >
          <div
            class="mr-1 inline-flex items-baseline align-text-bottom tracking-tighter"
          >
            <span class="text-md md:text-lg lg:text-xl xl:text-2xl">{{
              startTime[0]
            }}</span>
            <span class="lg:text-md text-xs md:text-sm xl:text-lg">{{
              startTime[1]
            }}</span>
          </div>
          <div
            class="lg:text-md text-xs first-letter:text-base md:text-sm md:first-letter:text-lg lg:first-letter:text-xl xl:text-lg xl:first-letter:text-2xl"
            >{{ timeZoneLabel }}</div
          >
        </div>
      </div>
    </div>
    <!-- agenda summary and speakers -->
    <div
      class="relative flex w-full items-center px-3 py-3 font-medium md:w-4/5"
    >
      <div class="w-full">
        <!-- summary -->
        <div class="flex flex-col items-center lg:flex-row">
          <div class="w-full">
            <div
              class="text-md mb-1 font-bold leading-tight md:text-lg lg:text-xl xl:text-2xl"
            >
              {{ title }}
            </div>
            <div class="hidden text-xs leading-6 lg:block lg:leading-5">
              {{ blurb }}
            </div>
          </div>
        </div>
        <!-- speakers -->
        <div
          class="mt-4 flex flex-col items-center lg:flex-row lg:items-start lg:justify-between"
        >
          <div class="w-full">
            <div class="text-md mb-4 font-semibold">Speakers</div>
            <div v-if="chair" class="mb-4">Chair: {{ chair }}</div>
            <Session
              v-for="(session, i) in sessions"
              :key="i"
              :title="session.sessionTitle"
              :speakers="session.sessionSpeakers"
              :closing="session.closing"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { differenceInMinutes } from 'date-fns'
import Session from '~/components/events/Session'
import Badge from '~/components/events/Badge'
export default {
  name: 'Webinar',
  components: {
    Badge,
    Session,
  },
  props: {
    startDateTime: {
      default: undefined,
      validator: (prop) =>
        typeof prop === 'object' && typeof prop.toLocaleString === 'function',
    },
    endDateTime: {
      default: undefined,
      validator: (prop) =>
        typeof prop === 'object' && typeof prop.toLocaleString === 'function',
    },
    timeZone: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    blurb: {
      type: String,
      default: '',
    },
    chair: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: null,
    },
    sessions: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    duration() {
      if (!this.endDateTime && !this.startDateTime) return '-'

      const differenceInHours =
        differenceInMinutes(this.endDateTime, this.startDateTime) / 60
      const differenceInHours2dp = Math.round(differenceInHours * 100) / 100
      return `${differenceInHours2dp} hours`
    },
    startTime() {
      if (!this.startDateTime) return '-'

      const getDate = (dateTime) => {
        const baseFormatOptions = {
          timeZone: this.timeZone,
          hour12: true,
          hour: 'numeric',
        }
        const formatOptions =
          dateTime.getMinutes() > 0
            ? { ...baseFormatOptions, minute: '2-digit' }
            : baseFormatOptions
        return dateTime.toLocaleString('en-GB', formatOptions).split(' ')
      }
      return getDate(this.startDateTime)
    },
    timeZoneLabel() {
      return this.timeZone.split('/')[1]
    },
  },
}
</script>

<style scoped>
@media (max-width: 1023px) {
  .cta {
    bottom: -1.25rem;
  }
}
</style>
