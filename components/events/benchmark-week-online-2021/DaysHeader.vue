<template>
  <div class="sticky top-0 z-10 flex">
    <div
      v-for="(day, i) in talks"
      :key="i"
      class="mx-8 flex flex-col items-center"
      :class="columnWidth"
    >
      <div
        class="bg-bwo21-purple-500 w-full py-2 text-center font-bold uppercase leading-tight text-white"
      >
        {{ getDay(day[0].startDateTimeUTC) }}
        <br />{{ getDate(day[0].startDateTimeUTC) }}
      </div>
      <div
        class="bg-bwo21-purple-800 flex w-full items-center justify-center p-4"
      >
        <component :is="logos[i]" class="h-24 w-64" />
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import * as dateFnsTz from 'date-fns-tz'

const { utcToZonedTime } = dateFnsTz

export default {
  name: 'DaysHeader',
  props: {
    talks: {
      type: Array,
      required: true,
    },
    logos: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    columnWidth() {
      switch (this.talks.length) {
        case 2:
          return 'w-1/2'
        case 3:
          return 'w-1/3'
        case 4:
          return 'w-1/4'
        case 5:
          return 'w-1/5'
        default:
          return 'w-full'
      }
    },
  },
  methods: {
    getDay(dateTime) {
      return format(utcToZonedTime(dateTime, 'Europe/London'), 'EEEE')
    },
    getDate(dateTime) {
      return format(utcToZonedTime(dateTime, 'Europe/London'), 'do MMMM')
    },
  },
}
</script>
