<template>
  <div class="lg:hidden">
    <DaySelector v-model:activeday="activeday" :days="days" />
    <DaySchedule
      :talks="activeDayTalks"
      :logo="activeDayLogo"
      :day-id="activeday.id"
      :date="activateDayDate"
    />
  </div>
</template>

<script>
import { format, parse } from 'date-fns'
import * as dateFnsTz from 'date-fns-tz'
import DaySelector from './DaySelector'
import DaySchedule from './DaySchedule'

const { utcToZonedTime, zonedTimeToUtc } = dateFnsTz

export default {
  name: 'MobileSchedule',
  components: {
    DaySelector,
    DaySchedule,
  },
  props: {
    talks: {
      type: Array,
      required: true,
    },
    initialDay: {
      type: String,
      required: true,
    },
  },
  data() {
    const activeDay =
      this.talks.find((day) => {
        const dateString = day[0].startDateTimeUTC.toLocaleDateString('en-GB', {
          dateStyle: 'short',
          timeZone: 'Europe/London',
        })
        const dayDateZoned = zonedTimeToUtc(
          parse(`${dateString} 23:59:59`, 'dd/MM/yyyy H:m:s', new Date()),
          'Europe/London',
        )
        const todayDate = new Date()
        return todayDate <= dayDateZoned
      }) || this.talks[this.talks.length - 1]
    return {
      activeday: {
        id: this.talks.indexOf(activeDay),
        label: format(
          utcToZonedTime(activeDay[0].startDateTimeUTC, 'Europe/London'),
          'eee',
        ),
      },
    }
  },
  computed: {
    activeDayTalks() {
      return this.talks[this.activeday.id]
    },
    activeDayLogo() {
      return null
      // return this.schedule[this.activeday.id].logo || null
    },
    activateDayDate() {
      return format(
        utcToZonedTime(
          this.activeDayTalks[0].startDateTimeUTC,
          'Europe/London',
        ),
        'EEEE do MMMM',
      )
    },
    days() {
      return this.talks.map((talk) =>
        format(
          utcToZonedTime(talk[0].startDateTimeUTC, 'Europe/London'),
          'eee',
        ),
      )
    },
  },
}
</script>
