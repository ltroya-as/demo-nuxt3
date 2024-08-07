<template>
  <div class="mx-8 mt-8">
    <template v-for="(talk, i) in talks" :key="i">
      <component
        :is="getTalkType(talk.isMembersOnly)"
        class="mb-10 last:mb-0"
        :title="talk.title"
        :blurb="talk.blurb"
        :time="timeFormatted(talk.startDateTimeUTC, talk.timeZone)"
        :duration="duration(talk.startDateTimeUTC, talk.endDateTimeUTC)"
        category=""
        :speakers="getSpeakers(talk)"
        stage=""
        :link-text="talk.isMembersOnly ? 'Subscribe for Access' : 'Join Us'"
        :url="talk.url"
        card-color="bg-bwo21-yellow-100"
        card-text-color="text-bwo21-gray-800"
        card-color-alt="bg-bwo21-purple-500"
        card-text-color-alt="text-white"
      />
    </template>
  </div>
</template>

<script>
import { intervalToDuration } from 'date-fns'
import * as dateFnsTz from 'date-fns-tz'
import Talk from './Talk'
import TalkMembers from './TalkMembers'

const { utcToZonedTime, format } = dateFnsTz

export default {
  name: 'DaySchedule',
  components: {
    Talk,
    TalkMembers,
  },
  props: {
    dayId: {
      type: Number,
      required: true,
    },
    talks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    timeFormatted(dateTime, timeZone) {
      const pattern = dateTime.getMinutes() > 0 ? 'h:mm aaa' : 'h aaa'
      const time = format(utcToZonedTime(dateTime, timeZone), pattern, {
        timeZone: timeZone?.at(0) ?? 'UK/London',
      })
      const timeZoneLabel = timeZone?.at(0)?.split('/')?.at(1) ?? 'London'
      return `${time} (${timeZoneLabel})`
    },
    duration(startDateTime, endDateTime) {
      const interval = {
        start: startDateTime,
        end: endDateTime,
      }
      const duration = intervalToDuration(interval)
      const durationHours = duration.hours + duration.minutes / 60
      const durationHours2dp =
        Math.round((durationHours + Number.EPSILON) * 100) / 100
      return `${durationHours2dp} Hours`
    },
    getSpeakers(talk) {
      const speakers = talk.sessions[0]?.speakers
      return speakers
        ? speakers
            .filter((speaker) => speaker.name.length > 0)
            .map((speaker) => `${speaker.name} (${speaker.company})`)
        : []
    },
    getTalkType(isMembersOnly) {
      return isMembersOnly ? 'talk-members' : 'talk'
    },
  },
}
</script>
