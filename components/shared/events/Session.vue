<template>
  <div
    class="bg-grey-100 flex max-w-[400px] flex-col overflow-hidden rounded-lg md:max-w-full md:flex-row md:gap-10"
  >
    <div class="relative flex p-6 text-white md:w-[300px]">
      <div class="z-10 flex flex-col gap-2">
        <span class="text-3xl font-bold">Session {{ order }}</span>
        <div class="flex flex-col gap-y-5 text-xl font-bold">
          <span>{{ sessionDate }}</span>
          <span>{{ sessionTime }}</span>
        </div>
      </div>
      <img
        class="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
        :src="sessionImage"
        alt="session-image"
      />
    </div>

    <div class="flex w-full flex-col gap-y-5 p-4 pt-8 md:gap-y-10 md:pl-0">
      <h3 class="text-xl font-bold">{{ session.title }}</h3>
      <div>
        <h4 class="text-grey-900 mb-3 text-lg font-semibold"> Speakers </h4>
        <ul class="list-disc pl-5">
          <li v-for="(speaker, index) in sessionSpeakers" :key="index">
            <Speaker :speaker="speaker" />
          </li>
        </ul>
      </div>
      <div class="mt-5 flex justify-end md:mt-0">
        <Button target="_blank" :link="sessionUrl" variant="primary">
          Sign up here
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Speaker from '~/components/shared/events/Speaker.vue'
import { formatDateRange } from '~/utils/date'
import Button from '~/components/common/Button.vue'
import { SESSION_IMAGES } from '~/constants/events/sessionsImages'

export default {
  components: { Button, Speaker },
  props: {
    order: {
      type: Number,
      required: true,
    },
    session: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sessionTime() {
      if (this.session?.startDateTime) {
        return `${this.session?.startDateTime?.split(' ')[1]} hrs (London)`
      }
      return ''
    },
    sessionDate() {
      return formatDateRange(
        this.session.startDateTimeUTC,
        this.session.endDateTimeUTC,
        'EEEE,',
      )
    },
    sessionImage() {
      let index = this.order - 1
      const maxSize = SESSION_IMAGES.length

      if (index > maxSize - 1) {
        const times = Math.trunc(index / maxSize)
        index = index - maxSize * times
      }

      return SESSION_IMAGES[index]
    },
    sessionUrl() {
      return this.session?.url ?? ''
    },
    sessionSpeakers() {
      return (
        this.session.sessions
          ?.map((_session) => _session.speakers)
          ?.flatMap((_speaker) => _speaker) ?? []
      )
    },
  },
}
</script>
