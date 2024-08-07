<template>
  <div class="mb-10">
    <div
      class="mb-8 text-center text-3xl font-bold uppercase text-white lg:my-8"
    >
      Agenda
    </div>
    <MobileSchedule :talks="talksByDay" initial-day="Mon" />
    <FullSchedule class="hidden lg:flex" :talks="talksByDay" :logos="logos" />
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import groupBy from 'lodash/groupBy'
import FullSchedule from './FullSchedule'
import MobileSchedule from './MobileSchedule'
import LogoGraphite from '@/assets/benchmark-week-online-2021/logo-graphite.svg'
import LogoCathodes from '@/assets/benchmark-week-online-2021/logo-cathodes.svg'
import LogoBatterySustainability from '@/assets/benchmark-week-online-2021/logo-battery_sustainability.svg'

export default {
  name: 'Schedule',
  components: {
    FullSchedule,
    MobileSchedule,
    LogoGraphite,
    LogoCathodes,
    LogoBatterySustainability,
  },
  props: {
    schedule: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      logos: [LogoGraphite, LogoCathodes, LogoBatterySustainability],
    }
  },
  computed: {
    talksByDay() {
      const webinarsGroupedByDay = groupBy(this.schedule, (event) =>
        new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'short',
          timeZone: event.timeZone?.at(0) ?? 'UTC',
        }).format(event.startDateTimeUTC),
      )
      return Object.values(webinarsGroupedByDay).sort(
        (a, b) => a.startDateTimeUTC - b.startDateTimeUTC,
      )
    },
  },
}
</script>
